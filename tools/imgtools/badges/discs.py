"""Round-4 seal slots: sober French white discs carrying each body's REAL logo (unaltered), or a
text-only disc (name set in Geist, navy) for bodies whose mark is the République française
bloc-marque / State visual identity (never reproduced).

Writes every seal-slot override (exact pixel size, format, alpha; SVG slots stay SVG with the
original viewBox), rewrites mapping.json, logo credits (LOGO-CREDITS.md + tools/i18n/logo-credits.json).
usage: python3 tools/imgtools/badges/discs.py [--only slotkey,...]
Sources: tools/imgtools/badges/logos/*.{svg,png,jpg} + logos/{social,institutions,regions,cities}.json
"""
import sys, os, re, io, json, base64, math, functools
import numpy as np
from PIL import Image, PngImagePlugin
import resvg_py
PngImagePlugin.MAX_TEXT_CHUNK = 64 * 1024 * 1024
Image.MAX_IMAGE_PIXELS = None
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

HERE = os.path.dirname(os.path.abspath(__file__)) + '/'
ROOT = '/Users/0104389S/Projects/hello-france/'
sys.path.insert(0, ROOT + 'tools/imgtools')
import place as P

NAVY = '#002664'          # site token --color-blue-700 (Menu button)
EDGE = '#000c1f'          # --color-blue-900, used at very low opacity for the disc hairline
FONT = ROOT + 'tools/imgtools/fonts/Geist600.ttf'

# ---------------------------------------------------------------- bodies
# logo bodies: key -> display name (file + credits come from logos/*.json)
LOGO = {
 'laposte': 'La Poste', 'sncf': 'SNCF', 'urssaf': 'Urssaf', 'caf': 'Caisse d’allocations familiales',
 'ameli': 'L’Assurance Maladie', 'msa': 'MSA', 'francetravail': 'France Travail',
 'retraite': 'L’Assurance retraite', 'crous': 'Crous', 'franceconnect': 'FranceConnect',
 'anil': 'ANIL', 'spf': 'Santé publique France', 'meteo': 'Météo-France', 'ign': 'IGN', 'insee': 'Insee',
 'bdf': 'Banque de France', 'cnil': 'CNIL', 'ademe': 'ADEME', 'onf': 'Office national des forêts',
 'defenseur': 'Défenseur des droits', 'bnf': 'BnF', 'cnes': 'CNES', 'senat': 'Sénat',
 'assemblee': 'Assemblée nationale', 'amf': 'AMF', 'acpr': 'ACPR', 'afd': 'AFD',
 'conseilconst': 'Conseil constitutionnel', 'archives': 'Archives nationales', 'asnr': 'ASNR',
 'anses': 'Anses',
 # regions
 'bretagne': 'Région Bretagne', 'occitanie': 'Région Occitanie', 'nouvelleaquitaine': 'Région Nouvelle-Aquitaine',
 'hdf': 'Région Hauts-de-France', 'grandest': 'Région Grand Est', 'aura': 'Région Auvergne-Rhône-Alpes',
 'paca': 'Région Sud (Provence-Alpes-Côte d’Azur)', 'normandie': 'Région Normandie', 'corse': 'Collectivité de Corse',
 'idf': 'Région Île-de-France', 'pdl': 'Région Pays de la Loire', 'cvl': 'Région Centre-Val de Loire',
 'bfc': 'Région Bourgogne-Franche-Comté',
 # cities
 'paris': 'Ville de Paris', 'lyon': 'Ville de Lyon', 'toulouse': 'Toulouse (Mairie & Métropole)', 'lille': 'Ville de Lille',
 'nantes': 'Nantes (Ville & Métropole)', 'bordeaux': 'Ville de Bordeaux', 'strasbourg': 'Strasbourg (Ville & Eurométropole)',
 'nice': 'Ville de Nice', 'montpellier': 'Ville de Montpellier', 'rennes': 'Ville de Rennes',
}
# text-only bodies (State identity / bloc-marque): key -> (display name, lines, short label for tiny sizes, reason)
TEXT = {
 'franceconnect': ('FranceConnect', ['France', 'Connect'], 'FranceConnect', 'État — logo avec profil de Marianne'),
 'dgfip':         ('Finances publiques (DGFiP)', ['Finances', 'publiques'], 'DGFiP', 'État — bloc-marque'),
 'francetitres':  ('France Titres (ANTS)', ['France', 'Titres'], 'ANTS', 'État — bloc-marque'),
 'douane':        ('La Douane', ['La', 'Douane'], 'Douane', 'État — bloc-marque'),
 'paf':           ('Police aux frontières', ['Police aux', 'frontières'], 'PAF', 'État — bloc-marque'),
 'police':        ('Police nationale', ['Police', 'nationale'], 'Police', 'État — identité ministérielle'),
 'justice':       ('Ministère de la Justice', ['Ministère', 'de la', 'Justice'], 'Justice', 'État — bloc-marque'),
 'armees':        ('Ministère des Armées', ['Ministère', 'des Armées'], 'Armées', 'État — bloc-marque'),
 'marine':        ('Marine nationale', ['Marine', 'nationale'], 'Marine', 'État — armées'),
 'interieur':     ('Ministère de l’Intérieur', ['Ministère', 'de l’Intérieur'], 'Intérieur', 'État — bloc-marque'),
 'servicepublic': ('Service-Public.fr', ['Service-', 'Public.fr'], 'SP.fr', 'État — bloc-marque'),
 'legifrance':    ('Légifrance', ['Légifrance'], 'Légifrance', 'État — bloc-marque'),
 'diplomatie':    ('France Diplomatie', ['France', 'Diplomatie'], 'MEAE', 'État — bloc-marque'),
 'securitecivile':('Sécurité civile', ['Sécurité', 'civile'], 'Sécurité', 'État — identité ministérielle'),
 'pharos':        ('Pharos', ['Pharos'], 'Pharos', 'État — ministère de l’Intérieur'),
 'onacvg':        ('Office national des combattants et des victimes de guerre', ['ONaCVG'], 'ONaCVG', 'État — bloc-marque'),
 'travail':       ('Inspection du travail', ['Inspection', 'du travail'], 'Travail', 'État — bloc-marque'),
 'ars':           ('Agence régionale de santé', ['Agence', 'régionale', 'de santé'], 'ARS', 'État — bloc-marque'),
 'cada':          ('Commission d’accès aux documents administratifs', ['CADA'], 'CADA', 'État — bloc-marque'),
 'dgac':          ('Direction générale de l’Aviation civile', ['Aviation', 'civile'], 'DGAC', 'État — bloc-marque'),
 'dge':           ('Direction générale des Entreprises', ['Direction', 'générale des', 'Entreprises'], 'DGE', 'État — bloc-marque'),
 'dae':           ('Direction des achats de l’État', ['Achats', 'de l’État'], 'DAE', 'État — bloc-marque'),
 'conseiletat':   ('Conseil d’État', ['Conseil', 'd’État'], 'CE', 'État — bloc-marque'),
 'fonctionpub':   ('Fonction publique', ['Fonction', 'publique'], 'DGAFP', 'État — bloc-marque'),
 'viepublique':   ('Vie-publique.fr', ['Vie', 'publique'], 'Vie-pub', 'État — bloc-marque'),
 'mdph':          ('Maison départementale des personnes handicapées', ['MDPH'], 'MDPH', 'service départemental (sans marque nationale unique)'),
 'enfance':       ('Allô Enfance en danger (119)', ['Allô', 'Enfance', 'en danger'], '119', 'État — GIP Enfance en danger'),
 'georisques':    ('Géorisques', ['Géorisques'], 'Risques', 'État — bloc-marque'),
 'asp':           ('Agence de services et de paiement', ['Agence', 'de services', 'et de paiement'], 'ASP', 'État — bloc-marque'),
 'parcs':         ('Parcs nationaux de France', ['Parcs', 'nationaux', 'de France'], 'Parcs', 'logo officiel = composite avec le bloc-marque'),
 'inpi':          ('INPI', ['INPI'], 'INPI', 'logo officiel = composite avec le bloc-marque'),
 'brgm':          ('BRGM', ['BRGM'], 'BRGM', 'logo officiel = composite avec le bloc-marque'),
 'art':           ('Autorité de régulation des transports', ['Autorité de', 'régulation des', 'transports'], 'ART', 'logo officiel = composite avec le bloc-marque'),
 'rf':            ('République française', ['République', 'française'], 'RF', 'État — jamais de Marianne ni de tricolore'),
}

# slot (inventory base name) -> body. Zones: a = home grid (9 SVGs), b = manifesto stack (source-icon cycle),
# c = roadmap name-change rows (fixed order: retraite, France Titres, Douane, PARAFE/PAF).
SLOTS = {
 # zone a + b (agency-seals SVGs, all real logos)
 'seal-treasury': 'bdf', 'seal-veterans-affairs': 'ameli', 'seal-commerce': 'urssaf', 'seal-interior': 'onf',
 'social-security-older': 'caf', 'labor': 'francetravail', 'seal-patent-and-trademark-office': 'meteo',
 'transportation': 'sncf', 'seal-energy': 'crous', 'seal-state': 'laposte',
 # zone c
 'government-social-security-seal': 'retraite', 'state.gov': 'francetitres', 'cbp': 'douane', 'seal-tsa': 'paf',
 # everything else
 'cbp.gov': 'douane', 'fallback-cbp.gov': 'douane', 'seal-customs-and-border-protection': 'douane',
 'congress': 'senat', 'fallback-congress.gov': 'assemblee', 'house': 'assemblee', 'fallback-house.gov': 'assemblee',
 'fallback-senate.gov': 'senat', 'dea': 'spf', 'employment-navy': 'marine', 'navy': 'marine', 'energy': 'ademe',
 'faa': 'dgac', 'fallback-ada.gov': 'defenseur', 'fallback-archives.gov': 'archives',
 'fallback-census.gov': 'insee', 'fallback-data.census.gov': 'insee', 'fallback-childcare.gov': 'caf',
 'fallback-childwelfare.gov': 'enfance', 'fallback-copyright.gov': 'inpi', 'fallback-disasterassistance.gov': 'securitecivile',
 'fallback-eac.gov': 'interieur', 'fallback-fec.gov': 'conseilconst', 'fallback-federalregister.gov': 'legifrance',
 'fallback-floodsmart.gov': 'georisques', 'fallback-foia.gov': 'cada', 'fallback-fvap.gov': 'diplomatie',
 'fallback-grants.gov': 'asp', 'fallback-gsa.gov': 'dae', 'fallback-healthcare.gov': 'ameli', 'fallback-hrsa.gov': 'ars',
 'fallback-ic3.gov': 'pharos', 'fallback-identitytheft.gov': 'cnil', 'fallback-ihs.gov': 'spf',
 'fallback-insurekidsnow.gov': 'ameli', 'fallback-investor.gov': 'amf', 'fallback-login.gov': 'franceconnect',
 'fallback-medicaid.gov': 'ameli', 'fallback-medicare.gov': 'retraite', 'fallback-milconnect.dmdc.osd.mil': 'armees',
 'fallback-ncua.gov': 'bdf', 'fallback-occ.gov': 'acpr', 'fallback-opm.gov': 'fonctionpub', 'fallback-pbgc.gov': 'retraite',
 'fallback-recreation.gov': 'onf', 'fallback-sam.gov': 'dae', 'fallback-sec.gov': 'amf', 'fallback-studentaid.gov': 'crous',
 'fallback-tsa.gov': 'paf', 'fallback-usa.gov': 'servicepublic', 'fallback-usajobs.gov': 'francetravail',
 'fallback-uscourts.gov': 'justice', 'fallback-uspto.gov': 'inpi', 'fallback-vote.gov': 'interieur',
 'fallback-weather.gov': 'meteo', 'fallback-whitehouse.gov': 'viepublique', 'fbi': 'police', 'forest-service': 'onf',
 'government-veterans-affairs-seal': 'onacvg', 'great-seal': 'rf', 'gsa-gold-seal': 'dae', 'gsa': 'franceconnect',
 'hud': 'anil', 'library-of-congress': 'bnf', 'medicare-seal': 'ameli', 'name-change-irs': 'dgfip',
 'name-change-ssa': 'retraite', 'name-change-state': 'francetitres', 'nasa': 'cnes', 'patent-and-trademark': 'inpi',
 'seal-administrative-conference-of-the-united-states': 'conseiletat', 'seal-development-finance-corporation': 'afd',
 'seal-federal-mine-safety-and-health-review-commission': 'travail', 'seal-geographic-names-board': 'ign',
 'seal-industry-and-security-bureau': 'dge', 'seal-inter-american-foundation': 'afd',
 'seal-legal-services-corporation': 'defenseur', 'seal-national-credit-union-administration': 'bdf',
 'seal-nuclear-regulatory-commission': 'asnr', 'seal-occupational-safety-and-health-review-commission': 'anses',
 'seal-surface-mining-reclamation-and-enforcement-office': 'brgm', 'seal-united-states-courts': 'justice',
 'ssa.gov': 'retraite', 'surface-transportation-board': 'art', 'treasury': 'dgfip', 'us-marshals': 'justice',
 'veterans-crisis-line-seal': 'onacvg',
 # real French regions & cities replacing the invented local seals (wide slots get wide city logos)
 'seal-local-arizona': 'occitanie', 'seal-local-colorado': 'aura', 'seal-local-florida': 'paca',
 'seal-local-maryland': 'normandie', 'seal-local-minnesota': 'grandest', 'seal-local-nebraska': 'cvl',
 'seal-local-north-dakota': 'hdf', 'seal-local-ohio': 'bfc', 'seal-local-oregon': 'bretagne',
 'seal-local-texas': 'nouvelleaquitaine', 'seal-local-washington': 'idf', 'seal-local-columbia-county-oregon': 'pdl',
 'seal-local-boulder-county': 'corse', 'seal-local-boston': 'rennes', 'seal-local-maricopa-county': 'lille',
 'seal-local-arapahoe-county': 'nantes', 'seal-local-ashland-oregon': 'toulouse', 'seal-local-brookline-massachusetts': 'paris',
 'seal-local-cuyahoga-county': 'bordeaux', 'seal-local-henderson-county-north-carolina': 'montpellier',
 'seal-local-redmond-washington': 'strasbourg', 'seal-local-rialto-california': 'nice',
}
# round seal SVGs present only in tools/overrides (no mirror original): manifesto stack cycle (nasa/noaa/usda)
EXTRA_SVG = {'images/agency-seals/seal-nasa.svg': 'cnes', 'images/agency-seals/seal-noaa.svg': 'meteo',
             'images/agency-seals/seal-agriculture.svg': 'msa'}
TINY_KEYS = {'state.gov', 'seal-tsa', 'cbp'}  # zone c rows: shown ~30 CSS px -> short label
CHIPS = {'name-change-irs', 'name-change-ssa', 'name-change-state', 'veterans-crisis-line-seal', 'employment-navy'}
THUMB_KEYS = {'congress', 'energy', 'fbi', 'hud', 'cbp', 'gsa', 'nasa'}  # their 1.44:1 variants are orbit site cards
ORBIT = lambda w, h: 1.40 <= w / h <= 1.48 and w in (32, 64, 128, 256, 384, 480)


# ---------------------------------------------------------------- credits / logo sources
@functools.lru_cache(None)
def credits():
    out = {}
    for g in ('social', 'institutions', 'regions', 'cities'):
        for e in json.load(open(HERE + f'logos/{g}.json', encoding='utf-8')):
            out[e['body']] = e
    return out


def render_svg(text, width):
    return Image.open(io.BytesIO(bytes(resvg_py.svg_to_bytes(svg_string=text, width=int(width))))).convert('RGBA')


def _num(v):
    m = re.match(r'\s*([-\d.eE+]+)', v or '')
    return float(m.group(1)) if m else None


def _bbox(im, white_is_bg):
    a = np.asarray(im)
    mask = a[..., 3] > 6
    if white_is_bg:
        mask &= ~((a[..., :3].min(-1) > 244))
    ys, xs = np.where(mask)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


@functools.lru_cache(None)
def logo(bid):
    """-> (href data URI for SVG embedding, aspect w/h, trimmed RGBA master for rasters).
    Only whitespace around the mark is trimmed; the mark itself is never cropped or recoloured."""
    path = HERE + credits()[bid]['file']
    if path.endswith('.svg'):
        t = open(path, encoding='utf-8').read()
        t = t[t.find('<svg'):]
        t = re.sub(r'&(ns_\w+);', r'http://ns.adobe.com/\1', t)  # Illustrator DOCTYPE entities (DOCTYPE dropped)
        t = re.sub(r'<i:pgf\b.*?</i:pgf>|<i:aipgf\b.*?</i:aipgf>|<foreignObject\b.*?</foreignObject>|<metadata\b.*?</metadata>', '', t, flags=re.S)  # editor private data only
        m = re.search(r'<svg\b[^>]*>', t)
        tag = m.group(0)
        vb = re.search(r'viewBox="([^"]+)"', tag)
        if vb:
            vx, vy, vw, vh = [float(x) for x in re.split(r'[ ,]+', vb.group(1).strip())]
        else:
            vx, vy, vw, vh = 0, 0, _num(re.search(r'\bwidth="([^"]+)"', tag).group(1)), _num(re.search(r'\bheight="([^"]+)"', tag).group(1))
        base = re.sub(r'\s(width|height|viewBox|preserveAspectRatio)="[^"]*"', '', tag)
        if 'xmlns="' not in base:
            base = base.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"', 1)
        full = t[:m.start()] + base[:-1].rstrip('/') + f' viewBox="{vx:g} {vy:g} {vw:g} {vh:g}" width="{vw:g}" height="{vh:g}">' + t[m.end():]
        W = 2400
        im = render_svg(full, W)
        s = W / vw
        x0, y0, x1, y1 = _bbox(im, False)
        pad = 1
        x0, y0, x1, y1 = max(0, x0 - pad), max(0, y0 - pad), min(im.width, x1 + pad), min(im.height, y1 + pad)
        nvb = (vx + x0 / s, vy + y0 / s, (x1 - x0) / s, (y1 - y0) / s)
        svg = t[:m.start()] + base[:-1].rstrip('/') + (f' viewBox="{nvb[0]:.4f} {nvb[1]:.4f} {nvb[2]:.4f} {nvb[3]:.4f}"'
                                                      f' width="{nvb[2]:.4f}" height="{nvb[3]:.4f}">') + t[m.end():]
        master = im.crop((x0, y0, x1, y1))
        href = 'data:image/svg+xml;base64,' + base64.b64encode(svg.encode('utf-8')).decode()
        return href, nvb[2] / nvb[3], master
    im = Image.open(path).convert('RGBA')
    opaque = im.getchannel('A').getextrema()[0] == 255
    x0, y0, x1, y1 = _bbox(im, opaque)
    pad = max(1, int(0.004 * max(im.size)))
    master = im.crop((max(0, x0 - pad), max(0, y0 - pad), min(im.width, x1 + pad), min(im.height, y1 + pad)))
    emb = master
    if max(emb.size) > 1000:
        k = 1000 / max(emb.size)
        emb = emb.resize((round(emb.width * k), round(emb.height * k)), Image.LANCZOS)
    b = io.BytesIO()
    if opaque:  # photographic/JPEG-origin opaque file: embed as high-quality JPEG (no alpha to keep)
        emb.convert('RGB').save(b, 'JPEG', quality=92, subsampling=0)
        mime = 'image/jpeg'
    else:
        emb.save(b, 'PNG', optimize=True); mime = 'image/png'
    return f'data:{mime};base64,' + base64.b64encode(b.getvalue()).decode(), master.width / master.height, master


# ---------------------------------------------------------------- text as outlines (Geist 600, shaped by HarfBuzz)
@functools.lru_cache(None)
def _font():
    data = open(FONT, 'rb').read()
    return hb.Font(hb.Face(data)), TTFont(FONT)


def shape(text):
    hfont, tt = _font()
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(hfont, buf, {'kern': True, 'liga': True})
    gs = tt.getGlyphSet(); order = tt.getGlyphOrder()
    glyphs, x = [], 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        glyphs.append((order[info.codepoint], x + pos.x_offset, pos.y_offset)); x += pos.x_advance
    return glyphs, x, tt['head'].unitsPerEm


def text_path(text, size, cx, baseline):
    glyphs, adv, upm = shape(text)
    _, tt = _font(); gs = tt.getGlyphSet()
    k = size / upm
    x0 = cx - adv * k / 2
    pen = SVGPathPen(gs)
    for name, gx, gy in glyphs:
        tp = TransformPen(pen, (k, 0, 0, -k, x0 + gx * k, baseline - gy * k))
        gs[name].draw(tp)
    return pen.getCommands()


def text_width(text):
    _, adv, upm = shape(text)
    return adv / upm


def text_block(lines, cx, cy, r_in, cap):
    """Largest font size s.t. each line fits the circle chord at its height; returns SVG path d."""
    lh = 1.14
    capH, desc = 0.72, 0.2
    ws = [text_width(l) for l in lines]
    n = len(lines)
    s = cap
    while s > 0.5:
        H = (n - 1) * lh * s + capH * s
        top = cy - H / 2
        ok = True
        for i, w in enumerate(ws):
            yb = top + capH * s + i * lh * s
            yt = yb - capH * s
            yy = max(abs(yt - cy), abs(yb + desc * s - cy))
            if yy >= r_in or w * s > 2 * math.sqrt(r_in ** 2 - yy ** 2):
                ok = False; break
        if ok:
            break
        s *= 0.97
    H = (n - 1) * lh * s + capH * s
    top = cy - H / 2
    return ' '.join(text_path(l, s, cx, top + capH * s + i * lh * s) for i, l in enumerate(lines))


# ---------------------------------------------------------------- disc
def disc_parts(bid, W, H, gid, shadow=True, tiny=None):
    """SVG fragment: white disc (soft shadow + hairline) centred in WxH with the logo or name."""
    d = min(W, H)
    cx, cy = W / 2, H / 2
    small = d < 40 if tiny is None else tiny
    if shadow and d >= 28:
        sig, dy = d * 0.009, d * 0.007
        r = d / 2 - dy - 2.4 * sig
    else:
        sig = 0; r = d / 2 - max(0.35, d * 0.01)
    defs, out = [], []
    if sig:
        defs.append(f'<filter id="sh{gid}" x="-20%" y="-20%" width="140%" height="140%">'
                    f'<feGaussianBlur stdDeviation="{sig:.3f}"/></filter>')
        out.append(f'<circle cx="{cx:.3f}" cy="{cy + dy:.3f}" r="{r:.3f}" fill="{EDGE}" fill-opacity="0.12" filter="url(#sh{gid})"/>')
    sw = max(0.5, d * 0.004)
    out.append(f'<circle cx="{cx:.3f}" cy="{cy:.3f}" r="{r:.3f}" fill="#fff"/>')
    out.append(f'<circle cx="{cx:.3f}" cy="{cy:.3f}" r="{r - sw / 2:.3f}" fill="none" stroke="{EDGE}" stroke-opacity="0.07" stroke-width="{sw:.3f}"/>')
    if bid in TEXT:
        name, lines, short, _ = TEXT[bid]
        ls = [short] if small else lines
        dpath = text_block(ls, cx, cy, r * (0.80 if small else 0.74), d * (0.26 if small else 0.135))
        out.append(f'<path d="{dpath}" fill="{NAVY}"/>')
    else:
        href, a, _ = logo(bid)
        ri = r * (0.88 if small else 0.82)
        bw = 2 * ri * a / math.sqrt(1 + a * a); bh = bw / a
        out.append(f'<image x="{cx - bw / 2:.3f}" y="{cy - bh / 2:.3f}" width="{bw:.3f}" height="{bh:.3f}" '
                   f'preserveAspectRatio="xMidYMid meet" href="{href}"/>')
    return ''.join(defs), ''.join(out)


def lockup_parts(bid, W, H):
    """Wide slots (site wordmark variants): the logo alone, contained with a small margin."""
    if bid in TEXT:
        name = TEXT[bid][0]
        s = min(H * 0.62, W * 0.92 / max(0.1, text_width(name)))
        return '', f'<path d="{text_path(name, s, W / 2, H / 2 + 0.36 * s)}" fill="{NAVY}"/>'
    href, a, _ = logo(bid)
    mw, mh = W * 0.96, H * 0.88
    bw, bh = (mw, mw / a) if mw / a <= mh else (mh * a, mh)
    return '', (f'<image x="{(W - bw) / 2:.3f}" y="{(H - bh) / 2:.3f}" width="{bw:.3f}" height="{bh:.3f}" '
                f'preserveAspectRatio="xMidYMid meet" href="{href}"/>')


def svg_doc(defs, body, W, H):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W:.10g}" height="{H:.10g}" viewBox="0 0 {W:.10g} {H:.10g}">'
            + (f'<defs>{defs}</defs>' if defs else '') + body + '</svg>')


def disc_svg(bid, W, H, gid='d', shadow=True, tiny=None):
    if W / H > 1.6:
        return svg_doc(*lockup_parts(bid, W, H), W, H)
    return svg_doc(*disc_parts(bid, W, H, gid, shadow, tiny), W, H)


def raster(bid, w, h, shadow=True, tiny=None):
    """Pixel-exact raster; drawn at >=4x then downsampled. Tiny sizes use the short label."""
    k = max(4, math.ceil(512 / max(w, h)))
    svg = disc_svg(bid, w * k, h * k, 'r', shadow, tiny=min(w, h) < 40 if tiny is None else tiny)
    return render_svg(svg, w * k).resize((w, h), Image.LANCZOS)


# ---------------------------------------------------------------- slots
def svg_dims(path):
    t = open(path, encoding='utf-8', errors='ignore').read(3000)
    m = re.search(r'viewBox="\s*([-\d.]+)[ ,]+([-\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)', t)
    if m and float(m.group(3)) > 2 and float(m.group(4)) > 2:
        return float(m.group(3)), float(m.group(4))
    mw = re.search(r'\bwidth="([\d.]+)', t); mh = re.search(r'\bheight="([\d.]+)', t)
    return (float(mw.group(1)), float(mh.group(1))) if mw and mh else (512, 512)


def overlay_chip(orig, bid):
    """Chip images: replace the round seal inside the chip, keep the original halo/shadow."""
    im = orig.convert('RGBA'); a = np.array(im)
    sat = (a[..., :3].max(-1).astype(int) - a[..., :3].min(-1)) > 40
    ys, xs = np.where(sat & (a[..., 3] > 200))
    x0, y0, x1, y1 = xs.min(), ys.min(), xs.max(), ys.max()
    d = max(x1 - x0, y1 - y0) + 3
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    im.alpha_composite(raster(bid, d, d, shadow=False), (int(round(cx - d / 2)), int(round(cy - d / 2))))
    return im


def make_raster(bid, key, w, h, alpha, src):
    if key in CHIPS:
        img = overlay_chip(Image.open(src), bid)
        return img if img.size == (w, h) else img.resize((w, h), Image.LANCZOS)
    if w / h > 1.6:
        return raster(bid, w, h)
    c = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    if key == 'gsa-gold-seal':  # original seal occupies bbox (132,34)-(1211,1106) of 1346x1169
        k = w / 1346; d = max(1, int(round(1076 * k)))
        c.alpha_composite(raster(bid, d, d), (int(round(133 * k)), int(round(33 * k))))
        return c
    d = min(w, h)
    c.alpha_composite(raster(bid, d, d, tiny=True if key in TINY_KEYS else None), ((w - d) // 2, (h - d) // 2))
    return c


def run(only=None):
    written, mapping = [], {}
    for base, variants in P.INV.items():
        key = base.split('/')[-1]
        if base == 'images/home/footer/gsa' or key not in SLOTS:
            continue
        if only and key not in only:
            continue
        bid = SLOTS[key]
        for i, (p, s, b) in enumerate(variants):
            src = ROOT + '_mirror/' + p
            dst = ROOT + 'tools/overrides/' + p
            if s == 'svg':
                vw, vh = svg_dims(src)
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                open(dst, 'w', encoding='utf-8').write(disc_svg(bid, vw, vh, gid=re.sub(r'\W', '', key)[:12] + str(i), tiny=True if key in TINY_KEYS else None) + '\n')
            else:
                w, h = map(int, s.split('x'))
                if key in THUMB_KEYS and ORBIT(w, h) and p.startswith('_astro/') and p.endswith('.webp'):
                    continue
                alpha = P.has_alpha(src)
                P.save(make_raster(bid, key, w, h, alpha, src), dst, alpha, 90)
            written.append(p)
            mapping.setdefault(key, {'body': bid, 'kind': 'text' if bid in TEXT else 'logo', 'files': []})['files'].append(p)
    for p, bid in EXTRA_SVG.items():
        if only and p.rsplit('/', 1)[1][:-4] not in only:
            continue
        dst = ROOT + 'tools/overrides/' + p
        vw, vh = svg_dims(dst) if os.path.exists(dst) else (211, 211)
        open(dst, 'w', encoding='utf-8').write(disc_svg(bid, vw, vh, gid='x') + '\n')
        written.append(p)
        mapping[p.rsplit('/', 1)[1][:-4]] = {'body': bid, 'kind': 'text' if bid in TEXT else 'logo', 'files': [p],
                                             'note': 'override-only file (no mirror original); manifesto stack cycle'}
    return written, mapping


def write_meta(mapping):
    used = sorted({v['body'] for v in mapping.values()})
    cr = credits()
    bodies = {}
    for b in used:
        if b in TEXT:
            n, lines, short, why = TEXT[b]
            bodies[b] = {'name': n, 'kind': 'text', 'lines': lines, 'short': short, 'why_text': why}
        else:
            e = cr[b]
            bodies[b] = {'name': LOGO[b], 'kind': 'logo', 'logo': e['file'], 'source_url': e['source_url'], 'status': e['status']}
    json.dump({'_note': 'round 4 — slot (inventory base name) -> body. kind=logo: real logo, unaltered, on a white disc; '
                        'kind=text: name only (State bloc-marque never reproduced). Rendered by discs.py.',
               'bodies': bodies, 'slots': mapping}, open(HERE + 'mapping.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    logos = [b for b in used if b not in TEXT]
    rows = [{'body': b, 'name': LOGO[b], 'logo_file': 'tools/imgtools/badges/' + cr[b]['file'], 'source_url': cr[b]['source_url'],
             'status': cr[b]['status'], 'retrieved': cr[b].get('retrieved', '2026-09-30')} for b in logos]
    json.dump([{k: r[k] for k in ('body', 'name', 'source_url', 'status')} for r in rows],
              open(ROOT + 'tools/i18n/logo-credits.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    md = ['# Logos — crédits et statut', '',
          'Site de fan non officiel. Chaque logo est reproduit sans modification (couleurs, proportions), '
          'uniquement pour identifier l’organisme dont proviennent les réponses. Les marques restent la propriété de leurs titulaires.',
          '', '| Organisme | Fichier | Source | Statut | Récupéré le |', '|---|---|---|---|---|']
    for r in rows:
        md.append(f"| {r['name']} (`{r['body']}`) | `{r['logo_file'].split('badges/')[1]}` | {r['source_url']} | {r['status']} | {r['retrieved']} |")
    md += ['', '## Pastilles texte (identité de l’État — bloc-marque jamais reproduit)', '',
           '| Organisme | Texte | Raison |', '|---|---|---|']
    for b in used:
        if b in TEXT:
            md.append(f"| {TEXT[b][0]} (`{b}`) | {' / '.join(TEXT[b][1])} | {TEXT[b][3]} |")
    open(HERE + 'LOGO-CREDITS.md', 'w', encoding='utf-8').write('\n'.join(md) + '\n')
    return used


if __name__ == '__main__':
    only = set(sys.argv[sys.argv.index('--only') + 1].split(',')) if '--only' in sys.argv else None
    w, mapping = run(only)
    if not only:
        used = write_meta(mapping)
        print(len(w), 'files written;', len(used), 'bodies;', sum(1 for b in used if b not in TEXT), 'real logos')
    else:
        print(len(w), 'files written')
