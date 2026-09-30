# Round 3: hot-dog hero pieces from REAL photos (no AI): top & bottom bread = two real baguettes photographed on
# white (Wikimedia Commons, see tools/i18n/photo-credits.json), keyed out of the white background and fitted into
# the original piece's opaque box on the same 1254x1254 transparent canvas. The sausage (hotdog-dog) keeps the
# ORIGINAL real photo (a French "hot-dog" is exactly a baguette + knack sausage), so it is no longer overridden.
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
R = '/Users/0104389S/Projects/hello-france/'
REAL = R + 'tools/imgtools/photos/real/'

def key_white(path):
    im = Image.open(path).convert('RGB'); a = np.asarray(im).astype(float)
    # distance from paper white; baguette crust is saturated brown, the backdrop is near-white/grey
    d = 255 - a.min(axis=2)
    sat = a.max(axis=2) - a.min(axis=2)
    m = ((d > 38) | (sat > 40)).astype(np.uint8)
    m = ndimage.binary_opening(m, iterations=3)
    lab, n = ndimage.label(m)
    sizes = ndimage.sum(m, lab, range(1, n + 1)); keep = lab == (1 + int(np.argmax(sizes)))
    keep = ndimage.binary_fill_holes(keep)
    alpha = Image.fromarray((keep * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.6))
    rgba = im.convert('RGBA'); rgba.putalpha(alpha)
    return rgba.crop(alpha.point(lambda v: 255 if v > 20 else 0).getbbox())

def piece(src, orig_name, flip=False):
    o = Image.open(R + '_mirror/_astro/' + orig_name).convert('RGBA')
    box = o.getchannel('A').point(lambda v: 255 if v > 128 else 0).getbbox()
    w, h = box[2] - box[0], box[3] - box[1]
    if flip: src = src.transpose(Image.FLIP_TOP_BOTTOM)
    fit = src.resize((w, h), Image.LANCZOS)
    out = Image.new('RGBA', o.size, (0, 0, 0, 0)); out.alpha_composite(fit, (box[0], box[1]))
    out.save(R + 'tools/overrides/_astro/' + orig_name, 'PNG', optimize=True)
    print('wrote', orig_name, o.size, 'box', box, 'src aspect', round(src.width / src.height, 2), '-> box aspect', round(w / h, 2))

top = key_white(REAL + 'hd-baguette.jpg')      # long thin baguette, scored crust up
bottom = key_white(REAL + 'hd-baguette3.jpg')  # second baguette, flat base side
piece(top, 'hotdog-top.KZYMH2p_.png')
piece(bottom, 'hotdog-bottom.Buptn8pa.png')
