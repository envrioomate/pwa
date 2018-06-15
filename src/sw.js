workbox.skipWaiting();
workbox.clientsClaim();


workbox.routing.registerRoute(
    new RegExp('https://enviroommate.org/'),
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

    console.log("received push");
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    let data = {};
    if (event.data) {
        data = event.data.json();
    }
    const title = data.title || "Something Has Happened";
    const message = data.message || "Here's something you might want to check out.";
    const icon = "./assets/Logo_neu_sq.png";


    registration.showNotification(title, {
        body: message,
        tag: 'ENVR_Reminder',
        icon: icon,
        onclick: function() {
            event.preventDefault();
            window.open('https://enviroommate.org/#/current_challenge', '_blank')
        }
    });
});

workbox.precaching.precacheAndRoute(self.__precacheManifest);