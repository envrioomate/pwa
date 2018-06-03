import Api from '../api/api';
import Challenge from '../api/challenge'

const state = {
    challenges : null
}

const getters = {
    pastChallenges: state => state.challenges
}

const actions = {
    loadChallenges({commit, rootState}) {
        let token = rootState.login.token
        Api.fetchCompletedChallenges(token, function(res) {
            console.log(JSON.stringify(res.data));
            if (res.data) {
                commit('setChallenges', res.data);
            } else {
                console.error("no past challenges data recieved: " +  res.data);
            }
        }, function(err) {
            console.error(err)

        });
    }
}

const mutations = {
    setChallenges(state, data) {
        state.challenges = data // this is only a great idea if you're in a rush
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}