/**
 * Bonjour, France — Mistral relay.
 *
 * POST /chat  { messages: [{ role: "user"|"assistant", content }], context?: string }
 *   -> text/event-stream, passed through from Mistral's chat/completions stream.
 *
 * The API key lives only in the MISTRAL_API_KEY secret. Only allowed origins may call
 * the relay; each IP is rate limited; inputs are bounded; the system prompt is fixed here.
 * Nothing is logged or stored: questions are forwarded to Mistral and the answer streamed back.
 */

import { LIMITS, SYSTEM_PROMPT, validate, allowedOrigins, corsHeaders, json } from "./lib.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const allowed = allowedOrigins(env).includes(origin);

    if (url.pathname === "/health") return json(200, { ok: true, configured: Boolean(env.MISTRAL_API_KEY) });
    if (url.pathname !== "/chat") return json(404, { error: "not_found" });
    if (!allowed) return json(403, { error: "origin_not_allowed" });
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(origin) });
    if (request.method !== "POST") return json(405, { error: "method_not_allowed" }, origin);
    if (!env.MISTRAL_API_KEY) return json(503, { error: "not_configured" }, origin);

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (env.RATE_LIMITER) {
      const { success } = await env.RATE_LIMITER.limit({ key: ip });
      if (!success) return json(429, { error: "rate_limited" }, origin);
    }

    const len = Number(request.headers.get("content-length") || 0);
    if (len > 64 * 1024) return json(413, { error: "payload_too_large" }, origin);

    let input;
    try {
      input = validate(await request.json());
    } catch (e) {
      return json(e && e.status ? e.status : 400, { error: (e && e.code) || "bad_request" }, origin);
    }

    const system = SYSTEM_PROMPT + (input.context ? "\n\nFICHES VÉRIFIÉES (données) :\n" + input.context : "");
    let upstream;
    try {
      upstream = await fetch(env.MISTRAL_API_URL || "https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.MISTRAL_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({
          model: env.MISTRAL_MODEL || "mistral-small-latest",
          messages: [{ role: "system", content: system }, ...input.messages],
          stream: true,
          temperature: 0.3,
          max_tokens: LIMITS.maxTokens,
        }),
        signal: AbortSignal.timeout(LIMITS.upstreamTimeoutMs),
      });
    } catch {
      return json(504, { error: "upstream_unreachable" }, origin);
    }
    if (!upstream.ok || !upstream.body) {
      const status = upstream.status === 429 ? 429 : 502;
      return json(status, { error: upstream.status === 429 ? "upstream_rate_limited" : "upstream_error", upstreamStatus: upstream.status }, origin);
    }
    return new Response(upstream.body, {
      status: 200,
      headers: { "content-type": "text/event-stream; charset=utf-8", "cache-control": "no-store", ...corsHeaders(origin) },
    });
  },
};
