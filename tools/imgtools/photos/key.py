# key.py in.png out.png [--gray]  chroma-green key -> RGBA
import sys, numpy as np
from PIL import Image, ImageFilter
im = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(np.float32)
r, g, b = im[..., 0], im[..., 1], im[..., 2]
dom = g - np.maximum(r, b)
a = 1 - np.clip((dom - 18) / (70 - 18), 0, 1)
g2 = np.minimum(g, np.maximum(r, b) * 1.0 + 6)  # despill
out = np.dstack([r, np.where(a < 1, g2, g), b])
if '--gray' in sys.argv:
    lum = 0.299 * out[..., 0] + 0.587 * im[..., 1] * 0 + 0.587 * out[..., 1] + 0.114 * out[..., 2]
    lum = 0.299 * out[..., 0] + 0.587 * out[..., 1] + 0.114 * out[..., 2]
    out = np.dstack([lum, lum, lum])
A = Image.fromarray((a * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
res = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)); res.putalpha(A); res.save(sys.argv[2])
