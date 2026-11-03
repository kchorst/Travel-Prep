import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const updates = {
  GR: { city: "Athens", url: "https://wolt.com/en/grc/athens" },
  HU: { city: "Budapest", url: "https://wolt.com/en/hun/budapest" },
  AT: { city: "Vienna", url: "https://wolt.com/en/aut/vienna" },
  CZ: { city: "Prague", url: "https://wolt.com/en/cze/prague" },
  CY: { city: "Limassol", url: "https://wolt.com/en/cyp/limassol" },
  RS: { city: "Belgrade", url: "https://wolt.com/en/srb/belgrade" },
  SI: { city: "Ljubljana", url: "https://wolt.com/en/svn/ljubljana" },
  LV: { city: "Riga", url: "https://wolt.com/en/lva/riga" },
  AL: { city: "Tirana", url: "https://wolt.com/en/alb/tirana" },
  IL: { city: "Tel Aviv", url: "https://wolt.com/en/isr/tel-aviv" },
  EE: { city: "Tallinn", url: "https://wolt.com/en/est/tallinn" },
  LT: { city: "Vilnius", url: "https://wolt.com/en/ltu/vilnius" },
  PL: { city: "Warsaw", url: "https://wolt.com/en/pol/warsaw" },
  FI: { city: "Helsinki", url: "https://wolt.com/en/fin/helsinki" },
  SE: { city: "Stockholm", url: "https://wolt.com/en/swe/stockholm" },
  NO: { city: "Oslo", url: "https://wolt.com/en/nor/oslo" }
};
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));

for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination record: ${iso}`);
  const dailyLiving = destination.stages.dailyLiving;
  const simple = `Wolt has an ordering page for ${update.city}; check the local merchant list and fees for your exact address.`;
  const detailed = `Food and local-store delivery: Wolt's current ordering page lists ${update.city}. Available restaurants and shops, delivery areas, operating hours, fees, and payment options depend on the address; enter your accommodation in the app before relying on delivery.`;
  if (!dailyLiving.simple.includes(simple)) dailyLiving.simple += ` ${simple}`;
  if (!dailyLiving.detailed.includes(detailed)) dailyLiving.detailed += `\n\n${detailed}`;
  if (!dailyLiving.sources.some((item) => item.url === update.url)) {
    dailyLiving.sources.push({
      topic: `Wolt official ${update.city} ordering and delivery page`,
      url: update.url,
      lastChecked: checked
    });
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added Wolt city-specific delivery guidance for ${Object.keys(updates).join(", ")}.`);