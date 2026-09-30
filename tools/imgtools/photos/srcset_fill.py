# Carousel srcSet / mobileSrcSet variants referenced by index.html but absent from the mirror (the
# 640w desktop and 360w mobile sizes): derive each from the largest override of the same set so every
# width the browser may pick shows the French photo (else a 404 / broken card on small screens).
import re, os, html, sys
from PIL import Image
R = '/Users/0104389S/Projects/hello-france/'
t = html.unescape(open(R + '_mirror/index.html').read())
bases = sys.argv[1:]
for key in ('srcSet', 'mobileSrcSet'):
    for s in re.findall(r'"' + key + r'":\[0,"([^"]*)"\]', t):
        items = [(f, int(w)) for f, w in re.findall(r'/_astro/([\w.-]+\.webp) (\d+)w', s)]
        if not items or 'backdrop' in s: continue
        b = items[0][0].split('.')[0]
        if bases and b not in bases: continue
        have = [(f, w) for f, w in items if os.path.exists(R + 'tools/overrides/_astro/' + f) and os.path.exists(R + '_mirror/_astro/' + f)]
        if not have: continue
        src_f = max(have, key=lambda x: x[1])[0]
        src = Image.open(R + 'tools/overrides/_astro/' + src_f).convert('RGB')
        for f, w in items:
            if os.path.exists(R + '_mirror/_astro/' + f): continue
            h = round(w * src.height / src.width)
            src.resize((w, h), Image.LANCZOS).save(R + 'tools/overrides/_astro/' + f, 'WEBP', quality=82, method=6)
            print(key, 'wrote', f, (w, h), 'from', src_f)
