import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import worker from "../src/index.js";
import { validate, LIMITS } from "../src/lib.js";

const ORIGIN = "https://connected-mate.github.io";
let upstream, upstreamUrl, lastBody, upstreamMode = "ok";

test.before(async () => {
  upstream = http.createServer((req, res) => {
    let b = "";
    req.on("data", (c) => (b += c));
    req.on("end", () => {
      lastBody = { auth: req.headers.authorization, json: JSON.parse(b) };
      if (upstreamMode === "429") { res.writeHead(429); return res.end("{}"); }
      if (upstreamMode === "500") { res.writeHead(500); return res.end("{}"); }
      res.writeHead(200, { "content-type": "text/event-stream" });
      res.write('data: {"choices":[{"delta":{"content":"Bon"}}]}\n\n');
      res.write('data: {"choices":[{"delta":{"content":"jour"}}]}\n\n');
      res.end("data: [DONE]\n\n");
    });
  });
  await new Promise((r) => upstream.listen(0, "127.0.0.1", r));
  upstreamUrl = `http://127.0.0.1:${upstream.address().port}/v1/chat/completions`;
});
test.after(() => upstream.close());

const env = (extra = {}) => ({ ALLOWED_ORIGINS: ORIGIN, MISTRAL_API_KEY: "test-key", MISTRAL_API_URL: upstreamUrl, ...extra });
const post = (body, origin = ORIGIN, headers = {}) =>
  new Request("https://relay.example/chat", { method: "POST", headers: { Origin: origin, "content-type": "application/json", ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });
const ask = { messages: [{ role: "user", content: "Comment refaire ma carte d’identité ?" }], context: "[1] Carte d’identité…" };

test("streams Mistral's answer with CORS for the site origin", async () => {
  upstreamMode = "ok";
  const r = await worker.fetch(post(ask), env());
  assert.equal(r.status, 200);
  assert.equal(r.headers.get("access-control-allow-origin"), ORIGIN);
  assert.match(r.headers.get("content-type"), /event-stream/);
  const text = await r.text();
  assert.match(text, /"Bon"/);
  assert.match(text, /\[DONE\]/);
  assert.equal(lastBody.auth, "Bearer test-key");
  assert.equal(lastBody.json.model, "mistral-small-latest");
  assert.equal(lastBody.json.stream, true);
  assert.equal(lastBody.json.messages[0].role, "system");
  assert.match(lastBody.json.messages[0].content, /FICHES VÉRIFIÉES/);
  assert.match(lastBody.json.messages[0].content, /en français/);
});

test("rejects other origins", async () => {
  const r = await worker.fetch(post(ask, "https://evil.example"), env());
  assert.equal(r.status, 403);
  assert.equal(r.headers.get("access-control-allow-origin"), null);
});

test("answers CORS preflight", async () => {
  const r = await worker.fetch(new Request("https://relay.example/chat", { method: "OPTIONS", headers: { Origin: ORIGIN } }), env());
  assert.equal(r.status, 204);
  assert.match(r.headers.get("access-control-allow-methods"), /POST/);
});

test("503 when the key is not configured", async () => {
  const r = await worker.fetch(post(ask), env({ MISTRAL_API_KEY: "" }));
  assert.equal(r.status, 503);
  assert.deepEqual(await r.json(), { error: "not_configured" });
});

test("rate limit per IP", async () => {
  const seen = [];
  const RATE_LIMITER = { limit: async ({ key }) => { seen.push(key); return { success: seen.length <= 1 }; } };
  const h = { "CF-Connecting-IP": "203.0.113.7" };
  assert.equal((await worker.fetch(post(ask, ORIGIN, h), env({ RATE_LIMITER }))).status, 200);
  assert.equal((await worker.fetch(post(ask, ORIGIN, h), env({ RATE_LIMITER }))).status, 429);
  assert.deepEqual(seen, ["203.0.113.7", "203.0.113.7"]);
});

test("input bounds", () => {
  assert.throws(() => validate({ messages: [] }), (e) => e.code === "no_messages");
  assert.throws(() => validate({ messages: [{ role: "system", content: "x" }] }), (e) => e.code === "bad_message");
  assert.throws(() => validate({ messages: [{ role: "user", content: "x".repeat(LIMITS.maxMessageChars + 1) }] }), (e) => e.status === 413);
  assert.throws(() => validate({ messages: [{ role: "user", content: "a" }, { role: "assistant", content: "b" }] }), (e) => e.code === "last_message_not_user");
  const many = Array.from({ length: 30 }, (_, i) => ({ role: i % 2 ? "assistant" : "user", content: "q" }));
  many.push({ role: "user", content: "fin" });
  assert.equal(validate({ messages: many }).messages.length, LIMITS.maxMessages);
  assert.equal(validate({ messages: [{ role: "user", content: "a" }], context: "x".repeat(99999) }).context.length, LIMITS.maxContextChars);
});

test("bad JSON -> 400, long message -> 413", async () => {
  assert.equal((await worker.fetch(post("{nope"), env())).status, 400);
  assert.equal((await worker.fetch(post({ messages: [{ role: "user", content: "x".repeat(5000) }] }), env())).status, 413);
});

test("upstream errors are mapped", async () => {
  upstreamMode = "429";
  assert.equal((await worker.fetch(post(ask), env())).status, 429);
  upstreamMode = "500";
  const r = await worker.fetch(post(ask), env());
  assert.equal(r.status, 502);
  assert.equal(r.headers.get("access-control-allow-origin"), ORIGIN);
  upstreamMode = "ok";
  assert.equal((await worker.fetch(post(ask), env({ MISTRAL_API_URL: "http://127.0.0.1:1/x" }))).status, 504);
});

test("health endpoint reports configuration without leaking the key", async () => {
  const r = await worker.fetch(new Request("https://relay.example/health"), env());
  const j = await r.json();
  assert.deepEqual(j, { ok: true, configured: true });
});
