"""Contact sheet original vs new for mock bases -> compare/images-mocks.png"""
import sys
sys.path.insert(0, '/Users/0104389S/Projects/hello-france/tools/imgtools')
from PIL import Image, ImageDraw, ImageFont
import place as P
R = '/Users/0104389S/Projects/hello-france/'
F = ImageFont.truetype('/Users/0104389S/Projects/hello-france/tools/imgtools/fonts/Geist600.ttf', 18)
items = [('passport-cover', None), ('passport-book', None), ('passport-card', 'BTf4bABc'), ('passport-card', 'CzsuXPbE'),
         ('passport-both', None), ('passport-thumbnail', None), ('passport-open', None), ('passport-details', None),
         ('passport-visa', None), ('camping-map', None), ('wichita-map', None), ('pharmacy-map', None),
         ('roadmap-desktop', None), ('roadmap-phone', None), ('screen', None), ('sources-panel', None),
         ('camp', 'iXEW0tbG'), ('login', None), ('trusted-traveler', 'CMvo7gfe')]
TH = 300
def checker(w, h):
    c = Image.new('RGBA', (w, h), (255, 255, 255, 255)); d = ImageDraw.Draw(c)
    for y in range(0, h, 12):
        for x in range(0, w, 12):
            if (x // 12 + y // 12) % 2: d.rectangle([x, y, x + 11, y + 11], fill=(228, 228, 228, 255))
    return c
cells = []
for b, key in items:
    vs = [v for v in P.INV[b] if (key is None or key in v[0])]
    p = max(vs, key=lambda v: int(v[1].split('x')[0]))[0]
    pair = []
    for root in ('_mirror/', 'tools/overrides/'):
        im = Image.open(R + root + p).convert('RGBA')
        s = TH / im.height if im.height >= im.width * 0.6 else min(TH / im.height, 420 / im.width)
        im = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)
        bg = checker(im.width, im.height); bg.alpha_composite(im); pair.append(bg)
    w = pair[0].width + pair[1].width + 30
    cell = Image.new('RGBA', (w, TH + 34), (250, 250, 250, 255))
    cell.alpha_composite(pair[0], (0, 30)); cell.alpha_composite(pair[1], (pair[0].width + 30, 30))
    d = ImageDraw.Draw(cell); d.text((0, 4), f'{b}' + (f' [{key}]' if key else '') + '   original | nouveau', font=F, fill=(20, 20, 20))
    cells.append(cell)
Wmax = 1900
rows, cur, cw = [], [], 0
for c in cells:
    if cw + c.width > Wmax and cur:
        rows.append(cur); cur, cw = [], 0
    cur.append(c); cw += c.width + 40
rows.append(cur)
H = sum(max(c.height for c in r) + 30 for r in rows)
sheet = Image.new('RGB', (Wmax, H), (255, 255, 255))
y = 0
for r in rows:
    x = 0
    for c in r:
        sheet.paste(c, (x, y), c); x += c.width + 40
    y += max(c.height for c in r) + 30
sheet.save(R + 'compare/images-mocks.png'); print(sheet.size)
