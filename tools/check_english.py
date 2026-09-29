#!/usr/bin/env python3
"""Lists English-looking text left in the built HTML (server-rendered markup)."""
import html, re, sys
from pathlib import Path
OUT = Path(__file__).resolve().parent.parent / "docs"
EN = re.compile(r"\b(the|and|your|you|with|for|this|of|to|is|are|from|what|how|my|our|we|can|will|get|about|more|learn|see)\b", re.I)
FR = re.compile(r"[éèàùçêâîôûœ]|\b(le|la|les|des|vous|votre|vos|une|est|pour|sur|dans|avec|aux|du)\b", re.I)
total = 0
for page in sorted(OUT.rglob("index.html")):
    s = page.read_text(encoding="utf-8")
    s = re.sub(r"<script\b.*?</script>|<style\b.*?</style>", "", s, flags=re.S)
    found = []
    for t in re.findall(r">([^<>]+)<", s):
        t = html.unescape(t).strip()
        if len(t) > 2 and EN.search(t) and not FR.search(t):
            found.append(t)
    for a, v in re.findall(r'\s(alt|aria-label|title|placeholder|content|aria-description)="([^"]*)"', s):
        v = html.unescape(v)
        if len(v) > 2 and EN.search(v) and not FR.search(v):
            found.append(f"@{a}: {v}")
    for m in re.findall(r'props="([^"]*)"', s):
        for v in re.findall(r'\[0,"((?:[^"\\]|\\.)*)"\]', html.unescape(m)):
            if " " in v and EN.search(v) and not FR.search(v):
                found.append(f"@props: {v}")
    found = list(dict.fromkeys(found))
    total += len(found)
    print(f"== {page.relative_to(OUT)} ({len(found)})")
    for f in found[: int(sys.argv[1]) if len(sys.argv) > 1 else 40]:
        print("   ", f[:150])
print("TOTAL", total)
