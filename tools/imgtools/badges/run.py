"""Write every seal-family override from the medallion set + SVG masters + mapping.json.
usage: python3 tools/imgtools/badges/run.py"""
import sys, os, re, json
import numpy as np
from PIL import Image
HERE = '/Users/0104389S/Projects/hello-france/tools/imgtools/badges/'
sys.path.insert(0, HERE)
sys.path.insert(0, '/Users/0104389S/Projects/hello-france/tools/imgtools')
import place as P
import medallions as M
from bodies import BODIES, SLOTS

ROOT = '/Users/0104389S/Projects/hello-france/'
CHIPS = {'name-change-irs', 'name-change-ssa', 'name-change-state', 'veterans-crisis-line-seal', 'employment-navy'}
THUMB_KEYS = {'congress', 'energy', 'fbi', 'hud', 'cbp', 'gsa', 'nasa'}  # their 1.44:1 variants are site thumbnails (thumbs.py)
ORBIT = lambda w, h: 1.40 <= w / h <= 1.48 and w in (32, 64, 128, 256, 384, 480)

_cache = {}


def med(bid, style, px):
    k = (bid, style, px)
    if k not in _cache:
        _cache[k] = M.medal_png(bid, style, px)
    return _cache[k]


def medal_for(bid, d):
    """Medallion image of diameter d px (supersampled then downsized)."""
    st = M.style_for(d)
    return med(bid, st, max(256, min(1024, 4 * d))).resize((d, d), Image.LANCZOS)


def overlay_chip(orig, bid):
    """Replace the round seal inside a shadowed chip, keep the original halo/shadow."""
    im = orig.convert('RGBA'); a = np.array(im)
    sat = (a[..., :3].max(-1).astype(int) - a[..., :3].min(-1)) > 40
    ys, xs = np.where(sat & (a[..., 3] > 200))
    x0, y0, x1, y1 = xs.min(), ys.min(), xs.max(), ys.max()
    d = max(x1 - x0, y1 - y0) + 3
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    im.alpha_composite(medal_for(bid, d), (int(round(cx - d / 2)), int(round(cy - d / 2))))
    return im


def svg_dims(path):
    t = open(path, encoding='utf-8', errors='ignore').read(3000)
    m = re.search(r'viewBox="\s*([-\d.]+)[ ,]+([-\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)', t)
    if m and float(m.group(3)) > 2 and float(m.group(4)) > 2:
        return float(m.group(3)), float(m.group(4))
    mw = re.search(r'\bwidth="([\d.]+)', t); mh = re.search(r'\bheight="([\d.]+)', t)
    return (float(mw.group(1)), float(mh.group(1))) if mw and mh else (512, 512)


def vector_svg(bid, vw, vh, gid):
    ar = vw / vh
    if ar > 1.6:
        svg, _ = M.lockup_svg(bid, vw, vh, gid=gid)
        return svg
    d = min(vw, vh)
    body = M.medal(bid, gid=gid, style='medal')  # vector: always full detail
    s = d / 512
    g = f'<g transform="translate({(vw - d) / 2:.3f} {(vh - d) / 2:.3f}) scale({s:.5f})">{body}</g>'
    return M.svg_doc(g, f'{vw:.10g}', f'{vh:.10g}', f'0 0 {vw:.10g} {vh:.10g}')


def make_raster(bid, key, w, h, alpha, src):
    if key in CHIPS:
        img = overlay_chip(Image.open(src), bid)
        return img if img.size == (w, h) else img.resize((w, h), Image.LANCZOS)
    ar = w / h
    if ar > 1.6:
        svg, _ = M.lockup_svg(bid, w, h, dark_bg=not alpha)
        return M.raster(svg, w * 4).resize((w, h), Image.LANCZOS)
    if key == 'gsa-gold-seal':  # original seal occupies bbox (132,34)-(1211,1106) of 1346x1169
        k = w / 1346
        c = Image.new('RGBA', (w, h), (0, 0, 0, 0))
        d = max(1, int(round(1076 * k)))
        c.alpha_composite(medal_for(bid, d), (int(round(133 * k)), int(round(33 * k))))
        return c
    d = min(w, h)
    c = Image.new('RGBA', (w, h), (0, 0, 0, 0) if alpha else (255, 255, 255, 255))
    c.alpha_composite(medal_for(bid, d), ((w - d) // 2, (h - d) // 2))
    return c


def run():
    written, mapping = [], {}
    for base, variants in P.INV.items():
        key = base.split('/')[-1]
        if base == 'images/home/footer/gsa' or key not in SLOTS:
            continue
        bid = SLOTS[key]
        for i, (p, s, b) in enumerate(variants):
            src = ROOT + '_mirror/' + p
            dst = ROOT + 'tools/overrides/' + p
            if s == 'svg':
                vw, vh = svg_dims(src)
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                open(dst, 'w', encoding='utf-8').write(vector_svg(bid, vw, vh, gid=re.sub(r'\W', '', key)[:12] + str(i)) + '\n')
            else:
                w, h = map(int, s.split('x'))
                if key in THUMB_KEYS and ORBIT(w, h) and p.startswith('_astro/') and p.endswith('.webp'):
                    continue
                alpha = P.has_alpha(src)
                P.save(make_raster(bid, key, w, h, alpha, src), dst, alpha, 90)
            written.append(p)
            mapping.setdefault(key, {'body': bid, 'ring': list(BODIES[bid][:2]), 'files': []})['files'].append(p)
    # masters: one vector SVG per body used
    used = sorted({SLOTS[k] for k in mapping})
    os.makedirs(HERE + 'masters', exist_ok=True)
    for bid in used:
        name = bid.replace(':', '-')
        open(HERE + f'masters/{name}.svg', 'w', encoding='utf-8').write(M.svg_doc(M.medal(bid, gid='m'), 512, 512) + '\n')
        open(HERE + f'masters/{name}-small.svg', 'w', encoding='utf-8').write(M.svg_doc(M.medal(bid, gid='s', style='simple'), 512, 512) + '\n')
    json.dump({'_note': 'slot (inventory base name) -> French public body medallion. Names only + generic pictograms; no real logos.',
               'bodies': {b: {'ring_top': BODIES[b][0], 'ring_bottom': BODIES[b][1], 'pictogram': BODIES[b][2], 'colour': BODIES[b][3],
                              'master': f'masters/{b.replace(":", "-")}.svg'} for b in used},
               'slots': mapping}, open(HERE + 'mapping.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    return written, used


if __name__ == '__main__':
    w, used = run()
    print(len(w), 'files written;', len(used), 'bodies')
