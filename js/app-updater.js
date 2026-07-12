(function () {
    if (!('serviceWorker' in navigator)) return;

    let isReloading = false;

    function handleServiceWorkerUpdate(registration) {
        if (registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            if (!isReloading) {
                isReloading = true;
                window.location.reload();
            }
        }
    }

    function registerServiceWorker() {
        navigator.serviceWorker.register('/sw.js').then((registration) => {
            console.log('Service Worker registered');

            if (registration.waiting) {
                handleServiceWorkerUpdate(registration);
            }

            registration.addEventListener('updatefound', () => {
                const installingWorker = registration.installing;
                if (!installingWorker) return;

                installingWorker.addEventListener('statechange', () => {
                    if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        handleServiceWorkerUpdate(registration);
                    }
                });
            });
        }).catch((err) => {
            console.log('Service Worker registration failed', err);
        });
    }

    window.addEventListener('load', registerServiceWorker);

    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!isReloading) {
            isReloading = true;
            window.location.reload();
        }
    });

    setInterval(() => {
        navigator.serviceWorker.getRegistration('/sw.js').then((registration) => {
            if (registration) {
                registration.update();
            }
        }).catch(() => {});
    }, 10000);
})();
