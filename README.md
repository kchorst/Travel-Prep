# TravelPrep

TravelPrep is an offline-capable travel reference and trip-planning app for 196 destinations. Browse sourced country profiles, compare travel-preparation guidance by stage, build a country itinerary, and save profile data for offline use.

> **Preview:** Travel information can change. Verify current entry, health, safety, transportation, and other time-sensitive details with official sources before travel. A profile marked complete means it meets this project's data-coverage checks; it is not a guarantee that every fact or external link is current.

## Try It

The preview is published at [kchorst.github.io/Travel-Prep](https://kchorst.github.io/Travel-Prep/). The app is a static Progressive Web App and can also be hosted from any HTTPS static host. Service workers require HTTPS, except on localhost.

See the [User Guide](USER_GUIDE.md) for browsing, trip planning, maps, installation, and offline use.

## Features

- 196 destination profiles, organized into five preparation stages.
- Quick summaries and expandable profile detail. Profile citation records are maintained in the data; electrical reference links are shown where available.
- Interactive country-boundary map; select a country to open its profile, or open a Google Maps search for the destination.
- Country selector browsing in A–Z order, by a nearest-capital sequence from the selected country, or by the stop order of the saved itinerary. Nearest is a browsing order, not a recommended travel route.
- Search and filter countries by name, capital, region, ISO code, or trip membership.
- Local itinerary storage, with add, reorder, remove, and clear controls.
- Offline app shell, map boundaries, and priority profiles, with an option to cache every profile.
- Daily, weekly, or monthly reconnect reminders, plus a reload prompt when an app-shell update is installed.
- Electrical standards and socket diagrams in the arrival guidance.

## Run Locally

Use Node.js 22 for the repository's build workflow. To serve the app locally from the repository root:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000>. A local HTTP server is needed for service-worker and offline behavior; opening `index.html` directly as a file does not provide the full PWA experience.

Install the pinned build dependencies and compile the local stylesheet when working on styles or preparing a deployment:

```powershell
npm ci
npm run build:css
```

## Data Maintenance

Canonical destination and electrical data live under `data/`; regional profile shards and the index are generated from that source data. Do not edit generated shard files directly. Make profile changes through the relevant enrichment or maintenance script, then run the data gates:

```powershell
node scripts/enrich-wikivoyage-household-norms.mjs
node scripts/audit-profile-spec.mjs
node scripts/build-data-shards.mjs
node scripts/validate-data-shards.mjs
```

The household-norm enrichment command applies source-backed updates from its enrichment map. Review the profile specification and source quality before building; the repository also includes `scripts/audit-source-quality.mjs` for additional citation checks.

## Publishing

GitHub Actions builds and validates the data and deploys the static site to GitHub Pages when changes are pushed to `main`. It can also be run manually from the repository's Actions tab. The first deployment requires GitHub Pages to be configured to use **GitHub Actions** as its source.

See [PUBLISHING.md](PUBLISHING.md) for deployment setup, artifact preparation, cache-version guidance, and map data attribution.

## Project Layout

- `index.html` — application UI and client-side behavior.
- `data/destinations.json`, `data/electrical-standards.json` — canonical profile and electrical data.
- `data/regions/`, `data/index.json` — generated profile shards and their index.
- `data/world-countries.geojson` — bundled country boundaries for the map.
- `scripts/` — data enrichment, generation, auditing, and validation tools.
- `.github/workflows/pages.yml` — Pages build and deployment workflow.
- `PUBLISHING.md`, `USER_GUIDE.md` — publishing and end-user documentation.