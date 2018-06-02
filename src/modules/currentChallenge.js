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
        console.log(token)
    }
}

const mutations = {

}

export default {
    state,
    getters,
    actions,
    mutations
}