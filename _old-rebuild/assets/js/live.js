// Clients for keyless, CORS-friendly French public APIs. Every function throws on failure;
// callers show a fallback.
import { fetchJSON } from "./common.js";

const GEO = "https://geo.api.gouv.fr";
const ANNUAIRE = "https://api-lannuaire.service-public.fr/api/explore/v2.1/catalog/datasets/api-lannuaire-administration/records";
const BAN = "https://api-adresse.data.gouv.fr/search/";
const ENTREPRISES = "https://recherche-entreprises.api.gouv.fr/search";
const FERIES = "https://calendrier.api.gouv.fr/jours-feries/metropole.json";
const METEO = "https://api.open-meteo.com/v1/forecast";
const DATAGOUV = "https://www.data.gouv.fr/api/1/datasets/?page_size=1";

const cache = new Map();
async function cached(key, ttlMs, fn) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.t < ttlMs) return hit.v;
  const v = await fn();
  cache.set(key, { v, t: Date.now() });
  return v;
}

/** Communes by name or postal code. */
export async function searchCommunes(q, { limit = 6, signal } = {}) {
  const query = q.trim();
  if (!query) return [];
  const fields = "nom,code,codesPostaux,population,departement,region,centre";
  const url = /^\d{5}$/.test(query)
    ? `${GEO}/communes?codePostal=${query}&fields=${fields}&limit=${limit}`
    : `${GEO}/communes?nom=${encodeURIComponent(query)}&fields=${fields}&boost=population&limit=${limit}`;
  return cached(url, 3e5, () => fetchJSON(url, { signal }));
}

const parseJSONField = (v) => {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  try { return JSON.parse(v); } catch { return []; }
};

const DAY = { Lundi: 1, Mardi: 2, Mercredi: 3, Jeudi: 4, Vendredi: 5, Samedi: 6, Dimanche: 7 };
const hhmm = (t) => (t ? t.slice(0, 5).replace(":", " h ") : "");

function formatHours(plages) {
  return parseJSONField(plages).map((p) => {
    const days = p.nom_jour_debut === p.nom_jour_fin ? p.nom_jour_debut : `${p.nom_jour_debut} – ${p.nom_jour_fin}`;
    const slots = [[p.valeur_heure_debut_1, p.valeur_heure_fin_1], [p.valeur_heure_debut_2, p.valeur_heure_fin_2]]
      .filter(([a, b]) => a && b)
      .map(([a, b]) => `${hhmm(a)}–${hhmm(b)}`)
      .join(", ");
    return { days, slots, order: DAY[p.nom_jour_debut] || 9, comment: p.commentaire || "" };
  }).filter((h) => h.slots).sort((a, b) => a.order - b.order);
}

/** Town hall(s) for an INSEE code (Paris/Lyon/Marseille return several). */
export async function findMairie(codeInsee, { signal } = {}) {
  const where = encodeURIComponent(`code_insee_commune="${codeInsee}" and pivot like "mairie"`);
  const select = "nom,adresse,telephone,site_internet,url_service_public,plage_ouverture,adresse_courriel";
  const url = `${ANNUAIRE}?where=${where}&select=${select}&limit=5`;
  const data = await cached(url, 3e5, () => fetchJSON(url, { signal }));
  return (data.results || []).map((r) => {
    const addr = parseJSONField(r.adresse).find((a) => a.type_adresse === "Adresse") || parseJSONField(r.adresse)[0] || {};
    const tel = parseJSONField(r.telephone)[0]?.valeur || "";
    const site = parseJSONField(r.site_internet)[0]?.valeur || "";
    return {
      nom: r.nom,
      adresse: [addr.numero_voie, addr.complement1, `${addr.code_postal || ""} ${addr.nom_commune || ""}`.trim()].filter(Boolean).join(", "),
      tel,
      site: /^https?:\/\//.test(site) ? site : "",
      fiche: r.url_service_public || "",
      horaires: formatHours(r.plage_ouverture),
    };
  });
}

export async function checkAddress(q, { signal } = {}) {
  const url = `${BAN}?q=${encodeURIComponent(q)}&limit=1&autocomplete=0`;
  const data = await fetchJSON(url, { signal });
  const f = data.features?.[0];
  if (!f) return null;
  const p = f.properties;
  return { label: p.label, score: p.score, city: p.city, postcode: p.postcode, citycode: p.citycode, context: p.context, lon: f.geometry.coordinates[0], lat: f.geometry.coordinates[1], type: p.type };
}

export async function searchCompanies(q, { signal } = {}) {
  const url = `${ENTREPRISES}?q=${encodeURIComponent(q)}&per_page=3`;
  const data = await fetchJSON(url, { signal, timeout: 10000 });
  return (data.results || []).map((r) => ({
    nom: r.nom_complet,
    siren: r.siren,
    naf: r.activite_principale,
    actif: r.etat_administratif === "A",
    creation: r.date_creation,
    adresse: r.siege?.adresse || "",
    effectif: r.tranche_effectif_salarie,
  }));
}

export async function nextHolidays(count = 3) {
  const data = await cached(FERIES, 36e5, () => fetchJSON(FERIES));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Object.entries(data)
    .map(([d, name]) => ({ date: new Date(d + "T00:00:00"), iso: d, name }))
    .filter((h) => h.date >= today)
    .sort((a, b) => a.date - b.date)
    .slice(0, count);
}

export const WMO = {
  0: "Ciel dégagé", 1: "Plutôt dégagé", 2: "Partiellement nuageux", 3: "Couvert",
  45: "Brouillard", 48: "Brouillard givrant", 51: "Bruine légère", 53: "Bruine", 55: "Bruine forte",
  56: "Bruine verglaçante", 57: "Bruine verglaçante", 61: "Pluie faible", 63: "Pluie", 65: "Forte pluie",
  66: "Pluie verglaçante", 67: "Pluie verglaçante", 71: "Neige faible", 73: "Neige", 75: "Forte neige",
  77: "Grains de neige", 80: "Averses", 81: "Averses", 82: "Violentes averses", 85: "Averses de neige",
  86: "Averses de neige", 95: "Orage", 96: "Orage et grêle", 99: "Orage et grêle",
};

/** points: [{name, lat, lon}] → [{name, temp, code, label}] */
export async function currentWeather(points) {
  const lat = points.map((p) => p.lat.toFixed(3)).join(",");
  const lon = points.map((p) => p.lon.toFixed(3)).join(",");
  const url = `${METEO}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&timezone=Europe%2FParis`;
  const data = await cached(url, 6e5, () => fetchJSON(url));
  const arr = Array.isArray(data) ? data : [data];
  return arr.map((d, i) => ({
    name: points[i].name,
    temp: Math.round(d.current.temperature_2m),
    wind: Math.round(d.current.wind_speed_10m),
    code: d.current.weather_code,
    label: WMO[d.current.weather_code] || "—",
  }));
}

export async function datasetsCount() {
  const data = await cached(DATAGOUV, 36e5, () => fetchJSON(DATAGOUV));
  return Number(data.total) || 0;
}
