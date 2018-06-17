<template>
    <v-card> <!-- challenge progress -->
        <v-container fluid grid-list-lg>
            <v-layout row>
                <v-flex xs12>
                    <div class="headline">Fortschritt</div>
                    <div class="text-xs-center">
                        <v-progress-circular
                                :size="100"
                                :width="15"
                                :rotate="-90"
                                :value="challengeProgress"
                                :color="completedCurrentChallenge ? 'success' : 'info'"
                        >
                            {{ (challengeProgress * challenge.score / 100).toFixed(0) + '/' +
                            challenge.score.toFixed(0)}}
                        </v-progress-circular>
                    </div>
                    <div v-if="!completedCurrentChallenge" class="text-xs-center">
                        <template v-for="(member, index) in group.members">
                            <GroupMemberListEntry :member="member"
                                                  :showChallengeState="true"></GroupMemberListEntry>
                            <v-divider v-if="index + 1 < group.members.length" :key="index"></v-divider>
                        </template>
                        <v-btn ripple block round large color="primary" dark @click.native="$emit('completeChallenge')">
                            Geschafft!
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                    </div>
                    <v-alert :value="completedCurrentChallenge" transition="slide-y-transition" type="success">
                        Akutelle Challenge geschafft!
                    </v-alert>

                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    import GroupMemberListEntry from "./GroupMemberListEntry.vue";

    export default {

        name: "ChallengeProgress",
        props: ["challenge", "title", "group", "completedChallenges"],
        components: {GroupMemberListEntry},
        computed: {
            completedCurrentChallenge: function () {
                if (!this.completedChallenges
                    || !(this.completedChallenges instanceof Array)) return false;
                const i = this.completedChallenges.filter(challenge =>
                    challenge.id === this.challenge.id
                ).length;
                return i > 0;
            },
            challengeProgress: function () {
                let progress = 0;
                this.group.members.forEach(m => {
                    console.log("current challenge id " + this.challenge.id)
                    m.completedChallenges.forEach(c => {
                        console.log("completed challenge id " + c.id + " by" + m.id);
                    })
                    if (m.completedChallenges.some(c => c.id === this.challenge.id)) {
                        console.log("ping")
                        progress += 100 / this.group.members.length;
                    }
                })
                return progress;
            },
        }
    }
</script>

<style scoped>

</style>