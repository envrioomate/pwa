<template>
    <v-jumbotron color="grey lighten-2">
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">Welcome {{screenName}}</h3>
                    <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>
                    <v-divider class="my-3"></v-divider>
                    <router-link to="/">Logout</router-link>
                </v-flex>
            </v-layout>
        </v-container>
    </v-jumbotron>
</template>

<script>
    import axios from 'axios'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        computed: mapGetters({
            id : 'id',
            userName : 'userName',
            screenName : 'screenName',
            dateCreated : 'dateCreated',
            emailConfirmed : 'emailConfirmed',
            isBanned : 'isBanned',
            group : 'group'
        }),
        methods: {
            fetchUserData: function () {
                this.$store.dispatch('loadProfile')
            }
        },
        created: function (){
            this.fetchUserData();
        }
    }
</script>

<style scoped>

</style>