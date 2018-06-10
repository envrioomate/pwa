<template>
    <div
            id="e3"
            style="margin: auto;"
    >
        <v-container>
            <v-flex xs12>
                <h3>Aktuelle Challenge</h3>

                <past-challenge-card :challenge="currentChallenge" :to="'/current_challenge'">
                </past-challenge-card>
                <h3>Vergangene Challenges</h3>
                <v-layout row wrap v-for="(item, index) in pastChallenges" :key="item.id">

                    <past-challenge-card :challenge="item">
                    </past-challenge-card>
                </v-layout>
            </v-flex>
        </v-container>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import currentChallenge from "../modules/currentChallenge";
    import PastChallengeCard from "./PastChallengeCard.vue"

    export default {
        name: "CurrentChallenge",
        computed: {
            completedCurrentChallenge: function () {
                if (!this.completedChallenges
                    || !(this.completedChallenges instanceof Array)) return false;
                const i = this.completedChallenges.filter(challenge =>
                    challenge.id === this.currentChallenge.id
                ).length;
                return i > 0;
            },
            ...mapGetters({
                currentChallenge: 'currentChallenge',
                group: 'group',
                completedChallenges: 'completedChallenges',
                pastChallenges: 'pastChallenges',
                token: 'token'
            })
        },
        data: () => ({
            gradient: 'to top right, rgba(63,181,81, .7), rgba(25,72,32, .7)'
        }),

        methods: {
            init: function () {
                this.loadCurrentChallenge();
                this.loadCompletedChallenges();
                this.loadGroup();
                this.loadPastChallenges();

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
        },
        components: {
            PastChallengeCard
        }
    }
</script>

<style scoped>

</style>