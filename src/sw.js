workbox.skipWaiting();
workbox.clientsClaim();


workbox.routing.registerRoute(
    new RegExp('https://hacker-news.firebaseio.com'),
    workbox.strategies.staleWhileRevalidate()
);

function getEndpoint() {
    return self.registration.pushManager.getSubscription()
        .then(function(subscription) {
            if (subscription) {
                return subscription.endpoint;
            }

            throw new Error('User not subscribed');
        });
}

self.addEventListener('push', (event) => {

    event.waitUntil(getEndpoint()
            .then(function(endpoint) {                                                                                          return fetch('./api/push/getPayload?endpoint=' + endpoint);
            })
            .then(function(response) {
                return response.text();
            })
            .then(function(payload) {
                self.registration.showNotification('ServiceWorker Cookbook', {
                    body: payload,
                });
            })
    );
});

workbox.precaching.precacheAndRoute(self.__precacheManifest);