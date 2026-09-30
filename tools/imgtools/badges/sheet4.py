"""Round-4 contact sheet: every body used by discs.py, disc large + 48/32/16 px renders, name, logo/text.
usage: python3 tools/imgtools/badges/sheet4.py [out.png] [--cell 300] [--cols 8]"""
import sys, os
from PIL import Image, ImageDraw, ImageFont
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import discs as D
R = D.ROOT
out = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith('--') else R + 'compare/round4-logos-sheet.png'
arg = lambda k, d: type(d)(sys.argv[sys.argv.index(k) + 1]) if k in sys.argv else d
cell, cols = arg('--cell', 300), arg('--cols', 8)
used = sorted(set(D.SLOTS.values()) | set(D.EXTRA_SVG.values()), key=lambda b: (b in D.TEXT, b))
lab = 64
rows = (len(used) + cols - 1) // cols
im = Image.new('RGB', (cols * cell, rows * (cell + lab)), (241, 241, 244))
dr = ImageDraw.Draw(im)
f1 = ImageFont.truetype(R + 'tools/imgtools/fonts/Geist600.ttf', 15)
f2 = ImageFont.truetype(R + 'tools/imgtools/fonts/Geist400.ttf', 12)
for i, b in enumerate(used):
    x, y = (i % cols) * cell, (i // cols) * (cell + lab)
    big = D.raster(b, cell - 70, cell - 70)
    im.paste(big, (x + 8, y + 8), big)
    yy = y + 12
    for s in (48, 32, 16):
        t = D.raster(b, s, s)
        im.paste(t, (x + cell - 56 + (48 - s) // 2, yy), t); yy += s + 10
    name = D.TEXT[b][0] if b in D.TEXT else D.LOGO[b]
    kind = 'TEXTE (État)' if b in D.TEXT else 'LOGO RÉEL'
    dr.text((x + 10, y + cell - 56), name[:34], fill=(20, 25, 40), font=f1)
    dr.text((x + 10, y + cell - 36), f'{kind} · {b}', fill=(150, 40, 40) if b in D.TEXT else (20, 110, 60), font=f2)
im.save(out, optimize=True)
print(out, im.size, len(used), 'bodies', sum(b not in D.TEXT for b in used), 'logos')
