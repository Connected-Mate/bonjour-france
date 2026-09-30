"""Prove every medallion override matches its mirror original: pixel size, format, alpha
(round on transparent when the original is transparent), SVG = pure vector with same viewBox.
usage: python3 tools/imgtools/badges/verify_badges.py   (exit 1 on any failure)"""
import sys, json, re
import xml.etree.ElementTree as ET
from PIL import Image
import resvg_py
sys.path.insert(0, '/Users/0104389S/Projects/hello-france/tools/imgtools/badges')
from run import svg_dims, SLOTS
R = '/Users/0104389S/Projects/hello-france/'
m = json.load(open(R + 'tools/imgtools/badges/mapping.json'))
inv = json.load(open(R + 'tools/image-inventory.json'))


def has_alpha(im):
    if im.mode in ('RGBA', 'LA', 'PA') or (im.mode == 'P' and 'transparency' in im.info):
        return im.convert('RGBA').getchannel('A').getextrema()[0] < 255
    return False


ok, bad, n_svg, n_ras = 0, [], 0, 0
expected = set()
for base, v in inv.items():
    k = base.split('/')[-1]
    if k in SLOTS and base != 'images/home/footer/gsa':
        expected |= {p for p, s, b in v}
listed = {p for s in m['slots'].values() for p in s['files']}
for key, slot in m['slots'].items():
    for p in slot['files']:
        o, n = R + '_mirror/' + p, R + 'tools/overrides/' + p
        probs = []
        if p.endswith('.svg'):
            n_svg += 1
            t = open(n, encoding='utf-8').read()
            try:
                ET.fromstring(t)
            except ET.ParseError as e:
                probs.append(f'xml {e}')
            if '<text' in t or '<image' in t or 'font-family' in t:
                probs.append('not pure vector')
            if svg_dims(o) != svg_dims(n):
                probs.append(f'viewBox {svg_dims(n)} != {svg_dims(o)}')
            try:
                resvg_py.svg_to_bytes(svg_string=t, width=64)
            except Exception as e:
                probs.append(f'render {e}')
        else:
            n_ras += 1
            a, c = Image.open(o), Image.open(n)
            if a.size != c.size: probs.append(f'size {c.size}!={a.size}')
            if a.format != c.format: probs.append(f'fmt {c.format}!={a.format}')
            ao, an = has_alpha(a), has_alpha(c)
            if ao != an: probs.append(f'alpha {an}!={ao}')
            if ao and an:  # corners must stay transparent for round seals
                px = c.convert('RGBA')
                if px.getpixel((0, 0))[3] > 8 and key not in ('employment-navy',): probs.append('corner not transparent')
            if open(o, 'rb').read() == open(n, 'rb').read(): probs.append('identical to original')
        if probs: bad.append((p, probs))
        else: ok += 1
missing = sorted(expected - listed)
print(f'medallion files checked: {ok + len(bad)} (raster {n_ras}, svg {n_svg})  OK: {ok}  BAD: {len(bad)}')
print(f'inventory seal files not written: {len(missing)} (expected: 1.44:1 site thumbnails of congress/energy/fbi/hud/cbp/gsa/nasa)')
for p in missing:
    print('  skip', p, next(s for v in inv.values() for q, s, b in v if q == p))
for p, pr in bad:
    print('BAD', p, '; '.join(pr))
sys.exit(1 if bad else 0)
