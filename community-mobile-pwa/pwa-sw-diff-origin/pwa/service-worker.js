var cacheName = 'Tencent-cloud-1.5';
var filesToCache = [
    // '/demos/community-mobile-pwa/pwa-sw-diff-origin/',
    // '/demos/community-mobile-pwa/pwa-sw-diff-origin/index.html',
    // '/demos/community-mobile-pwa/pwa-sw-diff-origin/app.js',
    // '/demos/community-mobile-pwa/pwa-sw-diff-origin/css/global.css',
    // '/demos/community-mobile-pwa/pwa-sw-diff-origin/css/community-m-dist.css',
    // '/demos/community-mobile-pwa/pwa-sw-diff-origin/css/sprite/community-m-201803072039.svg',
    // '/demos/community-mobile-pwa/pwa-sw-diff-origin/css/sprite/community-m-201803072039.png',
    // '/demos/community-mobile-pwa/pwa-sw-diff-origin/css/img/ywfjvz7645.jpg',
    // '/demos/community-mobile-pwa/pwa-sw-diff-origin/css/img/more-icon.png',
    // '/demos/community-mobile-pwa/pwa-sw-diff-origin/css/img/index/adbg2@2x.jpg',
    // '/demos/community-mobile-pwa/pwa-sw-diff-origin/css/img/featured-mask.png',
    // '/demos/community-mobile-pwa/pwa-sw-diff-origin/css/img/index/adbg3@2x.jpg',
    // '/demos/community-mobile-pwa/pwa-sw-diff-origin/css/img/tags-icon.png',
    // '/demos/community-mobile-pwa/pwa-sw-diff-origin/css/img/avatar.jpg'
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
