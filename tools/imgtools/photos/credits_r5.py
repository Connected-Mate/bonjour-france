# Round 5 (iconic French scenes + real French passport cover): write tools/i18n/photo-credits.json (machine) and
# tools/overrides/PHOTO-CREDITS.md (human) from photos/real/meta.json (licence metadata read from each Commons File:
# page by fetch_real.py; round-5 picks: real/picks-r5.tsv + picks-r5b.tsv).
import json
R = '/Users/0104389S/Projects/hello-france/'
meta = json.load(open(R + 'tools/imgtools/photos/real/meta.json'))
CH = 'recadrée, redimensionnée'
CB = CH + ' ; fonds flous du carrousel'
TH = 'recadrée en vignette carrée 120 px à coins arrondis, insérée dans la maquette'
USE = {  # meta key -> (base, changes, where on the site)
 'r5-new-business': ('new-business', CB, 'carrousel — micro-entreprise : boulangerie « Le Moulin de la Vierge », Paris 7e'),
 'r5-address-change': ('address-change', CB, 'carrousel — déménagement : immeuble haussmannien, Paris'),
 'r5-child-passport': ('child-passport', CB, 'carrousel — passeport : TGV Duplex en gare de l’Est, Paris'),
 'r5-military-service': ('military-service', CB, 'carrousel — listes électorales : Hôtel de Ville de Paris'),
 'r5-child-future': ('child-future', CB, 'carrousel — prime d’activité : marché provençal d’Antibes'),
 'r5-social-security': ('social-security', CB, 'carrousel — carte Vitale : Étretat, aiguille et porte d’Aval'),
 'r5-national-park': ('national-park', CB, 'carrousel — permis de conduire : champ de lavande, plateau de Valensole'),
 'r5-veteran-care': ('veteran-care', CB, 'carrousel — APL étudiant : Sacré-Cœur de Montmartre, Paris'),
 'r5-name-change': ('name-change', CB, 'carrousel — mariage : château de Chenonceau'),
 'r5-medicare': ('medicare', CB + ' (variantes medicare.DqRXMPkA_* uniquement)', 'carrousel — retraite : Vieux-Port de Marseille'),
 'r5-new-job': ('new-job', CB, 'carrousel — France Travail : La Défense et la Grande Arche'),
 'crowd': ('crowd', CH + ' (carré)', 'fonctionnalités — foule (jardin du Luxembourg, Paris)'),
 'r5-passport': ('passport', CH, 'fonctionnalités — Mont-Saint-Michel'),
 'r5-privacy': ('privacy', CH + ' (carré)', 'fonctionnalités — lac d’Annecy et dents de Lanfon'),
 'r5-family': ('family', CH, 'manifeste — pique-nique au Champ-de-Mars, tour Eiffel et Trocadéro'),
 'national-park': ('grandstaff', CH, 'feuille de route (démo camping) — gorges du Verdon'),
 'r5-housing': ('housing', CH, 'carte « logement » (Lyon) — quai Saint-Vincent, Lyon'),
 'r5-house1': ('roadmap-desktop', TH, 'maquette feuille de route — vignette 1 (île Feydeau, Nantes)'),
 'r5-house2': ('roadmap-desktop', TH, 'maquette feuille de route — vignette 2 (allée Turenne, Nantes)'),
 'r5-house3': ('roadmap-desktop', TH, 'maquette feuille de route — vignette 3 (Trentemoult, Rezé)'),
 'r5-house4': ('roadmap-desktop', TH, 'maquette feuille de route — vignette 4 (immeuble Perraudeau, Nantes)'),
 'r5-house5': ('roadmap-desktop', TH, 'maquette feuille de route — vignette 5 (immeuble haussmannien)'),
 'r5-passport-cover': ('passport-cover, passport-book, passport-card, passport-thumbnail',
                       'redressée (perspective), détourée du fond, redimensionnée dans le gabarit de chaque image d’origine',
                       'couverture de passeport français (accueil, feuille de route, animation « bientôt »)'),
 'pharmacy-lakeside': ('pharmacy-lakeside', CH + ', coins arrondis d’origine', 'démo pharmacies'),
 'pharmacy-ridgeview': ('pharmacy-ridgeview', CH + ', coins arrondis d’origine', 'démo pharmacies'),
 'pharmacy-town-center': ('pharmacy-town-center', CH + ', coins arrondis d’origine', 'démo pharmacies'),
 'camp-apache': ('camp-apache', CH, 'démo camping'),
 'camp-brookchar': ('camp-brookchar', CH + ', coins arrondis d’origine', 'démo camping'),
 'camp-hoyer': ('camp-hoyer', CH, 'démo camping'),
 'camp-winn': ('camp-winn', CH, 'démo camping'),
 'campground': ('campground', CH, 'démo camping / feuille de route'),
 'goose-island': ('goose-island', CH, 'démo camping / feuille de route (Civray-de-Touraine)'),
 'sand-flats': ('sand-flats', CH + ' (bandeau)', 'démo camping / feuille de route (Irancy)'),
 'hd-baguette': ('hotdog-top', 'détourée (fond blanc retiré), redimensionnée dans la boîte de la pièce d’origine', 'hot-dog de l’accueil — pain du dessus'),
 'hd-baguette3': ('hotdog-bottom', 'détourée (fond blanc retiré), redimensionnée dans la boîte de la pièce d’origine', 'hot-dog de l’accueil — pain du dessous'),
}
AUTHOR_FIX = {'r5-privacy': 'William Crochot (Medium69)'}  # Commons "Artist" field is a sentence; author named in it
def author(k, v):
    if k in AUTHOR_FIX: return AUTHOR_FIX[k]
    a = v['author']
    if 'unsplash.com' in v['credit']:
        parts = a.rsplit(' ', 1)
        if len(parts) == 2: a = f'{parts[0]} (Unsplash : {parts[1]})'
    return a
def lic_url(v):
    lu = v['licence_url'].replace('http://', 'https://').replace('/deed.en', '/')
    if not lu:  # public domain (PD-self) : the Commons File: page carries the dedication
        assert v['licence'].lower().startswith('public domain'), v
        return v['source_url']
    return lu if lu.endswith('/') else lu + '/'
out = []
for k, (base, ch, where) in USE.items():
    v = meta[k]; assert v['licence_on_page'], k
    out.append(dict(base=base, title=v['title'], author=author(k, v), licence=v['licence'], licence_url=lic_url(v),
                    source_url=v['source_url'], changes=ch))
json.dump(out, open(R + 'tools/i18n/photo-credits.json', 'w'), indent=1, ensure_ascii=False)
md = ['# Crédits photos (round 5 — 30/09/2026)', '',
      'Toutes les photos du site sont de **vraies photos** sous licence libre, prises sur Wikimedia Commons (dont des photos Unsplash versées sur Commons sous CC0). **Aucune image générée par IA** (vérification automatique : `tools/imgtools/photos/ai_check.py`). Licence vérifiée sur chaque page « File: » (métadonnées Commons + présence du modèle de licence sur la page). Version machine : `tools/i18n/photo-credits.json`. Téléchargement / métadonnées : `tools/imgtools/photos/fetch_real.py` → `photos/real/` (choix du round 5 : `real/picks-r5*.tsv`) ; pose : `photos/place_r5.py` (→ `place2.py`), fonds flous : `photos/backdrop.py` + `backdrop64.py`, tailles manquantes : `photos/srcset_fill.py`, passeports : `mocks/passport_r5.py`, vignettes de la maquette : `mocks/ui.py`.',
      '', 'Round 5 : scènes françaises emblématiques (Paris, Mont-Saint-Michel, Étretat, Provence, Chenonceau, Marseille, Annecy, Strasbourg, Nantes). Couverture de passeport : vraie photo d’un passeport français (Commons, CC BY-SA 4.0). Pages de données du passeport (`passport-details`, `passport-open`, `passport-both`, petites variantes `passport-card`) : maquette fictive « PASSEPORT DE DÉMONSTRATION », **floutée** et marquée d’un grand filigrane « SPÉCIMEN » (`mocks/passport_r5.py`).',
      '', 'Conservées d’origine (america.gov, non modifiées) : `passport-photo`, `passport-portrait` (portrait d’identité ; la maquette `passport-open` réutilise ce même portrait d’origine, flouté), `hotdog-dog` (saucisse, vraie photo d’origine).',
      '', 'Images | Emplacement | Titre | Auteur | Licence | Source | Modifications', '---|---|---|---|---|---|---']
for (k, (base, ch, where)), o in zip(USE.items(), out):
    md.append(f"`{base}` | {where} | {o['title']} | {o['author']} | [{o['licence']}]({o['licence_url']}) | [Commons]({o['source_url']}) | {ch}")
md += ['', 'Les photos sous CC BY-SA restent sous CC BY-SA dans leur version modifiée (recadrage, redressement).']
open(R + 'tools/overrides/PHOTO-CREDITS.md', 'w').write('\n'.join(md) + '\n')
print(len(out), 'entries')
