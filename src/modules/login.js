import Api from '../api/api';

const state = {
    userId: null,
    token: null,
    loginStatus: "waiting",
}

const getters = {
    token: state => state.token,
    userId: state => state.userId,
    loginStatus: state => state.loginStatus
}

const actions = {
    login({commit}, {email, password}) {
        console.log("action login with " + email + " " + password )

        Api.login(email, password, (res => {
            commit('setUserId',res.data.id)
            commit('setToken',res.data.token)
            commit('setLoginStatus', "success")
        }), (err => {
            commit('setLoginStatus', "failed")

        }))
    }
}

const mutations = {
    setUserId (state, id) {
        state.userId = id;
    },
    setToken (state, token) {
        state.token = token;
    },
    setLoginStatus (state, status) {
        state.loginStatus = status;
    },
    logout (state) {
        state.userId = null;
        state.token = null;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}