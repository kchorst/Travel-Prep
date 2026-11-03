import { readFile, writeFile } from "node:fs/promises";

const dataPath = new URL("../data/destinations.json", import.meta.url);
const destinations = JSON.parse(await readFile(dataPath, "utf8"));

const updates = {
  China: {
    replace: [
      "Dining: Shared dishes and chopsticks are common. Do not stick chopsticks vertically into rice; ask about dietary needs and use serving utensils when offered.",
      "Dining interface: Shared dishes and chopsticks are common. Do not stick chopsticks vertically into rice; ask about dietary needs and use serving utensils when offered."
    ],
    source: "https://en.wikivoyage.org/wiki/China#Eat"
  },
  Ethiopia: {
    note: "Dining interface: In traditional injera-and-wot meals, diners commonly tear injera by hand to scoop stews, using the right hand. Utensils may be used in other settings; follow the host or venue, since practices vary across Ethiopia's communities.",
    source: "https://en.wikivoyage.org/wiki/Ethiopia#Eat"
  },
  Bangladesh: {
    note: "Dining interface: Eating with the right hand is common; cutlery may be less available in rural eateries and some households, while urban restaurants often provide it. Shared tables and serving practices vary by venue.",
    source: "https://en.wikivoyage.org/wiki/Bangladesh#Eat"
  },
  Indonesia: {
    note: "Dining interface: Eating with the right hand is common in many settings, while cutlery is more usual in some restaurants; chopsticks are also used for some dishes. Follow the venue's setup and use serving utensils for shared dishes.",
    source: "https://en.wikivoyage.org/wiki/Indonesia#Eat"
  },
  India: {
    note: "Dining interface: Hand-eating is common; use the right hand. For communal dishes, use the serving utensil rather than reaching in by hand. At restaurants with cutlery, follow the venue's setup; practices vary by region and setting.",
    source: "https://en.wikivoyage.org/wiki/India#Eat"
  },
  Ghana: {
    note: "Dining interface: When eating or offering food, avoid using the left hand. The guide notes that visitors' mistakes are generally accepted; follow the host's lead on utensils and shared dishes.",
    source: "https://en.wikivoyage.org/wiki/Ghana#Respect"
  },
  "Saudi Arabia": {
    note: "Dining interface: Traditional Saudi meals are commonly eaten by hand using the right hand; utensils may not be used in home settings. Follow the host's lead, since practices and venue setups vary.",
    source: "https://en.wikivoyage.org/wiki/Saudi_Arabia#Eat"
  },
  Senegal: {
    note: "Dining interface: If invited to share ceebu jen with a Senegalese family, the guide describes eating by hand from a communal bowl. This is a specific home-meal example, not a universal rule; follow the host's lead and use utensils if provided.",
    source: "https://en.wikivoyage.org/wiki/Senegal#Eat"
  },
  Japan: {
    replace: [
      "Transit and dining: Keep phone calls quiet on public transport and follow queue markings. Use serving utensils for shared dishes and avoid sticking chopsticks upright in rice.",
      "Transit: Keep phone calls quiet on public transport and follow queue markings.\n\nDining interface: Most Japanese meals use chopsticks; avoid leaving them upright in rice. Follow the venue's setup, since some dishes and settings use other utensils."
    ],
    source: "https://en.wikivoyage.org/wiki/Japan#Eat"
  },
  Laos: {
    note: "Dining interface: Sticky rice is traditionally eaten by hand from a small basket; use the right hand to pinch off a portion and dip or wrap it around accompanying food. Follow the host's lead for other dishes and settings.",
    source: "https://en.wikivoyage.org/wiki/Laos#Eat"
  },
  Myanmar: {
    note: "Dining interface: Burmese diners commonly use a spoon and fork, or their fingers when convenient. Utensils and practices can vary with the dish and setting; follow the host's or venue's cues.",
    source: "https://en.wikivoyage.org/wiki/Myanmar#Eat"
  },
  Singapore: {
    note: "Dining interface: Forks and spoons are common; Chinese dishes often use chopsticks, while Indian food may be eaten by hand. Use the right hand for hand-eating. Shared dishes are common, and serving spoons can be requested; norms vary by cuisine and venue.",
    source: "https://en.wikivoyage.org/wiki/Singapore#Eat"
  },
  Thailand: {
    replace: [
      "Dining interface: Wikivoyage describes a common Thai rice-meal pattern of a spoon for eating and a fork for moving food onto the spoon, with shared dishes in the center and individual rice plates. Dishes may arrive as they are prepared, so diners need not wait for every plate. Regional and dish-specific practices vary; follow the people you are dining with.",
      "Dining interface: Thai meals commonly use a spoon in the right hand and a fork to move food onto it; chopsticks are mainly used for noodle soups and East Asian-style dishes. Sticky rice is eaten by hand in Isaan, unlike jasmine rice. Meals are often shared from central dishes; follow the table's cues and start eating as dishes arrive."
    ],
    source: "https://en.wikivoyage.org/wiki/Thailand#Eat"
  },
  "Sri Lanka": {
    note: "Dining interface: Eating with the right hand is common, but eateries can provide cutlery. If trying the local style, use your fingertips; follow the venue's setup and local cues.",
    source: "https://en.wikivoyage.org/wiki/Sri_Lanka#Eat"
  },
  Nepal: {
    note: "Dining interface: Traditional dal-bhat is commonly eaten with the right hand. Practices vary by household, community, and restaurant; follow the host's lead and use the utensils provided when applicable.",
    source: "https://en.wikivoyage.org/wiki/Nepal#Eat"
  },
  Malaysia: {
    note: "Dining interface: Forks and spoons are widely used; Malay and Indian meals may traditionally be eaten by hand with the right hand, while Chinese dishes commonly use chopsticks. Shared dishes are common; follow the setting's cues and use serving tools where offered.",
    source: "https://en.wikivoyage.org/wiki/Malaysia#Eat"
  },
  Pakistan: {
    note: "Dining interface: Eating with the right hand is common; bread such as naan or roti may be torn and used to scoop food, while a spoon is commonly used for rice dishes. Practices vary by dish and setting; follow the host's lead.",
    source: "https://en.wikivoyage.org/wiki/Pakistan#Eat"
  },
  Philippines: {
    note: "Dining interface: Some households and groups observe a serving-spoon rule for shared dishes; use the serving spoon rather than your personal spoon to transfer food. Customs vary, so follow the host's lead.",
    source: "https://en.wikivoyage.org/wiki/Philippines#Eat"
  },
  Taiwan: {
    note: "Dining interface: Meals commonly use chopsticks, with shared dishes placed at the table's center; serving spoons or communal chopsticks may be provided. Use serving tools where offered and follow the setting's cues.",
    source: "https://en.wikivoyage.org/wiki/Taiwan#Eat"
  },
  Vietnam: {
    note: "Dining interface: Vietnamese meals often bring family and friends together around shared food. The checked travel guidance does not establish one nationwide utensil rule; use the venue's utensils, observe how shared dishes are served, and ask if unsure.",
    source: "https://en.wikivoyage.org/wiki/Vietnamese_cuisine"
  }
};

for (const [country, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.country === country);
  if (!destination) throw new Error(`Missing destination profile: ${country}`);

  const socialCode = destination.stages.socialCode;
  if (update.replace) {
    const [existing, replacement] = update.replace;
    if (socialCode.detailed.includes(existing)) {
      socialCode.detailed = socialCode.detailed.replace(existing, replacement);
    } else if (!/^Dining interface:/m.test(socialCode.detailed)) {
      throw new Error(`Expected dining text not found for ${country}`);
    }
  } else if (!/^Dining interface:/m.test(socialCode.detailed)) {
    const marker = "\n\nHofstede cultural dimensions:";
    if (!socialCode.detailed.includes(marker)) {
      throw new Error(`Hofstede section not found for ${country}`);
    }
    socialCode.detailed = socialCode.detailed.replace(
      marker,
      `\n\n${update.note}${marker}`
    );
  }

  const topic = `Wikivoyage ${country} dining-interface guidance`;
  if (!socialCode.sources.some((source) => source.topic === topic)) {
    socialCode.sources.unshift({
      topic,
      url: update.source,
      lastChecked: "2026-11-03"
    });
  }
}

await writeFile(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Updated dining-interface guidance for ${Object.keys(updates).length} profiles.`);