const CACHE_NAME = "pwa-cache-v10.1";
const urlsToCache = [
  "/",
  "./",
  "index.html",
  "./index.html",
  "games/nerdle/index.html",
  "games/pipes/index.html",
  "games/memory/index.html",
  "games/minesweeper/index.html",
  "games/snake/index.html",
  "games/soccer-juggle/index.html",
  "games/water-ring-toss/index.html",
  "games/waveform/index.html",
  "games/block-drop/index.html",
  "games/bubble-pop/index.html",
  "games/breakout/index.html",
  "games/space-shooter/index.html",
  "games/space-shooter-2/index.html",
  "games/deep-sea-escape/index.html",
  "games/circles-and-squares/index.html",
  "games/fruit-slice/index.html",
  "games/orb-attack/index.html",
  "games/four-in-a-row/index.html",
  "games/flapping-bird/index.html",
  "images/icons/web-app-manifest-192x192.png",
  "images/icons/web-app-manifest-512x512.png",
];

// Install the service worker and cache ALL resources
self.addEventListener("install", (event) => {
  console.log('[SW] Installing and caching all games...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching files...');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[SW] All games cached!');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Cache failed:', error);
        throw error;
      })
  );
});

// Activate and clean up old caches
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
      console.log('[SW] Activated and claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch handler - cache-first strategy with network fallback
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[SW] Serving from cache:', event.request.url);
          return cachedResponse;
        }
        
        console.log('[SW] Fetching from network:', event.request.url);
        return fetch(event.request).then((networkResponse) => {
          // Cache successful responses
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
        console.error('[SW] Fetch failed:', error);
        // You could return a custom offline page here
        throw error;
      })
  );
});
