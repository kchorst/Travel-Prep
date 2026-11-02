import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const source = (topic, url) => ({ topic, url, lastChecked: checked });
const stage = (simple, paragraphs, sources) => ({ simple, detailed: paragraphs.join("\n\n"), sources });
const plugs = (slug) => source("Electrical standards and socket types", `https://www.power-plugs-sockets.com/${slug}/`);
const schengen = source("European Commission Schengen visa policy", "https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en");

const updates = {
  SN: {
    preArrival: stage(
      "Dakar (DSS) is the main gateway. Compare Google Flights/Skyscanner and Air Senegal directly; check Senegal's entry rules and airport-to-city transfer before booking.",
      [
        "Flight routing: Blaise Diagne International Airport (DSS) serves Dakar; it is outside the city centre, so include ground transfer time/cost. Compare broad search tools with Air Senegal and the operating carrier, then verify the itinerary.",
        "Entry: Visa rules and required documents depend on nationality, purpose, and route. Check Senegal's Ministry of Foreign Affairs and the relevant embassy before travel; do not assume visa-free entry from regional norms.",
        "Climate and packing: Dakar is hot with a pronounced dry/rainy season; inland temperatures and conditions differ. Check the forecast and health guidance; pack sun protection, breathable clothing, and rain protection in wet season."
      ],
      [source("Senegal Ministry of Foreign Affairs", "https://www.diplomatie.gouv.sn/"), source("Senegal tourism information", "https://www.visitezlesenegal.com/"), source("Air Senegal", "https://flyairsenegal.com/")]
    ),
    arrival24h: stage(
      "Senegal uses 230 V / 50 Hz Type C, D, E, and K outlets. XOF cash is useful; check roaming, SIM registration, and airport-transfer options before arrival.",
      [
        "Power: 230 V / 50 Hz; Type C, D, E, and K socket types are reported. Check your device input and lodging outlet; adapters do not convert voltage.",
        "Connectivity and payments: Orange, Free, and Expresso are local mobile providers. Verify tourist SIM registration/roaming and keep West African CFA francs (XOF) cash for small vendors; card acceptance varies.",
        "Airport transfer: DSS is a substantial distance from central Dakar. Check the airport's current shuttle, bus, and taxi information; use marked services or a verified booking and confirm the fare."
      ],
      [plugs("senegal"), source("Senegal tourism and airport transfer information", "https://www.visitezlesenegal.com/"), source("Orange Senegal", "https://www.orange.sn/")]
    ),
    mobility: stage(
      "Dakar has the TER rail and BRT alongside buses and shared cars. For intercity travel, confirm operator, station, and departure time; sept-place cars use local conventions.",
      [
        "Dakar: The TER commuter rail and Dakar BRT serve major corridors; Dakar Dem Dikk buses and informal shared transport supplement them. Check current routes, fares, and service alerts with the operator.",
        "Intercity: Sept-place shared cars and coaches connect many towns. Confirm destination and fare before boarding; departure timing and luggage policies vary by operator.",
        "Taxis and walking: Ride apps and taxi availability vary by city. Agree the fare or verify it in-app. Heat, sidewalk gaps, and busy crossings make short route planning worthwhile."
      ],
      [source("Dakar TER", "https://www.terdakar.sn/"), source("Dakar BRT", "https://www.brtdakar.sn/"), source("Dakar Dem Dikk", "https://demdikk.sn/")]
    ),
    dailyLiving: stage(
      "Yassir and local delivery services cover some Dakar addresses; verify in-app. Use treated or sealed water and keep XOF cash for small merchants.",
      [
        "Delivery: Yassir and local food-delivery listings may serve central Dakar; enter the exact address and check phone/payment requirements. Coverage falls outside dense urban areas.",
        "Health and water: Use sealed or appropriately treated water unless your accommodation confirms local guidance. Check the nearest open pharmacy; bring prescriptions in original packaging and verify import rules.",
        "Food and payment: Try thiéboudienne or other regional dishes; ask about ingredients and allergens. XOF is the local currency. Service charges and tipping vary by venue; review the bill."
      ],
      [source("Yassir Senegal", "https://yassir.com/sn/en"), source("Senegal tourism information", "https://www.visitezlesenegal.com/")]
    ),
    socialCode: stage(
      "French and Wolof are widely used in different settings. Ask before photographing people or ceremonies; follow host cues on greetings, shoes, and shared food.",
      [
        "Greetings and language: French is used in official settings and Wolof widely in daily life; language preferences vary. Begin politely and ask which language is comfortable.",
        "Home and dining: Ask whether to remove shoes and whether a small food gift is welcome. Shared-dish practices vary; follow the host's lead and ask about dietary needs.",
        "Photography: Ask permission before photographing people, homes, or religious ceremonies. Follow posted rules at mosques and heritage sites."
      ],
      [source("Senegal tourism information", "https://www.visitezlesenegal.com/")]
    )
  },
  MZ: {
    preArrival: stage(
      "Compare Maputo and regional gateways with Google Flights/Skyscanner and LAM Mozambique Airlines. Visa requirements depend on nationality; check the official eVisa portal before booking.",
      [
        "Flight routing: Maputo (MPM) is the primary international gateway; Beira (BEW), Nampula (APL), and Vilankulo (VNX) serve regional trips. Compare broad search with LAM and other operating carriers; confirm baggage and connections.",
        "Entry: Mozambique's eVisa/ETA process and eligibility depend on passport nationality and entry point. Check the official eVisa portal and current Ministry of Interior guidance; do not rely on third-party visa agents.",
        "Climate and packing: Coastal heat, rainy-season storms, and southern/inland conditions differ. Check cyclone and flood advisories for the season. Pack sun protection, rain gear, and breathable clothing."
      ],
      [source("Mozambique eVisa", "https://evisa.gov.mz/"), source("LAM Mozambique Airlines", "https://www.lam.co.mz/"), source("Mozambique tourism information", "https://www.visitmozambique.gov.mz/")]
    ),
    arrival24h: stage(
      "Mozambique uses 220 V / 50 Hz Type C, F, and M outlets. Keep meticais (MZN) and confirm ATM/card access, SIM registration, and airport transport locally.",
      [
        "Power: 220 V / 50 Hz; Type C, F, and M sockets are reported. Check the outlet and device label before use; an adapter does not convert voltage.",
        "Connectivity and payments: Check local SIM registration and roaming. Metical (MZN) cash is important; card acceptance and ATM coverage are concentrated in cities and larger hotels.",
        "Airport transfer: Maputo Airport transport and taxi arrangements can change. Arrange hotel pickup or use a clearly identified taxi; agree destination and fare before leaving."
      ],
      [plugs("mozambique"), source("LAM Mozambique Airlines", "https://www.lam.co.mz/"), source("Mozambique tourism information", "https://www.visitmozambique.gov.mz/")]
    ),
    mobility: stage(
      "Maputo uses buses and shared chapas; intercity coaches and flights suit longer distances. Check the route and fare locally; do not assume ride-hailing nationwide.",
      [
        "Maputo: Buses and shared chapas serve urban corridors. Routes and stops can be informal; ask a trusted local, confirm destination/fare before boarding, and keep small MZN notes.",
        "Intercity: Coaches and domestic flights connect major cities, but journey times and service frequency vary. Confirm operator, station, luggage, and schedule before travel.",
        "Taxis and walking: App-based transport is not uniform across the country. Use a licensed/known provider and agree the fare. Sidewalk and road conditions vary; avoid assuming a route is pedestrian-friendly."
      ],
      [source("Mozambique transport ministry", "https://www.mtc.gov.mz/"), source("LAM Mozambique Airlines", "https://www.lam.co.mz/")]
    ),
    dailyLiving: stage(
      "Delivery options are limited outside central Maputo. Use sealed or treated water and plan pharmacy/medication needs before beach or park trips.",
      [
        "Delivery and shopping: App delivery is concentrated in urban areas. Confirm address coverage and payment directly with the service; smaller towns and islands may have no app-based option.",
        "Health and water: Use sealed bottled or appropriately treated water. Carry essential medicines in original packaging and verify import rules; pharmacy stock and opening hours vary by city.",
        "Food and payment: Seafood is common on the coast; ask about ingredients and allergens. MZN cash is useful for local markets. Check service charge and buffet terms at each venue."
      ],
      [source("Mozambique tourism information", "https://www.visitmozambique.gov.mz/"), source("Mozambique Ministry of Health", "https://www.misau.gov.mz/")]
    ),
    socialCode: stage(
      "Portuguese is the official language, with many local languages. Ask before photos and follow your host's cues on shoes, greetings, and home-visit gifts.",
      [
        "Language and greetings: Portuguese is used in official settings; local languages are common in daily life. Ask which language is preferred and greet politely.",
        "Home visits: Ask whether to remove shoes and whether a small food gift is appropriate. Customs vary by household and region.",
        "Photography and public sites: Ask permission before photographing people, homes, or ceremonies. Follow posted rules at religious and government sites."
      ],
      [source("Mozambique tourism information", "https://www.visitmozambique.gov.mz/")]
    )
  },
  CN: {
    preArrival: stage(
      "Compare Google Flights/Skyscanner with Chinese carrier sites; domestic routes are often best checked with Air China, China Eastern, or China Southern. Visa/transit eligibility is nationality- and city-specific.",
      [
        "Flight routing: Beijing (PEK/PKX), Shanghai (PVG/SHA), and Guangzhou (CAN) are major gateways. Compare international options broadly, then check Chinese carriers directly for domestic connections and baggage.",
        "Entry: Visa-free and transit policies vary by nationality, itinerary, port, and date. Check China's National Immigration Administration and the relevant embassy; confirm transit eligibility before buying a non-refundable ticket.",
        "Climate and packing: China spans multiple climate zones. Check city/season forecasts and air-quality alerts; pack region-appropriate layers and modest clothing for religious/heritage sites."
      ],
      [source("China National Immigration Administration", "https://en.nia.gov.cn/"), source("Chinese Visa Application Service Center", "https://www.visaforchina.cn/"), source("Air China", "https://www.airchina.com.cn/")]
    ),
    arrival24h: stage(
      "China uses 220 V / 50 Hz Type A, C, and I sockets. Prepare AliPay/WeChat Pay setup, local data access, and cash before relying on apps at arrival.",
      [
        "Power: 220 V / 50 Hz, Types A, C, and I. Check your device label; plug adapters do not convert voltage.",
        "Connectivity and payments: Google services and some international apps may be restricted. Set up lawful connectivity/payment options before arrival. Alipay and WeChat Pay support foreign visitors in some cases, but card linking/verification can fail; retain CNY cash.",
        "Airport transfer: Beijing, Shanghai, and other airports have separate rail, metro, taxi, and bus connections. Confirm the airport terminal and official pickup zone; use authorized taxis or verified apps."
      ],
      [plugs("china"), source("Alipay for visitors", "https://www.alipay.com/"), source("China Southern Airlines", "https://www.csair.com/")]
    ),
    mobility: stage(
      "Major Chinese cities have extensive metro and bus networks; Didi and bike-share are app-based. Use local transit apps and verify payment setup before traveling.",
      [
        "Urban transit: Beijing, Shanghai, Guangzhou, and other large cities operate metro/bus networks with city-specific cards and apps. Check route maps, service alerts, and ticket rules; English support varies.",
        "Intercity: China Railway 12306 is the official rail booking channel; passport details must match the ticket. Book early for peak periods and confirm station names, which can differ within a city.",
        "Ride-hailing and micro-mobility: Didi and shared bikes are common where available, typically requiring app/payment setup. Sidewalks may be crowded with e-bikes; use marked crossings and follow local traffic flow."
      ],
      [source("China Railway 12306", "https://www.12306.cn/en/"), source("Beijing Subway", "https://www.bjsubway.com/en/"), source("Didi Chuxing", "https://www.didiglobal.com/")]
    ),
    dailyLiving: stage(
      "Meituan and Ele.me are major food-delivery apps, but require app/payment/address setup. Do not drink untreated tap water; pharmacy rules and availability vary.",
      [
        "Delivery and shopping: Meituan and Ele.me are common city food-delivery platforms; local phone, address format, language, and payment setup may be required. Confirm that your account works before depending on delivery.",
        "Health and water: Tap water is generally not consumed untreated. Use boiled or sealed water. Bring prescription medicines in original packaging and check import restrictions; use major-chain pharmacies for routine items.",
        "Food and daily payment: Alipay/WeChat Pay dominate many transactions, but visitors should keep cash and a working backup. Ask about ingredients and allergens; buffet policies are venue-specific."
      ],
      [source("Meituan", "https://www.meituan.com/"), source("Ele.me", "https://www.ele.me/"), source("China National Immigration Administration", "https://en.nia.gov.cn/")]
    ),
    socialCode: stage(
      "At temples, follow posted dress rules and avoid placing chopsticks upright in rice. Ask before photos; customs vary by region and household.",
      [
        "Visits and gifts: Ask whether a small gift is welcome and follow the host's lead on presentation. Avoid assuming one gift taboo applies to every family or region.",
        "Dining: Shared dishes and chopsticks are common. Do not stick chopsticks vertically into rice; ask about dietary needs and use serving utensils when offered.",
        "Public conduct: Ask permission before photographing people, homes, and ceremonies. Follow posted restrictions at government, transport, and security-sensitive locations."
      ],
      [source("China National Tourism Administration information", "https://www.mct.gov.cn/"), source("China travel visitor guidance", "https://www.china.org.cn/")]
    )
  },
  PH: {
    preArrival: stage(
      "Compare Manila (MNL) and island airports with Google Flights/Skyscanner, Cebu Pacific, and Philippine Airlines. Complete any required eTravel registration and verify visa rules by nationality.",
      [
        "Flight routing: Manila (MNL) is the main hub; Cebu (CEB), Clark (CRK), and island airports can reduce ground travel. Compare broad search with Cebu Pacific and Philippine Airlines, then confirm terminals and baggage.",
        "Entry: Visa eligibility depends on passport and stay. Check the Philippine Bureau of Immigration and complete the official eTravel registration if required for your trip; requirements can change.",
        "Climate and packing: Tropical climate with regional wet-season and typhoon variation. Monitor PAGASA advisories for storm season; pack light rain protection, sun protection, and footwear for wet streets."
      ],
      [source("Philippines eVisa", "https://evisa.gov.ph/"), source("Philippines eTravel", "https://etravel.gov.ph/"), source("Philippine Airlines", "https://www.philippineairlines.com/")]
    ),
    arrival24h: stage(
      "The Philippines uses 220 V / 60 Hz Type A, B, and C sockets. Keep pesos (PHP) cash, and check visitor SIM/eSIM and airport terminal transfers before arrival.",
      [
        "Power: 220 V / 60 Hz, Types A, B, and C. Check device voltage labels and adapter fit; some older buildings may differ.",
        "Connectivity and payment: Local SIM registration requires accepted ID; verify visitor requirements with Globe or Smart. GCash/Maya may require local verification; keep PHP cash and a card backup.",
        "Airport transfer: Manila has multiple terminals and airport transfer links; confirm your airline terminal and official airport bus/taxi or app pickup details. Allow extra time for traffic."
      ],
      [plugs("philippines"), source("Manila International Airport Authority", "https://www.miaa.gov.ph/"), source("Philippine eTravel", "https://etravel.gov.ph/")]
    ),
    mobility: stage(
      "Metro Manila has MRT/LRT, buses, and jeepneys; provincial islands rely on ferries, vans, and tricycles. Grab and Angkas are city/coverage-specific.",
      [
        "Metro Manila: LRT/MRT, buses, and jeepneys serve different corridors. Check current route and payment information; service can be crowded and affected by traffic or advisories.",
        "Islands and intercity: Ferries, domestic flights, buses, vans, and tricycles connect regions. Weather can disrupt service; confirm schedules with the operator and leave connection buffers.",
        "Ride-hailing: Grab and motorcycle apps such as Angkas operate in selected cities. Verify pickup/plate in-app, use helmets, and avoid assuming the same service exists on every island."
      ],
      [source("Department of Transportation Philippines", "https://dotr.gov.ph/"), source("Manila LRT Line 1", "https://www.lrta.gov.ph/"), source("Grab Philippines", "https://www.grab.com/ph/")]
    ),
    dailyLiving: stage(
      "Foodpanda and GrabFood cover many urban areas; confirm the exact island/address. Use sealed water unless accommodation gives specific local guidance.",
      [
        "Delivery: Foodpanda and GrabFood are available in many cities, but not uniformly across islands. Verify address, local phone, payment, and weather-related delivery interruptions.",
        "Water and pharmacy: Use sealed or treated water unless local authorities/accommodation confirm otherwise. Pharmacy access is good in cities but limited in remote areas; carry essential medicines and prescriptions.",
        "Payments and food: PHP cash remains useful, especially on smaller islands. Ask about ingredients and allergens; check service charges and buffet terms at the venue."
      ],
      [source("Foodpanda Philippines", "https://www.foodpanda.ph/"), source("Grab Philippines", "https://www.grab.com/ph/food/"), source("Philippines Department of Tourism", "https://philippines.travel/")]
    ),
    socialCode: stage(
      "English and Filipino are widely used, alongside regional languages. Ask before photos; at churches or homes, follow posted/host guidance on dress and shoes.",
      [
        "Greetings and language: English and Filipino are widely used, with regional languages across the islands. Ask which language is preferred and greet politely.",
        "Home and religious visits: Ask whether to remove shoes and whether a small gift is welcome. Follow church dress rules and the host's lead at meals.",
        "Photography: Ask permission before photographing people, homes, or ceremonies. Respect local and site-specific restrictions."
      ],
      [source("Philippines Department of Tourism visitor information", "https://philippines.travel/")]
    )
  },
  PL: {
    preArrival: stage(
      "For low-cost European routes, compare AZair with Google Flights/Skyscanner. Poland is in Schengen; check your passport eligibility and prior 90/180 days.",
      [
        "Flight routing: Warsaw (WAW/WMI), Kraków (KRK), and Gdańsk (GDN) serve major regions. Use AZair for low-cost combinations and Google Flights/Skyscanner for broader itineraries; check airport transfer and baggage before booking.",
        "Entry rules: Poland is in Schengen. Visa eligibility depends on nationality, purpose, and days already spent in the area. Check current European Commission rules and Polish consular guidance.",
        "Climate and packing: Poland has cold winters and warm summers, with mountain conditions changing quickly. Check forecasts, pack layers/rain protection, and use sturdy shoes for cobbles or hiking."
      ],
      [schengen, source("Polish Ministry of Foreign Affairs visa guidance", "https://www.gov.pl/web/diplomacy/visas"), source("Warsaw Chopin Airport", "https://www.lotnisko-chopina.pl/en/")]
    ),
    arrival24h: stage(
      "Poland uses 230 V / 50 Hz Type C and E sockets and Polish złoty (PLN). Warsaw Chopin has rail/bus connections; check current timetable and payment options.",
      [
        "Power: 230 V / 50 Hz, Type C and E sockets. Check device input and adapter compatibility.",
        "Connectivity and money: Poland uses PLN, not the euro. Cards/contactless are common; keep some cash and choose local-currency payment at terminals to avoid dynamic conversion fees.",
        "Airport transfer: Warsaw Chopin Airport has rail and bus connections; confirm terminal stop, first/last service, and current ticket options. Use official taxi stands or verified ride apps."
      ],
      [plugs("poland"), source("Warsaw Chopin Airport transport", "https://www.lotnisko-chopina.pl/en/transport.html"), source("Polish tourism information", "https://www.poland.travel/en")]
    ),
    mobility: stage(
      "Warsaw has metro, trams, and buses; city tickets are not national rail tickets. PKP Intercity and regional operators publish separate schedules and booking.",
      [
        "Warsaw: Metro, trams, and buses use local ticket zones and validation rules. Check the ZTM route planner and current service notices.",
        "Intercity: PKP Intercity serves major routes; regional operators cover local rail. Confirm train category, station, reservation, and luggage rules in the official booking channel.",
        "Ride-hailing and walking: Uber/Bolt availability is city-specific. Historic streets can be cobbled and winter sidewalks icy; allow time and use marked crossings."
      ],
      [source("Warsaw ZTM routes and fares", "https://www.wtp.waw.pl/en/"), source("PKP Intercity", "https://www.intercity.pl/en/")]
    ),
    dailyLiving: stage(
      "Pyszne.pl, Wolt, and grocery platforms cover many city addresses; verify postcode. Pharmacies and alcohol sales follow local rules; check opening hours.",
      [
        "Delivery: Pyszne.pl and Wolt are common urban food apps; grocery availability varies by postcode. Check address and payment methods in-app.",
        "Health and water: Municipal tap water is generally treated, but follow local/building advisories. Bring prescriptions in original packaging and check import rules; pharmacies may have rotating duty hours.",
        "Food and payment: PLN cash and cards are both useful. Ask about allergens and ingredients. Check receipts for service charges; tipping is discretionary."
      ],
      [source("Pyszne.pl", "https://www.pyszne.pl/"), source("Wolt Poland", "https://wolt.com/en/pol"), source("Polish tourism information", "https://www.poland.travel/en")]
    ),
    socialCode: stage(
      "At churches, follow posted dress and photography rules. For a home visit, ask about shoes and gifts; customs vary by household.",
      [
        "Home visits: Ask whether to remove shoes and whether a small food gift is welcome. Follow the host's lead rather than assuming a universal custom.",
        "Religious and heritage sites: Follow posted clothing and photography guidance. Ask before photographing people, services, or private property.",
        "Communication: Start politely and use formal address in unfamiliar settings; follow the other person's lead. Avoid broad claims about national character."
      ],
      [source("Polish tourism information", "https://www.poland.travel/en")]
    )
  },
  KR: {
    preArrival: stage(
      "Compare Seoul (ICN/GMP), Busan, and regional gateways with Google Flights/Skyscanner; check Korean e-visa/K-ETA rules by passport and travel date.",
      [
        "Flight routing: Incheon (ICN) is the main long-haul gateway; Gimpo (GMP) serves domestic/regional flights, with Busan (PUS) useful for the southeast. Compare broad search with Korean Air, Asiana, and low-cost carriers; verify airport and baggage.",
        "Entry: Visa-free status, K-ETA, and e-visa requirements vary by passport and may change. Check Korea Visa Portal and the official K-ETA site before departure; don't infer eligibility from a booking website.",
        "Climate and packing: Seoul has cold winters, hot humid summers, and seasonal air-quality issues. Check forecasts and PM2.5 alerts; pack layers and rain protection."
      ],
      [source("Korea Visa Portal", "https://www.visa.go.kr/"), source("Official K-ETA", "https://www.k-eta.go.kr/"), source("Incheon Airport", "https://www.airport.kr/ap/en/index.do")]
    ),
    arrival24h: stage(
      "South Korea uses 220 V / 60 Hz Type C and F sockets. T-money is widely useful; prepare Naver/Kakao Maps and verify visitor SIM/eSIM options.",
      [
        "Power: 220 V / 60 Hz, Type C and F sockets. Check device voltage and bring a compatible adapter.",
        "Connectivity and payments: Tourist SIM/eSIMs are available from carriers and airport vendors; confirm ID requirements. T-money helps with transit. Foreign cards work at many businesses, but local wallet onboarding can require a Korean number/account.",
        "Airport transfer: Incheon Airport has AREX, bus, and taxi options; Gimpo is separate. Check official airport route/timetable and terminal before choosing a connection."
      ],
      [plugs("south-korea"), source("Incheon Airport transport", "https://www.airport.kr/ap/en/index.do"), source("Korea Tourism Organization", "https://english.visitkorea.or.kr/")]
    ),
    mobility: stage(
      "Seoul has metro, buses, and rail; use T-money and current operator apps. Kakao T is a common taxi app, while Naver/Kakao Maps often outperform Google Maps for local routing.",
      [
        "Seoul: Metro and buses have extensive coverage. Use T-money and check transfer/tap-out rules; live route and disruption information is available from local operators.",
        "Navigation and taxis: Naver Map or Kakao Map provide local routing. Kakao T can book taxis, but account/payment setup may require a Korean phone number or card; verify before relying on it.",
        "Intercity: KTX and other trains connect major cities; book through official Korail and confirm station and train type. Sidewalks are generally organized in central areas but can be crowded."
      ],
      [source("Seoul Metro", "https://www.seoulmetro.co.kr/en/"), source("KORAIL", "https://www.letskorail.com/ebizbf/EbizBfIndex_eng.do"), source("Kakao Mobility", "https://www.kakaomobility.com/")]
    ),
    dailyLiving: stage(
      "Baemin and Coupang Eats are common delivery apps, but foreign signup/payment may be difficult. Tap water is treated; check building-specific notices and pharmacy rules.",
      [
        "Delivery: Baemin and Coupang Eats dominate many urban areas. Korean phone number, local address format, and payment setup may be required; check access before depending on delivery.",
        "Health and water: Municipal tap water is treated; follow local advisories and accommodation guidance. Pharmacies can advise on common medicines, but bring prescriptions in original packaging and verify import rules.",
        "Payments and food: Cards and contactless are common, though some small businesses prefer local wallets. Ask about spice, allergens, and ingredients; check venue-specific buffet terms."
      ],
      [source("Baemin", "https://www.baemin.com/"), source("Coupang Eats", "https://www.coupangeats.com/"), source("Korea Tourism Organization", "https://english.visitkorea.or.kr/")]
    ),
    socialCode: stage(
      "Use two hands when offering/receiving items in formal settings; remove shoes where household or venue rules require. Ask before photos and follow temple signage.",
      [
        "Greetings and etiquette: A small bow or polite verbal greeting is appropriate; formality varies by age and setting. Two-handed exchanges are courteous in formal situations.",
        "Home and dining: Remove shoes where requested. Wait for the host or senior diner to begin in formal meals; ask about dietary restrictions.",
        "Photography: Ask before photographing people, homes, or ceremonies. Follow rules at temples and memorials; avoid broad assumptions about individual preferences."
      ],
      [source("Korea Tourism Organization visitor etiquette", "https://english.visitkorea.or.kr/")]
    )
  },
  JP: {
    preArrival: stage(
      "Compare direct JAL/ANA fares with Google Flights/Skyscanner; use regional low-cost carriers for domestic hops. Check Japan MOFA visa rules by nationality and stay length.",
      [
        "Flight routing: Tokyo (NRT/HND), Osaka (KIX), and other regional airports serve different itineraries. Compare broad search with JAL, ANA, Peach, and Jetstar Japan; verify airport and baggage for each leg.",
        "Entry: Japan's visa exemption and eVisa availability depend on nationality, trip purpose, and duration. Check MOFA and the relevant embassy before booking; follow current Visit Japan Web/customs instructions if applicable.",
        "Climate and packing: Hokkaido, Tokyo, Kansai, and Okinawa differ substantially; rainy season and typhoon risk are seasonal. Check regional forecasts and pack layers."
      ],
      [source("Japan MOFA visa information", "https://www.mofa.go.jp/j_info/visit/visa/index.html"), source("Japan National Tourism Organization", "https://www.japan.travel/en/"), source("Japan Airlines", "https://www.jal.co.jp/jp/en/")]
    ),
    arrival24h: stage(
      "Japan uses 100 V / 50 or 60 Hz Type A/B sockets; eastern and western grids differ. Keep some yen and check tourist SIM, airport rail, and IC-card options.",
      [
        "Power: 100 V with Type A/B sockets; frequency is 50 Hz in eastern Japan and 60 Hz in western Japan. Check device compatibility, especially for appliances not rated 100 V.",
        "Connectivity and money: Tourist eSIM/SIM options are available; confirm coverage for rural areas. Cash remains useful alongside cards and transit IC cards; carry yen for small businesses.",
        "Airport transfer: Narita and Haneda are separate airports with different rail/bus connections. Check the airport's current routes, last departures, and ticket options before landing."
      ],
      [plugs("japan"), source("Narita Airport access", "https://www.narita-airport.jp/en/access/"), source("Haneda Airport access", "https://tokyo-haneda.com/en/access/")]
    ),
    mobility: stage(
      "Use NAVITIME/Japan Travel or station signage for rail routes; IC cards such as Suica/PASMO work in many regions but are not universal. Taxi apps include GO.",
      [
        "City and intercity rail: JR, metro, and private rail operators have different fares and coverage. Japan Travel by NAVITIME and official operator sites help plan routes; check last trains and reserved-seat rules.",
        "Payment: Suica/PASMO and other IC cards are accepted widely but not everywhere or on every rural service. Keep a backup ticket/payment method and check fare gates.",
        "Taxis and walking: GO taxi app and local dispatch services operate in many cities. Sidewalks are orderly in many centres but narrow in older districts; follow left-side traffic and station etiquette."
      ],
      [source("Japan Travel by NAVITIME", "https://japantravel.navitime.com/en/"), source("JR East", "https://www.jreast.co.jp/multi/en/"), source("GO Taxi", "https://go.goinc.jp/")]
    ),
    dailyLiving: stage(
      "Uber Eats, Demae-can, and Wolt cover many city addresses; check postcode and phone requirements. Tap water is generally treated; bring medication in original packaging.",
      [
        "Delivery and shops: Uber Eats, Demae-can, and Wolt are available in many urban areas; verify the exact address, phone, and payment method. Convenience stores are widespread, but regional stock varies.",
        "Health and water: Municipal tap water is generally treated; follow local notices. Check Japan's medication import rules in advance, especially for prescription or controlled medicines.",
        "Food and payment: Cash, IC cards, and cards are all useful. Ask about allergens and dietary needs; buffet rules depend on the venue and may be time-limited."
      ],
      [source("Japan National Tourism Organization visitor guide", "https://www.japan.travel/en/plan/"), source("Japan Customs medication guidance", "https://www.mhlw.go.jp/english/policy/health-medical/pharmaceuticals/01.html")]
    ),
    socialCode: stage(
      "Remove shoes where indicated, keep voices low on transit, and follow temple signage. Ask before photos; gift customs depend on the relationship and occasion.",
      [
        "Home and lodging: Remove shoes where the entryway or signage indicates; slippers may be provided. Follow local rules at ryokan, temples, and certain restaurants.",
        "Transit and dining: Keep phone calls quiet on public transport and follow queue markings. Use serving utensils for shared dishes and avoid sticking chopsticks upright in rice.",
        "Photography and gifts: Ask permission before photographing people or private property. Gifts are occasion-specific; choose modest, well-presented items only when invited or appropriate."
      ],
      [source("Japan National Tourism Organization etiquette guide", "https://www.japan.travel/en/plan/etiquette/")]
    )
  },
  ID: {
    preArrival: stage(
      "Use Google Flights/Skyscanner for international comparisons and AirAsia MOVE/Traveloka for Southeast Asian and domestic combinations. Indonesia's eVisa eligibility depends on passport and entry point.",
      [
        "Flight routing: Jakarta (CGK), Bali/Denpasar (DPS), and Surabaya (SUB) serve different islands. AirAsia MOVE and Traveloka compare regional routes; verify airport, baggage, and inter-island transfer with the operating airline.",
        "Entry: Indonesia's official eVisa/eVOA system lists eligibility, entry ports, and stay conditions. Check evisa.imigrasi.go.id for your passport before booking; requirements may vary by purpose and change.",
        "Climate and packing: Tropical conditions vary by island and rainy season. Check local forecasts and volcano/air-quality notices; pack breathable clothing, rain protection, and modest attire for temples."
      ],
      [source("Indonesia Immigration eVisa", "https://evisa.imigrasi.go.id/"), source("AirAsia MOVE", "https://www.airasia.com/"), source("Wonderful Indonesia", "https://www.indonesia.travel/")]
    ),
    arrival24h: stage(
      "Indonesia uses 230 V / 50 Hz Type C/F sockets. QRIS is a national QR payment standard, but visitor access depends on bank/app; carry rupiah cash.",
      [
        "Power: 230 V / 50 Hz, Type C and F sockets. Check device input before use.",
        "Connectivity and payment: Buy a SIM/eSIM through an authorized provider and confirm registration. QRIS is widely accepted domestically, but visitors may not be able to activate a compatible wallet; keep Indonesian rupiah (IDR) and card backup.",
        "Airport transfer: Jakarta CGK and Bali DPS have official transport operators and app pickup zones. Check the airport page and terminal-specific pickup rules; confirm fare and destination before leaving."
      ],
      [plugs("indonesia"), source("Bank Indonesia QRIS", "https://www.bi.go.id/QRIS/default.aspx"), source("Indonesia Immigration", "https://evisa.imigrasi.go.id/")]
    ),
    mobility: stage(
      "Jakarta has MRT, commuter rail, buses, and TransJakarta BRT; GoJek and Grab are common in cities. Inter-island ferries/flights require separate planning.",
      [
        "Jakarta: MRT, KRL commuter rail, TransJakarta buses, and airport rail serve different corridors. Use operator apps for routes, tickets, and service alerts; payment systems are not fully interchangeable.",
        "Ride-hailing: GoJek and Grab provide car and motorcycle trips in many urban areas. Confirm pickup point, vehicle, and fare in-app; services are limited outside major towns.",
        "Inter-island: Flights and ferries connect the archipelago; schedules depend on weather and season. Confirm port/terminal and allow buffers. Walking conditions and traffic vary widely."
      ],
      [source("Jakarta MRT", "https://jakartamrt.co.id/en"), source("TransJakarta", "https://transjakarta.co.id/"), source("KAI Indonesia", "https://booking.kai.id/")]
    ),
    dailyLiving: stage(
      "GoFood and GrabFood serve many urban areas; check coverage on islands and outside city centres. Use bottled water and verify pharmacy/medicine rules.",
      [
        "Delivery: GoFood and GrabFood are common in urban zones; verify exact address, phone, and payment. Coverage falls outside city centres and on smaller islands.",
        "Health and water: Do not assume tap water is potable. Use sealed or treated water. Bring medicines in original packaging and verify Indonesian import restrictions, especially for controlled prescriptions.",
        "Payments and dining: Cash and QRIS/mobile wallets are common but visitor access varies. Ask about ingredients, spice, and halal/dietary requirements; buffet policies are venue-specific."
      ],
      [source("GoFood Indonesia", "https://gofood.co.id/"), source("Grab Indonesia", "https://www.grab.com/id/food/"), source("Wonderful Indonesia", "https://www.indonesia.travel/")]
    ),
    socialCode: stage(
      "At temples and mosques, follow dress and footwear rules. Ask before photographing people or ceremonies; customs differ across Indonesia's regions.",
      [
        "Religious sites: Follow posted clothing and footwear requirements; sarongs may be required at some temples. Ask permission before photographing worshippers or ceremonies.",
        "Home and dining: Ask whether to remove shoes and about food preferences. In some settings the right hand is customary for eating or passing items; follow the host's cue.",
        "Language and conduct: Bahasa Indonesia is widely used, with many local languages. Ask politely before photos and avoid generalizing customs across islands or communities."
      ],
      [source("Wonderful Indonesia visitor information", "https://www.indonesia.travel/")]
    )
  },
  NA: {
    preArrival: stage(
      "Windhoek (WDH) is the main gateway; compare Google Flights/Skyscanner with Airlink and regional carriers. Namibia's visa policy changed recently, so check eligibility by passport.",
      [
        "Flight routing: Hosea Kutako (WDH) serves Windhoek; Walvis Bay (WVB) and regional airports support coastal and safari routes. Compare broad search, then check Airlink/operating carriers and ground-transfer distances.",
        "Entry: Namibia introduced new visa requirements for some nationalities in 2025. Check the Ministry of Home Affairs official visa portal for your passport, entry point, length, and current fees before booking.",
        "Climate and packing: Desert conditions mean hot days, cold nights, and long dry drives. Check seasonal road and weather conditions; pack layers, sun protection, and enough water for remote routes."
      ],
      [source("Namibia Ministry of Home Affairs visa services", "https://eservices.mhaiss.gov.na/"), source("Airlink", "https://www.flyairlink.com/"), source("Namibia Tourism Board", "https://visitnamibia.com.na/")]
    ),
    arrival24h: stage(
      "Namibia uses 220 V / 50 Hz Type D and M sockets. Carry Namibia dollars or South African rand; ATM/card access declines on remote safari routes.",
      [
        "Power: 220 V / 50 Hz, Type D and M sockets. Check accommodation outlet and device labels; carry a compatible adapter.",
        "Connectivity and money: Local SIM registration and rural coverage vary. Namibia dollar (NAD) is pegged to and commonly used alongside South African rand (ZAR); keep cash for fuel and remote stops.",
        "Arrival transfer: WDH is outside central Windhoek. Confirm shuttle, rental-car, or hotel pickup in advance; use licensed providers and verify the pickup point."
      ],
      [plugs("namibia"), source("Hosea Kutako International Airport", "https://www.airports.com.na/"), source("Namibia Tourism Board", "https://visitnamibia.com.na/")]
    ),
    mobility: stage(
      "Namibia is a long-distance, car-oriented destination; buses connect some towns, while safari routes often require a rental 4x4 or organized transfer.",
      [
        "Intercity: Scheduled coaches serve selected corridors, but frequency is limited. Confirm departure point, baggage, and return options before booking.",
        "Self-drive: A rental car is common for parks and remote regions; check road surface, fuel range, spare tires, and cross-border rental permission. Avoid driving long distances after dark where possible.",
        "City trips: Windhoek taxis and ride services are limited compared with larger cities. Ask accommodation to arrange a known provider and confirm the fare."
      ],
      [source("Namibia Roads Authority", "https://www.ra.org.na/"), source("Namibia Tourism Board self-drive guidance", "https://visitnamibia.com.na/")]
    ),
    dailyLiving: stage(
      "Delivery is limited outside Windhoek and larger towns. Ask lodges about water and pharmacy access before remote travel; stock food/fuel ahead of long drives.",
      [
        "Shopping and delivery: App delivery is limited; check local listings in Windhoek and buy supplies before entering remote areas. Shop hours can be shorter on weekends and holidays.",
        "Health and water: Ask lodges about the local water source and treatment. Carry essential medicines and a basic travel kit; pharmacies are sparse outside urban centres.",
        "Food and payment: Card access is common in towns, but carry NAD/ZAR cash for remote fuel stations and small operators. Confirm meal ingredients and lodge/service charges in advance."
      ],
      [source("Namibia Tourism Board travel planning", "https://visitnamibia.com.na/"), source("Namibia Ministry of Health", "https://mhss.gov.na/")]
    ),
    socialCode: stage(
      "Ask before photographing people or private land. For community visits, follow the guide/host on greetings, gifts, and permissions; respect park and conservation rules.",
      [
        "Community visits: Use a locally arranged guide where appropriate, ask permission before photographs, and follow guidance on gifts or donations.",
        "Home and lodge customs: Ask about footwear and meal practices; customs vary across communities and accommodation types.",
        "Outdoor conduct: Follow park rules, stay on marked routes where required, and do not approach wildlife. Respect private and communal land boundaries."
      ],
      [source("Namibia Tourism Board responsible travel", "https://visitnamibia.com.na/")]
    )
  },
  IT: {
    preArrival: stage(
      "Use AZair for low-cost European combinations and Google Flights/Skyscanner for broad coverage. Sardinia is a separate island-routing problem: compare Cagliari/Olbia/Alghero flights with ferries.",
      [
        "National routing: Rome (FCO), Milan (MXP/LIN), and other regional airports serve different itineraries. Compare Google Flights/Skyscanner with AZair and confirm baggage/airport with the operating airline.",
        "Sardinia: Cagliari (CAG), Olbia (OLB), and Alghero (AHO) have different seasonal routes. Compare flights with ferries from mainland ports; use the island tourism/port operator timetable and include the port-to-lodging transfer.",
        "Entry and climate: Italy is in Schengen; eligibility depends on nationality and prior 90/180 days. Weather varies from Alps to Mediterranean islands; check region-specific forecasts and pack layers."
      ],
      [schengen, source("Italy tourism portal", "https://www.italia.it/en"), source("Sardinia tourism portal", "https://www.sardegnaturismo.it/en")]
    ),
    arrival24h: stage(
      "Italy uses 230 V / 50 Hz Type F and L sockets. Sardinia uses the same standard; compare airport/ferry transfer options and check local eSIM/roaming terms.",
      [
        "Power: 230 V / 50 Hz, Type F and L sockets. Check device compatibility and whether the accommodation offers grounded Type L outlets.",
        "Connectivity and payments: Euro, cards, and contactless are common; keep cash for small merchants. Check roaming terms and rural coverage, especially in Sardinia's interior.",
        "Arrival: Airport transport differs by city. In Sardinia, Cagliari, Olbia, and Alghero airports serve different areas; check current bus/car-rental/ferry connections with the airport/operator."
      ],
      [plugs("italy"), source("Italy tourism travel information", "https://www.italia.it/en"), source("Sardinia tourism portal", "https://www.sardegnaturismo.it/en")]
    ),
    mobility: stage(
      "Italy's rail system connects major cities; Sardinia relies more on regional ARST bus/rail and rental cars. Check Trenitalia/Italo and Sardinian operator schedules separately.",
      [
        "Mainland: Trenitalia and Italo serve intercity routes; local transit is municipal. Verify station, train type, reservation, and ticket validation.",
        "Sardinia: ARST runs regional buses and rail services; coverage/frequency is lower in inland areas. Check timetables and return services before day trips; a rental car may be necessary for remote beaches and villages.",
        "Walking: Historic centers have cobbles and restricted-traffic zones (ZTL). Check signs and lodging access before driving; island terrain and summer heat affect walking."
      ],
      [source("Trenitalia", "https://www.trenitalia.com/en.html"), source("ARST Sardinia routes", "https://www.arst.sardegna.it/"), source("Sardinia tourism travel planning", "https://www.sardegnaturismo.it/en")]
    ),
    dailyLiving: stage(
      "Deliveroo, Glovo, and local grocery services cover many cities; check exact address. Sardinia island coverage varies by town and season.",
      [
        "Delivery: Deliveroo and Glovo cover many urban areas; verify address and phone requirements. In Sardinia, service is concentrated in larger towns and may be seasonal.",
        "Health and water: Tap-water guidance is municipal/building-specific; ask locally. Pharmacies are marked farmacia; check duty-pharmacy hours and bring prescriptions in original packaging.",
        "Food and payment: Sardinia has distinct regional food traditions; ask about ingredients and allergens. Euro is used; service charges/coperto and tipping differ by venue, so read the bill."
      ],
      [source("Deliveroo Italy", "https://deliveroo.it/"), source("Glovo Italy", "https://glovoapp.com/it/"), source("Sardinia tourism portal", "https://www.sardegnaturismo.it/en")]
    ),
    socialCode: stage(
      "At churches and archaeological sites, follow posted dress and photography rules. In Sardinia, ask about local customs and language preferences rather than assuming mainland norms.",
      [
        "Home visits: Ask whether to remove shoes and whether a small regional food gift is welcome. Household customs differ by family and region.",
        "Religious and heritage sites: Follow signs on clothing, photography, and access. Ask before photographing people or private property.",
        "Sardinia: Italian is widely used alongside Sardinian and other local varieties. Ask which language is preferred; respect community rules and protected sites."
      ],
      [source("Italy tourism portal", "https://www.italia.it/en"), source("Sardinia tourism portal", "https://www.sardegnaturismo.it/en")]
    )
  },
  FR: {
    preArrival: stage(
      "Compare Paris and regional gateways with Google Flights/Skyscanner; use AZair for low-cost European connections. Corsica needs a separate flight/ferry plan from mainland France.",
      [
        "National routing: Paris airports (CDG/ORY) and regional gateways serve different regions. Compare broad search with AZair for low-cost European legs, then verify train/airport transfer and baggage.",
        "Corsica: Ajaccio (AJA), Bastia (BIA), Calvi (CLY), and Figari (FSC) serve different parts of the island. Compare seasonal flights with ferries from mainland ports; account for rental-car/coach access from arrival port.",
        "Entry and climate: France is in Schengen; visa requirements depend on nationality and prior 90/180 days. Climate varies from Alpine to Mediterranean. Check regional weather and ferry/flight disruptions."
      ],
      [schengen, source("France-Visas official portal", "https://france-visas.gouv.fr/"), source("Corsica tourism portal", "https://www.visit-corsica.com/")]
    ),
    arrival24h: stage(
      "France uses 230 V / 50 Hz Type E sockets. Corsica uses the same standard; check airport/ferry transfers for the specific island town.",
      [
        "Power: 230 V / 50 Hz, Type E sockets. Check grounded plug compatibility and device labels before use.",
        "Connectivity and payments: Euro and contactless are common, but small venues may differ. Check roaming terms and rural/island coverage with your provider.",
        "Airport transfer: Airport and station links vary by city. For Corsica, confirm ferry terminal/airport and local onward buses or car-rental availability before booking accommodation."
      ],
      [plugs("france"), source("France tourism information", "https://www.france.fr/en/"), source("Corsica tourism transport", "https://www.visit-corsica.com/")]
    ),
    mobility: stage(
      "SNCF connects mainland cities; Corsica has limited rail and seasonal buses. Check SNCF and Chemins de Fer de la Corse separately; car access is useful outside towns.",
      [
        "Mainland: SNCF trains connect major cities; local transit is municipal. Check live timetables, reservation requirements, strikes, and station details before travel.",
        "Corsica: Chemins de Fer de la Corse connects Ajaccio, Corte, and Bastia on a limited network. Bus frequency is lower outside peak season; check the current timetable and return service. A car may be useful for remote coves and villages.",
        "Walking and driving: Historic centres may have restricted zones and cobbled streets. Corsican roads are winding; allow extra time and check seasonal ferry/road notices."
      ],
      [source("SNCF Connect", "https://www.sncf-connect.com/en-en/"), source("Chemins de Fer de la Corse", "https://cf-corse.corsica/"), source("Corsica tourism information", "https://www.visit-corsica.com/")]
    ),
    dailyLiving: stage(
      "Deliveroo, Uber Eats, and grocery services cover many mainland cities; check exact address. Corsica has thinner, seasonal delivery coverage.",
      [
        "Delivery: Check Deliveroo/Uber Eats at your precise address; coverage falls in rural areas. In Corsica, plan groceries and pharmacy access before leaving larger towns.",
        "Health and water: Follow municipal advisories and ask your accommodation about local supply/building notices. Pharmacies are marked pharmacie; check the duty-pharmacy listing and carry prescriptions in original packaging.",
        "Food and payment: Try island specialties in Corsica and ask about ingredients/allergens. Euro is used. Service charges are shown on bills; additional tipping is discretionary."
      ],
      [source("Deliveroo France", "https://deliveroo.fr/"), source("France tourism information", "https://www.france.fr/en/"), source("Corsica tourism portal", "https://www.visit-corsica.com/")]
    ),
    socialCode: stage(
      "Use a polite greeting before requests; at religious sites, follow dress/photo rules. Corsica has distinct local traditions, so ask hosts rather than assuming Parisian customs.",
      [
        "Greetings: A courteous bonjour/bonsoir before asking for help is a useful default. Use formal address in unfamiliar settings, then follow the other person's lead.",
        "Home and religious visits: Ask about footwear and gifts. Follow posted rules at churches, museums, and memorials; ask permission before photographing people.",
        "Corsica: Local language and community customs are distinct from mainland settings. Ask about preferences and respect private property, trails, and heritage sites."
      ],
      [source("France tourism visitor information", "https://www.france.fr/en/"), source("Corsica tourism portal", "https://www.visit-corsica.com/")]
    )
  },
  ES: {
    preArrival: stage(
      "Use AZair for low-cost European combinations and Google Flights/Skyscanner for broader routes. Spain is in Schengen; check your passport eligibility and prior 90/180 days.",
      [
        "Flight routing: Madrid (MAD), Barcelona (BCN), Málaga (AGP), and island airports serve different regions. Compare broad flight search with AZair for low-cost European legs, then verify airport, baggage, and schedule with the airline.",
        "Entry rules: Spain is in Schengen. Visa eligibility depends on nationality and time already spent in the area; check current European Commission rules and Spanish consular guidance.",
        "Climate and packing: Northern Atlantic, central plateau, Mediterranean coast, and Canary Islands have different conditions. Check forecasts for the actual region and season; pack sun/rain protection and suitable walking shoes."
      ],
      [schengen, source("Spanish Ministry of Foreign Affairs visa guidance", "https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Consular/Visados-Schengen.aspx"), source("Aena passenger information", "https://www.aena.es/en/passengers.html")]
    ),
    arrival24h: stage(
      "Spain uses 230 V / 50 Hz Type F sockets and the euro. Aena lists airport transfers; check the exact city and terminal before choosing rail, bus, or taxi.",
      [
        "Power: 230 V / 50 Hz, Type F sockets. Check device voltage and adapter fit.",
        "Connectivity and payment: Euro, cards, and contactless are common. Check roaming/eSIM terms; keep a small cash backup for occasional exceptions.",
        "Airport transfer: Aena operates airports across Spain with city-specific rail, bus, and taxi connections. Check the airport's official transport page, terminal, and first/last service before arrival."
      ],
      [plugs("spain"), source("Aena airport access and passenger information", "https://www.aena.es/en/passengers.html"), source("Spain tourism information", "https://www.spain.info/en/")]
    ),
    mobility: stage(
      "Madrid, Barcelona, and other cities have distinct metro/tram/bus systems. Renfe serves national rail; check regional operator tickets and current service notices.",
      [
        "City transit: Madrid and Barcelona have metro, bus, and commuter rail; tickets and passes are city-specific. Check Metro de Madrid, TMB, or the local operator for routes, fares, and service changes.",
        "Intercity: Renfe operates national rail services, alongside regional operators. Confirm station, train type, reservation, and disruptions before travel.",
        "Ride-hailing and walking: Uber, Cabify, or Bolt coverage varies by city and regulation. Historic centres can restrict cars and have cobbled streets; check pickup zones and walkability."
      ],
      [source("Renfe", "https://www.renfe.com/es/en"), source("TMB Barcelona", "https://www.tmb.cat/en/home"), source("Metro de Madrid", "https://www.metromadrid.es/en")]
    ),
    dailyLiving: stage(
      "Glovo, Just Eat, and Uber Eats operate in many cities; verify postcode coverage. Tap-water and pharmacy guidance are local, especially on islands and in rural areas.",
      [
        "Delivery: Glovo, Just Eat, and Uber Eats are city/address-dependent. Check phone, payment, and opening hours in-app before relying on delivery outside major centres.",
        "Health and water: Municipal tap-water supplies are generally treated, but follow local notices and ask accommodation about building-specific issues. Check the duty-pharmacy rota and bring prescribed medicines in original packaging.",
        "Food and payment: Meal timing and service customs vary by region and venue. Ask about ingredients/allergens, check the bill for service charges, and tip at your discretion."
      ],
      [source("Glovo Spain", "https://glovoapp.com/es/en/"), source("Just Eat Spain", "https://www.just-eat.es/"), source("Spain tourism information", "https://www.spain.info/en/")]
    ),
    socialCode: stage(
      "At churches, follow posted dress and photography rules. Greetings and meal timing vary by region; ask before photos and follow your host's lead at home.",
      [
        "Home visits: Ask whether to remove shoes and whether a small food gift is welcome. Household customs vary; don't assume shoes are always removed or kept on.",
        "Religious and public sites: Follow posted rules on clothing, photography, and access. Ask permission before photographing people or private property.",
        "Interaction: Spanish is the national language, with co-official regional languages in some areas. Ask which language is preferred and use a polite greeting; avoid generalizing one region's customs to the country."
      ],
      [source("Spain tourism visitor information", "https://www.spain.info/en/")]
    )
  },
  PT: {
    preArrival: stage(
      "Use AZair for low-cost European combinations and Google Flights/Skyscanner for broader routes. Portugal is in Schengen; include island flight/ferry connections when planning Madeira or the Azores.",
      [
        "Flight routing: Lisbon (LIS) and Porto (OPO) are the main mainland gateways; Madeira (FNC) and the Azores have separate island routes. Compare Google Flights/Skyscanner with AZair, then confirm schedules and baggage directly with the carrier.",
        "Entry rules: Portugal is in Schengen. Visa eligibility depends on nationality and prior Schengen days; check current European Commission rules and Portuguese consular guidance.",
        "Climate and packing: Atlantic weather varies between mainland, Madeira, and the Azores. Check regional forecasts; bring layers, rain protection, and footwear for steep cobbled streets."
      ],
      [schengen, source("Portuguese Ministry of Foreign Affairs visa information", "https://vistos.mne.gov.pt/en/"), source("ANA Portugal airports", "https://www.ana.pt/en/")]
    ),
    arrival24h: stage(
      "Portugal uses 230 V / 50 Hz Type F sockets and the euro. ANA airports publish current transfer options; check the island and terminal you actually arrive at.",
      [
        "Power: 230 V / 50 Hz, Type F sockets. Check device input and adapter compatibility.",
        "Connectivity and payments: Euro, cards, and contactless are common in cities. Check roaming terms and keep some cash for small businesses or service interruptions.",
        "Airport transfer: Lisbon, Porto, Faro, Madeira, and Azores airports have different bus, metro, taxi, and shuttle options. Check ANA's current airport-specific transport information and last departures."
      ],
      [plugs("portugal"), source("ANA Portugal airport transport", "https://www.ana.pt/en/"), source("Portuguese tourism information", "https://www.visitportugal.com/en")]
    ),
    mobility: stage(
      "Lisbon and Porto have metro, tram, bus, and rail; CP handles national trains. Island transit differs, and ferries/flights are needed between island groups.",
      [
        "Lisbon and Porto: Metro, tram, and bus networks use city-specific tickets/cards. Check Metro Lisboa, Metro do Porto, and Carris for routes, fares, and disruptions.",
        "Intercity and islands: CP operates mainland rail; island connections require separate local buses, ferries, or flights. Confirm the full itinerary and weather-dependent service before setting out.",
        "Walking and rides: Lisbon and Porto are hilly with cobbled pavements; use sturdy shoes. Uber/Bolt operate in larger cities, but pickup zones and service vary by town."
      ],
      [source("Comboios de Portugal", "https://www.cp.pt/passageiros/en"), source("Metro Lisboa", "https://www.metrolisboa.pt/en/"), source("Metro do Porto", "https://en.metrodoporto.pt/")]
    ),
    dailyLiving: stage(
      "Glovo, Uber Eats, and Bolt Food cover many urban addresses; verify island/postcode coverage. Tap-water and pharmacy advice can vary by locality/building.",
      [
        "Delivery: Glovo, Uber Eats, and Bolt Food are available in parts of mainland Portugal and larger islands. Enter the exact address and check hours, phone, and payment requirements.",
        "Health and water: Municipal tap water is generally treated, but follow local notices and accommodation guidance. Check local pharmacy hours and bring prescriptions in original packaging.",
        "Food and payment: Try regional dishes and ask about allergens. Euro and contactless payment are common; review the receipt for service charges. Buffet rules are venue-specific."
      ],
      [source("Glovo Portugal", "https://glovoapp.com/pt/en/"), source("Uber Eats Portugal", "https://www.ubereats.com/pt"), source("Turismo de Portugal", "https://www.visitportugal.com/en")]
    ),
    socialCode: stage(
      "Use a polite greeting and follow local cues. At churches, follow posted dress/photo rules; ask before photographing people or entering private property.",
      [
        "Home visits: Ask whether to remove shoes and whether a small food gift is welcome. Practices vary by household.",
        "Religious and heritage sites: Follow posted rules on clothing, photography, and access. Ask permission before taking portraits.",
        "Language: Portuguese is spoken nationwide, with regional variation in the islands. A courteous greeting is appreciated; ask if English is comfortable rather than assuming."
      ],
      [source("Turismo de Portugal visitor information", "https://www.visitportugal.com/en")]
    )
  }
};

const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing requested destination: ${iso}`);
  for (const stageName of ["preArrival", "arrival24h", "mobility", "dailyLiving", "socialCode"]) {
    destination.stages[stageName] = { ...destination.stages[stageName], ...update[stageName] };
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);