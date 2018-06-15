<template>
        <v-container fill-height grid-list-md text-xs-center>
            <v-layout align-center>
                <v-flex align-center>
					<img src='../assets/Logo_neu_icon.png' />
                    <h3 class="display-3">Enviroomate</h3>
                    
                    <div class="display-1">
						Hallo und moin <b>{{screenName}}</b>!
					</div>
					<div>
                    <v-btn round depressed large color="primary" to="/group">
                        Team
                    </v-btn>
					</div>
					<div></div>
					<div>
                    <v-btn round depressed large color="primary" to="/current_challenge">
                        Challenge
                    </v-btn>
					</div><div>
                    <v-btn round depressed large color="primary" to="/friends">
                        Freunde
                    </v-btn>
					</div>
                </v-flex>
            </v-layout>
        </v-container>
</template>

<script>
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