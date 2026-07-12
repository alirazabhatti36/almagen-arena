// ==================== AlMaGen-Arena Service Worker ====================
const CACHE_NAME = 'almagen-arena-v2';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/js/soundengine.js',
    '/daily.html',
    '/leaderboard.html',
    '/profile.html',
    '/achievements.html',
    '/games/snake.html',
    '/games/runner.html',
    '/games/shooter.html',
    '/games/ball.html',
    '/games/puzzle.html',
    '/games/wordblitz.html',
    '/games/colorswitch.html',
    '/games/memory.html',
    '/games/mathdefense.html',
    '/games/blockbreaker.html',
    '/games/streetracer.html',
    '/games/motostunt.html',
    '/games/ludo.html',
    '/games/chess.html',
    '/games/cardmatch.html'
];

// Install - Cache all assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching all assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate - Clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Fetch - Prefer network first for HTML and JS, then cache fallback
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    if (request.method !== 'GET') return;
    if (url.origin !== self.location.origin) return;

    if (request.mode === 'navigate' || request.destination === 'document') {
        event.respondWith(
            fetch(request).then((response) => {
                const copy = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                return response;
            }).catch(() => caches.match('/index.html'))
        );
        return;
    }

    event.respondWith(
        fetch(request).then((response) => {
            if (response.ok) {
                const copy = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            }
            return response;
        }).catch(() => caches.match(request).then((cached) => cached || caches.match('/index.html')))
    );
});

// Push Notification
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New games available on AlMaGen-Arena!',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⚔️</text></svg>',
        badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⚔️</text></svg>',
        vibrate: [200, 100, 200],
        tag: 'almagen-notification'
    };
    event.waitUntil(self.registration.showNotification('AlMaGen-Arena', options));
});