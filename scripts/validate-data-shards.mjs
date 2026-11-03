import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDirectory = path.join(root, "data");
const destinationText = readFileSync(path.join(dataDirectory, "destinations.json"), "utf8");
const destinations = JSON.parse(destinationText);
const electricalText = readFileSync(path.join(dataDirectory, "electrical-standards.json"), "utf8");
const electrical = JSON.parse(electricalText);
const capitalCoordinatesText = readFileSync(path.join(dataDirectory, "capital-coordinates.json"), "utf8");
const capitalCoordinates = JSON.parse(capitalCoordinatesText);
const worldMapText = readFileSync(path.join(dataDirectory, "world-countries.geojson"), "utf8");
const worldMap = JSON.parse(worldMapText);
const index = JSON.parse(readFileSync(path.join(dataDirectory, "index.json"), "utf8"));
const stages = ["preArrival", "arrival24h", "mobility", "dailyLiving", "socialCode"];
const requiredDailySections = [
  /^Beverage and dietary norms:/im,
  /^Alcohol retail:/im,
  /^Buffet and meal pricing:/im
];

const electricalKeys = [...electricalText.matchAll(/^\s*"([A-Z]{2})"\s*:/gm)].map((match) => match[1]);
if (new Set(electricalKeys).size !== electricalKeys.length) {
  throw new Error("electrical-standards.json contains duplicate ISO keys");
}

const expectedStatuses = new Map();
const mapIsoCodes = new Set(worldMap.features.map((feature) => {
  const properties = feature.properties || {};
  const iso = properties.ISO_A2_EH || properties.ISO_A2 || properties["ISO3166-1-Alpha-2"];
  return iso === "CN-TW" ? "TW" : iso;
}).filter((iso) => iso && iso !== "-99"));
for (const destination of destinations) {
  if (!destination.id || !destination.iso) throw new Error("A destination is missing its ID or ISO code");
  const coordinates = capitalCoordinates.destinations?.[destination.iso];
  if (!coordinates || !coordinates.capital || !coordinates.source?.startsWith("https://") ||
      !Number.isFinite(coordinates.latitude) || Math.abs(coordinates.latitude) > 90 ||
      !Number.isFinite(coordinates.longitude) || Math.abs(coordinates.longitude) > 180) {
    throw new Error(`${destination.iso} is missing valid, sourced capital coordinates`);
  }
  if (!mapIsoCodes.has(destination.iso)) throw new Error(`${destination.iso} is missing a GeoJSON country boundary`);
  for (const stageName of stages) {
    const stage = destination.stages?.[stageName];
    if (!stage?.simple || !stage?.detailed) throw new Error(`${destination.iso} is missing ${stageName} text`);
  }
  for (const pattern of requiredDailySections) {
    if (!pattern.test(destination.stages.dailyLiving.detailed)) {
      throw new Error(`${destination.iso} is missing a required Daily Living topic`);
    }
  }

  const stageSourcesExist = stages.every((stageName) =>
    Array.isArray(destination.stages[stageName].sources) && destination.stages[stageName].sources.length > 0
  );
  const standard = electrical[destination.iso];
  const dailyLivingComplete = requiredDailySections.every((pattern) =>
    pattern.test(destination.stages.dailyLiving.detailed)
  );
  const profileStatus = stageSourcesExist && standard?.socketTypes?.length && dailyLivingComplete
    ? "complete"
    : "in-progress";
  expectedStatuses.set(destination.id, profileStatus);

  if (standard) {
    if (!standard.source?.startsWith("https://") || !standard.socketTypes.length) {
      throw new Error(`${destination.iso} has incomplete electrical metadata`);
    }
    for (const type of standard.socketTypes) {
      const imagePath = path.join(dataDirectory, "images", `socket-type-${type.toLowerCase()}.svg`);
      try {
        readFileSync(imagePath);
      } catch {
        throw new Error(`${destination.iso} is missing its Type ${type} diagram`);
      }
    }
  }
}

if (index.destinations.length !== destinations.length) throw new Error("Index and canonical record counts differ");
if (index.dataVersion !== createHash("sha256").update(`${destinationText}\n${electricalText}\n${capitalCoordinatesText}\n${worldMapText}`).digest("hex")) {
  throw new Error("Index data version does not match canonical profile, electrical, coordinate, and map data");
}
const indexedIds = new Set(index.destinations.map((destination) => destination.id));
if (indexedIds.size !== destinations.length) throw new Error("Destination index contains duplicate IDs");

const shardIds = new Set();
for (const [name, shard] of Object.entries(index.shards)) {
  const filename = path.basename(new URL(shard.url, "https://local.invalid/").pathname);
  const shardPath = path.join(dataDirectory, "regions", filename);
  const bytes = readFileSync(shardPath);
  const hash = createHash("sha256").update(bytes).digest("hex");
  if (hash !== shard.sha256) throw new Error(`${name} shard hash does not match the index`);

  const records = JSON.parse(bytes.toString("utf8"));
  if (records.length !== shard.records) throw new Error(`${name} shard record count does not match the index`);
  for (const destination of records) {
    if (shardIds.has(destination.id)) throw new Error(`Duplicate shard record: ${destination.id}`);
    shardIds.add(destination.id);
    if (!indexedIds.has(destination.id)) throw new Error(`Shard record missing from index: ${destination.id}`);
    if (expectedStatuses.get(destination.id) === "complete" && !destination.electrical?.socketTypes?.length) {
      throw new Error(`Complete profile missing compiled electrical metadata: ${destination.iso}`);
    }
  }
}

if (shardIds.size !== destinations.length) throw new Error("Region shards do not cover the complete roster");
for (const metadata of index.destinations) {
  const coordinates = capitalCoordinates.destinations[metadata.iso];
  if (metadata.capital !== coordinates.capital || metadata.latitude !== coordinates.latitude ||
      metadata.longitude !== coordinates.longitude || metadata.capitalSource !== coordinates.source) {
    throw new Error(`Capital coordinates in the index do not match the source data: ${metadata.iso}`);
  }
  if (metadata.profileStatus !== expectedStatuses.get(metadata.id)) {
    throw new Error(`Incorrect profile status in index: ${metadata.iso}`);
  }
}

console.log(JSON.stringify({
  records: destinations.length,
  completeProfiles: [...expectedStatuses.values()].filter((status) => status === "complete").length,
  electricalProfiles: Object.keys(electrical).length,
  shards: Object.keys(index.shards).length,
  valid: true
}, null, 2));