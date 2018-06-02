import Api from '../api/api';

const state = {
    id: null,
    userName: null,
    screenName: null,
    dateCreated: null,
    emailConfirmed: null,
    isBanned: null,
    group: null,
}

const getters = {
    id: state => state.id,
    userName: state => state.userName,
    screenName: state => state.screenName,
    dateCreated: state => state.dateCreated,
    emailConfirmed: state => state.emailConfirmed,
    isBanned: state => state.isBanned,
    group: state => state.group
}

const actions = {
    loadProfile({commit, rootState}) {
        let token = rootState.login.token
        console.log(token)
        Api.fetchUserData(token, (res => {
            commit('setProfile', res.data)
        }), (err => {

        }))
    }
}

const mutations = {
    setProfile (state, data) {
     state.id = data.id;
     state.userName = data.userName;
     state.screenName = data.screenName;
     state.dateCreated = data.dateCreated;
     state.emailConfirmed = data.emailConfirmed;
     state.isBanned = data.isBanned;
     state.group = data.group;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}