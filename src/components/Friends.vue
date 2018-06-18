<template>
    <v-container fluid>
        <v-flex xs12 sm12>
            <v-list subheader two-line>
                <v-subheader inset>Freunde</v-subheader>
                <template v-for="(friend, index) in friends">
                    <FriendListEntry :group="friend" v-on:removeGroup="removeGroup"
                                     v-on:viewGroup="viewGroup"></FriendListEntry>
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

        <v-dialog
                v-model="viewDialog"
                fullscreen
                transition="dialog-bottom-transition"
        >
            <v-card row wrap>
                <v-toolbar color="primary">
                    <v-btn icon dark @click="unviewGroup">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>

                    <v-toolbar-title>Detailierte Punkte</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-menu offset-y>
                        <v-btn icon slot="activator">
                            <v-icon>more_vert</v-icon>
                        </v-btn>
                        <v-list>
                            <v-list-tile-title @click="removeGroup">Befreundete WG entfernen</v-list-tile-title>
                        </v-list>
                    </v-menu>
                </v-toolbar>
                <v-card-text>
                    <v-layout row wrap v-for="(item, index) in viewScoreData" :key="item.id">

                        <past-challenge-card :challenge="item.challenge" :scoreData="item.scoreData">
                        </past-challenge-card>
                    </v-layout>
                </v-card-text>

            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import Api from "../api/api";
    import {mapActions, mapGetters} from 'vuex';
    import FriendListEntry from './FriendListEntry.vue';
    import PastChallengeCard from './PastChallengeCard.vue';

    export default {
        name: "Friends",
        components: {FriendListEntry, PastChallengeCard},
        data() {
            return {
                loading: false,
                items: [],
                search: null,
                select: [],
                groups: [],
                addDialog: false,
                viewDialog: false,
                viewScoreData: null,
                viewedGroup: null
            }
        },
        watch: {
            search(val) {
                val && this.querySelections(val)
            },
        },
        computed: {
            viewScoreEntries: function () {

            },
            ...mapGetters({
                token: 'token',
                friends: 'friends',
                pastChallenges: 'pastChallenges',
                currentChallenge: 'currentChallenge'
            }),
        },
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
            removeGroup() {
                Api.unfollowGroup(this.token, this.viewedGroup.id, (res) => {
                    this.$store.dispatch('loadFriends');
                    this.unviewGroup();
                }, (err) => console.error(err))

            },
            viewGroup(group) {
                let that = this;
                Api.viewGroup(this.token, group.id, (res) => {

                    this.viewScoreData = res.data.getScoreHistory.map(scoreData => {
                        let matches = this.pastChallenges.filter(c => c.id === scoreData.cId);
                        console.log(JSON.stringify(matches))
                        return {
                            challenge: matches.length > 0 ? matches[0] : this.currentChallenge,
                            scoreData: scoreData
                        }
                    });

                    this.viewDialog = true;
                    this.viewedGroup = group;

                }, (err) => console.error(err))
            },
            unviewGroup: function() {

                this.viewDialog = false;
                this.viewedGroup = null;
            },

            ...mapActions({
                loadFriends: 'loadFriends',
                loadPastChallenges: 'loadPastChallenges'
            })
        },
        created: function () {
            this.$store.dispatch('loadFriends');
            if (!this.pastChallenges) {
                this.loadPastChallenges();
            }

        }
    }
</script>

<style scoped>

</style>