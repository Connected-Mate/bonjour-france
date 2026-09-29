# Bonjour, France

**Site non officiel — projet indépendant, sans lien avec les gouvernements français ou américain.**

Bonjour, France reprend à l’identique l’interface d’[america.gov](https://america.gov/) (design original : [National Design Studio](https://ndstudio.gov/)) et la réécrit pour la France : vous posez votre question en français, un modèle **Mistral** exécuté dans votre navigateur vous répond simplement et vous renvoie vers les sites publics officiels.

- Site : https://connected-mate.github.io/bonjour-france/
- Réalisé par [Alexandre Cormeraie](https://www.linkedin.com/in/alex-cormeraie/)

**Votez pour que ça devienne officiel : ajoutez une étoile à ce dépôt.**

## Comment c’est fait

| Brique | Détail |
| --- | --- |
| Interface | Le vrai front-end d’america.gov (Astro + React), téléchargé tel quel puis adapté par `tools/build.py`. |
| Textes | Tout le texte est en français, adapté à la France (`tools/i18n/`). |
| IA | [WebLLM](https://github.com/mlc-ai/web-llm) 0.2.85 + Mistral 7B Instruct v0.3 (WebGPU), dans le navigateur. Le modèle est téléchargé une seule fois, après accord de la personne. Aucun serveur, aucune clé. |
| Sans WebGPU | Réponse issue de fiches vérifiées (`tools/static/kb.json`), sans IA, avec les liens officiels. |
| PDF | Lus dans le navigateur ([LiteParse](https://www.npmjs.com/package/@llamaindex/liteparse-wasm), Apache-2.0). |
| Votes | Étoiles GitHub, lues via l’API publique (cache 10 min, repli si indisponible). |
| Serveurs d’america.gov | Aucun appel : API, vérification Cloudflare, rapports d’erreurs et avis sont neutralisés (`tools/static/bonjour.js`). |

## Ce qui a été remplacé

- **Images** : sceaux, logos d’agences, photos et maquettes américaines remplacés par des images générées ou dessinées (voir `tools/overrides/IMAGE-CREDITS.md`). Aucun logo de l’État français, aucune Marianne.
- **Polices** : Helvetica Now et Rhymes sont commerciales. Elles sont remplacées par [Geist](https://github.com/vercel/geist-font) et [Newsreader](https://github.com/productiontype/Newsreader) (SIL OFL 1.1).

## Reconstruire

```sh
python3 tools/build.py        # _mirror/ + tools/ -> docs/ (source GitHub Pages)
python3 tools/check_english.py
```

`_mirror/` (copie brute d’america.gov, polices commerciales comprises) reste en local et n’est pas publié.

Aperçu local : servir le dossier parent de `docs/` sous le chemin `/bonjour-france/`.
