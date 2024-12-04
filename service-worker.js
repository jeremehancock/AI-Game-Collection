const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  'index.html',
  'pipes-puzzle/index.html',
  'memory/index.html',
  'minesweeper/index.html',
  'snake-game/index.html',
  'soccer-juggle/index.html',
  'water-ring-toss/index.html',
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

