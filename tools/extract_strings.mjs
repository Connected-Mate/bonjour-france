// Builds tools/i18n/strings.json: every user-facing string of the mirrored site,
// with the existing French translation when the original site ships one.
import fs from "fs";
import path from "path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const M = path.join(ROOT, "_mirror");
const A = path.join(M, "_astro");
const SCRATCH = process.argv[2];

const files = fs.readdirSync(A);
const find = (re) => files.find((f) => re.test(f));

// 1. Dictionary (en inline in language-provider, fr in its own chunk).
const lp = fs.readFileSync(path.join(A, find(/^language-provider\..*\.js$/)), "utf8");
const a = lp.indexOf("f={language:`English`"), b = lp.indexOf(",x=ue");
const en = new Function("var " + lp.slice(a, b) + "; return ue;")();
const fr = (await import(path.join(A, find(/^fr\..*\.js$/)))).default;

const out = [];
const seen = new Map();
const add = (source, key, enText, frText) => {
  if (typeof enText !== "string" || !enText.trim()) return;
  if (seen.has(enText)) { seen.get(enText).sources.push(source + ":" + key); return; }
  const row = { id: out.length + 1, sources: [source + ":" + key], en: enText, fr: frText ?? null, adapted: null };
  seen.set(enText, row); out.push(row);
};
const walk = (e, f, p) => { for (const k in e) typeof e[k] === "string" ? add("dict", p + k, e[k], f?.[k]) : walk(e[k], f?.[k], p + k + "."); };
walk(en, fr, "");

// 2. data-site-* attributes in HTML pages.
const pages = [];
const walkDir = (d) => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) { if (f !== "_astro") walkDir(p); } else if (f === "index.html") pages.push(p); } };
walkDir(M);
const unesc = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
for (const p of pages) {
  const h = fs.readFileSync(p, "utf8");
  for (const m of h.matchAll(/data-site-en="([^"]*)"\s+data-site-fr="([^"]*)"/g)) add("html", path.relative(M, p), unesc(m[1]), unesc(m[2]));
}

// 3. static-copy map (coming-soon animation texts).
const sc = fs.readFileSync(path.join(A, find(/^static-copy\..*\.js$/)), "utf8");
const s0 = sc.indexOf("new Map(["), s1 = sc.indexOf("]]);", s0);
const map = new Function("n", "e", "t", "return " + sc.slice(s0, s1 + 3))({}, {}, {});
for (const [k, v] of map) add("static-copy", "", k, v.fr);

// 4. Rendered English texts not covered above (hard-coded in islands or HTML).
if (SCRATCH) {
  const all = new Set(out.map((r) => r.en));
  const blob = out.map((r) => r.en).join("\n");
  for (const f of fs.readdirSync(path.join(SCRATCH, "texts_en"))) {
    for (const t of JSON.parse(fs.readFileSync(path.join(SCRATCH, "texts_en", f), "utf8"))) {
      if (!all.has(t) && !blob.includes(t) && /[a-z]{3}/i.test(t)) add("rendered", f.replace(".json", ""), t, null);
    }
  }
}

fs.writeFileSync(path.join(ROOT, "tools/i18n/strings.json"), JSON.stringify(out, null, 1));
const by = {}; for (const r of out) { const s = r.sources[0].split(":")[0]; by[s] = (by[s] || 0) + 1; }
console.log(out.length, "strings", by, "no fr:", out.filter((r) => !r.fr).length);
