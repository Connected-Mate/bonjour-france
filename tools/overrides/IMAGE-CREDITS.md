# Bonjour France — crédits des images

Site non officiel, projet de fans indépendant. **Aucune photo tierce n'est utilisée : toutes les images remplacées sont « généré ».**
Aucun sceau, emblème ou logo réel (américain ou français) : pas de Marianne, pas de bloc-marque, pas de drapeau utilisé comme marque de l'État, pas de marques de presse.

- Photos : générées par IA (gptimage, abonnement ChatGPT du propriétaire du projet), personnes et lieux fictifs.
- Maquettes d'interface, médaillons, vignettes de sites, logos : dessinés par programme (Python / SVG → resvg), polices Geist et Newsreader (SIL OFL 1.1, voir `fonts/`).
- Sources et scripts pour tout régénérer : `tools/imgtools/` (`lead/`, `mocks/`, `photos/`), vérification : `tools/imgtools/verify.py`.

## Généré par programme (lead)

base(s) | source | note
---|---|---
49 vignettes de sites « orbite » (usa, va, ssa, irs, commerce, doi, nps, nasa, noaa, epa, cdc, nih, fda, medicare, …) | généré (SVG) | pages fictives de services publics en français, noms génériques, photos générées réutilisées ; bandeau « Site de démonstration — non officiel » ; aucun logo
sceaux / emblèmes (seal-*, fallback-*, images/home/seals/*, images/agency-seals/*, images/seals/*, great-seal, treasury, gsa-gold-seal, medicare-seal, veterans-crisis-line-seal, government-*-seal, name-change-*, ssa.gov, state.gov, cbp.gov, navy, employment-navy, cbp/gsa/nasa png) | généré (SVG) | famille de médaillons neutres « SERVICES PUBLICS • <THÈME> », pictogrammes génériques ; collectivités fictives (Val-Fleuri, Bellerive, Port-Clair, Région des Lacs…)
america-wordmark (+ images/) | généré | « Bonjour France », Newsreader 500
images/social/america-og.png, america-twitter.png | généré | carte de partage « Bonjour France » + « Site non officiel »
favicon.ico, favicon.svg, apple-touch-icon.png, webclip | généré | bulle « B » neutre
images/home/footer/gsa.svg | généré | bulle « B » (masque CSS)
artwork.svg (texture du drapeau animé /about) | généré | bannière « Bonjour » marine/crème, pas de drapeau national
press logos (cnn, new-york-times, techcrunch, the-atlantic, wired ; _astro + images/press/logos) + fox-news.svg | généré | pictogramme + mot générique (PRESSE, RADIO-TÉLÉ, TECH, REVUE, MAGAZINE)
cms-logo | généré | « Santé & Retraite », logotype fictif

## Photos

Toutes les photos ci-dessous sont **générées** (gptimage, abonnement ChatGPT) — personnes, lieux et objets fictifs, aucune marque, aucun texte lisible. Aucune photo tierce réutilisée.
Prompts complets : `tools/imgtools/photos/jobs*.json` (+ `style.json` = suffixe « film 35 mm Kodak Gold, grain » + exclusions). Pose : `place.py` via `photos/place2.py` (conserve le masque alpha d'origine : coins arrondis). Fonds flous des cartes carrousel (backdrop 64/128 px) re-floutés au même rayon que l'original (`photos/backdrop.py`). Détourages : fond vert chroma → `photos/key.py`.
Planche : `compare/images-photos.png`.

base | source | résumé du prompt
social-security | généré (gptimage) | homme âgé marchant pieds nus sur une plage des Landes, digue béton
national-park | généré (gptimage) | amis sautant des rochers dans une rivière des Cévennes, forêt
veteran-care | généré (gptimage) | homme âgé debout sur la benne d'un petit pick-up blanc sans marque, quai breton
name-change | généré (gptimage) | mariée dans une voiture ancienne, vitre perlée de pluie, flash de nuit
child-future | généré (gptimage) | mère serrant sa fille dans une écurie normande, cheval à côté
medicare | généré (gptimage) | quatre retraités de dos sur les remparts de Saint-Malo (uniquement variantes DqRXMPkA)
new-job | généré (gptimage) | jeune homme sur un escalator du métro parisien, béton
address-change | généré (gptimage) | père et fils avec tablette parmi les cartons, appartement haussmannien
child-passport | généré (gptimage) | enfant regardant un avion sans livrée depuis un terminal d'aéroport
military-service | généré (gptimage) | jeune couple dans l'embrasure d'une maison de village, marinière, flash
new-business | généré (gptimage) | atelier vélo à Lyon, Fourvière par la fenêtre (master approuvé)
crowd (+ images/home/features/crowd) | généré (gptimage) | foule vue d'en haut sur une place pavée parisienne en automne
privacy (+ images/home/features/privacy) | généré (gptimage) | gros plan grand-mère joue contre joue avec un bébé
family (+ images/home/manifesto/family) | généré (gptimage) | mère avec bébé devant un ordinateur, appartement parisien
housing | généré (gptimage) | maisons mitoyennes en crépi, tuiles, volets blancs (résidence)
pharmacy-lakeside | généré (gptimage) | pharmacie de nuit au bord d'un lac, croix verte
pharmacy-ridgeview | généré (gptimage) | pharmacie de village en pierre, devanture noire, croix verte
pharmacy-town-center | généré (gptimage) | immeuble d'angle ocre, pharmacie au rez-de-chaussée
camp-apache | généré (gptimage) | camping Vercors : tonnelle rouge, tente, brasero
camp-brookchar | généré (gptimage) | sentier en sous-bois, tente orange, Ardèche
camp-hoyer | généré (gptimage) | tente jaune sous les pins des Landes
camp-winn | généré (gptimage) | prairie des Pyrénées, lupins, ruisseau
campground (+ roadmap/demo) | généré (gptimage) | van aménagé au crépuscule, Gorges du Tarn
goose-island (+ roadmap/demo) | généré (gptimage) | abri pique-nique sous falaise, Gorges de l'Ardèche
sand-flats (+ roadmap/demo) | généré (gptimage) | abri pique-nique sur les Causses, Pyrénées enneigées au loin
passport-photo | généré (gptimage) | portrait type identité d'une Française fictive, N&B, fond blanc
passport-portrait | généré (gptimage) | même portrait détouré (fond vert → alpha), N&B
eagle | généré (gptimage) | cigogne blanche sur une branche, fond gris clair (style de l'original en référence)
joe-gebbia-dezeen (+ images/press) | généré (gptimage) | table de studio de design parisien, croquis, maquettes — sans personne
joe-gebbia-free-press (+ images/press) | généré (gptimage) | fauteuil cuir vide dans un bureau-bibliothèque parisien
peter-arnell-joins-national-design-studio (+ images/press) | généré (gptimage) | N&B, deux fauteuils vides sur une scène
peter-arnell-techcrunch (+ images/press) | généré (gptimage) | scène vide, fauteuil, fond de panneaux bleus
rampart-tbpn (+ images/press) | généré (gptimage) | mains sur clavier + carnet de wireframes, vue du dessus
nds-fixing-broken-systems (+ images/press) | généré (gptimage) | main épinglant des croquis sur un mur d'atelier
design-in-the-white-house (+ images/press) | généré (gptimage) | salon lambrissé d'un bâtiment officiel français, bureau vide
improving-our-nation-through-better-design (+ images/press) | généré (gptimage) | collage abstrait de papiers déchirés sarcelle / ocre / crème / anthracite (palette neutre, pas de bleu-blanc-rouge)
hotdog-top / hotdog-dog / hotdog-bottom | généré (gptimage) | demi-baguette (dessus / dessous) + jambon plié, détourés, mêmes boîtes alpha que l'original

## Conservées (non remplacées)
passport + images/home/features/passport | généré (gptimage) | versant d’herbes dorées au-dessus d’une mer de nuages, Cévennes (remplace photo de colline californienne)
grandstaff + images/home/roadmap/demo/grandstaff | généré (gptimage) | ciste blanc en garrigue provençale

## Maquettes d’interface

Sources : `tools/imgtools/mocks/*.py` (rendu SVG → resvg, polices Geist / Newsreader / Menlo ; jamais Inter). Vérif : `mocks/verify.py` (77 fichiers, tailles/format/alpha identiques à l'inventaire). Planche : `compare/images-mocks.png`.

base | généré | note
---|---|---
passport-cover | PIL+SVG | cuir/bords/alpha d'origine gardés, décor or US effacé (inpainting) ; « PASSEPORT » + rosace géométrique + symbole puce OACI. Ni armoiries, ni nom de pays, ni emblème UE
passport-book | PIL+SVG | illustration plate, même bleu/or ; « PASSEPORT » + rosace + puce
passport-card (variantes livret sur fond bleu 906/640/384/256/128/64x42/32x21) | PIL+SVG | photo d'origine gardée (fond, ombre, cuir), décor remplacé comme ci-dessus
passport-card (variantes carte 100x64/64x41/32x20) | SVG | = page de données passport-details réduite
passport-both | SVG | = page de données réduite (alpha d'origine)
passport-thumbnail | PIL | livret neuf réduit dans le cadre blanc d'origine
passport-details | SVG | page de données fictive « PASSEPORT DE DÉMONSTRATION », SPÉCIMEN, nom/prénom et photo laissés vides (superposés en HTML par la page), MRZ P<FRASPECIMEN<<DEMONSTRATION, autorité « SERVICE FICTIF — DÉMONSTRATION », guilloché/rosace purement géométriques, aucun élément de sécurité réel
passport-open | SVG + gptimage | idem + page mentions ; portrait d'un homme fictif (gptimage, `mocks/photos/portrait.png`, N&B) à la place d'une personnalité réelle ; MARTIN Louis-Marie ; mention « ACCESSOIRE DE DÉMONSTRATION — NON VALABLE POUR VOYAGER »
passport-visa | SVG | logo VISA (marque tierce) → mot neutre « CARTE », même bleu, même cadre transparent (étape paiement de l'animation coming-soon)
camping-map (+ images/home/roadmap/demo/camping-map) | PIL (relief procédural) + SVG | vallée inventée « Chamonix / Argentière », N205/D506/D1506 ; mention HERE supprimée
wichita-map | SVG | plan de ville inventé « Lyon » (deux rivières), même style gris/vert/bleu, alpha d'origine gardé
pharmacy-map | PIL + SVG | carte inventée type agglomération lyonnaise, sans libellés (épingles superposées par la page)
roadmap-desktop | SVG + gptimage | cadre fenêtre d'origine gardé ; « Bonjour, France » (sans drapeau), recherche de logement à Nantes (Résidence des Tilleuls…), carte inventée type Loire ; 5 photos de logements générées (`mocks/photos/house1-5.png`)
roadmap-phone | SVG | cadre iPhone d'origine gardé ; « Vérifiez vos informations », Camille Martin (fictive) à la place d'une personne réelle
screen (+ images/home/roadmap/screen) | SVG | chat renouvellement passeport, Camille Martin, barre d'URL « bonjour-france » (pas de domaine .gouv.fr)
sources-panel | SVG | « Service des passeports / 2 sources », liens génériques, pictogramme document neutre à la place du sceau
camp (+ images/home/roadmap/demo/camp) | SVG | nouvelle tente simple (l'ancien pictogramme ressemblait à un logo d'appli de camping)
login | SVG | pastille blanche + ombre d'origine ; cadenas bleu marine à la place du bouclier Login.gov
trusted-traveler (+ images/home/roadmap/demo/trusted-traveler) | SVG | pastille d'origine ; écusson coché + arcs neutres à la place de l'étoile DHS

Conservés (non modifiés) : medication (gélule générique), iphone (cadre vide), passport-cursor / resume-cursor (curseur standard), summary-papers (feuilles + trombone, sans texte).
