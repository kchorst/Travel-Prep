import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDirectory = path.join(root, "data");
const destinations = JSON.parse(readFileSync(path.join(dataDirectory, "destinations.json"), "utf8"));
const electrical = JSON.parse(readFileSync(path.join(dataDirectory, "electrical-standards.json"), "utf8"));
const index = JSON.parse(readFileSync(path.join(dataDirectory, "index.json"), "utf8"));
const appFiles = ["index.html", "sw.js", "scripts/build-data-shards.mjs"].map((filename) => readFileSync(path.join(root, filename), "utf8")).join("\n");

const profileChecks = [
  ["preArrival", "Flight routing and hubs", /flight routing|flight booking|airline|international gateway/i],
  ["preArrival", "Visa and entry rules", /visa|entry (and|requirements)|passport validity|immigration|\beTA\b|\bETA\b|\bSchengen\b/i],
  ["preArrival", "Climate and season", /climate|season|weather|temperature/i],
  ["preArrival", "Apparel and gear", /apparel|packing|pack for|clothing|footwear|dress/i],
  ["arrival24h", "Electrical standards", /voltage|volt|socket|outlet/i],
  ["arrival24h", "SIM/eSIM and roaming mention", /\b(?:4g|5g|mobile data|mobile network|sim(?:s| cards?)?|esims?|roaming|connectivity)\b/i],
  ["arrival24h", "Broadband benchmark source access", /broadband benchmark access:/i],
  ["arrival24h", "Population internet use context", /^Internet use context:/im],
  ["arrival24h", "Country-specific emergency response guidance", /^Emergency response:/im],
  ["arrival24h", "Financial rails and mobile money", /contactless|mobile money|mobile wallet|m-pesa|promptpay|pix|payid|interac|upi|qris|easypaisa|jazzcash|paynow|alipay|wechat\s?pay|blik|t-?money|gcash|kakao.?pay|\bic cards?\b|atm access/i],
  ["arrival24h", "Country-specific How to pay guidance", /^How to pay:/im],
  ["arrival24h", "Country-specific phone and watch wallet availability", /^Phone and watch wallets:/im],
  ["arrival24h", "Countrywide foreign-card ATM guidance", /^ATM access:/im],
  ["arrival24h", "Countrywide in-person card guidance", /^In-person card acceptance:/im],
  ["arrival24h", "Countrywide credit-card guidance", /^Credit-card acceptance:/im],
  ["arrival24h", "Countrywide debit-card guidance", /^Debit-card acceptance:/im],
  ["arrival24h", "Countrywide merchant NFC/contactless status", /^Merchant NFC acceptance:/im],
  ["arrival24h", "Countrywide cash-payment guidance", /^Cash acceptance:/im],
  ["arrival24h", "Credit/debit distinction documented", /^Credit\/debit distinction:/im],
  ["arrival24h", "Country-specific in-person card/cash mix", /^In-person card and cash:/im],
  ["arrival24h", "Countrywide online foreign-card status", /^Online card use:/im],
  ["arrival24h", "Airport transfer", /airport transfer|airport.*(?:rail|bus|taxi|pickup)|terminal.*pickup/i],
  ["arrival24h", "Named airport express rail", /airport express|airport rail|express rail|airport train|gautrain/i],
  ["mobility", "Formal transit/ticketing or service caution", /metro|subway|tram|trolleybus|bus|rail|train|ticket|public transit|transit.*(?:unavailable|not operating)/i],
  ["mobility", "Informal and shared transit", /shared|informal|minibus|colectivo|marshrutka|matatu|pmv|dala-dala|candongueiro|zemidjan|kombis/i],
  ["mobility", "Named ride-hailing operators", /\b(?:uber|lyft|bolt|grab|yego|safeboda|pickme|yassir|gojek|go.?taxi|didi|careem|ola|free.?now|cabify|heetch|gett|bitaksi|yango|yandex(?: go)?|indrive|maxim|99)\b/i],
  ["mobility", "Micro-mobility operators", /micro.mobility|e-scooter|shared bike|bike.share|lime|bird/i],
  ["mobility", "Pedestrian infrastructure", /sidewalk|pavement|walkability|pedestrian|crossing/i],
  ["dailyLiving", "Named delivery and e-commerce mentions", /glovo|wolt|baboon|chowdeck|foodmandu|hubtel|safeboda|pickme|vuba\s?vuba|jumia|mercado\s*livr[ei]|uber eats|foodpanda|ifood|rappi|nham24|grab\s?food|go\s?food|zomato|swiggy|talabat|hungerstation|yassir|deliveroo|door.?dash|just eat|takeaway\.com|menulog|shopee|lazada|demae.?can|yandex\s*(?:eats|go\s*food)|meituan|ele\.me|baemin|coupang\s?eats|delivery app/i],
  ["dailyLiving", "Alcohol retail rules", /^Alcohol retail:/im],
  ["dailyLiving", "Pharmacy and prescription guidance", /pharmacy|prescription|medicine|medication/i],
  ["dailyLiving", "Beverage and water guidance", /^Beverage and dietary norms:/im],
  ["dailyLiving", "Drinking-water source access and safety distinction", /^Drinking-water source access:/im],
  ["dailyLiving", "Local zero-sugar availability", /zero.sugar|sugar.free|sugar-free|sin azúcar|diet soda/i],
  ["dailyLiving", "Country-specific zero-sugar assortment note", /wider choice|multiple diet|one sugar-free choice|zero-sugar choice can be narrow|official .*zero-sugar|zero-sugar availability/i],
  ["dailyLiving", "Regional drink or soda example", /Inca Kola|Inka Kola|Guaraná|Jarritos|L\&P|Bilz|Pap|Mitsuya|Irn.?Bru|Kirks|Sparletta|local soda|regional soda/i],
  ["dailyLiving", "Buffet and meal-pricing guidance", /^Buffet and meal pricing:/im],
  ["dailyLiving", "Country-specific weight pricing", /comida por quilo|priced by weight|sold by weight|price per kilo/i],
  ["socialCode", "Gift-giving guidance", /gift|flowers|present/i],
  ["socialCode", "Household norms", /household norms|shoes.*home|remove shoes/i],
  ["socialCode", "Dog culture", /^Dog culture:/im],
  ["socialCode", "Cat culture", /^Cat culture:/im],
  ["socialCode", "Bird culture", /^Bird culture:/im],
  ["socialCode", "Country-specific language landscape", /^Language landscape:/im],
  ["socialCode", "Hofstede dimensions", /^Hofstede cultural dimensions:/im],
  ["socialCode", "Published country-specific Hofstede score", /power.distance score(?: as|:|=)\s*\d+/i],
  ["socialCode", "Legacy 2015 Hofstede score attribution", /^Hofstede legacy 2015 scores:/im],
  ["socialCode", "Hofstede score availability annotated", /The Culture Factor public comparison tool lists no country score for/i],
  ["socialCode", "Hofstede score coverage (published or unavailable)", /power.distance score(?: as|:|=)\s*\d+|The Culture Factor public comparison tool lists no country score for/i],
  ["socialCode", "Eating-interface norms", /chopsticks|right hand|cutlery|serving utensils|utensils?/i],
  ["socialCode", "Country-specific dining interface note", /^Dining interface:/im],
  ["socialCode", "Dress and headwear norms", /sunglasses|headwear|modest clothing|dress rules/i]
];

const appChecks = [
  ["GeoJSON country maps", /L\.geoJSON|world-countries\.geojson/i],
  ["Destination map handoff", /google\.com\/maps\/search|mapUrl/i],
  ["Nearest-neighbor browsing mode", /nearestDestinations|browse-mode-nearest/i],
  ["Alphabetical browsing mode", /alphabetical browsing|alphabetical mode|browse countries|alphabeticalDestinations/i],
  ["Regional itinerary mode", /regional itinerary|itinerary mode/i],
  ["Search interface", /type=["']search["']|search drawer|destination search/i],
  ["Batch trip management", /batch trip|trip management|trip checklist/i],
  ["IndexedDB storage", /indexeddb/i],
  ["Expandable detailed view", /<details|detailed deep-dive/i],
  ["Service-worker offline cache", /serviceWorker|caches\.open/i],
  ["Full offline profile download", /CACHE_ALL_SHARDS|Save all profiles offline/i]
];

const sourceStages = ["preArrival", "arrival24h", "mobility", "dailyLiving", "socialCode"];
let sourceEntries = 0;
let invalidSourceMetadata = 0;
let missingStageSources = 0;
for (const destination of destinations) {
  for (const stageName of sourceStages) {
    const sources = destination.stages[stageName].sources;
    if (!Array.isArray(sources) || sources.length === 0) {
      missingStageSources++;
      continue;
    }
    for (const item of sources) {
      sourceEntries++;
      if (!item.url?.startsWith("https://") || !item.lastChecked) invalidSourceMetadata++;
    }
  }
}

const missingElectrical = destinations.filter((destination) => {
  const standard = electrical[destination.iso];
  return !standard?.socketTypes?.length || standard.socketTypes.some((type) =>
    !existsSync(path.join(dataDirectory, "images", `socket-type-${type.toLowerCase()}.svg`))
  );
});

console.log(`Profile roster: ${destinations.length} destination records`);
console.log(`Current status: ${index.destinations.filter((item) => item.profileStatus === "complete").length} marked complete`);
console.log(`Stage sourcing: ${sourceEntries} citation entries; ${missingStageSources} stages without citations; ${invalidSourceMetadata} malformed source metadata entries`);
console.log(`Electrical coverage: ${destinations.length - missingElectrical.length}/${destinations.length} profiles have standards and diagrams`);
console.log("\nProfile topic coverage (keyword/heading screen; not a factual-quality or link-reachability check):");
for (const [stageName, label, pattern] of profileChecks) {
  const matched = destinations.filter((destination) => {
    const stage = destination.stages[stageName];
    return pattern.test(`${stage.simple || ""}\n${stage.detailed || ""}`);
  });
  const missing = destinations.filter((destination) => {
    const stage = destination.stages[stageName];
    return !pattern.test(`${stage.simple || ""}\n${stage.detailed || ""}`);
  });
  console.log(`- ${label}: ${matched.length}/${destinations.length}; missing ${missing.length}${missing.length ? ` [${missing.map((item) => item.iso).join(", ")}]` : ""}`);
}

const genericWaterGuidance = "Tap-water safety varies by locality and building; follow local health guidance and ask your accommodation, using sealed or properly treated water if uncertain.";
const specificWaterPattern = /(tap[- ]water|drinking water).{0,160}(safe|unsafe|potable|drinkable|avoid|boil|filter|treat)|(safe|unsafe|potable|drinkable|avoid|boil|filter|treat).{0,160}(tap[- ]water|drinking water)/i;
const waterGuidance = destinations.filter((destination) => {
  const detailed = (destination.stages.dailyLiving.detailed || "").replace(genericWaterGuidance, "");
  return /^Tap-water safety:/im.test(detailed) || specificWaterPattern.test(detailed);
});
const missingWaterGuidance = destinations.filter((destination) => !waterGuidance.includes(destination));
console.log(`- Country-specific tap-water safety: ${waterGuidance.length}/${destinations.length}; missing ${missingWaterGuidance.length}${missingWaterGuidance.length ? ` [${missingWaterGuidance.map((item) => item.iso).join(", ")}]` : ""}`);

console.log("\nApp feature coverage:");
for (const [label, pattern] of appChecks) {
  console.log(`- ${label}: ${pattern.test(appFiles) ? "present" : "not found"}`);
}
console.log("\nSource URLs are checked for HTTPS and review dates only; the audit does not request or verify remote links.");