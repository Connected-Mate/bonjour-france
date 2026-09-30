"""Fit real screenshots (shots/<slot>.png) into every rectangular orbit variant; writes credits."""
import json, os, sys
from PIL import Image
D = os.path.dirname(os.path.abspath(__file__)); ROOT = D + '/../../'
MAP = json.load(open(D + '/mapping.json')); INV = json.load(open(ROOT + 'image-inventory.json'))
sys.path.insert(0, D); import gen
cred = []; n = 0
for slot, v in MAP.items():
    f = f'{D}/shots/{slot}.png'; dom = v[0]
    ok = os.path.exists(f)
    url = 'https://' + dom + '/'
    if ok:
        im = Image.open(f).convert('RGB')
        for p, w, h in gen.rect_variants(slot):
            ch = round(im.width * h / w)
            c = im.crop((0, 0, im.width, min(ch, im.height)))
            c.resize((w, h), Image.LANCZOS).save(ROOT + 'overrides/' + p, 'WEBP', quality=85, method=6); n += 1
    cred.append({"slot": slot, "domain": dom, "url": url, "captured": "2026-09-30", "status": "capture" if ok else "carte"})
json.dump(cred, open(ROOT + 'i18n/orbit-credits.json', 'w'), ensure_ascii=False, indent=1)
print('written', n, 'capture', sum(c['status']=='capture' for c in cred))
