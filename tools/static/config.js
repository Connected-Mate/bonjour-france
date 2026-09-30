/*
 * Bonjour, France — configuration (public file: never put a secret here).
 *
 * relayUrl: address of the Mistral relay (Cloudflare Worker in /relay), e.g.
 *   "https://bonjour-france-relay.<your-subdomain>.workers.dev"
 * Empty = the relay is not switched on yet: the chat answers with verified fiches and
 * offers to open the question in Mistral's own chat.
 */
window.BONJOUR_CONFIG = {
  relayUrl: "",
};
