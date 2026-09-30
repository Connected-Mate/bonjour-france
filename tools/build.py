#!/usr/bin/env python3
"""Build Bonjour, France from the pristine america.gov mirror.

    python3 tools/build.py            # writes docs/ (GitHub Pages source)

Pipeline (each step is idempotent and works on a fresh copy of _mirror/):
  1. copy _mirror/ -> staging, overlay tools/overrides/ (images, icons, fonts)
  2. drop commercial fonts, point @font-face at free fonts (Geist, Newsreader)
  3. French copy: patch the message dictionary, HTML text, JS literals
  4. branding, footer credits, links to /bonjour-france/
  5. strip every call to america.gov servers (API, Cloudflare scripts)
  6. inject bonjour.css / bonjour.js (local Mistral chat, vote counter)
"""
from __future__ import annotations

import html
import json
import os
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MIRROR = ROOT / "_mirror"
OVERRIDES = ROOT / "tools" / "overrides"
I18N = ROOT / "tools" / "i18n"
STATIC = ROOT / "tools" / "static"
OUT = ROOT / "docs"
STAGE = ROOT / ".build-stage"

BASE = "/bonjour-france"
SITE_URL = "https://connected-mate.github.io/bonjour-france"
REPO_URL = "https://github.com/Connected-Mate/bonjour-france"
LINKEDIN = "https://www.linkedin.com/in/alex-cormeraie/"
PAGES = ["how-it-works", "privacy-policy", "privacy", "about", "coming-soon", "faq", "terms", "chat"]
COMMERCIAL_FONTS = re.compile(r"^(helvetica-now-|rhymes-)")

warnings: list[str] = []


def warn(msg: str) -> None:
    warnings.append(msg)


def read(p: Path) -> str:
    return p.read_text(encoding="utf-8")


def write(p: Path, s: str) -> None:
    p.write_text(s, encoding="utf-8")


def must_replace(s: str, old: str, new: str, where: str, count: int | None = None) -> str:
    n = s.count(old)
    if n == 0:
        raise SystemExit(f"[build] pattern not found in {where}: {old[:80]!r}")
    if count is not None and n != count:
        raise SystemExit(f"[build] expected {count} match(es) in {where}, got {n}: {old[:80]!r}")
    return s.replace(old, new)


def astro(name_re: str) -> Path:
    hits = [p for p in (STAGE / "_astro").iterdir() if re.match(name_re, p.name)]
    if len(hits) != 1:
        raise SystemExit(f"[build] expected one _astro file for {name_re}, got {[h.name for h in hits]}")
    return hits[0]


# --------------------------------------------------------------------------- 1. staging
SEAL_NAMES = re.compile(
    r"^(seal-|fallback-)|great-seal|gsa-gold-seal|government-.*-seal|medicare-seal|veterans-crisis-line-seal|"
    r"^(treasury|us-marshals|dea|faa|library-of-congress|labor|patent-and-trademark|forest-service|"
    r"surface-transportation-board|transportation|state\.gov|ssa\.gov|cbp\.gov|social-security-older|"
    r"name-change-(irs|ssa|state)|employment-navy|navy|sources-panel|passport-(cover|book|card|thumbnail|open|details|both))$")
# names shared by agency website thumbnails (kept) and agency seals (replaced): decided by the file's shape
SHARED_NAMES = re.compile(r"^(fbi|house|congress|energy|cbp|gsa|nasa|hud)$")
BRAND_NAMES = re.compile(r"^(america-wordmark|america-og|america-twitter|artwork|favicon|apple-touch-icon|webclip)$")


def asset_base(rel: Path) -> str:
    n = rel.name
    if rel.parts[0] == "_astro":
        n = re.sub(r"\.[A-Za-z0-9_-]{8}(_[A-Za-z0-9]+)?\.(webp|png|jpg|svg)$", "", n)
    return re.sub(r"\.(webp|png|jpg|svg|ico)$", "", n)


def looks_like_seal(path: Path) -> bool:
    """Round emblem on a transparent background (seal), as opposed to a rectangular website screenshot."""
    if path.suffix == ".svg":
        return True
    try:
        from PIL import Image  # optional dependency, only needed for this check
    except ImportError:
        return True
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    a = im.getchannel("A")
    corners = max(a.getpixel((1, 1)), a.getpixel((w - 2, 1)), a.getpixel((1, h - 2)), a.getpixel((w - 2, h - 2)))
    return 0.85 < w / h < 1.18 and corners < 40


def override_applies(rel: Path) -> bool:
    """america.gov's own logos, icons, photos and illustrations stay as-is. Only US government seals and
    emblems are replaced (18 U.S.C. 713), plus the name-bearing brand images and files the mirror lacks."""
    original = MIRROR / rel
    if not original.exists():
        return True
    if rel.parts[:2] in (("images", "agency-seals"), ("images", "seals")) or rel.parts[:3] == ("images", "home", "seals"):
        return True
    base = asset_base(rel)
    if SEAL_NAMES.search(base) or BRAND_NAMES.match(base):
        return True
    if SHARED_NAMES.match(base):
        return looks_like_seal(original)
    return rel.suffix == ".wasm"


def stage() -> None:
    if STAGE.exists():
        shutil.rmtree(STAGE)
    shutil.copytree(MIRROR, STAGE)
    for src in OVERRIDES.rglob("*"):
        if src.is_dir() or src.name.endswith(".md") or src.name == ".DS_Store":
            continue
        rel = src.relative_to(OVERRIDES)
        if rel.parts[0] not in ("fonts",) and not override_applies(rel):
            continue
        if rel.parts[0] == "fonts":
            dst = STAGE / "_astro" / "fonts" / rel.name
        else:
            dst = STAGE / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
    # the chat is a client-side state of the home page
    (STAGE / "chat").mkdir(exist_ok=True)
    shutil.copy2(STAGE / "index.html", STAGE / "chat" / "index.html")
    if STATIC.exists():
        shutil.copytree(STATIC, STAGE / "bonjour", dirs_exist_ok=True)
    if os.environ.get("BONJOUR_RELAY_URL"):
        cfg = STAGE / "bonjour" / "config.js"
        write(cfg, re.sub(r'relayUrl:\s*"[^"]*"', 'relayUrl: "' + os.environ["BONJOUR_RELAY_URL"] + '"', read(cfg)))
        warn("relayUrl overridden by BONJOUR_RELAY_URL (local test build)")
    constants = STAGE / "_astro" / "constants.C1DrMbu0.js"
    if not constants.exists():
        shutil.copy2(STATIC / "constants-fallback.js", constants)
        warn("constants.C1DrMbu0.js missing from mirror: using tools/static/constants-fallback.js")


# --------------------------------------------------------------------------- 2. fonts
FONT_FACES = """@font-face{font-family:Helvetica Now Text;src:url(/_astro/fonts/geist-latin.woff2)format("woff2");font-weight:100 900;font-style:normal;font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\
@font-face{font-family:Helvetica Now Text;src:url(/_astro/fonts/geist-latin-ext.woff2)format("woff2");font-weight:100 900;font-style:normal;font-display:swap;unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}\
@font-face{font-family:Helvetica Now Display;src:url(/_astro/fonts/geist-latin.woff2)format("woff2");font-weight:100 900;font-style:normal;font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\
@font-face{font-family:Helvetica Now Display;src:url(/_astro/fonts/geist-latin-ext.woff2)format("woff2");font-weight:100 900;font-style:normal;font-display:swap;unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}\
@font-face{font-family:Rhymes Text;src:url(/_astro/fonts/newsreader-latin.woff2)format("woff2");font-weight:200 800;font-style:normal;font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\
@font-face{font-family:Rhymes Text;src:url(/_astro/fonts/newsreader-latin-ext.woff2)format("woff2");font-weight:200 800;font-style:normal;font-display:swap;unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}\
@font-face{font-family:Rhymes Text;src:url(/_astro/fonts/newsreader-italic-latin.woff2)format("woff2");font-weight:200 800;font-style:italic;font-display:swap}\
@font-face{font-family:Rhymes Display;src:url(/_astro/fonts/newsreader-latin.woff2)format("woff2");font-weight:200 800;font-style:normal;font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\
@font-face{font-family:Rhymes Display;src:url(/_astro/fonts/newsreader-latin-ext.woff2)format("woff2");font-weight:200 800;font-style:normal;font-display:swap;unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}"""


def fonts() -> None:
    face_re = re.compile(r"@font-face\{font-family:(?:Helvetica Now (?:Text|Display)|Rhymes (?:Text|Display));[^}]*\}")
    done = False
    for css in (STAGE / "_astro").glob("*.css"):
        s = read(css)
        if not face_re.search(s):
            continue
        first = True

        def sub(m: re.Match) -> str:
            nonlocal first
            if first:
                first = False
                return FONT_FACES
            return ""

        s = face_re.sub(sub, s)
        write(css, s)
        done = True
    if not done:
        raise SystemExit("[build] no commercial @font-face found — mirror changed?")
    for f in (STAGE / "_astro").iterdir():
        if COMMERCIAL_FONTS.match(f.name):
            f.unlink()
    # preload hints pointed at the removed files
    for page in STAGE.rglob("*.html"):
        s = read(page)
        s2 = re.sub(r'<link rel="preload" href="/_astro/(?:rhymes|helvetica-now)-[^"]*"[^>]*>',
                    '<link rel="preload" href="/_astro/fonts/newsreader-latin.woff2" as="font" type="font/woff2" crossorigin="">', s)
        if s2 != s:
            write(page, s2)


# --------------------------------------------------------------------------- 3. copy
def load_translations() -> tuple[dict, dict]:
    """Returns (en_text -> french, dict_path -> french)."""
    rows = json.loads(read(I18N / "strings.json"))
    adapted: dict[str, str] = {}
    for f in ("adapted-site.json", "adapted-legal-mocks.json"):
        adapted.update(json.loads(read(I18N / f)))
    overrides = json.loads(read(I18N / "overrides.json"))
    by_en: dict[str, str] = {}
    by_path: dict[str, str] = {}
    missing = []
    for r in rows:
        v = overrides.get(r["en"], adapted.get(str(r["id"])))
        if v is None:
            missing.append(r["id"])
            continue
        by_en[r["en"]] = v
        for src in r["sources"]:
            if src.startswith("dict:"):
                by_path[src[5:]] = v
    for k, v in overrides.items():
        by_en[k] = v
    # corrected copy for the Mistral API data flow (by string id)
    rewrite = {r["id"]: r["new"] for r in json.loads(read(I18N / "rewrite-dataflow.json")) if r.get("new") is not None}
    for r in rows:
        if r["id"] in rewrite:
            by_en[r["en"]] = rewrite[r["id"]]
            for src in r["sources"]:
                if src.startswith("dict:"):
                    by_path[src[5:]] = rewrite[r["id"]]
    # the name is always written « Bonjour, France »
    fix = lambda v: re.sub(r"Bonjour France", "Bonjour, France", v)
    by_en = {k: fix(v) for k, v in by_en.items()}
    by_path = {k: fix(v) for k, v in by_path.items()}
    # rich strings are rendered as several text nodes: pair their fragments too
    tag = re.compile(r"<[^>]+>")
    for k, v in list(by_en.items()):
        if "<" in k and ">" in k:
            a = [x.strip() for x in tag.split(k)]
            b = [x.strip() for x in tag.split(v)]
            if len(a) == len(b):
                for x, y in zip(a, b):
                    if len(x) > 3 and x not in by_en:
                        by_en[x] = y
    # formatted example prompts shown in the hero composer
    cards = [(r["en"], by_en[r["en"]]) for r in rows if any(src.startswith("dict:landing.home.frontDoor.cards.") and src.endswith(".prompt") for src in r["sources"])]
    total = len(cards)
    for i, (e, f) in enumerate(cards, 1):
        by_en.setdefault(f"Try \u2018{e}\u2019", f"Essayez \u00ab\u00a0{f}\u00a0\u00bb")
        by_en.setdefault(f"Example question: {e}", f"Exemple de question\u00a0: {f}")
        for n in range(1, total + 1):
            by_en.setdefault(f"Example {n} of {total}: {e}", f"Exemple {n} sur {total}\u00a0: {f}")
    if missing:
        raise SystemExit(f"[build] untranslated string ids: {missing[:20]}")
    return by_en, by_path


def adapted_dict(by_path: dict) -> dict:
    en = json.loads(read(I18N / "en-dict.json"))

    def walk(o, prefix):
        out = {}
        for k, v in o.items():
            p = prefix + k
            if isinstance(v, str):
                if p not in by_path:
                    raise SystemExit(f"[build] dictionary key without translation: {p}")
                out[k] = by_path[p]
            else:
                out[k] = walk(v, p + ".")
        return out

    return walk(en, "")


def js_literal(s: str) -> str:
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def patch_dictionary(by_path: dict) -> None:
    lp = astro(r"language-provider\..*\.js$")
    s = read(lp)
    data = json.dumps(adapted_dict(by_path), ensure_ascii=False)
    s = must_replace(s, ",x=ue,", ",x=(function(u,a){function w(o,p){for(const k in p){typeof p[k]==`string`?o[k]=p[k]:w(o[k]||(o[k]={}),p[k])}}w(u,a);return u})(ue," + data + "),", lp.name, 1)
    s = must_replace(s, "en:{label:`English`,locale:`en`,speech:`en-US`", "en:{label:`Français`,locale:`fr`,speech:`fr-FR`", lp.name, 1)
    # one language only: the French copy lives in the default catalogue
    s = re.sub(r"(es|fr):\(\)=>i\(\(\)=>import\(`\./(?:es|fr)\.[^`]+\.js`\),\[\]\)", r"\1:()=>i(()=>Promise.resolve().then(()=>d),void 0)", s)
    write(lp, s)
    for f in (STAGE / "_astro").iterdir():
        if re.match(r"^(fr|es)\.[A-Za-z0-9_-]{8}\.js$", f.name):
            f.unlink()


TEXT_ATTRS = ("alt", "aria-label", "title", "placeholder", "content", "aria-description", "data-site-en", "data-site-fr", "data-site-es", "label")


def patch_html_text(by_en: dict) -> None:
    keys = sorted(by_en, key=len, reverse=True)
    for page in STAGE.rglob("*.html"):
        s = read(page)

        # text nodes: exact match on the trimmed text, surrounding whitespace kept
        def text_node(m: re.Match) -> str:
            raw = m.group(1)
            t = html.unescape(raw)
            core = t.strip()
            if core in by_en:
                lead = t[: len(t) - len(t.lstrip())]
                trail = t[len(t.rstrip()):]
                return ">" + html.escape(lead + by_en[core] + trail, quote=False) + "<"
            return m.group(0)

        parts = re.split(r"(<script\b.*?</script>|<style\b.*?</style>)", s, flags=re.S)
        for i in range(0, len(parts), 2):
            parts[i] = re.sub(r">([^<>]+)<", text_node, parts[i])
            for a in TEXT_ATTRS:
                def attr(m: re.Match) -> str:
                    v = html.unescape(m.group(2))
                    if v in by_en:
                        return f'{m.group(1)}="{html.escape(by_en[v])}"'
                    return m.group(0)
                parts[i] = re.sub(rf'(\s{re.escape(a)})="([^"]*)"', attr, parts[i])

            # astro-island props: JSON inside an attribute; replace whole string values
            def props(m: re.Match) -> str:
                v = html.unescape(m.group(1))
                v = re.sub(r'\[0,("(?:[^"\\]|\\.)*")\]', lambda mm: "[0," + json.dumps(by_en.get(json.loads(mm.group(1)), json.loads(mm.group(1))), ensure_ascii=False) + "]", v)
                return 'props="' + html.escape(v) + '"'
            parts[i] = re.sub(r'props="([^"]*)"', props, parts[i])
        s = "".join(parts)
        write(page, s)
    del keys


def patch_react_copy() -> None:
    """Island components keep their own {en,fr,es} table: put the French copy in `en`."""
    rc = astro(r"react-copy\..*\.js$")
    s = read(rc)
    table = json.loads(read(I18N / "react-copy.json"))
    for key, val in table.items():
        s, n = re.subn(r"\b" + re.escape(key) + r":\{en:`[^`]*`", lambda m: key + ":{en:`" + js_literal(val) + "`", s, count=1)
        if n != 1:
            raise SystemExit(f"[build] react-copy key not found: {key}")
    write(rc, s)


SOURCE_NAMES = {
    "service-public.gouv.fr": "Service-Public.gouv.fr", "entreprendre.service-public.gouv.fr": "Entreprendre.Service-Public.gouv.fr",
    "ants.gouv.fr": "France Titres (ANTS)", "immatriculation.ants.gouv.fr": "France Titres (ANTS)", "permisdeconduire.ants.gouv.fr": "France Titres (ANTS)",
    "administration-etrangers-en-france.interieur.gouv.fr": "Administration numérique des étrangers", "formalites.entreprises.gouv.fr": "Guichet unique (INPI)",
    "pass.culture.fr": "pass Culture", "signal.conso.gouv.fr": "SignalConso", "ameli.fr": "L’Assurance Maladie (ameli.fr)", "caf.fr": "Caf.fr",
    "demande-logement-social.gouv.fr": "Demande de logement social", "diplomatie.gouv.fr": "France Diplomatie", "etudiant.gouv.fr": "etudiant.gouv.fr",
    "franceconnect.gouv.fr": "FranceConnect", "francetravail.fr": "France Travail", "impots.gouv.fr": "impots.gouv.fr", "info-retraite.fr": "Info Retraite",
    "justice.fr": "Justice.fr", "lassuranceretraite.fr": "L’Assurance retraite", "maprimerenov.gouv.fr": "MaPrimeRénov’", "maprocuration.gouv.fr": "Ma procuration",
    "masecurite.interieur.gouv.fr": "Ma Sécurité", "mesdroitssociaux.gouv.fr": "Mes droits sociaux", "monenfant.fr": "monenfant.fr", "monespacesante.fr": "Mon espace santé",
    "monparcourshandicap.gouv.fr": "Mon parcours handicap", "parcoursup.gouv.fr": "Parcoursup", "parcsnationaux.fr": "Parcs nationaux de France",
}


def patch_sources() -> None:
    """Source chips: French site names and a neutral icon instead of US seals / the US flag fallback."""
    si = astro(r"source-icon\..*\.js$")
    s = read(si)
    # French public sites live under gouv.fr: group them by their own name, not by "gouv.fr"
    s = must_replace(s, "return n.length<=2?t:n.slice(-2).join(`.`)}", "return n.length<=2?t:/\\.gouv\\.fr$/.test(t)?n.slice(-3).join(`.`):n.slice(-2).join(`.`)}", si.name, 1)
    names = ",".join("[`%s`,`%s`]" % (k, js_literal(v)) for k, v in SOURCE_NAMES.items())
    s = must_replace(s, "var l=new Map([", "var l=new Map([" + names + ",", si.name, 1)
    s, n = re.subn(r"var p=new Map\(\[", "var p=new Map([[`gouv.fr`,`source-fr.svg`],[`fr`,`source-fr.svg`],[`eu`,`source-fr.svg`],", s, count=1)
    if n != 1:
        raise SystemExit("[build] source seal map not found")
    write(si, s)
    shutil.copy2(STATIC / "source-fr.svg", STAGE / "images" / "agency-seals" / "source-fr.svg")


NEUTRAL_MARK = ("data:image/svg+xml,%3csvg%20width='24'%20height='14'%20viewBox='0%200%2024%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e"
                "%3cpath%20d='M6.5%201.5A1.5%201.5%200%200%201%208%200h8a1.5%201.5%200%200%201%201.5%201.5v7A1.5%201.5%200%200%201%2016%2010h-5.2L8%2013v-3a1.5%201.5%200%200%201-1.5-1.5z'%20fill='%23000C1F'%20fill-opacity='0.65'/%3e%3c/svg%3e")


def patch_flags() -> None:
    """The small US flag shown next to the (now unofficial) notice becomes a neutral speech-bubble mark."""
    n_total = 0
    for f in list((STAGE / "_astro").glob("*.js")) + list(STAGE.rglob("*.html")):
        s = read(f)
        s2, n = re.subn(r"data:image/svg\+xml,%3csvg%20width='24'%20height='14'[^`\"]*?10\.5V1\.16667[^`\"]*", NEUTRAL_MARK, s)
        if n:
            write(f, s2)
            n_total += n
    if n_total == 0:
        warn("US flag data URI not found — check the notice icon")


def patch_link_allowlist() -> None:
    """Chat answers only render links to allow-listed hosts (originally .gov/.mil): allow French public sites
    and Mistral's chat (for the « Demander à Mistral » link)."""
    ui = astro(r"ui-primitives\..*\.js$")
    old = "return t.endsWith(`.gov`)||t.endsWith(`.mil`)||"
    new = ("return t.endsWith(`.gouv.fr`)||/(^|\\.)(ameli|caf|francetravail|service-public|lassuranceretraite|info-retraite|justice|monenfant|"
           "monespacesante|parcsnationaux|urssaf|msa|pass\\.culture)\\.fr$/.test(t)||t===`chat.mistral.ai`||t.endsWith(`.gov`)||t.endsWith(`.mil`)||")
    write(ui, must_replace(read(ui), old, new, ui.name, 1))


FR_FLAG_MONO = ("data:image/svg+xml,%3csvg%20width='24'%20height='14'%20viewBox='0%200%2024%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e"
                "%3crect%20width='8'%20height='14'%20fill='%23000C1F'%20fill-opacity='0.65'/%3e"
                "%3crect%20x='8.5'%20y='0.5'%20width='7'%20height='13'%20stroke='%23000C1F'%20stroke-opacity='0.35'/%3e"
                "%3crect%20x='16'%20width='8'%20height='14'%20fill='%23000C1F'%20fill-opacity='0.35'/%3e%3c/svg%3e")


def patch_flags() -> None:
    """The small monochrome US flag beside the notice becomes a monochrome French tricolour."""
    n_total = 0
    for f in list((STAGE / "_astro").glob("*.js")) + list(STAGE.rglob("*.html")):
        s = read(f)
        s2, n = re.subn(r"data:image/svg\+xml,%3csvg%20width='24'%20height='14'[^`\"]*?10\.5V1\.16667[^`\"]*", FR_FLAG_MONO, s)
        if n:
            write(f, s2)
            n_total += n
    if n_total == 0:
        warn("notice flag data URI not found")


def patch_js_literals(by_en: dict) -> None:
    # replace exact template/quoted literals; longest first so fragments never clobber sentences
    items = sorted(((k, v) for k, v in by_en.items() if len(k) >= 2), key=lambda kv: len(kv[0]), reverse=True)
    skip = re.compile(r"^(language-provider|KaTeX|katex|mermaid|cytoscape|dagre|chunk-|rough|pdf|hls|video-player|howler|dist\.)")
    for js in (STAGE / "_astro").glob("*.js"):
        if skip.match(js.name):
            continue
        s = read(js)
        orig = s
        for k, v in items:
            lit = js_literal(k)
            if lit in s:
                s = s.replace("`" + lit + "`", "`" + js_literal(v) + "`")
                s = s.replace('"' + k.replace('"', '\\"') + '"', json.dumps(v, ensure_ascii=False)) if "\n" not in k else s
        if s != orig:
            write(js, s)


# --------------------------------------------------------------------------- 4. branding + links
def branding() -> None:
    seo = astro(r"seo\..*\.js$")
    s = read(seo)
    s = must_replace(s, "{PUBLIC_SITE_URL:`https://america.gov`}", "{PUBLIC_SITE_URL:`" + SITE_URL + "`}", seo.name, 1)
    s, n = re.subn(r"var u=`[^`]*`,d=\{en:u", "var u=`Bonjour, France`,d={en:u", s)
    if n != 1:
        raise SystemExit("[build] seo site name not found")
    write(seo, s)

    chrome = astro(r"home-chrome\..*\.js$")
    s = read(chrome)
    studio = "studioLink:e=>(0,V.jsx)(`a`,{className:_(Q,`inline-block rounded-xs`),href:`https://ndstudio.gov`,target:`_blank`,rel:`noopener noreferrer`,children:e})"
    author = studio.replace("studioLink", "authorLink").replace("https://ndstudio.gov", LINKEDIN)
    s = must_replace(s, studio, studio + "," + author, chrome.name, 1)
    write(chrome, s)

    for f in list((STAGE / "_astro").glob("*.js")) + list(STAGE.rglob("*.html")):
        s = read(f)
        o = s
        s = s.replace("https://gsa.gov", "https://america.gov").replace("https://www.gsa.gov", "https://america.gov")
        s = s.replace("https://www.whitehouse.gov/presidential-actions/2025/08/improving-our-nation-through-better-design", "https://america.gov")
        if f.suffix == ".html":
            s = s.replace('<html lang="en"', '<html lang="fr"')
            s = re.sub(r'(<link rel="canonical" href=")https://america\.gov/([^"]*)"', lambda m: m.group(1) + SITE_URL + "/" + m.group(2) + '"', s)
            s = re.sub(r'(<meta property="og:url" content=")https://america\.gov/([^"]*)"', lambda m: m.group(1) + SITE_URL + "/" + m.group(2) + '"', s)
            s = s.replace("https://america.gov/images/social/", SITE_URL + "/images/social/")
            s = s.replace('"url":"https://america.gov/"', '"url":"' + SITE_URL + '/"')
            s = s.replace('content="en_US"', 'content="fr_FR"')
        s = s.replace("America.gov", "Bonjour, France")
        if s != o:
            write(f, s)


ROUTE_RE = re.compile(r"(&quot;|[`\"'])/(" + "|".join(PAGES) + r")/?(?=&quot;|[`\"'#?])")
ASSET_RE = re.compile(r"(&quot;|[`\"'(\s,=])/(_astro/|images/|models/|favicon\.|apple-touch-icon|bonjour/)")
ROOT_LITERAL_FILES = (r"base-html\.astro_astro_type_script_index_1_lang\..*\.js$", r"home-chrome\..*\.js$",
                      r"home-chat\..*\.js$", r"use-composer-controller\..*\.js$")


def rebase() -> None:
    for f in STAGE.rglob("*"):
        if f.suffix not in (".html", ".js", ".css", ".json", ".webmanifest", ".svg") or not f.is_file():
            continue
        if f.relative_to(STAGE).parts[0] == "bonjour":  # our own layer is already base-aware
            continue
        s = read(f)
        o = s
        s = ASSET_RE.sub(lambda m: m.group(1) + BASE + "/" + m.group(2), s)
        s = ROUTE_RE.sub(lambda m: m.group(1) + BASE + "/" + m.group(2) + "/", s)
        if f.suffix in (".html", ".js"):
            # Tailwind arbitrary classes (mask-[url(/images/...)]) must keep the name the CSS selector uses
            s = s.replace("-[url(" + BASE + "/", "-[url(/")
        if f.suffix == ".html":
            s = s.replace('href="/"', f'href="{BASE}/"')
            s = s.replace("&quot;pathname&quot;:[0,&quot;/&quot;]", f"&quot;pathname&quot;:[0,&quot;{BASE}/&quot;]")
            s = re.sub(r"&quot;pathname&quot;:\[0,&quot;/(?!bonjour-france)", f"&quot;pathname&quot;:[0,&quot;{BASE}/", s)
        if s != o:
            write(f, s)
    # Vite preload helper builds "/"+dep: prefix the base path
    for f in (STAGE / "_astro").glob("*.js"):
        t = read(f)
        if "=function(e){return`/`+e}" in t:
            write(f, t.replace("=function(e){return`/`+e}", "=function(e){return`" + BASE + "/`+e}"))
    for pat in ROOT_LITERAL_FILES:
        f = astro(pat)
        s = read(f)
        n = s.count("`/`")
        if n == 0:
            raise SystemExit(f"[build] no root literal in {f.name}")
        write(f, s.replace("`/`", f"`{BASE}/`"))


# --------------------------------------------------------------------------- 5. strip their servers
def strip_remote() -> None:
    # america.gov scrubs personal data with an in-browser model before sending questions to its
    # servers. Here nothing is sent anywhere, so the (unmirrored) model is never loaded.
    fm = astro(r"field-message\..*\.js$")
    write(fm, must_replace(read(fm), "let e=await Promise.resolve().then(M);", "let e=await Promise.reject(Error(`not needed: answers are generated locally`));", fm.name, 1))
    rec = astro(r"chat-bot-recovery\..*\.js$")
    s = read(rec)
    s = must_replace(s, "a.src=`/cdn-cgi/challenge-platform/scripts/jsd/api.js`", "a.src=`" + BASE + "/bonjour/jsd.js`", rec.name, 1)
    write(rec, s)
    shutil.copy2(STATIC / "gsa-mark.svg", STAGE / "images" / "home" / "footer" / "gsa.svg")
    for page in STAGE.rglob("*.html"):
        s = read(page)
        # one language: every data-site-* variant carries the French text
        def site_attrs(m: re.Match) -> str:
            tag = m.group(0)
            en = re.search(r'data-site-en="([^"]*)"', tag)
            if not en:
                return tag
            return re.sub(r'data-site-(fr|es)="[^"]*"', lambda mm: f'data-site-{mm.group(1)}="{en.group(1)}"', tag)
        s = re.sub(r"<[a-z]+\b[^>]*data-site-en=[^>]*>", site_attrs, s)
        # america.gov's in-browser PII filter paragraph has no equivalent here
        s = re.sub(r'(<p class="type-body-m text-text-secondary">)When a file is uploaded.*?</p>', r"\1</p>", s, flags=re.S)
        s = re.sub(r'(<link rel="canonical" href="[^"]*?)(?<!/)"', r'\1/"', s)
        s = re.sub(r'(<meta property="og:url" content="[^"]*?)(?<!/)"', r'\1/"', s)
        s = re.sub(r"<script>\(function\(\)\{function c\(\)\{var b=a\.contentDocument.*?</script>", "", s, flags=re.S)
        s = re.sub(r'<script[^>]*src="[^"]*cdn-cgi[^"]*"[^>]*></script>', "", s)
        write(page, s)
    for f in STAGE.rglob("*"):
        if f.is_file() and f.suffix in (".html", ".js"):
            s = read(f)
            if "/cdn-cgi/" in s and f.suffix == ".html":
                warn(f"cdn-cgi reference left in {f.relative_to(STAGE)}")


# --------------------------------------------------------------------------- 6. inject our layer
def relay_origin() -> str:
    """Origin of the Mistral relay declared in tools/static/config.js ("" when not switched on)."""
    m = re.search(r'relayUrl:\s*"([^"]*)"', read(STATIC / "config.js"))
    url = (os.environ.get("BONJOUR_RELAY_URL") or (m.group(1) if m else "")).strip()
    if not url:
        return ""
    if not re.match(r"^https://[a-z0-9.-]+(:\d+)?(/.*)?$", url) and not url.startswith("http://127.0.0.1"):
        raise SystemExit(f"[build] relayUrl must be an https URL: {url!r}")
    return re.match(r"^(https?://[^/]+)", url).group(1)


CSP_EXTRA = {
    "connect-src": "https://api.github.com",
}


def csp(page_html: str, where: str) -> str:
    """Keep the original Content-Security-Policy, only open what the local Mistral + vote counter need."""
    m = re.search(r'<meta http-equiv="content-security-policy" content="([^"]*)">', page_html)
    if not m:
        warn(f"no CSP meta in {where}")
        return page_html
    parts = []
    for d in m.group(1).split(";"):
        d = d.strip()
        name = d.split(" ")[0]
        if name in CSP_EXTRA:
            d += " " + CSP_EXTRA[name]
            if name == "connect-src" and relay_origin():
                d += " " + relay_origin()
        parts.append(d)
    return page_html.replace(m.group(0), '<meta http-equiv="content-security-policy" content="' + "; ".join(parts) + '">')


def inject() -> None:
    head = (f'<link rel="stylesheet" href="{BASE}/bonjour/bonjour.css">'
            f'<script src="{BASE}/bonjour/config.js"></script>'
            f'<script src="{BASE}/bonjour/bonjour.js"></script>')
    for page in STAGE.rglob("*.html"):
        s = read(page)
        s = must_replace(s, '<meta charset="utf-8">', '<meta charset="utf-8">' + head, str(page.relative_to(STAGE)), 1)
        s = csp(s, str(page.relative_to(STAGE)))
        write(page, s)


def finalize() -> None:
    tmp = ROOT / ".build-out"
    if tmp.exists():
        shutil.rmtree(tmp)
    STAGE.rename(tmp)
    (tmp / ".nojekyll").write_text("")
    shutil.copy2(tmp / "index.html", tmp / "404.html")
    if OUT.exists():
        old = ROOT / ".build-prev"
        if old.exists():
            shutil.rmtree(old)
        OUT.rename(old)
        shutil.rmtree(old)
    tmp.rename(OUT)


def main() -> None:
    stage()
    fonts()
    by_en, by_path = load_translations()
    patch_dictionary(by_path)
    patch_html_text(by_en)
    patch_react_copy()
    patch_sources()
    patch_link_allowlist()
    patch_flags()
    patch_js_literals(by_en)
    branding()
    strip_remote()
    inject()
    rebase()
    finalize()
    for w in warnings:
        print("[warn]", w)
    print("[build] ok ->", OUT)


if __name__ == "__main__":
    sys.exit(main())
