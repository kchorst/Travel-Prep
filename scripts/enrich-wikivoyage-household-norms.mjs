import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
const checked = "2026-11-04";

const notes = new Map([
  ["BA", {
    text: "Home visits: Wikivoyage says that coffee is almost always served when visiting a Bosnian home, together with a homemade sweet such as bread, cookies, or cake, and meza.",
    url: "https://en.wikivoyage.org/wiki/Bosnia_and_Herzegovina#Eat",
    topic: "Wikivoyage Bosnia and Herzegovina: home hospitality",
    append: true
  }],
  ["BT", {
    text: "Household context: Wikivoyage notes that extended families commonly live under one roof in Bhutan, and that cousin and sibling terms can blur; a person introduced as a 'cousin-brother' or 'cousin-sister' may be a cousin. Follow the person's own introduction rather than assuming exact family relationships.",
    url: "https://en.wikivoyage.org/wiki/Bhutan#Talk",
    topic: "Wikivoyage Bhutan: extended families and kinship terms",
    append: true
  }],
  ["TG", {
    text: "Guest interactions: Wikivoyage advises greeting everyone when coming and going in Togo and notes that handshakes are important. Its guide does not specify private-home footwear or gift rules.",
    url: "https://en.wikivoyage.org/wiki/Togo#Respect",
    topic: "Wikivoyage Togo: greetings and guest interactions",
    append: true
  }],
  ["SY", {
    text: "Guest interactions: Wikivoyage notes that unannounced arrivals are common in Syria and that hosts may pause what they are doing to receive guests. This describes the source's account of local hosting, not a recommendation to arrive without an invitation; confirm plans with your host.",
    url: "https://en.wikivoyage.org/wiki/Syria#Respect",
    topic: "Wikivoyage Syria: unannounced guest arrivals",
    append: true
  }],
  ["TM", {
    text: "Home visits: Wikivoyage's home-etiquette guidance recommends removing shoes when entering a Turkmen home and bringing a small gift rather than arriving empty-handed. It also notes that bread is usually offered and advises using both hands to eat it. Ask your host about family or local variations.",
    url: "https://en.wikivoyage.org/wiki/Turkmenistan#Home_Etiquette",
    topic: "Wikivoyage Turkmenistan: home etiquette",
    append: true
  }],
  ["BF", {
    text: "Guest interactions: Wikivoyage advises greeting and acknowledging people wherever you go in Burkina Faso, noting that failing to do so is considered rude. It also recommends using the right hand for handshakes and when handing something to another person. This is general social etiquette, not a specific home-visit rule.",
    url: "https://en.wikivoyage.org/wiki/Burkina_Faso#Respect",
    topic: "Wikivoyage Burkina Faso: greetings and right-hand etiquette",
    append: true
  }],
  ["BI", {
    text: "Home visits: Wikivoyage says invited guests in Burundi may be offered snacks and drinks, and that rejecting them can be taken as a sign you do not appreciate the hosts' hospitality. If you have a dietary or health restriction, explain it politely rather than eating something unsafe.",
    url: "https://en.wikivoyage.org/wiki/Burundi#Respect",
    topic: "Wikivoyage Burundi: refreshments for home guests",
    append: true
  }],
  ["CM", {
    text: "Home visits: Wikivoyage advises greeting the oldest person first when visiting a Cameroonian home and not arriving empty-handed. It also says not to ask the host for a tour of the home, and recommends the right hand for handshakes and passing things. Follow the household's cues on any other customs.",
    url: "https://en.wikivoyage.org/wiki/Cameroon#Respect",
    topic: "Wikivoyage Cameroon: home-visit etiquette",
    append: true
  }],
  ["TD", {
    text: "Shared meals: Wikivoyage advises using the right hand when eating with or being served by Muslim hosts in Chad, where food is commonly eaten without utensils. The guidance is specific to meals with Muslim hosts, not a rule for every household.",
    url: "https://en.wikivoyage.org/wiki/Chad#Eat",
    topic: "Wikivoyage Chad: shared-meal etiquette",
    append: true
  }],
  ["KM", {
    text: "Home visits: If a local invites you to stay overnight, Wikivoyage recommends asking whether they prefer payment for food or lodging. It notes that some hosts may regard a visitor as an honored guest and find payment unusual; follow your host's preference.",
    url: "https://en.wikivoyage.org/wiki/Comoros#Sleep",
    topic: "Wikivoyage Comoros: overnight guest hospitality",
    append: true
  }],
  ["GN", {
    text: "Home visits and shared meals: Wikivoyage says visitors may be invited to eat at a Guinean home and recommends accepting when possible. If you cannot, it suggests politely saying 'prochainement' ('next time').",
    url: "https://en.wikivoyage.org/wiki/Guinea#Respect",
    topic: "Wikivoyage Guinea: home-meal invitations",
    append: true
  }],
  ["GW", {
    text: "Shared meals: Wikivoyage notes that meals in Guinea-Bissau are commonly shared in a group from a large bowl, and visitors may be invited to join. Follow the host's cues for how to participate.",
    url: "https://en.wikivoyage.org/wiki/Guinea-Bissau#Eat",
    topic: "Wikivoyage Guinea-Bissau: shared meals",
    append: true
  }],
  ["GY", {
    text: "Home visits: Wikivoyage says people in Guyana do not wear shoes in their homes and expect visitors to do the same. Check at the door for the household's preference.",
    url: "https://en.wikivoyage.org/wiki/Guyana#Respect",
    topic: "Wikivoyage Guyana: shoes in homes",
    append: true
  }],
  ["GE", {
    text: "Home visits: Wikivoyage explicitly suggests accepting an invitation to dinner at a Georgian home when possible, describing hosts as eager to share food with visitors. It separately describes a supra as a celebratory banquet, such as for a wedding or birthday, with abundant food and drink and a toastmaster; not every home meal is a supra. Follow your host's cues.",
    url: "https://en.wikivoyage.org/wiki/Georgia_(country)#Eat",
    topic: "Wikivoyage Georgia: home dinner invitations and supra",
    append: true
  }],
  ["IS", {
    text: "Home visits: Wikivoyage says it is customary to remove shoes after entering a private home in Iceland; hosts will let you know if they do not mind shoes.",
    url: "https://en.wikivoyage.org/wiki/Iceland#Respect",
    topic: "Wikivoyage Iceland: shoes in private homes",
    append: true
  }],
  ["IR", {
    text: "Home visits and hospitality: Wikivoyage describes ta'arof as a polite offer-and-refusal exchange between hosts and guests, and advises visitors to be politely direct. It says dinner guests are expected to accept food offered, and that on a first or special home visit, a small gift such as flowers, sweets, or pastries is customary. Follow your host's cues and account for dietary needs.",
    url: "https://en.wikivoyage.org/wiki/Iran#Respect",
    topic: "Wikivoyage Iran: ta'arof and hospitality",
    additionalSources: [{
      url: "https://en.wikivoyage.org/wiki/Iran#Eat",
      topic: "Wikivoyage Iran: dinner hospitality and host gifts"
    }],
    append: true
  }],
  ["LS", {
    text: "Guest interactions and shared meals: Wikivoyage recommends addressing elders or higher-status people as Ntate (men) or 'Me (women), responding when people greet you, and using both hands to give or receive items. It also advises showing respect for food and not eating while walking.",
    url: "https://en.wikivoyage.org/wiki/Lesotho#Respect",
    topic: "Wikivoyage Lesotho: greetings and food etiquette",
    append: true
  }],
  ["LR", {
    text: "Guest interactions: Wikivoyage advises greeting people wherever you go in Liberia, noting that ignoring them may be considered rude. It also says direct refusals can be perceived as rude and that softer responses are common. If you cannot meet a request, respond politely but clearly rather than promising something you cannot do. This is general social etiquette, not a household-specific rule.",
    url: "https://en.wikivoyage.org/wiki/Liberia#Respect",
    topic: "Wikivoyage Liberia: greetings and tactful refusals",
    append: true
  }],
  ["ML", {
    text: "Guest interactions: Wikivoyage emphasizes greeting people in Mali and suggests learning greetings in French or, preferably, Bambara. It recommends showing interest by asking about the other person's family, work, or children, and gives 'Ça va?' as an example. This is general social etiquette, not a household-specific rule; adapt to the person's language and context.",
    url: "https://en.wikivoyage.org/wiki/Mali#Respect",
    topic: "Wikivoyage Mali: greetings and showing interest",
    append: true
  }],
  ["MA", {
    text: "Home invitations: Wikivoyage notes that people met on trains may invite travelers to their home for couscous. This is a possibility described for train encounters, not a routine expectation; confirm plans directly with the host.",
    url: "https://en.wikivoyage.org/wiki/Morocco#Get_around",
    topic: "Wikivoyage Morocco: home invitations during train journeys",
    append: true
  }],
  ["LY", {
    text: "Home visits: Wikivoyage says invited guests in Libya may be offered tea, coffee, and snacks, and that refusing could be taken as unappreciative. It notes hosts may offer second helpings as a sign of respect and that meals are eaten with the right hand. If you have a dietary or health restriction, explain it politely and follow your host's cues.",
    url: "https://en.wikivoyage.org/wiki/Libya#Home_etiquette",
    topic: "Wikivoyage Libya: home etiquette",
    append: true
  }],
  ["MG", {
    text: "Village visits: If you have business to conduct in a remote Malagasy village, Wikivoyage recommends first meeting the village head; it notes that doing so can save time. This is a local protocol for conducting business, not a requirement for every tourist visit.",
    url: "https://en.wikivoyage.org/wiki/Madagascar#Respect",
    topic: "Wikivoyage Madagascar: village protocol",
    append: true
  }],
  ["MR", {
    text: "Shared meals and home hospitality: Wikivoyage advises using the right hand when eating in Mauritania, especially outside Nouakchott where cutlery may not be offered. It also says tea is usually served after a meal at someone's home and that leaving before at least the second of three glasses is impolite; if you need to stop earlier, explain politely.",
    url: "https://en.wikivoyage.org/wiki/Mauritania#Respect",
    topic: "Wikivoyage Mauritania: shared meals and home tea",
    additionalSources: [{
      url: "https://en.wikivoyage.org/wiki/Mauritania#Eat",
      topic: "Wikivoyage Mauritania: tea at home"
    }],
    append: true
  }],
  ["MN", {
    text: "Nomadic ger visits: Wikivoyage advises greeting people on arrival, receiving items with the right hand and palm up, and taking at least a sip or nibble of refreshments offered by hosts. It says not to refuse an invitation into a nomadic family's ger or food and drink offered by the hosts, and cautions visitors not to stand on or lean over the threshold. These customs are specifically about ger visits; follow your hosts' cues and allow for local variation.",
    url: "https://en.wikivoyage.org/wiki/Mongolia#Respect",
    topic: "Wikivoyage Mongolia: ger-visit etiquette",
    append: true
  }],
  ["MW", {
    text: "Guest interactions: Wikivoyage recommends greeting people in Malawi and asking how they are before getting to the point. It also advises using both hands when giving or receiving items as a sign of respect.",
    url: "https://en.wikivoyage.org/wiki/Malawi#Respect",
    topic: "Wikivoyage Malawi: greetings and passing items",
    append: true
  }],
  ["MM", {
    text: "Home visits and shared meals: Wikivoyage notes that lahpet thoke (fermented tea-leaf salad) is often served to visitors at a home. Dishes and practices vary by household; follow your host's cues and mention dietary restrictions.",
    url: "https://en.wikivoyage.org/wiki/Myanmar#Eat",
    topic: "Wikivoyage Myanmar: food served to home visitors",
    append: true
  }],
  ["NE", {
    text: "Home visits and hosting: Wikivoyage notes that 'salam-u-laikum' is used in Niger when entering a house or greeting someone. Its visitor guidance also recommends accepting small tokens such as tea, soft drinks, or gifts where possible, describing hospitality as a point of honor. Customs vary, so follow the host's cues and politely explain dietary or health restrictions.",
    url: "https://en.wikivoyage.org/wiki/Niger#Talk",
    topic: "Wikivoyage Niger: greetings when entering a home",
    additionalSources: [{
      url: "https://en.wikivoyage.org/wiki/Niger#Respect",
      topic: "Wikivoyage Niger: accepting host hospitality"
    }],
    append: true
  }],
  ["NA", {
    text: "Guest interactions: Wikivoyage describes a brief 'How are you?' or 'Howzit?' exchange, followed by a short reply, as customary before getting to business in Namibia. It gives tourist-information desks, markets, taxis, and shops in Windhoek as examples; this is general greeting etiquette, not a home-visit rule. Separately, the guide says a host may be happy to make potjie, a slow-cooked meal in a cast-iron pot, when inviting someone for a private meal. This describes one possible meal on a private invitation, not a general rule for every household.",
    url: "https://en.wikivoyage.org/wiki/Namibia#Respect",
    topic: "Wikivoyage Namibia: everyday greetings",
    additionalSources: [{
      url: "https://en.wikivoyage.org/wiki/Namibia#Eat",
      topic: "Wikivoyage Namibia: potjie for a private meal"
    }],
    removeText: ["Guest interactions: Wikivoyage describes a brief 'How are you?' or 'Howzit?' exchange, followed by a short reply, as customary before getting to business in Namibia. It gives tourist-information desks, markets, taxis, and shops in Windhoek as examples; this is general greeting etiquette, not a home-visit rule. Separately, the guide says a host may be happy to make potjie, a slow-cooked meal in a cast-iron pot, when inviting someone for a private meal. This describes one possible meal on a private invitation, not a general rule for every household."],
    append: true
  }],
  ["NZ", {
    text: "Home visits: Wikivoyage says it is polite to bring a gift when visiting someone's house; simple biscuits or a cake from a local store are sufficient. Household footwear preferences vary, so remove your shoes if unsure. For stays of more than a few days, the guide says leaving a token amount toward the power bill (it gives $20 as an example) may be polite when staying with a host under 35, especially in a shared home. Treat this as context-specific advice, not a fixed fee; follow your host's preference.",
    url: "https://en.wikivoyage.org/wiki/New_Zealand#Respect",
    topic: "Wikivoyage New Zealand: gifts, shoes, and longer home stays",
    append: true
  }],
  ["NP", {
    text: "Home visits: Wikivoyage advises making sure you are invited before entering someone's house; a visitor may be welcome only on the outer porch or in the yard. Shoes are routinely left on the front porch or in a designated area near the front door. Follow the household's directions about where to enter and leave footwear.",
    url: "https://en.wikivoyage.org/wiki/Nepal#Respect",
    topic: "Wikivoyage Nepal: home invitations and footwear",
    append: true
  }],
  ["NL", {
    text: "Home visits: Wikivoyage says coffee is commonly offered when visiting someone's home; it describes a cup as 'almost compulsory' and notes that 'Koffie?' ('Coffee?') is often one of the first questions at the door. Coffee is traditionally served in a small cup with a cookie; some guests may also be offered a pastry. Follow your host's cues.",
    url: "https://en.wikivoyage.org/wiki/Netherlands#Coffee_and_tea",
    topic: "Wikivoyage Netherlands: coffee offered to home visitors",
    append: true
  }],
  ["SD", {
    text: "Home visits and hosting: Wikivoyage says invited guests in Sudan are often offered tea, coffee, and snacks; refusing may be taken as unappreciative. It also describes unannounced arrivals as customary and says hosts attend to guests. This describes reported hosting practice, not a recommendation to arrive without checking. Use the right hand when greeting or passing something, and follow your host's cues; politely explain dietary or health restrictions.",
    url: "https://en.wikivoyage.org/wiki/Sudan#Respect",
    topic: "Wikivoyage Sudan: home visits and host etiquette",
    append: true
  }],
  ["SB", {
    text: "Village visits: Ask permission before entering a village, going ashore on a locally owned island, following a trail, or visiting a beach or cultural site. Wikivoyage advises asking your accommodation or guide to identify the appropriate chief, elder, or landowner and explain any access or kastom fee. Customs vary by province; do not assume an apparently empty place is public land.",
    url: "https://en.wikivoyage.org/wiki/Solomon_Islands#Respect",
    topic: "Wikivoyage Solomon Islands: village and landowner protocols",
    append: true
  }],
  ["PG", {
    text: "Guest interactions: Wikivoyage says a friendly handshake is important in many Melanesian cultures and notes that avoiding eye contact can be a sign of respect in Papua New Guinea. Customs vary widely among communities, so follow the other person's cues and ask a local host or guide about customary settings.",
    url: "https://en.wikivoyage.org/wiki/Papua_New_Guinea#Respect",
    topic: "Wikivoyage Papua New Guinea: greetings and eye contact",
    append: true
  }],
  ["TJ", {
    text: "Shared meals: Wikivoyage notes that Tajik osh/plov may be served on one large communal plate for the table, and that qurutob is traditionally eaten by hand from a communal plate. Follow the host's cues and mention dietary needs.",
    url: "https://en.wikivoyage.org/wiki/Tajikistan#Eat",
    topic: "Wikivoyage Tajikistan: shared-plate meals",
    append: true
  }],
  ["ZM", {
    text: "Guest interactions: Wikivoyage advises greeting people and asking how they are before making a request. It says Zambians commonly shake hands; in some settings, supporting your right wrist or elbow with your left hand is a respectful gesture. Avoid a very firm handshake and follow the other person's cues.",
    url: "https://en.wikivoyage.org/wiki/Zambia#Talk",
    topic: "Wikivoyage Zambia: greeting before making a request",
    additionalSources: [{
      url: "https://en.wikivoyage.org/wiki/Zambia#Respect",
      topic: "Wikivoyage Zambia: handshake etiquette"
    }],
    append: true
  }],
  ["SO", {
    text: "Home visits and shared meals: Wikivoyage's home-etiquette guidance says invited guests may be offered snacks or refreshments, and that refusing them can offend hosts. It describes unannounced arrivals as normal, but this reports local practice, not advice to arrive uninvited; confirm with your host. Meals may be eaten by hand using the right hand, without utensils. Customs vary by community; follow the host's cues and explain dietary or health restrictions.",
    url: "https://en.wikivoyage.org/wiki/Somalia#Home_etiquette",
    topic: "Wikivoyage Somalia: home etiquette and shared meals",
    append: true
  }],
  ["ZW", {
    text: "Guest interactions: Wikivoyage advises greeting and acknowledging people when entering a space in Zimbabwe. In rural areas, it describes supporting the forearm with the opposite hand when shaking hands or passing something valuable as a sign of respect. Visitors are not expected to know this; a polite handshake is fine. Customs vary, so follow local cues.",
    url: "https://en.wikivoyage.org/wiki/Zimbabwe#Respect",
    topic: "Wikivoyage Zimbabwe: greetings and rural guest etiquette",
    append: true
  }],
  ["AO", {
    text: "Home visits and guest etiquette: When visiting an Angolan home, Wikivoyage advises greeting the oldest person first; at a meal, the oldest person in the household starts eating first. It also recommends taking time to greet the local soba (chief) when travelling in rural areas. Customs vary, so follow your host's cues.",
    url: "https://en.wikivoyage.org/wiki/Angola#Respect",
    topic: "Wikivoyage Angola: home visits and rural greetings",
    append: true
  }],
  ["DZ", {
    text: "Home visits: If invited to an Algerian home, Wikivoyage advises not smoking unless the host does; even then, ask permission before smoking. Follow the household's preference.",
    url: "https://en.wikivoyage.org/wiki/Algeria#Respect",
    topic: "Wikivoyage Algeria: smoking in a host's home",
    append: true
  }],
  ["AM", {
    text: "Home visits and shared meals: Wikivoyage recommends bringing a modest gift, such as chocolates or flowers, when invited to an Armenian home; expensive gifts are unnecessary. If offered more food, avoid an outright refusal; leaving a little on your plate can signal that you are finished. When staying overnight, make an effort to socialize with your hosts and other generations. The guide describes unannounced visits as common, but this is not a recommendation to arrive without checking.",
    url: "https://en.wikivoyage.org/wiki/Armenia#Respect",
    topic: "Wikivoyage Armenia: home etiquette and shared meals",
    append: true
  }],
  ["ET", {
    text: "Home visits and hospitality: Wikivoyage says to remove your shoes when entering a home in Ethiopia. It describes an invitation into someone's home for the traditional coffee ceremony as a special honour; the ceremony traditionally includes at least three cups of coffee and popcorn. Customs can vary by household, so follow your host's cues and mention dietary or health restrictions.",
    url: "https://en.wikivoyage.org/wiki/Ethiopia#Respect",
    topic: "Wikivoyage Ethiopia: shoes and home visits",
    additionalSources: [{
      url: "https://en.wikivoyage.org/wiki/Ethiopia#Drink",
      topic: "Wikivoyage Ethiopia: traditional home coffee ceremony"
    }],
    append: true
  }],
  ["IQ", {
    text: "Shared meals and hospitality: Wikivoyage describes meals in Iraq as social events, says refusing food is considered impolite, and notes that tea is offered in homes as part of hospitality. Follow the host's cues and explain dietary or health restrictions; practices vary by region and household.",
    url: "https://en.wikivoyage.org/wiki/Iraq#Eat",
    topic: "Wikivoyage Iraq: shared meals and home hospitality",
    append: true
  }],
  ["PY", {
    text: "Home visits and shared meals: In rural Paraguay, Wikivoyage says homes may not have doorbells, so visitors clap outside the gate to announce their arrival. If a host offers food, the guide recommends accepting and complimenting it, as refusing may offend. Customs vary; follow the household's cues and explain dietary or health restrictions.",
    url: "https://en.wikivoyage.org/wiki/Paraguay#Respect",
    topic: "Wikivoyage Paraguay: rural home visits and offered food",
    append: true
  }],
  ["CU", {
    text: "Home invitations: Wikivoyage advises accepting an invitation into a Cuban home for supper and describes invited guests as honored guests. Confirm plans with your host; this is invitation etiquette, not a recommendation to arrive uninvited.",
    url: "https://en.wikivoyage.org/wiki/Cuba#Respect",
    topic: "Wikivoyage Cuba: invitations to supper at home",
    append: true
  }],
  ["HU", {
    text: "Home visits: Wikivoyage says shoes should generally be removed when entering a Hungarian home. Check with your host if unsure, as household preferences may vary.",
    url: "https://en.wikivoyage.org/wiki/Hungary#Respect",
    topic: "Wikivoyage Hungary: shoes in homes",
    append: true
  }],
  ["GM", {
    text: "Guest interactions in The Gambia: Wikivoyage notes that a visitor may be invited to join a local family for a traditional meal. The guide does not say where the meal is held or prescribe a general guest rule; treat this as a possibility, not an expectation.",
    url: "https://en.wikivoyage.org/wiki/Gambia#Stay_safe",
    topic: "Wikivoyage The Gambia: possible family meal invitation",
    append: true
  }],
  ["YE", {
    text: "Guest interactions in Yemen: Wikivoyage says visitors are often invited to share a local meal. The guide does not specify that these meals are held in private homes or prescribe a general guest rule.",
    url: "https://en.wikivoyage.org/wiki/Yemen#Eat",
    topic: "Wikivoyage Yemen: invitations to share local meals",
    append: true
  }],
  ["AT", {
    text: "Home visits: Wikivoyage says it is customary in most Austrian households to take off your shoes. Household preferences can vary, so check with your host if unsure.",
    url: "https://en.wikivoyage.org/wiki/Austria#Respect",
    topic: "Wikivoyage Austria: shoes in most households",
    append: true
  }],
  ["AZ", {
    text: "Home visits: When invited into an Azerbaijani home, Wikivoyage advises bringing a gift; it gives an odd number of flowers, chocolate, or something representative of your country as examples, and says not to bring wine or other alcohol. On arrival, take off your shoes just outside or immediately inside the door unless the owner explicitly says otherwise; slippers may be offered. This guidance is about home invitations, and host preferences take priority.",
    url: "https://en.wikivoyage.org/wiki/Azerbaijan#Respect",
    topic: "Wikivoyage Azerbaijan: invitation gifts and shoes at home",
    append: true
  }],
  ["BD", {
    text: "Home visits during Eid: Wikivoyage notes that visitors may be invited into a private home for a feast at Eid-ul-Fitr, and that during Eid-ul-Azha Bangladeshis visit friends' and relatives' homes, exchange Eid greetings, and invite others to their homes. These are holiday-period practices, not year-round expectations; Eid dates follow the lunar calendar.",
    url: "https://en.wikivoyage.org/wiki/Bangladesh#Holidays",
    topic: "Wikivoyage Bangladesh: home visits and invitations during Eid",
    append: true
  }],
  ["CA", {
    text: "Home visits: Wikivoyage says it is usually expected to remove your shoes when entering a Canadian private home, unless the host specifically tells you not to. Follow your host's preference.",
    url: "https://en.wikivoyage.org/wiki/Canada#Respect",
    topic: "Wikivoyage Canada: shoes in private homes",
    append: true
  }],
  ["CL", {
    text: "Home visits and gatherings: Wikivoyage says Chileans traditionally greet each person individually when arriving at or leaving a house or gathering. For a large group of about 20 or more, a wave to everyone may be acceptable.",
    url: "https://en.wikivoyage.org/wiki/Chile#Respect",
    topic: "Wikivoyage Chile: greetings at homes and gatherings",
    append: true
  }],
  ["CN", {
    text: "Home visits: Wikivoyage says a small gift is welcome when visiting a home in China, with wine, fruit, or something from your country as examples. It says it is generally rude to open a gift in front of the giver unless invited; wait until they have left and open it privately. It also advises removing shoes and asking for slippers when hosts wear them indoors, even if they say shoes may stay on. Gift taboos vary by region and generation, so ask a local if unsure.",
    url: "https://en.wikivoyage.org/wiki/China#Respect",
    topic: "Wikivoyage China: home-visit gifts and indoor footwear",
    append: true
  }],
  ["DK", {
    text: "Home visits: Wikivoyage says invitations from Danes to visit their home are generally genuine rather than mere politeness, so accept if you can. Bring a small gift; chocolate, flowers, or wine are common examples. Use good table manners when eating in someone's home.",
    url: "https://en.wikivoyage.org/wiki/Denmark#Respect",
    topic: "Wikivoyage Denmark: home invitations, small gifts, and table manners",
    append: true
  }],
  ["FI", {
    text: "Home visits: When invited to a Finnish home, remove your outdoor shoes; the guide says this is customary even in summer. Very formal private-home occasions, such as a baptism or 50th birthday party, are exceptions. In winter, guests sometimes bring clean shoes to wear indoors. A gift such as pastry, wine, or flowers is appreciated but not required. If invited to a home or cottage sauna, the guide describes the invitation as an honour, while noting that Finns understand some visitors may not wish to join.",
    url: "https://en.wikivoyage.org/wiki/Finland#Respect",
    topic: "Wikivoyage Finland: private-home footwear and gifts",
    additionalSources: [{
      url: "https://en.wikivoyage.org/wiki/Finland#Sauna",
      topic: "Wikivoyage Finland: invitations to a home or cottage sauna"
    }],
    append: true
  }],
  ["DE", {
    text: "Home visits: Wikivoyage says private home invitations are generally meant sincerely. For a home invitation, arriving 5–15 minutes late may be more polite than arriving early, so the host has time to prepare. Bring a small consumable gift; wine or spirits may suit an occasion where alcohol is expected, and a treat from your place of origin may interest the hosts. Leave shoes at the entrance; ask if unsure, as hosts often provide house shoes. Hosts will likely offer food or drink. Let them know about allergies or dietary restrictions ahead of time.",
    url: "https://en.wikivoyage.org/wiki/Germany#Respect",
    topic: "Wikivoyage Germany: home invitations and guest customs",
    append: true
  }],
  ["IN", {
    text: "Home visits: Wikivoyage advises removing your shoes when visiting someone's home. It also recommends asking what the household does not eat before planning a meal, as food restrictions vary among people and communities.",
    url: "https://en.wikivoyage.org/wiki/India#Religious_etiquette",
    topic: "Wikivoyage India: footwear and dietary questions in a home",
    append: true
  }],
  ["IE", {
    text: "Home visits: When visiting an Irish home, arrive on time. Wikivoyage contrasts this with Ireland's otherwise relaxed and flexible view of time.",
    url: "https://en.wikivoyage.org/wiki/Ireland#Respect",
    topic: "Wikivoyage Ireland: punctuality for home visits",
    append: true
  }],
  ["IL", {
    text: "Shabbat at a family home: If attending Shabbat services at a family's house, Wikivoyage recommends planning ahead and researching expectations, or going with a local contact who can advise on details such as where to sit and when to arrive. This guidance is specific to attending services in a home, not a general home-visit rule.",
    url: "https://en.wikivoyage.org/wiki/Israel#Society",
    topic: "Wikivoyage Israel: planning for Shabbat services at a family home",
    append: true
  }],
  ["MY", {
    text: "Home visits: Wikivoyage says to take off your shoes when entering a home in Malaysia. Follow the household's preference if your host gives different instructions.",
    url: "https://en.wikivoyage.org/wiki/Malaysia#Respect",
    topic: "Wikivoyage Malaysia: removing shoes when entering a home",
    append: true
  }],
  ["LK", {
    text: "Home visits: Wikivoyage says it is customary to remove shoes before entering a Sri Lankan home, though this is not followed as strictly as in some other countries. Check the household's preference and follow your host's directions.",
    url: "https://en.wikivoyage.org/wiki/Sri_Lanka#Respect",
    topic: "Wikivoyage Sri Lanka: removing shoes before entering a home",
    append: true
  }],
  ["KG", {
    text: "Table invitations: When invited to a Kyrgyz person's table for tea, Wikivoyage says the cup is not filled all the way so the host can serve more. If you have had enough, cover your cup and say 'Ichtym' ('I've drunk'); the host may offer more a few times to make sure you are satisfied. The source describes an invitation to a person's table but does not specify that it is always a private home.",
    url: "https://en.wikivoyage.org/wiki/Kyrgyzstan#Drinking_tea",
    topic: "Wikivoyage Kyrgyzstan: tea at a guest's table",
    append: true
  }],
  ["SG", {
    text: "Home visits: Wikivoyage says to remove your shoes before entering a Singaporean home; socks are acceptable, and slippers offered for the bathroom are generally not for wearing elsewhere. It advises avoiding gifts involving animal products and notes that white flowers are usually associated with funerals; cookies or cake are suggested as safe choices. Knives and clocks can symbolize severed ties and death. It also says gifts are generally opened privately after the giver has left. Household and religious preferences vary, so follow your host's cues.",
    url: "https://en.wikivoyage.org/wiki/Singapore#Respect",
    topic: "Wikivoyage Singapore: home visits, footwear, and gifts",
    append: true
  }],
  ["SE", {
    text: "Home visits: Wikivoyage says removing shoes is customary in most Swedish homes; check the entrance for other guests' shoes, and bring indoor shoes if you are dressed up or want them for warmth. For a private invitation, arrive on time but not early, as the guide says arriving early is considered rude.",
    url: "https://en.wikivoyage.org/wiki/Sweden#Respect",
    topic: "Wikivoyage Sweden: shoes and arrival time for home visits",
    append: true
  }],
  ["TW", {
    text: "Home visits: Wikivoyage says to remove your shoes before entering a Taiwanese house; visitor slippers may be provided by the entrance. It notes that slippers may also need to be changed for separate pairs in bathrooms and on balconies. Follow the household's directions.",
    url: "https://en.wikivoyage.org/wiki/Taiwan#Respect",
    topic: "Wikivoyage Taiwan: shoes and slippers in the home",
    append: true
  }],
  ["AE", {
    text: "Home meals: Wikivoyage says that when invited to an Emirati home, customs vary by family: a traditional household may seat guests on the floor and serve a shared platter eaten by hand, while others may provide individual plates and cutlery. In a shared meal, use the right hand. The guide says it is customary to accept food; if full, take a small amount rather than refusing it outright. Follow your hosts' cues.",
    url: "https://en.wikivoyage.org/wiki/United_Arab_Emirates#Eat",
    topic: "Wikivoyage UAE: meals in an Emirati home",
    append: true
  }],
  ["UY", {
    text: "Home visits: Wikivoyage says Uruguayans normally keep their shoes on when entering a house. It attributes this custom to a local belief about catching a cold when walking barefoot; check what your host prefers.",
    url: "https://en.wikivoyage.org/wiki/Uruguay#Respect",
    topic: "Wikivoyage Uruguay: shoes in the home",
    append: true
  }],
  ["UZ", {
    text: "Home visits: Wikivoyage describes a traditional Uzbek tea service in which the host keeps tea cups partly filled and may refill them. The guide says a completely filled cup can rarely signal that it is time to leave. It also says tea and cups are given and received with the right hand; follow your host's cues.",
    url: "https://en.wikivoyage.org/wiki/Uzbekistan#Drink",
    topic: "Wikivoyage Uzbekistan: tea service in the home",
    append: true
  }],
  ["GB", {
    text: "Home visits: Wikivoyage says guests are commonly offered tea or coffee soon after arriving at someone's home. If invited for a meal, tell your host about dietary requirements beforehand. For a private-home meal, it describes putting a cloth napkin on your lap; a paper napkin can be used the same way or left on the table.",
    url: "https://en.wikivoyage.org/wiki/United_Kingdom#Drink",
    topic: "Wikivoyage UK: drinks offered to home visitors",
    additionalSources: [{
      url: "https://en.wikivoyage.org/wiki/United_Kingdom#Eat",
      topic: "Wikivoyage UK: dietary needs and dining in a private home"
    }],
    append: true
  }],
  ["US", {
    text: "Home visits: Wikivoyage suggests asking the host whether you can contribute food or something useful for an outdoor cookout. If you are not asked to bring a dish, a small host gift such as wine, candy, or fresh-cut flowers is considered good manners; cash and personal items are not appropriate. Do not expect a food gift to be served with the meal. At a potluck or carry-in, each guest brings a dish to share, so ask the host what would be useful.",
    url: "https://en.wikivoyage.org/wiki/United_States#Eat",
    topic: "Wikivoyage United States: home-meal invitations and host gifts",
    append: true
  }],
  ["CY", {
    text: "Home visits: When invited to a Cypriot home, Wikivoyage advises not refusing anything offered, as the host may find refusal insulting.",
    url: "https://en.wikivoyage.org/wiki/Cyprus#Respect",
    topic: "Wikivoyage Cyprus: accepting offers in a home",
    removeText: [" If a dietary or health restriction prevents accepting something, explain it politely."],
    append: true
  }],
  ["CZ", {
    text: "Home visits: Wikivoyage says to remove your shoes when entering a Czech household; slippers are usually worn indoors. A traditional host may ask you to change into house shoes as a hygiene precaution, though the guide says this is rare, and hosts may offer slippers to keep your feet warm. It also notes that an invitation to someone's home is a good opportunity to try traditional Czech food, which may be prepared for Sundays, holidays, or family visits rather than served in restaurants. This is a food-related opportunity, not a universal hosting rule.",
    url: "https://en.wikivoyage.org/wiki/Czech_Republic#Respect",
    topic: "Wikivoyage Czechia: footwear and traditional home meals",
    additionalSources: [{
      url: "https://en.wikivoyage.org/wiki/Czech_Republic#Eat",
      topic: "Wikivoyage Czechia: traditional meals prepared at home"
    }],
    append: true
  }],
  ["BH", {
    text: "Guest interactions in Bahrain: Wikivoyage says traditional Bahraini food is hard to find in restaurants and that, if you have Bahraini friends, being invited to a home meal is the best chance to try local cuisine. This is a specific food-related opportunity, not a general home-visit rule.",
    url: "https://en.wikivoyage.org/wiki/Bahrain#Eat",
    topic: "Wikivoyage Bahrain: home meal invitation and local cuisine",
    append: true
  }],
  ["TN", {
    text: "Guest interactions in Tunisia: Wikivoyage notes that being invited to someone's home is one way to experience local cooking. It presents this as a food-related opportunity, not a general household or guest rule.",
    url: "https://en.wikivoyage.org/wiki/Tunisia#Eat",
    topic: "Wikivoyage Tunisia: home meal invitation and local cuisine",
    append: true
  }],
  ["NO", {
    text: "Home visits: Wikivoyage says to remove your shoes when entering a Norwegian home, noting that wearing shoes into someone's living room is regarded as disrespectful. After being served food in a private home, it is customary to thank the host by saying 'takk for maten' ('thanks for the meal'); at more formal occasions, this may be accompanied by a handshake. Household practices can vary.",
    url: "https://en.wikivoyage.org/wiki/Norway#Respect",
    topic: "Wikivoyage Norway: shoes and thanks in a private home",
    append: true
  }],
  ["NG", {
    text: "Home visits in predominantly Muslim northern households: Wikivoyage advises notifying the household in advance so women have time to prepare, then knocking and waiting to be invited in. Hosts may ask visitors to wait while women are informed. This is region- and household-specific guidance, not a rule for all of Nigeria.",
    url: "https://en.wikivoyage.org/wiki/Nigeria#Respect",
    topic: "Wikivoyage Nigeria: advance notice when visiting homes in the north",
    append: true
  }],
  ["QA", {
    text: "Shared meals in Qatari homes: Wikivoyage says traditional Qatari food is hard to find in restaurants and, if you have Qatari friends, an invitation to their home is generally the best chance to try it. It notes that Qatari food is traditionally eaten by hand and advises using only the right hand. This is specifically about Qatari home meals; follow your host's cues.",
    url: "https://en.wikivoyage.org/wiki/Qatar#Eat",
    topic: "Wikivoyage Qatar: Qatari home meals and eating by hand",
    append: true
  }],
  ["TZ", {
    text: "Guest interactions in Swahili-speaking settings: Wikivoyage describes 'shikamoo' as a customary greeting for elders or superiors; the usual reply is 'marahaba'. In Zanzibar, 'chei chei' is given as an equivalent. Language and customs vary regionally, so use the local form appropriate to the person and place.",
    url: "https://en.wikivoyage.org/wiki/Tanzania#Respect",
    topic: "Wikivoyage Tanzania: Swahili greetings for elders",
    append: true
  }],
  ["HT", {
    text: "Guest interactions: Wikivoyage recommends greeting people politely and treating them as equals. It also suggests sharing water or food with a driver, guide, or interpreter. Avoid handing out candy or cash to children or individuals; the guide says this can compromise their dignity. This supports public guest etiquette, not home-visit shoe or gift rules.",
    url: "https://en.wikivoyage.org/wiki/Haiti#Respect"
  }],
  ["CF", {
    text: "Shared meals: If eating with locals and using your hands, Wikivoyage advises eating with the right hand. It says the left hand is generally used for lavatory purposes and may be considered rude or unappealing at a meal.",
    url: "https://en.wikivoyage.org/wiki/Central_African_Republic#Respect"
  }],
  ["ER", {
    text: "Shared meals and greetings: Wikivoyage says the left hand is considered dirty for greeting, eating, or handing things to someone; using both hands to pass something is acceptable and may be seen as respectful.",
    url: "https://en.wikivoyage.org/wiki/Eritrea#Respect"
  }],
  ["FJ", {
    text: "Home visits and village protocols: Wikivoyage says yaqona (kava), offered as sevusevu, is the most common gift to bring when visiting a Fijian village or household. Ask your host or local guide about the protocol for that community.",
    url: "https://en.wikivoyage.org/wiki/Fiji#Drink"
  }],
  ["WS", {
    text: "Home visits and village protocols: Wikivoyage advises removing shoes before entering a house. If visiting a village, follow its local protocols; Sunday and sundown prayer observances may affect when visitors should pass through.",
    url: "https://en.wikivoyage.org/wiki/Samoa#Respect"
  }],
  ["VU", {
    text: "Village visits and gifts: Wikivoyage says gifts are appreciated in Vanuatu. For a village chief, a bag of rice may be received with gratitude, while a much larger cash gift can seem patronizing and create the wrong expectation. Ask a local host or guide about protocol before giving anything.",
    url: "https://en.wikivoyage.org/wiki/Vanuatu#Buy"
  }],
  ["RO", {
    text: "Home visits: Wikivoyage says guests are expected to remove their shoes when entering someone's house; leaving them on may disappoint the host. Follow the household's directions.",
    url: "https://en.wikivoyage.org/wiki/Romania#Respect",
    topic: "Wikivoyage Romania: footwear in homes",
    append: true
  }],
  ["RU", {
    text: "Home visits: Wikivoyage advises bringing a gift such as food or a beverage when invited to a Russian home, removing shoes before entering, and dressing modestly (noting this may not apply to young people). If bringing flowers, use an odd number and avoid yellow flowers, which are associated with infidelity. Gift and dress preferences can vary, so follow your host's cues.",
    url: "https://en.wikivoyage.org/wiki/Russia#Home_etiquette",
    topic: "Wikivoyage Russia: home-visit gifts, footwear, and dress",
    append: true
  }],
  ["SA", {
    text: "Home visits and shared meals: Wikivoyage advises bringing a small gift when invited to a Saudi home; avoid extravagant or romantic gifts, and notes that an individual man and woman should not exchange gifts. At a meal, wait until invited to eat (the oldest person usually starts), use the right hand, and sample the dishes. Hosts may offer repeated helpings as a sign of respect; the guide also describes socializing before the meal and guests leaving after it. Follow the host's cues and account for dietary needs.",
    url: "https://en.wikivoyage.org/wiki/Saudi_Arabia#Home_etiquette",
    topic: "Wikivoyage Saudi Arabia: home visits and shared meals",
    append: true
  }],
  ["SK", {
    text: "Home visits: Wikivoyage advises taking off outdoor shoes in the hallway when entering a Slovak home; hosts will usually offer slippers. If invited for a meal, a small gift such as wine, spirits, chocolates, or flowers is appreciated, but money can make it seem as though you are paying for the hospitality.",
    url: "https://en.wikivoyage.org/wiki/Slovakia#Respect",
    topic: "Wikivoyage Slovakia: home-visit gifts and footwear",
    append: true
  }],
  ["SI", {
    text: "Home visits: Wikivoyage advises bringing a bottle of good wine when invited to dinner at someone's home and complimenting the cook before being asked whether you liked the meal. It also recommends removing your shoes on entry; hosts may offer slippers or tell you to keep your shoes on.",
    url: "https://en.wikivoyage.org/wiki/Slovenia#Respect",
    topic: "Wikivoyage Slovenia: dinner gifts, thanks, and footwear",
    append: true
  }],
  ["RS", {
    text: "Home visits: Wikivoyage advises bringing a gift on a first visit to a Serbian home; flowers, chocolate, or something representative of your country are examples. In a rural home, remove your shoes unless the owner says otherwise. Hosts will generally offer food or drink, and it is polite to ask for a glass of water if you are thirsty.",
    url: "https://en.wikivoyage.org/wiki/Serbia#Respect",
    topic: "Wikivoyage Serbia: first-visit gifts and home footwear",
    append: true
  }],
  ["KR", {
    text: "Home visits: Wikivoyage says you are expected to remove your shoes when entering a South Korean home; indoor slippers may be provided. Follow the household's directions about footwear.",
    url: "https://en.wikivoyage.org/wiki/South_Korea#Respect",
    topic: "Wikivoyage South Korea: footwear in homes",
    append: true
  }],
  ["TH", {
    text: "Home visits: Wikivoyage says removing your shoes before entering a private home is mandatory etiquette. It also advises not to visibly sniff food when eating in someone's home, even if you mean it as appreciation.",
    url: "https://en.wikivoyage.org/wiki/Thailand#Respect",
    topic: "Wikivoyage Thailand: shoes and food manners in homes",
    append: true
  }],
  ["TR", {
    text: "Home visits: Wikivoyage advises bringing a gift when invited to a Turkish home; flowers, chocolate, or something representative of your country are examples, while alcohol may be inappropriate if you do not know whether the host drinks. Remove your shoes at or just inside the door unless the host explicitly says otherwise. Do not smoke unless the host does first, and ask permission before smoking.",
    url: "https://en.wikivoyage.org/wiki/Turkey#Respect",
    topic: "Wikivoyage Turkey: home-visit gifts, footwear, and smoking",
    append: true
  }],
  ["VN", {
    text: "Home visits: Wikivoyage says it is customary to remove your shoes before entering people's homes.",
    url: "https://en.wikivoyage.org/wiki/Vietnam#Respect",
    topic: "Wikivoyage Vietnam: footwear in homes",
    append: true
  }],
  ["ID", {
    text: "Home visits: Wikivoyage advises removing your footwear outside before entering a house, unless the owner explicitly allows you to keep it on. It also recommends using the right hand when handing something to someone; if you need to use the left hand, apologize politely.",
    url: "https://en.wikivoyage.org/wiki/Indonesia#Respect",
    topic: "Wikivoyage Indonesia: footwear and passing items at home",
    append: true
  }],
  ["JP", {
    text: "Home visits: Wikivoyage says that if you are invited to a Japanese home, bringing a small gift is essentially mandatory; something shareable and consumable from your home country is suggested. Gifts are generally opened after the giver has left unless invited otherwise. Remove your shoes before entering a private home. The guide notes that Japanese people rarely invite guests to their homes, so accept an invitation as a meaningful gesture.",
    url: "https://en.wikivoyage.org/wiki/Japan#Respect",
    topic: "Wikivoyage Japan: home invitations, gifts, and footwear",
    append: true
  }],
  ["LA", {
    text: "Home visits: Wikivoyage says to remove your shoes before entering a private house in Laos. Follow your host's directions about footwear.",
    url: "https://en.wikivoyage.org/wiki/Laos#Respect",
    topic: "Wikivoyage Laos: footwear in private homes",
    append: true
  }],
  ["GR", {
    text: "Home hospitality: Wikivoyage advises guests to sample everything on their plate when offered food by Greek hosts.",
    url: "https://en.wikivoyage.org/wiki/Greece#Respect",
    topic: "Wikivoyage Greece: food offered by home hosts",
    append: true
  }],
  ["JM", {
    text: "Home visits: Wikivoyage notes that Jamaicans generally do not invite people they do not know well to their homes. If invited, remove your shoes before entering.",
    url: "https://en.wikivoyage.org/wiki/Jamaica#Respect",
    topic: "Wikivoyage Jamaica: home invitations and footwear",
    append: true
  }],
  ["PL", {
    text: "Home visits: Wikivoyage advises bringing a gift when invited to a Polish home; flowers are a common choice, and bouquets should have an odd number of flowers. Alcohol may suit some hosts, but depends on their preferences and your familiarity. Ask whether you should remove your shoes; hosts may not mind, but appreciate being asked.",
    url: "https://en.wikivoyage.org/wiki/Poland#Respect",
    topic: "Wikivoyage Poland: home-visit gifts and footwear",
    append: true
  }],
  ["ES", {
    text: "Home stays: Wikivoyage advises bringing indoor shoes, such as slippers, when staying in a Spanish home. Walking barefoot is considered unsanitary; socks may be acceptable in a close friend's home, but ask first.",
    url: "https://en.wikivoyage.org/wiki/Spain#Respect",
    topic: "Wikivoyage Spain: indoor footwear in a host's home",
    append: true
  }],
  ["KE", {
    text: "Home visits: Wikivoyage advises bringing a small gift suited to the occasion when invited to a Kenyan home. It is considered disrespectful to reject food offered to you; visitors are commonly offered tea and chapati or mandazi.",
    url: "https://en.wikivoyage.org/wiki/Kenya#Respect",
    topic: "Wikivoyage Kenya: home-visit gifts and food",
    append: true
  }],
  ["BR", {
    text: "Home visits: Wikivoyage says Brazilians normally keep their shoes on at home and do not expect visitors to remove theirs. Remove your shoes if your hosts ask or you see them doing so.",
    url: "https://en.wikivoyage.org/wiki/Brazil#Respect",
    topic: "Wikivoyage Brazil: footwear in a host's home",
    append: true
  }],
  ["AR", {
    text: "Home visits: Wikivoyage notes that at an Argentinian home, hosts will have Fernet and Coke to offer; Fernet is commonly mixed with Coke.",
    url: "https://en.wikivoyage.org/wiki/Argentina#Respect",
    topic: "Wikivoyage Argentina: Fernet and Coke offered at home",
    append: true
  }],
  ["PH", {
    text: "Home visits and shared meals: Wikivoyage advises removing your shoes when entering a home unless your hosts say otherwise; they may provide slippers. At a meal, wait until the host invites you to start eating. Refusing food the host offers or leaving while someone is still eating is considered impolite.",
    url: "https://en.wikivoyage.org/wiki/Philippines#Respect",
    topic: "Wikivoyage Philippines: home footwear and host-led meals",
    additionalSources: [{
      url: "https://en.wikivoyage.org/wiki/Philippines#Eat",
      topic: "Wikivoyage Philippines: host-led meal etiquette"
    }],
    refreshSources: true,
    removeText: ["Home and religious visits: Ask whether to remove shoes and whether a small gift is welcome. Follow church dress rules and the host's lead at meals."],
    append: true
  }],
  ["PK", {
    text: "Home visits: Wikivoyage notes that guests entering a Pakistani home may be offered tea, sweets, snacks, or gifts, and that refusing them may offend the hosts. It advises not arriving empty-handed; a simple gift such as sweets is enough. Hosts may encourage second helpings as a sign of respect, so follow their cues. If you have dietary or health restrictions, explain them politely rather than accepting unsafe food.",
    url: "https://en.wikivoyage.org/wiki/Pakistan#Respect",
    topic: "Wikivoyage Pakistan: refreshments and home hospitality",
    append: true
  }],
  ["AF", {
    text: "Home visits: When invited to an Afghan home, Wikivoyage says guests may be offered tea, sweets, snacks, and gifts; refusing them can leave a bad impression. Hosts may encourage second helpings as a sign of respect. If full or managing a dietary or health restriction, explain politely and follow the host's cues; the source does not establish a single utensil practice across Afghanistan's diverse communities.",
    url: "https://en.wikivoyage.org/wiki/Afghanistan#Respect",
    topic: "Wikivoyage Afghanistan: invited-home hospitality",
    refreshSources: true,
    removeText: ["Dining interface: Wikivoyage describes Afghan home hospitality as including repeated offers of tea, sweets, snacks, and second helpings. It does not establish one utensil practice across the country's varied communities; follow the host's lead with shared dishes and ask if unsure. If full, thank the host and say so, since a clean plate may invite another serving. Customs vary by household."],
    append: true
  }],
  ["BG", {
    text: "Home invitations: Wikivoyage notes that in smaller Bulgarian towns, people may invite visitors for lunch or dinner, or even to stay overnight. This is a possibility, not a universal expectation; confirm arrangements with your host.",
    url: "https://en.wikivoyage.org/wiki/Bulgaria#Respect",
    topic: "Wikivoyage Bulgaria: invitations in smaller towns",
    append: true
  }],
  ["TT", {
    text: "Home visits: Wikivoyage advises bringing a small gift to show appreciation when welcomed into a local home. It notes that visitors may end up visiting or staying with locals without having planned to, so treat this as a reminder to be gracious, not a suggestion to arrive uninvited. Hospitality may be especially strong with guests who share a religion, but customs vary by household.",
    url: "https://en.wikivoyage.org/wiki/Trinidad_and_Tobago#Respect",
    topic: "Wikivoyage Trinidad and Tobago: gifts for local hosts",
    removeText: ["Home visits: Ask about footwear and whether a small food gift is welcome. Customs vary by household and religious practice."],
    append: true
  }]
]);

for (const [iso, { text, url, topic, additionalSources = [], removeText = [], append = false, refreshSources = false }] of notes) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination profile: ${iso}`);

  const stage = destination.stages.socialCode;
  const paragraphs = stage.detailed.split("\n\n");
  let changed = false;
  for (const textToRemove of removeText) {
    for (let index = 0; index < paragraphs.length; index += 1) {
      const updatedParagraph = paragraphs[index].replace(textToRemove, "");
      if (updatedParagraph !== paragraphs[index]) {
        paragraphs[index] = updatedParagraph;
        changed = true;
      }
    }
  }
  if (!paragraphs.includes(text)) {
    if (append) paragraphs.push(text);
    else {
      const existingIndex = paragraphs.findIndex((paragraph) => paragraph.startsWith("Language and hosting:") || paragraph.startsWith("Visits:"));
      if (existingIndex >= 0) paragraphs[existingIndex] = text;
      else paragraphs.unshift(text);
    }
    changed = true;
  }
  if (changed) {
    stage.detailed = paragraphs.join("\n\n");
  }

  const sources = [
    { url, topic: topic ?? `Wikivoyage ${destination.country}: respect and shared-meal guidance` },
    ...additionalSources
  ];
  for (const source of sources) {
    const existingSource = stage.sources.find((item) => item.url === source.url);
    if (!existingSource) {
      stage.sources.push({ ...source, lastChecked: checked });
    } else if (refreshSources) {
      existingSource.lastChecked = checked;
    }
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added directly sourced social and household guidance for ${notes.size} profiles.`);