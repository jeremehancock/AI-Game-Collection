const CACHE_NAME = "pwa-cache-v13.2";

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
  "/games/water-ring-toss/index.html",
  "/games/tic-tac-toe/index.html",
  "/games/checkers/index.html",
  "/games/whack-a-mole/index.html",
  "/games/puzzle-cube/index.html",
  "/images/icons/web-app-manifest-192x192.png",
  "/images/icons/web-app-manifest-512x512.png",
];

// Helper to send messages to clients
async function sendMessageToClients(message) {
  try {
    const clients = await self.clients.matchAll({ includeUncontrolled: true });
    clients.forEach((client) => {
      client.postMessage(message);
    });
  } catch (error) {
    console.error("Error sending message to clients:", error);
  }
}

// Install event - cache all games
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        let cached = 0;
        let failed = 0;
        const total = urlsToCache.length;

        for (const url of urlsToCache) {
          try {
            await cache.add(url);
            cached++;

            await sendMessageToClients({
              type: "CACHE_PROGRESS",
              cached: cached,
              total: total,
            });
          } catch (error) {
            failed++;
            console.error(`[SW] Failed to cache: ${url}`, error);
          }
        }

        if (failed === 0) {
          await sendMessageToClients({
            type: "CACHE_COMPLETE",
            total: cached,
          });
          console.log(`[SW] Successfully cached all ${cached} files`);
        } else {
          await sendMessageToClients({
            type: "CACHE_ERROR",
            cached: cached,
            total: total,
            failed: failed,
          });
          console.log(
            `[SW] Cached ${cached}/${total} files. ${failed} failed.`
          );
        }

        await self.skipWaiting();
      } catch (error) {
        console.error("[SW] Install failed:", error);
        throw error;
      }
    })()
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating...");

  event.waitUntil(
    (async () => {
      try {
        const cacheNames = await caches.keys();

        await Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("[SW] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );

        await self.clients.claim();
        console.log("[SW] Activated and ready!");
      } catch (error) {
        console.error("[SW] Activation failed:", error);
      }
    })()
  );
});

// Enhanced fetch handler with URL variations
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (!event.request.url.startsWith("http")) return;

  event.respondWith(
    (async () => {
      try {
        const url = new URL(event.request.url);

        // Try exact match first
        let response = await caches.match(event.request);
        if (response) {
          console.log("[SW] ✓ Cache hit:", url.pathname);
          return response;
        }

        // If no match and URL ends with /, try adding index.html
        if (url.pathname.endsWith("/")) {
          const indexUrl = url.pathname + "index.html";
          response = await caches.match(indexUrl);
          if (response) {
            console.log("[SW] ✓ Cache hit (index.html):", indexUrl);
            return response;
          }
        }

        // If URL doesn't have extension, try adding /index.html
        if (!url.pathname.includes(".")) {
          const indexUrl = url.pathname + "/index.html";
          response = await caches.match(indexUrl);
          if (response) {
            console.log("[SW] ✓ Cache hit (added /index.html):", indexUrl);
            return response;
          }
        }

        // Try without trailing slash
        if (url.pathname.endsWith("/") && url.pathname !== "/") {
          const noSlashUrl = url.pathname.slice(0, -1);
          response = await caches.match(noSlashUrl);
          if (response) {
            console.log("[SW] ✓ Cache hit (no slash):", noSlashUrl);
            return response;
          }
        }

        console.log("[SW] ✗ Cache miss, fetching:", url.pathname);

        // Not in cache - fetch from network
        const networkResponse = await fetch(event.request);

        // Cache successful responses
        if (networkResponse && networkResponse.status === 200) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
          console.log("[SW] Cached from network:", url.pathname);
        }

        return networkResponse;
      } catch (error) {
        console.error("[SW] Fetch failed:", event.request.url, error);
        throw error;
      }
    })()
  );
});
