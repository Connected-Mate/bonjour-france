# Round 3: write tools/i18n/photo-credits.json (machine) + tools/overrides/PHOTO-CREDITS.md (human) from
# photos/real/meta.json (licence metadata read from each Commons File: page by fetch_real.py).
import json, re
R = '/Users/0104389S/Projects/hello-france/'
meta = json.load(open(R + 'tools/imgtools/photos/real/meta.json'))
CH = 'recadrée, redimensionnée'
USE = {  # key -> (bases/place, changes, where on the site)
 'new-business': ('new-business', CH + ' ; fonds flous du carrousel', 'carrousel — micro-entreprise (Urssaf)'),
 'address-change': ('address-change', CH + ' ; fonds flous du carrousel', 'carrousel — déménagement'),
 'child-passport': ('child-passport', CH + ' ; fonds flous du carrousel', 'carrousel — passeport'),
 'military-service': ('military-service', CH + ' ; fonds flous du carrousel', 'carrousel — listes électorales (mairie de Gasny, Eure)'),
 'child-future': ('child-future', CH + ' ; fonds flous du carrousel', 'carrousel — prime d’activité'),
 'social-security': ('social-security', CH + ' ; fonds flous du carrousel', 'carrousel — carte Vitale (plage de Trouville)'),
 'national-park': ('national-park', CH + ' ; fonds flous du carrousel', 'carrousel — permis de conduire (gorges du Verdon)'),
 'veteran-care': ('veteran-care', CH + ' ; fonds flous du carrousel', 'carrousel — APL / logement étudiant (canal Saint-Martin)'),
 'name-change': ('name-change', CH + ' ; fonds flous du carrousel', 'carrousel — mariage'),
 'medicare': ('medicare', CH + ' ; fonds flous du carrousel (variantes medicare.DqRXMPkA_* uniquement)', 'carrousel — retraite'),
 'new-job': ('new-job', CH + ' ; fonds flous du carrousel', 'carrousel — France Travail (couloir du métro parisien)'),
 'crowd': ('crowd', CH + ' (carré)', 'fonctionnalités — foule (jardin du Luxembourg, Paris)'),
 'privacy': ('privacy', CH + ' (carré)', 'fonctionnalités — confidentialité'),
 'passport': ('passport', CH, 'fonctionnalités — mer de nuages (Mont d’Or, Doubs)'),
 'family': ('family', CH, 'manifeste — famille'),
 'grandstaff': ('grandstaff', CH, 'feuille de route (démo) — ciste cotonneux, massif de la Clape'),
 'housing': ('housing', CH, 'carte « logement » (Pontoise)'),
 'house1': ('roadmap-desktop', 'recadrée en vignette carrée 120 px à coins arrondis, insérée dans la maquette', 'maquette feuille de route — vignette 1'),
 'house2': ('roadmap-desktop', 'recadrée en vignette carrée 120 px à coins arrondis, insérée dans la maquette', 'maquette feuille de route — vignette 2'),
 'house3': ('roadmap-desktop', 'recadrée en vignette carrée 120 px à coins arrondis, insérée dans la maquette', 'maquette feuille de route — vignette 3'),
 'house4': ('roadmap-desktop', 'recadrée en vignette carrée 120 px à coins arrondis, insérée dans la maquette', 'maquette feuille de route — vignette 4'),
 'house5': ('roadmap-desktop', 'recadrée en vignette carrée 120 px à coins arrondis, insérée dans la maquette', 'maquette feuille de route — vignette 5'),
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
def author(v):
    a = v['author']
    if 'unsplash.com' in v['credit']:
        parts = a.rsplit(' ', 1)
        if len(parts) == 2: a = f'{parts[0]} (Unsplash : {parts[1]})'
    return a
out = []
for k, (base, ch, where) in USE.items():
    v = meta[k]
    lu = v['licence_url'].replace('http://', 'https://').replace('/deed.en', '/')
    if not lu.endswith('/'): lu += '/'
    assert v['licence_on_page'], k
    out.append(dict(base=base, title=v['title'], author=author(v), licence=v['licence'], licence_url=lu,
                    source_url=v['source_url'], changes=ch))
json.dump(out, open(R + 'tools/i18n/photo-credits.json', 'w'), indent=1, ensure_ascii=False)
md = ['# Crédits photos (round 3 — 30/09/2026)', '',
      'Toutes les photos du site sont de **vraies photos** sous licence libre, prises sur Wikimedia Commons (dont des photos Unsplash versées sur Commons sous CC0). **Aucune photo générée par IA.** Licence vérifiée sur chaque page « File: » (métadonnées Commons + présence du modèle de licence sur la page). Version machine : `tools/i18n/photo-credits.json`. Téléchargement / métadonnées : `tools/imgtools/photos/fetch_real.py` → `photos/real/` ; pose : `photos/place2.py`, fonds flous : `photos/backdrop.py` + `backdrop64.py`, tailles manquantes : `photos/srcset_fill.py`, hot-dog : `photos/hotdog_real.py`.',
      '', 'Conservées d’origine (america.gov, non modifiées) : `passport-photo`, `passport-portrait` (portrait d’identité : aucun portrait libre et sans ambiguïté de droit à l’image trouvé ; la maquette `passport-open` réutilise ce même portrait d’origine), `hotdog-dog` (saucisse, vraie photo d’origine).',
      '', 'Images | Emplacement | Titre | Auteur | Licence | Source | Modifications', '---|---|---|---|---|---|---']
for (k, (base, ch, where)), o in zip(USE.items(), out):
    md.append(f"`{base}` | {where} | {o['title']} | {o['author']} | [{o['licence']}]({o['licence_url']}) | [Commons]({o['source_url']}) | {ch}")
md += ['', 'Les photos sous CC BY-SA restent sous CC BY-SA dans leur version modifiée (recadrage).']
open(R + 'tools/overrides/PHOTO-CREDITS.md', 'w').write('\n'.join(md) + '\n')
print(len(out), 'entries')
