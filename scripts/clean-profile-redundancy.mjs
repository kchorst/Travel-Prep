import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
let changes = 0;

function detailItems(destination, stageKey) {
  return destination.stages[stageKey].detailed.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);
}

function saveItems(destination, stageKey, items) {
  destination.stages[stageKey].detailed = items.map((item) => item.trim()).filter(Boolean).join("\n\n");
}

function destination(iso) {
  const found = destinations.find((item) => item.iso === iso);
  if (!found) throw new Error(`Missing destination ${iso}`);
  return found;
}

function replaceGroup(iso, stageKey, matches, replacement) {
  const record = destination(iso);
  const items = detailItems(record, stageKey);
  const firstIndex = items.findIndex(matches);
  if (firstIndex < 0) return;
  const selected = items.filter(matches);
  if (selected.length === 1 && selected[0] === replacement) return;
  const retained = items.filter((item) => !matches(item));
  if (replacement) retained.splice(Math.min(firstIndex, retained.length), 0, replacement);
  saveItems(record, stageKey, retained);
  changes += Math.max(1, selected.length - (replacement ? 1 : 0));
}

function removeMatching(iso, stageKey, matches) {
  const record = destination(iso);
  const items = detailItems(record, stageKey);
  const retained = items.filter((item) => !matches(item));
  changes += items.length - retained.length;
  saveItems(record, stageKey, retained);
}

function cleanWalletDetails() {
  for (const record of destinations) {
    const items = detailItems(record, "arrival24h");
    const howToPay = items.find((item) => item.startsWith("How to pay:"));
    const walletIndex = items.findIndex((item) => item.startsWith("Phone and watch wallets:"));
    if (!howToPay || walletIndex < 0) continue;

    const howSentences = new Set(howToPay.slice(howToPay.indexOf(":") + 1).split(/(?<=[.!?])\s+/).map(normalize));
    const wallet = items[walletIndex];
    const walletSentences = wallet.slice(wallet.indexOf(":") + 1).split(/(?<=[.!?])\s+/).map((sentence) => sentence.trim()).filter(Boolean);
    const uniqueSentences = walletSentences.filter((sentence) => !howSentences.has(normalize(sentence)));
    const usefulSentences = uniqueSentences.flatMap((sentence) => {
      if (/^Country availability does not guarantee/i.test(sentence)) return ["Check device and watch eligibility with the provider."];
      if (/^The merchant must also accept contactless/i.test(sentence)) return [];
      if (/^Keep a physical Visa\/Mastercard/i.test(sentence)) return [];
      return [sentence];
    });
    const cleaned = usefulSentences.length
      ? `Phone and watch wallets: ${unique([...new Set(usefulSentences.map(normalize))].map((normalized) => usefulSentences.find((sentence) => normalize(sentence) === normalized))).join(" ")}`
      : "";
    if (cleaned !== wallet) {
      if (cleaned) items[walletIndex] = cleaned;
      else items.splice(walletIndex, 1);
      saveItems(record, "arrival24h", items);
      changes++;
    }
  }
}

function normalize(text) {
  return text.toLowerCase().replace(/^[^:]{1,60}:\s*/, "").replace(/\s+/g, " ").trim();
}

function unique(items) {
  return [...new Set(items)];
}

cleanWalletDetails();

for (const record of destinations) {
  const items = detailItems(record, "arrival24h");
  const emergencyResponse = items.find((item) => item.startsWith("Emergency response:"));
  if (!emergencyResponse) continue;
  const responseNumbers = new Set(emergencyResponse.match(/\b\d{2,5}\b/g) || []);
  const retained = items.filter((item) => {
    if (!/^Emergency:/i.test(item)) return true;
    const numbers = item.match(/\b\d{2,5}\b/g) || [];
    return !numbers.length || !numbers.every((number) => responseNumbers.has(number));
  });
  if (retained.length !== items.length) {
    changes += items.length - retained.length;
    saveItems(record, "arrival24h", retained);
  }
}

for (const iso of ["DZ", "BW", "TZ", "ZM"]) {
  removeMatching(iso, "arrival24h", (item) => item.startsWith("Emergency response:"));
}

replaceGroup("IS", "arrival24h", (item) => item.startsWith("Airport transfer:"),
  "Airport transfer: Most international flights use Keflavik Airport (KEF), about 50 km from Reykjavik. Airport coaches, including Flybus and Airport Direct, connect KEF with Reykjavik; check the operator for current departures, booking, and the exact city or hotel drop-off. Taxis and rental cars are also available. Reykjavik Airport (RKV), next to the city centre, mainly serves domestic flights and is a different airport. Confirm pickup details and service hours for late arrivals.");

replaceGroup("JP", "dailyLiving", (item) => /Mitsuya Cider|Mitsuya Cider ZERO|Mitsuya Cider and a ZERO variant/i.test(item),
  "Japan: Asahi's official Mitsuya lineup includes Mitsuya Cider and Mitsuya Cider ZERO. These are named product examples, not a guarantee of broad selection or local stock; compare package labels for sugar and ingredients and check local convenience stores for availability.");

replaceGroup("KE", "mobility", (item) => item.startsWith("Ride-hailing:") && /YEGO/i.test(item),
  "Ride-hailing: YEGO's Kenya site lists taxi service and links to its August 2026 Nairobi boda-boda launch; the motorcycle service is a recent, city-specific addition, not nationwide. SafeBoda also lists SafeCar and SafeBoda rides, plus Nairobi-area package delivery. Confirm vehicle type, pickup point, fare, and helmet before booking. No YEGO food-delivery service or Uganda launch was verified in the official pages checked.");

removeMatching("UZ", "socialCode", (item) => item.startsWith("Home visits:") && /traditional Uzbek tea service/i.test(item));

replaceGroup("AL", "dailyLiving", (item) => item.startsWith("Beverage and dietary norms:"),
  "Beverage and dietary norms: Check labels for ingredients and added sugar, and ask specifically for unsweetened or zero-sugar options because names and formulas vary. Confirm allergens and dietary needs directly with the venue.");

replaceGroup("UG", "dailyLiving", (item) => item.startsWith("Courier delivery:"),
  "Courier delivery: SafeBoda's Uganda site lists package delivery alongside ride services. Confirm the current service area and item rules in the app; this is not evidence of restaurant menu ordering. For prepared-food delivery, use a dedicated food-ordering app and verify live merchants, hours, fees, and service at your exact address.");
removeMatching("UG", "dailyLiving", (item) => /^(Check your exact address for current restaurants, shops, and fees\.|SafeBoda lists parcel delivery in Uganda\.|Check the current city and exact address\.|For restaurant menus, use a dedicated food-ordering app\.)$/i.test(item));

replaceGroup("KE", "dailyLiving", (item) => item.startsWith("SafeBoda lists Nairobi-area parcel delivery"), "");
removeMatching("KE", "dailyLiving", (item) => item === "Check your exact address for current restaurants, shops, and fees.");

replaceGroup("MH", "arrival24h", (item) => item.startsWith("Airport transfer:"),
  "Airport transfer: Amata Kabua International Airport (MAJ) is on the south side of Majuro Atoll, with downtown farther north; inter-island air routes are limited. Hotels often provide transfers and taxis serve the airport-to-town journey; taxis may pick up additional passengers en route. Confirm your pickup with the accommodation before arrival, especially if a shared ride is not suitable.");

replaceGroup("RW", "arrival24h", (item) => item.startsWith("Airport transfer:"),
  "Airport transfer: Kigali International Airport (KGL) has taxis waiting for arriving passengers, and hotel transfers serve the city. The Kigali guide lists buses on the road in front of the airport toward Remera, central Kigali, and Nyabugogo; confirm the destination and stop before boarding. Agree the taxi price before travel; airport guides can assist with transport and car hire.");

replaceGroup("SB", "arrival24h", (item) => item.startsWith("Airport transfer:"),
  "Airport transfer: Honiara International Airport (HIR), also known as Henderson Field, is east of the city on Guadalcanal; many outer islands require domestic flights or boats. Taxis and minibuses run along the coast between Henderson and White River, with stops along the way. Check current service, destination, terminal, pickup point, and fare locally; consider a hotel-arranged pickup after dark and review current security advice.");

replaceGroup("PK", "arrival24h", (item) => item.startsWith("Airport transfer:"),
  "Airport transfer: Islamabad Airport provides current flight and passenger information. Pakistan Airports Authority lists radio-cab service at the Concourse Hall and yellow cabs in the car parking area at Islamabad International Airport (ISB); some hotels also offer pickup. Check current provider information, arrange hotel pickup directly, and verify the vehicle, destination, and fare before departure.");

removeMatching("PK", "arrival24h", (item) => /^Emergency: Police 15\.$|^Ambulance or fire 1122\.$/i.test(item));

removeMatching("CO", "arrival24h", (item) => item.startsWith("At Bogota El Dorado (BOG), use the airport's regulated taxi dispatch"));
for (const iso of ["DK", "GB"]) {
  removeMatching(iso, "arrival24h", (item) => item.startsWith("Payments: Google Wallet and Apple Pay list tap-to-pay support"));
}
removeMatching("GH", "arrival24h", (item) => item.startsWith("Payments: MTN MoMo is a local mobile-money option"));
removeMatching("MH", "arrival24h", (item) => /^(Taxis connect the airport with Majuro's main town\.|At Amata Kabua Airport \(MAJ\), hotel transfers are often available\.|Taxi service connects the airport with Majuro's main town\.)$/i.test(item));
removeMatching("RW", "arrival24h", (item) => item.startsWith("At Kigali International Airport (KGL), airport taxis wait" ) || item === "Fire 111.");
removeMatching("SB", "arrival24h", (item) => item.startsWith("At Honiara International Airport (HIR), taxis and coastal minibuses connect") || item.startsWith("At Honiara International Airport (HIR), taxi service and coastal bus service connect"));
removeMatching("TH", "socialCode", (item) => item.startsWith("Dining: for many Thai rice meals, eat with a spoon"));
removeMatching("VU", "arrival24h", (item) => item.startsWith("At Port Vila Airport (VLI), taxis have posted destination fares"));
replaceGroup("TO", "arrival24h", (item) => item.startsWith("At Fuaʻamotu Airport (TBU),") || item.startsWith("At Fua'amotu Airport (TBU),"),
  "At Fuaʻamotu Airport (TBU), taxis meet arriving flights and Teta Tours minibuses serve hotels and guesthouses in Nukuʻalofa.");

const preferredPositions = [
  ["IS", "arrival24h", "Airport transfer:", 5],
  ["JP", "dailyLiving", "Japan: Asahi's official Mitsuya lineup", 8],
  ["KE", "mobility", "Ride-hailing: YEGO's Kenya site", 3],
  ["AL", "dailyLiving", "Beverage and dietary norms:", 4],
  ["UG", "dailyLiving", "Courier delivery:", 8],
  ["MH", "arrival24h", "Airport transfer:", 2],
  ["RW", "arrival24h", "Airport transfer:", 3],
  ["SB", "arrival24h", "Airport transfer:", 2],
  ["PK", "arrival24h", "Airport transfer:", 3]
];

for (const [iso, stageKey, prefix, index] of preferredPositions) {
  const record = destination(iso);
  const items = detailItems(record, stageKey);
  const currentIndex = items.findIndex((item) => item.startsWith(prefix));
  if (currentIndex < 0 || currentIndex === index) continue;
  const [item] = items.splice(currentIndex, 1);
  items.splice(Math.min(index, items.length), 0, item);
  saveItems(record, stageKey, items);
  changes++;
}

for (const record of destinations) {
  for (const [stageKey, stage] of Object.entries(record.stages)) {
    const trimmedDetailed = stage.detailed.trim();
    if (trimmedDetailed !== stage.detailed) {
      stage.detailed = trimmedDetailed;
      changes++;
    }
    const items = detailItems(record, stageKey);
    const seen = new Set();
    const retained = items.filter((item) => {
      const key = normalize(item).replace(/[.!?]+$/, "");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    if (retained.length !== items.length) {
      changes += items.length - retained.length;
      saveItems(record, stageKey, retained);
    }
  }
}

if (changes) writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(JSON.stringify({ profiles: destinations.length, detailedItemsChangedOrRemoved: changes }, null, 2));