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
        let token = rootState.login.token

        Api.fetchGroupData(token, (res => {
            console.log(JSON.stringify(res))
            if (!res.data.message) {
                console.log("Group Data: " + JSON.stringify(data));
                commit('setGroup', res.data);
                commit('setHasGroup', true);
            } else {
                commit('setHasGroup', false)

            }
        }), (err => {
            console.error(err)

        }))
    }
}

const mutations = {
    setGroup (state, data) {
        state.myGroup = new Group(data.id, data.name. data.members, data.score);
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