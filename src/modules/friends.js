import Api from '../api/api';
import {Group} from '../api/Group'

const state = {
    friends: null
}

const getters = {
    friends: state => state.friends,

}

const actions = {
    loadFriends({commit, rootState}) {
        let token = rootState.login.token;

        Api.fetchFollowedGroups(token, function(res) {
            console.log(JSON.stringify(res.data));
            if (res.data) {
                commit('setFriends', res.data);
            } else {

            }
        }, function(err) {
            console.error(err)

        });
    }
}

const mutations = {
    setFriends (state, data) {
        state.friends = data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}