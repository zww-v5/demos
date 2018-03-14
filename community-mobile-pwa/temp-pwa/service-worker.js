var cacheName = 'Tencent-cloud-1.0';
var filesToCache = [
    'index.html',
    'app.js',
    'css/global.css',
    'css/community-m-dist.css',
    'css/sprite/community-m-201803072039.svg',
    'css/sprite/community-m-201803072039.png',
    'css/img/ywfjvz7645.jpg',
    'css/img/more-icon.png',
    'css/img/index/adbg2@2x.jpg',
    'css/img/featured-mask.png',
    'css/img/index/adbg3@2x.jpg',
    'css/img/tags-icon.png',
    'css/img/avatar.jpg'
];
var dataCacheName = 'Tencent-cloud-data-1.0';

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
    e.respondWith(caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
    }));
});
