import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const updates = {
  MX: {
    simple: "Regional soft-drink example: Jarritos lists fruit flavors including tamarind and mandarin, plus a Mandarin Zero product; check the label and local availability.",
    detailed: "Regional drink example: Jarritos' current product list includes fruit-flavored sodas such as tamarind and mandarin, as well as a Mandarin Zero product. Availability and formulas vary by retailer; check the package for sugar and caffeine content rather than assuming every flavor has the same nutrition.",
    source: { topic: "Jarritos official flavors and product list", url: "https://jarritos.com/flavors/" }
  },
  PE: {
    simple: "Regional soft-drink example: Inca Kola is a Peruvian brand; check the product label for sugar and ingredients.",
    detailed: "Regional drink example: Coca-Cola Peru maintains a local Inca Kola brand page with product and recipe information. Check the specific bottle or can for ingredients and sugar content; products and formulas may differ by market.",
    source: { topic: "Coca-Cola Peru official Inca Kola products and recipes", url: "https://www.coca-cola.com/pe/es/brands/inca-kola" }
  },
  CL: {
    simple: "Regional soft-drink examples: Bilz and Pap are Chilean brands; check current products and labels locally.",
    detailed: "Regional drink example: The official Bilz y Pap site presents Bilz and Pap brands and a zero-sugar variant. Check the package for the specific product's sugar content and ingredients; availability varies by shop and region.",
    source: { topic: "Official Bilz y Pap brand site and product references", url: "https://www.bilzypap.cl/" }
  },
  JP: {
    simple: "Regional soft-drink example: Asahi lists Mitsuya Cider and a ZERO variant; compare product labels for sugar and ingredients.",
    detailed: "Japan: Asahi's official Mitsuya lineup includes Mitsuya Cider and Mitsuya Cider ZERO. These are product examples, not a guarantee of local stock; compare package labels for sugar and ingredients.",
    source: { topic: "Asahi official Mitsuya Cider and Mitsuya Cider ZERO product lineup", url: "https://www.asahiinryo.co.jp/mitsuya-cider/" }
  },
  GB: {
    simple: "Regional soft-drink example: Irn-Bru is a Scottish brand; the maker lists regular, Diet, and Zero versions. Check labels and local stock.",
    detailed: "Regional drink example: Irn-Bru describes itself as Scotland's other national drink and lists regular, Diet, and Zero products. Availability varies by shop and region; check the package for sugar and caffeine content rather than assuming every version is the same.",
    source: { topic: "Irn-Bru official brand and product range", url: "https://irn-bru.co.uk/" }
  },
  AU: {
    simple: "Local soft-drink brand example: Kirks appears in Coca-Cola Australia's brand catalogue; check local flavours and labels.",
    detailed: "Local drink example: Coca-Cola Australia's current brand catalogue includes Kirks. Product selection and sugar or sweetener variants depend on the retailer; check the specific package rather than assuming a standard formula.",
    source: { topic: "Coca-Cola Australia official brands catalogue listing Kirks", url: "https://www.coca-cola.com/au/en/brands" }
  },
  ZA: {
    simple: "Local soft-drink example: Coca-Cola South Africa lists Sparletta flavors such as Creme Soda, Sparberry, Pine Nut, and Iron Brew; check labels for sugar variants.",
    detailed: "South Africa: Coca-Cola's local Sparletta page lists Creme Soda, Sparberry, Pine Nut, and Iron Brew, with sugar-reduced variants shown for some products. Availability and formulas vary by retailer; check the package for its specific ingredients and sugar content.",
    source: { topic: "Coca-Cola South Africa official Sparletta flavors and products", url: "https://www.coca-cola.com/za/en/brands/sparletta" }
  }
};

const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination record: ${iso}`);
  const dailyLiving = destination.stages.dailyLiving;
  if (!dailyLiving.simple.includes(update.simple)) dailyLiving.simple += ` ${update.simple}`;
  if (!dailyLiving.detailed.includes(update.detailed)) dailyLiving.detailed += `\n\n${update.detailed}`;
  if (!dailyLiving.sources.some((item) => item.url === update.source.url)) {
    dailyLiving.sources.push({ ...update.source, lastChecked: checked });
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added sourced local drink examples for ${Object.keys(updates).join(", ")}.`);