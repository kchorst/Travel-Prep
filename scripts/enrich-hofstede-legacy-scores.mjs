import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
const checked = "2026-11-03";
const matrixUrl = "https://geerthofstede.com/research-and-vsm/dimension-data-matrix/";
const csvUrl = "https://geerthofstede.com/wp-content/uploads/2016/08/6-dimensions-for-website-2015-08-16.csv";

const legacyScores = new Map([
  ["Andorra", { indulgence: 65 }],
  ["Cyprus", { indulgence: 70 }],
  ["Mali", { "long-term orientation": 20, indulgence: 43 }],
  ["Rwanda", { "long-term orientation": 18, indulgence: 37 }],
  ["Uganda", { "long-term orientation": 24, indulgence: 52 }],
  ["Zimbabwe", { "long-term orientation": 15, indulgence: 28 }]
]);

const dimensionPatterns = {
  "long-term orientation": /(?:^|; )long-term orientation\s+\d+/i,
  indulgence: /(?:^|; )indulgence\s+\d+/i
};

for (const [country, scores] of legacyScores) {
  const destination = destinations.find((item) => item.country === country);
  if (!destination) throw new Error(`Missing destination profile: ${country}`);

  const socialCode = destination.stages.socialCode;
  const paragraphs = socialCode.detailed.split("\n\n");
  const frameworkIndex = paragraphs.findIndex((paragraph) => paragraph.startsWith("Hofstede cultural dimensions:"));
  if (frameworkIndex < 0) throw new Error(`Missing current Hofstede section: ${country}`);

  const currentNote = paragraphs[frameworkIndex];
  const hasNoCurrentScore = currentNote.includes(`lists no country score for ${country}`) ||
    currentNote.includes(`lists no current score for ${country}`);
  if (!hasNoCurrentScore) throw new Error(`Expected no-current-score annotation for ${country}`);
  for (const dimension of Object.keys(scores)) {
    if (dimensionPatterns[dimension].test(currentNote)) {
      throw new Error(`Refusing to overwrite ${country} ${dimension} score from the current series`);
    }
  }

  paragraphs[frameworkIndex] = currentNote.replace(
    `The Culture Factor public comparison tool lists no country score for ${country}`,
    `The Culture Factor's updated public comparison tool lists no current score for ${country}`
  );

  const scoreText = Object.entries(scores)
    .map(([dimension, score]) => `${dimension} score as ${score}`)
    .join("; ");
  const legacyNote = `Hofstede legacy 2015 scores: ${scoreText}. The source identifies the matrix as base data from Cultures and Organizations (3rd edition, 2010), with dataset version 2015-12-08. These historical values fill only dimensions with no score in The Culture Factor's updated series; they are not interchangeable with or updates to that series. Some raw values in the legacy file fall outside the 0-100 range, so compare scores only within their original methodology. These are broad country-level comparisons, not predictions about individuals or subnational groups.`;
  const legacyIndex = paragraphs.findIndex((paragraph) => paragraph.startsWith("Hofstede legacy 2015 scores:"));
  if (legacyIndex < 0) paragraphs.push(legacyNote);
  else paragraphs[legacyIndex] = legacyNote;
  socialCode.detailed = paragraphs.join("\n\n");

  const citations = [
    { topic: "Geert Hofstede legacy six-dimension data matrix (2015 dataset)", url: matrixUrl },
    { topic: "Geert Hofstede 6-dimensions-for-website-2015-08-16.csv", url: csvUrl }
  ];
  for (const citation of citations) {
    if (!socialCode.sources.some((source) => source.url === citation.url)) {
      socialCode.sources.push({ ...citation, lastChecked: checked });
    }
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
const scoreCount = [...legacyScores.values()].reduce((count, scores) => count + Object.keys(scores).length, 0);
console.log(`Added ${scoreCount} legacy scores across ${legacyScores.size} profiles without overwriting current scores.`);