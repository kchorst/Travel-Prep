import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const updates = {
  US: {
    simple: "Zero-sugar drinks: several diet/zero soda choices are commonly easier to find in larger US stores, including Diet Coke and Coca-Cola Zero Sugar; check local stock and labels.",
    detailed: "Zero-sugar availability: a wider choice is generally easier to find in US supermarkets than in many smaller markets. Coca-Cola's US catalog includes Diet Coke, alongside other local soda lines; exact zero-sugar flavors and stock vary by retailer. Check the nutrition panel and sweetener ingredients, since diet, zero-sugar, and reduced-sugar are not interchangeable labels.",
    sources: [
      { topic: "Coca-Cola US brand catalog", url: "https://www.coca-cola.com/us/en/brands" },
      { topic: "Diet Coke US product information", url: "https://www.coca-cola.com/us/en/brands/diet-coke" }
    ]
  },
  CA: {
    simple: "Zero-sugar drinks: multiple diet/zero soda choices are generally easier to find in larger Canadian stores; Diet Coke is one official example, but stock varies.",
    detailed: "Zero-sugar availability: larger Canadian grocery stores commonly offer more than one diet or zero-sugar soda line, but the available brands and flavors vary by retailer and province. Coca-Cola Canada's product pages list Diet Coke and several product variants; check the nutrition panel and sweetener ingredients rather than treating diet, zero-sugar, and reduced-sugar as the same.",
    sources: [
      { topic: "Coca-Cola Canada soda and drink brand catalog", url: "https://www.coca-cola.com/ca/en/brands" },
      { topic: "Diet Coke Canada product information and variants", url: "https://www.coca-cola.com/ca/en/brands/diet-coke" }
    ]
  },
  MX: {
    simple: "Zero-sugar choice may be limited by shop: travelers report sometimes finding only one option among many sugared drinks. Look for 'sin azúcar' and check the label.",
    detailed: "Zero-sugar availability: do not assume a broad diet-soda range at every Mexican shop. A traveler-reported pattern is that some stores offer only one sugar-free choice among many sugared drinks. Coca-Cola Mexico lists Sprite in versions with and without sugar and a reduced-sugar Coca-Cola product; reduced sugar does not mean sugar-free. Check the exact label and consider sparkling water or unsweetened drinks if the selection is limited.",
    sources: [
      { topic: "Coca-Cola Mexico Sprite products with and without sugar", url: "https://www.coca-cola.com/mx/es/brands/sprite" },
      { topic: "Coca-Cola Mexico product information", url: "https://www.coca-cola.com/mx/es/brands/coca-cola" }
    ]
  },
  EE: {
    simple: "Zero-sugar choice can be narrow: traveler reports from Baltic shops describe finding only one sugar-free soda option among many sugared drinks; check labels and local stock.",
    detailed: "Zero-sugar availability: a traveler-reported pattern in Estonia and other Baltic markets is that some shops have only one sugar-free soda choice among many sugared options. This is not a nationwide inventory count; selection varies by retailer and town. Check labels for 'zero' or 'sugar-free' and keep sparkling water or unsweetened drinks as alternatives."
  },
  LV: {
    simple: "Zero-sugar choice can be narrow: traveler reports from Baltic shops describe finding only one sugar-free soda option among many sugared drinks; check labels and local stock.",
    detailed: "Zero-sugar availability: a traveler-reported pattern in Latvia and other Baltic markets is that some shops have only one sugar-free soda choice among many sugared options. This is not a nationwide inventory count; selection varies by retailer and town. Check labels for 'zero' or 'sugar-free' and keep sparkling water or unsweetened drinks as alternatives."
  },
  LT: {
    simple: "Zero-sugar choice can be narrow: traveler reports from Baltic shops describe finding only one sugar-free soda option among many sugared drinks; check labels and local stock.",
    detailed: "Zero-sugar availability: a traveler-reported pattern in Lithuania and other Baltic markets is that some shops have only one sugar-free soda choice among many sugared options. This is not a nationwide inventory count; selection varies by retailer and town. Check labels for 'zero' or 'sugar-free' and keep sparkling water or unsweetened drinks as alternatives."
  },
  CL: {
    simple: "Chile has at least one official local zero-sugar soda example: Bilz y Pap lists a zero-sugar variant; check whether local shops stock it.",
    detailed: "Zero-sugar availability: Bilz y Pap's official Chilean site presents a zero-sugar variant. This confirms a product example, not broad availability or stock across stores; check the package and ask at larger supermarkets if it is not on the shelf.",
    sources: [
      { topic: "Official Bilz y Pap Chile products including a zero-sugar variant", url: "https://www.bilzypap.cl/" }
    ]
  },
  JP: {
    simple: "Japan has an official zero-sugar soda example: Asahi's Mitsuya Cider lineup includes ZERO; store and flavor availability varies.",
    detailed: "Zero-sugar availability: Asahi's official Mitsuya lineup includes Mitsuya Cider ZERO. Treat it as one named product example, not a guarantee of broad selection or stock; check local convenience stores and the label for ingredients.",
    sources: [
      { topic: "Asahi official Mitsuya Cider lineup including ZERO", url: "https://www.asahiinryo.co.jp/mitsuya-cider/" }
    ]
  },
  GB: {
    simple: "The UK has branded zero-sugar examples such as Irn-Bru Zero; check local stock and labels rather than assuming every flavor is sugar-free.",
    detailed: "Zero-sugar availability: the Irn-Bru maker lists regular, Diet, and Zero versions. This confirms options within one brand, not a guaranteed range at every shop; availability varies by retailer and region, so check the label and shelf stock.",
    sources: [
      { topic: "Irn-Bru official regular, Diet, and Zero product range", url: "https://irn-bru.co.uk/" }
    ]
  }
};

const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination record: ${iso}`);
  const dailyLiving = destination.stages.dailyLiving;
  if (!dailyLiving.simple.includes(update.simple)) dailyLiving.simple += ` ${update.simple}`;
  if (!dailyLiving.detailed.includes(update.detailed)) dailyLiving.detailed += `\n\n${update.detailed}`;
  for (const source of update.sources || []) {
    if (!dailyLiving.sources.some((item) => item.url === source.url)) {
      dailyLiving.sources.push({ ...source, lastChecked: checked });
    }
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added country-specific zero-sugar availability notes for ${Object.keys(updates).join(", ")}.`);