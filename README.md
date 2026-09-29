# Hello France

**Site non officiel — projet indépendant, sans lien avec le gouvernement français ni le gouvernement américain.**

Hello France imagine une porte d’entrée unique vers les démarches en France : vous posez votre question en français, un modèle **Mistral** exécuté dans votre navigateur vous répond simplement, et vous renvoie vers les pages officielles.

- Site : https://connected-mate.github.io/hello-france/
- Inspiré de [america.gov](https://america.gov/) — design original : [National Design Studio](https://ndstudio.gov/)
- Réalisé par [Alexandre Cormeraie](https://www.linkedin.com/in/alex-cormeraie/)

**Votez pour que ça devienne officiel : ajoutez une étoile à ce dépôt.**

## Comment ça marche

| Brique | Détail |
| --- | --- |
| IA | [WebLLM](https://github.com/mlc-ai/web-llm) 0.2.85 + Ministral 3B (par défaut) ou Mistral 7B v0.3, via WebGPU, dans un Web Worker. Aucun serveur, aucune clé. |
| Sans WebGPU | Réponse issue de la fiche vérifiée correspondante (sans IA), avec les liens officiels. |
| Fiches | `assets/data/kb.json` — 60 fiches, sources officielles vérifiées (septembre 2026). |
| Données en direct | geo.api.gouv.fr, Annuaire de l’administration, Base Adresse Nationale, Annuaire des Entreprises, API Jours fériés, data.gouv.fr, Open-Meteo. |
| Votes | Étoiles GitHub, lues via l’API publique (cache 10 min, repli si limite atteinte). |

Brancher plus tard une API Mistral : dans `assets/js/config.js`, `ai.provider = "api"` et `ai.api.endpoint` = l’URL d’un **proxy** compatible OpenAI (streaming SSE) qui garde la clé côté serveur. Ne jamais mettre de clé dans ce dépôt.

## Développer

Site statique, sans dépendance. Les pages sont assemblées depuis `src/` :

```sh
python3 build.py              # régénère les pages .html à la racine
python3 -m http.server 8000   # puis ouvrir http://localhost:8000/
```

## Licence

Code sous licence MIT. Photos générées par IA pour ce projet (voir `assets/img/CREDITS.md`). Aucun fichier, image ni code d’america.gov n’est repris. Aucun emblème officiel de l’État n’est utilisé.
