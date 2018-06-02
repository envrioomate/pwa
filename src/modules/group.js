import Api from '../api/api';

const state = {
    groupId : null,
    groupName : null,
    members : null,
    inviteId : null,
    score : null,
}

const getters = {
    groupId: state => state.groupId,
    groupName: state => state.groupName,
    members: state => state.members,
    inviteId: state => state.inviteId,
    score: state => state.score
}

const actions = {
    loadGroup({commit, rootState}) {
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