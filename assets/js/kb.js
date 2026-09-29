// Knowledge base: curated entries with verified official sources + simple lexical retrieval.
import { fetchJSON } from "./common.js";

let kbPromise = null;

export function loadKB() {
  if (!kbPromise) {
    kbPromise = fetchJSON("./assets/data/kb.json", { timeout: 10000 })
      .then((rows) => rows.map((e) => ({ ...e, _q: normalize(e.question), _k: e.keywords.map(normalize) })))
      .catch((e) => { kbPromise = null; throw e; });
  }
  return kbPromise;
}

export function normalize(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const STOP = new Set("le la les un une des de du d l a au aux et ou en dans pour par sur avec sans ce cet cette ces mon ma mes ton ta tes son sa ses notre nos votre vos leur leurs je tu il elle on nous vous ils elles me te se y ne pas plus que qui quoi quel quelle quels quelles comment quand est suis sont etre avoir ai as avez faire fait faut dois doit peux peut puis combien est ce qu c s n j m t bonjour merci svp stp aide aider besoin veux voudrais souhaite".split(" "));

const stem = (w) => (w.length > 5 ? w.slice(0, 5) : w);

function tokens(s) {
  return normalize(s).split(" ").filter((w) => w.length > 2 && !STOP.has(w));
}

/** Returns [{entry, score}] best first. */
export function search(kb, query, { max = 3, minScore = 2 } = {}) {
  const qn = ` ${normalize(query)} `;
  const qStems = new Set(tokens(query).map(stem));
  if (!qStems.size && qn.trim().length < 2) return [];
  const scored = kb.map((e) => {
    let score = 0;
    for (const k of e._k) {
      if (k && qn.includes(` ${k} `)) score += k.includes(" ") ? 5 : 3;
    }
    const eStems = new Set([...tokens(e.question), ...e._k.flatMap((k) => k.split(" "))].filter((w) => w.length > 2 && !STOP.has(w)).map(stem));
    for (const s of qStems) if (eStems.has(s)) score += 1;
    return { entry: e, score };
  });
  return scored.filter((r) => r.score >= minScore).sort((a, b) => b.score - a.score).slice(0, max);
}
