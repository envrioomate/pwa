import Api from '../api/api';
import {Challenge} from '../api/challenge'

const state = {
    challenge : null
}

const getters = {
    challenge: state => state.challenge
}

const actions = {
    loadCurrentChallenge({commit, rootState}) {
        let token = rootState.login.token
        Api.fetchCurrentChallenge(token, function(res) {
            console.log(JSON.stringify(res.data));
            if (res.data.title) {
                commit('setChallenge', res.data);
            } else {
                console.error("no challenge data recieved: " +  res.data);
            }
        }, function(err) {
            console.error(err)

        });
    }
}

const mutations = {
    setChallenge(state, challengeData) {
        console.log("setting challenge with json: " + JSON.stringify(challengeData))
        state.challenge = new Challenge(challengeData)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}