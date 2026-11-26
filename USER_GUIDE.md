# TravelPrep v1.2.5 User Guide

TravelPrep is a travel-planning reference, not an official source of travel authorization or live conditions. Check official government and provider sources for current requirements and conditions before departure.

## Choose a Destination

Use the **Country** selector to choose a destination. The search button under **Country browse order** finds countries by name, capital, region, or ISO code; select a result to view its profile. **Country browse order** changes which countries appear in the selector and in what order:

TravelPrep remembers the last selected country in this browser and opens it next time. A first visit with no saved choice starts at Albania.

A destination link from VisaBrowser opens that country’s TravelPrep profile when available. If TravelPrep has no profile for that destination, it displays a notice above the country selector.

- **A–Z** lists destinations alphabetically.
- **Nearest** is the default and lists countries by distance from the selected capital. The right arrow opens the closest capital east, and the left arrow opens the closest capital west, using longitude around the globe. This is not a border map or a recommended travel route.
- **Trip** shows only countries in your saved itinerary, in stop order. This option is available after adding at least one stop; add, remove, and reorder stops in the separate **Trip itinerary** section.

In A–Z and Trip modes, the previous and next buttons move through the active order. On a keyboard, the left and right arrow keys also browse destinations unless focus is in a control or on the map. On touch screens, swipe horizontally over the profile to move between destinations.

## Read a Profile

Each profile groups guidance into five stages: **Plan**, **Arrive**, **Move**, **Live**, and **Connect**. Select a stage to filter the profile, or select **All** to show every stage. Expand **Tap for Detailed Deep-Dive & Tactical Breakdown** for more detail. Citation records are maintained in the profile data but are not currently displayed as clickable source links in the profile view. An electrical reference link is shown where available.

The **Pre-Arrival & Planning** section links to the same destination in VisaBrowser for passport and visa checks. The link needs internet access.

The profile label indicates whether the destination meets the project's profile-completeness criteria. It does not certify that details are current or replace checking official sources.

### Travel restrictions

On a supported profile, expand **Travel restrictions**. **Before you go** covers selected rules for arrival, baggage and items you carry. **During your visit** covers selected rules for local conduct, activities and site access. Check each note's scope and date, then follow its source link for more detail. The notes are available offline when the profile is cached. Source links need internet access.

Expand **Preliminary travel alerts** and select any of the 275 destinations, even when it has no full profile. Matching profiles also have a **Preliminary first-scan alerts** panel. The scan status, research prompts, unresolved conflicts, sources and dates indicate what still needs checking; they do not prove a restriction applies or that unlisted issues do not exist. Source links need internet access.

## Use the Map

The map displays country boundaries and highlights the selected destination. Select another mapped country to open its profile. Use **Open map** beside the destination name to open a Google Maps search in a new tab. The embedded boundary map is bundled with the app and does not use an external tile service.

## Build a Trip

Expand **Trip itinerary** to access its controls. Choose a saved trip, or use **+** to create a named trip, the pencil button to rename it, and **×** to delete it after confirmation. A previous single itinerary appears as **My trip**. Use **Add country to trip** to add the selected destination. To add several destinations, open the country search, choose **Select for trip**, and tick the results. The region and trip filters can narrow the results; **Select visible** selects every result currently shown. Choose **Add selected to trip** to add the selection to the active trip. Choose **Done selecting** to return to opening profiles.

Trip stops appear in itinerary order. Select a stop to open its profile; use the up and down buttons to reorder it, or the remove button to delete it. **Clear trip** removes all stops from the active trip. Trips are saved automatically in this browser and are not synced between devices.

## Offline Use and Installation

The app shell, styles, map library and boundaries, and priority profile data are cached by the service worker after a successful online visit. A profile that has not been cached may not open offline.

To save every profile, connect to the internet and select **Save offline** beside the version number. Keep the page open until the status confirms that all profiles have been saved. Cached profiles are available offline in the same browser on the same device.

Choose a **Reminder** interval beside the version number: daily, weekly, or monthly (monthly by default). This interval controls when an offline reconnect reminder appears; it does not schedule background connections. TravelPrep checks for updates when opened online and when connectivity returns while it is open. Browsers do not reliably run scheduled checks while the app is closed. If a data update is found, the offline button shows **Update available** until the current version has been saved; select **Reload** to use a newly installed app-shell update.

For a more app-like launch, use your browser's **Install app** or **Add to Home Screen** option when available. Installation and offline caching require the hosted HTTPS site or a local development server at `localhost`; opening the HTML file directly does not support service workers.

## Updates and Troubleshooting

The app checks for a newer data version when it loads online and when connectivity returns while it is open. If it reports that travel data has changed, verify relevant details with official sources before relying on them. If you have been offline past your selected reminder interval, reconnect and open the app to check for newer data and app updates.

- **A profile will not load:** reconnect and reload; the profile may not have been cached yet.
- **The map is unavailable:** check that the app is fully loaded from the hosted site or local server, then reload while online.
- **The itinerary was not saved:** check browser storage settings or try another browser; trip data is local to this browser.
- **Offline mode is unavailable:** open the HTTPS site (or a localhost server) online first and wait for its service worker to install.
