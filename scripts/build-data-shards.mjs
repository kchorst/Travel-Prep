import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "data", "destinations.json");
const electricalPath = path.join(root, "data", "electrical-standards.json");
const outputDirectory = path.join(root, "data", "regions");
const indexPath = path.join(root, "data", "index.json");
const stageKeys = ["preArrival", "arrival24h", "mobility", "dailyLiving", "socialCode"];
const easternEuropeIsoCodes = new Set([
  "AL", "BA", "BG", "BY", "CZ", "EE", "GR", "HR", "HU", "LT", "LV",
  "MD", "ME", "MK", "PL", "RO", "RS", "RU", "SI", "SK", "TR", "UA"
]);
const firstInstallShards = ["eastern-europe", "pakistan"];

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

function shardFor(destination) {
  if (easternEuropeIsoCodes.has(destination.iso)) return "eastern-europe";
  if (destination.iso === "PK") return "pakistan";
  if (destination.region === "Europe") return "europe";
  return destination.region.toLowerCase();
}

function profileStatus(destination) {
  const stagesComplete = stageKeys.every((key) =>
    Array.isArray(destination.stages[key].sources) && destination.stages[key].sources.length > 0
  );
  const electricalComplete = Array.isArray(electricalStandards[destination.iso]?.socketTypes) &&
    electricalStandards[destination.iso].socketTypes.length > 0;
  return stagesComplete && electricalComplete ? "complete" : "in-progress";
}

const sourceText = readFileSync(sourcePath, "utf8");
const destinations = JSON.parse(sourceText);
const electricalText = readFileSync(electricalPath, "utf8");
const electricalStandards = JSON.parse(electricalText);
if (!Array.isArray(destinations) || destinations.length === 0) {
  throw new Error("destinations.json must contain a non-empty array");
}

const ids = new Set();
const isoCodes = new Set();
const grouped = new Map();
for (const destination of destinations) {
  if (!destination.id || !destination.iso || ids.has(destination.id) || isoCodes.has(destination.iso)) {
    throw new Error(`Missing or duplicate destination identity: ${destination.id}/${destination.iso}`);
  }
  ids.add(destination.id);
  isoCodes.add(destination.iso);
  for (const stageKey of stageKeys) {
    const stage = destination.stages?.[stageKey];
    if (typeof stage?.simple !== "string" || typeof stage?.detailed !== "string") {
      throw new Error(`${destination.iso} is missing ${stageKey} simple/detailed text`);
    }
  }
}

for (const iso of easternEuropeIsoCodes) {
  if (!isoCodes.has(iso)) throw new Error(`Expected Eastern Europe destination missing from source: ${iso}`);
}
if (!isoCodes.has("PK")) throw new Error("Pakistan is missing from destinations.json");

const firstInstallIsoCodes = new Set([...easternEuropeIsoCodes, "PK"]);
for (const iso of firstInstallIsoCodes) {
  if (!electricalStandards[iso]) throw new Error(`Electrical standards missing for first-install destination: ${iso}`);
}
for (const [iso, standard] of Object.entries(electricalStandards)) {
  if (!isoCodes.has(iso)) throw new Error(`Electrical standards reference unknown destination: ${iso}`);
  if (!(Number.isFinite(standard.voltage) || typeof standard.voltage === "string") ||
      !(Number.isFinite(standard.frequency) || typeof standard.frequency === "string") ||
      !Array.isArray(standard.socketTypes) || standard.socketTypes.length === 0 ||
      !standard.source?.startsWith("https://")) {
    throw new Error(`Electrical standards are incomplete for ${iso}`);
  }
}

const compiledDestinations = destinations.map((destination) => {
  const electrical = electricalStandards[destination.iso];
  return electrical ? { ...destination, electrical } : destination;
});

mkdirSync(outputDirectory, { recursive: true });
const shards = {};
for (const destination of compiledDestinations) {
  const shard = shardFor(destination);
  if (!grouped.has(shard)) grouped.set(shard, []);
  grouped.get(shard).push(destination);
}
for (const [name, records] of grouped) {
  const serialized = `${JSON.stringify(records, null, 2)}\n`;
  const digest = hash(serialized);
  const filename = `${name}.${digest.slice(0, 16)}.json`;
  writeFileSync(path.join(outputDirectory, filename), serialized);
  shards[name] = {
    url: `./data/regions/${filename}`,
    sha256: digest,
    records: records.length
  };
}

const index = {
  schemaVersion: 2,
  dataVersion: hash(`${sourceText}\n${electricalText}`),
  defaultShards: firstInstallShards,
  shards,
  destinations: destinations.map((destination) => ({
    id: destination.id,
    country: destination.country,
    city: destination.city,
    region: destination.region,
    currency: destination.currency,
    iso: destination.iso,
    shard: shardFor(destination),
    profileStatus: profileStatus(destination)
  }))
};
writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);

console.log(JSON.stringify({
  destinations: destinations.length,
  indexBytes: Buffer.byteLength(JSON.stringify(index)),
  completeProfiles: index.destinations.filter((destination) => destination.profileStatus === "complete").length,
  electricalProfiles: Object.keys(electricalStandards).length,
  shards: Object.fromEntries(Object.entries(shards).map(([name, shard]) => [name, shard.records])),
  firstInstallShards
}, null, 2));