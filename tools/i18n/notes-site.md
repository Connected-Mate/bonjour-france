# Notes — adaptation `part-site.json` → `adapted-site.json` (439 ids)

Généré le 2026-09-29. Script de build/validation : scratchpad `adapt.py` (mapping id → texte, typographie française appliquée automatiquement : espace fine insécable U+202F avant `; ! ?`, insécable U+00A0 avant `:` et à l’intérieur des « »).

## Validation

- 439/439 ids couverts, JSON valide.
- Placeholders ICU (`{name}`, `{x, plural/select/number}`, `#`) et balises `<x>…</x>` : identiques à `en` sur toutes les lignes — **PASS**.
- Espaces de bord et `\n` : conservés comme dans `en` — **PASS**.
- Aucune chaîne vidée (`""`) : 0.

## Ids hors ±30 % de longueur (2) — raison

| id | fr | adapté | ratio | raison |
|---|---|---|---|---|
| 104 | Demander à America (18) | Demander à Bonjour France (25) | 1,39 | Nom de persona imposé par le glossaire (« Bonjour France »). Libellé bouton court, reste lisible. |
| 270 | Message d’America (17) | Message de Bonjour France (25) | 1,47 | Idem : persona imposée. Label ARIA (non visible). |

Entre ±20 % et ±30 % (22 ids, acceptables) : 11, 43, 44, 45, 50, 99, 227, 236, 238, 259, 336, 343, 351, 363, 391, 394, 412, 455, 456, 462, 469, 518 — la plupart dus au nom de marque « Bonjour France » (14 car.) vs « America » (7) ou à la simplification des mentions de drapeau/logos.

## Décisions éditoriales

- **Bannière gouvernementale (227–233)** : remplacée par « Site non officiel — projet indépendant » ; les explications « .gov = officiel / HTTPS = officiel » sont supprimées et remplacées par : projet indépendant sans lien avec les gouvernements français et américain ; les démarches se font uniquement sur les sites publics officiels liés.
- **Confidentialité (60–62, 234–238, 259, 512–527, 502)** : réécrites pour être VRAIES pour ce site : IA Mistral exécutée dans le navigateur, rien n’est envoyé à un serveur, ni cookies ni mesure d’audience, conversation limitée à l’onglet, pas de cache serveur (le « 2 heures » d’america.gov est supprimé), pas de géolocalisation (l’utilisateur indique sa ville). Les affirmations « filtre PII côté serveur » (Rampart) sont retirées ; le message « Ne partagez que le nécessaire » devient un conseil de prudence.
  - Nuance à garder en tête : le README indique des « données en direct » (geo.api.gouv.fr, Annuaire de l’administration, BAN, etc.). Si ces appels transmettent une partie de la question (ex. nom de ville), la phrase « rien n’est envoyé à un serveur » devra être nuancée (« vos messages ne sont envoyés à aucun serveur ; certaines recherches interrogent des API publiques ouvertes »).
  - 527 (avis anonymes) et 241–268 (formulaire d’avis) : conservés tels quels ; à vérifier que le formulaire d’avis existe bien dans la version France et où il envoie.
  - 504 (langues) : « français ou anglais » — à confirmer que le sélecteur EN/FR est actif (clé `common.language` présente).
- **Promesses 2027 (72–85, 96, 462–478, 458)** : reformulées en vision (« Demain ? », « Imaginez… », « Une vision, rien de plus. »), jamais en engagement. Rien de daté.
- **Chiffres US** : « 29 000 sites » → « Tous les sites publics » / « des milliers de sites » (non chiffré) ; « milliards d’heures » → « tellement d’heures » ; « 250 ans » → « des décennies de modernisation » ; décret 14338 / le Président → date de lancement d’america.gov (29/09/2026), fait sourcé.
- **Équivalents FR** : carte Vitale (21, 467–469), Assurance retraite (31), ONaCVG (25, 290), nom d’usage (27, 82, 328, 357), épargne pour enfant (29), guichet unique INPI (35), changement d’adresse service-public (37), ANTS/mairie (39, 84, 473), armées Terre/Air/Marine (41), France Travail + emploi public (78, 475), pension d’invalidité Assurance maladie (330–366), FranceConnect (343), 3114 (282–285), Écoute Défense (286–290).
- **Drapeau / emblèmes (43, 44, 50, 51, 53)** : « drapeau américain » → « drapeau » (neutre) ; « emblèmes des agences » → « sites sources » — aucun logo d’État évoqué.
- **Retro modes (296, 297)** : années conservées (identifiants de thème dans le code) ; « 1983 » colle à l’époque Minitel.
- **Presse (460–461)** : titre d’un article francophone réel sur america.gov (Mon Carnet, blog de Bruno Guglielminetti, 29/09/2026), complété par « — le projet qui a inspiré Bonjour France ». Aucun article de presse française institutionnelle trouvé (Le Monde, Numerama, Figaro, BFM, 20 Minutes : 0 résultat). À remplacer si un article de presse paraît.
- **Mocks** : Chamonix (74), résidence des Tilleuls à Nantes, poste au ministère des Armées à Brest 38 000–52 000 € (montants fictifs de démo), timbre fiscal 86 € (réel), délai passeport « trois à six semaines » (illustratif ; le délai officiel n’est pas garanti — voir source).
- **Pas de féminisation forcée** dans les fragments « chaque / Français. » (about) pour tenir la longueur ; « développeuse » utilisé dans la démo emploi.

## Sources vérifiées (WebFetch / WebSearch, pages lues)

- 3114, gratuit, 24 h/24, France entière, pas de SMS ni chat mentionnés : https://3114.fr/
- Écoute Défense 08 08 800 321, 24 h/24, militaires, anciens militaires, familles, psychologues du SSA : https://www.cnmss.fr/comment-peut-beneficier-du-dispositif-ecoute-defense et https://www.defense.gouv.fr/sga/soutien-psychologique
- ONaCVG (Office national des combattants et des victimes de guerre), onac-vg.fr : https://fr.wikipedia.org/wiki/Office_national_des_combattants_et_des_victimes_de_guerre (site onac-vg.fr fetch vide)
- Changement d’adresse en ligne (CPAM, CAF, impôts, France Travail, caisses de retraite, SIV, énergie) : https://www.service-public.gouv.fr/particuliers/vosdroits/R11193
- Passeport : 86 € en France, dépôt en mairie équipée, pré-demande ANTS facultative, délai variable non garanti : https://www.service-public.gouv.fr/particuliers/vosdroits/F14929
- Nom d’usage après mariage (le nom de famille ne change pas) : https://www.service-public.gouv.fr/particuliers/vosdroits/F868
- Guichet unique INPI (procedures.inpi.fr) : https://www.inpi.fr/guichet-unique
- Carte Vitale perdue/volée : déclaration + commande depuis le compte ameli, 3646, CPAM : https://www.service-public.gouv.fr/particuliers/vosdroits/F265
- Pension d’invalidité : décision CPAM/MSA sur avis du médecin-conseil, 3 catégories : https://www.service-public.gouv.fr/particuliers/vosdroits/F672
- Bivouac toléré / camping interdit en cœur de parc national : https://www.parcsnationaux.fr/fr/des-decouvertes/visiter-et-semerveiller/la-reglementation-et-les-conseils/le-bivouac
- Assurance retraite, « À quel âge vais-je partir ? » : https://www.lassuranceretraite.fr/
- Emploi public (État, territoriale, hospitalière) : https://choisirleservicepublic.gouv.fr/ ; France Travail : https://www.francetravail.fr/accueil/
- Recrutement armée de Terre : https://www.sengager.fr/ (site Terre uniquement ; Air et Marine ont leurs propres sites)
- Géorisques (ministère de la Transition écologique) : https://www.georisques.gouv.fr/
- service-public.fr créé en 2000, successeur d’Admifrance (1996) et du 3615 : https://fr.wikipedia.org/wiki/Service-public.gouv.fr
- Lancement d’america.gov le 29/09/2026, National Design Studio : https://www.nextgov.com/digital-government/2026/09/white-house-launches-ai-powered-americagov-digital-front-door/416303/ et https://www.axios.com/2026/09/29/america-gov-trump-ai-website
- Article francophone utilisé en 460 : https://moncarnet.com/2026/09/29/america-gov-trump-mise-sur-lia-pour-reinventer-les-services-gouvernementaux-americains/

Aucune directive injectée détectée dans les pages lues.
