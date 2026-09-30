"""Passport data pages (fictional SPECIMEN, no real security features, no state emblem):
passport-details (638x410, names + photo left blank: the home page overlays them in HTML),
passport-both + passport-card small variants (same data card downscaled),
passport-open (629x864: observations page + data page, fictional portrait)."""
import math
import numpy as np
from lib import *

M = '/Users/0104389S/Projects/hello-france/_mirror/_astro/'
PHOTOS = MOCKS + 'photos/'
INK = '#1d2230'
LAB = '#3b4257'
BLUE = '#27407e'
PURPLE = '#7d70c2'


def check(s):
    w = [7, 3, 1]
    v = 0
    for i, c in enumerate(s):
        if c.isdigit():
            n = int(c)
        elif c == '<':
            n = 0
        else:
            n = ord(c) - 55
        v += n * w[i % 3]
    return str(v % 10)


def mrz(num, dob, sex, exp):
    l1 = ('P<FRASPECIMEN<<DEMONSTRATION').ljust(44, '<')
    pn = num.ljust(9, '<')
    opt = '<' * 14
    body = pn + check(pn) + 'FRA' + dob + check(dob) + sex + exp + check(exp) + opt + check(opt)
    comp = pn + check(pn) + dob + check(dob) + exp + check(exp) + opt + check(opt)
    l2 = body + check(comp)
    assert len(l1) == 44 and len(l2) == 44, (len(l1), len(l2))
    return l1, l2


def waves(x0, y0, x1, y1, n, amp, per, color, sw, phase=0.0, op=1):
    s = f'<g fill="none" stroke="{color}" stroke-width="{sw}" opacity="{op}">'
    for i in range(n):
        y = y0 + (y1 - y0) * i / max(1, n - 1)
        pts = []
        x = x0
        while x <= x1:
            pts.append(f'{x:.1f},{y + amp * math.sin((x / per) * 2 * math.pi + phase + i * 0.35):.2f}')
            x += 4
        s += f'<polyline points="{" ".join(pts)}"/>'
    return s + '</g>'


def rose(cx, cy, R, color, sw, k=7, n=5, op=1):
    """Hypotrochoid-style guilloché rosette (purely geometric)."""
    s = f'<g fill="none" stroke="{color}" stroke-width="{sw}" opacity="{op}">'
    for j in range(n):
        r = R * (1 - j * 0.14)
        pts = []
        for t in np.linspace(0, 2 * math.pi, 1400):
            rad = r * (0.72 + 0.28 * math.cos(k * t + j * 0.6))
            pts.append(f'{cx + rad * math.cos(t):.2f},{cy + rad * math.sin(t):.2f}')
        s += f'<polygon points="{" ".join(pts)}"/>'
    for i in range(48):
        t = 2 * math.pi * i / 48
        s += f'<line x1="{cx + R * 0.18 * math.cos(t):.1f}" y1="{cy + R * 0.18 * math.sin(t):.1f}" x2="{cx + R * 0.55 * math.cos(t):.1f}" y2="{cy + R * 0.55 * math.sin(t):.1f}"/>'
    return s + '</g>'


def txt(x, y, t, size, fam='Geist500', fill=INK, anchor='start', extra=''):
    return f'<text x="{x}" y="{y}" font-family="{fam}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" {extra}>{esc(t)}</text>'


def specimen(cx, cy, size, angle, op=0.85):
    return (f'<g transform="translate({cx} {cy}) rotate({angle})" opacity="{op}">'
            f'<text x="0" y="0" text-anchor="middle" font-family="Geist500" font-size="{size}" letter-spacing="{size * 0.08}" '
            f'fill="#b9a9d8" fill-opacity="0.35" stroke="#5a3d6e" stroke-width="{size * 0.03}">SPÉCIMEN</text></g>')


def perfs(x, y0, y1, color='#3a3f55'):
    """Decorative dotted column (not a real document number)."""
    s = ''
    y = y0
    i = 0
    while y < y1:
        for dx in (0, 7, 14):
            if (i + dx) % 3 != 1:
                s += f'<circle cx="{x + dx}" cy="{y:.1f}" r="1.25" fill="{color}" opacity="0.8"/>'
        y += 6.2
        i += 1
    return s


def bg_defs():
    return ('<defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">'
            '<stop offset="0" stop-color="#e3e9f6"/><stop offset="0.45" stop-color="#d6dcf2"/><stop offset="1" stop-color="#dcd8ef"/></linearGradient>'
            '<radialGradient id="pl" cx="0.15" cy="0.55" r="0.35"><stop offset="0" stop-color="#f3f6fb" stop-opacity="0.9"/><stop offset="1" stop-color="#f3f6fb" stop-opacity="0"/></radialGradient>'
            '<linearGradient id="gd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8923f"/><stop offset="1" stop-color="#7a5d22"/></linearGradient>'
            '</defs>')


def datapage(names=None, photo=None, ghost=None, dob='25 03 1990', sex='F', place='LYON (69)',
             issue='12 09 2020', exp='12 09 2030', num='123456789'):
    """SVG group in 638x410 coordinates."""
    s = f'<rect width="638" height="410" fill="url(#pg)"/>'
    s += waves(0, 60, 638, 400, 70, 3.2, 90, '#b7c2e2', 0.5, op=0.9)
    s += waves(0, 70, 330, 340, 36, 6, 150, '#c9d2ea', 0.45, phase=1.3, op=0.9)
    s += '<rect width="638" height="410" fill="url(#pl)"/>'
    s += rose(458, 222, 128, PURPLE, 0.7, k=9, n=6, op=0.55)
    s += rose(458, 222, 70, '#6a5db4', 0.9, k=5, n=4, op=0.5)
    # header band
    s += f'<rect x="0" y="36" width="638" height="0.8" fill="#8d97c0"/>'
    s += txt(81, 23, 'PASSEPORT', 11, 'Geist500', LAB, 'middle')
    s += txt(81, 32, 'PASSPORT', 7.2, 'Geist400', LAB, 'middle')
    s += (f'<text x="410" y="28" text-anchor="middle" font-family="Newsreader600" font-size="21" letter-spacing="1.2" '
          f'fill="#e4e1f5" stroke="#5b5aa6" stroke-width="0.9">PASSEPORT DE DÉMONSTRATION</text>')
    # gold code mark (plain letters, wavy fill)
    s += (f'<text x="41" y="91" font-family="Geist700" font-size="30" letter-spacing="2" fill="url(#gd)">FRA</text>')
    # top row
    s += txt(196, 52, 'Type / Type', 6.6, fill=LAB) + txt(230, 68, 'P', 10.5, 'Geist600')
    s += txt(275, 52, 'Code du pays / Country code', 6.6, fill=LAB) + txt(306, 68, 'FRA', 10.5, 'Geist600')
    s += txt(392, 52, 'Passeport n° / Passport No.', 6.6, fill=LAB) + txt(422, 74, num, 16, 'Geist600', extra='letter-spacing="0.6"')
    # names
    s += txt(180, 93, 'Nom / Surname', 6.6, fill=LAB)
    s += txt(180, 123, 'Prénoms / Given names', 6.6, fill=LAB)
    if names:
        s += txt(182, 107, names[0], 10.5, 'Geist600') + txt(182, 137, names[1], 10.5, 'Geist600')
    rows = [('Nationalité / Nationality', 'FRANÇAISE', 156, 10.5),
            ('Date de naissance / Date of birth', dob, 181, 12.5),
            ('Sexe / Sex', sex, 209, 11),
            ('Lieu de naissance / Place of birth', place, 236, 12.5),
            ('Date de délivrance / Date of issue', issue, 264, 12.5),
            ('Date d’expiration / Date of expiry', exp, 291, 12.5),
            ('Autorité / Authority', 'SERVICE FICTIF — DÉMONSTRATION', 320, 10.5)]
    for lab, val, y, fs in rows:
        s += txt(215, y, lab, 6.6, fill=LAB)
        s += txt(217, y + 14, val, fs, 'Geist600', extra='letter-spacing="0.3"')
    # decorative L band (plain pattern, no hologram)
    s += f'<g opacity="0.35"><rect x="170" y="198" width="26" height="130" rx="2" fill="#6b7396"/><rect x="98" y="302" width="98" height="26" rx="2" fill="#6b7396"/></g>'
    s += waves(170, 200, 196, 326, 22, 1.4, 12, '#e4e8f5', 0.5)
    s += perfs(588, 58, 320)
    # photo slots
    if photo:
        s += f'<image href="{photo}" x="18" y="118" width="148" height="196" preserveAspectRatio="xMidYMid slice" opacity="0.96"/>'
    if ghost:
        s += f'<image href="{ghost}" x="516" y="270" width="48" height="56" preserveAspectRatio="xMidYMid slice" opacity="0.42"/>'
    else:
        s += '<rect x="516" y="270" width="48" height="56" fill="#eef1f8" opacity="0.55"/>'
    s += txt(540, 334, dob.replace(' ', '.'), 5.5, 'Geist500', LAB, 'middle')
    s += specimen(395, 205, 50, -32)
    l1, l2 = mrz(num, dob[-2:] + dob[3:5] + dob[:2], sex, exp[-2:] + exp[3:5] + exp[:2])
    s += (f'<text x="28" y="360" font-family="Menlo" font-size="15.2" fill="{INK}" textLength="578" lengthAdjust="spacing">{esc(l1)}</text>')
    s += (f'<text x="28" y="396" font-family="Menlo" font-size="15.2" fill="{INK}" textLength="578" lengthAdjust="spacing">{esc(l2)}</text>')
    return s


def with_alpha_of(im, orig_path):
    o = Image.open(orig_path).convert('RGBA')
    im = im.copy()
    im.putalpha(o.getchannel('A'))
    return im


def gray_portrait(maxw=600):
    # round 3: no AI portrait; reuse the site's own original ID portrait (passport-portrait, kept unmodified
    # on the page) flattened on the photo-booth grey, so the mock and the page show the same person.
    src = Image.open(M + 'passport-portrait.BiAHC5QK.webp').convert('RGBA')
    bg = Image.new('RGBA', src.size, (232, 232, 232, 255)); bg.alpha_composite(src)
    im = bg.convert('L')
    im = Image.merge('RGB', [im, im, im])
    p = MOCKS + 'out/portrait_gray.jpg'
    im.save(p, quality=92)
    return img_href(p, maxw)


def details():
    body = bg_defs() + datapage(names=None, photo=None, ghost=None)
    im = svg(body, 638, 410, scale=2).resize((638, 410), Image.LANCZOS)
    return with_alpha_of(im, M + 'passport-details.Cg_aTy4k.png')


def opened():
    ph = gray_portrait()
    W, H = 629, 864
    s = bg_defs()
    s += '<rect width="629" height="864" fill="#05050a"/>'
    # observations page
    s += '<clipPath id="c1"><rect x="1" y="1" width="627" height="428" rx="14"/></clipPath>'
    s += '<g clip-path="url(#c1)">'
    s += '<rect width="629" height="430" fill="#cfe0f3"/>'
    s += waves(0, 60, 629, 420, 60, 3, 110, '#b2c7e6', 0.5)
    s += rose(420, 190, 150, '#8fa7d6', 0.6, k=11, n=6, op=0.6)
    s += rose(150, 120, 90, '#9fb4dc', 0.5, k=7, n=4, op=0.5)
    s += txt(314, 16, 'Mentions spéciales / Endorsements', 8.2, 'Geist500', LAB, 'middle', 'font-style="italic"')
    s += txt(314, 44, 'Si votre passeport expire dans moins de six mois, l’entrée dans certains pays peut vous être refusée.', 7.4, 'Geist400', LAB, 'middle')
    s += f'<rect x="16" y="150" width="178" height="232" fill="#e9eef6" opacity="0.6"/>'
    s += f'<image href="{ph}" x="22" y="158" width="168" height="220" preserveAspectRatio="xMidYMid slice"/>'
    s += specimen(395, 190, 62, -32)
    s += perfs(572, 110, 360, '#48506a')
    s += f'<rect x="90" y="383" width="455" height="0.9" fill="#5b6484"/>'
    s += txt(318, 398, 'SIGNATURE DU TITULAIRE / SIGNATURE OF BEARER', 9.2, 'Geist600', BLUE, 'middle')
    s += '</g>'
    # fold
    s += '<rect x="0" y="429" width="629" height="8" fill="#aebdd0"/><rect x="0" y="432" width="629" height="2" fill="#8193ab"/>'
    # data page
    s += '<clipPath id="c2"><rect x="1" y="437" width="627" height="426" rx="14"/></clipPath><g clip-path="url(#c2)">'
    s += '<rect x="0" y="437" width="629" height="427" fill="#dfe5f3"/>'
    s += f'<g transform="translate(0 437) scale({629 / 638})">'
    s += datapage(names=('MARTIN', 'CAMILLE'), photo=ph, ghost=ph, dob='05 02 1991', sex='F', place='LYON (69)')
    s += '</g>'
    s += txt(314, 853, 'ACCESSOIRE DE DÉMONSTRATION — NON VALABLE POUR VOYAGER', 7.6, 'Geist500', LAB, 'middle')
    s += '</g>'
    im = svg(s, W, H, scale=2).resize((W, H), Image.LANCZOS)
    return im


if __name__ == '__main__':
    d = details()
    write('passport-details', d)
    write('passport-both', d)
    write('passport-card', d, only=['B57SdCQ-', 'Bnk0M-3d', 'CzsuXPbE'])
    write('passport-open', opened())
