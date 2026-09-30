# Before/after contact sheet: per base, original (mirror) vs override for the widest and the tallest variant.
# usage: sheet_r3.py out.png base1,base2,...
import json, sys, os
from PIL import Image, ImageDraw
R = '/Users/0104389S/Projects/hello-france/'
inv = json.load(open(R + 'tools/image-inventory.json'))
out, bases = sys.argv[1], sys.argv[2].split(',')
T = 220
def load(p):
    im = Image.open(p).convert('RGBA'); bg = Image.new('RGBA', im.size, (205, 205, 205, 255)); bg.alpha_composite(im)
    im = bg.convert('RGB'); im.thumbnail((T, T)); return im
rows = []
for b in bases:
    v = [x for x in inv[b] if x[1] != 'svg' and not (b == 'medicare' and 'DqRXMPkA' not in x[0])]
    ar = lambda x: int(x[1].split('x')[0]) / int(x[1].split('x')[1])
    area = lambda x: int(x[1].split('x')[0]) * int(x[1].split('x')[1])
    wide = max(v, key=lambda x: (round(ar(x), 1), area(x))); tall = min(v, key=lambda x: (round(ar(x), 1), -area(x)))
    picks = [wide] if wide == tall else [wide, tall]
    cells = []
    for x in picks:
        for root in ('_mirror/', 'tools/overrides/'):
            p = R + root + x[0]
            cells.append((load(p) if os.path.exists(p) else Image.new('RGB', (T // 2, T // 2), 'red'), ('avant ' if root == '_mirror/' else 'après ') + x[1]))
    rows.append((b, cells))
cols = 2
W = cols * (4 * (T + 6) + 10); H = ((len(rows) + cols - 1) // cols) * (T + 36)
S = Image.new('RGB', (W, H), 'white'); d = ImageDraw.Draw(S)
for i, (b, cells) in enumerate(rows):
    x0 = (i % cols) * (4 * (T + 6) + 10); y0 = (i // cols) * (T + 36)
    d.text((x0, y0 + 2), b, fill='black')
    for j, (im, lab) in enumerate(cells):
        S.paste(im, (x0 + j * (T + 6), y0 + 30)); d.text((x0 + j * (T + 6), y0 + 16), lab, fill=(0, 0, 160))
S.save(out); print(out, S.size)
