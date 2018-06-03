<template>
    <v-jumbotron color="grey lighten-2">
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">Wilkommen bei Einviroomate</h3>
                    <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>
                    <v-divider class="my-3"></v-divider>
                    <v-btn color="info" to="/login">Login</v-btn>
                    <v-btn color="info" to="/register">Register</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-jumbotron>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        methods: {
            fetchUserData: function () {
                if(this.$store.state.login.token) {
                    this.$router.push({name: 'loggedin'})
                }
            }
        },
        created: function () {
            this.fetchUserData();
        }

    }
</script>

<style scoped>

</style>