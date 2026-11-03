import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const updates = {
  AU: {
    simple: "Uber Eats lists delivery in more than 500 Australian cities; check your exact address and hours in the app. Menulog has closed.",
    detailed: "Food delivery: Uber Eats' Australian site lists more than 500 cities, but restaurant and grocery availability depends on the exact address and time. Enter your accommodation postcode before relying on delivery. Menulog's official site says the service has closed and directs customers to Uber Eats; older Menulog listings are stale.",
    sources: [
      { topic: "Uber Eats Australia city and address-based delivery listings", url: "https://www.ubereats.com/au/location", lastChecked: checked },
      { topic: "Menulog Australia service closure notice", url: "https://www.menulog.com.au/", lastChecked: checked }
      ]
      },
  MY: {
    simple: "GrabFood and GrabMart serve listed Malaysian cities; check your exact address for restaurant and grocery coverage.",
    detailed: "Delivery and shopping: Grab Malaysia lists GrabFood restaurant delivery and GrabMart groceries. Its city directory includes Kuala Lumpur, Johor Bahru, Kota Kinabalu, Penang, Kuching, and many other locations; merchant selection, hours, fees, and payment options still depend on the exact address.",
    sources: [
      { topic: "Grab Malaysia food and grocery delivery offerings", url: "https://www.grab.com/my/food/", lastChecked: checked },
      { topic: "Grab Malaysia city coverage directory", url: "https://www.grab.com/my/locations/", lastChecked: checked }
    ]
  },
  MM: {
    simple: "GrabFood's official page describes beta coverage in nine Yangon townships; check your exact address and do not assume nationwide service.",
    detailed: "Delivery: GrabFood's official Myanmar page describes a beta launch covering nine Yangon townships at the time checked. Service is not nationwide and the listed area may change; confirm your exact location and current restaurant availability in the app before relying on delivery.",
    sources: [
      { topic: "GrabFood Myanmar beta service area and rollout status", url: "https://www.grab.com/mm/food/", lastChecked: checked }
    ]
  },
  BD: {
    simple: "Foodpanda lists restaurant and grocery delivery in Bangladesh; check the current city and exact address in the app.",
    detailed: "Food delivery: Foodpanda's Bangladesh site lists restaurant ordering and grocery delivery, with city and neighborhood coverage. Delivery availability, fees, payment options, and hours vary by address; confirm service for your accommodation before relying on it.",
    sources: [
      { topic: "Foodpanda Bangladesh restaurant and grocery delivery areas", url: "https://www.foodpanda.com.bd/", lastChecked: checked }
    ]
  },
  LA: {
    simple: "Foodpanda lists restaurant delivery in Laos; check the city and exact address in the app.",
    detailed: "Food delivery: Foodpanda's Laos site lists restaurant delivery, including local restaurant listings in Vientiane. Coverage, operating hours, fees, and payment options vary by address; verify service for your accommodation before relying on it.",
    sources: [
      { topic: "Foodpanda Laos restaurant and city delivery listings", url: "https://www.foodpanda.la/", lastChecked: checked }
    ]
  },
  NG: {
    simple: "Chowdeck lists restaurant and everyday-store ordering in Nigerian areas including Lagos, Ibadan, and Abuja; confirm your address in the app.",
    detailed: "Food and local-store delivery: Chowdeck's official site lists restaurant and store ordering in Nigerian locations including Lagos neighborhoods, Ibadan, and Abuja. Merchant selection, coverage, hours, fees, and payment options depend on the exact address; confirm your accommodation before relying on delivery.",
    sources: [
      { topic: "Chowdeck official Nigerian restaurant and local-store listings", url: "https://chowdeck.com/", lastChecked: checked }
    ]
  },
  RW: {
    simple: "Vuba Vuba lists food and grocery delivery in Kigali, Rubavu, Musanze, and Rusizi; verify your exact address and current hours.",
    detailed: "Food and grocery delivery: Rwanda-based Vuba Vuba lists service in Kigali, Rubavu, Musanze, and Rusizi, with order tracking and local restaurant and grocery options. Delivery areas, merchants, hours, fees, and payment methods depend on the exact address; confirm your accommodation is covered before relying on it.",
    sources: [
      { topic: "Vuba Vuba Rwanda food, grocery, and delivery-city listings", url: "https://vubavuba.rw/", lastChecked: checked }
    ]
  },
  KE: {
    simple: "SafeBoda lists Nairobi-area parcel delivery and includes food among business-delivery use cases; it is a courier, not a restaurant-ordering app.",
    detailed: "Courier delivery: SafeBoda's Kenya site lists on-demand package delivery in Nairobi and surrounding areas, with food included among business-delivery use cases. This is a courier service, not a restaurant menu marketplace; use a food-ordering app to browse restaurants and check address coverage, then confirm the courier's accepted item and delivery terms.",
    sources: [
      { topic: "SafeBoda Kenya on-demand package delivery and food courier use cases", url: "https://www.safeboda.com/", lastChecked: checked }
    ]
  },
  UG: {
    simple: "SafeBoda lists parcel delivery in Uganda; check the current city and exact address. For restaurant menus, use a dedicated food-ordering app.",
    detailed: "Courier delivery: SafeBoda's Uganda site lists package delivery alongside ride services. Confirm the current service area and item rules in the app; this is not evidence of restaurant menu ordering. For prepared-food delivery, check a dedicated food app and verify its live merchants at your address.",
    sources: [
      { topic: "SafeBoda Uganda package delivery service", url: "https://safeboda.com/home-ug", lastChecked: checked }
    ]
  },
  SG: {
    simple: "Foodpanda lists restaurant and grocery delivery across Singapore areas; check availability and fees for your exact address.",
    detailed: "Food and grocery delivery: Foodpanda lists restaurants and local delivery areas across Singapore. The active merchant list, delivery fee, and hours vary by address; enter your lodging location in the app or site before relying on delivery.",
    sources: [
      { topic: "Foodpanda Singapore restaurant, grocery, and delivery-area listings", url: "https://www.foodpanda.sg/", lastChecked: checked }
    ]
  },
  PH: {
    simple: "Foodpanda lists restaurant delivery in Philippine cities including Manila, Cebu, and Davao; verify your exact address.",
    detailed: "Food delivery: Foodpanda lists restaurant delivery in Philippine cities including Manila, Cebu City, and Davao City, with address-based availability and checkout payment options. Coverage, fees, hours, and payment methods vary by merchant; check your lodging address before relying on it.",
    sources: [
      { topic: "Foodpanda Philippines city, restaurant, and address-based delivery listings", url: "https://www.foodpanda.ph/", lastChecked: checked }
    ]
  },
  NP: {
    simple: "Foodmandu lists restaurant delivery in Kathmandu, Bhaktapur, Chitwan, and Butwal; check service for your exact address and hours.",
    detailed: "Food delivery: Nepal-based Foodmandu lists restaurant ordering and customer support for Kathmandu, Bhaktapur, Chitwan, and Butwal. Its published service hours are 7 a.m. to midnight Nepal time; restaurant selection and delivery coverage depend on the exact address, so confirm service at your accommodation.",
    sources: [
      { topic: "Foodmandu official restaurant listings, service cities, and hours", url: "https://foodmandu.com/", lastChecked: checked }
    ]
  },
  GH: {
    simple: "Hubtel offers restaurant delivery and shopping from local Ghanaian stores; check the app for merchants serving your address.",
    detailed: "Food and local-store delivery: Ghanaian platform Hubtel lists restaurant ordering plus groceries, household basics, and pharmacy items through local stores. Its current site reports operations in eight-plus Ghanaian cities, but merchant range and delivery availability depend on your exact address. Confirm the location and checkout options in the app before relying on delivery.",
    sources: [
      { topic: "Hubtel Ghana consumer restaurant delivery", url: "https://hubtel.com/consumer/food", lastChecked: checked },
      { topic: "Hubtel Ghana local-store, grocery, and pharmacy delivery", url: "https://hubtel.com/consumer/stores", lastChecked: checked }
    ]
  },
  LK: {
    simple: "PickMe offers food, grocery, and parcel services in Sri Lanka; enter your address to check current coverage and merchants.",
    detailed: "Food and local-store delivery: Sri Lankan platform PickMe lists restaurant delivery and Food & Market grocery ordering, plus separate parcel delivery. The service site says availability is not universal across cities; check your exact address, active merchants, hours, and payment options in the app before relying on it.",
    sources: [
      { topic: "PickMe Sri Lanka Food and Market delivery service", url: "https://pickme.lk/food/", lastChecked: checked },
      { topic: "PickMe Sri Lanka service overview", url: "https://pickme.lk/", lastChecked: checked }
    ]
  },
  UY: {
    simple: "Rappi lists restaurant, supermarket, pharmacy, and shop delivery in Uruguay; check your exact address for current coverage.",
    detailed: "Delivery and shopping: Rappi Uruguay lists restaurants, supermarkets, pharmacies, and local shops. Merchant coverage, fees, hours, and payment methods vary by address; check the site or app for your accommodation before relying on delivery.",
    sources: [
      { topic: "Rappi Uruguay restaurant and local-store delivery listings", url: "https://www.rappi.com.uy/", lastChecked: checked }
    ]
  },
  GB: {
    simple: "Deliveroo serves restaurants, supermarkets, and shops in covered UK postcodes; enter the exact address to check availability.",
    detailed: "Delivery: Deliveroo offers restaurant, supermarket, and shop delivery in covered UK areas. Its site requires a postcode or address to show local options; confirm opening hours, service fees, and delivery availability for your stay before depending on it.",
    sources: [
      { topic: "Deliveroo UK ordering and postcode-based coverage", url: "https://deliveroo.co.uk/", lastChecked: checked }
    ]
  },
  AR: {
    simple: "Rappi lists restaurant, supermarket, pharmacy, and shop delivery in Argentina; check your address for current coverage.",
    detailed: "Delivery and shopping: Rappi Argentina lists restaurant delivery alongside supermarkets, pharmacies, kiosks, and shops. Coverage and payment options depend on the exact address and merchant; check the app or website before relying on delivery outside major urban areas.",
    sources: [
      { topic: "Rappi Argentina restaurant and local-store delivery listings", url: "https://www.rappi.com.ar/", lastChecked: checked }
    ]
  },
  MX: {
    simple: "Rappi lists restaurant, supermarket, pharmacy, and shop delivery in Mexico; check your address for current coverage.",
    detailed: "Delivery and shopping: Rappi Mexico lists restaurant delivery plus supermarkets, pharmacies, express shops, and other local stores. Coverage, hours, fees, and payment options depend on the exact address and merchant; verify in the app or website before relying on delivery.",
    sources: [
      { topic: "Rappi Mexico restaurant and local-store delivery listings", url: "https://www.rappi.com.mx/", lastChecked: checked }
    ]
  },
  JP: {
    simple: "Demae-can lets you search Japanese restaurant delivery by postcode, prefecture, or map; check your lodging address and payment options.",
    detailed: "Food delivery: Demae-can provides restaurant-chain and local-store listings with searches by postcode, prefecture, and map. Delivery area, hours, minimums, and payment methods are address-specific; confirm your accommodation is in range before planning around delivery.",
    sources: [
      { topic: "Demae-can Japan restaurant directory and address search", url: "https://demae-can.com/", lastChecked: checked }
    ]
  },
  IN: {
    simple: "Zomato lists food delivery across Indian cities; verify restaurant and payment availability for your exact address.",
    detailed: "Food delivery: Zomato describes its Indian service as available across hundreds of cities, but participating restaurants, delivery windows, and payment methods are address-specific. Check coverage at your accommodation and keep a direct restaurant or local-market option as backup.",
    sources: [
      { topic: "Zomato India food delivery and city coverage", url: "https://www.zomato.com/", lastChecked: checked }
    ]
  },
  CA: {
    simple: "Uber Eats lists delivery in more than 500 Canadian cities; check restaurant coverage for your exact address.",
    detailed: "Food delivery: Uber Eats' Canada site lists city coverage and restaurant delivery. Participating restaurants, grocery options, hours, and fees depend on the exact address; enter your accommodation before relying on delivery.",
    sources: [
      { topic: "Uber Eats Canada city and address-based delivery listings", url: "https://www.ubereats.com/ca/", lastChecked: checked }
    ]
  },
  BE: {
    simple: "Uber Eats lists delivery in Belgian cities including Antwerp, Brussels, Ghent, and Liege; check your exact address.",
    detailed: "Food delivery: Uber Eats lists Belgian city pages for Antwerp, Brussels, Ghent, Liege, Leuven, and Namur. Restaurant and grocery availability, hours, and fees vary by address; confirm coverage at your accommodation.",
    sources: [
      { topic: "Uber Eats Belgium city and address-based delivery listings", url: "https://www.ubereats.com/be/", lastChecked: checked }
    ]
  },
  DK: {
    simple: "Uber Eats has a Denmark ordering site; enter your address to see whether restaurants or shops deliver there.",
    detailed: "Food delivery: Uber Eats maintains a Denmark ordering site, but participating restaurants, shops, delivery windows, and fees depend on the exact address. Check the service at your accommodation rather than assuming coverage nationwide.",
    sources: [
      { topic: "Uber Eats Denmark ordering and address-based coverage", url: "https://www.ubereats.com/dk/", lastChecked: checked }
    ]
  },
  FI: {
    simple: "Uber Eats Finland lists restaurant, grocery, and retail delivery; availability and fees depend on your address.",
    detailed: "Food and shopping delivery: Uber Eats Finland lists restaurants, grocery orders, and retail delivery. Participating stores, service hours, delivery fees, and payment options vary by location; check the exact address before planning around it.",
    sources: [
      { topic: "Uber Eats Finland restaurant, grocery, and retail delivery listings", url: "https://www.ubereats.com/fi/", lastChecked: checked }
    ]
  },
  FR: {
    simple: "Uber Eats lists delivery in more than 500 French cities; check restaurant and shop availability for your exact address.",
    detailed: "Food delivery: Uber Eats' France site lists more than 500 cities, but restaurant and grocery coverage, hours, and fees depend on the exact address. Enter your accommodation before relying on delivery, especially outside larger cities.",
    sources: [
      { topic: "Uber Eats France city and address-based delivery listings", url: "https://www.ubereats.com/fr/", lastChecked: checked }
    ]
  },
  DE: {
    simple: "Uber Eats lists delivery in German cities including Berlin; check restaurant availability for your exact address.",
    detailed: "Food delivery: Uber Eats' Germany site lists local restaurant delivery and city directories. Participating restaurants, grocery options, hours, and fees are address-specific; enter your lodging address before relying on delivery.",
    sources: [
      { topic: "Uber Eats Germany city and address-based delivery listings", url: "https://www.ubereats.com/de/", lastChecked: checked }
    ]
  },
  IE: {
    simple: "Uber Eats lists delivery in Irish cities including Cork, Dublin, and Galway; check your exact address.",
    detailed: "Food delivery: Uber Eats' Ireland site lists city coverage including Cork, Dublin, Galway, and Limerick. Restaurant options, opening hours, and fees vary by address; confirm delivery to your accommodation before planning around it.",
    sources: [
      { topic: "Uber Eats Ireland city and address-based delivery listings", url: "https://www.ubereats.com/ie/", lastChecked: checked }
    ]
  },
  NL: {
    simple: "Uber Eats lists delivery in Dutch cities including Amsterdam and Rotterdam; check availability for your exact address.",
    detailed: "Food delivery: Uber Eats' Netherlands site lists city coverage including Amsterdam and Rotterdam. Participating restaurants, grocery options, hours, and fees vary by address; enter your lodging address to check current coverage.",
    sources: [
      { topic: "Uber Eats Netherlands city and address-based delivery listings", url: "https://www.ubereats.com/nl/", lastChecked: checked }
    ]
  },
  NZ: {
    simple: "Uber Eats lists delivery in New Zealand cities including Auckland, Christchurch, and Queenstown; check your exact address.",
    detailed: "Food delivery: Uber Eats' New Zealand site lists city coverage including Auckland, Christchurch, Dunedin, and Queenstown. Restaurant and shop availability, opening hours, and fees depend on the exact address; confirm delivery to your accommodation.",
    sources: [
      { topic: "Uber Eats New Zealand city and address-based delivery listings", url: "https://www.ubereats.com/nz/", lastChecked: checked }
    ]
  },
  ES: {
    simple: "Uber Eats lists delivery in Spanish cities including Barcelona; check restaurant and grocery availability for your exact address.",
    detailed: "Food delivery: Uber Eats' Spain site lists city coverage including Barcelona and other cities across the country. Restaurant, grocery, and pickup options, hours, and fees are address-specific; check your accommodation's location before relying on delivery.",
    sources: [
      { topic: "Uber Eats Spain city and address-based delivery listings", url: "https://www.ubereats.com/es/", lastChecked: checked }
    ]
  },
  US: {
    simple: "Uber Eats lists delivery in 500+ U.S. cities; enter your exact address to check restaurant and grocery availability.",
    detailed: "Food delivery: Uber Eats' U.S. site lists more than 500 cities, but restaurant, grocery, and retail options, hours, and fees depend on the exact address. Enter your accommodation before relying on delivery, especially outside major urban areas.",
    sources: [
      { topic: "Uber Eats U.S. city and address-based delivery listings", url: "https://www.ubereats.com/", lastChecked: checked }
    ]
  },
  CL: {
    simple: "Uber Eats lists delivery in Chilean cities including Santiago, Antofagasta, and Concepcion; check your exact address.",
    detailed: "Food delivery: Uber Eats' Chile site lists city coverage including Santiago, Antofagasta, Arica, and Concepcion. Restaurant options, hours, and fees vary by address; enter your lodging location before relying on delivery.",
    sources: [
      { topic: "Uber Eats Chile city and address-based delivery listings", url: "https://www.ubereats.com/cl/", lastChecked: checked }
    ]
  },
  CR: {
    simple: "Uber Eats lists delivery in Costa Rica, including San Jose and Liberia; check your exact address.",
    detailed: "Food delivery: Uber Eats' Costa Rica site lists city coverage including San Jose and Liberia. Restaurants, hours, and fees depend on the address; verify service at your accommodation rather than assuming coverage in rural or beach areas.",
    sources: [
      { topic: "Uber Eats Costa Rica city and address-based delivery listings", url: "https://www.ubereats.com/cr/", lastChecked: checked }
    ]
  },
  EC: {
    simple: "Uber Eats lists delivery in Ecuadorian cities including Quito, Guayaquil, and Cuenca; check your exact address.",
    detailed: "Food delivery: Uber Eats' Ecuador site lists city coverage including Quito, Guayaquil, Cuenca, and Ambato. Restaurant availability, hours, and fees are address-specific; check your accommodation before relying on delivery.",
    sources: [
      { topic: "Uber Eats Ecuador city and address-based delivery listings", url: "https://www.ubereats.com/ec/", lastChecked: checked }
    ]
  },
  SV: {
    simple: "Uber Eats lists delivery in El Salvador, including San Salvador; check restaurant coverage for your exact address.",
    detailed: "Food delivery: Uber Eats' El Salvador site lists city coverage including San Salvador. Participating restaurants, opening hours, and fees depend on the exact address; confirm delivery to your accommodation before planning around it.",
    sources: [
      { topic: "Uber Eats El Salvador city and address-based delivery listings", url: "https://www.ubereats.com/sv/", lastChecked: checked }
    ]
  },
  DO: {
    simple: "Uber Eats lists delivery in the Dominican Republic, including Santo Domingo and Santiago; check your exact address.",
    detailed: "Food delivery: Uber Eats' Dominican Republic site lists city coverage including Santo Domingo and Santiago de los Caballeros. Restaurant availability, hours, and fees depend on the address; check coverage at your accommodation before relying on delivery.",
    sources: [
      { topic: "Uber Eats Dominican Republic city and address-based delivery listings", url: "https://www.ubereats.com/do/", lastChecked: checked }
    ]
  },
  CO: {
    simple: "Rappi lists restaurant, supermarket, and pharmacy delivery in Colombia; check your address for current coverage.",
    detailed: "Delivery and shopping: Rappi Colombia lists restaurant delivery, supermarkets, pharmacies, express shops, and other local stores. Merchant availability, fees, hours, and payment options vary by address; check the app or website for your stay before relying on delivery.",
    sources: [
      { topic: "Rappi Colombia restaurant and local-store delivery listings", url: "https://www.rappi.com.co/", lastChecked: checked }
    ]
  },
  TW: {
    simple: "Uber Eats lists delivery in Taiwan cities including Taipei, Taichung, Hsinchu, and Kaohsiung; check your exact address.",
    detailed: "Food delivery: Uber Eats' Taiwan site lists city coverage including Taipei, Taichung, Hsinchu, Taoyuan, Tainan, and Kaohsiung. Restaurant availability, hours, and fees depend on the exact address; confirm delivery at your lodging before relying on it.",
    sources: [
      { topic: "Uber Eats Taiwan city and address-based delivery listings", url: "https://www.ubereats.com/tw/", lastChecked: checked }
    ]
  },
  SA: {
    simple: "HungerStation lists restaurant, grocery, pharmacy, and store delivery in Saudi Arabia; check exact city and address coverage.",
    detailed: "Delivery and shopping: HungerStation lists restaurants, groceries, pharmacies, flowers, and other local stores, with service-area pages for Riyadh, Al Khobar, Dammam, Jeddah, and Makkah. Coverage, hours, fees, and payment options depend on the exact address; verify service for your stay before relying on delivery.",
    sources: [
      { topic: "HungerStation Saudi Arabia restaurant, grocery, pharmacy, and service-area listings", url: "https://www.hungerstation.com/", lastChecked: checked }
    ]
  },
  CH: {
    simple: "Uber Eats lists delivery in Swiss cities including Basel, Bern, Geneva, and Zurich; check your exact address.",
    detailed: "Food delivery: Uber Eats' Switzerland site lists city coverage including Basel, Bern, Geneva, Lausanne, and Zurich. Restaurant availability, hours, and fees depend on the exact address; enter your lodging location before relying on delivery.",
    sources: [
      { topic: "Uber Eats Switzerland city and address-based delivery listings", url: "https://www.ubereats.com/ch/", lastChecked: checked }
    ]
  },
  NO: {
    simple: "Uber Eats has a Norway ordering site; enter your address to see local restaurant availability.",
    detailed: "Food delivery: Uber Eats maintains a Norway ordering site, but restaurant availability, hours, and fees depend on the exact address. Check the live service for your lodging before relying on delivery, especially outside major urban areas.",
    sources: [
      { topic: "Uber Eats Norway ordering and address-based coverage", url: "https://www.ubereats.com/no/", lastChecked: checked }
    ]
  },
  SE: {
    simple: "Uber Eats lists delivery in Swedish cities including Gothenburg, Malmo, and Stockholm; check your exact address.",
    detailed: "Food delivery: Uber Eats' Sweden site lists city coverage including Gothenburg, Malmo, and Stockholm. Restaurant options, hours, and fees are address-specific; confirm delivery to your accommodation before relying on it.",
    sources: [
      { topic: "Uber Eats Sweden city and address-based delivery listings", url: "https://www.ubereats.com/se/", lastChecked: checked }
    ]
  },
  PE: {
    simple: "Rappi lists restaurant, supermarket, pharmacy, and shop delivery in Peru; verify coverage for your address.",
    detailed: "Delivery and shopping: Rappi Peru lists restaurant delivery, supermarkets, pharmacies, express shops, liquor stores, and other local stores. Merchant availability, fees, hours, and payment options vary by address; check the app or website for your stay before relying on delivery.",
    sources: [
      { topic: "Rappi Peru restaurant and local-store delivery listings", url: "https://www.rappi.com.pe/", lastChecked: checked }
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
  for (const item of update.sources) {
    if (!dailyLiving.sources.some((existing) => existing.url === item.url)) dailyLiving.sources.push(item);
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added sourced delivery guidance for ${Object.keys(updates).join(", ")}.`);