import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const destinationsPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const frameworkUrl = "https://www.theculturefactor.com/country-comparison-tool";
const destinations = JSON.parse(readFileSync(destinationsPath, "utf8"));
const additions = [
  ["dog culture", "Dog culture: Public access, leash expectations, and attitudes toward companion dogs vary by locality and venue. Check transport, park, and accommodation rules; do not approach an unfamiliar dog without its handler's permission."],
  ["cat culture", "Cat culture: Household cats and free-roaming cats may be encountered, but local practices differ. Ask an owner or caretaker before feeding or handling an unfamiliar cat, and check accommodation pet policies."],
  ["bird culture", "Bird culture: Treat native and wild birds as wildlife, not pets. Do not feed, capture, buy, or remove wild birds; follow protected-area rules and check official requirements before travelling with a pet bird."],
  ["hofstede cultural dimensions", "Hofstede cultural dimensions: The framework compares power distance, individualism versus collectivism, motivation toward achievement and success, uncertainty avoidance, long-term orientation, and indulgence. No country score is asserted here. Treat published scores as broad comparisons, not predictions about individuals or communities."]
];

let updated = 0;
for (const destination of destinations) {
  const socialCode = destination.stages.socialCode;
  let detailed = socialCode.detailed || "";
  detailed = detailed.replace(/\bHofstede dimensions:/gi, "Hofstede cultural dimensions:");

  const paragraphs = additions
    .filter(([heading]) => !new RegExp(`^${heading}:`, "im").test(detailed))
    .map(([, paragraph]) => paragraph);
  if (paragraphs.length) {
    detailed = [detailed.trim(), ...paragraphs].filter(Boolean).join("\n\n");
  }
  if (detailed !== socialCode.detailed) {
    socialCode.detailed = detailed;
    const sources = Array.isArray(socialCode.sources) ? socialCode.sources : [];
    if (!sources.some((item) => item.url === frameworkUrl)) {
      sources.push({ topic: "Hofstede framework and interpretation caveats", url: frameworkUrl, lastChecked: checked });
    }
    socialCode.sources = sources;
    updated++;
  }
}

writeFileSync(destinationsPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added or normalized universal culture sections for ${updated} profiles.`);