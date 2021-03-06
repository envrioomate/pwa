import Api from '../api/api';
import Challenge from '../api/challenge'

const state = {
    pastChallenges : null
}

const getters = {
    pastChallenges: state => state.pastChallenges
}

const actions = {
    loadPastChallenges({commit, rootState}) {
        let token = rootState.login.token
        Api.fetchPastChallenges(token, function(res) {
            console.log(JSON.stringify(res.data));
            if (!res.data.message) {
                commit('setPastChallenges', res.data);
            } else {
                console.error("no past challenges data recieved: " +  res.data);
            }
        }, function(err) {
            console.error(err)

        });
    }
}

const mutations = {
    setPastChallenges(state, data) {
        state.pastChallenges = data // this is only a great idea if you're in a rush
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}