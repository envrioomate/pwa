//import './styles/styles.scss';
import './styles/main.styl';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import About from './components/About.vue'
import Login from './components/Login.vue'
import LoggedIn from './components/LoggedIn.vue'
import Legal from './components/Legal.vue'
import Landing from './components/Landing.vue'
import Register from './components/Register.vue'
import ResetPassword from './components/ResetPassword.vue'
import store from './store'
import Group from './components/Group.vue'
import Group_edit from './components/Group_edit.vue'
import Group_create from './components/Group_create.vue'
import Group_show from './components/Group_show.vue'
import Settings from './components/Settings.vue'
import CurrentChallenge from './components/CurrentChallenge.vue'
import PastChallenges from './components/PastChallenges.vue'
import PastChallenge from './components/PastChallenge.vue'
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
            path: '/past_challenges',
            name: "pastChallenges",
            component: PastChallenges
        },
        {
            path: '/past_challenges/:id',
            component: PastChallenge,
            props: true
        },
        {
            path: '/settings',
            name: "settings",
            component: Settings
        },
        {
            path: '/legal',
            name: "legal",
            component: Legal
        },
        {
            path: '/contact',
            name: "contact",
            component: About
        },
        {
            path: '/resetPassword',
            name: "resetPassword",
            component: ResetPassword
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


