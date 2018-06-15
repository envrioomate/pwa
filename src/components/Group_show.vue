<template>
    <v-container fill-height grid-list-md text-xs-center>
        <v-layout align-center>
            <v-flex align-center>
				<img src='../assets/Logo_neu_icon.png' />
                <h3 class="display-3">Enviroommate</h3>
				<h3 class="display-2">Team: {{group ? group.name : "placeholder"}}</h3>
                <div v-if='hasGroup'>
                    <v-list two-line>

                        <template v-for="(member) in group.members">
                            <GroupMemberListEntry :member="member"></GroupMemberListEntry>
                        </template>
                    </v-list>
                    Einladungs-Adresse: {{ inviteId }}
					<h3 class="display-2">Score: {{group ? group.score : "placeholder"}}</h3>
                </div>
                <div v-else>
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
    import GroupMemberListEntry from "./GroupMemberListEntry.vue";

    export default {
        components: {GroupMemberListEntry},
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
                    this.fetchGroupData()
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
                    this.fetchGroupData()
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