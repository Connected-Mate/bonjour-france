# Bonjour, France

**Site non officiel — projet indépendant, sans lien avec les gouvernements français ou américain.**

Bonjour, France reprend à l’identique l’interface d’[america.gov](https://america.gov/) (design original : [National Design Studio](https://ndstudio.gov/)) et la réécrit pour la France : vous posez votre question en français, **Mistral** vous répond dans le chat du site et vous renvoie vers les sites publics officiels.

- Site : https://connected-mate.github.io/bonjour-france/
- Réalisé par [Alexandre Cormeraie](https://www.linkedin.com/in/alex-cormeraie/)

**Votez pour que ça devienne officiel : ajoutez une étoile à ce dépôt.**

## Comment c’est fait

| Brique | Détail |
| --- | --- |
| Interface | Le vrai front-end d’america.gov (Astro + React), téléchargé tel quel puis adapté par `tools/build.py`. |
| Textes | Tout le texte est en français, adapté à la France (`tools/i18n/`). |
| Assistant | Démonstration : aucun appel à une IA depuis le site. La réponse affiche le logo Mistral, un bouton « Poser la question à Mistral » (ouvre chat.mistral.ai avec la question) et la fiche vérifiée (`tools/static/kb.json`) quand un sujet correspond. |
| PDF | Lus dans le navigateur ([LiteParse](https://www.npmjs.com/package/@llamaindex/liteparse-wasm), Apache-2.0). |
| Votes | Étoiles GitHub, lues via l’API publique (cache 10 min, repli si indisponible). |
| Serveurs d’america.gov | Aucun appel : API, vérification anti-robot, rapports d’erreurs et avis sont neutralisés (`tools/static/bonjour.js`). |

## Ce qui a été remplacé

- **Images** : les logos, icônes, photos et illustrations d’america.gov sont conservés tels quels. Seuls les sceaux et emblèmes officiels du gouvernement américain (dont l’usage est encadré, 18 U.S.C. 713) sont remplacés par des médaillons neutres. Aucun logo de l’État français, aucune Marianne.
- **Nom** : « America.gov » devient « Bonjour, France » (textes, logo, cartes de partage).
- **Polices** : Helvetica Now et Rhymes sont commerciales. Elles sont remplacées par [Geist](https://github.com/vercel/geist-font) et [Newsreader](https://github.com/productiontype/Newsreader) (SIL OFL 1.1).

## Reconstruire

```sh
python3 tools/build.py        # _mirror/ + tools/ -> docs/ (source GitHub Pages)
python3 tools/check_english.py
```

`_mirror/` (copie brute d’america.gov, polices commerciales comprises) reste en local et n’est pas publié.

Aperçu local : servir le dossier parent de `docs/` sous le chemin `/bonjour-france/`.
