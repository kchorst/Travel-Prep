# Publishing

The GitHub Actions workflow deploys on pushes to `main` and can also be started manually. It generates and validates the regional data, then publishes the app under the repository subpath:

`https://kchorst.github.io/Travel-Prep/`

The app contains 196 destination profiles. A profile is marked complete when it has sourced guidance in all five stages, electrical data and a diagram, and the required Daily Living topics. This status does not guarantee that external links remain live or that travel rules have not changed. Always verify current entry, safety, health, and transport information with official sources.

## Version and Data Updates

The current stable release is `1.1.0` in `index.html`, `package.json`, and `package-lock.json`. Keep these version fields in sync for future releases. Bump `SHELL_CACHE` in `sw.js` whenever the app shell or its cached assets change so installed clients can receive the update.

The build script generates `dataVersion` from canonical destination, electrical, capital-coordinate, and country-boundary data. The app stores the last-seen value in the browser and shows a notice when a later visit finds a different data version. Data changes deploy through the same Pages workflow as app changes.

Leaflet is pinned in `package.json` and vendored under `vendor/leaflet` for offline use. To refresh those static assets after changing the package version, run `npm install` followed by `npm run vendor:leaflet`.

Tailwind CSS is pinned and compiled locally. Run `npm ci` and `npm run build:css` before preparing a local Pages artifact; the GitHub Actions workflow runs both steps automatically.

## Deployments

The repository is `https://github.com/kchorst/Travel-Prep`. The workflow at `.github/workflows/pages.yml` builds and validates the data, packages the current app shell, Leaflet assets, country GeoJSON, and profile shards, and deploys on pushes to `main`. It can also be started manually from the repository's Actions tab.

Before the first deployment, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**. This one-time repository setting requires owner/admin permission and cannot be enabled by this workflow token. After selecting it, rerun the `Deploy TravelPrep` workflow from the Actions tab; later pushes to `main` deploy automatically.

## Offline Note

The service worker caches the app shell, generated stylesheet, local Leaflet library, Natural Earth country boundaries, and priority data packs. The map uses no external tile server. Natural Earth 1:50m boundaries are public domain; see [Natural Earth's terms](https://www.naturalearthdata.com/about/terms-of-use/) and the [boundary source](https://github.com/nvkelso/natural-earth-vector/tree/master/geojson). The bundled polygons cover all 196 destination ISO codes; Taiwan's Natural Earth `CN-TW` identifier is matched to the app's `TW` profile code.