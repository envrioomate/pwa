<template>
    <v-container fill-height grid-list-md text-xs-center>
            <v-layout align-center>
                <v-flex align-center>
				<img src='../assets/Logo_neu_icon.png' />
                <h3 class="display-3">Enviroommate</h3>
                
                    <span class="subheading">Hier kannst du ein neues Team erstellen oder dich einem bereits bestehendem Team über deren Einladungs-Adresse anmelden. Du wirst aus dem Team entfernt in dem du dich derzeitig befindest.</span>
                    <v-text-field
                            v-model="joinId"
                            label="Einladungs-Adresse"

                    ></v-text-field>

                    <v-btn v-on:click="joinGroup()" depressed color="info">Team beitreten</v-btn>

                    <v-btn v-on:click="createGroup()" depressed color="info">Team Erstellen</v-btn>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import Api from '../api/api'

    export default {
        data: () => {
            return {
                newName: '',
                joinId: '',
            };
        },
        computed: {
            avatars: function () {
                return group.members.map((member) => member.screenName.charAt(0))
            },
            colors: function () {
                var colors = [
                    'red', 'pink', 'purple', 'blue', 'cyan', 'teal', 'yellow', 'red'

                ];
                var randomNumber = Math.floor(Math.random() * colors.length);
                return colors[randomNumber];
            },
            ...mapGetters({
                hasGroup: 'hasGroup',
                group: 'myGroup',
                inviteId: 'inviteId',
                token: 'token'

            })
        },
        actions: {
            ...mapActions([
                'loadGroup'
            ])
        },
        methods: {
            fetchGroupData: function () {
                this.$store.dispatch('loadGroup')
            },
            createGroup: function () {
                Api.createGroup(this.token, (res) => {
                    this.fetchGroupData();
					this.$router.push({name: 'group_edit'})
                }, (err) => {
                    console.error(err)
                });
            },
            renameGroup: function () {
                console.log("Rename to" + this.newName)
                Api.renameGroup(this.token, this.newName, (res) => {
                    this.fetchGroupData()
                }, (err) => {
                    console.error(err)
                });
            },
            leaveGroup: function () {
                console.log("leave group")
                Api.leaveGroup(this.token, (res) => {
                    this.fetchGroupData()
                }, (err) => {
                    console.error(err)
                });
            },
            joinGroup: function () {
                console.log("attepmt to join " + this.joinId)
                Api.joinGroup(this.token, this.joinId, (res) => {
                    this.fetchGroupData();
					this.$router.push({name: 'group_edit'})
                }, (err) => {
                    console.error(err)
                });

            }
        },
        created: function () {
            this.fetchGroupData();

        }
    }
</script>

<style scoped>

</style>