const CACHE = 'vk-v3';

self.addEventListener('install', () => {
  self.skipWaiting();
});

// Remove old caches on activate
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Network-first for external APIs (GitHub, ghchart) — cache as fallback
  if (url.origin !== self.location.origin) {
    e.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Network-first for HTML — index.html changes on every deploy and must
  // never be served stale (stale HTML references old hashed asset filenames
  // that no longer exist, causing a blank page with no recovery path on iOS PWA).
  const isHTML =
    request.headers.get('accept')?.includes('text/html') ||
    url.pathname === '/' ||
    url.pathname.endsWith('.html');

  if (isHTML) {
    e.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Cache-first for hashed JS/CSS/images — content-addressed so safe to cache forever
  e.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request).then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(request, clone));
        }
        return res;
      });
      return cached ?? networkFetch;
    })
  );
});
