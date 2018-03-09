(function(){
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/demos/pwa/service-worker.js').then(function() {
            console.log('Service Worker Registered');
        });
    }
})();
