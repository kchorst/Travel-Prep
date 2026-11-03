import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist");
const outputData = path.join(output, "data");
const outputRegions = path.join(outputData, "regions");
const outputVendorLeaflet = path.join(output, "vendor", "leaflet");
const outputLeafletImages = path.join(outputVendorLeaflet, "images");
const index = JSON.parse(readFileSync(path.join(root, "data", "index.json"), "utf8"));

mkdirSync(outputRegions, { recursive: true });
mkdirSync(outputLeafletImages, { recursive: true });
for (const asset of ["index.html", "manifest.json", "sw.js", "styles.css", "icon-192.png", "icon-512.png"]) {
  copyFileSync(path.join(root, asset), path.join(output, asset));
}
copyFileSync(path.join(root, "data", "index.json"), path.join(outputData, "index.json"));
copyFileSync(path.join(root, "data", "world-countries.geojson"), path.join(outputData, "world-countries.geojson"));

for (const filename of ["leaflet.css", "leaflet.js", "LICENSE"]) {
  copyFileSync(path.join(root, "vendor", "leaflet", filename), path.join(outputVendorLeaflet, filename));
}
for (const filename of readdirSync(path.join(root, "vendor", "leaflet", "images"))) {
  copyFileSync(path.join(root, "vendor", "leaflet", "images", filename), path.join(outputLeafletImages, filename));
}

const imagesPath = path.join(root, "data", "images");
const outputImages = path.join(outputData, "images");
mkdirSync(outputImages, { recursive: true });
for (const filename of readdirSync(imagesPath).filter((name) => name.startsWith("socket-type-") && name.endsWith(".svg"))) {
  copyFileSync(path.join(imagesPath, filename), path.join(outputImages, filename));
}

for (const shard of Object.values(index.shards)) {
  const filename = path.basename(new URL(shard.url, "https://local.invalid/").pathname);
  copyFileSync(path.join(root, "data", "regions", filename), path.join(outputRegions, filename));
}

writeFileSync(path.join(output, ".nojekyll"), "");
console.log(JSON.stringify({
  indexDestinations: index.destinations.length,
  shards: Object.keys(index.shards).length,
  mapFeatures: JSON.parse(readFileSync(path.join(outputData, "world-countries.geojson"), "utf8")).features.length,
  plugDiagrams: readdirSync(outputImages).length,
  output
}, null, 2));