import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "data", "index.json");
const outputPath = path.join(root, "data", "capital-coordinates.json");
const checked = "2026-11-02";
const endpoint = "https://query.wikidata.org/sparql";
const overrides = {
  AG: { qid: "Q36262", capital: "St. John's" },
  GQ: { qid: "Q1140136", capital: "Ciudad de la Paz" },
  GD: { qid: "Q41547", capital: "St. George's" },
  KI: { qid: "Q131233", capital: "South Tarawa" },
  JO: { qid: "Q3805", capital: "Amman", point: "Point(35.926084 31.930983)" },
  SY: { qid: "Q3766", capital: "Damascus", point: "Point(36.291944444 33.513055555)" }
};

function normalize(value) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function readPoint(value, iso) {
  const match = /^Point\((-?[\d.]+) (-?[\d.]+)\)$/.exec(value || "");
  if (!match) throw new Error(`Invalid Wikidata coordinate for ${iso}: ${value || "missing"}`);
  const longitude = Number(match[1]);
  const latitude = Number(match[2]);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
    throw new Error(`Out-of-range Wikidata coordinate for ${iso}: ${value}`);
  }
  return { latitude, longitude };
}

const index = JSON.parse(readFileSync(indexPath, "utf8"));
const isoValues = index.destinations.map((destination) => `"${destination.iso}"`).join(" ");
const query = `SELECT ?iso ?capital ?capitalLabel ?coord WHERE {
  VALUES ?iso { ${isoValues} }
  ?country wdt:P297 ?iso; wdt:P36 ?capital.
  OPTIONAL { ?capital wdt:P625 ?coord. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}`;
const url = new URL(endpoint);
url.searchParams.set("query", query);
url.searchParams.set("format", "json");

const response = await fetch(url, {
  headers: {
    accept: "application/sparql-results+json",
    "user-agent": "TravelPrep capital-coordinate importer"
  }
});
if (!response.ok) throw new Error(`Wikidata query failed: HTTP ${response.status}`);
const result = await response.json();
const candidatesByIso = new Map();
for (const row of result.results.bindings) {
  const iso = row.iso.value;
  const candidate = {
    qid: row.capital.value.split("/").at(-1),
    name: row.capitalLabel?.value || "",
    point: row.coord?.value || ""
  };
  if (!candidatesByIso.has(iso)) candidatesByIso.set(iso, []);
  candidatesByIso.get(iso).push(candidate);
}

const destinations = {};
for (const destination of index.destinations) {
  const override = overrides[destination.iso];
  const candidates = candidatesByIso.get(destination.iso) || [];
  const matchingCandidates = override
    ? candidates.filter((candidate) => candidate.qid === override.qid)
    : candidates.filter((candidate) => normalize(candidate.name) === normalize(destination.city));
  const matchingPoints = new Set(matchingCandidates.map((candidate) => candidate.point).filter(Boolean));
  if (matchingPoints.size === 0 || (matchingPoints.size > 1 && !override?.point)) {
    throw new Error(`Expected one reviewed capital coordinate for ${destination.iso} (${destination.city}); found ${matchingPoints.size}`);
  }

  const selected = matchingCandidates.find((candidate) => candidate.point === (override?.point || [...matchingPoints][0]));
  if (!selected) throw new Error(`Selected Wikidata coordinate is missing for ${destination.iso}`);
  const point = readPoint(override?.point || selected.point, destination.iso);
  destinations[destination.iso] = {
    capital: override?.capital || selected.name,
    wikidata: selected.qid,
    ...point,
    source: `https://www.wikidata.org/wiki/${selected.qid}`,
    lastChecked: checked
  };
}

const dataset = {
  schemaVersion: 1,
  attribution: "Capital names and point coordinates from Wikidata structured data, licensed CC0 1.0.",
  querySource: endpoint,
  destinations
};
writeFileSync(outputPath, `${JSON.stringify(dataset, null, 2)}\n`);
console.log(`Imported reviewed capital coordinates for ${Object.keys(destinations).length} destinations.`);