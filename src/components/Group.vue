<template>
    <v-container fill-height grid-list-md text-xs-center>
        <v-layout align-center>
            <v-flex align-center>
                    <h3 class="display-3">Enviroomate</h3>
					<div>
                    <v-btn round depressed large color="primary" to="/group/show">
                        Mein Team
                    </v-btn>
					</div><div>
                    <v-btn round depressed large color="primary" to="/group/edit">
                        Team bearbeiten
                    </v-btn>
					</div><div>
                    <v-btn round depressed large color="primary" to="/group/create">
                        Team erstellen
                    </v-btn>
					</div>
                </v-flex>
            </v-layout>
        </v-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import Api from '../api/api'

    export default {
        computed: {
            ...mapGetters({
                hasGroup: 'hasGroup',
                group: 'myGroup',
                inviteId: 'inviteId',
                token: 'token'

            })
        },
    }
</script>

<style scoped>

</style>