const SHELL_CACHE = "travel-engine-shell-v38";
const DATA_CACHE = "travel-engine-data-v1";
const SHELL_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./styles.css",
  "./data/world-countries.geojson",
  "./vendor/leaflet/leaflet.css",
  "./vendor/leaflet/leaflet.js",
  "./vendor/leaflet/LICENSE",
  "./vendor/leaflet/images/layers.png",
  "./vendor/leaflet/images/layers-2x.png",
  "./vendor/leaflet/images/marker-icon.png",
  "./vendor/leaflet/images/marker-icon-2x.png",
  "./vendor/leaflet/images/marker-shadow.png",
  "./icon-192.png",
  "./icon-512.png",
  "./data/images/socket-type-a.svg",
  "./data/images/socket-type-b.svg",
  "./data/images/socket-type-c.svg",
  "./data/images/socket-type-d.svg",
  "./data/images/socket-type-e.svg",
  "./data/images/socket-type-f.svg",
  "./data/images/socket-type-g.svg",
  "./data/images/socket-type-h.svg",
  "./data/images/socket-type-i.svg",
  "./data/images/socket-type-j.svg",
  "./data/images/socket-type-k.svg",
  "./data/images/socket-type-l.svg",
  "./data/images/socket-type-m.svg",
  "./data/images/socket-type-n.svg",
  "./data/images/socket-type-o.svg"
];
const INDEX_URL = new URL("./data/index.json", self.registration.scope).href;

async function loadCachedIndex() {
  const response = await caches.match(INDEX_URL);
  return response ? response.json() : null;
}

function toHex(buffer) {
  return [...new Uint8Array(buffer)].map(value => value.toString(16).padStart(2, "0")).join("");
}

async function storeShard(cache, url, response, name, expectedHash) {
  const digest = toHex(await crypto.subtle.digest("SHA-256", await response.clone().arrayBuffer()));
  if (digest !== expectedHash) throw new Error(`Integrity check failed for ${name}`);

  await cache.put(url, response.clone());
  const prefix = `${name}.`;
  for (const request of await cache.keys()) {
    const pathname = new URL(request.url).pathname;
    const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
    if (request.url !== url && filename.startsWith(prefix) && filename.endsWith(".json")) {
      await cache.delete(request);
    }
  }
  return response;
}

async function notifyUpdateCheck(type) {
  const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
  clients.forEach(client => client.postMessage({ type }));
}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const shellCache = await caches.open(SHELL_CACHE);
    await shellCache.addAll(SHELL_ASSETS);

    const indexResponse = await fetch(INDEX_URL, { cache: "no-cache" });
    if (!indexResponse.ok) throw new Error("Unable to fetch destination index");
    await shellCache.put(INDEX_URL, indexResponse.clone());
    const index = await indexResponse.json();
    const dataCache = await caches.open(DATA_CACHE);

    for (const name of index.defaultShards) {
      const shard = index.shards[name];
      if (!shard) throw new Error(`Default shard missing from index: ${name}`);
      const url = new URL(shard.url, self.registration.scope).href;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Unable to fetch default shard: ${name}`);
      await storeShard(dataCache, url, response, name, shard.sha256);
    }
  })());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) =>
        (key.startsWith("travel-engine-shell-") && key !== SHELL_CACHE) || key === "travel-engine-v7"
      ).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data?.type !== "CACHE_ALL_SHARDS") return;
  const port = event.ports[0];
  event.waitUntil((async () => {
    try {
      const index = await loadCachedIndex();
      if (!index) throw new Error("Destination index is not cached yet.");
      const cache = await caches.open(DATA_CACHE);
      const shards = Object.entries(index.shards);
      let completed = 0;

      for (const [name, shard] of shards) {
        const url = new URL(shard.url, self.registration.scope).href;
        if (!await cache.match(url)) {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Unable to download ${name}.`);
          await storeShard(cache, url, response, name, shard.sha256);
        }
        completed++;
        port?.postMessage({ type: "CACHE_ALL_PROGRESS", completed, total: shards.length, region: name });
      }

      port?.postMessage({ type: "CACHE_ALL_COMPLETE", records: index.destinations.length });
    } catch (error) {
      port?.postMessage({ type: "CACHE_ALL_FAILED", message: error.message || "A profile region could not be cached." });
    } finally {
      port?.close();
    }
  })());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;

  if (event.request.url === INDEX_URL) {
    event.respondWith((async () => {
      try {
        const response = await fetch(event.request, { cache: "no-cache" });
        if (!response.ok) throw new Error("Destination index request failed");
        const cache = await caches.open(SHELL_CACHE);
        await cache.put(INDEX_URL, response.clone());
        await notifyUpdateCheck("UPDATE_CHECK_SUCCEEDED");
        return response;
      } catch {
        await notifyUpdateCheck("UPDATE_CHECK_FAILED");
        return await caches.match(INDEX_URL) || Response.error();
      }
    })());
    return;
  }

  const regionsPath = new URL("./data/regions/", self.registration.scope).pathname;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.pathname.startsWith(regionsPath)) {
    event.respondWith((async () => {
      const cache = await caches.open(DATA_CACHE);
      const cached = await cache.match(event.request);
      if (cached) return cached;

      const index = await loadCachedIndex();
      const entry = index && Object.entries(index.shards).find(([, shard]) =>
        new URL(shard.url, self.registration.scope).href === event.request.url
      );
      try {
        const response = await fetch(event.request);
        if (!response.ok) throw new Error("Destination shard request failed");
        if (entry) return await storeShard(cache, event.request.url, response, entry[0], entry[1].sha256);
        return response;
      } catch {
        const requestedName = requestUrl.pathname.substring(requestUrl.pathname.lastIndexOf("/") + 1).split(".")[0];
        const oldVersion = (await cache.keys()).find(request => {
          const pathname = new URL(request.url).pathname;
          const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
          return filename.startsWith(`${requestedName}.`) && filename.endsWith(".json");
        });
        return oldVersion ? await cache.match(oldVersion) : Response.error();
      }
    })());
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
