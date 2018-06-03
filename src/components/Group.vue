<template>
    <v-jumbotron color="grey lighten-2">
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">{{group.name ? group.name : "placeholder"}}</h3>
                    <span class="subheading">Here you can see information about your team</span>
                    <div v-if='hasGroup'>
                        <v-list two-line>
                            <template v-for="(item, index) in group.members">
                                <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
                                <v-divider v-else-if="false" :inset="false" :key="index"></v-divider>
                                <v-list-tile v-else :key="item.screenName" avatar @click="">
                                    <v-list-tile-avatar :color="colors">
                                        <span class="white--text headline">{{ item.screenName.charAt(0) }}</span>
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="item.screenName"> {{item.screenName}} Hello
                                        </v-list-tile-title>
                                        <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </v-list>
                        <v-text-field
                                v-model="newName"
                                label="WG Name"

                        ></v-text-field>

                        <v-btn v-on:click="renameGroup">Wg Umbennen</v-btn>
                        <v-btn v-on:click="leaveGroup">Wg Verlassen</v-btn>

                        INVITE LINK {{ inviteId }}
                    </div>
                    <v-btn v-else v-on:click="createGroup">Create Group</v-btn>

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
        },
        created: function () {
            this.fetchGroupData();

        }
    }
</script>

<style scoped>

</style>