<template>
    <v-container fill-height grid-list-md text-xs-center>
        <v-layout align-center>
            <h3 class="display-3">Einstellungen</h3>
            <v-btn @click="subscribeNotifications">Notifications</v-btn>
            <v-btn @click="testPushNotification">Test Notification</v-btn>

        </v-layout>
    </v-container>
</template>

<script>
    import Api from '../api/api'

    export default {
        data: () => {
            return {
                registration: null
            }
        },
        computed: {

        },
        methods: {
            subscribeNotifications: function () {
                console.log("register sw from settings")
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.register('service-worker.js').then(async registration => {

                        const response = await fetch('./api/push/vapidPublicKey');
                        const vapidPublicKey = await response.text();
                        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: convertedVapidKey
                        });
                        console.log("SW registered: ", registration);
                        this.registration = registration;
                        registration.pushManager.getSubscription().then(s => {
                            Api.registerPushNotifications(s, (res) => {
                                console.log("registered push notification endpoint")
                            } , (err) => console.error(err))
                        })
                    }).catch(registrationError => {
                        console.log("SW Registration failed! ", registrationError);
                    });
                }
            },
            testPushNotification: async function() {

                let subscr = await navigator.serviceWorker.getRegistration().then(r => r.pushManager.getSubscription());
                console.log(JSON.stringify(subscr));
                fetch('./api/push/sendNotification', {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        subscription: subscr,
                        payload: {message: "Hello"},
                        delay: 1,
                        ttl: 3600,
                    }),
                });

            }
        }
    }

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

</script>

<style scoped>

</style>