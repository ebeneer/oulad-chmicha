self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  const isDynamicProtectedPath =
    requestUrl.pathname.startsWith("/api/") || requestUrl.pathname.startsWith("/admin");
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
    caches.open("oc-v1").then(async (cache) => {
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
