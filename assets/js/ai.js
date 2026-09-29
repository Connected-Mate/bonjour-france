// AI engines behind one interface: load(onProgress) / generate(messages, onToken) / stop() / cancelLoad().
// Default: Mistral running locally with WebLLM (WebGPU). Optional: OpenAI-compatible API proxy.
import { CONFIG } from "./config.js";
import { store } from "./common.js";

export async function detectWebGPU() {
  if (!window.isSecureContext) return { ok: false, reason: "insecure" };
  if (!("gpu" in navigator)) return { ok: false, reason: "nogpu" };
  try {
    const adapter = await navigator.gpu.requestAdapter({ powerPreference: "high-performance" });
    if (!adapter) return { ok: false, reason: "noadapter" };
    return {
      ok: true,
      f16: adapter.features.has("shader-f16"),
      maxBuffer: adapter.limits?.maxStorageBufferBindingSize || 0,
    };
  } catch {
    return { ok: false, reason: "noadapter" };
  }
}

export function isLikelyMobile() {
  return navigator.userAgentData?.mobile ?? /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

export const MODEL_PREF_KEY = "hf.model";

export function selectedModelKey() {
  const k = store.get(MODEL_PREF_KEY, CONFIG.ai.webllm.defaultModel);
  return CONFIG.ai.webllm.models[k] ? k : CONFIG.ai.webllm.defaultModel;
}

class WebLLMEngine {
  constructor() {
    this.kind = "webllm";
    this.engine = null;
    this.worker = null;
    this.webllm = null;
    this.modelId = null;
    this.label = "";
  }

  async lib() {
    if (!this.webllm) this.webllm = await import(CONFIG.ai.webllm.esm);
    return this.webllm;
  }

  resolveModel(gpu) {
    const key = selectedModelKey();
    const m = CONFIG.ai.webllm.models[key];
    return { key, id: gpu?.f16 ? m.f16 : m.f32, label: m.label, sizeLabel: m.sizeLabel };
  }

  async isCached(modelId) {
    try {
      const lib = await this.lib();
      return await lib.hasModelInCache(modelId);
    } catch {
      return false;
    }
  }

  get ready() { return !!this.engine; }

  async load(gpu, onProgress) {
    const { id, label } = this.resolveModel(gpu);
    if (this.engine && this.modelId === id) return;
    if (this.engine) await this.unload();
    const lib = await this.lib();
    const worker = new Worker(new URL("./webllm-worker.js", import.meta.url), { type: "module" });
    this.worker = worker;
    await new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error("worker-timeout")), 60000);
      worker.addEventListener("message", function ready(e) {
        if (e.data?.kind === "hf-worker-ready") {
          clearTimeout(t);
          worker.removeEventListener("message", ready);
          resolve();
        }
      });
      worker.addEventListener("error", (e) => { clearTimeout(t); reject(new Error(e.message || "worker-error")); }, { once: true });
    });
    if (this.worker !== worker) throw Object.assign(new Error("cancelled"), { cancelled: true });
    const engine = await lib.CreateWebWorkerMLCEngine(worker, id, {
      initProgressCallback: (r) => onProgress?.({ progress: r.progress ?? 0, text: r.text || "" }),
    });
    if (this.worker !== worker) throw Object.assign(new Error("cancelled"), { cancelled: true });
    this.engine = engine;
    this.modelId = id;
    this.label = label;
  }

  cancelLoad() {
    this.worker?.terminate();
    this.worker = null;
    this.engine = null;
    this.modelId = null;
  }

  async unload() {
    try { await this.engine?.unload(); } catch { /* ignore */ }
    this.cancelLoad();
  }

  async generate(messages, onToken) {
    const cfg = CONFIG.ai.webllm;
    const chunks = await this.engine.chat.completions.create({
      messages,
      stream: true,
      temperature: cfg.temperature,
      max_tokens: cfg.maxTokens,
    });
    let text = "";
    for await (const chunk of chunks) {
      const delta = chunk.choices?.[0]?.delta?.content || "";
      if (delta) { text += delta; onToken(text); }
    }
    return text;
  }

  stop() {
    try { this.engine?.interruptGenerate(); } catch { /* ignore */ }
  }

  async clearCache() {
    const lib = await this.lib();
    await this.unload();
    for (const m of Object.values(CONFIG.ai.webllm.models)) {
      for (const id of [m.f16, m.f32]) {
        try { await lib.deleteModelAllInfoInCache(id); } catch { /* not cached */ }
      }
    }
  }
}

class ApiEngine {
  constructor() {
    this.kind = "api";
    this.ctrl = null;
    this.label = CONFIG.ai.api.label;
  }
  get ready() { return !!CONFIG.ai.api.endpoint; }
  async load() {
    if (!CONFIG.ai.api.endpoint) throw new Error("no-endpoint");
  }
  cancelLoad() {}
  async generate(messages, onToken) {
    const cfg = CONFIG.ai.api;
    this.ctrl = new AbortController();
    const res = await fetch(cfg.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
      body: JSON.stringify({ model: cfg.model, messages, stream: true, temperature: cfg.temperature, max_tokens: cfg.maxTokens }),
      signal: this.ctrl.signal,
    });
    if (!res.ok || !res.body) throw Object.assign(new Error(`HTTP ${res.status}`), { status: res.status });
    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    let buf = "";
    let text = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += value;
      const lines = buf.split("\n");
      buf = lines.pop();
      for (const line of lines) {
        const l = line.trim();
        if (!l.startsWith("data:")) continue;
        const data = l.slice(5).trim();
        if (data === "[DONE]") return text;
        try {
          const delta = JSON.parse(data).choices?.[0]?.delta?.content || "";
          if (delta) { text += delta; onToken(text); }
        } catch { /* partial line */ }
      }
    }
    return text;
  }
  stop() { this.ctrl?.abort(); }
}

export function createEngine() {
  if (CONFIG.ai.provider === "api" && CONFIG.ai.api.endpoint) return new ApiEngine();
  if (CONFIG.ai.provider === "none") return null;
  return new WebLLMEngine();
}
