const CACHE_NAME = 'pwa-cache-v2';
const urlsToCache = [
  'index.html',
  'games/nerdle/index.html',
  'games/pipes-puzzle/index.html',
  'games/memory/index.html',
  'games/minesweeper/index.html',
  'games/snake-game/index.html',
  'games/soccer-juggle/index.html',
  'games/water-ring-toss/index.html',
  'images/icons/web-app-manifest-192x192.png', 
  'images/icons/web-app-manifest-512x512.png'
];

// Install the service worker and cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Serve cached resources when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

