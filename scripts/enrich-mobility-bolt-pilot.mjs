import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const updates = {
  BG: { cities: "Sofia" },
  HR: { cities: "Dubrovnik, Split, and Zagreb" },
  CY: { cities: "Larnaca, Limassol, and Nicosia" },
  TH: { cities: "Bangkok, Chiang Mai, and Phuket" },
  AE: { cities: "Abu Dhabi and Dubai" },
  MY: { cities: "Kuala Lumpur" },
  IT: { cities: "Milan" },
  MX: { cities: "Aguascalientes, Guadalajara, and Mazatlan" },
  NZ: { cities: "Auckland" },
  PY: { cities: "Asuncion, Ciudad del Este, and Encarnacion" },
  BE: { cities: "Antwerp, Brussels, and Ghent" },
  CZ: { cities: "Brno and other Czech cities" },
  DK: { cities: "Aarhus and Copenhagen" },
  EE: { cities: "Tallinn and Tartu" },
  FI: { cities: "Helsinki, Espoo, and Tampere" },
  GR: { cities: "Athens, Crete, and Mykonos" },
  IE: { cities: "Cork, Dublin, and Galway" },
  NL: { cities: "Amsterdam, Rotterdam, and The Hague" },
  NO: { cities: "Bergen and Oslo" },
  SK: { cities: "Bratislava and Kosice" },
  GB: { cities: "Birmingham, Edinburgh, and London" },
  GE: { cities: "Batumi, Kutaisi, and Tbilisi" },
  TZ: { cities: "Arusha, Dar es Salaam, and Zanzibar" },
  UG: { cities: "Kampala and Mbarara" },
  AZ: { cities: "Baku and other Azerbaijani cities" },
  SA: { cities: "Jeddah, Riyadh, and other Saudi cities" },
  TW: { cities: "Taipei, Keelung, and Taoyuan" },
  SE: { cities: "Gothenburg, Malmo, and Stockholm" },
  CH: { cities: "Basel, Winterthur, and Zurich" },
  LV: { cities: "Daugavpils and Riga" },
  LT: { cities: "Kaunas and Vilnius" },
  MT: { cities: "Malta, Valletta, and Gozo" },
  AT: { cities: "Graz, Salzburg, and Vienna" },
  DE: { cities: "Berlin, Cologne, and other German cities" },
  MD: { cities: "Chisinau" },
  NG: { cities: "Abuja and other Nigerian cities" }
};
const directoryUrl = "https://bolt.eu/en/cities/";
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));

for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination record: ${iso}`);
  const mobility = destination.stages.mobility;
  const simple = `Ride-hailing: Bolt's live directory lists city pages for ${update.cities}; check whether car rides are currently offered for your exact location.`;
  const detailed = `Ride-hailing: Bolt's live location directory lists ${update.cities}. City listings and service types vary; check whether car rides are available for your exact destination and trip time, verify airport pickup rules and the fare in-app, and keep a local taxi or transit option as backup.`;
  if (!mobility.simple.includes(simple)) mobility.simple += ` ${simple}`;
  if (!mobility.detailed.includes(detailed)) mobility.detailed += `\n\n${detailed}`;
  if (!mobility.sources.some((item) => item.url === directoryUrl)) {
    mobility.sources.push({
      topic: "Bolt official live city directory and current service locations",
      url: directoryUrl,
      lastChecked: checked
    });
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added city-scoped Bolt directory references for ${Object.keys(updates).join(", ")}.`);