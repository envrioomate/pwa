import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

import login from './modules/login';
import group from './modules/group';
import currentChallenge from './modules/currentChallenge';
import pastChallenges from './modules/pastChallenges';
import profile from './modules/profile';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        login,
        profile,
        group,
        currentChallenge,
        pastChallenges
    },
    plugins: [createPersistedState()]

})