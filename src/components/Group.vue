<template>
    <v-jumbotron color="grey lighten-2">
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
              
                    <div v-if='hasGroup'>
						<h3 class="display-3">{{group && group.name ? group.name : "placeholder"}}</h3>
                        <span class="subheading">Here you can see information about your team</span>
                        <v-text-field
                                v-model="newName"
                                label="WG Name"

                        ></v-text-field>

                        <v-btn v-on:click="renameGroup">Wg Umbennen</v-btn>
                        <v-btn v-on:click="leaveGroup">Wg Verlassen</v-btn>

                        INVITE LINK {{ inviteId }}
                    </div>
					
					<div v-else>
						<h3 class="display-3">Your Team</h3>
						<span class="subheading">You are not part of any team.</span>
						</div>
						<v-btn v-on:click="createGroup">Create Group</v-btn>
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
        data: () => {
            return {newName: ''};
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
				console.log(this.$store.loadGroup);
            },
            createGroup: function () {
				console.log("create group")
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
                console.log("join group")
                Api.joinGroup(this.token, this.inviteId, (res) => {
                    this.fetchGroupData()
                }, (err) => {
                    console.error(err)
                });
            },
        },
        created: function () {
            this.fetchGroupData();
        }
    }
</script>

<style scoped>
</style>