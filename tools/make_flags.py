#!/usr/bin/env python3
"""French tricolour in place of america.gov's US flag, same size, shape and palette treatment.

Writes into tools/overrides/: artwork.svg (fabric flag texture), favicon.svg/.ico, apple-touch-icon.png,
webclip variants, and the share cards (flag recoloured).  python3 tools/make_flags.py
"""
import base64
import glob
import io
import re
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
M, O = ROOT / "_mirror", ROOT / "tools" / "overrides"
sys.path.insert(0, str(ROOT / "tools"))


def tricolour_box(im, box, blue, red):
    """Flat tricolour over the flag box; a hairline keeps the white band readable on light backgrounds."""
    x0, y0, x1, y1 = box
    w, h = x1 - x0, y1 - y0
    line = max(1, round(h / 40))
    edge = (222, 224, 228)
    px = im.load()
    for y in range(y0, y1):
        for x in range(x0, x1):
            t = (x - x0) / w
            c = blue if t < 1 / 3 else (255, 255, 255) if t < 2 / 3 else red
            if c == (255, 255, 255) and (y - y0 < line or y1 - 1 - y < line):
                c = edge
            px[x, y] = c + ((255,) if im.mode == "RGBA" else ())


def flag_box(im):
    """Bounding box of the flag: strongly coloured (red/blue) pixels."""
    rgb = im.convert("RGB")
    w, h = rgb.size
    px = rgb.load()
    xs, ys = [], []
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            if max(r, g, b) - min(r, g, b) > 90:
                xs.append(x); ys.append(y)
    return min(xs), min(ys), max(xs) + 1, max(ys) + 1


def palette(im, box):
    rgb = im.convert("RGB").crop(box)
    cols = rgb.getcolors(rgb.width * rgb.height) or []
    blues = [c for c in cols if c[1][2] > c[1][0] + 60]
    reds = [c for c in cols if c[1][0] > c[1][2] + 60]
    pick = lambda cs, d: max(cs)[1] if cs else d
    return pick(blues, (29, 73, 187)), pick(reds, (230, 65, 51))


def recolor(im):
    im = im.copy()
    box = flag_box(im)
    blue, red = palette(im, box)
    tricolour_box(im, box, blue, red)
    return im, box


def artwork():
    src = (M / "_astro").glob("artwork.*.svg").__next__()
    head = re.match(r"(<svg[^>]*>)", src.read_text()).group(1)
    w, h = 242.98, 131.081
    third = w / 3
    svg = (f'{head}\n<rect width="{third:.3f}" height="{h}" fill="#004AC3"/>\n'
           f'<rect x="{third:.3f}" width="{third:.3f}" height="{h}" fill="white"/>\n'
           f'<rect x="{third:.3f}" width="{third:.3f}" height="2" fill="#DDE0E5"/>\n'
           f'<rect x="{third:.3f}" y="{h - 2:.3f}" width="{third:.3f}" height="2" fill="#DDE0E5"/>\n'
           f'<rect x="{2 * third:.3f}" width="{third:.3f}" height="{h}" fill="#FB2823"/>\n</svg>\n')
    (O / "_astro").mkdir(parents=True, exist_ok=True)
    (O / "_astro" / src.name).write_text(svg)


def favicon():
    svg = (M / "favicon.svg").read_text()
    b64 = re.search(r'base64,([^"]+)"', svg).group(1)
    png = Image.open(io.BytesIO(base64.b64decode(b64))).convert("RGBA")
    fr, _ = recolor(png)
    buf = io.BytesIO(); fr.save(buf, "PNG", optimize=True)
    (O / "favicon.svg").write_text(svg.replace(b64, base64.b64encode(buf.getvalue()).decode()))
    fr.save(O / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])


def webclips():
    for f in glob.glob(str(M / "_astro/webclip.*.webp")):
        im, _ = recolor(Image.open(f).convert("RGB"))
        im.save(O / "_astro" / Path(f).name, "WEBP", quality=95)


def apple_touch():
    from make_brand_images import text_image
    im = Image.open(M / "apple-touch-icon.png").convert("RGBA")
    fr, box = recolor(im)
    # the "America.gov" lettering right of the flag becomes « Bonjour, France »
    a = fr.getchannel("A").load()
    W, H = fr.size
    cols = [x for x in range(box[2] + 2, W) if any(a[x, y] > 40 for y in range(H))]
    rows = [y for y in range(H) if any(a[x, y] > 40 for x in range(box[2] + 2, W))]
    tx0, ty0, ty1 = cols[0], rows[0], rows[-1]
    opaque = [c[1] for c in fr.crop((tx0, ty0, W, ty1 + 1)).getcolors(W * H) if c[1][3] > 200]
    color = min(opaque, key=lambda c: sum(c[:3])) if opaque else (11, 26, 51, 255)
    bgc = fr.getpixel((1, 1))
    fr.paste(Image.new("RGBA", (W - tx0, H), bgc), (tx0, 0))
    t = text_image(200, color)
    scale = (W - tx0 - 4) / t.width
    t = t.resize((int(t.width * scale), int(t.height * scale)), Image.LANCZOS)
    cy = (box[1] + box[3]) // 2
    fr.alpha_composite(t, (tx0, cy - int(t.height * 0.62)))
    fr.save(O / "apple-touch-icon.png")


def share_cards():
    for name in ("america-og.png", "america-twitter.png"):
        p = O / "images/social" / name
        im, _ = recolor(Image.open(p).convert("RGB"))
        im.save(p)


if __name__ == "__main__":
    artwork(); favicon(); webclips(); apple_touch(); share_cards()
    print("flags ok")
