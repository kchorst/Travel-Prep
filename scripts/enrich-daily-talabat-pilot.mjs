import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const updates = {
  AE: {
    cities: "Dubai, Abu Dhabi, Sharjah, and other listed UAE cities",
    path: "uae"
  },
  EG: {
    cities: "Cairo, Alexandria, Giza, and other listed Egyptian cities",
    path: "egypt"
  },
  OM: {
    cities: "Muscat-area locations and other listed Omani cities",
    path: "oman"
  },
  QA: {
    cities: "Doha",
    path: "qatar"
  },
  KW: {
    cities: "Kuwait City, Hawally, Ahmadi, and other listed areas",
    path: "kuwait"
  },
  BH: {
    cities: "Bahrain and Muharraq",
    path: "bahrain"
  },
  JO: {
    cities: "Amman, Aqaba, Irbid, and other listed Jordanian cities",
    path: "jordan"
  },
  IQ: {
    cities: "the cities and addresses currently listed on Talabat Iraq",
    url: "https://iraq.talabat.com/"
  }
};
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));

for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination record: ${iso}`);
  const dailyLiving = destination.stages.dailyLiving;
  const simple = `Talabat lists food and local-store delivery in ${destination.country}; check your exact address, operating hours, fees, and payment options.`;
  const detailed = `Delivery and shopping: Talabat's official site lists restaurant, grocery, and pharmacy delivery in ${update.cities}. Merchant availability, fees, hours, and payment methods vary by address; confirm service for your accommodation before relying on delivery.`;
  if (!dailyLiving.simple.includes(simple)) dailyLiving.simple += ` ${simple}`;
  if (!dailyLiving.detailed.includes(detailed)) dailyLiving.detailed += `\n\n${detailed}`;
  const url = update.url || `https://www.talabat.com/${update.path}`;
  if (!dailyLiving.sources.some((item) => item.url === url)) {
    dailyLiving.sources.push({
      topic: `Talabat official local delivery and service-area listings for ${destination.country}`,
      url,
      lastChecked: checked
    });
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added Talabat daily-life guidance for ${Object.keys(updates).join(", ")}.`);