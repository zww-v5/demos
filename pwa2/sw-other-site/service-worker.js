//将本 service worder 上传到 github 中

var cacheName = 'uiv5-pwa-demo3-1.0';
var filesToCache = [
    'https://uiv5.com/demos/pwa2/sw-other-site/index.html',
    'https://uiv5.com/demos/pwa2/sw-other-site/js/app.js',
    'https://uiv5.com/demos/pwa2/sw-other-site/css/global.css',
    'https://uiv5.com/demos/pwa2/sw-other-site/css/community-m-dist.css',
    'https://uiv5.com/demos/pwa2/sw-other-site/css/sprite/community-m-201803072039.svg',
    'https://uiv5.com/demos/pwa2/sw-other-site/css/sprite/community-m-201803072039.png',
    'https://uiv5.com/demos/pwa2/sw-other-site/css/img/ywfjvz7645.jpg',
    'https://uiv5.com/demos/pwa2/sw-other-site/css/img/more-icon.png',
    'https://uiv5.com/demos/pwa2/sw-other-site/css/img/index/adbg2@2x.jpg',
    'https://uiv5.com/demos/pwa2/sw-other-site/css/img/featured-mask.png',
    'https://uiv5.com/demos/pwa2/sw-other-site/css/img/index/adbg3@2x.jpg',
    'https://uiv5.com/demos/pwa2/sw-other-site/css/img/tags-icon.png',
    'https://uiv5.com/demos/pwa2/sw-other-site/css/img/avatar.jpg'
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
