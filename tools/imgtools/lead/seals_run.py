"""Apply the neutral medallion family to every seal / emblem / agency-logo base."""
import sys, os, io, base64, re
import numpy as np
from PIL import Image, ImageFilter
sys.path.insert(0, '/Users/0104389S/Projects/hello-france/tools/imgtools/lead')
from badges import medal_img, shield, lockup, medal, PALS
from lib import ROOT, render
import place as P

SP = 'SERVICES PUBLICS'
# base-name (without dir prefix) -> (picto, palette, top, bottom)
M = {
 # home seals grid
 'congress': ('batiment', 'navy', SP, 'DÉBAT PUBLIC'),
 'dea': ('sante', 'teal', SP, 'PRÉVENTION'),
 'energy': ('energie', 'green', SP, 'ÉNERGIE'),
 'faa': ('voyage', 'blue', SP, 'TRANSPORT AÉRIEN'),
 'fbi': ('securite', 'navy', SP, 'SÉCURITÉ'),
 'forest-service': ('nature', 'green', 'FORÊTS', 'ET BOIS'),
 'great-seal': ('bulle', 'gold', 'BONJOUR FRANCE', 'SITE NON OFFICIEL'),
 'house': ('batiment', 'wine', SP, 'CITOYENNETÉ'),
 'hud': ('logement', 'navy', SP, 'LOGEMENT'),
 'labor': ('emploi', 'blue', SP, 'TRAVAIL'),
 'library-of-congress': ('culture', 'ink', SP, 'BIBLIOTHÈQUES'),
 'patent-and-trademark': ('ampoule', 'rust', SP, 'INNOVATION'),
 'social-security-older': ('famille', 'navy', SP, 'SOLIDARITÉ'),
 'surface-transportation-board': ('transport', 'navy', SP, 'TRANSPORTS'),
 'transportation': ('transport', 'blue', SP, 'MOBILITÉS'),
 'treasury': ('monnaie', 'teal', SP, 'FINANCES PUBLIQUES'),
 'us-marshals': ('justice', 'rust', SP, 'JUSTICE'),
 'government-veterans-affairs-seal': ('ruban', 'navy', SP, 'ANCIENS COMBATTANTS'),
 'government-social-security-seal': ('famille', 'navy', SP, 'PROTECTION SOCIALE'),
 'gsa-gold-seal': ('batiment', 'gold', SP, 'ACHATS PUBLICS'),
 'medicare-seal': ('sante', 'blue', SP, 'SANTÉ ET SOLIDARITÉS'),
 'veterans-crisis-line-seal': ('ruban', 'navy', SP, 'ÉCOUTE ET SOUTIEN'),
 'name-change-irs': ('impots', 'teal', SP, 'IMPÔTS'),
 'name-change-ssa': ('famille', 'navy', SP, 'PROTECTION SOCIALE'),
 'name-change-state': ('voyage', 'navy', SP, 'PASSEPORTS'),
 'ssa.gov': ('famille', 'navy', SP, 'PROTECTION SOCIALE'),
 'state.gov': ('voyage', 'navy', SP, 'PASSEPORTS'),
 'cbp.gov': ('voyage', 'slate', SP, 'VOYAGES'),
 'employment-navy': ('mer', 'navy', SP, 'MER ET LITTORAL'),
 'navy': ('mer', 'navy', SP, 'MER ET LITTORAL'),
 'cbp': ('voyage', 'slate', SP, 'VOYAGES'),
 'gsa': ('batiment', 'slate', SP, 'ACHATS PUBLICS'),
 'nasa': ('planete', 'ink', SP, 'ESPACE'),
 # agency seals
 'seal-administrative-conference-of-the-united-states': ('batiment', 'navy', SP, 'ACTION PUBLIQUE'),
 'seal-customs-and-border-protection': ('voyage', 'slate', SP, 'VOYAGES'),
 'seal-development-finance-corporation': ('globe', 'navy', 'Développement solidaire', 'FINANCEMENT'),
 'seal-federal-mine-safety-and-health-review-commission': ('securite', 'rust', SP, 'SÉCURITÉ AU TRAVAIL'),
 'seal-geographic-names-board': ('carte', 'ocean', SP, 'GÉOGRAPHIE'),
 'seal-industry-and-security-bureau': ('industrie', 'navy', SP, 'INDUSTRIE'),
 'seal-inter-american-foundation': ('globe', 'ocean', SP, 'COOPÉRATION'),
 'seal-legal-services-corporation': ('justice', 'navy', 'Aide juridique', 'SERVICE D’ACCÈS AU DROIT'),
 'seal-national-credit-union-administration': ('monnaie', 'navy', SP, 'ÉPARGNE'),
 'seal-nuclear-regulatory-commission': ('sciences', 'ink', SP, 'SÛRETÉ NUCLÉAIRE'),
 'seal-occupational-safety-and-health-review-commission': ('securite', 'green', SP, 'SANTÉ AU TRAVAIL'),
 'seal-surface-mining-reclamation-and-enforcement-office': ('montagne', 'ink', SP, 'SOLS ET SOUS-SOLS'),
 'seal-united-states-courts': ('justice', 'teal', SP, 'TRIBUNAUX'),
 'seal-commerce': ('industrie', 'blue', SP, 'COMMERCE'),
 'seal-energy': ('energie', 'green', SP, 'ÉNERGIE'),
 'seal-interior': ('nature', 'rust', SP, 'TERRITOIRES'),
 'seal-patent-and-trademark-office': ('ampoule', 'navy', SP, 'INNOVATION'),
 'seal-state': ('globe', 'blue', SP, 'INTERNATIONAL'),
 'seal-treasury': ('monnaie', 'blue', SP, 'FINANCES PUBLIQUES'),
 'seal-tsa': ('voyage', 'slate', SP, 'AÉROPORTS'),
 'seal-veterans-affairs': ('ruban', 'navy', SP, 'ANCIENS COMBATTANTS'),
 # local / regional (fictional places, never real names)
 'seal-local-arapahoe-county': ('mairie', 'navy', 'Communauté des Vallons', ''),
 'seal-local-arizona': ('montagne', 'rust', 'RÉGION DES CANYONS', 'TERRE DU SUD'),
 'seal-local-ashland-oregon': ('mairie', 'green', 'Ville de Bellerive', ''),
 'seal-local-boston': ('mer', 'ink', 'VILLE DE PORT-CLAIR', 'CITÉ MARITIME'),
 'seal-local-boulder-county': ('montagne', 'green', 'PAYS DES CRÊTES', 'COMMUNAUTÉ'),
 'seal-local-brookline-massachusetts': ('mairie', 'wine', 'Ville de Val-Fleuri', 'MAIRIE'),
 'seal-local-colorado': ('montagne', 'blue', 'RÉGION', 'DES CIMES'),
 'seal-local-columbia-county-oregon': ('eau', 'ocean', 'PAYS DES DEUX RIVES', 'COMMUNAUTÉ'),
 'seal-local-cuyahoga-county': ('mairie', 'navy', 'Pays de la Rivière', ''),
 'seal-local-florida': ('climat', 'ocean', 'RÉGION DU LITTORAL', 'TERRE DE SOLEIL'),
 'seal-local-henderson-county-north-carolina': ('montagne', 'green', 'Pays des Collines', 'COMMUNAUTÉ DE COMMUNES'),
 'seal-local-maricopa-county': ('climat', 'rust', 'PAYS DU PLATEAU', 'COMMUNAUTÉ'),
 'seal-local-maryland': ('mer', 'wine', 'RÉGION DES BAIES', 'LITTORAL'),
 'seal-local-minnesota': ('eau', 'blue', 'RÉGION DES LACS', 'TERRE D’EAU'),
 'seal-local-nebraska': ('agriculture', 'rust', 'RÉGION DES PLAINES', 'TERRE AGRICOLE'),
 'seal-local-north-dakota': ('agriculture', 'green', 'RÉGION DU NORD', 'CHAMPS ET PRAIRIES'),
 'seal-local-ohio': ('mairie', 'navy', 'RÉGION DES VALLÉES', 'COMMUNES UNIES'),
 'seal-local-oregon': ('nature', 'green', 'RÉGION DES FORÊTS', 'TERRE VERTE'),
 'seal-local-redmond-washington': ('mairie', 'teal', 'Ville de Clairmont', 'MAIRIE'),
 'seal-local-rialto-california': ('mairie', 'rust', 'Ville de Saint-Arlet', ''),
 'seal-local-texas': ('climat', 'navy', 'RÉGION DU GRAND SUD', 'TERRE DE SOLEIL'),
 'seal-local-washington': ('nature', 'teal', 'RÉGION DES PINS', 'TERRE D’OUEST'),
 # favicons of agency sites (fallback-*)
 'fallback-ada.gov': ('accessibilite', 'blue', SP, 'ACCESSIBILITÉ'),
 'fallback-archives.gov': ('archives', 'ink', SP, 'ARCHIVES'),
 'fallback-cbp.gov': ('voyage', 'slate', SP, 'VOYAGES'),
 'fallback-census.gov': ('stats', 'navy', SP, 'STATISTIQUES'),
 'fallback-childcare.gov': ('famille', 'teal', SP, 'PETITE ENFANCE'),
 'fallback-childwelfare.gov': ('famille', 'green', SP, 'ENFANCE'),
 'fallback-congress.gov': ('batiment', 'navy', SP, 'DÉBAT PUBLIC'),
 'fallback-copyright.gov': ('culture', 'wine', SP, 'DROIT D’AUTEUR'),
 'fallback-data.census.gov': ('stats', 'blue', SP, 'DONNÉES'),
 'fallback-disasterassistance.gov': ('securite', 'ocean', SP, 'AIDE AUX SINISTRÉS'),
 'fallback-eac.gov': ('vote', 'navy', SP, 'ÉLECTIONS'),
 'fallback-fec.gov': ('vote', 'slate', SP, 'ÉLECTIONS'),
 'fallback-federalregister.gov': ('archives', 'navy', SP, 'JOURNAL DES TEXTES'),
 'fallback-floodsmart.gov': ('eau', 'ocean', SP, 'INONDATIONS'),
 'fallback-foia.gov': ('archives', 'teal', SP, 'ACCÈS AUX DOCUMENTS'),
 'fallback-fvap.gov': ('vote', 'blue', SP, 'VOTE À L’ÉTRANGER'),
 'fallback-grants.gov': ('monnaie', 'green', SP, 'SUBVENTIONS'),
 'fallback-gsa.gov': ('batiment', 'slate', SP, 'ACHATS PUBLICS'),
 'fallback-healthcare.gov': ('sante', 'navy', SP, 'SANTÉ'),
 'fallback-house.gov': ('batiment', 'wine', SP, 'CITOYENNETÉ'),
 'fallback-hrsa.gov': ('sante', 'ocean', SP, 'SOINS'),
 'fallback-ic3.gov': ('numerique', 'ink', SP, 'CYBERSÉCURITÉ'),
 'fallback-identitytheft.gov': ('cadenas', 'teal', SP, 'IDENTITÉ'),
 'fallback-ihs.gov': ('sante', 'rust', SP, 'SANTÉ'),
 'fallback-insurekidsnow.gov': ('famille', 'blue', SP, 'SANTÉ DES ENFANTS'),
 'fallback-investor.gov': ('stats', 'teal', SP, 'ÉPARGNANTS'),
 'fallback-login.gov': ('cadenas', 'navy', SP, 'CONNEXION'),
 'fallback-medicaid.gov': ('sante', 'teal', SP, 'COUVERTURE SANTÉ'),
 'fallback-medicare.gov': ('sante', 'blue', SP, 'RETRAITE ET SANTÉ'),
 'fallback-milconnect.dmdc.osd.mil': ('securite', 'slate', SP, 'DÉFENSE'),
 'fallback-ncua.gov': ('monnaie', 'navy', SP, 'ÉPARGNE'),
 'fallback-occ.gov': ('monnaie', 'slate', SP, 'BANQUES'),
 'fallback-opm.gov': ('emploi', 'navy', SP, 'FONCTION PUBLIQUE'),
 'fallback-pbgc.gov': ('monnaie', 'rust', SP, 'RETRAITES'),
 'fallback-recreation.gov': ('nature', 'green', SP, 'LOISIRS NATURE'),
 'fallback-sam.gov': ('industrie', 'slate', SP, 'MARCHÉS PUBLICS'),
 'fallback-sec.gov': ('stats', 'navy', SP, 'MARCHÉS FINANCIERS'),
 'fallback-senate.gov': ('batiment', 'navy', SP, 'DÉBAT PUBLIC'),
 'fallback-studentaid.gov': ('education', 'blue', SP, 'AIDES AUX ÉTUDES'),
 'fallback-tsa.gov': ('voyage', 'slate', SP, 'AÉROPORTS'),
 'fallback-usa.gov': ('bulle', 'navy', 'BONJOUR FRANCE', 'SITE NON OFFICIEL'),
 'fallback-usajobs.gov': ('emploi', 'navy', SP, 'EMPLOI'),
 'fallback-uscourts.gov': ('justice', 'navy', SP, 'TRIBUNAUX'),
 'fallback-uspto.gov': ('ampoule', 'navy', SP, 'INNOVATION'),
 'fallback-vote.gov': ('vote', 'blue', SP, 'ÉLECTIONS'),
 'fallback-weather.gov': ('climat', 'ocean', SP, 'MÉTÉO'),
 'fallback-whitehouse.gov': ('batiment', 'ink', SP, 'INSTITUTIONS'),
}
CHIPS = {'name-change-irs', 'name-change-ssa', 'name-change-state', 'veterans-crisis-line-seal', 'employment-navy'}
ORBIT = lambda w, h: 1.40 <= w / h <= 1.48 and w in (32, 64, 128, 256, 384, 480)

_cache = {}


def med(key, style, px):
    k = (key, style, px)
    if k not in _cache:
        t = M[key]
        _cache[k] = medal_img(t[0], t[1], t[2], t[3], style=style, px=px)
    return _cache[k]


def style_for(w):
    return 'medal' if w >= 96 else ('simple' if w >= 40 else 'tiny')


def overlay_chip(orig, badge_key):
    """Replace the round seal inside a shadowed chip, keep the original halo/shadow."""
    im = orig.convert('RGBA'); a = np.array(im)
    sat = (a[..., :3].max(-1).astype(int) - a[..., :3].min(-1)) > 40
    ys, xs = np.where(sat & (a[..., 3] > 200))
    x0, y0, x1, y1 = xs.min(), ys.min(), xs.max(), ys.max()
    d = max(x1 - x0, y1 - y0) + 3
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    b = med(badge_key, style_for(d), 1024).resize((d, d), Image.LANCZOS)
    im.alpha_composite(b, (int(round(cx - d / 2)), int(round(cy - d / 2))))
    return im


def svg_wrap(png_img, w, h):
    b = io.BytesIO(); png_img.save(b, 'PNG', optimize=True)
    data = base64.b64encode(b.getvalue()).decode()
    return (f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
            f'width="{w}" height="{h}" viewBox="0 0 {w} {h}"><image width="{w}" height="{h}" '
            f'href="data:image/png;base64,{data}" xlink:href="data:image/png;base64,{data}"/></svg>\n')


def svg_dims(path):
    t = open(path, encoding='utf-8', errors='ignore').read(3000)
    m = re.search(r'viewBox="\s*([-\d.]+)[ ,]+([-\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)', t)
    if m:
        w, h = float(m.group(3)), float(m.group(4))
        if w > 2 and h > 2:
            return w, h
    mw = re.search(r'\bwidth="([\d.]+)', t); mh = re.search(r'\bheight="([\d.]+)', t)
    return (float(mw.group(1)), float(mh.group(1))) if mw and mh else (512, 512)


def make(key, w, h, alpha_bg):
    t = M[key]
    ar = w / h
    if ar > 1.6:
        return lockup(t[0], t[1], t[2], t[3], w, h, bg=None if alpha_bg else PALS[t[1]][0])
    if ar < 0.93 and key.endswith('forest-service') or ar < 0.9:
        return shield(t[0], t[1], t[2], t[3], S=512, H=int(512 / ar))
    return med(key, style_for(min(w, h)), max(256, min(1024, 4 * min(w, h))))


def run():
    n = 0
    done = []
    for base, variants in P.INV.items():
        key = base.split('/')[-1]
        if base == 'images/home/footer/gsa':
            continue
        if key not in M:
            continue
        for p, s, b in variants:
            src = ROOT + '_mirror/' + p
            dst = ROOT + 'tools/overrides/' + p
            if s == 'svg':
                vw, vh = svg_dims(src)
                img = make(key, 256, int(256 * vh / vw) or 256, True)
                img = P.fit(img, int(round(512 * vw / max(vw, vh))), int(round(512 * vh / max(vw, vh))), 'contain', (.5, .5), (0, 0, 0, 0))
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                open(dst, 'w').write(svg_wrap(img, int(vw) if vw >= 16 else img.width, int(vh) if vh >= 16 else img.height))
                n += 1; done.append((p, 'svg'))
                continue
            w, h = map(int, s.split('x'))
            if key in ('congress', 'energy', 'fbi', 'hud', 'cbp', 'gsa', 'nasa') and ORBIT(w, h) and p.startswith('_astro/') and p.endswith('.webp'):
                continue  # orbit thumbnails handled by thumbs.py
            alpha = P.has_alpha(src)
            if key in CHIPS:
                img = overlay_chip(Image.open(src), key)
                img = img if img.size == (w, h) else img.resize((w, h), Image.LANCZOS)
            else:
                img = make(key, w, h, alpha)
                bg = (0, 0, 0, 0) if alpha else (255, 255, 255, 255)
                if key == 'gsa-gold-seal':
                    # original seal occupies bbox (132,34)-(1211,1106) of 1346x1169
                    k = w / 1346
                    c = Image.new('RGBA', (w, h), (0, 0, 0, 0))
                    d = int(round(1076 * k)); c.alpha_composite(med(key, 'medal', 1024).resize((d, d), Image.LANCZOS), (int(round(133 * k)), int(round(33 * k))))
                    img = c
                else:
                    pad = 0.0 if img.width / img.height > 1.6 else 0.0
                    img = P.fit(img, w, h, 'contain', (.5, .5), bg)
            P.save(img, dst, alpha, 88)
            n += 1; done.append((p, s))
    return n, done


if __name__ == '__main__':
    n, done = run()
    print(n, 'files written')
