import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

import login from './modules/login';
import group from './modules/group';
import friends from './modules/friends';
import currentChallenge from './modules/currentChallenge';
import completedChallenges from './modules/completedChallenges';
import pastChallenges from './modules/pastChallenges';
import profile from './modules/profile';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        login,
        profile,
        group,
        friends,
        currentChallenge,
        completedChallenges,
        pastChallenges
    },
    plugins: [createPersistedState()]

})