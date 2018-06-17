<template>
    <v-container>
        <v-layout>
            <v-flex>
                <Challenge :challenge="challenge" :title="false" :group="group" :past="true" :completedChallenges="completedChallenges"></Challenge>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    import Challenge from "./Challenge.vue";

    export default {
        name: "PastChallenge",
        props: ['id'],
        components: { Challenge},

        computed: {
            completed: function () {
                if (!this.completedChallenges
                    || !(this.completedChallenges instanceof Array)) return false;
                const i = this.completedChallenges.filter(challenge =>
                    challenge.id === Number(this.id)
                ).length;
                return i > 0;

            },
            challenge: function () {
                return this.pastChallenges.filter(challenge =>
                    challenge.id === Number(this.id)
                )[0]
            },
            ...mapGetters({
                completedChallenges: 'completedChallenges',
                pastChallenges: 'pastChallenges',
                currentChallenge: 'currentChallenge',
                group: 'myGroup',
                token: 'token'
            })
        },
        methods: {
            reloadPastChallenegs: function () {
                this.loadPastChallenges();
            },
            ...mapActions({
                loadPastChallenges: 'loadPastChallenges',
                loadGroup: 'loadGroup',
            })
        },
        data: () => ({
            gradient: 'to top right, rgba(63,181,81, .7), rgba(25,72,32, .7)'
        }),

    }
</script>

<style scoped>

</style>