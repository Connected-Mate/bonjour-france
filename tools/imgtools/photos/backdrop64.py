# Carousel backdrop 64w variants missing from the mirror (the page references them in backdropSrcSet):
# derive each from the (already blurred) 128w override, so the 64w and 128w backdrops always match.
import re, os, sys, json
from PIL import Image
R = '/Users/0104389S/Projects/hello-france/'
t = open(R + '_mirror/index.html').read()
bases = sys.argv[1:]
inv = json.load(open(R + 'tools/image-inventory.json'))
for s in re.findall(r'backdropSrcSet&quot;:\[0,&quot;([^&]*)&quot;', t):
    f64, f128 = re.findall(r'/_astro/([\w.-]+\.webp) (?:64|128)w', s)
    b = f64.split('.')[0]
    if bases and b not in bases: continue
    if os.path.exists(R + '_mirror/_astro/' + f64): continue  # real original exists: backdrop.py handles it
    src = Image.open(R + 'tools/overrides/_astro/' + f128).convert('RGB')
    W, H = max((tuple(map(int, x[1].split('x'))) for x in inv[b] if x[1] != 'svg' and x[0].startswith('_astro/' + f64.split('_')[0])), key=lambda z: z[0])
    h = round(64 * H / W)  # aspect of the largest original variant, as the image pipeline does
    src.resize((64, h), Image.LANCZOS).save(R + 'tools/overrides/_astro/' + f64, 'WEBP', quality=85, method=6)
    print('wrote', f64, (64, h))
