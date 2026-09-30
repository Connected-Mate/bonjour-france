#!/usr/bin/env python3
"""No-AI-image check for the deployed site (docs/).

AI-generated reference set:
  - tools/imgtools/photos/masters/*, photos/gen/*   (gptimage photo masters, rounds 1-2)
  - tools/imgtools/mocks/photos/*                   (gptimage house thumbnails + portrait, round 1)
  - _old-rebuild/assets/img/* listed as « générée par IA » in its CREDITS.md
  - git history (commits before round 3 / 52d620f, i.e. rounds 1-2): every image under tools/overrides/ whose base
    is credited « gptimage » in that revision's IMAGE-CREDITS.md / credits-photos.md / credits-mocks.md, + roadmap-desktop
    and passport-open (their mocks embedded AI house photos / an AI portrait)
  - AI-derived composites: tools/imgtools/lead/out/*_orbit.png (orbit previews that reused AI photos; owned by
    another agent, reported separately)
Checks every docs/ image: (1) byte hash, (2) decoded-pixel hash, (3) perceptual: 16x16 grey signature after
cropping the AI image to the docs image's aspect (3 horizontal focus points); match = mean abs diff < 9/255
and correlation > 0.93.
usage: ai_check.py [--selftest]"""
import hashlib, io, json, os, re, subprocess, sys, glob
import numpy as np
from PIL import Image

R = '/Users/0104389S/Projects/hello-france/'
IMG = re.compile(r'\.(png|jpe?g|webp)$', re.I)


def git(*a, binary=False):
    r = subprocess.run(['git', '-C', R] + list(a), capture_output=True)
    return r.stdout if binary else r.stdout.decode('utf8', 'replace')


def base_of(path):
    n = os.path.basename(path)
    return n.split('.')[0]


def ai_sources():
    src = {}  # label -> bytes
    for pat in ['tools/imgtools/photos/masters/*', 'tools/imgtools/photos/gen/*', 'tools/imgtools/mocks/photos/*']:
        for p in glob.glob(R + pat):
            if IMG.search(p): src[p[len(R):]] = open(p, 'rb').read()
    cred = open(R + '_old-rebuild/assets/img/CREDITS.md').read()
    for n in re.findall(r'- (\S+\.(?:jpg|png)) : Image générée par IA', cred):
        src['_old-rebuild/assets/img/' + n] = open(R + '_old-rebuild/assets/img/' + n, 'rb').read()
    round3 = git('rev-parse', '52d620f').strip()
    revs = git('rev-list', '--all', '--', 'tools/overrides').split()
    for rev in revs:
        pre3 = subprocess.run(['git', '-C', R, 'merge-base', '--is-ancestor', rev, round3], capture_output=True).returncode == 0 and rev != round3
        if not pre3: continue  # round 3+ commits: every applied photo is a credited real photo (no gptimage)
        text = ''.join(git('show', f'{rev}:{f}') for f in ['tools/overrides/IMAGE-CREDITS.md', 'tools/imgtools/credits-photos.md', 'tools/imgtools/credits-mocks.md'])
        bases = set()
        for line in text.splitlines():
            if 'gptimage' in line:
                bases |= set(re.findall(r'^([a-z][\w-]*)\s*(?:\(|\||,)', line.strip()))
                bases |= set(re.findall(r'`([a-z][\w-]*)`', line))
        bases |= {'roadmap-desktop', 'passport-open'}
        for line in git('ls-tree', '-r', rev, 'tools/overrides').splitlines():
            meta, path = line.split('\t', 1)
            if IMG.search(path) and base_of(path) in bases:
                src[f'git:{rev[:7]}:{path}'] = git('cat-file', 'blob', meta.split()[2], binary=True)
    derived = {p[len(R):]: open(p, 'rb').read() for p in glob.glob(R + 'tools/imgtools/lead/out/*_orbit.png')}
    return src, derived


def load(b):
    im = Image.open(io.BytesIO(b) if isinstance(b, bytes) else b)
    im.load()
    return im


def flat(im):
    im = im.convert('RGBA'); bg = Image.new('RGBA', im.size, (255, 255, 255, 255)); bg.alpha_composite(im)
    return bg.convert('L')


def sig(g, aspect=None, fx=0.5):
    if aspect:
        w, h = g.size
        if w / h > aspect:
            nw = round(h * aspect); x = int((w - nw) * fx); g = g.crop((x, 0, x + nw, h))
        else:
            nh = round(w / aspect); y = (h - nh) // 2; g = g.crop((0, y, w, y + nh))
    return np.asarray(g.resize((16, 16), Image.BOX), np.float32).ravel()


def match(a, b):
    d = np.abs(a - b).mean()
    sa, sb = a - a.mean(), b - b.mean()
    c = float((sa * sb).sum() / (np.sqrt((sa * sa).sum() * (sb * sb).sum()) + 1e-6))
    return d < 9 and c > 0.93, d, c


THUMBS = [(477, 656 + i * 184 + 32, 597, 656 + i * 184 + 152) for i in range(5)]  # mocks/ui.py roadmap_desktop()


def region_check(im, refs):
    g = flat(im)
    for i, box in enumerate(THUMBS):
        s = sig(g.crop(box))
        for k, (rg, _) in refs.items():
            cands = [sig(rg.crop(b)) for b in THUMBS] if rg.size == im.size else [sig(rg, 1.0, fx) for fx in (0.5, 0.3, 0.7)]
            for c in cands:
                ok, d, r = match(s, c)
                if ok: return (f'#{i + 1} d={d:.1f} r={r:.3f}', k)
    return None


def main():
    src, derived = ai_sources()
    allref = {**src, **{'DERIVED ' + k: v for k, v in derived.items()}}
    bytehash = {hashlib.sha256(v).hexdigest(): k for k, v in allref.items()}
    refs = {}
    for k, v in allref.items():
        try:
            im = load(v); g = flat(im)
            refs[k] = (g, hashlib.sha256(np.asarray(im.convert('RGBA')).tobytes()).hexdigest())
        except Exception as e:
            print('skip unreadable', k, e)
    pixhash = {h: k for k, (g, h) in refs.items()}
    cache = {}
    docs = sorted(p for p in glob.glob(R + 'docs/**/*', recursive=True) if IMG.search(p))
    hits, notes = [], []
    for p in docs:
        b = open(p, 'rb').read(); rel = p[len(R):]
        h = hashlib.sha256(b).hexdigest()
        if h in bytehash: hits.append((rel, 'byte-identical', bytehash[h])); continue
        try: im = load(b)
        except Exception: continue
        ph = hashlib.sha256(np.asarray(im.convert('RGBA')).tobytes()).hexdigest()
        if ph in pixhash: hits.append((rel, 'pixel-identical', pixhash[ph])); continue
        if min(im.size) < 24: continue
        if base_of(rel) == 'roadmap-desktop':  # mostly white UI: judge its 5 photo thumbnails, not the frame
            reg = region_check(im, refs)
            if reg: hits.append((rel, 'thumbnail ' + reg[0], reg[1]))
            else: notes.append(f'{rel}: 5 photo thumbnails compared to every AI image, no match')
            continue
        s = sig(flat(im)); asp = round(im.width / im.height, 2)
        for k, (g, _) in refs.items():
            for fx in (0.5, 0.3, 0.7):
                key = (k, asp, fx)
                if key not in cache: cache[key] = sig(g, asp, fx)
                ok, d, c = match(s, cache[key])
                if ok: hits.append((rel, f'perceptual d={d:.1f} r={c:.3f}', k)); break
            else: continue
            break
    print(f'AI reference images: {len(src)} AI files (+{len(derived)} AI-derived orbit composites); docs images checked: {len(docs)}')
    own = [x for x in hits if not x[2].startswith('DERIVED')]
    der = [x for x in hits if x[2].startswith('DERIVED')]
    for n in notes: print('note:', n)
    print(f'MATCHES vs AI files: {len(own)}')
    for x in own: print('  ', *x)
    print(f'MATCHES vs AI-derived orbit composites (orbit bases, other agent): {len(der)}')
    for x in der: print('  ', *x)
    return len(own)


def selftest():
    """Positive control: an AI master placed at a site variant size must be detected; a real photo must not."""
    sys.path.insert(0, R + 'tools/imgtools'); import place as P
    ai = Image.open(R + 'tools/imgtools/photos/masters/new-business.png').convert('RGBA')
    real = Image.open(R + 'tools/imgtools/photos/real/r5-new-business.jpg').convert('RGBA')
    for w, h in [(640, 626), (480, 592), (128, 125)]:
        for name, m, want in [('ai', ai, True), ('real', real, False)]:
            v = P.fit(m, w, h, 'cover', (0.5, 0.5), None).convert('RGB')
            b = io.BytesIO(); v.save(b, 'WEBP', quality=80)
            ok, d, c = match(sig(flat(load(b.getvalue()))), sig(flat(ai), round(w / h, 2), 0.5))
            print(f'selftest {name} {w}x{h}: match={ok} d={d:.1f} r={c:.3f}', 'OK' if ok == want else 'FAIL')
            assert ok == want
    # thumbnail-region control: the round-2 roadmap mock (AI house thumbnails) must be flagged
    old = load(git('show', '3f4c5e0:tools/overrides/_astro/roadmap-desktop.Dbr56P5U.webp', binary=True))
    refs = {p: (flat(Image.open(p)), '') for p in glob.glob(R + 'tools/imgtools/mocks/photos/*.png')}
    hit = region_check(old, refs); print('selftest roadmap-desktop round-2 AI thumbnails:', hit, 'OK' if hit else 'FAIL'); assert hit


if __name__ == '__main__':
    if '--selftest' in sys.argv: selftest()
    else: sys.exit(1 if main() else 0)
