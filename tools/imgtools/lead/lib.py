"""Lead helpers: SVG rendering (resvg) + subset variant writer by size/aspect."""
import io, os, sys, glob, base64, json
import resvg_py
from PIL import Image
sys.path.insert(0, '/Users/0104389S/Projects/hello-france/tools/imgtools')
import place as P

ROOT = '/Users/0104389S/Projects/hello-france/'
FONTS = sorted(glob.glob(ROOT + 'tools/imgtools/fonts/*.ttf'))
MASTERS = ROOT + 'tools/imgtools/photos/masters/'
OUT = ROOT + 'tools/imgtools/lead/out/'
os.makedirs(OUT, exist_ok=True)


def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def render(svg_body, w, h, out_w=None, bg=None):
    s = (f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
         f'width="{w}" height="{h}" viewBox="0 0 {w} {h}">')
    if bg:
        s += f'<rect width="{w}" height="{h}" fill="{bg}"/>'
    s += svg_body + '</svg>'
    b = resvg_py.svg_to_bytes(svg_string=s, width=int(out_w or w), font_files=FONTS)
    return Image.open(io.BytesIO(bytes(b))).convert('RGBA')


def href(im_or_path, maxw=900, crop=None, fmt='JPEG'):
    im = Image.open(im_or_path) if isinstance(im_or_path, str) else im_or_path
    im = im.convert('RGBA' if fmt == 'PNG' else 'RGB')
    if crop:  # (w,h,fx,fy) cover-crop
        w, h, fx, fy = crop
        s = max(w / im.width, h / im.height)
        r = im.resize((max(w, round(im.width * s)), max(h, round(im.height * s))), Image.LANCZOS)
        x = int((r.width - w) * fx); y = int((r.height - h) * fy)
        im = r.crop((x, y, x + w, y + h))
    elif im.width > maxw:
        im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
    b = io.BytesIO()
    im.save(b, fmt, **({'quality': 88} if fmt == 'JPEG' else {}))
    return f'data:image/{fmt.lower()};base64,' + base64.b64encode(b.getvalue()).decode()


def write(base, master, pred=None, mode='cover', focus=(0.5, 0.5), bg=None, q=86, tag=''):
    """Write variants of `base` whose (path, w, h) satisfy pred (default: all raster)."""
    mp = OUT + base.replace('/', '_') + (('_' + tag) if tag else '') + '.png'
    master.save(mp)
    n = 0
    for p, s, b in P.INV[base]:
        if s == 'svg' or p.endswith('.ico'):
            continue
        w, h = map(int, s.split('x'))
        if pred and not pred(p, w, h):
            continue
        n += len(P.place(base, mp, mode, focus, bg, q, only=p))
    return n


def aspect(lo, hi):
    return lambda p, w, h: lo <= w / h <= hi
