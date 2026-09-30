import sys, os
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import gen
bs = list(gen.MAP); cols = 7; cw, ch = 480, 334
rows = (len(bs) + cols - 1) // cols
S = Image.new('RGB', (cols * (cw + 10) + 10, rows * (ch + 10) + 10 + 260), '#888')
for i, b in enumerate(bs):
    S.paste(gen.render(b, cw, ch), (10 + (i % cols) * (cw + 10), 10 + (i // cols) * (ch + 10)))
y = rows * (ch + 10) + 20
for k, (b, w, h) in enumerate([(bs[1], 256, 178), (bs[1], 128, 89), (bs[1], 64, 45), (bs[1], 32, 22), (bs[24], 128, 89), (bs[24], 64, 45), (bs[24], 32, 22)]):
    S.paste(gen.render(b, w, h), (10 + k * 270, y))
S.save('/Users/0104389S/Projects/hello-france/compare/round3-sitecards-sheet.png')
