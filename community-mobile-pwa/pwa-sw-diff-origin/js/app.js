(function() {
    'use strict';

    //注册service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('pwa/service-worker.js').then(function() {
            console.log('[ServiceWorker] Registered');
        });
    }

    //监听添加主屏弹窗的选择
    window.addEventListener('beforeinstallprompt', function(e) {
        // beforeinstallprompt Event fired

        // e.userChoice will return a Promise.
        // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
        e.userChoice.then(function(choiceResult) {

            console.log(choiceResult.outcome);

            if (choiceResult.outcome == 'dismissed') {
                console.log('用户取消了添加主屏');
            } else {
                console.log('用户选择了添加主屏');
            }
        });
    });
})();
