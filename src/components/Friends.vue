<template>
    <v-container fluid>
        <v-flex xs12 sm12>
            <v-list subheader two-line>
                <v-subheader inset>Freunde</v-subheader>
                <template v-for="(friend, index) in friends" >
                    <FriendListEntry :group="friend" v-on:removeGroup="removeGroup" v-on:viewGroup="viewGroup"></FriendListEntry>
                    <v-divider v-if="index + 1 < friends.length" :key="index"></v-divider>
                </template>
            </v-list>
        </v-flex>

        <v-btn
                color="primary"
                fab
                fixed
                bottom
                right
                @click.native="addDialog = true">
            <v-icon>group_add</v-icon>
        </v-btn>

        <v-dialog
                v-model="addDialog"
                transition="dialog-bottom-transition"
                scrollable
        >
            <v-card row wrap>
                <v-toolbar color="primary">
                    <v-btn icon dark @click.native="addDialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>

                    <v-toolbar-title> Finde andere WGs</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-select
                            :loading="loading"
                            :items="items"
                            :rules="[() => select.length > 0 || 'You must choose at least one']"
                            :search-input.sync="search"
                            v-model="select"
                            label="Team Name"
                            autocomplete
                            cache-items
                            chips
                            required
                    ></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn depressed @click="addGroups" :disabled="select.length === 0 ">Hinzuügen</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import Api from "../api/api";
    import {mapActions, mapGetters} from 'vuex'
    import FriendListEntry from './FriendListEntry.vue'

    export default {
        name: "Friends",
        components: {FriendListEntry},
        computed: mapGetters({
            token: 'token',
            friends: 'friends'
        }),
        data() {
            return {
                loading: false,
                items: [],
                search: null,
                select: [],
                groups: [],
                addDialog: false
            }
        },
        watch: {
            search(val) {
                val && this.querySelections(val)
            }
        },
        actions: mapActions({
            loadFriends: 'loadFriends'
        }),
        methods: {
            querySelections(v) {
                this.loading = true
                Api.searchGroup(this.token, v, (res) => {
                    this.groups = res.data;
                    this.items = this.groups.map((g) => g.name)
                    this.loading = false
                }, (err) => {
                });
            },
            addGroups() {
                if (this.select) {
                    this.addDialog = false;
                    this.items.forEach((name, index) => {
                        if (name === this.select) {
                            Api.followGroup(this.token, this.groups[index].id, (res) => {
                                this.$store.dispatch('loadFriends');
                            }, (err) => console.error(err))
                        }
                    })
                    this.items = [];
                    this.select = [];
                }
            },
            removeGroup(group) {
                Api.unfollowGroup(this.token, group.id, (res) => {
                    this.$store.dispatch('loadFriends');
                }, (err) => console.error(err))

            },
            viewGroup(group) {

            }
        },
        created: function () {
            this.$store.dispatch('loadFriends');

        }
    }
</script>

<style scoped>

</style>