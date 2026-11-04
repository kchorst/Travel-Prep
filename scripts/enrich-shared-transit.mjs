import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-04";
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
const destination = destinations.find((item) => item.iso === "AR");
if (!destination) throw new Error("Missing destination profile: AR");

const mobility = destination.stages.mobility;
const simple = "Buenos Aires has Subte, colectivos (city buses), and commuter rail; other cities have their own systems. For intercity travel, compare flights, long-distance coaches, and rail routes, checking the exact terminal and current timetable.";
const detail = "Buenos Aires shared transit: City buses are commonly called colectivos or bondis. Wikivoyage lists BA Como Llego for Buenos Aires and Moovit and Treep for public-transport planning in several cities. Coverage, route details, and real-time features vary; check current routes, fares, and boarding/payment rules for the city where you travel.";
const source = {
  topic: "Wikivoyage Argentina: colectivos and public-transport planners",
  url: "https://en.wikivoyage.org/wiki/Argentina#Get_around",
  lastChecked: checked
};

let changed = false;
if (mobility.simple !== simple) {
  mobility.simple = simple;
  changed = true;
}
if (!mobility.detailed.includes(detail)) {
  mobility.detailed += `\n\n${detail}`;
  changed = true;
}
if (!mobility.sources.some((item) => item.url === source.url)) {
  mobility.sources.push(source);
  changed = true;
}

if (changed) writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(changed ? "Updated Argentina shared-transit guidance." : "Argentina shared-transit guidance is already current.");
