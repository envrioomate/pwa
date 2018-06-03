import Api from '../api/api';
import Challenge from '../api/challenge'

const state = {
    challenges : null
}

const getters = {
    challenges: state => state.challenge
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