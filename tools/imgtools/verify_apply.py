#!/usr/bin/env python3
"""Check every base listed in tools/overrides/APPLY.txt: each inventory variant has an override with the
same pixel size, same format and alpha kept when the original has alpha; lists variants left unreplaced
(they would show the original image) and override files the mirror lacks (served as extra files)."""
import json, os, re, sys
from PIL import Image
R = '/Users/0104389S/Projects/hello-france/'
inv = json.load(open(R + 'tools/image-inventory.json'))
apply = [l.strip() for l in open(R + 'tools/overrides/APPLY.txt') if l.strip() and not l.startswith('#')]
def alpha(p):
    im = Image.open(p)
    if im.mode in ('RGBA', 'LA', 'PA') or (im.mode == 'P' and 'transparency' in im.info):
        return im.convert('RGBA').getchannel('A').getextrema()[0] < 255
    return False
def base_of(name):
    n = re.sub(r"\.[A-Za-z0-9_-]{8}(_[A-Za-z0-9]+)?\.(webp|png|jpg|svg)$", "", name)
    return re.sub(r"\.(webp|png|jpg|svg|ico)$", "", n)
bykey = {}
for k, v in inv.items():
    for p, s, b in v:
        bykey.setdefault(base_of(os.path.basename(p)), []).append((p, s))
ok = bad = miss = 0
for b in apply:
    if b not in bykey: print('UNKNOWN BASE', b); bad += 1; continue
    for p, s in bykey[b]:
        o, n = R + '_mirror/' + p, R + 'tools/overrides/' + p
        if s == 'svg': continue
        if not os.path.exists(n): print('UNREPLACED', b, p, s); miss += 1; continue
        a, c = Image.open(o), Image.open(n)
        probs = []
        if a.size != c.size: probs.append(f'size {c.size}!={a.size}')
        if a.format != c.format: probs.append(f'fmt {c.format}!={a.format}')
        if alpha(o) and c.mode not in ('RGBA', 'LA', 'PA', 'P'): probs.append('alpha lost')
        if open(o, 'rb').read() == open(n, 'rb').read(): probs.append('identical to original')
        if probs: print('BAD', b, p, *probs); bad += 1
        else: ok += 1
extra = []
for root, _, fs in os.walk(R + 'tools/overrides/_astro'):
    for f in fs:
        if base_of(f) in apply and not os.path.exists(R + '_mirror/_astro/' + f):
            im = Image.open(os.path.join(root, f)); extra.append(f'{f} {im.format} {im.size[0]}x{im.size[1]}')
print(f'APPLY bases: {len(apply)}  files OK: {ok}  BAD: {bad}  unreplaced: {miss}')
print('extra files (referenced by pages, absent from mirror):', *extra, sep='\n  ')
sys.exit(1 if bad else 0)
