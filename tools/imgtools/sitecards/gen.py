"""Site cards for the orbit: browser-window preview of French public sites (generic pictograms, no real logos).
Usage: python3 gen.py  -> writes tools/overrides/_astro/<file> for every rectangular variant of each base."""
import sys, json, io, os
sys.path.insert(0, '/Users/0104389S/Projects/hello-france/tools/imgtools/badges')
sys.path.insert(0, '/Users/0104389S/Projects/hello-france/tools/imgtools/lead')
import resvg_py
from PIL import Image
import medallions as M
import glyphs as G

ROOT = '/Users/0104389S/Projects/hello-france/tools/'
MAP = json.load(open(os.path.dirname(os.path.abspath(__file__)) + '/mapping.json'))
INV = json.load(open(ROOT + 'image-inventory.json'))
W, H = 480, 334


def mix(c, t, base='#ffffff'):
    return M._mix(base, c, t)


def fit(fname, text, fs, maxw):
    w = G.width(fname, text, fs)
    return fs if w <= maxw else fs * maxw / w


def txt(fname, text, x, y, fs, fill, maxw):
    fs = fit(fname, text, fs, maxw)
    return f'<path fill="{fill}" d="{G.line(fname, text, x, y, fs, anchor="middle")}"/>', fs


def card(base, mode):
    dom, name, tag, pic, col = MAP[base]
    tint = mix(col, 0.07)
    url = 'https://' + ('www.' + dom if dom.count('.') <= 2 else dom)
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">',
         f'<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="{tint}"/></linearGradient></defs>',
         f'<rect width="{W}" height="{H}" fill="url(#g)"/>']
    bar = 46
    o.append(f'<rect width="{W}" height="{bar}" fill="#e6eaf1"/><rect y="{bar-1}" width="{W}" height="1.5" fill="#cfd5df"/>')
    for i, c in enumerate(('#ee6a5f', '#f4bf4f', '#61c554')):
        o.append(f'<circle cx="{26 + i * 22}" cy="{bar/2}" r="6.5" fill="{c}"/>')
    if mode != 'tiny':
        o.append(f'<rect x="104" y="9" width="{W-128}" height="28" rx="14" fill="#fff" stroke="#cfd5df" stroke-width="1.2"/>')
        o.append(f'<path fill="#7b8494" d="{G.line("Geist500", url, 122, 28, fit("Geist500", url, 15, W-170))}"/>')
    # coloured accent line under bar
    o.append(f'<rect y="{bar}" width="{W}" height="4" fill="{col}"/>')
    if mode == 'tiny':
        cy, r = 128, 68
        o.append(f'<circle cx="240" cy="{cy}" r="{r}" fill="{col}"/>' + M.picto(pic, '#fffffe', 240, cy, r * 1.25, knock=col))
        label = dom.split('.')[0] if len(dom.split('.')[0]) < 15 else name
        label = dom.split('.')[0]
        t, _ = txt('Geist700', label, 240, 272, 66, '#1a2130', 440)
        o.append(t)
    elif mode == 'mid':
        cy, r = 120, 58
        o.append(f'<circle cx="240" cy="{cy}" r="{r}" fill="{col}"/>' + M.picto(pic, '#fffffe', 240, cy, r * 1.25, knock=col))
        t, _ = txt('Geist700', dom, 240, 262, 44, '#1a2130', 448)
        o.append(t)
    else:
        cy, r = 128, 52
        o.append(f'<circle cx="240" cy="{cy+2}" r="{r+6}" fill="{mix(col, .14)}"/>')
        o.append(f'<circle cx="240" cy="{cy}" r="{r}" fill="{col}"/>' + M.picto(pic, '#fffffe', 240, cy, r * 1.25, knock=col))
        t, _ = txt('Geist700', dom, 240, 240, 36, '#1a2130', 432)
        o.append(t)
        t, _ = txt('Geist500', tag, 240, 278, 19, '#5b6472', 420)
        o.append(t)
        # nav skeleton hint
        o.append(f'<rect x="150" y="300" width="180" height="10" rx="5" fill="{mix(col,.18)}"/>')
    o.append('</svg>')
    return ''.join(o)


def render(base, w, h):
    mode = 'full' if w >= 256 else 'mid' if w >= 128 else 'tiny'
    svg = card(base, mode)
    ss = 4 if w <= 128 else 2
    b = resvg_py.svg_to_bytes(svg_string=svg, width=w * ss)
    im = Image.open(io.BytesIO(bytes(b))).convert('RGB')
    return im.resize((w, h), Image.LANCZOS)


def rect_variants(base):
    out = []
    for p, s, _ in INV[base]:
        if not p.endswith('.webp'):
            continue
        w, h = map(int, s.split('x'))
        if abs(w / h - W / H) < 0.06 and w <= 480:
            out.append((p, w, h))
    return out


if __name__ == '__main__':
    only = sys.argv[1:]
    n = 0
    os.makedirs(ROOT + 'overrides/_astro', exist_ok=True)
    for base in MAP:
        if only and base not in only:
            continue
        for p, w, h in rect_variants(base):
            render(base, w, h).save(ROOT + 'overrides/' + p, 'WEBP', quality=90, method=6)
            n += 1
    print('written', n)
