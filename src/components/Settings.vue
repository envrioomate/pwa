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
                        v-on:change="toggleSubscription"
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
                        console.log("registered push notification endpoint")
                        this.isRegistered = true;
                        registration.pushManager.getSubscription().then(s => {
                            Api.registerPushNotifications(s, (res) => {

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
                            s.unsubscribe().then(()=> {
                                this.isRegistered = false;
                                console.log("SW unsubscribed: ", registration);
                            }).catch((err) => console.error(err));

                        });
                    }).catch(registrationError => {
                        console.log("SW Registration failed! ", registrationError);
                    });
                }
            },
            isSubscribedNotification: async function () {
                let r = await navigator.serviceWorker.getRegistration();
                let s = await r.pushManager.getSubscription();
                console.log(r);
                console.log(s ? s : "no s")
                return !!r
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
            toggleSubscription: async function (bool) {
                console.log(bool)
                if(bool) {
                    this.subscribeNotifications();
                } else {
                    this.unsubscribeNotifications();
                }
            }
        },
        created: async function () {
            this.isRegistered = await this.isSubscribedNotification();
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