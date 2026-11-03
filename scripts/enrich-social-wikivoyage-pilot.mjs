import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const updates = {
  KR: {
    simple: "Dining: a spoon is commonly used for rice and soup, with chopsticks for side dishes; keep bowls on the table and follow the host's pace.",
    detailed: "Dining interface: Wikivoyage describes Korean meals as commonly pairing individual rice and soup with shared side dishes. The spoon is used for rice and soup, and chopsticks for side dishes; avoid leaving chopsticks upright in rice or lifting bowls from the table. Formality varies by setting, so follow the host or other diners.",
    source: {
      topic: "Adapted from Wikivoyage South Korea, Eat: Etiquette (CC BY-SA 4.0)",
      url: "https://en.wikivoyage.org/wiki/South_Korea"
    }
  },
  TH: {
    simple: "Dining: for many Thai rice meals, eat with a spoon and use the fork to move food onto it; shared dishes are common.",
    detailed: "Dining interface: Wikivoyage describes a common Thai rice-meal pattern of a spoon for eating and a fork for moving food onto the spoon, with shared dishes in the center and individual rice plates. Dishes may arrive as they are prepared, so diners need not wait for every plate. Regional and dish-specific practices vary; follow the people you are dining with.",
    source: {
      topic: "Adapted from Wikivoyage Thailand, Eat: Etiquette (CC BY-SA 4.0)",
      url: "https://en.wikivoyage.org/wiki/Thailand"
    }
  }
};

const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination record: ${iso}`);
  const socialCode = destination.stages.socialCode;
  if (!socialCode.simple.includes(update.simple)) socialCode.simple += ` ${update.simple}`;
  if (!socialCode.detailed.includes(update.detailed)) {
    socialCode.detailed += `\n\n${update.detailed}`;
  }
  if (!socialCode.sources.some((item) => item.url === update.source.url)) {
    socialCode.sources.push({ ...update.source, lastChecked: checked });
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added Wikivoyage-sourced dining guidance for ${Object.keys(updates).join(", ")}.`);