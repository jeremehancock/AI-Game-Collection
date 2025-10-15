const CACHE_NAME = "pwa-cache-v10.3";

// Get the base URL for proper path resolution
const BASE_URL = self.location.origin;

const urlsToCache = [
  `${BASE_URL}/`,
  `${BASE_URL}/index.html`,
  `${BASE_URL}/games/nerdle/index.html`,
  `${BASE_URL}/games/pipes/index.html`,
  `${BASE_URL}/games/memory/index.html`,
  `${BASE_URL}/games/minesweeper/index.html`,
  `${BASE_URL}/games/snake/index.html`,
  `${BASE_URL}/games/soccer-juggle/index.html`,
  `${BASE_URL}/games/water-ring-toss/index.html`,
  `${BASE_URL}/games/waveform/index.html`,
  `${BASE_URL}/games/block-drop/index.html`,
  `${BASE_URL}/games/bubble-pop/index.html`,
  `${BASE_URL}/games/breakout/index.html`,
  `${BASE_URL}/games/space-shooter/index.html`,
  `${BASE_URL}/games/space-shooter-2/index.html`,
  `${BASE_URL}/games/deep-sea-escape/index.html`,
  `${BASE_URL}/games/circles-and-squares/index.html`,
  `${BASE_URL}/games/fruit-slice/index.html`,
  `${BASE_URL}/games/orb-attack/index.html`,
  `${BASE_URL}/games/four-in-a-row/index.html`,
  `${BASE_URL}/games/flapping-bird/index.html`,
  `${BASE_URL}/images/icons/web-app-manifest-192x192.png`,
  `${BASE_URL}/images/icons/web-app-manifest-512x512.png`,
];

// Install - cache all game files
self.addEventListener("install", (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching files:', urlsToCache);
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[SW] All files cached successfully!');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Cache failed:', error);
        throw error;
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

// Fetch - serve from cache or network
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip non-http(s) requests
  if (!event.request.url.startsWith('http')) return;
  
  const requestUrl = new URL(event.request.url);
  console.log('[SW] Fetch request for:', requestUrl.href);
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[SW] ✓ CACHE HIT:', requestUrl.href);
          return cachedResponse;
        }
        
        // Not in cache - try different URL variations
        console.log('[SW] ✗ CACHE MISS - trying variations for:', requestUrl.href);
        
        // Try with trailing slash
        return caches.match(event.request.url + '/')
          .then(response => {
            if (response) {
              console.log('[SW] ✓ Found with trailing slash');
              return response;
            }
            
            // Try without trailing slash
            return caches.match(event.request.url.replace(/\/$/, ''));
          })
          .then(response => {
            if (response) {
              console.log('[SW] ✓ Found without trailing slash');
              return response;
            }
            
            // Still not found - fetch from network
            console.log('[SW] → Fetching from network:', requestUrl.href);
            return fetch(event.request).then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  console.log('[SW] Caching new resource:', requestUrl.href);
                  cache.put(event.request, responseToCache);
                });
              }
              return networkResponse;
            });
          });
      })
      .catch((error) => {
        console.error('[SW] ✗ FETCH FAILED:', requestUrl.href, error);
        throw error;
      })
  );
});
