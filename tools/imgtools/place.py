#!/usr/bin/env python3
"""Write every variant of an inventory base from one master image.

usage: place.py <base> <master.png> [--focus fx,fy] [--mode cover|contain] [--bg r,g,b,a] [--q 85]
 - cover (default): scale to fill each variant size, crop around focus (0..1, default 0.5,0.5)
 - contain: fit inside, pad with --bg (default transparent if original has alpha else white)
Keeps exact relative path, pixel size, format; keeps alpha if the original has alpha.
"""
import json, os, sys, argparse
from PIL import Image
R = '/Users/0104389S/Projects/hello-france/'
INV = json.load(open(R + 'tools/image-inventory.json'))

def has_alpha(p):
    im = Image.open(p)
    if im.mode in ('RGBA', 'LA', 'PA') or (im.mode == 'P' and 'transparency' in im.info):
        a = im.convert('RGBA').getchannel('A')
        return a.getextrema()[0] < 255
    return False

def fit(master, w, h, mode, focus, bg):
    m = master
    if mode == 'cover':
        s = max(w / m.width, h / m.height)
        nw, nh = max(w, round(m.width * s)), max(h, round(m.height * s))
        r = m.resize((nw, nh), Image.LANCZOS)
        x = int(round((nw - w) * focus[0])); y = int(round((nh - h) * focus[1]))
        return r.crop((x, y, x + w, y + h))
    s = min(w / m.width, h / m.height)
    nw, nh = max(1, round(m.width * s)), max(1, round(m.height * s))
    r = m.resize((nw, nh), Image.LANCZOS)
    c = Image.new('RGBA', (w, h), bg)
    c.alpha_composite(r, ((w - nw) // 2, (h - nh) // 2))
    return c

def save(img, path, alpha, q):
    os.makedirs(os.path.dirname(path) or '.', exist_ok=True)
    ext = path.rsplit('.', 1)[1].lower()
    if not alpha:
        bgc = Image.new('RGBA', img.size, (255, 255, 255, 255)); bgc.alpha_composite(img); img = bgc.convert('RGB')
    if ext == 'webp':
        img.save(path, 'WEBP', quality=q, method=6)
    elif ext == 'png':
        img.save(path, 'PNG', optimize=True)
    elif ext in ('jpg', 'jpeg'):
        img.convert('RGB').save(path, 'JPEG', quality=q)
    else:
        raise SystemExit('unsupported ' + path)

def place(base, master_path, mode='cover', focus=(0.5, 0.5), bg=None, q=85, only=None):
    master = Image.open(master_path).convert('RGBA')
    out = []
    for p, s, b in INV[base]:
        if s == 'svg' or p.endswith('.ico'):
            continue
        if only and only not in p: continue
        w, h = map(int, s.split('x'))
        orig = R + '_mirror/' + p
        alpha = has_alpha(orig)
        bgc = bg if bg else ((0, 0, 0, 0) if alpha else (255, 255, 255, 255))
        img = fit(master, w, h, mode, focus, bgc)
        dst = R + 'tools/overrides/' + p
        save(img, dst, alpha, q)
        out.append((p, s))
    return out

if __name__ == '__main__':
    a = argparse.ArgumentParser()
    a.add_argument('base'); a.add_argument('master')
    a.add_argument('--mode', default='cover'); a.add_argument('--focus', default='0.5,0.5')
    a.add_argument('--bg', default=None); a.add_argument('--q', type=int, default=85)
    x = a.parse_args()
    bg = tuple(int(v) for v in x.bg.split(',')) if x.bg else None
    for p, s in place(x.base, x.master, x.mode, tuple(float(v) for v in x.focus.split(',')), bg, x.q):
        print('wrote', p, s)
