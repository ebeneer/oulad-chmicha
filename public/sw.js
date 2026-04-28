// Bump cette version a chaque deploiement (ou via un build step) pour invalider le cache.
const CACHE_NAME = "oc-v3";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("oc-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
    ]),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  const isDynamicProtectedPath =
    requestUrl.pathname.startsWith("/api/") || requestUrl.pathname.startsWith("/admin");
  // Les chunks Next.js sont content-hashed: safe a cacher long-terme tant que l'URL change a chaque deploy.
  const isStaticAsset =
    requestUrl.pathname.startsWith("/_next/static/") ||
    requestUrl.pathname.startsWith("/images/") ||
    requestUrl.pathname.startsWith("/icons/") ||
    requestUrl.pathname.endsWith(".png") ||
    requestUrl.pathname.endsWith(".jpg") ||
    requestUrl.pathname.endsWith(".jpeg") ||
    requestUrl.pathname.endsWith(".webp") ||
    requestUrl.pathname.endsWith(".avif") ||
    requestUrl.pathname.endsWith(".svg") ||
    requestUrl.pathname.endsWith(".css") ||
    requestUrl.pathname.endsWith(".js") ||
    requestUrl.pathname.endsWith(".woff2");

  if (!isSameOrigin || isDynamicProtectedPath || !isStaticAsset) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request);
      if (cached) return cached;
      const response = await fetch(event.request);
      if (response.ok) {
        cache.put(event.request, response.clone());
      }
      return response;
    }),
  );
});
