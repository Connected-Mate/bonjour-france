#!/usr/bin/env python3
"""Generates the Bonjour France wordmarks (SVG paths from Newsreader, OFL) used as CSS masks.

Needs fonttools + brotli:  python3 tools/make_wordmarks.py
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

ROOT = Path(__file__).resolve().parent.parent
FONT = ROOT / "tools/overrides/fonts/newsreader-latin.woff2"
OUT = ROOT / "tools/static"


def text_path(text, opsz, wght=400, tracking=-0.02):
    f = instancer.instantiateVariableFont(TTFont(FONT), {"opsz": opsz, "wght": wght})
    upm = f["head"].unitsPerEm
    cmap, gs, hmtx = f.getBestCmap(), f.getGlyphSet(), f["hmtx"]
    x, d = 0, []
    bp = BoundsPen(gs)
    for ch in text:
        g = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        # flip y: font units are y-up
        gs[g].draw(TransformPen(pen, (1, 0, 0, -1, x, 0)))
        gs[g].draw(TransformPen(bp, (1, 0, 0, -1, x, 0)))
        d.append(pen.getCommands())
        x += hmtx[g][0] + tracking * upm
    xmin, ymin, xmax, ymax = bp.bounds
    return " ".join(d), (xmin, ymin, xmax, ymax), upm


def footer():
    d, (x0, y0, x1, y1), _ = text_path("Bonjour France", 72, tracking=-0.03)
    w, h = x1 - x0, y1 - y0
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.0f} {y0:.0f} {w:.0f} {h:.0f}"><path d="{d}"/></svg>'
    (OUT / "wordmark-footer.svg").write_text(svg)
    return w / h


def header():
    d, (x0, y0, x1, y1), upm = text_path("Bonjour France", 24, tracking=-0.01)
    h = y1 - y0
    s = 23 / h                        # fit the 23 px tall header slot
    icon_w = 20 / s                   # speech bubble mark, in font units
    gap = 8 / s
    ox = icon_w + gap - x0
    # bubble: rounded square with a tail, a white "B" is drawn by the wordmark font? keep it a pure shape
    r = 4 / s
    bw, bh = icon_w, 17 / s
    by = y0 + (h - bh) / 2 - 1 / s
    bubble = (f"M{r:.1f} {by:.1f}H{bw - r:.1f}Q{bw:.1f} {by:.1f} {bw:.1f} {by + r:.1f}V{by + bh - r:.1f}Q{bw:.1f} {by + bh:.1f} {bw - r:.1f} {by + bh:.1f}"
              f"H{bw * 0.45:.1f}L{bw * 0.25:.1f} {by + bh + 4 / s:.1f}V{by + bh:.1f}H{r:.1f}Q0 {by + bh:.1f} 0 {by + bh - r:.1f}V{by + r:.1f}Q0 {by:.1f} {r:.1f} {by:.1f}Z")
    total_w = ox + x1
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 {y0 - 1 / s:.0f} {total_w:.0f} {h + 6 / s:.0f}">'
           f'<path d="{bubble}"/><g transform="translate({ox:.1f} 0)"><path d="{d}"/></g></svg>')
    (OUT / "logo-header.svg").write_text(svg)
    return total_w * s


if __name__ == "__main__":
    print("footer ratio", round(footer(), 3), "header width px", round(header(), 1))
