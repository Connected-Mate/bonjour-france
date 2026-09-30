# Relais Mistral de Bonjour, France

Petit Cloudflare Worker qui garde la clé de l’API Mistral côté serveur. Le site (statique, GitHub Pages) lui envoie la question ; le relais la transmet à l’API Mistral (`mistral-small-latest`, en streaming) et renvoie la réponse, qui s’affiche dans le chat du site.

- Clé : uniquement dans le secret `MISTRAL_API_KEY` (jamais dans le dépôt).
- Accès : seule l’origine `https://connected-mate.github.io` est acceptée (`ALLOWED_ORIGINS`).
- Limite : 10 questions par minute et par adresse IP (binding `RATE_LIMITER`).
- Entrées bornées : 12 messages, 4 000 caractères par message, 12 000 au total.
- Consigne système fixe (assistant des services publics, réponses en français) : `src/lib.js`.
- Rien n’est stocké ni journalisé par le relais.

## Mise en service (une fois)

Il faut : un compte Mistral AI avec une clé API (console.mistral.ai → API Keys) et un compte Cloudflare (gratuit).

```sh
cd relay
npm install
npx wrangler login                      # ouvre Cloudflare dans le navigateur
npx wrangler secret put MISTRAL_API_KEY # colle la clé Mistral
npx wrangler deploy                     # affiche l’adresse https://bonjour-france-relay.<sous-domaine>.workers.dev
```

Puis, dans `tools/static/config.js`, mettre cette adresse dans `relayUrl`, lancer `python3 tools/build.py`, committer et pousser. Le site passe alors en mode « Mistral » (réponses avec le logo Mistral). Tant que `relayUrl` est vide, le chat répond avec les fiches vérifiées et propose d’ouvrir la question dans le chat de Mistral.

Conseil : dans la console Mistral, fixer une limite de dépense mensuelle et désactiver l’usage des données pour l’entraînement (Privacy).

## Tests

```sh
npm test                                   # tests unitaires et d’intégration (amont simulé)
npx wrangler dev --port 8797               # essai local (variables dans .dev.vars)
```
