var cacheName = 'pwa-sw-other-website-1.0';
var filesToCache = [
    'https://uiv5.com/demos/pwa/pwa-sw-other-website/',
    'https://uiv5.com/demos/pwa/pwa-sw-other-website/index.html',
    'https://uiv5.com/demos/pwa/pwa-sw-other-website/js/app.js',
    'https://uiv5.com/demos/pwa/pwa-sw-other-website/css/global.css',
    'https://uiv5.com/demos/pwa/pwa-sw-other-website/css/community-m-dist.css',
    'https://uiv5.com/demos/pwa/pwa-sw-other-website/css/sprite/community-m-201803072039.svg',
    'https://uiv5.com/demos/pwa/pwa-sw-other-website/css/sprite/community-m-201803072039.png',
    'https://uiv5.com/demos/pwa/pwa-sw-other-website/css/img/ywfjvz7645.jpg',
    'https://uiv5.com/demos/pwa/pwa-sw-other-website/css/img/more-icon.png',
    'https://uiv5.com/demos/pwa/pwa-sw-other-website/css/img/index/adbg2@2x.jpg',
    'https://uiv5.com/demos/pwa/pwa-sw-other-website/css/img/featured-mask.png',
    'https://uiv5.com/demos/pwa/pwa-sw-other-website/css/img/index/adbg3@2x.jpg',
    'https://uiv5.com/demos/pwa/pwa-sw-other-website/css/img/tags-icon.png',
    'https://uiv5.com/demos/pwa/pwa-sw-other-website/css/img/avatar.jpg'
];
var dataCacheName = 'Tencent-cloud-data-1.1';

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] 缓存文件');
        return cache.addAll(filesToCache);
    }));
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
            console.log('[ServiceWorker] 删除缓存文件', key);
            if (key !== cacheName && key !== dataCacheName) {
                return caches.delete(key);
            }
        }));
    }));
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
    }));
});
