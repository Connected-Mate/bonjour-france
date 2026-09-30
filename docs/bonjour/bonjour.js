/*
 * Bonjour, France — layer on top of the mirrored america.gov front-end.
 *
 * - Answers the chat UI's /api/chat requests, streamed in the AI SDK "UI message stream"
 *   format the original UI expects:
 *     · relay configured (config.js) → the question goes to Mistral's API through our relay
 *       and Mistral's answer streams in the chat, tagged with the Mistral logo;
 *     · no relay (or relay down) → verified fiche + a "Demander à Mistral" link that opens
 *       Mistral's own chat with the question prefilled (the question is also copied).
 * - Neutralises every call the original made to its own servers (feedback, error reports).
 * - Adds the "Votez pour que ça devienne officiel" GitHub star counter.
 *
 * Loaded as a classic, synchronous script before the page modules so fetch is patched first.
 */
(function () {
  "use strict";

  var CFG = window.BONJOUR_CONFIG || {};
  var BASE = "/bonjour-france";
  var REPO = "Connected-Mate/bonjour-france";
  var REPO_URL = "https://github.com/" + REPO;
  var RELAY = typeof CFG.relayUrl === "string" ? CFG.relayUrl.replace(/\/+$/, "") : "";
  var LECHAT = "https://chat.mistral.ai/chat?q=";
  var MARK = "⁤"; // invisible marker: this answer was written by Mistral
  var LS = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage blocked: stay in memory */ } },
  };

  /* ------------------------------------------------------------------ network shim */
  var origFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url;
    try { url = new URL(typeof input === "string" ? input : input instanceof URL ? input.href : input.url, location.href); }
    catch (e) { return origFetch(input, init); }
    if (url.origin === location.origin) {
      if (/\/api\/chat\/?$/.test(url.pathname)) return chatResponse(input, init);
      if (/\/api\/feedback\/?$/.test(url.pathname)) { feedbackNotice(); return Promise.resolve(new Response("{}", { status: 200, headers: { "content-type": "application/json" } })); }
      if (/\/api\//.test(url.pathname) || /\/cdn-cgi\//.test(url.pathname)) return Promise.resolve(new Response(null, { status: 204 }));
    }
    if (/(^|\.)america\.gov$/.test(url.hostname) && !/^(GET|HEAD)?$/i.test((init && init.method) || "GET")) {
      return Promise.resolve(new Response(null, { status: 204 }));
    }
    return origFetch(input, init);
  };
  if (navigator.sendBeacon) {
    var origBeacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function (u, d) {
      try { var x = new URL(u, location.href); if (x.origin === location.origin && /\/api\//.test(x.pathname)) return true; } catch (e) { /* fall through */ }
      return origBeacon(u, d);
    };
  }

  /* ------------------------------------------------------------------ small UI panel */
  var panel = null;
  function getPanel() {
    if (panel) return panel;
    panel = document.createElement("div");
    panel.className = "bf-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-live", "polite");
    panel.hidden = true;
    document.body.appendChild(panel);
    return panel;
  }
  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    for (var k in attrs || {}) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }
  function showPanel(title, body, actions, withBar) {
    var p = getPanel();
    p.textContent = "";
    p.setAttribute("aria-label", title);
    p.appendChild(el("h2", null, title));
    var para = el("p", null, body);
    p.appendChild(para);
    var bar = null;
    if (withBar) { bar = el("div", { class: "bf-bar", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": "0", "aria-label": title }); bar.appendChild(el("i")); p.appendChild(bar); }
    var row = el("div", { class: "bf-actions" });
    (actions || []).forEach(function (a) {
      var b = el("button", { type: "button", class: a.primary ? "bf-primary" : "bf-secondary" }, a.label);
      b.addEventListener("click", a.onClick);
      row.appendChild(b);
    });
    if (actions && actions.length) p.appendChild(row);
    p.hidden = false;
    var first = row.querySelector("button");
    if (first) first.focus({ preventScroll: true });
    return { text: para, bar: bar };
  }
  function hidePanel() { if (panel) panel.hidden = true; }
  function onEscape(e) { if (e.key === "Escape" && panel && !panel.hidden && panel.dataset.dismissable) hidePanel(); }
  document.addEventListener("keydown", onEscape);

  function feedbackNotice() {
    setTimeout(function () {
      getPanel().dataset.dismissable = "1";
      showPanel("Merci pour votre avis", "Bonjour, France ne recueille pas les avis sur ce site : le vôtre n’a été envoyé nulle part. Pour qu’il soit lu, publiez-le sur GitHub.", [
        { label: "Fermer", onClick: hidePanel },
        { label: "Écrire sur GitHub", primary: true, onClick: function () { hidePanel(); window.open(REPO_URL + "/issues/new", "_blank", "noopener"); } },
      ]);
    }, 400);
  }

  /* ------------------------------------------------------------------ knowledge base */
  var kbPromise = null;
  function loadKB() {
    if (!kbPromise) {
      kbPromise = origFetch(BASE + "/bonjour/kb.json").then(function (r) { if (!r.ok) throw new Error("kb " + r.status); return r.json(); })
        .then(function (rows) { return rows.map(function (e) { return Object.assign({}, e, { _k: e.keywords.map(norm) }); }); })
        .catch(function (e) { kbPromise = null; throw e; });
    }
    return kbPromise;
  }
  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
  }
  var STOP = new Set("le la les un une des de du d l a au aux et ou en dans pour par sur avec sans ce cet cette ces mon ma mes ton ta tes son sa ses notre nos votre vos leur leurs je tu il elle on nous vous ils elles me te se y ne pas plus que qui quoi quel quelle quels quelles comment quand est suis sont etre avoir ai as avez faire fait faut dois doit peux peut puis combien qu c s n j m t bonjour merci svp stp aide aider besoin veux voudrais souhaite".split(" "));
  function toks(s) { return norm(s).split(" ").filter(function (w) { return w.length > 2 && !STOP.has(w); }); }
  function stem(w) { return w.length > 5 ? w.slice(0, 5) : w; }
  function search(kb, q) {
    var qn = " " + norm(q) + " ";
    var qs = new Set(toks(q).map(stem));
    return kb.map(function (e) {
      var score = 0;
      e._k.forEach(function (k) { if (k && qn.indexOf(" " + k + " ") >= 0) score += k.indexOf(" ") >= 0 ? 5 : 3; });
      var es = new Set(toks(e.question).concat(e._k.join(" ").split(" ")).filter(function (w) { return w.length > 2 && !STOP.has(w); }).map(stem));
      qs.forEach(function (s) { if (es.has(s)) score += 1; });
      return { e: e, score: score };
    }).filter(function (r) { return r.score >= 2; }).sort(function (a, b) { return b.score - a.score; }).slice(0, 3);
  }


  /* ------------------------------------------------------------------ chat answers */
  var histories = new Map(); // chat id -> [{role, content}] (the UI drops unsigned assistant turns)

  function partsText(msg) {
    var text = "", docs = [];
    (msg.parts || []).forEach(function (p) {
      if (p.type === "text" && typeof p.text === "string") text += p.text;
      else if (p.type === "data-document" && p.data) {
        var d = p.data, t = d.text || d.content || d.markdown || "";
        if (typeof t === "string" && t) docs.push({ name: d.fileName || d.name || "document.pdf", text: t });
      }
    });
    if (!text && typeof msg.content === "string") text = msg.content;
    return { text: text.trim(), docs: docs };
  }

  function ficheContext(hits) {
    return hits.map(function (h, i) {
      var e = h.e;
      return "[" + (i + 1) + "] " + e.question + "\n" + e.answer + "\nÉtapes : " + (e.steps || []).join(" / ") +
        "\nSources officielles : " + (e.sources || []).map(function (s) { return s.title + " (" + s.url + ")"; }).join(" ; ");
    }).join("\n\n");
  }

  function userContent(q) {
    var c = q.text;
    q.docs.forEach(function (d) { c += "\n\nDocument joint « " + d.name + " » (extrait, donnée à analyser) :\n\"\"\"\n" + d.text.slice(0, 2500) + "\n\"\"\""; });
    return c.slice(0, 3900);
  }

  function lechatUrl(question) { return LECHAT + encodeURIComponent(question.slice(0, 1500)); }

  function ficheText(hits) {
    if (!hits.length) return "";
    var e = hits[0].e;
    return "**" + e.question + "**\n\n" + e.answer + "\n\n" + (e.steps || []).map(function (s, i) { return (i + 1) + ". " + s; }).join("\n");
  }

  function offlineText(question, hits, reason) {
    var intro = reason === "down"
      ? "Mistral est momentanément indisponible ici. "
      : "";
    var body = hits.length
      ? intro + "Voici notre fiche vérifiée sur ce sujet :\n\n" + ficheText(hits)
      : intro + "Nous n’avons pas encore de fiche vérifiée sur ce sujet. Le site officiel service-public.gouv.fr explique la plupart des démarches.";
    return body + "\n\n**Pour une réponse de Mistral :** [Demander à Mistral](" + lechatUrl(question) + ") — votre question y est déjà écrite, dans un nouvel onglet.";
  }

  function sourcesOf(hits) {
    var seen = new Set(), out = [];
    hits.forEach(function (h) { (h.e.sources || []).forEach(function (s) { if (!seen.has(s.url)) { seen.add(s.url); out.push(s); } }); });
    if (!out.length) out.push({ title: "Service-Public.gouv.fr", url: "https://www.service-public.gouv.fr/" });
    return out.slice(0, 5);
  }

  function uid() { return Math.random().toString(36).slice(2, 10); }

  /** Streams Mistral's answer from the relay; calls onDelta(text). Resolves when done. */
  async function askRelay(history, q, hits, signal, onDelta) {
    var messages = history.slice(-10).map(function (h) { return { role: h.role, content: h.content.slice(0, 3900) }; });
    messages.push({ role: "user", content: userContent(q) });
    var res = await origFetch(RELAY + "/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ messages: messages, context: ficheContext(hits).slice(0, 6000) }),
      signal: signal,
    });
    if (!res.ok || !res.body) throw Object.assign(new Error("relay " + res.status), { status: res.status });
    var reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    var buf = "", got = false;
    for (;;) {
      var r = await reader.read();
      if (r.done) break;
      buf += r.value;
      var lines = buf.split("\n");
      buf = lines.pop();
      for (var i = 0; i < lines.length; i++) {
        var l = lines[i].trim();
        if (!l.startsWith("data:")) continue;
        var data = l.slice(5).trim();
        if (data === "[DONE]") return got;
        try {
          var j = JSON.parse(data), c = j.choices && j.choices[0] && j.choices[0].delta && j.choices[0].delta.content;
          if (typeof c === "string" && c) { got = true; onDelta(c); }
        } catch (e) { /* partial or non-JSON line */ }
      }
    }
    return got;
  }

  function chatResponse(input, init) {
    var signal = (init && init.signal) || (input && input.signal) || null;
    var bodyP = init && init.body != null ? Promise.resolve(init.body) : (input && input.text ? input.clone().text() : Promise.resolve("{}"));
    var enc = new TextEncoder();
    var cancelled = false;
    var abort = new AbortController();
    if (signal) signal.addEventListener("abort", function () { cancelled = true; abort.abort(); }, { once: true });
    var stream = new ReadableStream({
      start: function (ctrl) {
        function send(o) { if (!cancelled) ctrl.enqueue(enc.encode("data: " + JSON.stringify(o) + "\n\n")); }
        var textId = "t" + uid(), started = false, keepAlive = null;
        function delta(s) {
          if (keepAlive) { clearInterval(keepAlive); keepAlive = null; }
          if (!started) { send({ type: "text-start", id: textId }); started = true; }
          send({ type: "text-delta", id: textId, delta: s });
        }
        async function reveal(text) { // same pace as a streamed answer
          var words = text.split(/(\s+)/);
          for (var i = 0; i < words.length && !cancelled; i += 6) { delta(words.slice(i, i + 6).join("")); await new Promise(function (r) { setTimeout(r, 20); }); }
        }
        (async function () {
          var body = {};
          try { body = JSON.parse(typeof bodyP === "string" ? bodyP : await bodyP); } catch (e) { /* keep {} */ }
          if (LS.get("bf.debug", false)) window.__bonjourLastRequest = body;
          var chatId = body.id || "default";
          var msgs = Array.isArray(body.messages) ? body.messages : [];
          var last = msgs.slice().reverse().find(function (m) { return m.role === "user"; }) || { parts: [] };
          var q = partsText(last);
          var history = histories.get(chatId) || [];
          if (body.trigger === "regenerate-message" && history.length && history[history.length - 1].role === "assistant") history.pop();
          if (history.length && history[history.length - 1].role === "user") history.pop();

          send({ type: "start", messageId: "bf-" + uid() });
          send({ type: "start-step" });
          var searchId = "search-" + uid();
          send({ type: "data-search", id: searchId, data: { status: "searching", groundings: [] } });
          // the chat UI cancels a stream silent for 55 s
          keepAlive = setInterval(function () { send({ type: "data-search", id: searchId, data: { status: "searching", groundings: [] } }); }, 10000);

          var kb = [];
          try { kb = await loadKB(); } catch (e) { /* answer without fiches */ }
          var hits = q.text ? search(kb, q.text) : [];
          var answer = "";

          if (RELAY) {
            try {
              var got = await askRelay(history, q, hits, abort.signal, function (c) {
                if (!answer) { answer = MARK; delta(MARK); }
                answer += c; delta(c);
              });
              if (!got && !cancelled) throw new Error("empty");
            } catch (err) {
              if (!cancelled) {
                console.warn("[bonjour] relais Mistral indisponible", err);
                var fallback = offlineText(q.text, hits, "down");
                if (answer) fallback = "\n\n" + fallback;
                answer += fallback;
                await reveal(fallback);
              }
            }
          } else {
            answer = offlineText(q.text, hits, "off");
            await reveal(answer);
          }

          if (started) send({ type: "text-end", id: textId });
          var groundings = sourcesOf(hits).map(function (s) { return { title: s.title, url: s.url, currency: "verified" }; });
          send({ type: "data-search", id: searchId, data: { status: "done", groundings: groundings, resultCount: groundings.length } });
          send({ type: "finish-step" });
          send({ type: "finish" });
          history.push({ role: "user", content: q.text }, { role: "assistant", content: answer.replace(MARK, "") });
          histories.set(chatId, history.slice(-12));
          if (LS.get("bf.debug", false)) window.__bonjourLastAnswer = answer;
        })().catch(function (err) {
          console.warn("[bonjour] chat", err);
          send({ type: "error", errorText: "Une erreur est survenue. Réessayez." });
        }).finally(function () {
          if (keepAlive) { clearInterval(keepAlive); keepAlive = null; }
          if (!cancelled) { ctrl.enqueue(enc.encode("data: [DONE]\n\n")); ctrl.close(); }
        });
      },
      cancel: function () { cancelled = true; abort.abort(); },
    });
    return Promise.resolve(new Response(stream, {
      status: 200,
      headers: { "content-type": "text/event-stream", "cache-control": "no-cache", "x-vercel-ai-ui-message-stream": "v1" },
    }));
  }

  /* ------------------------------------------------------------------ "Mistral" tag on Mistral's answers */
  var MISTRAL_ICON = BASE + "/bonjour/mistral-icon.svg";
  function tagAnswers() {
    document.querySelectorAll('[data-slot="message"][data-align="start"] [data-slot="message-content"]').forEach(function (c) {
      if (c.querySelector(":scope > .bf-by") || (c.textContent || "").indexOf(MARK) < 0) return;
      var t = document.createElement("div");
      t.className = "bf-by";
      t.innerHTML = '<img src="' + MISTRAL_ICON + '" alt="" width="18" height="18"><span>Mistral</span><span class="sr-only"> — réponse générée par Mistral AI</span>';
      c.insertBefore(t, c.firstChild);
    });
  }

  // "Demander à Mistral": also copy the question, in case the prefill is not applied
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest && e.target.closest('a[href^="https://chat.mistral.ai/"]');
    if (!a) return;
    try {
      var q = new URL(a.href).searchParams.get("q");
      if (q && navigator.clipboard) navigator.clipboard.writeText(q).catch(function () { /* clipboard refused */ });
    } catch (err) { /* malformed href */ }
  }, true);

  /* ------------------------------------------------------------------ vote (GitHub stars) */
  var STAR = '<svg class="bf-star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.8l2.8 5.7 6.3.9-4.6 4.4 1.1 6.2L12 17l-5.6 3 1.1-6.2L2.9 9.4l6.3-.9z"/></svg>';
  var BTN = "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint active:scale-press focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-black-100)] focus-visible:outline-none h-14 min-h-14 rounded-40 px-6 pb-0.5 type-body-m shadow-elevation-1 active:shadow-none rounded-full bg-black font-sans-display text-base leading-none font-bold tracking-[-0.01em] text-primary-invert hover:bg-black/85 focus-visible:bg-black active:bg-black motion-reduce:transition-none";
  function voteSection() {
    var s = document.createElement("section");
    s.id = "bf-vote";
    s.setAttribute("aria-labelledby", "bf-vote-title");
    s.className = "relative z-10 bg-surface-neutral pt-30 mobile:pt-24 site-desktop:pt-43.5";
    s.innerHTML =
      '<div class="site-container relative z-10 flex justify-center max-mobile:px-8"><div class="flex w-full max-w-172 flex-col items-center gap-8 text-center">' +
      '<div class="flex w-full flex-col items-center gap-5 mobile:gap-6"><h2 id="bf-vote-title" class="type-site-3 text-text-primary">Votez pour que ça devienne officiel.</h2>' +
      '<p class="px-px type-site-7 text-text-primary/70">Une étoile sur GitHub = une voix. Plus il y en a, plus l’idée d’un vrai « Bonjour, France » public pèse auprès de ceux qui décident.</p></div>' +
      '<a class="' + BTN + '" href="' + REPO_URL + '" target="_blank" rel="noopener">' + STAR + '<span>Voter avec une étoile</span><span class="sr-only"> sur GitHub (nouvel onglet)</span></a>' +
      '<p class="type-site-10 text-text-secondary" aria-live="polite"><strong class="bf-count" data-bf-count>—</strong> <span data-bf-label>votes pour l’instant</span></p>' +
      '<p class="type-site-10 text-text-secondary">Un compte GitHub gratuit est nécessaire pour voter. Le compteur est lu en direct sur GitHub.</p>' +
      "</div></div>";
    return s;
  }
  function renderCount(n) {
    document.querySelectorAll("[data-bf-count]").forEach(function (b) { b.textContent = new Intl.NumberFormat("fr-FR").format(n); });
    document.querySelectorAll("[data-bf-label]").forEach(function (b) { b.textContent = n > 1 ? "votes pour l’instant" : "vote pour l’instant"; });
  }
  function countFallback() {
    document.querySelectorAll("[data-bf-count]").forEach(function (b) { b.textContent = ""; });
    document.querySelectorAll("[data-bf-label]").forEach(function (b) { b.textContent = "Compteur momentanément indisponible — votre étoile compte quand même."; });
  }
  var starsLoaded = false;
  function loadStars() {
    var cached = LS.get("bf.stars", null);
    if (cached && typeof cached.n === "number") renderCount(cached.n);
    if (starsLoaded || (cached && Date.now() - cached.t < 10 * 60 * 1000)) return;
    starsLoaded = true;
    var ctrl = new AbortController();
    var to = setTimeout(function () { ctrl.abort(); }, 8000);
    origFetch("https://api.github.com/repos/" + REPO, { headers: { Accept: "application/vnd.github+json" }, signal: ctrl.signal })
      .then(function (r) { if (!r.ok) throw new Error("github " + r.status); return r.json(); })
      .then(function (d) { var n = Number(d.stargazers_count) || 0; LS.set("bf.stars", { n: n, t: Date.now() }); renderCount(n); })
      .catch(function () { if (!(cached && typeof cached.n === "number")) countFallback(); })
      .finally(function () { clearTimeout(to); });
  }
  function placeVote() {
    if (document.getElementById("bf-vote")) return;
    var footer = document.querySelector('[data-slot="site-footer"]');
    if (!footer || !footer.parentNode) return;
    var anchor = document.getElementById("upcoming-features");
    var s = voteSection();
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(s, anchor.nextSibling);
    else footer.parentNode.insertBefore(s, footer);
    loadStars();
  }

  /* ------------------------------------------------------------------ "Donner un avis" (footer, menu) -> GitHub */
  document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest && e.target.closest("button, a");
    if (b && /^\s*Donner un avis\s*$/.test(b.textContent || "")) {
      e.preventDefault(); e.stopImmediatePropagation();
      window.open(REPO_URL + "/issues/new", "_blank", "noopener");
    }
  }, true);


  /* ------------------------------------------------------------------ boot */
  function boot() {
    // islands hydrate after load; re-place the section / tags if React re-renders
    placeVote();
    tagAnswers();
    var queued = false;
    new MutationObserver(function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; placeVote(); tagAnswers(); });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
