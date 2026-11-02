import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist");
const outputData = path.join(output, "data");
const outputRegions = path.join(outputData, "regions");
const index = JSON.parse(readFileSync(path.join(root, "data", "index.json"), "utf8"));

mkdirSync(outputRegions, { recursive: true });
for (const asset of ["index.html", "manifest.json", "sw.js", "icon-192.png", "icon-512.png"]) {
  copyFileSync(path.join(root, asset), path.join(output, asset));
}
copyFileSync(path.join(root, "data", "index.json"), path.join(outputData, "index.json"));

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
  plugDiagrams: readdirSync(outputImages).length,
  output
}, null, 2));