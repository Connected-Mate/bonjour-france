/*
 * Bonjour, France — configuration (public file: never put a secret here).
 *
 * backend:
 *   "puter" (default) — Mistral through Puter.js (https://puter.com): no key, no server of ours;
 *                       each visitor uses their own free Puter access (a Puter window opens once).
 *   "relay"           — Mistral API through our Cloudflare Worker (/relay), set relayUrl below.
 *   "none"            — verified fiches + "Demander à Mistral" link only.
 */
window.BONJOUR_CONFIG = {
  backend: "puter",
  relayUrl: "",
  puter: {
    script: "https://js.puter.com/v2/",
    // tried in order; the next one is used if Puter does not know a model id
    models: ["mistral-medium-latest", "mistral-small-latest", "ministral-14b-latest"],
  },
};
