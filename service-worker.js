const CACHE_NAME = "pwa-cache-v9.5";
const urlsToCache = [
  "index.html",
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
  "images/icons/web-app-manifest-192x192.png",
  "images/icons/web-app-manifest-512x512.png",
];

// Install the service worker and cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Serve cached resources when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
