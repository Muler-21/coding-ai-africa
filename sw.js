// Offline cache for Coding & AI for Africa (GitHub Pages).
// Bump CACHE when index.html changes so learners get the new version.
const CACHE = 'cafa-v9';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg',
  ...[0,1,2,3,4,5,6,7,8].map(i => `./content/modules-${i}.js`),
  './content/stats-core.js', ...[0,1,2,3,4,5,6,7,8].map(i => `./content/stats-${i}.js`)];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

// Network first for pages (fresh content when online), cache as fallback offline.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // fonts and counter go straight to the network
  event.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(cache => cache.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
  );
});
