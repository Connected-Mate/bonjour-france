"""Orbit thumbnails: fictional French public-service style web pages (480x334 family).
No real logos, no Marianne, no bloc-marque, no flag. Names are generic/fictional."""
import sys, random
sys.path.insert(0, '/Users/0104389S/Projects/hello-france/tools/imgtools/lead')
from lib import render, href, write, esc, aspect, MASTERS

W, H = 960, 668

PAL = {
    'navy': ('#16325c', '#e8b04a', '#eef3fa'), 'teal': ('#0f5c5a', '#f0a36b', '#e9f4f2'),
    'forest': ('#23543a', '#d9c36a', '#eef5ec'), 'plum': ('#5b2a4a', '#f2b8a0', '#f7eef3'),
    'blue': ('#1f5fbf', '#ffcc4d', '#eaf1fc'), 'rust': ('#8c3b1f', '#f3d4a4', '#faf1ea'),
    'slate': ('#2d3b4e', '#7fc4d8', '#eef1f5'), 'ink': ('#0d1b2a', '#e04f4f', '#f1f3f6'),
    'green': ('#2f7a3d', '#ffd166', '#edf7ee'), 'ocean': ('#0b4f7c', '#6fd3c6', '#e7f3fa'),
    'wine': ('#6d1f2e', '#e9c46a', '#f8eef0'), 'sand': ('#6b4e2e', '#d98c5f', '#f7f1e8'),
    'violet': ('#3d3a8c', '#f4a261', '#efeff9'), 'dark': ('#07090f', '#5aa9ff', '#111827'),
}

# base: (site name, headline, sub, button, template, palette, photo, focus, cards)
SITES = {
 'usa': ('Démarches', 'Toutes vos démarches, au même endroit', 'Trouvez le bon service en quelques clics', 'Commencer', 'light', 'navy', None, None, ['Famille', 'Logement', 'Travail', 'Santé']),
 'archives': ('Mémoire & archives', 'Consulter les archives', 'Documents, cartes et photographies', 'Rechercher', 'news', 'sand', 'press-freepress', (.5, .4), ['Généalogie', 'Cartes anciennes', 'Expositions']),
 'bea': ('Indicateurs', 'Les indicateurs économiques du mois', 'Croissance, emploi, prix : les derniers chiffres', 'Voir les données', 'chart', 'navy', None, None, ['PIB', 'Emploi', 'Prix', 'Commerce']),
 'blm': ('Espaces naturels', 'Randonner sur les terres publiques', 'Sentiers, refuges et bivouac', 'Préparer ma sortie', 'photo', 'forest', 'national-park', (.5, .5), ['Sentiers', 'Refuges', 'Cartes', 'Saisons']),
 'cbp': ('Voyager', 'Ce que vous pouvez rapporter de voyage', 'Franchises, déclarations et conseils', 'En savoir plus', 'split', 'slate', 'child-passport', (.5, .5), ['Bagages', 'Animaux', 'Achats']),
 'cdc': ('Santé publique', 'Conseils santé avant un voyage', 'Vaccins, prévention et alertes', 'Voir les conseils', 'split', 'teal', 'social-security', (.5, .5), ['Vaccins', 'Alertes', 'Prévention']),
 'census': ('Recensement', 'Mesurer la population, commune par commune', 'Cartes et chiffres clés', 'Explorer', 'chart', 'violet', None, None, ['Population', 'Logement', 'Âges', 'Régions']),
 'cfpb': ('Consommation', 'Protéger vos droits de consommateur', 'Crédit, banque, litiges : on vous guide', 'Déposer une réclamation', 'split', 'green', 'address-change', (.5, .5), ['Crédit', 'Banque', 'Assurance']),
 'commerce': ('Entreprises', 'Développer votre entreprise', 'Aides, export et accompagnement', 'Découvrir', 'photo', 'navy', 'new-business', (.5, .45), ['Aides', 'Export', 'Formation', 'Réseau']),
 'congress': ('Textes & lois', 'Suivre les textes en discussion', 'Propositions, débats et votes', 'Rechercher un texte', 'list', 'wine', None, None, ['Textes récents', 'Calendrier', 'Débats']),
 'dhs': ('Sécurité civile', 'Protéger la population au quotidien', 'Risques, alertes et prévention', 'Voir les alertes', 'photo', 'ocean', 'medicare', (.5, .5), ['Alertes', 'Prévention', 'Secours', 'Conseils']),
 'disaster': ('Aide aux sinistrés', 'Besoin d’aide après une catastrophe ?', 'Inondation, tempête, incendie : vos démarches', 'Demander une aide', 'split', 'blue', 'family', (.5, .5), ['Déclarer', 'Hébergement', 'Assurance']),
 'doi': ('Patrimoine naturel', 'Préserver nos paysages', 'Parcs, rivières et littoral', 'Explorer', 'photo', 'slate', 'goose-island', (.5, .5), ['Parcs', 'Rivières', 'Littoral', 'Faune']),
 'dol': ('Travail', 'Vos droits de salarié', 'Contrat, salaire, congés : l’essentiel', 'Consulter', 'tiles', 'blue', None, None, ['Contrat', 'Salaire', 'Congés', 'Formation', 'Sécurité', 'Retraite']),
 'energy': ('Énergie', 'Rénover son logement pour moins consommer', 'Isolation, chauffage, aides', 'Faire le point', 'split', 'green', 'housing', (.5, .5), ['Isolation', 'Chauffage', 'Aides']),
 'epa': ('Environnement', 'La qualité de l’air près de chez vous', 'Indices, conseils et bons gestes', 'Voir l’indice', 'news', 'teal', 'medicare', (.5, .5), ['Air', 'Eau', 'Déchets']),
 'fbi': ('Signalements', 'Signaler une escroquerie en ligne', 'Hameçonnage, faux sites, arnaques', 'Faire un signalement', 'dark', 'ink', None, None, ['Hameçonnage', 'Faux sites', 'Conseils']),
 'fda': ('Médicaments', 'Médicaments et alimentation : les alertes', 'Rappels de produits et informations', 'Voir les rappels', 'photo', 'blue', 'pharmacy-town-center', (.5, .5), ['Rappels', 'Médicaments', 'Aliments', 'Conseils']),
 'fema': ('Préparation', 'Se préparer aux risques', 'Inondation, canicule, tempête', 'Faire mon plan', 'split', 'navy', 'veteran-care', (.5, .5), ['Kit d’urgence', 'Alertes', 'Voisinage']),
 'forest': ('Forêts', 'Randonner en forêt', 'Sentiers, feux de forêt et saisons', 'Trouver un sentier', 'photo', 'forest', 'camp-brookchar', (.5, .5), ['Sentiers', 'Feux', 'Cueillette', 'Cartes']),
 'fueleconomy': ('Mobilité', 'Comparer la consommation des véhicules', 'Carburant, électrique, hybride', 'Comparer', 'tiles', 'ocean', None, None, ['Électrique', 'Hybride', 'Essence', 'Diesel', 'Vélo', 'Covoiturage']),
 'fws': ('Faune sauvage', 'Observer la faune sauvage', 'Oiseaux, zones humides, réserves', 'Découvrir', 'photo', 'forest', 'eagle', (.5, .5), ['Oiseaux', 'Réserves', 'Zones humides', 'Saisons']),
 'gao': ('Comptes publics', 'Contrôler la dépense publique', 'Rapports et recommandations', 'Lire les rapports', 'list', 'navy', None, None, ['Rapports', 'Recommandations', 'Méthodes']),
 'gsa': ('Achats publics', 'Répondre aux marchés publics', 'Appels d’offres et accompagnement', 'Voir les offres', 'news', 'slate', 'press-nds', (.5, .5), ['Offres', 'Guides', 'Fournisseurs']),
 'healthcare': ('Santé', 'Choisir sa complémentaire santé', 'Comparez les garanties, simplement', 'Comparer', 'light', 'teal', None, None, ['Garanties', 'Aides', 'Remboursements', 'Questions']),
 'hud': ('Logement', 'Trouver un logement adapté', 'Location, aides et accompagnement', 'Chercher', 'serif', 'navy', None, None, ['Location', 'Aides', 'Accompagnement']),
 'irs': ('Impôts', 'Déclarer vos revenus en ligne', 'Simple, rapide et sécurisé', 'Accéder à mon espace', 'illus', 'blue', None, None, ['Mon espace', 'Paiement', 'Questions']),
 'justice': ('Justice', 'Connaître vos droits', 'Démarches, aide juridique et tribunaux', 'S’informer', 'news', 'wine', 'military-service', (.5, .5), ['Aide juridique', 'Tribunaux', 'Victimes']),
 'loc': ('Bibliothèques', 'Lire, écouter, découvrir', 'Collections numériques en accès libre', 'Explorer', 'news', 'rust', 'crowd', (.5, .5), ['Livres', 'Cartes', 'Musique']),
 'medicare': ('Retraite & santé', 'Bien vivre sa retraite', 'Droits, soins et démarches', 'Commencer', 'person', 'green', 'medicare', (.6, .5), ['Mes droits', 'Soins', 'Démarches']),
 'medlineplus': ('Info santé', 'Comprendre sa santé', 'Maladies, examens, médicaments', 'Rechercher', 'tiles', 'teal', None, None, ['Maladies', 'Examens', 'Médicaments', 'Nutrition', 'Enfants', 'Seniors']),
 'nasa': ('Espace', 'Observer le ciel ce mois-ci', 'Planètes, éclipses et missions', 'Voir le calendrier', 'dark', 'dark', None, None, ['Missions', 'Planètes', 'Images']),
 'nih': ('Recherche médicale', 'La recherche au service de la santé', 'Essais, publications et programmes', 'Découvrir', 'science', 'blue', None, None, ['Essais', 'Publications', 'Programmes']),
 'noaa': ('Météo & climat', 'Mieux prévoir le temps', 'Prévisions, climat et océans', 'Voir les prévisions', 'photo', 'ocean', 'sand-flats', (.5, .5), ['Prévisions', 'Climat', 'Océans', 'Données']),
 'nps': ('Parcs nationaux', 'Préparez votre visite', 'Itinéraires, accès et saisons', 'Planifier', 'photo', 'forest', 'camp-winn', (.5, .5), ['Itinéraires', 'Accès', 'Saisons', 'Cartes']),
 'nsf': ('Sciences', 'Là où naissent les découvertes', 'Financer et partager la recherche', 'En savoir plus', 'photo', 'navy', 'social-security', (.5, .5), ['Appels', 'Projets', 'Résultats', 'Actualités']),
 'ocean': ('Océans & littoral', 'Comprendre la mer et le littoral', 'Marées, érosion et biodiversité', 'Explorer', 'photo', 'ocean', 'medicare', (.5, .5), ['Marées', 'Érosion', 'Biodiversité', 'Données']),
 'ready': ('Prêts', 'Mois de la préparation aux risques', 'Un plan simple pour votre famille', 'Faire mon plan', 'split', 'green', 'child-future', (.5, .5), ['Kit', 'Plan', 'Voisins']),
 'recreation': ('Réservations', 'Réserver un camping ou un refuge', 'Parcs, lacs et forêts', 'Rechercher', 'grid', 'rust', None, None, ['Campings', 'Refuges', 'Visites', 'Permis']),
 'sba': ('Créer', 'Créer et financer votre entreprise', 'Étapes, prêts et conseils', 'Commencer', 'split', 'navy', 'new-business', (.4, .5), ['Étapes', 'Prêts', 'Conseils']),
 'si': ('Musées', 'Expositions et collections', 'Visites, ateliers et ressources', 'Planifier ma visite', 'photo', 'ink', 'press-whitehouse', (.5, .5), ['Expositions', 'Ateliers', 'Collections', 'Visites']),
 'ssa': ('Retraite', 'Vos services retraite, en ligne', 'Relevé de carrière, simulation, paiements', 'Créer mon compte', 'person', 'navy', 'veteran-care', (.5, .4), ['Relevé', 'Simulation', 'Paiements']),
 'tsa': ('Aéroports', 'Préparer son passage à l’aéroport', 'Bagages, contrôles et conseils', 'Voir les règles', 'news', 'navy', 'child-passport', (.5, .5), ['Bagages', 'Liquides', 'Contrôles']),
 'usajobs': ('Emploi', 'Trouver un emploi', 'Des milliers d’offres près de chez vous', 'Rechercher', 'search', 'navy', 'new-job', (.5, .5), ['Offres', 'Métiers', 'Candidatures']),
 'uscis': ('Séjour', 'Titres de séjour et nationalité', 'Demandes, suivi et rendez-vous', 'Suivre ma demande', 'split', 'blue', 'name-change', (.5, .5), ['Demandes', 'Suivi', 'Rendez-vous']),
 'uspto': ('Inventions', 'Protéger une invention', 'Brevets, marques et dessins', 'Déposer', 'photo', 'ink', 'press-arnell-joins', (.5, .5), ['Brevets', 'Marques', 'Dessins', 'Tarifs']),
 'va': ('Anciens combattants', 'Nous sommes là pour vous aider', 'Soins, pensions et accompagnement', 'Commencer', 'serif', 'navy', None, None, ['Soins', 'Pensions', 'Logement']),
 'vote': ('Élections', 'S’inscrire sur les listes électorales', 'Vérifiez votre inscription en ligne', 'Vérifier', 'split', 'navy', 'crowd', (.5, .5), ['Inscription', 'Procuration', 'Calendrier']),
 'weather': ('Vigilance', 'Vigilance météo', 'Carte des alertes par département', 'Voir la carte', 'map', 'blue', None, None, ['Orages', 'Canicule', 'Vent', 'Neige']),
}


def lines(x, y, w, n, color='#c9ced6', h=9, gap=17, seed=0):
    r = random.Random(seed)
    s = ''
    for i in range(n):
        ww = w * (0.55 + 0.45 * r.random()) if i == n - 1 else w * (0.85 + 0.15 * r.random())
        s += f'<rect x="{x}" y="{y + i * gap}" width="{ww:.0f}" height="{h}" rx="{h/2}" fill="{color}"/>'
    return s


def text(x, y, t, size, fill='#111', font='Geist600', anchor='start', ls=0):
    return (f'<text x="{x}" y="{y}" font-family="{font}" font-size="{size}" fill="{fill}" '
            f'text-anchor="{anchor}" letter-spacing="{ls}">{esc(t)}</text>')


def wrap(t, maxch):
    words, out, cur = t.split(), [], ''
    for w in words:
        if len(cur) + len(w) + 1 > maxch and cur:
            out.append(cur); cur = w
        else:
            cur = (cur + ' ' + w).strip()
    out.append(cur)
    return out


def headline(x, y, t, size, fill, font='Geist600', maxch=22, lh=1.12):
    s = ''
    for i, l in enumerate(wrap(t, maxch)):
        s += text(x, y + i * size * lh, l, size, fill, font, ls=-size * 0.02)
    return s, len(wrap(t, maxch))


def mark(x, y, p, a, kind):
    """Small abstract site mark (never a real emblem)."""
    if kind % 3 == 0:
        return f'<rect x="{x}" y="{y}" width="30" height="30" rx="8" fill="{p}"/><circle cx="{x+15}" cy="{y+15}" r="7" fill="{a}"/>'
    if kind % 3 == 1:
        return f'<circle cx="{x+15}" cy="{y+15}" r="15" fill="{p}"/><path d="M{x+7} {y+19} l8 -10 l8 10 z" fill="{a}"/>'
    return f'<rect x="{x}" y="{y}" width="14" height="30" rx="3" fill="{p}"/><rect x="{x+16}" y="{y+8}" width="14" height="22" rx="3" fill="{a}"/>'


def header(name, p, a, dark=False, k=0, bg=None):
    bgc = bg or (p if dark else '#ffffff')
    fg = '#ffffff' if dark else '#101828'
    s = f'<rect width="{W}" height="22" fill="{"#0b0f17" if dark else "#f2f4f7"}"/>'
    s += text(16, 15, 'Site de démonstration — non officiel', 10, '#9aa3b2' if dark else '#667085', 'Geist500')
    s += f'<rect y="22" width="{W}" height="64" fill="{bgc}"/>'
    s += mark(20, 39, a if dark else p, '#ffffff' if dark else a, k)
    s += text(62, 61, name, 22, fg, 'Geist700', ls=-0.4)
    nx = 330
    for i, t in enumerate(['Démarches', 'Services', 'Actualités', 'Contact']):
        s += text(nx + i * 105, 60, t, 14, '#d0d5dd' if dark else '#475467', 'Geist500')
    s += f'<rect x="{W-190}" y="38" width="170" height="32" rx="16" fill="{"#ffffff22" if dark else "#f2f4f7"}" stroke="{"#ffffff44" if dark else "#d0d5dd"}"/>'
    s += f'<circle cx="{W-40}" cy="54" r="7" fill="none" stroke="{"#fff" if dark else "#667085"}" stroke-width="2"/>'
    s += text(W - 176, 59, 'Rechercher', 13, '#98a2b3', 'Geist400')
    if not dark:
        s += f'<rect y="85" width="{W}" height="1" fill="#e4e7ec"/>'
    return s


def button(x, y, t, fill, fg='#fff', size=17):
    w = len(t) * size * 0.56 + 40
    return f'<rect x="{x}" y="{y}" width="{w:.0f}" height="44" rx="22" fill="{fill}"/>' + text(x + 20, y + 28, t, size, fg, 'Geist600')


def cards(y, titles, p, a, tint, photos=None, h=None, dark=False):
    n = len(titles)
    gap = 20
    cw = (W - 40 - gap * (n - 1)) / n
    ch = h or (H - y - 10)
    s = ''
    for i, t in enumerate(titles):
        x = 20 + i * (cw + gap)
        s += f'<rect x="{x:.0f}" y="{y}" width="{cw:.0f}" height="{ch}" rx="12" fill="{"#161b26" if dark else "#fff"}" stroke="{"#2a3140" if dark else "#e4e7ec"}"/>'
        if photos:
            s += f'<clipPath id="cc{i}{y}"><rect x="{x:.0f}" y="{y}" width="{cw:.0f}" height="{ch*0.5:.0f}" rx="12"/></clipPath>'
            s += f'<image x="{x:.0f}" y="{y}" width="{cw:.0f}" height="{ch*0.5:.0f}" preserveAspectRatio="xMidYMid slice" clip-path="url(#cc{i}{y})" xlink:href="{photos[i % len(photos)]}"/>'
            ty = y + ch * 0.5 + 30
        else:
            s += f'<circle cx="{x+34:.0f}" cy="{y+36}" r="18" fill="{tint if not dark else "#1f2937"}"/><rect x="{x+26:.0f}" y="{y+28}" width="16" height="16" rx="4" fill="{p if not dark else a}"/>'
            ty = y + 86
        s += text(x + 18, ty, t, 18, '#f9fafb' if dark else '#101828', 'Geist600')
        s += lines(x + 18, ty + 16, cw - 40, 2, '#374151' if dark else '#d0d5dd', seed=i + y)
    return s


def photo(name, w, h, f=(.5, .5)):
    return href(MASTERS + name + '.png', crop=(w, h, f[0], f[1]))


def build(base, spec, k):
    name, hl, sub, btn, tpl, pal, ph, foc, cds = spec
    p, a, tint = PAL[pal]
    foc = foc or (.5, .5)
    s = ''
    if tpl == 'split':
        s += header(name, p, a, k=k)
        s += f'<rect y="86" width="{W}" height="330" fill="{p}"/>'
        n0 = len(wrap(hl, 19)); y0 = 160 if n0 < 3 else 142
        t, n = headline(40, y0, hl, 42, '#fff', maxch=19)
        s += t + text(40, y0 + n * 47 + 6, sub, 17, '#ffffffcc', 'Geist400')
        s += button(40, y0 + n * 47 + 30, btn, a, p)
        s += f'<image x="{W*0.52:.0f}" y="86" width="{W*0.48:.0f}" height="330" preserveAspectRatio="xMidYMid slice" xlink:href="{photo(ph, int(W*0.48), 330, foc)}"/>'
        s += cards(440, cds, p, a, tint)
    elif tpl == 'photo':
        s += header(name, p, a, dark=True, k=k)
        s += f'<image x="0" y="86" width="{W}" height="380" preserveAspectRatio="xMidYMid slice" xlink:href="{photo(ph, W, 380, foc)}"/>'
        s += f'<defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".65"/><stop offset=".65" stop-color="#000" stop-opacity="0"/></linearGradient></defs><rect y="86" width="{W}" height="380" fill="url(#g)"/>'
        n0 = len(wrap(hl, 22)); y0 = 400 - n0 * 48
        t, n = headline(40, y0, hl, 42, '#fff', maxch=22)
        s += t + button(40, y0 + n * 48 - 14, btn, a, p, 15)
        s += f'<rect y="466" width="{W}" height="{H-466}" fill="#fff"/>'
        s += cards(488, cds, p, a, tint, h=H - 498)
    elif tpl == 'light':
        s += header(name, p, a, k=k)
        s += f'<rect y="86" width="{W}" height="300" fill="{tint}"/>'
        for i, l in enumerate(wrap(hl, 30)):
            s += text(W / 2, 170 + i * 52, l, 46, p, 'Geist700', 'middle', -1)
        yy = 170 + len(wrap(hl, 30)) * 52
        s += text(W / 2, yy, sub, 18, '#475467', 'Geist400', 'middle')
        s += f'<rect x="{W/2-260}" y="{yy+26}" width="520" height="52" rx="26" fill="#fff" stroke="#d0d5dd"/>' + text(W / 2 - 230, yy + 58, 'Que cherchez-vous ?', 17, '#98a2b3', 'Geist400')
        s += f'<rect x="{W/2+140}" y="{yy+32}" width="112" height="40" rx="20" fill="{p}"/>' + text(W / 2 + 196, yy + 58, btn, 15, '#fff', 'Geist600', 'middle')
        s += cards(410, cds, p, a, tint)
    elif tpl == 'news':
        s += header(name, p, a, k=k)
        s += f'<rect x="0" y="86" width="{W}" height="{H-86}" fill="#fff"/>'
        s += text(40, 128, name.upper() + ' · À LA UNE', 13, p, 'Geist600', ls=1.5)
        t, n = headline(40, 180, hl, 40, '#101828', 'Newsreader500', maxch=24)
        s += t + lines(40, 180 + n * 44, 380, 3, '#d0d5dd', seed=k)
        s += button(40, 180 + n * 44 + 58, btn, p)
        s += f'<clipPath id="hc"><rect x="480" y="112" width="450" height="300" rx="14"/></clipPath><image x="480" y="112" width="450" height="300" preserveAspectRatio="xMidYMid slice" clip-path="url(#hc)" xlink:href="{photo(ph, 450, 300, foc)}"/>'
        s += f'<rect x="20" y="438" width="{W-40}" height="1" fill="#e4e7ec"/>'
        s += cards(456, cds, p, a, tint, photos=[photo(x, 300, 110) for x in ('medicare', 'family', 'crowd', 'goose-island')], h=H - 466)
    elif tpl == 'person':
        s += header(name, p, a, k=k)
        s += f'<rect y="86" width="{W}" height="340" fill="{tint}"/>'
        t, n = headline(40, 180, hl, 50, '#101828', 'Geist700', maxch=18)
        s += t + text(40, 180 + n * 56 + 4, sub, 18, '#475467', 'Geist400') + button(40, 180 + n * 56 + 30, btn, p)
        s += f'<clipPath id="pc"><circle cx="{W*0.74:.0f}" cy="256" r="150"/></clipPath><circle cx="{W*0.74:.0f}" cy="256" r="160" fill="{a}"/><image x="{W*0.74-150:.0f}" y="106" width="300" height="300" preserveAspectRatio="xMidYMid slice" clip-path="url(#pc)" xlink:href="{photo(ph, 300, 300, foc)}"/>'
        s += cards(450, cds, p, a, tint)
    elif tpl == 'serif':
        s += header(name, p, a, dark=True, k=k)
        s += f'<rect y="86" width="{W}" height="{H-86}" fill="{p}"/>'
        for r in range(8):
            s += f'<circle cx="{W/2}" cy="300" r="{60+r*38}" fill="none" stroke="#ffffff" stroke-opacity="{0.10 - r*0.01:.2f}" stroke-width="2"/>'
        lns = wrap(hl, 26)
        for i, l in enumerate(lns):
            s += text(W / 2, 270 + i * 64, l, 60, '#fff', 'Newsreader400', 'middle', -1)
        s += text(W / 2, 270 + len(lns) * 64 + 10, sub, 20, '#ffffffbb', 'Newsreader400', 'middle')
        s += cards(500, cds, p, a, tint, h=H - 510, dark=True)
    elif tpl == 'dark':
        s += header(name, '#0b0f17', a, dark=True, k=k, bg='#0b0f17')
        s += f'<rect y="86" width="{W}" height="{H-86}" fill="#05070c"/>'
        r = random.Random(k)
        for _ in range(160):
            s += f'<circle cx="{r.random()*W:.0f}" cy="{86+r.random()*360:.0f}" r="{r.random()*1.6+0.3:.1f}" fill="#fff" fill-opacity="{r.random()*0.8+0.2:.2f}"/>'
        if base == 'nasa':
            s += f'<defs><radialGradient id="m" cx=".4" cy=".4"><stop offset="0" stop-color="#e9e6df"/><stop offset=".7" stop-color="#9b988f"/><stop offset="1" stop-color="#3a3935"/></radialGradient></defs><circle cx="700" cy="260" r="150" fill="url(#m)"/>'
            for cx, cy, rr in [(650, 220, 22), (740, 300, 15), (700, 180, 10), (760, 230, 12), (640, 310, 9)]:
                s += f'<circle cx="{cx}" cy="{cy}" r="{rr}" fill="#7d7a72" fill-opacity=".45"/>'
        else:
            s += f'<rect x="560" y="130" width="340" height="250" rx="16" fill="#111827" stroke="#1f2937"/><rect x="600" y="170" width="120" height="120" rx="60" fill="none" stroke="{a}" stroke-width="10"/><rect x="660" y="230" width="10" height="70" fill="{a}" transform="rotate(-45 660 230)"/>' + lines(600, 320, 260, 2, '#374151', seed=3)
        t, n = headline(40, 200, hl, 46, '#fff', maxch=18)
        s += t + button(40, 200 + n * 52 + 10, btn, '#e04f4f' if base == 'fbi' else a, '#fff' if base == 'fbi' else '#05070c')
        s += cards(470, cds, p, a, tint, h=H - 480, dark=True)
    elif tpl in ('chart', 'list', 'tiles', 'grid', 'search', 'illus', 'science', 'map'):
        s += header(name, p, a, k=k)
        s += f'<rect y="86" width="{W}" height="{H-86}" fill="#fff"/>'
        if tpl in ('chart', 'list', 'map', 'science', 'illus'):
            t, n = headline(40, 160, hl, 38, '#101828', 'Newsreader500' if tpl == 'list' else 'Geist700', maxch=24)
            s += t + text(40, 160 + n * 44, sub, 17, '#475467', 'Geist400') + button(40, 160 + n * 44 + 26, btn, p)
            bx, by, bw, bh = 500, 112, 430, 310
            s += f'<rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="14" fill="{tint}"/>'
            if tpl == 'chart':
                pts = [(bx + 30 + i * 38, by + 250 - (40 + 25 * (i % 4) + i * 12)) for i in range(11)]
                for i, (x, y) in enumerate(pts):
                    s += f'<rect x="{x}" y="{y}" width="24" height="{by+270-y}" rx="4" fill="{p if i % 3 else a}"/>'
                s += f'<polyline points="{" ".join(f"{x+12},{y-30}" for x, y in pts)}" fill="none" stroke="{a}" stroke-width="4"/>'
            elif tpl == 'list':
                for i in range(5):
                    yy = by + 30 + i * 56
                    s += f'<rect x="{bx+20}" y="{yy}" width="{bw-40}" height="44" rx="8" fill="#fff"/><rect x="{bx+34}" y="{yy+12}" width="20" height="20" rx="4" fill="{p}"/>' + lines(bx + 66, yy + 12, 280, 2, '#d0d5dd', 8, 13, seed=i)
            elif tpl == 'map':
                hexa = 'M715 140 L800 165 L850 230 L835 330 L770 395 L690 400 L610 360 L585 280 L615 200 Z'
                s += f'<path d="{hexa}" fill="#ffffff" stroke="{p}" stroke-width="3"/>'
                r = random.Random(7)
                cols = ['#57b36b', '#ffd166', '#f4a261', '#57b36b', '#57b36b', '#ffd166']
                for i in range(22):
                    cx, cy = 620 + r.random() * 210, 180 + r.random() * 200
                    s += f'<circle cx="{cx:.0f}" cy="{cy:.0f}" r="{12+r.random()*10:.0f}" fill="{cols[i % 6]}" fill-opacity=".75"/>'
                s += f'<path d="{hexa}" fill="none" stroke="{p}" stroke-width="3"/>'
            elif tpl == 'science':
                for i in range(12):
                    x = bx + 40 + i * 32
                    import math
                    y1 = by + 155 + 70 * math.sin(i * 0.8); y2 = by + 155 - 70 * math.sin(i * 0.8)
                    s += f'<line x1="{x}" y1="{y1:.0f}" x2="{x}" y2="{y2:.0f}" stroke="#9fb9e8" stroke-width="3"/><circle cx="{x}" cy="{y1:.0f}" r="9" fill="{p}"/><circle cx="{x}" cy="{y2:.0f}" r="9" fill="{a}"/>'
            else:  # illus: person at laptop, flat shapes
                s += f'<circle cx="{bx+300}" cy="{by+90}" r="60" fill="{a}" fill-opacity=".5"/><rect x="{bx+90}" y="{by+170}" width="220" height="120" rx="10" fill="{p}"/><rect x="{bx+60}" y="{by+285}" width="280" height="12" rx="6" fill="#101828"/><circle cx="{bx+200}" cy="{by+100}" r="34" fill="#c68b6e"/><path d="M{bx+140} {by+230} q60 -120 120 0 z" fill="{a}"/><rect x="{bx+180}" y="{by+215}" width="40" height="30" rx="4" fill="#fff"/>'
            s += cards(450, cds, p, a, tint, h=H - 460)
        elif tpl in ('tiles', 'grid', 'search'):
            s += f'<rect y="86" width="{W}" height="220" fill="{p}"/>'
            if tpl == 'search':
                s += f'<image x="{W*0.55:.0f}" y="86" width="{W*0.45:.0f}" height="220" preserveAspectRatio="xMidYMid slice" xlink:href="{photo(ph, int(W*0.45), 220, foc)}"/>'
            t, n = headline(40, 150, hl, 40, '#fff', maxch=26)
            s += t
            s += f'<rect x="40" y="{150+n*44-10}" width="440" height="46" rx="23" fill="#fff"/>' + text(64, 150 + n * 44 + 19, 'Mot-clé, ville…', 16, '#98a2b3', 'Geist400')
            s += f'<rect x="376" y="{150+n*44-4}" width="98" height="34" rx="17" fill="{a}"/>' + text(425, 150 + n * 44 + 18, btn[:11], 13, p, 'Geist600', 'middle')
            if tpl == 'grid':
                ph_list = [photo(x, 300, 140) for x in ('camp-apache', 'camp-hoyer', 'campground', 'goose-island')]
                s += cards(330, cds, p, a, tint, photos=ph_list, h=H - 340)
            elif tpl == 'search':
                s += cards(330, cds, p, a, tint, h=H - 340)
            else:
                n2 = len(cds)
                cols = 3
                for i, t2 in enumerate(cds):
                    cx = 20 + (i % cols) * 313; cy = 330 + (i // cols) * 164
                    s += f'<rect x="{cx}" y="{cy}" width="297" height="148" rx="12" fill="{tint}"/><rect x="{cx+20}" y="{cy+22}" width="36" height="36" rx="10" fill="{p}"/>' + text(cx + 20, cy + 92, t2, 20, '#101828', 'Geist600') + lines(cx + 20, cy + 108, 220, 1, '#c9ced6', seed=i)
    return render(s, W, H, bg='#ffffff')


if __name__ == '__main__':
    only = sys.argv[1:]
    orbit = aspect(1.40, 1.48)
    for k, (base, spec) in enumerate(SITES.items()):
        if only and base not in only:
            continue
        im = build(base, spec, k)
        n = write(base, im, pred=orbit, tag='orbit')
        print(base, spec[4], n, 'files')
