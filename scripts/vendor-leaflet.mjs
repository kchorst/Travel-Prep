import { copyFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "node_modules", "leaflet", "dist");
const output = path.join(root, "vendor", "leaflet");
const images = ["layers.png", "layers-2x.png", "marker-icon.png", "marker-icon-2x.png", "marker-shadow.png"];

mkdirSync(path.join(output, "images"), { recursive: true });
for (const filename of ["leaflet.js", "leaflet.css"]) {
  copyFileSync(path.join(source, filename), path.join(output, filename));
}
for (const filename of images) {
  copyFileSync(path.join(source, "images", filename), path.join(output, "images", filename));
}
copyFileSync(path.join(root, "node_modules", "leaflet", "LICENSE"), path.join(output, "LICENSE"));
console.log(`Vendored Leaflet assets to ${path.relative(root, output)}.`);