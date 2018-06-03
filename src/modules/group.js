import Api from '../api/api';
import {Group} from '../api/Group'

const state = {
    hasGroup: null,  //the good ol' tri-state boolean
    myGroup: null,
    inviteId: null
}

const getters = {
    myGroup: state => state.myGroup,
    inviteId: state => state.inviteId,
    hasGroup: state => state.hasGroup
}

const actions = {
    loadGroup({commit, rootState}) {
        let token = rootState.login.token;

        Api.fetchGroupData(token, function(res) {
            console.log(JSON.stringify(res.data));
            if (res.data.id) {
                commit('setGroup', res.data);
                commit('setHasGroup', true);
            } else {
                commit('setHasGroup', false)

            }
        }, function(err) {
            console.error(err)

        });
    }
}

const mutations = {
    setGroup (state, data) {
        console.log(data);
        state.myGroup = new Group(data);
        state.inviteId = data.inviteId;
    },
    setHasGroup (state, hasGroup) {
        state.hasGroup = hasGroup
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}