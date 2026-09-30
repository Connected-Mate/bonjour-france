#!/usr/bin/env python3
"""Raster brand images with the name « Bonjour, France » in america.gov's layout.

- america-wordmark (all variants): same box, text in Newsreader instead of "America.gov"
- share cards (og / twitter): original flag kept, name replaced, "Site non officiel" added
Needs Pillow + fonttools:  python3 tools/make_brand_images.py
"""
import glob
import os
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
M, O = ROOT / "_mirror", ROOT / "tools" / "overrides"
NAME = "Bonjour, France"
TMP = ROOT / ".build-fonts"


def static_font(opsz, wght, fam="newsreader-latin.woff2"):
    TMP.mkdir(exist_ok=True)
    out = TMP / f"{fam}-{opsz}-{wght}.ttf"
    if not out.exists():
        f = instancer.instantiateVariableFont(TTFont(ROOT / "tools/overrides/fonts" / fam), {"opsz": opsz, "wght": wght} if "newsreader" in fam else {"wght": wght})
        f.flavor = None
        f.save(out)
    return str(out)


def text_image(size_px, color, opsz=72, wght=500, tracking=-0.025):
    font = ImageFont.truetype(static_font(opsz, wght), size_px)
    widths = [font.getlength(c) for c in NAME]
    total = sum(widths) + tracking * size_px * (len(NAME) - 1)
    asc, desc = font.getmetrics()
    im = Image.new("RGBA", (int(total) + 4, asc + desc), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    x = 0
    for c, w in zip(NAME, widths):
        d.text((x, 0), c, font=font, fill=color)
        x += w + tracking * size_px
    return im.crop(im.getbbox())


def wordmarks():
    master_src = Image.open(M / "images/america-wordmark.webp").convert("RGBA")
    W, H = master_src.size
    color = tuple(sorted(master_src.getcolors(W * H), key=lambda c: -c[0] if c[1][3] > 200 else 0)[0][1][:3]) + (255,)
    t = text_image(600, color)
    t.thumbnail((W, H), Image.LANCZOS)
    master = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    master.alpha_composite(t, (0, H - t.height))  # baseline-ish alignment like the original
    files = [M / "images/america-wordmark.webp"] + [Path(p) for p in glob.glob(str(M / "_astro/america-wordmark.*.webp"))]
    for src in files:
        w, h = Image.open(src).size
        dst = O / src.relative_to(M)
        dst.parent.mkdir(parents=True, exist_ok=True)
        master.resize((w, h), Image.LANCZOS).save(dst, "WEBP", quality=92)
    return len(files)


def share_card(name):
    src = Image.open(M / "images/social" / name).convert("RGB")
    W, H = src.size
    bg = src.getpixel((5, 5))
    # flag = the leftmost non-background blob; name text starts after it
    px = src.load()
    cols = [x for x in range(W) if any(abs(px[x, y][0] - bg[0]) + abs(px[x, y][1] - bg[1]) + abs(px[x, y][2] - bg[2]) > 60 for y in range(0, H, 3))]
    flag_x0 = cols[0]
    gaps = [i for i in range(1, len(cols)) if cols[i] - cols[i - 1] > 12]
    flag_x1 = cols[gaps[0] - 1] if gaps else cols[0] + W // 6
    rows = [y for y in range(H) if any(abs(px[x, y][0] - bg[0]) > 60 for x in range(flag_x0, flag_x1))]
    flag = src.crop((flag_x0, rows[0], flag_x1 + 1, rows[-1] + 1))
    out = Image.new("RGB", (W, H), bg)
    text = text_image(int(flag.height * 1.25), (11, 26, 51, 255))
    gap = int(flag.width * 0.22)
    total = flag.width + gap + text.width
    x0 = (W - total) // 2
    cy = H // 2 - int(H * 0.03)
    out.paste(flag, (x0, cy - flag.height // 2))
    out.paste(text, (x0 + flag.width + gap, cy - int(text.height * 0.62)), text)
    small = ImageFont.truetype(static_font(0, 450, "geist-latin.woff2"), max(18, H // 28))
    note = "Une idée d’Alexandre Cormeraie · site non officiel, projet indépendant"
    d = ImageDraw.Draw(out)
    d.text(((W - d.textlength(note, font=small)) / 2, H * 0.78), note, font=small, fill=(90, 100, 115))
    dst = O / "images/social" / name
    dst.parent.mkdir(parents=True, exist_ok=True)
    out.save(dst)


if __name__ == "__main__":
    print("wordmarks:", wordmarks())
    for n in ("america-og.png", "america-twitter.png"):
        share_card(n)
    print("share cards ok")
