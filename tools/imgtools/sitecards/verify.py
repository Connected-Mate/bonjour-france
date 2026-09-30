import sys, os
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import gen
bad = n = 0
for base in gen.MAP:
    for p, w, h in gen.rect_variants(base):
        f = gen.ROOT + 'overrides/' + p
        im = Image.open(f); n += 1
        if im.format != 'WEBP' or im.size != (w, h):
            bad += 1; print('BAD', p, im.format, im.size, (w, h))
print(f'{n} files checked, {bad} bad; {len(gen.MAP)} bases, {len({v[0] for v in gen.MAP.values()})} distinct domains')
