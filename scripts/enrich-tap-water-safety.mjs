import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
const checked = "2026-11-03";

const updates = {
  BR: {
    existing: "Health and water: Tap-water quality and infrastructure vary by municipality/building. Ask locally and use sealed or treated water if uncertain. Bring prescriptions in original packaging and verify import rules.",
    replacement: "Tap-water safety: Tap-water quality varies by municipality and building, and the guide says many Brazilians prefer filtered water. Ask your accommodation about the specific supply; use sealed or treated water if uncertain.\n\nHealth and pharmacy: Bring prescriptions in original packaging and verify import rules.",
    source: "https://en.wikivoyage.org/wiki/Brazil#Stay_healthy"
  },
  ID: {
    existing: "Health and water: Do not assume tap water is potable. Use sealed or treated water. Bring medicines in original packaging and verify Indonesian import restrictions, especially for controlled prescriptions.",
    replacement: "Tap-water safety: Tap water is generally not potable. At restaurants, ask whether served water and ice have been purified or boiled; use sealed bottled or otherwise treated water.\n\nHealth and pharmacy: Bring medicines in original packaging and verify Indonesian import restrictions, especially for controlled prescriptions.",
    previousSource: "https://en.wikivoyage.org/wiki/Indonesia#Stay_healthy",
    source: "https://en.wikivoyage.org/wiki/Indonesia#Water"
  },
  MA: {
    existing: "Water and health: Follow current local health guidance and accommodation advice; use sealed or properly treated water if its safety is uncertain. Carry essential medication and prescriptions, and locate a pharmacy or clinic before travelling to remote areas.",
    previousReplacement: "Tap-water safety: The guide advises visitors not to drink tap water, even in hotels, citing possible storage and plumbing issues. Use sealed bottled water; ask whether water used for ice or drinks has been treated.\n\nHealth and pharmacy: Carry essential medication and prescriptions, and locate a pharmacy or clinic before travelling to remote areas.",
    replacement: "Tap-water safety: Avoid tap water, including ice or cordials made with it, even in hotels. The guide says household storage and plumbing can be a concern; sealed bottled water is widely available and inexpensive.\n\nHealth and pharmacy: Carry essential medication and prescriptions, and locate a pharmacy or clinic before travelling to remote areas.",
    previousSource: "https://en.wikivoyage.org/wiki/Morocco#Stay_healthy",
    source: "https://en.wikivoyage.org/wiki/Morocco#Water"
  },
  NP: {
    existing: "Water and health: Follow current local health guidance and accommodation advice; use sealed or properly treated water if its safety is uncertain. Carry essential medication and prescriptions, and locate a pharmacy or clinic before travelling to remote areas.",
    replacement: "Tap-water safety: Untreated water is unsafe to drink. Use bottled water or treat or boil it; on treks, confirm that refills are treated. Some safe-water stations are reported along the Annapurna Circuit, but do not assume they are available elsewhere.\n\nHealth and pharmacy: Carry essential medication and prescriptions, and locate a pharmacy or clinic before travelling to remote areas.",
    source: "https://en.wikivoyage.org/wiki/Nepal#Stay_healthy"
  },
  SN: {
    existing: "Health and water: Use sealed or appropriately treated water unless your accommodation confirms local guidance. Check the nearest open pharmacy; bring prescriptions in original packaging and verify import rules.",
    replacement: "Tap-water safety: The guide advises avoiding tap water and dishes prepared with it; bottled water is widely available. Check current local notices and ask your accommodation about the specific supply.\n\nHealth and pharmacy: Check the nearest open pharmacy; bring prescriptions in original packaging and verify import rules.",
    source: "https://en.wikivoyage.org/wiki/Senegal#Stay_healthy"
  }
};

for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination profile: ${iso}`);

  const dailyLiving = destination.stages.dailyLiving;
  if (!dailyLiving.detailed.includes(update.replacement)) {
    const previous = update.previousReplacement || update.existing;
    if (!dailyLiving.detailed.includes(previous)) {
      throw new Error(`Expected water guidance not found for ${iso}`);
    }
    dailyLiving.detailed = dailyLiving.detailed.replace(previous, update.replacement);
  }

  const previousSource = update.previousSource && dailyLiving.sources.find((source) => source.url === update.previousSource);
  if (previousSource) {
    previousSource.url = update.source;
    previousSource.topic = `Wikivoyage ${destination.country} tap-water safety guidance`;
    previousSource.lastChecked = checked;
  } else if (!dailyLiving.sources.some((source) => source.url === update.source)) {
    dailyLiving.sources.push({
      topic: `Wikivoyage ${destination.country} tap-water safety guidance`,
      url: update.source,
      lastChecked: checked
    });
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Updated tap-water safety guidance for ${Object.keys(updates).length} profiles.`);