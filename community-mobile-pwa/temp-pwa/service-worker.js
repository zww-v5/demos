var cacheName = 'Tencent-cloud-1.0';
var filesToCache = ['index.html','app.js','../css/community-m-dist.css','../css/sprite/community-m-201803072039.svg','../css/sprite/community-m-201803072039.png'];
var dataCacheName = 'Tencent-cloud-data-1.0';

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
