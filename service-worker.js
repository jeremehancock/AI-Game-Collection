const CACHE_NAME = "pwa-cache-v10.4";

// Simplified URLs - relative paths
const urlsToCache = [
  "/",
  "/index.html",
  "/games/nerdle/index.html",
  "/games/pipes/index.html",
  "/games/memory/index.html",
  "/games/minesweeper/index.html",
  "/games/snake/index.html",
  "/games/soccer-juggle/index.html",
  "/games/water-ring-toss/index.html",
  "/games/waveform/index.html",
  "/games/block-drop/index.html",
  "/games/bubble-pop/index.html",
  "/games/breakout/index.html",
  "/games/space-shooter/index.html",
  "/games/space-shooter-2/index.html",
  "/games/deep-sea-escape/index.html",
  "/games/circles-and-squares/index.html",
  "/games/fruit-slice/index.html",
  "/games/orb-attack/index.html",
  "/games/four-in-a-row/index.html",
  "/games/flapping-bird/index.html",
  "/images/icons/web-app-manifest-192x192.png",
  "/images/icons/web-app-manifest-512x512.png",
];

// Install - cache files ONE BY ONE to see which fails
self.addEventListener("install", (event) => {
  console.log('[SW v10.4] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        console.log('[SW] Starting to cache files...');
        
        // Cache files one by one to identify failures
        for (const url of urlsToCache) {
          try {
            console.log(`[SW] Caching: ${url}`);
            await cache.add(url);
            console.log(`[SW] ✓ Cached: ${url}`);
          } catch (error) {
            console.error(`[SW] ✗ FAILED to cache: ${url}`, error);
          }
        }
        
        console.log('[SW] Caching complete!');
      })
      .then(() => self.skipWaiting())
      .catch((error) => {
        console.error('[SW] Cache process failed:', error);
      })
  );
});

// Activate - clean up old caches
self.addEventListener("activate", (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Activated!');
      return self.clients.claim();
    })
  );
});

// Fetch - serve from cache
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[SW] ✓ Serving from cache:', event.request.url);
          return cachedResponse;
        }
        
        console.log('[SW] → Fetching from network:', event.request.url);
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              console.log('[SW] Caching new resource:', event.request.url);
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
      .catch((error) => {
        console.error('[SW] Fetch failed:', event.request.url, error);
        throw error;
      })
  );
});
