# TravelPrep User Guide

TravelPrep is a travel-planning reference, not an official source of travel authorization or live conditions. Check official government and provider sources for current requirements and conditions before departure.

## Choose a Destination

Use the **Country** selector to choose a destination. **Country browse order** changes which countries appear in the selector and in what order:

TravelPrep remembers the last selected country in this browser and opens it next time. A first visit with no saved choice starts at Albania.

- **A–Z** lists destinations alphabetically.
- **Nearest** starts with the selected country and repeatedly places the closest capital next. This is a country browsing order, not a recommended travel route.
- **Trip** shows only countries in your saved itinerary, in stop order. This option is available after adding at least one stop; add, remove, and reorder stops in the separate **Trip itinerary** section.

The previous and next buttons move through the active order. On a keyboard, the left and right arrow keys also browse destinations unless focus is in a control or on the map. On touch screens, swipe horizontally over the profile to move between destinations.

## Read a Profile

Each profile groups guidance into five stages: **Plan**, **Arrive**, **Move**, **Live**, and **Connect**. Select a stage to filter the profile, or select **All** to show every stage. Expand **Tap for Detailed Deep-Dive & Tactical Breakdown** for more detail. Citation records are maintained in the profile data but are not currently displayed as clickable source links in the profile view. An electrical reference link is shown where available.

The profile label indicates whether the destination meets the project's profile-completeness criteria. It does not certify that details are current or replace checking official sources.

## Use the Map

The map displays country boundaries and highlights the selected destination. Select another mapped country to open its profile. Use **Open map** beside the destination name to open a Google Maps search in a new tab. The embedded boundary map is bundled with the app and does not use an external tile service.

## Build a Trip

Use **Add country to trip** to add the selected destination. To add other destinations, open **Find countries**, search by country, capital, region, or ISO code, and select one or more results. The region and trip filters can narrow the results; **Select visible** selects every result currently shown. Choose **Add selected to trip** to add the selection.

Trip stops appear in itinerary order. Select a stop to open its profile; use the up and down buttons to reorder it, or the remove button to delete it. **Clear trip** removes all stops. The itinerary is stored in this browser and is not synced between devices.

## Offline Use and Installation

The app shell, styles, map library and boundaries, and priority profile data are cached by the service worker after a successful online visit. A profile that has not been cached may not open offline.

To save every profile, connect to the internet and select **Save all profiles offline**. Keep the page open until the status confirms that all profiles have been saved. Cached profiles are available offline in the same browser on the same device.

Choose a **Reconnect reminder** interval of daily, weekly, or monthly (monthly by default). This interval controls when an offline reminder appears; it does not schedule background connections. TravelPrep checks for updates when opened online and when connectivity returns while it is open. Browsers do not reliably run scheduled checks while the app is closed. If a data update is found, the app displays a notice; if an app-shell update is installed, select **Reload** to use it.

For a more app-like launch, use your browser's **Install app** or **Add to Home Screen** option when available. Installation and offline caching require the hosted HTTPS site or a local development server at `localhost`; opening the HTML file directly does not support service workers.

## Updates and Troubleshooting

The app checks for a newer data version when it loads online and when connectivity returns while it is open. If it reports that travel data has changed, verify relevant details with official sources before relying on them. If you have been offline past your selected reminder interval, reconnect and open the app to check for newer data and app updates.

- **A profile will not load:** reconnect and reload; the profile may not have been cached yet.
- **The map is unavailable:** check that the app is fully loaded from the hosted site or local server, then reload while online.
- **The itinerary was not saved:** check browser storage settings or try another browser; trip data is local to this browser.
- **Offline mode is unavailable:** open the HTTPS site (or a localhost server) online first and wait for its service worker to install.