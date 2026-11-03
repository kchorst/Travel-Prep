import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const updates = {
  MA: {
    cities: "Casablanca, Rabat, Marrakech, Tangier, and Fes",
    url: "https://glovoapp.com/ma/en/"
  },
  CI: {
    cities: "Abidjan North and Yopougon",
    url: "https://glovoapp.com/ci/en/"
  },
  TN: {
    cities: "the cities listed on Glovo Tunisia's live city directory",
    url: "https://glovoapp.com/tn/en/"
  },
  KE: {
    cities: "Nairobi, Mombasa, Eldoret, Nakuru, Kisumu, and other listed Kenyan cities",
    url: "https://glovoapp.com/ke/en/"
  },
  UG: {
    cities: "Kampala",
    url: "https://glovoapp.com/ug/en/"
  }
};
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));

for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination record: ${iso}`);
  const dailyLiving = destination.stages.dailyLiving;
  const simple = `Glovo lists delivery in ${update.cities}; check your exact address for current restaurants, shops, and fees.`;
  const detailed = `Delivery and shopping: Glovo's official site lists service in ${update.cities}. Available merchants, delivery areas, operating hours, and fees depend on the exact address; verify service for your accommodation before relying on it.`;
  if (!dailyLiving.simple.includes(simple)) dailyLiving.simple += ` ${simple}`;
  if (!dailyLiving.detailed.includes(detailed)) dailyLiving.detailed += `\n\n${detailed}`;
  if (!dailyLiving.sources.some((item) => item.url === update.url)) {
    dailyLiving.sources.push({
      topic: `Glovo official city and delivery listings for ${destination.country}`,
      url: update.url,
      lastChecked: checked
    });
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added sourced Glovo delivery guidance for ${Object.keys(updates).join(", ")}.`);