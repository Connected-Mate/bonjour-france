// Runs the Mistral model off the main thread so the page stays responsive.
import { CONFIG } from "./config.js";

const { WebWorkerMLCEngineHandler } = await import(CONFIG.ai.webllm.esm);
const handler = new WebWorkerMLCEngineHandler();
self.onmessage = (msg) => handler.onmessage(msg);
self.postMessage({ kind: "hf-worker-ready" });
