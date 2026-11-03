import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const sections = [
  {
    heading: "Beverage and dietary norms",
    pattern: /^Beverage and dietary norms:/im,
    text: "Beverage and dietary norms: Tap-water safety varies by locality and building; follow local health guidance and ask your accommodation, using sealed or properly treated water if uncertain. Check labels for ingredients and added sugar, and ask specifically for unsweetened or zero-sugar options because names and formulas vary. Confirm allergens and dietary needs directly with the venue."
  },
  {
    heading: "Alcohol retail",
    pattern: /^Alcohol retail:/im,
    text: "Alcohol retail: Minimum age, retail hours, import limits, public-consumption rules, and availability differ by country and sometimes by region or holiday. Check current local law and venue policy; do not assume alcohol is sold in supermarkets or served at every restaurant."
  },
  {
    heading: "Buffet and meal pricing",
    pattern: /^Buffet and meal pricing:/im,
    text: "Buffet and meal pricing: Confirm whether pricing is per dish, fixed-price buffet, or by weight. Ask whether drinks, service charges, refills, or leftovers are included, and follow the venue's food-safety and serving rules rather than assuming an all-you-can-eat format."
  }
];
const references = [
  { topic: "WHO drinking-water guidance", url: "https://www.who.int/news-room/fact-sheets/detail/drinking-water", lastChecked: checked },
  { topic: "WHO healthy-diet and free-sugar guidance", url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet", lastChecked: checked }
];

const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
let updated = 0;
for (const destination of destinations) {
  const dailyLiving = destination.stages.dailyLiving;
  let detailed = dailyLiving.detailed || "";
  const missing = sections.filter((section) => !section.pattern.test(detailed));
  if (!missing.length) continue;

  detailed = [detailed.trim(), ...missing.map((section) => section.text)].filter(Boolean).join("\n\n");
  dailyLiving.detailed = detailed;
  const sources = Array.isArray(dailyLiving.sources) ? dailyLiving.sources : [];
  for (const reference of references) {
    if (!sources.some((item) => item.url === reference.url)) sources.push(reference);
  }
  dailyLiving.sources = sources;
  updated++;
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added Daily Living topics to ${updated} profiles.`);