import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-04";
const updates = {
  BR: {
    summary: "City minibuses (alternativos) and app-listed intercity shared rides supplement scheduled buses.",
    detail: "Shared transit: Many Brazilian cities have smaller minibuses or minivans, sometimes called alternativos, alongside larger city buses; routes and boarding practices vary locally, so confirm the destination before boarding. BlaBlaCar also lists shared intercity rides. Verify the driver, pickup and drop-off points, luggage, and current trip terms in the listing; scheduled coaches are the more predictable alternative.",
    source: "https://en.wikivoyage.org/wiki/Brazil#Get_around"
  },
  CL: {
    summary: "Outside metro systems, local buses are often called micros and route cars colectivos.",
    detail: "Local shared transit: A city bus is commonly called a micro (short for microbus). Colectivos are route-based cars between a bus and a taxi and operate in many cities. Routes, stops, and payment vary by municipality; confirm the destination and current fare or payment method before boarding rather than relying on old fare-card details.",
    source: "https://en.wikivoyage.org/wiki/Chile#Get_around"
  },
  NI: {
    summary: "Managua and nearby cities have fixed-route microbuses as well as local buses.",
    detail: "Shared local transport: Microbuses run fixed routes between Managua and nearby cities, generally making fewer stops than the larger local buses. Confirm the correct terminal, route, current fare, and return service locally; services can be crowded, so keep valuables in sight and follow current local safety advice.",
    source: "https://en.wikivoyage.org/wiki/Nicaragua#Get_around"
  },
  VE: {
    summary: "Where operating and locally verified, smaller-town shared cars may run as por puestos.",
    detail: "Shared cars: Where current travel advice and trusted local contacts confirm service is operating, route-based shared cars called por puestos may connect smaller towns. They may wait for enough passengers before departure, so timing can vary. Confirm the route and fare in advance, use a known operator or driver, and do not use them where security advice recommends against road travel.",
    source: "https://en.wikivoyage.org/wiki/Venezuela#Get_around"
  },
  ID: {
    summary: "Beyond Jakarta's major networks, cities use angkot shared route minivans and ojek motorcycle taxis.",
    detail: "Local shared transport: Angkot (angkutan perkotaan) are public minivans on fixed routes; they may have no fixed schedule or marked stops. Ask locally which route or vehicle marker to use and where to get off. Ojek are single-passenger motorcycle taxis, not group transport; confirm the fare and helmet before riding, and keep belongings secure on crowded services.",
    source: "https://en.wikivoyage.org/wiki/Indonesia#Get_around"
  },
  LA: {
    summary: "Local routes use songthaews, shared pickup-style vehicles, as well as buses and minibuses.",
    detail: "Local shared transport: Songthaews are pickup-style vehicles with two bench rows, used extensively as local buses and sometimes hired as private taxis. Before boarding, confirm whether the vehicle is running a shared route or a private trip, and agree on the fare if hiring it. Buses and minibuses serve longer corridors; verify current departures and route details at the station or with your accommodation because online information can be stale.",
    source: "https://en.wikivoyage.org/wiki/Laos#Get_around"
  },
  UA: {
    summary: "Marshrutkas are route minibuses alongside conventional city buses; wartime service can change.",
    detail: "Shared city transport: Marshrutkas are route minibuses that run alongside conventional buses. Boarding and stopping practices vary by route and city; some use fixed stops, while others stop when flagged or when a passenger asks. Confirm the route and fare locally, and follow current municipal service notices and air-raid instructions.",
    source: "https://en.wikivoyage.org/wiki/Ukraine#Get_around"
  },
  RU: {
    summary: "Many cities outside Moscow use marshrutkas, privately operated shared route minibuses.",
    detail: "Shared city transport: Outside Moscow, marshrutkas are shared minibuses that usually follow set routes but may have no published timetable or regular stops. Route, boarding, and payment practices vary by city; check a current local transit map or ask a trusted local where to board and how to signal your stop. Recheck travel advisories before planning road journeys.",
    source: "https://en.wikivoyage.org/wiki/Russia#Get_around"
  },
  RO: {
    summary: "Intercity minibuses, often called maxi-taxis, can fill gaps in less frequent rail service.",
    detail: "Shared intercity transport: Minibuses, sometimes called maxi-taxis, serve many town-to-town routes and can be faster than regional trains. They generally leave from bus terminals or designated points; confirm the exact departure place, route, schedule, seat, and luggage arrangements with the operator. On some commuter routes, minibuses can be crowded, so do not assume there will be a seat without checking.",
    source: "https://en.wikivoyage.org/wiki/Romania#Get_around"
  },
  NA: {
    summary: "Licensed shared taxis connect many Namibian towns on fixed routes.",
    detail: "Shared taxis: Licensed shared taxis operate within some towns and between set town pairs, departing from local ranks. Fares are regulated, but visitors unfamiliar with the standard may be overcharged; ask accommodation staff where to board and what the current fare should be, then confirm the destination before getting in. These services generally do not reach remote tourist sites, which need separate arrangements.",
    source: "https://en.wikivoyage.org/wiki/Namibia#Get_around"
  },
  FJ: {
    summary: "On Viti Levu and in towns, share-taxis use minivans and may depart when seats fill.",
    detail: "Shared taxis: Share-taxis, often white minivans, operate alongside buses on Fiji's main islands. Some depart when they reach capacity, so timing can be less predictable than a scheduled bus. Confirm the destination, whether the vehicle is shared or privately hired, and the fare before setting off; inter-island trips require a separate ferry or flight.",
    source: "https://en.wikivoyage.org/wiki/Fiji#Get_around"
  },
  VU: {
    summary: "In Port Vila and Luganville, public buses operate as shared point-to-point taxis.",
    detail: "Shared local transport: In Port Vila and Luganville, vehicles called public buses function more like shared taxis than fixed-route city buses: flag one down, state your destination, and share the ride with other passengers. There are few bus stops, and this service does not connect islands or replace intercity travel. Confirm the fare and availability locally before relying on it.",
    source: "https://en.wikivoyage.org/wiki/Vanuatu#Get_around"
  },
  SV: {
    summary: "Microbuses offer an inexpensive way to travel around cities, but can be crowded.",
    detail: "Shared urban transport: Microbuses run alongside larger city buses and are an inexpensive option on known routes, but may be crowded and can present a theft risk. Confirm the route and destination with station staff, the cobrador, or your accommodation; keep bags in sight and follow current local security advice.",
    source: "https://en.wikivoyage.org/wiki/El_Salvador#Get_around"
  },
  BZ: {
    summary: "Regular buses serve the main north-south corridor; non-express buses may board passengers roadside.",
    detail: "Shared bus service: Several bus operators serve the main north-south corridor. Non-express buses may pick up and drop off passengers along the highway, while express services use scheduled stops. Ask which type serves your destination, confirm the route and fare with the conductor, and wait somewhere safe rather than stepping into traffic to flag a bus.",
    source: "https://en.wikivoyage.org/wiki/Belize#Get_around"
  },
  WS: {
    summary: "Samoa's shared local buses use separate route hubs in Apia and at Salelologa.",
    detail: "Shared island buses: Local buses are a low-cost way to travel on Upolu and Savaii. On Upolu, routes fan out from two locations in Apia; on Savaii, routes begin near the ferry wharf at Salelologa. Confirm the departure point, destination, fare, and last return locally, especially when connecting with a ferry.",
    source: "https://en.wikivoyage.org/wiki/Samoa#Get_around"
  },
  EC: {
    summary: "Intercity buses may pick up extra passengers and cargo along the route, not only at terminals.",
    detail: "Shared intercity buses: Many buses take additional passengers and cargo along the way, and may become full or carry standing passengers. Confirm the operator, boarding point, destination, and whether a seat is available before boarding. For a more comfortable trip, ask for an Ejecutivo or other reserved-seat service; check current safety and road advice.",
    source: "https://en.wikivoyage.org/wiki/Ecuador#Get_around"
  },
  CO: {
    summary: "BlaBlaCar lists peer-to-peer intercity carpool rides on routes including Bogotá-area and regional trips.",
    detail: "Shared intercity rides: BlaBlaCar lists peer-to-peer carpool trips, including routes around Bogotá and between regional cities. Listings depend on the date and driver, so check the live service for an actual ride rather than assuming a route operates daily. Review the driver's profile and pickup point, and agree on luggage and trip details before booking.",
    source: "https://www.blablacar.co/"
  },
  FR: {
    summary: "BlaBlaCar lists peer-to-peer intercity carpool rides alongside train and coach options.",
    detail: "Shared intercity rides: BlaBlaCar lists peer-to-peer carpool trips on routes between cities. Available rides vary by date and driver; check live listings and compare with rail or scheduled coaches. Confirm the pickup point, destination, luggage arrangements, and trip terms with the driver before booking.",
    source: "https://www.blablacar.fr/"
  },
  GR: {
    summary: "BlaBlaCar lists peer-to-peer carpool rides between Greek cities and towns.",
    detail: "Shared intercity rides: BlaBlaCar lists peer-to-peer carpool trips on routes between Greek cities and towns. Listings vary by date and driver, so confirm a live ride rather than relying on a route page alone. Check pickup and drop-off points, luggage, and trip terms before booking; use ferries or scheduled services for island connections.",
    source: "https://www.blablacar.gr/"
  },
  IT: {
    summary: "BlaBlaCar lists peer-to-peer carpool rides between cities and, on some routes, across regions.",
    detail: "Shared intercity rides: BlaBlaCar lists peer-to-peer carpool trips between cities and regions. The available route, pickup point, and departure time depend on individual drivers and dates; check current listings and compare with trains or coaches. Confirm luggage space and trip details with the driver before booking.",
    source: "https://www.blablacar.it/"
  },
  HR: {
    summary: "BlaBlaCar lists peer-to-peer carpool rides between Croatian cities, including coastal routes.",
    detail: "Shared intercity rides: BlaBlaCar lists peer-to-peer carpool trips between Croatian cities, including routes toward the coast. Availability depends on date and driver, and is not a substitute for checking seasonal bus, ferry, or rail connections. Verify the live ride, pickup point, destination, and luggage arrangements before booking.",
    source: "https://www.blablacar.hr/"
  },
  RS: {
    summary: "BlaBlaCar lists peer-to-peer rides on intercity routes such as Belgrade-Novi Sad and Niš-Belgrade.",
    detail: "Shared intercity rides: BlaBlaCar lists peer-to-peer carpool trips on routes including Belgrade-Novi Sad and Niš-Belgrade. These are individual driver offers, not scheduled service; check a live listing for your date and confirm pickup, drop-off, luggage, and trip terms with the driver.",
    source: "https://www.blablacar.rs/"
  },
  SK: {
    summary: "BlaBlaCar lists peer-to-peer carpool rides between Slovak cities and towns.",
    detail: "Shared intercity rides: BlaBlaCar lists peer-to-peer carpool trips between Slovak cities and towns. Check for an actual ride on your date, as listings depend on drivers and are not a fixed timetable. Confirm the pickup and drop-off points, luggage, and trip terms before booking; scheduled trains and coaches remain alternatives.",
    source: "https://www.blablacar.sk/"
  },
  ES: {
    summary: "BlaBlaCar lists peer-to-peer carpool rides on routes between Spanish cities and towns.",
    detail: "Shared intercity rides: BlaBlaCar lists peer-to-peer carpool trips between Spanish cities and towns. The route and availability depend on drivers and travel dates; check live listings and compare with rail or scheduled coaches. Confirm pickup, destination, luggage, and trip terms before booking.",
    source: "https://www.blablacar.es/"
  },
  PL: {
    summary: "BlaBlaCar lists peer-to-peer carpool rides between Polish cities and towns.",
    detail: "Shared intercity rides: BlaBlaCar lists peer-to-peer carpool trips between Polish cities and towns. Rides are offered by individual drivers rather than on a fixed schedule, so check current listings for the travel date. Confirm the pickup and drop-off points, luggage, and trip terms before booking.",
    source: "https://www.blablacar.pl/"
  },
  PT: {
    summary: "BlaBlaCar lists peer-to-peer carpool rides between Portuguese cities and towns.",
    detail: "Shared intercity rides: BlaBlaCar lists peer-to-peer carpool trips between Portuguese cities and towns, including intercity routes. Availability depends on the date and driver; verify a live listing and compare with rail or scheduled coaches. Confirm pickup, destination, luggage, and trip terms before booking.",
    source: "https://www.blablacar.pt/"
  },
  BG: {
    summary: "BlaBlaCar lists peer-to-peer carpool rides on intercity routes including Plovdiv-Sofia.",
    detail: "Shared intercity rides: BlaBlaCar lists peer-to-peer carpool trips on routes including Plovdiv-Sofia. A route listing does not guarantee a ride on a particular date; check live offers and confirm the pickup point, destination, luggage, and trip terms with the driver.",
    source: "https://www.blablacar.bg/"
  },
  MK: {
    summary: "BlaBlaCar lists peer-to-peer rides on routes including Ohrid-Skopje and Skopje-Tetovo.",
    detail: "Shared intercity rides: BlaBlaCar lists peer-to-peer carpool trips on routes including Ohrid-Skopje and Skopje-Tetovo. Availability depends on individual drivers and travel dates, so check the live listing and confirm pickup, drop-off, luggage, and trip details before booking.",
    source: "https://www.blablacar.mk/"
  },
  PY: {
    summary: "BlaBlaCar lists peer-to-peer carpool rides between Paraguayan departments and cities.",
    detail: "Shared intercity rides: BlaBlaCar lists peer-to-peer carpool trips between Paraguayan cities and departments, including routes around Caaguazú and Central. Offers depend on drivers and dates; verify an actual ride on the official listing and confirm pickup, destination, luggage, and trip terms before booking.",
    source: "https://www.blablacar.com.py/"
  },
  UY: {
    summary: "BlaBlaCar lists peer-to-peer rides on routes including Canelones-Montevideo and Montevideo-Punta del Este.",
    detail: "Shared intercity rides: BlaBlaCar lists peer-to-peer carpool trips on routes including Canelones-Montevideo and Montevideo-Punta del Este. Individual offers vary by travel date and driver; check the live service and confirm pickup, destination, luggage, and trip terms before booking.",
    source: "https://www.blablacar.uy/"
  },
  CA: {
    summary: "Poparide lists intercity carpool rides across Canada, including routes in Ontario, Quebec, British Columbia, and Alberta.",
    detail: "Shared intercity rides: Poparide lists peer-to-peer carpool trips across Canada, with route listings in Ontario, Quebec, British Columbia, and Alberta. Available rides vary by date and driver; check live listings, verify the driver and pickup point, and confirm luggage and trip details before booking.",
    source: "https://www.poparide.com/en-ca/"
  },
  US: {
    summary: "Poparide lists intercity carpool routes in Texas, including Austin, Dallas, Houston, and College Station.",
    detail: "Shared intercity rides: Poparide lists peer-to-peer carpool trips in Texas, including routes serving Austin, Dallas, Houston, and College Station. Coverage is regional rather than nationwide, and rides vary by date and driver; check live listings and confirm driver, pickup point, luggage, and trip terms before booking.",
    source: "https://www.poparide.com/en-us/"
  },
  KH: {
    summary: "Intercity travel can include shared taxis or pickup trucks, which usually leave from local market areas.",
    detail: "Shared intercity transport: Depending on the town and route, buses, pickup trucks, or shared taxis may be available at a local market or bus station. Confirm the destination, departure point, fare, and whether the vehicle is a shared service before boarding; availability and comfort vary. Use a reputable operator and check current road-safety advice, especially for longer journeys.",
    source: "https://en.wikivoyage.org/wiki/Cambodia#Get_around"
  },
  KN: {
    summary: "On St. Kitts, shared microbuses can be flagged down but may pass when full.",
    detail: "Shared island transport: On St. Kitts, public microbuses serve major roads and can be flagged down along their route; a full vehicle may continue without stopping. Service generally does not reach Frigate Bay or the Southern Peninsula, where taxis are used. Confirm the route and last return service locally; buses do not run late in the evening. Check separately for transport on Nevis.",
    source: "https://en.wikivoyage.org/wiki/Saint_Kitts_and_Nevis#Get_around"
  },
  SR: {
    summary: "Minibuses and taxis are commonly used for short and long-distance travel in Suriname.",
    detail: "Shared local transport: Minibuses are widely used alongside taxis for trips both within towns and between them. Routes, boarding points, and departures can be informal; ask a trusted local or your accommodation where to board and confirm the destination before setting out. Interior travel may require a boat or aircraft, so do not assume road transport reaches remote communities.",
    source: "https://en.wikivoyage.org/wiki/Suriname#Get_around"
  },
  AU: {
    summary: "ShareYourRide lists peer-to-peer carpool trips on intercity routes across Australia.",
    detail: "Shared intercity rides: ShareYourRide lists individual driver-offered and ride-wanted trips on routes across Australia. These are informal, date-specific offers rather than scheduled service, and listings may be sparse on some routes. Check the current listing, communicate with the driver, agree on pickup, costs, and luggage, and keep a scheduled coach or rail option as backup.",
    source: "https://www.shareyourride.net/carpool/Australia/"
  },
  NZ: {
    summary: "ShareYourRide lists peer-to-peer carpool trips between New Zealand towns and cities.",
    detail: "Shared intercity rides: ShareYourRide lists individual driver-offered and ride-wanted trips between New Zealand towns and cities. These are informal, date-specific offers, not a timetable, and listings may be sparse. Check the current listing, confirm pickup, costs, and luggage with the driver, and keep a scheduled coach, rail, or ferry option as backup.",
    source: "https://www.shareyourride.net/carpool/New_Zealand/"
  },
  HT: {
    summary: "Tap-taps are a traditional shared transport mode, but current operation and safety cannot be assumed.",
    detail: "Shared transit and security: Tap-taps are modified trucks or vans traditionally used as shared local transport, and minibuses also serve some longer routes. Current service and security conditions are volatile; several governments advise against all travel to Haiti. Do not plan around these services or use them without up-to-date official advice and trusted local security coordination.",
    source: "https://en.wikivoyage.org/wiki/Haiti#Get_around"
  },
  PA: {
    summary: "City taxis may collect additional passengers en route; agree the fare and whether the ride is shared before departure.",
    detail: "Shared taxis: City taxis may pick up additional passengers along the way. Before departing, confirm the destination, fare, and whether you agree to share the ride; ask the driver before anyone else boards. Use a licensed taxi and keep belongings with you. Panama City's Metrobus serves main urban routes as a more structured alternative.",
    source: "https://en.wikivoyage.org/wiki/Panama_City#Get_around"
  },
  PW: {
    summary: "Koror's BBI shuttle serves the downtown corridor and major resorts in the evening; confirm current service locally.",
    detail: "Shared shuttle: Koror's BBI shuttle is described as an evening service along the main downtown street, connecting the two major resort areas. It is not an airport transfer and does not cover all island destinations. Check current operating hours, stops, and ticket arrangements with a hotel or resort; taxis may be hard to find away from visitor areas, so ask accommodation staff to call one.",
    source: "https://en.wikivoyage.org/wiki/Koror#Get_around"
  },
  TO: {
    summary: "Tongatapu buses can be flagged down, but there are few stops and service may be unreliable later in the day.",
    detail: "Shared local buses: Buses to points around Tongatapu leave from the Nuku'alofa waterfront bus concourse; there are few stops, so travelers may need to flag one down along the road. The guide reports unreliable service later in the afternoon. Confirm the route and last return locally, wait well clear of traffic, and use a taxi if the timing is unsuitable.",
    source: "https://en.wikivoyage.org/wiki/Tongatapu#Get_around"
  }
};

const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
let changed = 0;
for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination profile: ${iso}`);
  const mobility = destination.stages.mobility;
  if (!mobility.simple.includes(update.summary)) {
    mobility.simple += ` ${update.summary}`;
    changed++;
  }
  if (!mobility.detailed.includes(update.detail)) {
    mobility.detailed += `\n\n${update.detail}`;
    changed++;
  }
  if (!mobility.sources.some((item) => item.url === update.source)) {
    mobility.sources.push({
      topic: `Wikivoyage ${destination.country}: local shared transit`,
      url: update.source,
      lastChecked: checked
    });
    changed++;
  }
}

if (changed) writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Updated ${changed} shared-transit fields across ${Object.keys(updates).length} profiles.`);
