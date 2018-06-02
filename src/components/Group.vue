<template>
    <v-jumbotron color="grey lighten-2">
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">Welcome to the group page</h3>
                    <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>
                </v-flex>
            </v-layout>
        </v-container>
    </v-jumbotron>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        computed: mapGetters({
            hasGroup: 'hasGroup',
            group: 'group',
            inviiteId: 'inviteId'
        }),
        actions: {
        ...mapActions([
            'loadGroup'
        ])},
        methods: {
            fetchUserData: function () {
                this.$store.dispatch('loadGroup')
            }
        },
        created: function (){
            this.fetchUserData();
        }
    }
</script>

<style scoped>

</style>