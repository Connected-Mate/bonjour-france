"""Chat-UI mocks: roadmap-desktop, roadmap-phone, screen, sources-panel.
Strategy: keep the original's device frame / window chrome / shadows / alpha, repaint the content area,
then draw French fictional content in SVG (Geist, never Inter)."""
import math
import numpy as np
from PIL import ImageFont, ImageDraw
from lib import *
import maps

M = '/Users/0104389S/Projects/hello-france/_mirror/_astro/'
PH = MOCKS + 'photos/'
FONTFILES = {f'Geist{w}': f'{FONTDIR}/Geist{w}.ttf' for w in (400, 500, 600, 700)}
FONTFILES['Newsreader500'] = f'{FONTDIR}/Newsreader500.ttf'


def tw(t, fam, size):
    return ImageFont.truetype(FONTFILES[fam], int(round(size * 10))).getlength(t) / 10.0


def wrap(t, fam, size, maxw):
    lines, cur = [], ''
    for w in t.split(' '):
        nxt = (cur + ' ' + w).strip()
        if tw(nxt, fam, size) <= maxw:
            cur = nxt
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    return lines


def ellip(t, fam, size, maxw):
    if tw(t, fam, size) <= maxw:
        return t
    while t and tw(t + '…', fam, size) > maxw:
        t = t[:-1]
    return t.rstrip(' ,') + '…'


def T(x, y, t, size, fam='Geist400', fill='#1b1b1f', anchor='start', extra=''):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-family="{fam}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" {extra}>{esc(t)}</text>'


def shadow_defs(id_, dy, blur, op):
    return (f'<filter id="{id_}" x="-20%" y="-20%" width="140%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/>'
            f'<feOffset dy="{dy}"/><feComponentTransfer><feFuncA type="linear" slope="{op}"/></feComponentTransfer>'
            '<feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>')


def mic(cx, cy, s, color):
    return (f'<g transform="translate({cx} {cy}) scale({s})" fill="none" stroke="{color}" stroke-width="2.2" stroke-linecap="round">'
            '<rect x="-4.5" y="-12" width="9" height="15" rx="4.5" fill="none"/><path d="M-8.5 -1 a8.5 8.5 0 0 0 17 0"/>'
            '<path d="M0 7.5 v5"/><path d="M-4.5 12.5 h9"/></g>')


def arrow(cx, cy, s, color):
    return (f'<g transform="translate({cx} {cy}) scale({s})" fill="none" stroke="{color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'
            '<path d="M-8 0 H8 M2 -6 L8 0 L2 6"/></g>')


def icon_home(cx, cy, s):
    return (f'<g transform="translate({cx} {cy}) scale({s})" fill="none" stroke="#111" stroke-width="2.2" stroke-linejoin="round">'
            '<path d="M-8 -1 L0 -8 L8 -1 V8 H-8 Z"/><path d="M-2.5 8 V3 H2.5 V8"/></g>')


def icon_building(cx, cy, s):
    g = f'<g transform="translate({cx} {cy}) scale({s})" fill="#111">'
    g += '<path d="M-9 -10 H3 V10 H-9 Z M3 -3 H9 V10 H3 Z" fill="none" stroke="#111" stroke-width="2.2"/>'
    for yy in (-6, -1, 4):
        for xx in (-6, -1):
            g += f'<rect x="{xx}" y="{yy}" width="2.6" height="2.6"/>'
    return g + '</g>'


def icon_tree(cx, cy, s):
    return (f'<g transform="translate({cx} {cy}) scale({s})" fill="#111">'
            '<path d="M0 -11 L7 -1 H3 L8 6 H-8 L-3 -1 H-7 Z"/><rect x="-1.3" y="6" width="2.6" height="5"/></g>')


def expand(cx, cy, s):
    return (f'<g transform="translate({cx} {cy}) scale({s})" fill="#111">'
            '<path d="M1.5 -9 H9 V-1.5 Z"/><path d="M-1.5 9 H-9 V1.5 Z"/>'
            '<path d="M8 -8 L2.5 -2.5 M-8 8 L-2.5 2.5" stroke="#111" stroke-width="2.4"/></g>')


def rounded_thumb(path, x, y, w, h, r, cid, focus=0.5):
    im = Image.open(path).convert('RGB')
    s = max(w * 3 / im.width, h * 3 / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    ox = int((im.width - w * 3) * focus)
    oy = int((im.height - h * 3) / 2)
    im = im.crop((ox, oy, ox + w * 3, oy + h * 3))
    return (f'<clipPath id="{cid}"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}"/></clipPath>'
            f'<image href="{png_href(im)}" x="{x}" y="{y}" width="{w}" height="{h}" clip-path="url(#{cid})" preserveAspectRatio="none"/>')


# ------------------------------------------------------------------ roadmap-desktop 2176x1838
def roadmap_desktop():
    o = Image.open(M + 'roadmap-desktop.Dbr56P5U.webp').convert('RGBA')
    W, H = o.size
    base = o.copy()
    ImageDraw.Draw(base).rectangle([2, 91, W - 3, 1829], fill=(255, 255, 255, 255))
    s = '<defs>' + shadow_defs('sh', 6, 14, 0.10) + shadow_defs('pin', 4, 8, 0.18) + shadow_defs('bar', 10, 22, 0.08) + '</defs>'
    s += T(97, 203, 'Bonjour, France', 54, 'Newsreader500', '#111')
    q = 'Aidez-moi à trouver un logement abordable près de chez moi.'
    qw = tw(q, 'Geist400', 32)
    s += f'<rect x="{1740 - qw - 76:.0f}" y="296" width="{qw + 76:.0f}" height="111" rx="55.5" fill="#f1f2f6"/>'
    s += T(1740 - 38, 363, q, 32, 'Geist400', '#16181d', 'end')
    para = ('Voici des logements abordables près de chez vous. Loyers, disponibilités et conditions peuvent '
            'changer : contactez chaque résidence pour vérifier.')
    lines = wrap(para, 'Geist400', 32, 1215)
    assert len(lines) <= 2, lines
    for i, line in enumerate(lines):
        s += T(430, 507 + i * 48, line, 32, 'Geist400', '#16181d')
    # map panel
    px, py, pw, ph = 422, 632, 1318, 880
    mp = maps.map_panel(pw, ph)
    s += f'<clipPath id="mp"><rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="58"/></clipPath>'
    s += f'<image href="{png_href(mp)}" x="{px}" y="{py}" width="{pw}" height="{ph}" clip-path="url(#mp)"/>'
    # pins
    pins = [(1178, 966, icon_home), (1306, 1050, icon_building), (1404, 1203, icon_home), (1214, 1237, icon_tree), (1618, 1257, icon_building)]
    for x, y, f in pins:
        s += f'<g filter="url(#pin)"><circle cx="{x}" cy="{y}" r="35" fill="#fff"/></g>' + f(x, y, 1.25)
    s += f'<g filter="url(#pin)"><circle cx="1673" cy="699" r="43" fill="#fff"/></g>' + expand(1673, 699, 1.3)
    # list card
    s += f'<g filter="url(#sh)"><rect x="445" y="656" width="480" height="832" rx="34" fill="#fff"/></g>'
    s += '<clipPath id="lc"><rect x="445" y="656" width="480" height="832" rx="34"/></clipPath><g clip-path="url(#lc)">'
    rows = [('house1', 'Résidence des Tilleuls, logements collectifs', '12 rue des Tilleuls,', '44000 Nantes'),
            ('house2', 'Les Jardins de l’Erdre, maison de ville', '8 allée des Chênes,', '44300 Nantes'),
            ('house3', 'Clos des Coteaux, maisons groupées', '25 rue du Coteau,', '44230 Saint-Sébastien'),
            ('house4', 'Quai des Mariniers, résidence mixte', '3 quai de la Loire,', '44200 Nantes'),
            ('house5', 'Résidence du Parc, appartements', '5 rue du Parc,', '44100 Nantes')]
    for i, (ph_, t1, a1, a2) in enumerate(rows):
        y = 656 + i * 184
        op = 1 if i < 4 else 0.35
        s += f'<g opacity="{op}">'
        s += rounded_thumb(PH + ph_ + '.png', 477, y + 32, 120, 120, 18, f'th{i}')
        s += T(621, y + 64, ellip(t1, 'Geist600', 24.5, 282), 24.5, 'Geist600', '#111')
        s += T(621, y + 102, a1, 24.5, 'Geist400', '#5b5f68')
        s += T(621, y + 138, a2, 24.5, 'Geist400', '#5b5f68')
        s += '</g>'
        if i < 4:
            s += f'<rect x="445" y="{y + 183}" width="480" height="1.6" fill="#e6e7ea"/>'
    s += '<defs><linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="0.9"/></linearGradient></defs>'
    s += '<rect x="445" y="1400" width="480" height="90" fill="url(#fade)"/>'
    s += '</g>'
    # input bar
    s += f'<g filter="url(#bar)"><rect x="398" y="1608" width="1367" height="160" rx="80" fill="#fff" stroke="#e4e5e9" stroke-width="2"/></g>'
    s += T(462, 1700, 'Posez votre question…', 34, 'Geist400', '#8b8e96')
    s += mic(1597, 1687, 1.65, '#111')
    s += f'<circle cx="1685" cy="1688" r="36" fill="#e7e9ef"/>' + arrow(1685, 1688, 1.6, '#a3a7b0')
    art = svg(s, W, H, scale=1)
    base.alpha_composite(art)
    base.putalpha(o.getchannel('A'))
    return base


# ------------------------------------------------------------------ roadmap-phone 800x1646
def roadmap_phone():
    o = Image.open(M + 'roadmap-phone.C8AMS-e-_GsYgK.webp').convert('RGBA')
    W, H = o.size
    base = o.copy()
    # repaint the form card area (keep phone frame, island, card outline + shadow): white-out inner text zones
    d = ImageDraw.Draw(base)
    d.rectangle([60, 170, 740, 262], fill=(255, 255, 255, 255))          # title
    d.rounded_rectangle([88, 283, 713, 1185], radius=30, fill=(255, 255, 255, 255))
    d.rounded_rectangle([88, 1228, 714, 1314], radius=43, fill=(255, 255, 255, 255))
    d.rounded_rectangle([64, 1420, 738, 1545], radius=62, fill=(255, 255, 255, 255))
    s = '<defs>' + shadow_defs('bar', 8, 16, 0.07) + '</defs>'
    s += T(96, 229, 'Vérifiez vos informations', 29.5, 'Geist600', '#0f1426')
    s += '<rect x="86" y="281" width="629" height="906" rx="30" fill="#fff" stroke="#e6e7ea" stroke-width="2"/>'
    rows = [('Nom complet', 'Camille Martin'), ('Date de naissance', '11 juin 1962'), ('Nationalité', 'Française'),
            ('Carrière', '41 ans, 164 trimestres validés'), ('Service militaire', 'Aucun'), ('Couverture santé actuelle', 'Mutuelle d’entreprise')]
    for i, (k, v) in enumerate(rows):
        y = 356 + i * 146
        s += T(128, y, k, 29, 'Geist400', '#6b6f78')
        s += T(128, y + 48, ellip(v, 'Geist400', 30.5, 560), 30.5, 'Geist400', '#101218')
        if i < 5:
            s += f'<rect x="126" y="{y + 84}" width="549" height="1.6" fill="#e3e4e8"/>'
    s += '<rect x="87" y="1228" width="627" height="87" rx="43.5" fill="#082a63"/>'
    s += T(400, 1283, 'Continuer', 30, 'Geist500', '#fff', 'middle')
    s += '<g filter="url(#bar)"><rect x="62" y="1418" width="678" height="130" rx="65" fill="#fff" stroke="#e5e6ea" stroke-width="2"/></g>'
    s += T(110, 1495, 'Posez votre question…', 31, 'Geist400', '#6f727a')
    s += mic(595, 1482, 1.5, '#111')
    s += '<circle cx="675" cy="1482" r="36" fill="#e7e9ef"/>' + arrow(675, 1482, 1.5, '#a3a7b0')
    art = svg(s, W, H, scale=1)
    base.alpha_composite(art)
    base.putalpha(o.getchannel('A'))
    return base


# ------------------------------------------------------------------ screen 900x1957 (phone chat)
def screen():
    o = Image.open(M + 'screen.DHS7yndT.webp').convert('RGBA')
    W, H = o.size
    base = o.copy()
    d = ImageDraw.Draw(base)
    d.rectangle([40, 180, 870, 420], fill=(255, 255, 255, 255))          # first paragraph
    d.rectangle([280, 520, 700, 590], fill=(255, 255, 255, 255))         # card title
    d.rectangle([40, 1470, 870, 1640], fill=(255, 255, 255, 255))        # second paragraph (above bar)
    for i in range(5):                                                   # field contents
        y = 646 + i * 152
        d.rounded_rectangle([96, y + 6, 804, y + 118], radius=26, fill=(255, 255, 255, 255))
    d.rectangle([180, 1690, 740, 1760], fill=(242, 242, 244, 255))       # URL text only
    s = ''
    para = 'D’accord. Renseignez les informations de votre passeport ci-dessous : je vérifie si vous pouvez le renouveler en ligne.'
    for i, line in enumerate(wrap(para, 'Geist400', 34, 765)):
        s += T(72, 273 + i * 54, line, 34, 'Geist400', '#15171c')
    s += T(450, 564, 'Informations du passeport', 33, 'Geist600', '#0f1426', 'middle')
    fields = [('Nom', 'Camille Martin'), ('Date de naissance', '25 / 03 / 1990'), ('Numéro de passeport', '123456789'),
              ('Date de délivrance', '12 / 09 / 2020'), ('Date d’expiration', '12 / 09 / 2030')]
    for i, (k, v) in enumerate(fields):
        y = 646 + i * 152
        s += T(126, y + 47, k, 26, 'Geist500', '#5d616b')
        s += T(126, y + 92, v, 35, 'Geist400', '#15171c')
    para2 = 'Bonne nouvelle ! Vous pouvez renouveler votre passeport en ligne. Cela prend moins de 10 minutes.'
    for i, line in enumerate(wrap(para2, 'Geist400', 34, 765)):
        s += T(72, 1527 + i * 54, line, 34, 'Geist400', '#15171c')
    s += T(450, 1737, 'bonjour-france', 34, 'Geist400', '#15171c', 'middle')
    art = svg(s, W, H, scale=1)
    # keep bottom browser bar crisp: paragraph 2 must not paint under the bar (bar starts ~1640)
    base.alpha_composite(art)
    return base


# ------------------------------------------------------------------ sources-panel 1028x623
def sources_panel():
    o = Image.open(M + 'sources-panel.DEGQu1Ln.webp').convert('RGBA')
    W, H = o.size
    base = o.copy()
    # erase content by stretching a blank row of the card (keeps the card's subtle horizontal gradient)
    a = np.array(base).copy()
    reg = a[102:472, 100:830]
    ink = Image.fromarray(((reg[..., :3].min(-1) < 251) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))
    m = np.array(ink) > 0
    reg[m, :3] = 255
    a[102:472, 100:830] = reg
    base = Image.fromarray(a)
    s = T(514, 142, 'Sources', 29, 'Geist600', '#0f1426', 'middle')
    # neutral source badge (no seal): document glyph in a soft circle
    s += '<circle cx="195" cy="247" r="46" fill="#eef2fb" stroke="#d5ddef" stroke-width="2"/>'
    s += ('<g transform="translate(195 247)" fill="none" stroke="#27407e" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">'
          '<path d="M-14 -20 H6 L15 -11 V20 H-14 Z"/><path d="M6 -20 V-11 H15"/><path d="M-7 -2 H8 M-7 6 H8 M-7 13 H3"/></g>')
    s += T(278, 235, 'Service des passeports', 31, 'Geist400', '#15171c')
    s += T(278, 283, '2 sources', 29, 'Geist400', '#6b6f78')
    for y, t in ((352, 'Renouveler un passeport (adulte)'), (432, 'Passeport : les démarches')):
        s += T(154, y, t, 29.5, 'Geist400', '#1265c8')
        wdt = tw(t, 'Geist400', 29.5)
        s += f'<line x1="154" y1="{y + 14}" x2="{154 + wdt:.0f}" y2="{y + 14}" stroke="#1265c8" stroke-width="2" stroke-dasharray="2 3"/>'
    s += ('<path d="M848 250 L862 236 L876 250" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')
    art = svg(s, W, H, scale=1)
    base.alpha_composite(art)
    base.putalpha(o.getchannel('A'))
    return base


if __name__ == '__main__':
    import sys
    which = sys.argv[1:] or ['desktop', 'phone', 'screen', 'sources']
    if 'desktop' in which:
        write('roadmap-desktop', roadmap_desktop())
    if 'phone' in which:
        write('roadmap-phone', roadmap_phone())
    if 'screen' in which:
        sc = screen()
        write('screen', sc)
        write('images/home/roadmap/screen', sc)
    if 'sources' in which:
        write('sources-panel', sources_panel())
