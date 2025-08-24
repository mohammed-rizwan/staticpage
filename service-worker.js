// Sugarwares Service Worker
const CACHE_NAME = 'sugarwares-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/products.html',
  '/contact.html',
  '/blog.html',
  '/CSS/main.css',
  '/CSS/style.css',
  '/JavaScript/main.js',
  '/JavaScript/script.js',
  '/images/www.sugarwares.com-logo.png',
  '/images/background-banner01.webp',
  '/images/background-banner02.webp'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle offline form submissions
  console.log('Background sync triggered');
  // Add your offline form handling logic here
}
