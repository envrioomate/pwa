import './styles.scss';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import '../node_modules/vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Login from './components/Login.vue'
import LoggedIn from './components/LoggedIn.vue'
import Landing from './components/Landing.vue'
import Register from './components/Register.vue'
import store from './store'
import Group from './components/Group.vue'
import Settings from './components/Settings.vue'
import Challenges from './components/Challenges.vue'
import CurrentChallenge from './components/CurrentChallenge.vue'
import Friends from './components/Friends.vue'
import '../node_modules/vue-awesome/icons'

Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'loggedin',
            component: LoggedIn
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/',
            name: "Index",
            component: Landing
        },
        {
            path: '/group',
            name: "group",
            component: Group
        },
        {
            path: '/current_challenge',
            name: "currentChallenge",
            component: CurrentChallenge
        },
        {
            path: '/challenges',
            name: "challenges",
            component: Challenges
        },
        {
            path: '/settings',
            name: "settings",
            component: Settings
        },
        {
            path: '/friends',
            name: "friends",
            component: Friends
        }
    ]
});

Vue.use(Vuex); // @see https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart

Vue.use(Vuetify, {
    theme: {
        primary: "#388e3c",
        secondary: "#1e88e5",
        accent: "#00600f",
        error: "#f44336",
        warning: "#ffeb3b",
        info: "#2196f3",
        success: "#4caf50"
    }
})

const app = new Vue({
    el: '#app',
    template: '<App/>',
    components: {App},
    router,
    store
})


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            registration.pushManager.subscribe({userVisibleOnly: true});
            console.log("SW registered: ", registration);
        }).catch(registrationError => {
            console.log("SW Registration failed! ", registrationError);
        });
    });
}
