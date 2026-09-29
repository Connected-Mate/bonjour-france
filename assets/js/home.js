import { $, $$, reducedMotion, escapeHtml, fmtInt, fetchJSON } from "./common.js";
import { searchCommunes, findMairie, checkAddress, searchCompanies, nextHolidays, currentWeather, datasetsCount } from "./live.js";

const errorBox = (msg, link) =>
  `<p class="msg-error">${escapeHtml(msg)}${link ? ` <a href="${link.href}" target="_blank" rel="noopener">${escapeHtml(link.text)}</a>` : ""}</p>`;

/* ---------- hero carousel + rotating hint ---------- */
function initCarousel() {
  const root = $("[data-carousel]");
  if (!root) return;
  const slides = $$(".hero-slide", root);
  const hint = $(".hero-stage [data-hint] span");
  const count = $("[data-count]");
  const pauseBtn = $("[data-pause]");
  const heroForm = $(".hero-stage .ask");
  const heroTa = $("textarea", heroForm);
  let i = 0;
  let timer = null;
  let userPaused = reducedMotion();
  let hovering = false;

  const label = (text) => (window.innerWidth < 560 ? `« ${text} »` : `Essayez « ${text} »`);
  const setHint = (text, animate) => {
    if (!hint) return;
    if (!animate || reducedMotion()) { hint.textContent = label(text); return; }
    hint.classList.add("out");
    setTimeout(() => {
      hint.textContent = label(text);
      hint.classList.remove("out");
      hint.classList.add("in");
      requestAnimationFrame(() => requestAnimationFrame(() => hint.classList.remove("in")));
    }, 350);
  };

  const show = (n, animate = true) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => {
      const on = k === i;
      s.classList.toggle("is-active", on);
      s.setAttribute("aria-hidden", String(!on));
      const b = $("button", s);
      b.tabIndex = on ? 0 : -1;
      if (on) { const img = $("img", s); if (img.loading === "lazy") img.loading = "eager"; }
    });
    setHint(slides[i].dataset.q, animate);
    count.textContent = `Exemple ${i + 1} sur ${slides.length} : ${slides[i].dataset.q}`;
    // preload next image
    const next = $("img", slides[(i + 1) % slides.length]);
    if (next.loading === "lazy") next.loading = "eager";
  };

  const schedule = () => {
    clearInterval(timer);
    if (!userPaused && !hovering && !document.hidden) timer = setInterval(() => show(i + 1), 5200);
  };

  const setPaused = (p) => {
    userPaused = p;
    $("[data-icon-pause]", pauseBtn).hidden = p;
    $("[data-icon-play]", pauseBtn).hidden = !p;
    pauseBtn.setAttribute("aria-label", p ? "Relancer les exemples" : "Mettre en pause les exemples");
    schedule();
  };

  $("[data-prev]").addEventListener("click", () => { show(i - 1); schedule(); });
  $("[data-next]").addEventListener("click", () => { show(i + 1); schedule(); });
  pauseBtn.addEventListener("click", () => setPaused(!userPaused));
  root.addEventListener("pointerenter", () => { hovering = true; schedule(); });
  root.addEventListener("pointerleave", () => { hovering = false; schedule(); });
  root.addEventListener("focusin", () => { hovering = true; schedule(); });
  root.addEventListener("focusout", () => { hovering = false; schedule(); });
  document.addEventListener("visibilitychange", schedule);
  heroTa.addEventListener("focus", () => { hovering = true; schedule(); });
  heroTa.addEventListener("blur", () => { hovering = false; schedule(); });

  // swipe on touch
  let x0 = null;
  root.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") x0 = e.clientX; });
  root.addEventListener("pointerup", (e) => {
    if (x0 == null) return;
    const dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 40) { show(dx < 0 ? i + 1 : i - 1); schedule(); }
  });

  slides.forEach((s) => $("button", s).addEventListener("click", () => {
    const url = new URL("chat.html", location.href);
    url.searchParams.set("q", s.dataset.q);
    location.href = url.toString();
  }));

  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { show(i + 1); schedule(); }
    if (e.key === "ArrowLeft") { show(i - 1); schedule(); }
  });

  if (reducedMotion()) setPaused(true);
  show(0, false);
  schedule();
}

/* ---------- statement: scroll-linked word reveal + inline tokens ---------- */
function initStatement() {
  const root = $("[data-statement]");
  if (!root) return;
  const status = $("[data-token-status]");
  const words = [];
  $$("[data-words]", root).forEach((span) => {
    const parts = span.textContent.trim().split(/\s+/);
    span.textContent = "";
    parts.forEach((w, k) => {
      const el = document.createElement("span");
      el.className = "w";
      el.textContent = w;
      span.append(el);
      if (k < parts.length - 1) span.append(" ");
      words.push(el);
    });
  });

  if (!reducedMotion()) {
    root.classList.add("is-scrubbing");
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = $("p", root).getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0 when top reaches 85% of viewport, 1 when bottom reaches 55%
      const start = vh * 0.85;
      const end = vh * 0.55;
      const total = r.height + (start - end);
      const p = Math.min(1, Math.max(0, (start - r.top) / total));
      const lit = p * words.length * 1.15;
      words.forEach((w, k) => w.style.setProperty("--o", String(Math.min(1, Math.max(0.14, lit - k)))));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  const replay = (el, cls, ms) => {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove(cls), ms);
  };

  $("[data-flag]", root).addEventListener("click", (e) => {
    replay(e.currentTarget, "is-playing", 2700);
    status.textContent = "Le drapeau flotte.";
  });

  const SEALS = [
    ["ANTS", "oklch(0.93 0.05 250)", "oklch(0.35 0.12 255)"],
    ["CAF", "oklch(0.92 0.06 200)", "oklch(0.35 0.08 210)"],
    ["Ameli", "oklch(0.93 0.05 160)", "oklch(0.36 0.09 160)"],
    ["Impôts", "oklch(0.93 0.04 280)", "oklch(0.35 0.1 280)"],
    ["URSSAF", "oklch(0.94 0.05 40)", "oklch(0.42 0.12 40)"],
    ["France Travail", "oklch(0.93 0.05 25)", "oklch(0.45 0.16 25)"],
    ["Service Public", "oklch(0.94 0.02 262)", "oklch(0.3 0.1 262)"],
    ["Légifrance", "oklch(0.94 0.04 90)", "oklch(0.4 0.08 80)"],
    ["Retraite", "oklch(0.93 0.05 300)", "oklch(0.38 0.1 300)"],
  ];
  const sealsBtn = $("[data-seals]", root);
  let s0 = 0;
  const paintSeals = () => {
    $$(".seal", sealsBtn).forEach((el, k) => {
      const [name, bg, fg] = SEALS[(s0 + k) % SEALS.length];
      el.textContent = name.length > 7 ? name.split(" ").map((w) => w[0]).join("") : name;
      el.style.background = bg;
      el.style.color = fg;
      el.title = name;
    });
  };
  paintSeals();
  sealsBtn.addEventListener("click", () => {
    sealsBtn.classList.add("is-cycling");
    setTimeout(() => {
      s0 = (s0 + 3) % SEALS.length;
      paintSeals();
      sealsBtn.classList.remove("is-cycling");
      status.textContent = `Sources : ${[0, 1, 2].map((k) => SEALS[(s0 + k) % SEALS.length][0]).join(", ")}.`;
    }, reducedMotion() ? 0 : 280);
  });

  $("[data-print]", root).addEventListener("click", (e) => {
    replay(e.currentTarget, "is-drawing", 1700);
    status.textContent = "Votre empreinte reste à vous.";
  });
}

/* ---------- feature visuals ---------- */
const SITES = [
  ["service-public.gouv.fr", "oklch(0.97 0.005 262)", "oklch(0.42 0.17 262)"],
  ["impots.gouv.fr", "oklch(0.97 0.01 250)", "oklch(0.45 0.12 250)"],
  ["ameli.fr", "oklch(0.97 0.02 220)", "oklch(0.55 0.13 230)"],
  ["caf.fr", "oklch(0.97 0.02 200)", "oklch(0.5 0.1 200)"],
  ["francetravail.fr", "oklch(0.97 0.01 262)", "oklch(0.5 0.2 25)"],
  ["ants.gouv.fr", "oklch(0.98 0.005 262)", "oklch(0.35 0.1 262)"],
  ["info-retraite.fr", "oklch(0.97 0.02 300)", "oklch(0.45 0.12 300)"],
  ["urssaf.fr", "oklch(0.97 0.02 40)", "oklch(0.55 0.14 45)"],
  ["legifrance.gouv.fr", "oklch(0.97 0.02 90)", "oklch(0.45 0.08 80)"],
  ["data.gouv.fr", "oklch(0.2 0.03 262)", "oklch(0.6 0.15 255)", "oklch(0.95 0.01 262)"],
  ["parcoursup.fr", "oklch(0.97 0.02 150)", "oklch(0.5 0.12 150)"],
  ["etudiant.gouv.fr", "oklch(0.97 0.02 180)", "oklch(0.5 0.1 190)"],
  ["monparcourshandicap.gouv.fr", "oklch(0.97 0.02 20)", "oklch(0.5 0.12 20)"],
  ["franceconnect.gouv.fr", "oklch(0.97 0.01 262)", "oklch(0.4 0.14 262)"],
  ["pass.culture.fr", "oklch(0.25 0.06 300)", "oklch(0.65 0.2 340)", "oklch(0.95 0.02 300)"],
  ["parcsnationaux.fr", "oklch(0.96 0.03 140)", "oklch(0.45 0.1 145)"],
];

function initSitesWall() {
  const v = $("[data-sites]");
  if (!v) return;
  const wall = $(".wall", v);
  const cols = 4;
  for (let c = 0; c < cols; c++) {
    const col = document.createElement("div");
    col.className = "col";
    const items = SITES.filter((_, k) => k % cols === c);
    const html = items.map(([name, bg, accent, ink]) => `<div class="site-tile" style="--tile-bg:${bg};--tile-accent:${accent};${ink ? `--tile-ink:${ink}` : ""}"><span>${name}</span><span class="hero-b"></span><span class="bar"></span><span class="bar s"></span></div>`).join("");
    col.innerHTML = html + html; // duplicated for the seamless loop
    wall.append(col);
  }
}

function initPauseButtons() {
  $$("[data-visual-pause]").forEach((btn) => {
    const v = btn.closest(".feature-visual");
    const set = (p) => {
      v.dataset.paused = String(p);
      btn.setAttribute("aria-pressed", String(p));
      btn.setAttribute("aria-label", p ? "Relancer l’animation" : "Mettre en pause l’animation");
      btn.innerHTML = p
        ? '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="6" width="3.2" height="12" rx="1"/><rect x="13.8" y="6" width="3.2" height="12" rx="1"/></svg>';
    };
    btn.addEventListener("click", () => set(v.dataset.paused !== "true"));
    if (reducedMotion()) set(true);
  });
}

function initNight() {
  const v = $("[data-night]");
  if (!v) return;
  const stars = $(".stars", v);
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  for (let k = 0; k < 70; k++) {
    const s = document.createElement("span");
    s.className = "star";
    s.style.left = `${rnd() * 100}%`;
    s.style.top = `${rnd() * 100}%`;
    s.style.animationDelay = `${rnd() * 3.5}s`;
    const size = rnd() < 0.15 ? 3 : 2;
    s.style.width = s.style.height = `${size}px`;
    stars.append(s);
  }
  const shoot = () => {
    if (reducedMotion()) return;
    const el = document.createElement("span");
    el.className = "shooting";
    const a = 20 + Math.random() * 20;
    el.style.left = `${10 + Math.random() * 40}%`;
    el.style.top = `${5 + Math.random() * 30}%`;
    el.style.setProperty("--a", `${a}deg`);
    const d = 260 + Math.random() * 120;
    el.style.setProperty("--dx", `${Math.cos((a * Math.PI) / 180) * d}px`);
    el.style.setProperty("--dy", `${Math.sin((a * Math.PI) / 180) * d}px`);
    v.append(el);
    el.addEventListener("animationend", () => el.remove(), { once: true });
  };
  $("[data-shoot]", v).addEventListener("click", shoot);
}

function initSourcesGrid() {
  const v = $("[data-sources-visual]");
  if (!v) return;
  const names = [
    ["Service Public", "démarches"], ["Impôts", "déclaration"], ["Ameli", "santé"], ["CAF", "allocations"],
    ["France Travail", "emploi"], ["ANTS", "titres"], ["Info Retraite", "retraite"], ["Légifrance", "droit"],
    ["Parcoursup", "études"], ["CROUS", "bourses"], ["SignalConso", "litiges"], ["FranceConnect", "identité"],
    ["Pass Culture", "culture"], ["Parcs nationaux", "nature"], ["data.gouv", "données"], ["MDPH", "handicap"],
  ];
  $(".grid", v).innerHTML = names.map(([n, s]) => `<span class="src-badge">${n}<small>${s}</small></span>`).join("");
}

/* ---------- live data ---------- */
async function initDatasets() {
  const el = $("[data-datagouv]");
  if (!el) return;
  const dot = $("[data-live-dot]");
  try {
    const n = await datasetsCount();
    if (!n) throw new Error("empty");
    el.innerHTML = `En direct : <b>${fmtInt(n)}</b> jeux de données publics ouverts sur <a href="https://www.data.gouv.fr/" target="_blank" rel="noopener">data.gouv.fr</a>.`;
  } catch {
    dot.classList.add("is-off");
    el.innerHTML = `Des dizaines de milliers de jeux de données publics sont ouverts sur <a href="https://www.data.gouv.fr/" target="_blank" rel="noopener">data.gouv.fr</a>.`;
  }
}

const CITIES = [
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Marseille", lat: 43.2965, lon: 5.3698 },
  { name: "Lyon", lat: 45.764, lon: 4.8357 },
  { name: "Lille", lat: 50.6292, lon: 3.0573 },
  { name: "Bordeaux", lat: 44.8378, lon: -0.5792 },
  { name: "Strasbourg", lat: 48.5734, lon: 7.7521 },
  { name: "Fort-de-France", lat: 14.6161, lon: -61.0588 },
];

async function initWeather() {
  const ul = $("[data-weather]");
  if (!ul) return;
  try {
    const rows = await currentWeather(CITIES);
    ul.innerHTML = rows.map((r) => `<li><span>${r.name}</span><span class="c">${escapeHtml(r.label)}</span><span class="t">${r.temp}°</span></li>`).join("");
  } catch {
    ul.innerHTML = `<li style="display:block">La météo ne répond pas pour le moment. <a href="https://meteofrance.com/" target="_blank" rel="noopener" style="color:inherit">Voir Météo-France</a></li>`;
  }
}

async function initFerie() {
  const box = $("[data-ferie]");
  if (!box) return;
  try {
    const [next, ...after] = await nextHolidays(3);
    if (!next) throw new Error("none");
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const days = Math.round((next.date - today) / 864e5);
    const date = next.date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    box.innerHTML = `
      <p class="big-num">${days === 0 ? "Aujourd’hui" : `J-${days}`}</p>
      <p style="margin:6px 0 0"><b>${escapeHtml(next.name)}</b><br><span class="msg-muted">${date}</span></p>
      ${after.length ? `<p class="msg-muted" style="margin:10px 0 0">Ensuite : ${after.map((h) => `${escapeHtml(h.name)} (${h.date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })})`).join(", ")}</p>` : ""}`;
  } catch {
    box.innerHTML = errorBox("Calendrier indisponible pour le moment.", { href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2405", text: "Voir la liste officielle" });
  }
}

function initMairie() {
  const form = $("[data-mairie-form]");
  if (!form) return;
  const input = $("input", form);
  const list = $("#commune-list");
  const out = $("[data-mairie-out]");
  let items = [];
  let active = -1;
  let ctrl = null;
  let debounce = null;

  const close = () => { list.hidden = true; input.setAttribute("aria-expanded", "false"); input.removeAttribute("aria-activedescendant"); active = -1; };
  const renderList = () => {
    if (!items.length) return close();
    list.innerHTML = items.map((c, k) => `<li role="option" id="commune-opt-${k}" aria-selected="${k === active}" data-k="${k}">${escapeHtml(c.nom)} <small>${escapeHtml(c.departement?.nom || "")} · ${c.codesPostaux?.[0] || c.code}</small></li>`).join("");
    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
    if (active >= 0) input.setAttribute("aria-activedescendant", `commune-opt-${active}`);
  };

  const lookup = async (q) => {
    ctrl?.abort();
    ctrl = new AbortController();
    try {
      items = await searchCommunes(q, { signal: ctrl.signal });
      active = -1;
      renderList();
    } catch (e) {
      if (e.name !== "AbortError") { items = []; close(); }
    }
  };

  input.addEventListener("input", () => {
    clearTimeout(debounce);
    const q = input.value.trim();
    if (q.length < 2) { items = []; close(); return; }
    debounce = setTimeout(() => lookup(q), 220);
  });
  input.addEventListener("keydown", (e) => {
    if (list.hidden) return;
    if (e.key === "ArrowDown") { e.preventDefault(); active = (active + 1) % items.length; renderList(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); active = (active - 1 + items.length) % items.length; renderList(); }
    else if (e.key === "Escape") { close(); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); choose(items[active]); }
  });
  input.addEventListener("blur", () => setTimeout(close, 150));
  list.addEventListener("mousedown", (e) => e.preventDefault());
  list.addEventListener("click", (e) => {
    const li = e.target.closest("li[data-k]");
    if (li) choose(items[Number(li.dataset.k)]);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) { out.innerHTML = `<p class="msg-muted">Tapez le nom d’une commune ou un code postal.</p>`; input.focus(); return; }
    if (items.length && items[0].nom.toLowerCase() === q.toLowerCase()) return choose(items[0]);
    out.innerHTML = `<div class="skeleton" style="height:120px"></div>`;
    try {
      const res = await searchCommunes(q, { limit: 1 });
      if (!res.length) { out.innerHTML = `<p class="msg-muted">Aucune commune trouvée pour « ${escapeHtml(q)} ». Vérifiez l’orthographe ou essayez le code postal.</p>`; return; }
      choose(res[0]);
    } catch {
      out.innerHTML = errorBox("Le service des communes ne répond pas. Réessayez dans un instant ou", { href: "https://lannuaire.service-public.gouv.fr/", text: "cherchez sur l’annuaire officiel" });
    }
  });

  $$("[data-commune]").forEach((b) => b.addEventListener("click", async () => {
    input.value = b.dataset.commune;
    form.requestSubmit();
  }));
  // Show a real example on load, only when the tile comes into view (saves requests).
  const tile = form.closest(".tile");
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    if (!input.value && !out.innerHTML.trim()) { input.value = "Lyon"; form.requestSubmit(); input.value = ""; }
  }, { rootMargin: "200px" });
  io.observe(tile);

  async function choose(c) {
    close();
    input.value = c.nom;
    out.innerHTML = `<div class="skeleton" style="height:140px"></div>`;
    const head = `<p class="msg-muted" style="margin:0">${escapeHtml(c.nom)} · ${escapeHtml(c.departement?.nom || "")} (${escapeHtml(c.departement?.code || "")}) · ${escapeHtml(c.region?.nom || "")}${c.population ? ` · ${fmtInt(c.population)} habitants` : ""}</p>`;
    try {
      const mairies = await findMairie(c.code);
      if (!mairies.length) {
        out.innerHTML = `<div class="result">${head}<p style="margin:0">Pas de fiche mairie trouvée pour cette commune (c’est le cas de Paris, organisée par arrondissement).</p><div class="actions"><a class="btn btn-ghost" href="https://lannuaire.service-public.gouv.fr/navigation/mairie?where=${encodeURIComponent(c.nom)}" target="_blank" rel="noopener">Chercher sur l’annuaire officiel</a></div></div>`;
        return;
      }
      out.innerHTML = mairies.slice(0, 2).map((m) => `
        <div class="result">
          ${head}
          <h4>${escapeHtml(m.nom)}</h4>
          <dl>
            ${m.adresse ? `<dt>Adresse</dt><dd>${escapeHtml(m.adresse)}</dd>` : ""}
            ${m.horaires.length ? `<dt>Horaires</dt><dd>${m.horaires.map((h) => `${escapeHtml(h.days)} : ${escapeHtml(h.slots)}`).join("<br>")}</dd>` : ""}
            ${m.tel ? `<dt>Téléphone</dt><dd><a href="tel:${m.tel.replace(/\s/g, "")}">${escapeHtml(m.tel)}</a></dd>` : ""}
          </dl>
          <div class="actions">
            ${m.site ? `<a class="btn btn-primary" href="${escapeHtml(m.site)}" target="_blank" rel="noopener">Site de la mairie</a>` : ""}
            ${m.fiche ? `<a class="btn btn-ghost" href="${escapeHtml(m.fiche)}" target="_blank" rel="noopener">Fiche officielle</a>` : ""}
          </div>
        </div>`).join("");
    } catch {
      out.innerHTML = `<div class="result">${head}</div>` + errorBox("L’annuaire ne répond pas pour le moment.", { href: "https://lannuaire.service-public.gouv.fr/", text: "Ouvrir l’annuaire officiel" });
    }
  }
}

function initAdresse() {
  const form = $("[data-adresse-form]");
  if (!form) return;
  const input = $("input", form);
  const out = $("[data-adresse-out]");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (q.length < 3) { out.innerHTML = `<p class="msg-muted">Tapez une adresse (au moins 3 caractères).</p>`; return; }
    out.innerHTML = `<div class="skeleton" style="height:64px"></div>`;
    try {
      const r = await checkAddress(q);
      if (!r) { out.innerHTML = `<p class="msg-muted">Adresse introuvable. Essayez avec le code postal ou la ville.</p>`; return; }
      const quality = r.score > 0.8 ? "Correspondance forte" : r.score > 0.5 ? "Correspondance probable" : "Correspondance faible — vérifiez";
      out.innerHTML = `<div class="result"><h4>${escapeHtml(r.label)}</h4><dl><dt>Fiabilité</dt><dd>${quality} (${Math.round(r.score * 100)} %)</dd><dt>Secteur</dt><dd>${escapeHtml(r.context || "")}</dd><dt>Code commune</dt><dd>${escapeHtml(r.citycode || "")}</dd></dl></div>`;
    } catch {
      out.innerHTML = errorBox("La Base Adresse Nationale ne répond pas.", { href: "https://adresse.data.gouv.fr/", text: "Réessayer sur adresse.data.gouv.fr" });
    }
  });
}

function initEntreprise() {
  const form = $("[data-entreprise-form]");
  if (!form) return;
  const input = $("input", form);
  const out = $("[data-entreprise-out]");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const q = input.value.trim().replace(/\s(?=\d)/g, "");
    if (q.length < 3) { out.innerHTML = `<p class="msg-muted">Tapez au moins 3 caractères.</p>`; return; }
    out.innerHTML = `<div class="skeleton" style="height:64px"></div>`;
    try {
      const rows = await searchCompanies(q);
      if (!rows.length) { out.innerHTML = `<p class="msg-muted">Aucune entreprise trouvée.</p>`; return; }
      out.innerHTML = rows.slice(0, 2).map((r) => `<div class="result"><h4>${escapeHtml(r.nom)}</h4><dl><dt>SIREN</dt><dd>${escapeHtml(r.siren)}</dd><dt>État</dt><dd>${r.actif ? "En activité" : "Fermée"}</dd>${r.creation ? `<dt>Création</dt><dd>${new Date(r.creation).toLocaleDateString("fr-FR")}</dd>` : ""}${r.adresse ? `<dt>Siège</dt><dd>${escapeHtml(r.adresse)}</dd>` : ""}</dl><div class="actions"><a class="btn btn-ghost" href="https://annuaire-entreprises.data.gouv.fr/entreprise/${encodeURIComponent(r.siren)}" target="_blank" rel="noopener">Fiche complète</a></div></div>`).join("");
    } catch (err) {
      out.innerHTML = errorBox(err.status === 429 ? "Trop de recherches d’un coup. Patientez quelques secondes." : "Le répertoire ne répond pas pour le moment.", { href: "https://annuaire-entreprises.data.gouv.fr/", text: "Ouvrir l’Annuaire des Entreprises" });
    }
  });
}

async function initUrgences() {
  const ul = $("[data-urgences]");
  if (!ul) return;
  const fallback = [
    { numero: "112", label: "Urgence européenne" }, { numero: "15", label: "SAMU" }, { numero: "17", label: "Police secours" },
    { numero: "18", label: "Pompiers" }, { numero: "114", label: "Urgence par SMS (sourds, malentendants)" }, { numero: "119", label: "Enfance en danger" }, { numero: "3919", label: "Violences femmes info" },
  ];
  let rows = fallback;
  try { rows = await fetchJSON("./assets/data/urgences.json", { timeout: 5000 }); } catch { /* keep fallback */ }
  ul.innerHTML = rows.map((r) => `<li><a href="${/^\d+$/.test(r.numero) && r.numero !== "114" ? `tel:${r.numero}` : r.numero === "114" ? "sms:114" : "#"}"><b>${escapeHtml(r.numero)}</b><span>${escapeHtml(r.label)}</span></a></li>`).join("");
}

/* ---------- coming soon rail ---------- */
function initRail() {
  const rail = $("[data-rail]");
  if (!rail) return;
  $$(".mock", rail).forEach((m) => {
    const clone = m.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.inert = true;
    rail.append(clone);
  });
}

initCarousel();
initStatement();
initSitesWall();
initPauseButtons();
initNight();
initSourcesGrid();
initRail();
initDatasets();
initWeather();
initFerie();
initMairie();
initAdresse();
initEntreprise();
initUrgences();
