#!/usr/bin/env python3
"""Verify overrides vs mirror: every override has same dims+format(+alpha); report per-file status.
usage: verify.py [--unreplaced-sheet out.png] [--json out.json]"""
import json, os, sys, hashlib
from PIL import Image
R = '/Users/0104389S/Projects/hello-france/'
inv = json.load(open(R + 'tools/image-inventory.json'))
inv.setdefault('apple-touch-icon', [['apple-touch-icon.png', '256x256', 0]])  # not in inventory, found by scan
def alpha(p):
    im = Image.open(p)
    if im.mode in ('RGBA','LA','PA') or (im.mode=='P' and 'transparency' in im.info):
        return im.convert('RGBA').getchannel('A').getextrema()[0] < 255
    return False
bad, rep, unrep = [], [], []
for base, v in sorted(inv.items()):
    for p, s, b in v:
        o, n = R + '_mirror/' + p, R + 'tools/overrides/' + p
        if not os.path.exists(n):
            unrep.append((base, p, s)); continue
        if s == 'svg':
            t = open(n, 'rb').read(400).lower()
            ok = b'<svg' in t
            (rep if ok else bad).append((base, p, s, 'svg' if ok else 'not svg'))
            continue
        a, c = Image.open(o), Image.open(n)
        probs = []
        if a.size != c.size: probs.append(f'size {c.size}!={a.size}')
        if a.format != c.format: probs.append(f'fmt {c.format}!={a.format}')
        if p.endswith('.ico'):
            if set(a.info.get('sizes', [])) - set(c.info.get('sizes', [])): probs.append('ico sizes')
        elif alpha(o) and not alpha(n) and c.mode not in ('RGBA', 'LA'): probs.append('alpha lost')
        if open(o,'rb').read() == open(n,'rb').read(): probs.append('identical to original')
        (bad if probs else rep).append((base, p, s, ';'.join(probs) or f'{c.format} {c.size[0]}x{c.size[1]}'))
print(f'files: {sum(len(v) for v in inv.values())}  replaced OK: {len(rep)}  BAD: {len(bad)}  not replaced: {len(unrep)}')
for x in bad: print('BAD', *x)
extra=[]
for root, _, fs in os.walk(R + 'tools/overrides'):
    for f in fs:
        rel = os.path.relpath(os.path.join(root, f), R + 'tools/overrides')
        if rel.split('.')[-1].lower() in ('webp','png','jpg','svg','ico') and not rel.startswith('fonts'):
            if not os.path.exists(R + '_mirror/' + rel): extra.append(rel)
print('overrides with no mirror counterpart:', len(extra)); [print('  EXTRA', e) for e in extra]
if '--json' in sys.argv:
    json.dump({'replaced': rep, 'bad': bad, 'unreplaced': unrep}, open(sys.argv[sys.argv.index('--json')+1], 'w'), indent=1)
if '--unreplaced-sheet' in sys.argv:
    from PIL import ImageDraw, ImageFont
    out = sys.argv[sys.argv.index('--unreplaced-sheet')+1]
    groups = {}
    for base, p, s in unrep:
        w_, h_ = map(int, s.split('x')) if s != 'svg' else (1, 1)
        key = base + ' ' + ('%.1f' % (w_ / h_))
        if s == 'svg': continue
        groups.setdefault(key, []).append((p, s))
    items = []
    for k, lst in groups.items():
        p, s = max(lst, key=lambda x: eval(x[1].replace('x','*')))
        items.append((k, p, s, len(lst)))
    cell, cols = 200, 7
    im = Image.new('RGB', (cols*cell, ((len(items)+cols-1)//cols)*(cell+30)), (190,190,200)); d = ImageDraw.Draw(im)
    for i,(k,p,s,n) in enumerate(items):
        x,y=(i%cols)*cell,(i//cols)*(cell+30)
        t=Image.open(R+'_mirror/'+p).convert('RGBA'); t.thumbnail((cell-6,cell-6))
        bg=Image.new('RGBA',t.size,(255,255,255,255)); bg.alpha_composite(t); im.paste(bg.convert('RGB'),(x+3,y+3))
        d.text((x+3,y+cell),k[-32:],fill=0); d.text((x+3,y+cell+12),f'{s} x{n}',fill=(60,60,60))
    im.save(out); print('sheet', out, len(items), 'groups')
