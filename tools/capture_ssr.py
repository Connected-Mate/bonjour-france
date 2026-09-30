#!/usr/bin/env python3
"""Capture the home island's first client render and store it as its server markup.

Why: the home island's typing animations split sentences word by word; the server markup
(america.gov's, English) cannot be translated reliably in place, so React would reject it at
hydration and render the whole page a second time (visible flash). Capturing what React renders
on the client, and serving exactly that, makes hydration match.

Usage (site built and served at http://127.0.0.1:8771/bonjour-france/):
    python3 tools/capture_ssr.py && python3 tools/build.py
Re-run whenever the home copy changes.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HUB = str(Path.home() / ".local/bin/browser-hub")
SESSION = "bf-ssr-capture"
URL = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8771/bonjour-france/"


def hub(*args):
    return subprocess.run([HUB, "--session", SESSION, *args], capture_output=True, text=True, timeout=60).stdout


def ev(js):
    out = hub("eval", js).splitlines()
    return json.loads(out[1]) if len(out) > 1 else None


hub("set", "viewport", "1440", "900")
hub("open", URL)
ev('localStorage.setItem("bf.debug","true");1')
hub("open", URL)
import time
time.sleep(6)
n = ev("(window.__bfFirstClient||'').length") or 0
if not n:
    sys.exit("no client re-render captured (already matching?)")
html = "".join(ev(f"window.__bfFirstClient.slice({i},{i + 8000})") for i in range(0, n, 8000))


def elements(doc, open_re):
    """outerHTML of every element whose start tag matches open_re (balanced on its own tag name)."""
    out = []
    for m in re.finditer(open_re, doc):
        name = re.match(r"<([a-z0-9-]+)", m.group(0)).group(1)
        depth, i = 1, m.end()
        tag = re.compile(rf"<(/?){name}\b[^>]*?(/?)>")
        while depth:
            t = tag.search(doc, i)
            if not t.group(2):
                depth += -1 if t.group(1) else 1
            i = t.end()
        out.append(doc[m.start():i])
    return out

# only the word-by-word animated sentences: everything else is translated in place by the build
SELECTORS = {"prompt": r'<span class="home-prompt-track">', "manifesto": r'<div class="home-manifesto[^"]*"[^>]*>'}
frag_len = ev("JSON.stringify(window.__bfFragments||{}).length")
raw = "".join(ev(f"JSON.stringify(window.__bfFragments).slice({i},{i + 8000})") for i in range(0, frag_len, 8000))
cap = json.loads(raw)
(ROOT / "tools/i18n/ssr").mkdir(parents=True, exist_ok=True)
(ROOT / "tools/i18n/ssr/home-fragments.json").write_text(json.dumps({"selectors": SELECTORS, "fragments": cap}, ensure_ascii=False))
hub("close")
print("captured", {k: len(v) for k, v in cap.items()})
