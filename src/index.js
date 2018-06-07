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
import Group_edit from './components/Group_edit.vue'
import Group_create from './components/Group_create.vue'
import Group_show from './components/Group_show.vue'
import Settings from './components/Settings.vue'
import CurrentChallenge from './components/CurrentChallenge.vue'
import Friends from './components/Friends.vue'
import '../node_modules/vue-awesome/icons'
import img from './assets/Logo_neu_icon.png'

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
            path: '/group/create',
            name: "group_create",
            component: Group_create
        },
		{
            path: '/group/edit',
            name: "group_edit",
            component: Group_edit
        },
		{
            path: '/group/show',
            name: "group_show",
            component: Group_show
        },
        {
            path: '/friends',
            name: "friends",
            component: Friends
        },
        {
            path: '/current_challenge',
            name: "currentChallenge",
            component: CurrentChallenge
        },
        {
            path: '/settings',
            name: "settings",
            component: Settings
        }
    ]
});

Vue.use(Vuex); // @see https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart

Vue.use(Vuetify, {
    theme: {
        primary: "#9bba1e",
        secondary: "#e2ebbe",
        accent: "#cccccc",
        error: "#f44336",
        warning: "#ffeb3b",
        info: "#999",
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
