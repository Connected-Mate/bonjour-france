// Shared behaviour for every page: notice, menu, ask bars, dock, votes, theme, reveal.
import { CONFIG } from "./config.js";

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const store = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch { /* storage blocked */ }
  },
};

export const session = {
  get(key) {
    try { const raw = sessionStorage.getItem(key); return raw ? JSON.parse(raw) : null; } catch { return null; }
  },
  set(key, value) {
    try { sessionStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
  },
  remove(key) {
    try { sessionStorage.removeItem(key); } catch { /* storage blocked */ }
  },
};

export function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/** fetch JSON with timeout; throws Error with .status on HTTP errors. */
export async function fetchJSON(url, { timeout = 8000, signal, headers } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(new DOMException("timeout", "TimeoutError")), timeout);
  const onAbort = () => ctrl.abort(signal.reason);
  signal?.addEventListener("abort", onAbort, { once: true });
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { Accept: "application/json", ...headers } });
    if (!res.ok) {
      const err = new Error(`HTTP ${res.status}`);
      err.status = res.status;
      throw err;
    }
    return await res.json();
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}

export const fmtInt = (n) => new Intl.NumberFormat("fr-FR").format(n);

/* ---------- unofficial notice ---------- */
function initNotice() {
  const btn = $(".notice-toggle");
  const panel = $("#notice-panel");
  if (!btn || !panel) return;
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    panel.hidden = open;
  });
}

/* ---------- menu ---------- */
function initMenu() {
  const btn = $(".menu-btn");
  const dlg = $("#site-menu");
  if (!btn || !dlg) return;
  const open = () => {
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "");
    btn.setAttribute("aria-expanded", "true");
  };
  const close = () => {
    if (typeof dlg.close === "function") dlg.close();
    else dlg.removeAttribute("open");
  };
  btn.addEventListener("click", open);
  $(".menu-close", dlg).addEventListener("click", close);
  dlg.addEventListener("close", () => {
    btn.setAttribute("aria-expanded", "false");
    btn.focus();
  });
  // click on backdrop closes
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg) close();
  });
}

/* ---------- ask bars ---------- */
const PDF_KEY = "hf.pendingPdf";

function autosize(ta) {
  ta.style.height = "auto";
  ta.style.height = Math.min(ta.scrollHeight, 180) + "px";
}

export function renderAttachment(form, att, onRemove) {
  const box = $("[data-attach]", form);
  if (!box) return;
  if (!att) {
    box.hidden = true;
    box.innerHTML = "";
    return;
  }
  box.hidden = false;
  box.innerHTML = `<span class="chip"><span><b>PDF</b> ${escapeHtml(att.name)} · ${fmtInt(att.pages)} p.</span><button type="button" aria-label="Retirer le document ${escapeHtml(att.name)}">×</button></span>`;
  $("button", box).addEventListener("click", () => {
    onRemove?.();
    renderAttachment(form, null);
  });
}

export function setAskStatus(form, text) {
  let el = $("[data-ask-status]", form.parentElement);
  if (!el) {
    el = document.createElement("p");
    el.className = "ask-status sr-only";
    el.setAttribute("role", "status");
    el.dataset.askStatus = "";
    form.after(el);
  }
  el.textContent = text;
}

/**
 * Wire an ask form. options.onSubmit(text, attachment) replaces navigation to chat.html.
 * Returns an API for chat.js (setBusy, clear, focus).
 */
export function initAsk(form, options = {}) {
  const ta = $("textarea", form);
  const file = $("[data-file]", form);
  const pdfBtn = $('[data-action="pdf"]', form);
  const voiceBtn = $('[data-action="voice"]', form);
  let attachment = options.onSubmit ? null : session.get(PDF_KEY);
  if (attachment && !options.onSubmit) renderAttachment(form, attachment, () => { attachment = null; session.remove(PDF_KEY); });

  const syncHasText = () => form.classList.toggle("has-text", ta.value.trim().length > 0);
  ta.addEventListener("input", () => { autosize(ta); syncHasText(); });
  ta.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let text = ta.value.trim();
    if (!text && attachment) text = "Pouvez-vous m’expliquer ce document simplement ?";
    if (!text) {
      ta.focus();
      setAskStatus(form, "Écrivez d’abord votre question.");
      return;
    }
    if (options.onSubmit) {
      const ok = options.onSubmit(text, attachment);
      if (ok !== false) {
        ta.value = "";
        autosize(ta);
        syncHasText();
        attachment = null;
        renderAttachment(form, null);
      }
      return;
    }
    if (attachment) session.set(PDF_KEY, attachment);
    const url = new URL(form.getAttribute("action"), location.href);
    url.searchParams.set("q", text.slice(0, 2000));
    location.href = url.toString();
  });

  // PDF: read locally with pdf.js, keep only the text.
  pdfBtn?.addEventListener("click", () => file.click());
  file?.addEventListener("change", async () => {
    const f = file.files?.[0];
    file.value = "";
    if (!f) return;
    if (f.size > CONFIG.pdf.maxBytes) {
      setAskStatus(form, "Document trop lourd.");
      alertInline(form, `Ce PDF fait plus de ${Math.round(CONFIG.pdf.maxBytes / 1e6)} Mo. Essayez un document plus léger.`);
      return;
    }
    pdfBtn.disabled = true;
    alertInline(form, "Lecture du document sur votre appareil…", true);
    try {
      const { extractPdfText } = await import("./pdf.js");
      const res = await extractPdfText(f, CONFIG.pdf.maxChars);
      if (!res.text.trim()) throw Object.assign(new Error("empty"), { code: "empty" });
      attachment = { name: f.name, pages: res.pages, text: res.text, truncated: res.truncated };
      if (!options.onSubmit) session.set(PDF_KEY, attachment);
      renderAttachment(form, attachment, () => { attachment = null; session.remove(PDF_KEY); });
      alertInline(form, null);
      setAskStatus(form, `Document ${f.name} joint.`);
      ta.focus();
    } catch (err) {
      alertInline(form, err.code === "empty"
        ? "Ce PDF ne contient pas de texte lisible (c’est peut-être un scan)."
        : err.name === "PasswordException" ? "Ce PDF est protégé par un mot de passe." : "Impossible de lire ce PDF.");
    } finally {
      pdfBtn.disabled = false;
    }
  });

  // Voice: Web Speech API (fr-FR). Hidden where unsupported.
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR && voiceBtn) {
    voiceBtn.disabled = true;
    voiceBtn.title = "La dictée n’est pas disponible dans ce navigateur";
    voiceBtn.setAttribute("aria-label", "Dictée vocale indisponible dans ce navigateur");
  } else if (voiceBtn) {
    let rec = null;
    const stop = () => { try { rec?.stop(); } catch { /* already stopped */ } };
    voiceBtn.addEventListener("click", () => {
      if (rec) return stop();
      rec = new SR();
      rec.lang = "fr-FR";
      rec.interimResults = true;
      rec.continuous = false;
      const base = ta.value ? ta.value.trimEnd() + " " : "";
      voiceBtn.classList.add("is-listening");
      voiceBtn.setAttribute("aria-pressed", "true");
      setAskStatus(form, "Dictée en cours, parlez.");
      rec.onresult = (ev) => {
        const txt = [...ev.results].map((r) => r[0].transcript).join("");
        ta.value = base + txt;
        autosize(ta);
        syncHasText();
      };
      rec.onerror = (ev) => {
        if (ev.error === "not-allowed" || ev.error === "service-not-allowed") alertInline(form, "Micro refusé. Autorisez le micro dans votre navigateur pour dicter.");
        else if (ev.error === "network") alertInline(form, "La dictée a besoin d’une connexion internet.");
        else if (ev.error !== "no-speech" && ev.error !== "aborted") alertInline(form, "La dictée n’a pas fonctionné. Réessayez ou écrivez votre question.");
      };
      rec.onend = () => {
        voiceBtn.classList.remove("is-listening");
        voiceBtn.setAttribute("aria-pressed", "false");
        setAskStatus(form, "Dictée terminée.");
        rec = null;
        ta.focus();
      };
      try { rec.start(); } catch { rec = null; }
    });
  }

  syncHasText();
  return {
    textarea: ta,
    focus: () => ta.focus(),
    setBusy(busy) { form.dataset.busy = busy ? "true" : "false"; },
    setValue(v) { ta.value = v; autosize(ta); syncHasText(); },
  };
}

function alertInline(form, text, muted = false) {
  let el = form.previousElementSibling?.matches?.("[data-ask-alert]") ? form.previousElementSibling : null;
  if (!text) { el?.remove(); return; }
  if (!el) {
    el = document.createElement("p");
    el.dataset.askAlert = "";
    el.setAttribute("role", "alert");
    form.before(el);
  }
  el.className = muted ? "msg-muted" : "msg-error";
  el.style.margin = "0 0 10px";
  el.textContent = text;
}

/* ---------- dock: shows once the hero ask bar is off screen ---------- */
function initDock() {
  const dock = $("[data-dock]");
  if (!dock) return;
  const hero = $(".hero-stage .ask");
  const footer = $(".site-footer");
  if (!hero) return; // content pages: always visible
  let heroVisible = true;
  let footerVisible = false;
  const apply = () => { dock.dataset.hidden = String(heroVisible || footerVisible); dock.inert = heroVisible || footerVisible; };
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; apply(); }).observe(hero);
  if (footer) new IntersectionObserver(([e]) => { footerVisible = e.isIntersecting && e.intersectionRatio > 0.35; apply(); }, { threshold: [0, 0.35, 0.6] }).observe($(".foot-legal") || footer);
  apply();
}

/* ---------- GitHub stars = votes ---------- */
async function initStars() {
  const out = $$("[data-star-count]");
  if (!out.length) return;
  const label = $$("[data-star-label]");
  const KEY = "hf.stars";
  const render = (n, stale) => {
    out.forEach((el) => (el.textContent = fmtInt(n)));
    label.forEach((el) => (el.textContent = `${n > 1 ? "votes" : "vote"} (étoiles GitHub)${stale ? " · dernier chiffre connu" : ""}`));
  };
  const cached = store.get(KEY);
  if (cached && typeof cached.n === "number") render(cached.n, false);
  if (cached && Date.now() - cached.t < CONFIG.stars.ttlMs) return;
  try {
    const data = await fetchJSON(`https://api.github.com/repos/${CONFIG.repo}`, { timeout: 7000, headers: { Accept: "application/vnd.github+json" } });
    const n = Number(data.stargazers_count) || 0;
    store.set(KEY, { n, t: Date.now() });
    render(n, false);
  } catch {
    if (cached && typeof cached.n === "number") render(cached.n, true);
    else {
      out.forEach((el) => (el.textContent = "—"));
      label.forEach((el) => (el.textContent = "Compteur indisponible pour le moment — voyez le total sur GitHub"));
    }
  }
}

/* ---------- theme ---------- */
function initTheme() {
  const btn = $("[data-theme-toggle]");
  if (!btn) return;
  const labels = { auto: "automatique", light: "clair", dark: "sombre" };
  const order = ["auto", "light", "dark"];
  let current = store.get("hf.theme", "auto");
  if (!order.includes(current)) current = "auto";
  const apply = () => {
    if (current === "auto") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = current;
    btn.textContent = `Thème : ${labels[current]}`;
    btn.setAttribute("aria-label", `Thème actuel : ${labels[current]}. Changer de thème`);
  };
  btn.addEventListener("click", () => {
    current = order[(order.indexOf(current) + 1) % order.length];
    if (current === "auto") store.remove("hf.theme"); else store.set("hf.theme", current);
    apply();
  });
  apply();
}

/* ---------- reveal on scroll ---------- */
function initReveal() {
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window) || reducedMotion()) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  els.forEach((el) => io.observe(el));
}

/* ---------- focus ask helpers ---------- */
function initFocusAsk() {
  $$("[data-focus-ask]").forEach((b) => b.addEventListener("click", () => {
    const ta = $(".hero-stage textarea") || $("[data-dock] textarea");
    ta?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "center" });
    setTimeout(() => ta?.focus({ preventScroll: true }), reducedMotion() ? 0 : 450);
  }));
}

function boot() {
  initNotice();
  initMenu();
  $$("[data-ask]").forEach((f) => { if (!f.closest("[data-chat-dock]")) initAsk(f); });
  initDock();
  initStars();
  initTheme();
  initReveal();
  initFocusAsk();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
else boot();
