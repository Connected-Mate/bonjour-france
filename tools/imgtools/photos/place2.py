# wrapper: place.py + keep original alpha shape (rounded corners etc.) when original has alpha
import sys, argparse
sys.path.insert(0, '/Users/0104389S/Projects/hello-france/tools/imgtools')
import place as P
from PIL import Image, ImageChops
a = argparse.ArgumentParser()
a.add_argument('base'); a.add_argument('master')
a.add_argument('--mode', default='cover'); a.add_argument('--focus', default='0.5,0.5')
a.add_argument('--q', type=int, default=85); a.add_argument('--only', default=None); a.add_argument('--nomask', action='store_true')
x = a.parse_args()
res = P.place(x.base, x.master, x.mode, tuple(float(v) for v in x.focus.split(',')), None, x.q, x.only)
for p, s in res:
    orig = P.R + '_mirror/' + p; dst = P.R + 'tools/overrides/' + p
    if P.has_alpha(orig) and not x.nomask:
        o = Image.open(orig).convert('RGBA').getchannel('A')
        im = Image.open(dst).convert('RGBA')
        im.putalpha(ImageChops.multiply(im.getchannel('A'), o))
        P.save(im, dst, True, x.q)
    chk = Image.open(dst)
    assert f'{chk.width}x{chk.height}' == s, (p, s, chk.size)
    print('ok', p, s, chk.mode)
