"""Shared helpers for the image mocks: SVG -> RGBA via resvg, subset variant writer."""
import io, glob, sys, os, base64
import resvg_py
from PIL import Image, ImageFilter
sys.path.insert(0, '/Users/0104389S/Projects/hello-france/tools/imgtools')
import place as P

FONTDIR = '/Users/0104389S/Projects/hello-france/tools/imgtools/fonts'
FONTS = sorted(glob.glob(FONTDIR + '/*.ttf')) + ['/System/Library/Fonts/Menlo.ttc']
MOCKS = '/Users/0104389S/Projects/hello-france/tools/imgtools/mocks/'
OUT = MOCKS + 'out/'
os.makedirs(OUT, exist_ok=True)

def svg(body, w, h, scale=1, bg=None):
    s = f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
    if bg: s += f'<rect width="{w}" height="{h}" fill="{bg}"/>'
    s += body + '</svg>'
    b = resvg_py.svg_to_bytes(svg_string=s, width=int(w * scale), font_files=FONTS)
    return Image.open(io.BytesIO(bytes(b))).convert('RGBA')

def img_href(path, maxw=None):
    im = Image.open(path).convert('RGB')
    if maxw and im.width > maxw:
        im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'JPEG', quality=90)
    return 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()

def png_href(im):
    b = io.BytesIO(); im.save(b, 'PNG')
    return 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode()

def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def write(base, master, only=None, mode='cover', focus=(0.5, 0.5), q=88):
    """Write variants of base (optionally only those whose path contains one of `only`)."""
    name = base.replace('/', '_')
    mp = OUT + name + ('_' + '_'.join(only) if only else '') + '.png'
    master.save(mp)
    res = []
    for p, s, b in P.INV[base]:
        if only and not any(o in p for o in only):
            continue
        res += P.place(base, mp, mode, focus, None, q, only=p)
    for p, s in res:
        print('wrote', p, s)
    return res
