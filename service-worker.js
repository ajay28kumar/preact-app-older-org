importScripts('https://s3-eu-west-1.amazonaws.com/static.wizrocket.com/js/sw_webpush.js');

workbox.routing.registerRoute(
    new RegExp(/(.js|.css)/i),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'routes-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 7 * 24 * 60 * 60
            }),
        ],
    })
);

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

