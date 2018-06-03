import Api from '../api/api';
import Challenge from '../api/challenge'

const state = {
    challenge : null
}

const getters = {
    challenge: state => state.challenge
}

const actions = {
    loadChallenge({commit, rootState}) {
        let token = rootState.login.token(rootState)
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
        state.challenge = new Challenge(challengeData)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}