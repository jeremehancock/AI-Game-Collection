const CACHE_NAME = "pwa-cache-v10.6";

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

// Helper to send messages to clients
async function sendMessageToClients(message) {
  try {
    const clients = await self.clients.matchAll({ includeUncontrolled: true });
    clients.forEach(client => {
      client.postMessage(message);
    });
  } catch (error) {
    console.error('Error sending message to clients:', error);
  }
}

// Install event - cache all games
self.addEventListener("install", (event) => {
  console.log('[SW v10.6] Installing...');
  
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        let cached = 0;
        let failed = 0;
        const total = urlsToCache.length;
        
        // Cache each file individually
        for (const url of urlsToCache) {
          try {
            await cache.add(url);
            cached++;
            
            // Send progress update
            await sendMessageToClients({
              type: 'CACHE_PROGRESS',
              cached: cached,
              total: total
            });
            
          } catch (error) {
            failed++;
            console.error(`[SW] Failed to cache: ${url}`, error);
          }
        }
        
        // Send completion message
        if (failed === 0) {
          await sendMessageToClients({
            type: 'CACHE_COMPLETE',
            total: cached
          });
          console.log(`[SW] Successfully cached all ${cached} files`);
        } else {
          await sendMessageToClients({
            type: 'CACHE_ERROR',
            cached: cached,
            total: total,
            failed: failed
          });
          console.log(`[SW] Cached ${cached}/${total} files. ${failed} failed.`);
        }
        
        // Skip waiting to activate immediately
        await self.skipWaiting();
        
      } catch (error) {
        console.error('[SW] Install failed:', error);
        throw error;
      }
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    (async () => {
      try {
        const cacheNames = await caches.keys();
        
        // Delete old caches
        await Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
        
        // Take control of all pages
        await self.clients.claim();
        console.log('[SW] Activated and ready!');
        
      } catch (error) {
        console.error('[SW] Activation failed:', error);
      }
    })()
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip non-http requests
  if (!event.request.url.startsWith('http')) return;
  
  event.respondWith(
    (async () => {
      try {
        // Try cache first
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Not in cache, fetch from network
        const networkResponse = await fetch(event.request);
        
        // Cache successful responses
        if (networkResponse && networkResponse.status === 200) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
        }
        
        return networkResponse;
        
      } catch (error) {
        console.error('[SW] Fetch failed:', event.request.url, error);
        throw error;
      }
    })()
  );
});
