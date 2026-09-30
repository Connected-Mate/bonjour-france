"""Round 5 passports.
Covers (passport-cover, passport-book, passport-card book-on-blue variants, passport-thumbnail): a REAL photo of a
French biometric passport cover (Wikimedia Commons « French Passport Cover Image.png », Nikimura, CC BY-SA 4.0,
photos/real/r5-passport-cover.png), perspective-flattened and fitted into each original's exact size / alpha.
Data pages (passport-details, passport-open, passport-both, passport-card data variants): the fictional round-3 mock
(mocks/out/r3-passport-*-sharp.png = passport_data.py output, frozen copies) is BLURRED (not a sharp reproducible data page) and stamped with a large,
clearly visible « SPÉCIMEN » watermark."""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from lib import *

M = '/Users/0104389S/Projects/hello-france/_mirror/_astro/'
REAL = '/Users/0104389S/Projects/hello-france/tools/imgtools/photos/real/'
FLAT_W, FLAT_H = 905, 1284  # 88 x 125 mm ratio


def flat_cover():
    im = Image.open(REAL + 'r5-passport-cover.png').convert('RGB')
    # corners of the booklet in the photo (TL, BL, BR, TR), measured from the burgundy mask; inset 4 px
    quad = (116, 90, 111, 1365, 1013, 1364, 1002, 89)
    return im.transform((FLAT_W, FLAT_H), Image.QUAD, quad, Image.BICUBIC).convert('RGBA')


def rounded(im, r):
    m = Image.new('L', im.size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, im.width - 1, im.height - 1], radius=r, fill=255)
    out = im.copy(); out.putalpha(m); return out


def book_on_blue(flat):
    """906x600 variant: original light-blue background + soft shadow kept; booklet replaced by the real cover."""
    o = Image.open(M + 'passport-card.BTf4bABc.webp').convert('RGBA')
    a = np.asarray(o.convert('RGB')).astype(int)
    dark = a.sum(-1) < 330
    ys, xs = np.nonzero(dark)
    x0, y0, x1, y1 = xs.min(), ys.min(), xs.max() + 1, ys.max() + 1
    bk = rounded(flat.resize((x1 - x0, y1 - y0), Image.LANCZOS), round((x1 - x0) * 0.035))
    out = o.copy(); out.alpha_composite(bk, (x0, y0))
    print('book bbox', (x0, y0, x1, y1))
    return out


def thumbnail(flat):
    o = Image.open(M + 'passport-thumbnail.Cq5EailI.png').convert('RGBA')
    bk = rounded(flat.resize((57, 79), Image.LANCZOS), 3)
    out = o.copy(); out.alpha_composite(bk, (12, 6)); return out


def specimen_mark(size, cx, cy, fs, angle=-20):
    body = (f'<g transform="translate({cx} {cy}) rotate({angle})">'
            f'<text x="0" y="{fs * 0.35:.1f}" text-anchor="middle" font-family="Geist700" font-size="{fs}" letter-spacing="{fs * 0.06:.1f}" '
            f'fill="#b3141c" fill-opacity="0.78" stroke="#ffffff" stroke-opacity="0.9" stroke-width="{fs * 0.035:.1f}" paint-order="stroke">SPÉCIMEN</text></g>')
    return body


def keep_alpha(res):
    """Multiply each written variant's alpha by the original's (rounded corners, anti-aliased edges)."""
    from PIL import ImageChops
    for p, s in res:
        orig = P.R + '_mirror/' + p; dst = P.R + 'tools/overrides/' + p
        if P.has_alpha(orig):
            im = Image.open(dst).convert('RGBA')
            im.putalpha(ImageChops.multiply(im.getchannel('A'), Image.open(orig).convert('RGBA').getchannel('A')))
            P.save(im, dst, True, 88)


def blur_stamp(master_png, marks, radius):
    src = Image.open(master_png).convert('RGBA')
    al = src.getchannel('A')
    rgb = Image.new('RGBA', src.size, (255, 255, 255, 255)); rgb.alpha_composite(src)
    b = rgb.convert('RGB').filter(ImageFilter.GaussianBlur(radius)).convert('RGBA')
    art = svg(''.join(specimen_mark(src.size, *m) for m in marks), src.width, src.height, scale=2).resize(src.size, Image.LANCZOS)
    b.alpha_composite(art)
    b.putalpha(al)
    return b


if __name__ == '__main__':
    f = flat_cover(); f.save(OUT + 'r5-passport-flat.png')
    keep_alpha(write('passport-cover', f))
    keep_alpha(write('passport-book', f))
    cb = book_on_blue(f)
    write('passport-card', cb, only=['BL5kLTl3', 'BTf4bABc', 'COQSeuG0', 'CsXHHTNf', 'DU_tmzUp', 'DZehMaUW', 'Dz7t0X-e'])
    write('passport-thumbnail', thumbnail(f))
    # data pages: blurred + SPÉCIMEN (masters = round-3 fictional mocks)
    d = blur_stamp(OUT + 'r3-passport-details-sharp.png', [(319, 205, 92)], 3.0)
    d.save(OUT + 'r5-passport-details-specimen.png')
    write('passport-details', d)
    write('passport-both', d)
    write('passport-card', d, only=['B57SdCQ-', 'Bnk0M-3d', 'CzsuXPbE'])
    op = blur_stamp(OUT + 'r3-passport-open-sharp.png', [(314, 215, 84), (314, 650, 84)], 3.0)
    op.save(OUT + 'r5-passport-open-specimen.png')
    write('passport-open', op)
