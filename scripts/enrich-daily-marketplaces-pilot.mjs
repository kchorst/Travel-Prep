import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const updates = {
  AR: { name: "Mercado Libre Argentina", url: "https://www.mercadolibre.com.ar/" },
  BR: { name: "Mercado Livre Brazil", url: "https://www.mercadolivre.com.br/" },
  CL: { name: "Mercado Libre Chile", url: "https://www.mercadolibre.cl/" },
  CO: { name: "Mercado Libre Colombia", url: "https://www.mercadolibre.com.co/" },
  MX: { name: "Mercado Libre Mexico", url: "https://www.mercadolibre.com.mx/" },
  PE: { name: "Mercado Libre Peru", url: "https://www.mercadolibre.com.pe/" },
  UY: { name: "Mercado Libre Uruguay", url: "https://www.mercadolibre.com.uy/" }
};
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));

for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination record: ${iso}`);
  const dailyLiving = destination.stages.dailyLiving;
  const simple = `Online shopping: ${update.name} is a local marketplace; check shipping eligibility and whether your accommodation accepts parcels.`;
  const detailed = `Online marketplace: ${update.name}'s official site asks shoppers to enter a local delivery location to check shipping costs and delivery timing. Sellers, payment options, shipping, and returns vary; for a short stay, confirm that your accommodation will accept and hold a parcel before ordering.`;
  if (!dailyLiving.simple.includes(simple)) dailyLiving.simple += ` ${simple}`;
  if (!dailyLiving.detailed.includes(detailed)) dailyLiving.detailed += `\n\n${detailed}`;
  if (!dailyLiving.sources.some((item) => item.url === update.url)) {
    dailyLiving.sources.push({
      topic: `${update.name} official marketplace and local delivery information`,
      url: update.url,
      lastChecked: checked
    });
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added local marketplace guidance for ${Object.keys(updates).join(", ")}.`);