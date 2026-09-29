"""Check every variant of the mock bases: override exists, pixel size == inventory, same format, alpha kept."""
import json, sys
sys.path.insert(0, '/Users/0104389S/Projects/hello-france/tools/imgtools')
from PIL import Image
import place as P
R = '/Users/0104389S/Projects/hello-france/'
BASES = ['passport-book', 'passport-both', 'passport-card', 'passport-cover', 'passport-open', 'passport-details',
         'passport-thumbnail', 'passport-visa', 'camping-map', 'images/home/roadmap/demo/camping-map', 'wichita-map',
         'pharmacy-map', 'roadmap-desktop', 'roadmap-phone', 'screen', 'images/home/roadmap/screen', 'sources-panel',
         'camp', 'images/home/roadmap/demo/camp', 'login', 'trusted-traveler', 'images/home/roadmap/demo/trusted-traveler']
bad = n = 0
for b in BASES:
    for p, s, _ in P.INV[b]:
        n += 1
        o, v = R + '_mirror/' + p, R + 'tools/overrides/' + p
        try:
            im = Image.open(v)
        except Exception as e:
            print('MISSING', p, e); bad += 1; continue
        oi = Image.open(o)
        ok = f'{im.width}x{im.height}' == s and im.format == oi.format and P.has_alpha(o) == P.has_alpha(v)
        if not ok:
            bad += 1
        print('OK ' if ok else 'BAD', p, s, f'{im.width}x{im.height}', im.format, 'alpha', P.has_alpha(o), '->', P.has_alpha(v))
print(f'{n} files, {bad} bad')
sys.exit(1 if bad else 0)
