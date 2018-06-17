<template>
    <v-container>
        <v-layout>
            <v-flex xs12>
                <v-flex xs12>
                    <h3 class="display-3">Einstellungen</h3>
                </v-flex>
                <v-flex xs12>
                </v-flex>

                <v-switch
                        label="Push-Nachrichten erhalten"
                        v-model="isRegistered"
                        color="primary"
                ></v-switch>
                <v-flex xs12>
                    <v-btn @click="testPushNotification">Test Notification</v-btn>
                </v-flex>

            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
    import Api from '../api/api'

    export default {
        data: () => {
            return {
                registration: null,
                isRegistered: false
            }
        },
        watch: {
            isRegistered: async function (newValue) {
                let isSub = await this.isSubscribedNotification()
                if (newValue && !isSub) {

                    this.subscribeNotifications();
                }
                if (!newValue && isSub) {

                    this.unsubscribeNotifications()

                }
            }
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
                            }, (err) => console.error(err))
                        })
                    }).catch(registrationError => {
                        console.log("SW Registration failed! ", registrationError);
                    });
                }
            },
            unsubscribeNotifications: function () {
                console.log("unregister sw from settings")
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.register('service-worker.js').then(async registration => {

                        const response = await fetch('./api/push/vapidPublicKey');
                        const vapidPublicKey = await response.text();
                        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
                        registration.pushManager.getSubscription().then(s => {
                            s.unsubscribe();
                            console.log("SW unsubscribed: ", registration);

                        });
                    }).catch(registrationError => {
                        console.log("SW Registration failed! ", registrationError);
                    });
                }
            },
            isSubscribedNotification: async function () {
                let r = await navigator.serviceWorker.getRegistration();
                let s = await r.pushManager.getSubscription();
                return !!s
            },
            testPushNotification: async function () {

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
            },
            created: async function () {
                let isSub = await this.isSubscribedNotification();
                this.isRegistered = isSub;
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