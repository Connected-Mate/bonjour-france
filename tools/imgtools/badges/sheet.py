"""Badges sheet: every body medallion large enough to read + its small/tiny forms.
usage: python3 tools/imgtools/badges/sheet.py [out.png] [--cell 340] [--cols 6] [--only core]"""
import sys, json
from PIL import Image, ImageDraw, ImageFont
sys.path.insert(0, '/Users/0104389S/Projects/hello-france/tools/imgtools/badges')
import medallions as M
R = '/Users/0104389S/Projects/hello-france/'
m = json.load(open(R + 'tools/imgtools/badges/mapping.json'))
out = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith('--') else R + 'compare/round2-badges-sheet.png'
arg = lambda k, d: type(d)(sys.argv[sys.argv.index(k) + 1]) if k in sys.argv else d
cell, cols = arg('--cell', 340), arg('--cols', 6)
ids = list(m['bodies'])
nat = [b for b in ids if not b.startswith('local:')] + [b for b in ids if b.startswith('local:')]
lab = cell // 7
rows = (len(nat) + cols - 1) // cols
im = Image.new('RGB', (cols * cell, rows * (cell + lab)), (236, 236, 240))
d = ImageDraw.Draw(im)
try:
    f = ImageFont.truetype(R + 'tools/imgtools/fonts/Geist500.ttf', max(12, lab // 2))
except Exception:
    f = ImageFont.load_default()
for i, b in enumerate(nat):
    x, y = (i % cols) * cell, (i // cols) * (cell + lab)
    big = M.medal_png(b, 'medal', cell - 16)
    im.paste(big, (x + 8, y + 8), big)
    sm = M.medal_png(b, 'simple', 256).resize((lab - 6, lab - 6), Image.LANCZOS)
    tn = M.medal_png(b, 'tiny', 256).resize((max(16, lab // 2), max(16, lab // 2)), Image.LANCZOS)
    im.paste(sm, (x + 8, y + cell), sm)
    im.paste(tn, (x + 8 + lab, y + cell + (lab - tn.height) // 2), tn)
    d.text((x + 16 + lab + tn.width, y + cell + lab // 4), b.replace('local:seal-local-', 'local: '), fill=(40, 40, 50), font=f)
im.save(out, optimize=True)
print(out, im.size, len(nat), 'bodies')
