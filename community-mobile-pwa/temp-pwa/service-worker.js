var cacheName = 'Tencent-cloud-1.0';
var filesToCache = [
    'index.html','app.js',
    'https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/portal/css/global.css',
    '../css/community-m-dist.css',
    '../css/sprite/community-m-201803072039.svg',
    '../css/sprite/community-m-201803072039.png',
    'https://ask.qcloudimg.com/raw/ywfjvz7645.jpg',
    'https://zww-v5.github.io/demos/community-mobile-pwa/css/img/more-icon.png',
    'https://zww-v5.github.io/demos/community-mobile-pwa/css/img/index/adbg2@2x.jpg',
    'https://zww-v5.github.io/demos/community-mobile-pwa/css/img/featured-mask.png',
    'https://zww-v5.github.io/demos/community-mobile-pwa/css/img/index/adbg3@2x.jpg',
    'https://zww-v5.github.io/demos/community-mobile-pwa/css/img/tags-icon.png',
    'https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/community/css/img/temp/avatar.jpg'
];
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
