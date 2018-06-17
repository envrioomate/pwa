<template>


    <v-container v-if="currentChallenge">
        <v-layout>
            <v-flex>
                <v-container>
                    <v-layout align-center>
                        <v-flex text-xs-center>
                            <h3 class="display-3">{{currentChallenge.title}}</h3>
                        </v-flex>
                    </v-layout>
                </v-container>
                <ChallengeDetails :challenge="currentChallenge"></ChallengeDetails>
                <p></p>
                <ChallengeProgress v-if="group" :challenge="currentChallenge" :group="group" :completed-challenges="completedChallenges" v-on:completeChallenge="completeCurrentChallenge"></ChallengeProgress>
            </v-flex>
        </v-layout>
    </v-container>
    <v-container v-else>
        <v-layout align-center>
            <v-flex align-center>
                <img src='../assets/Logo_neu_icon.png'/>
                <h3 class="display-3">Enviroomate</h3>
            </v-flex>
        </v-layout>
        Lade...
    </v-container>

</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import Api from "../api/api";
    import currentChallenge from "../modules/currentChallenge";
    import GroupMemberListEntry from "./GroupMemberListEntry.vue";
    import ChallengeDetails from "./ChallengeDetails.vue";
    import ChallengeProgress from "./ChallengeProgress.vue";

    export default {
        name: "CurrentChallenge",
        components: {ChallengeProgress, ChallengeDetails, GroupMemberListEntry},

        computed: {
                     ...mapGetters({
                currentChallenge: 'currentChallenge',
                group: 'myGroup',
                completedChallenges: 'completedChallenges',
                token: 'token'
            })
        },
        data: () => ({
            tab: null,
            gradient: 'to top right, rgba(63,181,81, .7), rgba(25,72,32, .7)'
        }),

        methods: {
            init: function () {
                this.$store.dispatch('loadCurrentChallenge');
                this.$store.dispatch('loadCompletedChallenges');
                this.$store.dispatch('loadGroup');
                this.loadPastChallenges();

            },
            completeCurrentChallenge: function () {
                Api.completeCurrentChallenge(this.token, this.currentChallenge.id, (res) => {
                    this.$store.dispatch('loadGroup');
                    this.$store.dispatch('loadCompletedChallenges');
                }, (err) => {
                    console.error(err)
                });
            },
            ...mapActions({
                loadGroup: 'loadGroup',
                loadCurrentChallenge: 'loadCurrentChallenge',
                loadCompletedChallenges: 'loadCompletedChallenges',
                loadPastChallenges: 'loadPastChallenges'
            }),
        },
        created: function () {
            this.init();
        }
    }
</script>

<style scoped>

</style>