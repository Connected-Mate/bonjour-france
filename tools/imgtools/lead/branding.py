"""Branding: favicon/webclip mark, share cards, footer mask, flag artwork, press logos, cms-logo."""
import sys, os, io
from PIL import Image
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
sys.path.insert(0, '/Users/0104389S/Projects/hello-france/tools/imgtools/lead')
from lib import render, write, ROOT, OUT, esc
from badges import picto
import place as P

NAVY = '#0b1f3a'
INK = '#000c1f'
OV = ROOT + 'tools/overrides/'
FONTS = ROOT + 'tools/imgtools/fonts/'


def glyph_path(ch, font='Newsreader600.ttf', size=100, x=0, y=0):
    """Outline of text as an SVG path (baseline at y), so SVG files need no font."""
    f = TTFont(FONTS + font)
    gs = f.getGlyphSet(); cmap = f.getBestCmap(); upm = f['head'].unitsPerEm
    s = size / upm
    d = ''
    cx = x
    for c in ch:
        g = cmap[ord(c)]
        pen = SVGPathPen(gs)
        tp = TransformPen(pen, (s, 0, 0, -s, cx, y))
        gs[g].draw(tp)
        d += pen.getCommands()
        cx += gs[g].width * s
    return d, cx - x


BUBBLE = 'M6 10 a8 8 0 0 1 8 -8 h36 a8 8 0 0 1 8 8 v28 a8 8 0 0 1 -8 8 h-22 l-12 11 v-11 h-2 a8 8 0 0 1 -8 -8 z'  # in 64 box


def mark_svg(fg=NAVY, knock='#ffffff', size=64, mask=False):
    bd, bw = glyph_path('B', 'Newsreader600.ttf', 34)
    # center B in bubble body (x 6..58, y 2..46): glyph cap height ~ 0.66*34
    bx = 32 - bw / 2; by = 24 + 34 * 0.33
    bd, _ = glyph_path('B', 'Newsreader600.ttf', 34, bx, by)
    if mask:
        return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 64 64">'
                f'<path fill="{fg}" fill-rule="evenodd" d="{BUBBLE} {bd}"/></svg>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 64 64">'
            f'<path fill="{fg}" d="{BUBBLE}"/><path fill="{knock}" d="{bd}"/></svg>')


def svg_to_img(svg, w):
    import resvg_py
    return Image.open(io.BytesIO(bytes(resvg_py.svg_to_bytes(svg_string=svg, width=w)))).convert('RGBA')


def favicons():
    open(OV + 'favicon.svg', 'w').write(mark_svg(size=48) + '\n')
    big = svg_to_img(mark_svg(), 256)
    sizes = Image.open(ROOT + '_mirror/favicon.ico').info.get('sizes') or {(48, 48)}
    ico = [big.resize(s, Image.LANCZOS) for s in sorted(sizes)]
    ico[-1].save(OV + 'favicon.ico', format='ICO', sizes=sorted(sizes))
    # webclip: opaque light bg (as original), mark centered at ~60%
    bg = Image.new('RGBA', (1024, 1024), (252, 251, 252, 255))
    m = svg_to_img(mark_svg(), 620)
    bg.alpha_composite(m, ((1024 - 620) // 2, (1024 - 620) // 2 + 20))
    write('webclip', bg)
    # footer mask (used as CSS mask-image, colour comes from currentColor)
    open(OV + 'images/home/footer/gsa.svg', 'w').write(mark_svg(fg='#fff', mask=True, size=44).replace('width="44" height="44"', 'width="44.0001" height="44"') + '\n')


def share(w, h, path):
    word, ww = glyph_path('Bonjour France', 'Newsreader500.ttf', 112, 0, 0)
    mark_w = 150
    gap = 36
    total = mark_w + gap + ww
    x0 = (w - total) / 2
    cy = h / 2 - 10
    s = f'<rect width="{w}" height="{h}" fill="#fafafa"/>'
    s += f'<g transform="translate({x0} {cy - mark_w/2 - 8}) scale({mark_w/64})">' + mark_svg()[mark_svg().index('<path'):-6] + '</g>'
    word, _ = glyph_path('Bonjour France', 'Newsreader500.ttf', 112, x0 + mark_w + gap, cy + 38)
    s += f'<path d="{word}" fill="{INK}"/>'
    s += (f'<text x="{w/2}" y="{h - 70}" font-family="Geist500" font-size="26" fill="#475467" text-anchor="middle" '
          f'letter-spacing="0.5">Site non officiel · projet de fans indépendant, sans lien avec l’État</text>')
    im = render(s, w, h)
    P.save(im, OV + path, P.has_alpha(ROOT + '_mirror/' + path), 90)


def artwork():
    """Fabric texture for the waving 'flag' on /about: neutral site banner, no national flag."""
    W, H = 242.98, 131.081
    md, mw = glyph_path('Bonjour', 'Newsreader500.ttf', 30, 0, 0)
    s = f'<rect width="{W}" height="{H}" fill="#0b1f3a"/>'
    for i in range(7):
        s += f'<rect x="0" y="{i*H/7 + H/14 - 0.6:.2f}" width="{W}" height="1.2" fill="#ffffff" fill-opacity=".06"/>'
    # mark + word, centred
    sc = 44 / 64
    gx = (W - (44 + 8 + mw)) / 2
    s += f'<g transform="translate({gx:.2f} {H/2 - 24:.2f}) scale({sc})"><path fill="#f4ead0" d="{BUBBLE}"/>'
    bd, bw = glyph_path('B', 'Newsreader600.ttf', 34, 32 - 11.5, 24 + 11.2)
    s += f'<path fill="#0b1f3a" d="{bd}"/></g>'
    wd, _ = glyph_path('Bonjour', 'Newsreader500.ttf', 30, gx + 52, H / 2 + 8)
    s += f'<path fill="#f4ead0" d="{wd}"/>'
    svg = (f'<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="{W}" height="{H}" '
           f'viewBox="0 0 {W} {H}" fill="none" xmlns="http://www.w3.org/2000/svg">{s}</svg>\n')
    for p, sz, b in P.INV['artwork']:
        open(OV + p, 'w').write(svg)
    return svg


def press_logos():
    spec = {  # base -> (picto, label)
        'cnn': ('numerique', 'RADIO-TÉLÉ'), 'new-york-times': ('archives', 'PRESSE'),
        'techcrunch': ('ampoule', 'TECH'), 'the-atlantic': ('culture', 'REVUE'), 'wired': ('sciences', 'MAGAZINE'),
    }
    for base, (pc, label) in spec.items():
        for b2 in (base, 'images/press/logos/' + base):
            v = P.INV[b2]
            p, s, _ = max(v, key=lambda x: eval(x[1].replace('x', '*')))
            w, h = map(int, s.split('x'))
            u = min(w, h)
            corner = Image.open(ROOT + '_mirror/' + p).convert('RGB').getpixel((2, 2))
            bgc = '#%02x%02x%02x' % corner
            body = '' if P.has_alpha(ROOT + '_mirror/' + p) else f'<rect width="{w}" height="{h}" fill="{bgc}"/>'
            ps = u * 0.42
            if w / h > 1.4:
                ld, lw = glyph_path(label, 'Geist700.ttf', u * 0.26)
                tot = ps + u * 0.1 + lw
                x0 = (w - tot) / 2
                body += picto(pc, '#111111', x0 + ps / 2, h / 2, ps)
                ld, _ = glyph_path(label, 'Geist700.ttf', u * 0.26, x0 + ps + u * 0.1, h / 2 + u * 0.26 * 0.36)
            else:
                body += picto(pc, '#111111', w / 2, h * 0.42, ps)
                ld, lw = glyph_path(label, 'Geist700.ttf', u * 0.14)
                ld, _ = glyph_path(label, 'Geist700.ttf', u * 0.14, (w - lw) / 2, h * 0.82)
            body += f'<path d="{ld}" fill="#111111"/>'
            write(b2, render(body, w, h))
    # fox-news: 32x32 white icon on a dark tile (tile drawn by page)
    for p, s, _ in P.INV['fox-news']:
        inner = picto('numerique', '#ffffff', 100, 100, 190).replace('fill="#fff"', 'fill="#010b0e"')
        open(OV + p, 'w').write('<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="32" height="32.0004" '
                                'viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>\n')


def cms_logo():
    w, h = 1800, 900
    ld, lw = glyph_path('Santé & Retraite', 'Geist700.ttf', 150)
    ms = 300
    x0 = (w - (ms + 60 + lw)) / 2
    body = picto('sante', '#1d5fae', x0 + ms / 2, h / 2, ms * 0.8)
    body = f'<circle cx="{x0+ms/2}" cy="{h/2}" r="{ms/2}" fill="#e8f0fb"/>' + body
    ld, _ = glyph_path('Santé & Retraite', 'Geist700.ttf', 150, x0 + ms + 60, h / 2 + 54)
    body += f'<path d="{ld}" fill="#0b1f3a"/>'
    write('cms-logo', render(body, w, h))


if __name__ == '__main__':
    favicons()
    share(1200, 630, 'images/social/america-og.png')
    share(1200, 675, 'images/social/america-twitter.png')
    artwork()
    press_logos()
    cms_logo()
    print('ok')
