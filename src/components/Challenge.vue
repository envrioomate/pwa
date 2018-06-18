<template>
    <v-container v-if="challenge" class="px-0">
        <v-layout xs12 >
            <v-flex>
                <v-container v-if="title">
                    <v-layout align-center>
                        <v-flex text-xs-center>
                            <h3 class="display-3">{{challenge.title}}</h3>
                        </v-flex>
                    </v-layout>
                </v-container>
                <ChallengeDetails :challenge="challenge" :title="!title"></ChallengeDetails>
                <p></p>
                <ChallengeTime :challenge="challenge"></ChallengeTime>
                <p></p>
                <ChallengeProgress v-if="group" :challenge="challenge" :group="group"
                                   :completed-challenges="completedChallenges"
                                   v-on:completeChallenge="completeCurrentChallenge" :past="past"></ChallengeProgress>
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
    import GroupMemberListEntry from "./GroupMemberListEntry.vue";
    import ChallengeDetails from "./ChallengeDetails.vue";
    import ChallengeProgress from "./ChallengeProgress.vue";
    import ChallengeTime from "./ChallengeTime.vue";

    export default {
        name: "Challenge",
        components: {ChallengeTime, ChallengeProgress, ChallengeDetails, GroupMemberListEntry},
        props: ["challenge", "title", "group", "completedChallenges", "past"],
        computed: {


        },
        data: () => ({
            tab: null,
        }),

        methods: {
            completeCurrentChallenge: function () {
                this.$emit('completeChallenge')
            },

        },
    }
</script>

<style scoped>

</style>