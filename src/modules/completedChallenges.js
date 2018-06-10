import Api from '../api/api';
import Challenge from '../api/challenge'

const state = {
    completedChallenges : null
}

const getters = {
    completedChallenges: state => state.completedChallenges
}

const actions = {
    loadCompletedChallenges({commit, rootState}) {
        let token = rootState.login.token
        Api.fetchCompletedChallenges(token, function(res) {
            console.log(JSON.stringify(res.data));
            if (!res.data.message) {
                commit('setCompletedChallenges', res.data);
            } else {
                console.error("no past challenges data recieved: " +  res.data);
            }
        }, function(err) {
            console.error(err)

        });
    }
}

const mutations = {
    setCompletedChallenges(state, data) {
        state.completedChallenges = data // this is only a great idea if you're in a rush
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}