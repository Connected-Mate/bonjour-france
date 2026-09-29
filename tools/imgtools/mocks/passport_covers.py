"""Passport covers: passport-cover, passport-book, passport-card (book-on-blue variants), passport-thumbnail.
Method: keep original leather/background/edges/shadow/alpha; remove the US gold artwork by
normalized-convolution inpainting; redraw neutral gold artwork: « PASSEPORT » + geometric rosette + ICAO chip symbol.
No coat of arms, no country name, no EU emblem."""
import math
import numpy as np
from lib import *

M = '/Users/0104389S/Projects/hello-france/_mirror/_astro/'
rng = np.random.default_rng(7)


def _box(x, r, axis):
    n = x.shape[axis]
    c = np.cumsum(np.pad(x, [(r + 1, r) if i == axis else (0, 0) for i in range(x.ndim)], mode='edge'), axis=axis)
    hi = np.take(c, np.arange(2 * r + 1, 2 * r + 1 + n), axis=axis)
    lo = np.take(c, np.arange(0, n), axis=axis)
    return (hi - lo) / (2 * r + 1)


def boxblur3(x, sigma):
    r = max(1, int(sigma * 0.9))
    for _ in range(3):
        x = _box(_box(x, r, 0), r, 1)
    return x


def inpaint_gold(im, rb=12, rmin=45, grow=7, blur=22, grain=2.2):
    a = np.array(im.convert('RGBA')).astype(np.float32)
    rgb = a[..., :3]
    gold = ((rgb[..., 0] - rgb[..., 2]) > rb) & (rgb[..., 0] > rmin)
    gm = Image.fromarray((gold * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(grow))
    gold = np.array(gm) > 0
    keep = (~gold).astype(np.float32)
    def fblur(x):
        return boxblur3(x, blur)
    num = np.stack([fblur(rgb[..., c] * keep) for c in range(3)], -1)
    den = fblur(keep)[..., None]
    fill = num / np.maximum(den, 1e-3)
    for mult in (3, 8):  # holes wider than the kernel: widen progressively
        weak = den[..., 0] < 0.08
        if not weak.any():
            break
        num2 = np.stack([boxblur3(rgb[..., c] * keep, blur * mult) for c in range(3)], -1)
        den2 = boxblur3(keep, blur * mult)[..., None]
        fill[weak] = (num2 / np.maximum(den2, 1e-4))[weak]
        den = np.maximum(den, den2)
    fill += rng.normal(0, grain, fill.shape)
    out = rgb.copy()
    out[gold] = fill[gold]
    a[..., :3] = np.clip(out, 0, 255)
    return Image.fromarray(a.astype(np.uint8), 'RGBA')


def rosette(cx, cy, r, color, sw, n=12, rings=True):
    """Neutral guilloché-style rosette: n circles around centre + concentric rings."""
    s = ''
    rr = r * 0.5
    for i in range(n):
        t = 2 * math.pi * i / n
        s += f'<circle cx="{cx + rr * math.cos(t):.2f}" cy="{cy + rr * math.sin(t):.2f}" r="{rr:.2f}" fill="none" stroke="{color}" stroke-width="{sw}"/>'
    if rings:
        s += f'<circle cx="{cx}" cy="{cy}" r="{r:.2f}" fill="none" stroke="{color}" stroke-width="{sw * 1.6}"/>'
        s += f'<circle cx="{cx}" cy="{cy}" r="{r * 1.1:.2f}" fill="none" stroke="{color}" stroke-width="{sw * 0.8}"/>'
        # scalloped outer edge
        pts = []
        for k in range(0, 721):
            t = 2 * math.pi * k / 720
            rad = r * 1.2 + r * 0.035 * math.cos(36 * t)
            pts.append(f'{cx + rad * math.cos(t):.2f},{cy + rad * math.sin(t):.2f}')
        s += f'<polygon points="{" ".join(pts)}" fill="none" stroke="{color}" stroke-width="{sw}"/>'
    s += f'<circle cx="{cx}" cy="{cy}" r="{r * 0.12:.2f}" fill="{color}"/>'
    return s


def chip(cx, cy, w, color):
    h = w * 0.62
    sw = w * 0.1
    x, y = cx - w / 2, cy - h / 2
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{color}"/>'
            f'<rect x="{x}" y="{cy - sw * 0.35}" width="{w}" height="{sw * 0.7}" fill="BG"/>'
            f'<circle cx="{cx}" cy="{cy}" r="{h * 0.28}" fill="{color}" stroke="BG" stroke-width="{sw * 0.7}"/>')


def gold_defs(c1, c2, c3):
    return (f'<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">'
            f'<stop offset="0" stop-color="{c1}"/><stop offset="0.5" stop-color="{c2}"/><stop offset="1" stop-color="{c3}"/></linearGradient>'
            '<filter id="grain" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/>'
            '<feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.15"/>'
            '<feComposite in="SourceGraphic" operator="in"/></filter></defs>')


def overlay(base, art_svg, scale=3):
    W, H = base.size
    art = svg(art_svg, W, H, scale=scale).resize((W, H), Image.LANCZOS)
    out = base.copy()
    # keep original alpha: only paint where base is opaque
    a = np.array(art)
    a[..., 3] = (a[..., 3].astype(np.float32) * (np.array(base.getchannel('A')) / 255.0)).astype(np.uint8)
    out.alpha_composite(Image.fromarray(a, 'RGBA'))
    return out


# ---------------- passport-cover 742x1052 (textured, metallic gold) -----------------
def cover():
    o = Image.open(M + 'passport-cover.D1saJ3wC.png').convert('RGBA')
    base = inpaint_gold(o, blur=26, grain=2.6)
    BG = '#1b2029'
    art = gold_defs('#8a7446', '#c7a867', '#7d6a42') + '<g filter="url(#grain)">'
    art += '<g fill="url(#g)">'
    art += '<text x="371" y="206" text-anchor="middle" font-family="Newsreader500" font-size="74" letter-spacing="9">PASSEPORT</text>'
    art += '</g>'
    art += f'<rect x="251" y="246" width="240" height="2.2" fill="url(#g)"/>'
    art += rosette(371, 575, 172, 'url(#g)', 3.2, n=16)
    art += rosette(371, 575, 80, 'url(#g)', 2.4, n=8, rings=False)
    art += chip(371, 972, 62, 'url(#g)').replace('BG', BG)
    art += '</g>'
    return overlay(base, art)


# ---------------- passport-book 534x748 (flat vector illustration) -----------------
def book():
    o = Image.open(M + 'passport-book.BTF0rdvA.webp').convert('RGBA')
    # flat illustration: repaint every off-colour interior pixel with the flat cover colour
    a = np.array(o).astype(np.int32)
    diff = np.abs(a[..., :3] - np.array([25, 27, 70])).sum(-1) > 0
    inner = np.zeros(diff.shape, bool); inner[8:740, 8:512] = True
    m = diff & inner & (a[..., 3] == 255)
    a[m, :3] = [25, 27, 70]
    base = Image.fromarray(a.astype(np.uint8))
    G = '#e3c197'
    BG = '#191b46'
    art = '<g>'
    art += f'<text x="262" y="126" text-anchor="middle" font-family="Newsreader600" font-size="68" letter-spacing="3" fill="{G}">PASSEPORT</text>'
    art += rosette(262, 330, 118, G, 3.4, n=14)
    art += rosette(262, 330, 54, G, 2.6, n=8, rings=False)
    art += f'<rect x="192" y="560" width="140" height="3" fill="{G}"/><rect x="212" y="572" width="100" height="2" fill="{G}"/>'
    art += chip(264, 667, 56, G).replace('BG', BG)
    art += '</g>'
    return overlay(base, art)


# ---------------- passport-card big 906x600 (photo-real book on light blue) -----------------
def card_big():
    o = Image.open(M + 'passport-card.BTf4bABc.webp').convert('RGBA')
    base = inpaint_gold(o, rb=22, rmin=70, blur=14, grain=1.6)
    BG = '#10284a'
    art = gold_defs('#d8b26a', '#f3dc9a', '#c9a45d')
    art += '<g fill="url(#g)">'
    art += '<text x="455" y="172" text-anchor="middle" font-family="Newsreader600" font-size="31" letter-spacing="1.5">PASSEPORT</text>'
    art += '</g>'
    art += rosette(455, 278, 56, 'url(#g)', 1.6, n=14)
    art += rosette(455, 278, 26, 'url(#g)', 1.2, n=8, rings=False)
    art += '<rect x="410" y="383" width="90" height="1.6" fill="url(#g)"/><rect x="425" y="391" width="60" height="1.2" fill="url(#g)"/>'
    art += chip(458, 451, 34, 'url(#g)').replace('BG', BG)
    return overlay(base, art, scale=3)


def thumbnail(card):
    o = Image.open(M + 'passport-thumbnail.Cq5EailI.png').convert('RGBA')
    book_ = card.crop((300, 92, 609, 510))
    book_ = book_.resize((68 - 12 + 1, 84 - 6 + 1), Image.LANCZOS)
    out = o.copy()
    out.alpha_composite(book_, (12, 6))
    return out


if __name__ == '__main__':
    c = cover(); write('passport-cover', c)
    b = book(); write('passport-book', b)
    cb = card_big()
    big = ['BL5kLTl3', 'BTf4bABc', 'COQSeuG0', 'CsXHHTNf', 'DU_tmzUp', 'DZehMaUW', 'Dz7t0X-e']
    write('passport-card', cb, only=big)
    write('passport-thumbnail', thumbnail(cb))
