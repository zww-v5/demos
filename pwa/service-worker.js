var cacheName = 'weatherPWA-step-6-2';
var filesToCache = ['/demos/pwa/', '/demos/pwa/index.html', '/demos/pwa/scripts/app.js', '/demos/pwa/styles/inline.css', '/demos/pwa/images/clear.png', '/demos/pwa/images/cloudy-scattered-showers.png', '/demos/pwa/images/cloudy.png', '/demos/pwa/images/fog.png', '/demos/pwa/images/ic_add_white_24px.svg', '/demos/pwa/images/ic_refresh_white_24px.svg', '/demos/pwa/images/partly-cloudy.png', '/demos/pwa/images/rain.png', '/demos/pwa/images/scattered-showers.png', '/demos/pwa/images/sleet.png', '/demos/pwa/images/snow.png', '/demos/pwa/images/thunderstorm.png', '/demos/pwa/images/wind.png'];
var dataCacheName = 'weatherData-v1';

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
    }));
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
            console.log('[ServiceWorker] Removing old cache', key);
            if (key !== cacheName && key !== dataCacheName) {
                return caches.delete(key);
            }
        }));
    }));
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
    if (e.request.url.indexOf(dataUrl) === 0) {
        e.respondWith(fetch(e.request).then(function(response) {
            return caches.open(dataCacheName).then(function(cache) {
                cache.put(e.request.url, response.clone());
                console.log('[ServiceWorker] Fetched&Cached Data');
                return response;
            });
        }));
    } else {
        e.respondWith(caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        }));
    }
});
