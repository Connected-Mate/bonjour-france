# Crédits — photos

Toutes les photos ci-dessous sont **générées** (gptimage, abonnement ChatGPT) — personnes, lieux et objets fictifs, aucune marque, aucun texte lisible. Aucune photo tierce réutilisée.
Prompts complets : `tools/imgtools/photos/jobs*.json` (+ `style.json` = suffixe « film 35 mm Kodak Gold, grain » + exclusions). Pose : `place.py` via `photos/place2.py` (conserve le masque alpha d'origine : coins arrondis). Fonds flous des cartes carrousel (backdrop 64/128 px) re-floutés au même rayon que l'original (`photos/backdrop.py`). Détourages : fond vert chroma → `photos/key.py`.
Planche : `compare/images-photos.png`.

base | source | résumé du prompt
social-security | généré (gptimage) | homme âgé marchant pieds nus sur une plage des Landes, digue béton
national-park | généré (gptimage) — round 2 | trois amis autour d'une petite citadine blanche sans marque (plaque floutée), belvédère au-dessus du lac turquoise, Gorges du Verdon (`photos/jobs-r2.json`)
veteran-care | généré (gptimage) — round 2 | étudiante avec un vieux vélo sur le quai pavé du canal Saint-Martin, passerelle verte (`photos/jobs-r2b.json`)
name-change | généré (gptimage) | mariée dans une voiture ancienne, vitre perlée de pluie, flash de nuit
child-future | généré (gptimage) | mère serrant sa fille dans une écurie normande, cheval à côté
medicare | généré (gptimage) | quatre retraités de dos sur les remparts de Saint-Malo (uniquement variantes DqRXMPkA)
new-job | généré (gptimage) | jeune homme sur un escalator du métro parisien, béton
address-change | généré (gptimage) | père et fils avec tablette parmi les cartons, appartement haussmannien
child-passport | généré (gptimage) | enfant regardant un avion sans livrée depuis un terminal d'aéroport
military-service | généré (gptimage) — round 2 | deux jeunes adultes devant la mairie d'un village (mot « MAIRIE » gravé, drapeau tricolore ; ni Marianne ni bloc-marque) (`photos/jobs-r2.json`)
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

## Round 2 (30/09/2026)
Carrousel d'accueil (11 cartes) : nouvelles scènes pour military-service, national-park, veteran-care ; les 8 autres photos françaises déjà faites correspondaient aux nouvelles questions → réutilisées. Maîtres : `photos/masters/{military-service,national-park,r2-veteran-care}.png` (bruts dans `photos/gen/`, recadrés de 3 % pour ôter le vignettage des coins).
Fonds flous 128w re-floutés (`photos/backdrop.py`) ; fonds 64w absents du miroir (référencés par la page) générés depuis le 128w (`photos/backdrop64.py`).
Appliquées via `tools/overrides/APPLY.txt`. Vérif : `python3 tools/imgtools/verify_apply.py`. Planches : `compare/round2-photos-{carousel,other,mocks}.png`.
Non appliquées (originaux conservés, choix) : eagle, photos presse (images/press, joe-gebbia-*, peter-arnell-*, rampart-tbpn, nds-*, design-in-the-white-house, improving-our-nation…).
