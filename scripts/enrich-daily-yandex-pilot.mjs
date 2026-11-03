import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const updates = ["GE", "AM", "AZ", "KZ", "KG", "UZ", "BY"];
const mobilitySources = [
  { topic: "Yandex Maps official navigation service", url: "https://yandex.com/maps/" },
  { topic: "Yandex Go official ride service", url: "https://taxi.yandex.com/" }
];
const deliverySource = { topic: "Yandex Eats official food delivery service", url: "https://eda.yandex.ru/" };
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));

for (const iso of updates) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination record: ${iso}`);

  const mobility = destination.stages.mobility;
  const mobilitySimple = "Yandex Maps and Yandex Go are additional app options in some cities; check local coverage, language, and payment before relying on them.";
  const mobilityDetailed = "Navigation and rides: Yandex Maps and Yandex Go may be useful local options. Coverage, map detail, vehicle categories, language, and payment methods vary by city; check the current app for your exact destination and keep a public-transit or licensed-taxi backup.";
  if (!mobility.simple.includes(mobilitySimple)) mobility.simple += ` ${mobilitySimple}`;
  if (!mobility.detailed.includes(mobilityDetailed)) mobility.detailed += `\n\n${mobilityDetailed}`;
  for (const source of mobilitySources) {
    if (!mobility.sources.some((item) => item.url === source.url)) {
      mobility.sources.push({ ...source, lastChecked: checked });
    }
  }

  const dailyLiving = destination.stages.dailyLiving;
  const deliverySimple = "Yandex food delivery may be available in selected cities; verify the exact address in the current app.";
  const deliveryDetailed = "Food delivery: Yandex Eats or Yandex Go food delivery may be offered in selected cities, but market features and service areas vary. Check the exact address, operating hours, payment requirements, and delivery fees in the local app before planning around it.";
  if (!dailyLiving.simple.includes(deliverySimple)) dailyLiving.simple += ` ${deliverySimple}`;
  if (!dailyLiving.detailed.includes(deliveryDetailed)) dailyLiving.detailed += `\n\n${deliveryDetailed}`;
  if (!dailyLiving.sources.some((item) => item.url === deliverySource.url)) {
    dailyLiving.sources.push({ ...deliverySource, lastChecked: checked });
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added city-qualified Yandex mobility and food-delivery guidance for ${updates.join(", ")}.`);