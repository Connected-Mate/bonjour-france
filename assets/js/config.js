// Central configuration. No secrets here: this file is public.
export const CONFIG = {
  repo: "Connected-Mate/hello-france",

  ai: {
    // "webllm": Mistral model running in the visitor's browser (WebGPU), nothing sent to a server.
    // "api":    OpenAI-compatible streaming endpoint (e.g. a proxy you host in front of the Mistral API).
    //           Never put an API key here — the proxy must hold it server-side.
    // "none":   curated answers only.
    provider: "webllm",

    webllm: {
      // Pinned version: bump deliberately after testing.
      esm: "https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.85/+esm",
      defaultModel: "mistral-7b", // desktops; phones get "ministral-3b" (see ai.js autoModelKey)
      models: {
        "ministral-3b": {
          label: "Ministral 3B (léger)",
          f16: "Ministral-3-3B-Instruct-2512-BF16-q4f16_1-MLC",
          f32: "Ministral-3-3B-Instruct-2512-BF16-q4f32_1-MLC",
          sizeLabel: "≈ 2 Go",
          vramMB: 2900,
        },
        "mistral-7b": {
          label: "Mistral 7B Instruct v0.3",
          f16: "Mistral-7B-Instruct-v0.3-q4f16_1-MLC",
          f32: "Mistral-7B-Instruct-v0.3-q4f32_1-MLC",
          sizeLabel: "≈ 4 Go",
          vramMB: 4600,
        },
      },
      temperature: 0.2,
      maxTokens: 450,
    },

    api: {
      endpoint: "", // e.g. "https://your-proxy.example/v1/chat/completions"
      model: "mistral-small-latest",
      label: "Mistral Small (API)",
      temperature: 0.3,
      maxTokens: 700,
    },
  },

  retrieval: { maxEntries: 3, minScore: 2 },
  pdf: { maxBytes: 20e6, maxChars: 12000, promptChars: 2500 },
  stars: { ttlMs: 10 * 60 * 1000 },
};
