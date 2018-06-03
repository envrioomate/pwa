<template>
    <v-jumbotron color="grey lighten-2">
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">Welcome to the group page</h3>
                    <div v-if="!hasGroup">
                    <span class="subheading">You are not in a Group {{token}}</span>
                    <v-btn @click="createGroup">Create Group</v-btn>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-jumbotron>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import Api from '../api/api'

    export default {
        computed: mapGetters({
            hasGroup: 'hasGroup',
            group: 'group',
            inviiteId: 'inviteId',
            token: 'token'

        }),
        actions: {
        ...mapActions([
            'loadGroup'
        ])},
        methods: {
            fetchGroupData: function () {
                this.$store.dispatch('loadGroup')
            },
            createGroup: function () {
                Api.createGroup(this.token, (res) => {
                    this.fetchGroupData()
                }, (err) => {
                    console.error(err)
                });
            }
        },
        created: function (){
            this.fetchGroupData();
        }
    }
</script>

<style scoped>

</style>