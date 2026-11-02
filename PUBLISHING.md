# Publishing Preview

The preview workflow deploys on pushes to `main` and can also be started manually. It generates and validates the regional data, then publishes the app under the repository subpath:

`https://kchorst.github.io/Travel-Prep/`

The app currently contains 196 destinations, but only profiles marked complete in the generated index have sourced guidance across all five stages and electrical data. The preview banner and profile status labels make this distinction visible. Always verify current entry, safety, and transport information with official sources.

## Deployments

The repository is `https://github.com/kchorst/Travel-Prep`. The workflow at `.github/workflows/pages.yml` builds and validates the data, packages only the current app shell and shards, and deploys on pushes to `main`. It can also be started manually from the repository's Actions tab.

The workflow enables GitHub Pages on its first run. After that run succeeds, the site will be available at the URL above; subsequent pushes to `main` redeploy automatically.

## Offline Note

The service worker caches the app shell and priority data packs. Tailwind CSS still loads from a CDN, so the preview requires a network connection for styling until the CSS is bundled locally.