# Notes — adaptation legal + mocks (Bonjour France)

Source : `part-legal-mocks.json` (374 lignes) → `adapted-legal-mocks.json` (374 ids, 3 vides).
Date de référence : 29 septembre 2026.

## Sources vérifiées en ligne (WebFetch / WebSearch, lues le 29/09/2026)
- https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement — adresse GitHub, Inc. : « 88 Colin P. Kelly Jr. St., San Francisco, CA 94107, United States » ; collecte « IP address, device information, session details, date and time of requests… ».
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages — « When a GitHub Pages site is visited, the visitor's IP address is logged and stored for security purposes… » → repris en §3 et §5 (journaux) de la politique.
- https://www.service-public.gouv.fr/particuliers/vosdroits/F14929 — timbre fiscal passeport majeur : 86 € en France (43 € en Guyane, 96 € à l’étranger), page « vérifiée le 08 avril 2026 » ; délais : « Les délais de fabrication dépendent du lieu et de la période de la demande » ; pré-demande en ligne facultative ; photo < 6 mois. → id 732 « Payer 86,00 € », id 724.
- https://passeport.ants.gouv.fr/ (via WebSearch ; ants.gouv.fr en direct = page vide / socket hang up) — pré-demande passeport sur « France Titres (ANTS) » → libellé retenu « France Titres (ANTS) ».
- https://choisirleservicepublic.gouv.fr/ — « Retrouvez toutes les offres d'emploi de la fonction publique » (contexte offres d’emploi, ids 659-668).
- https://www.lassuranceretraite.fr/ — « L'Assurance retraite – La retraite de la Sécurité sociale » → id 593.
- ameli.fr (WebSearch, page carte Vitale /assure/.../commander-une-carte-vitale ; l’URL /principes/carte-vitale renvoie 404) — commande carte Vitale depuis le compte ameli, gratuite → ids 608, 655, 656, 784.
- Aucune directive injectée détectée dans les pages lues.

## Ids mis à "" (vide)
- **193** — paragraphe Rampart (classifieur PII) : Bonjour France n’applique aucun filtre ; la balise `<rampart>…</rampart>` ne peut être conservée sans mentir. Paragraphe supprimé.
- **736** — « Español » : sélecteur de langue, site français uniquement.
- **801** — « Respuestas » : mot de démo espagnol (how-it-works), supprimé.

## Structure légale réutilisée (mêmes clés, titres restent titres)
- Terms §1 (157) : éditeur = Alexandre Cormeraie, projet indépendant non officiel. §4 (169-170) : code source GitHub, crédit design America.gov / National Design Studio, aucune Marianne / bloc-marque.
- Privacy §3 (196-201) : hébergement GitHub Pages, journaux IP côté hébergeur, aucune localisation. §4 (204-205) : localStorage préférences + compteur d’étoiles, cache modèle. §5 (210-216) : vote = étoile GitHub via api.github.com, aucun cache de réponses, cache modèle (huggingface.co, cdn.jsdelivr.net, raw.githubusercontent.com). §6 (217-222) : **Mentions légales** — éditeur (particulier, contact LinkedIn), hébergeur GitHub, Inc. + adresse, services tiers contactés par le navigateur. §7 (224) : HTTPS, sans serveur.
- 139 conserve `{date}` ; 810 / 813 (dates rendues en dur) → « Dernière mise à jour : 29 septembre 2026 ».

## Choix d’adaptation notables
- **541** — Great Seal alt text: no state emblem used; neutral project symbol
- **545** — US figure (10 billion hours) has no verified French equivalent; kept unquantified
- **563** — US certifications (GSA ATO) replaced by true trust facts
- **603** — US passport card has no French equivalent; CNI (travel in EU/Schengen) used
- **627** — 'Coming in 2027' would promise a real service; replaced by a vision label
- **661** — illustrative salary range; not an official grid
- **674** — French law: marriage gives a nom d’usage, birth name unchanged
- **708** — feet/inches pair mapped to m/cm pair so two fields still make sense (e.g. 1 / 75)
- **719** — illustrative vision option; French passports are collected at the mairie today
- **732** — timbre fiscal passeport majeur = 86 € (service-public.gouv.fr F14929, vérifié 08/04/2026)
- **788** — Medicare-at-65 question mapped to retirement (Assurance retraite) rather than Assurance maladie, which everyone already has
- **799** — N-400 = US naturalization form; French equivalent is the naturalisation cerfa
- 545-547 : chiffre US « 10 milliards d’heures » sans équivalent français vérifié → « d’innombrables heures » (pas de statistique inventée).
- 563-566 (« Fondé sur la confiance ») : certifications US (GSA, NSA, CISA) remplacées par des faits vrais du projet (code ouvert, aucune donnée, IA locale, non commercial).
- 707/708 : « Taille (pieds) / (pouces) » → « Taille (en m) / (en cm) » pour garder deux champs cohérents ; les valeurs rendues (ex. 5 / 11) devront être adaptées côté mock si elles existent (ex. 1 / 75).
- 803-809 : fragments surlignés d’une phrase (« Ohio, retiring January. husband Medicare, covered enroll? ») → « Rhône, retraite janvier. époux retraité, couverte adhérer ? » ; la phrase complète vit dans d’autres lignes (part-site) → vérifier la cohérence grammaticale au montage.
- 738-745 : noms/adresse/carte fictifs → Louis-Marie Martin, Julien Durand, Camille Martin, 12 rue des Lilas 69003 Lyon, SOLÈNE DURAND, FR-1RXZPD.
- 755-768 : pharmacies fictives à Lyon (Bellecour, du Centre, Foch) ; campings fictifs Parc national des Écrins (05800 Valgaudémar).
- Fuites glossaire volontaires : 170 (crédit design « America.gov, National Design Studio »), 219 (« États-Unis » dans l’adresse de GitHub).

## Typographie
Espaces insécables U+00A0 appliquées avant : ; ! ? » et après « ; apostrophes typographiques ’ ; vouvoiement partout (contrôle regex tu/ton/ta/tes = 0).

## Validation (python3 validate_legal.py)
```
rows 374 adapted 374
FAILS 0
EMPTY ['193', '736', '801']
LENGTH OUTLIERS 9
  ('743', 8, 6, 0.75, 'DURAND')
  ('749', 152, 192, 1.26, 'Bonjour France utilise une IA dans votre navigateu')
  ('773', 11, 14, 1.27, 'Changer de nom')
  ('774', 14, 17, 1.21, '12 rue des Lilas,')
  ('796', 17, 22, 1.29, 'Ajouter Pharmacie Foch')
  ('806', 7, 5, 0.71, 'époux')
  ('809', 7, 9, 1.29, 'adhérer\xa0?')
  ('810', 32, 40, 1.25, 'Dernière mise à jour\xa0: 29 septembre 2026')
  ('813', 31, 40, 1.29, 'Dernière mise à jour\xa0: 29 septembre 2026')
LEAK CHECK (America.gov/Medicare/Virginie/USPS/IRS/Cloudflare/GSA/États-Unis):
  ('170', 'Certains éléments ne nous appartiennent pas\xa0: le design d’or')
  ('219', 'Éditeur\xa0: Alexandre Cormeraie, particulier, qui publie Bonjo')
```
Outliers de longueur restants (hors 810/813 imposés) : 743 (DURAND 6 vs 8), 749 (1,26), 773 (« Changer de nom » 14 vs 11), 774 (1,21), 796 (1,29), 806 (« époux » 5 vs 7), 809 (1,29) — tous des libellés courts où la contrainte ±20 % est mécaniquement dure ; sens et place à l’écran préservés.
