const CACHE_NAME = "pwa-cache-v10.5";

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

// Send message to all clients
function sendMessageToClients(message) {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => client.postMessage(message));
  });
}

// Install - cache files with visual progress
self.addEventListener("install", (event) => {
  console.log('[SW v10.5] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        let cached = 0;
        let failed = 0;
        const total = urlsToCache.length;
        
        // Cache files one by one
        for (const url of urlsToCache) {
          try {
            await cache.add(url);
            cached++;
            sendMessageToClients({
              type: 'CACHE_PROGRESS',
              cached: cached,
              total: total
            });
          } catch (error) {
            failed++;
            console.error(`Failed to cache: ${url}`, error);
          }
        }
        
        // Send completion message
        if (failed === 0) {
          sendMessageToClients({
            type: 'CACHE_COMPLETE',
            total: cached
          });
        } else {
          sendMessageToClients({
            type: 'CACHE_ERROR',
            cached: cached,
            total: total,
            failed: failed
          });
        }
        
        console.log(`[SW] Cached ${cached}/${total} files. Failed: ${failed}`);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - serve from cache or network
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
  );
});          }
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
