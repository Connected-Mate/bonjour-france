# Crédits — maquettes (mocks)

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
