const CACHE_NAME = 'medlab-pro-v2.0';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Install - cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('📦 Caching app assets...');
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.log('⚠️ Some assets failed to cache:', err);
        // Cache what we can individually
        return Promise.allSettled(
          ASSETS_TO_CACHE.map(url => cache.add(url).catch(() => console.log('Skip:', url)))
        );
      });
    })
  );
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names.filter(name => name !== CACHE_NAME).map(name => {
          console.log('🗑️ Deleting old cache:', name);
          return caches.delete(name);
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - Cache First for local, Network First for external
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // For Google Fonts - try cache first, then network
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }

  // For CDN resources - cache first
  if (url.hostname === 'cdnjs.cloudflare.com') {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // For local assets - cache first, fallback to network
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        const fetchPromise = fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // For everything else - network first
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
