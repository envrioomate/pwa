<template>
    <v-flex xs12>
        <v-container
                fluid
                style="min-height: 0;"
                grid-list-lg
        >
            <v-card :color="completed ? 'success' : 'white'" :class="completed ? 'white--text' : ''"
                    :to=" to ? to : '/past_challenges/' + challenge.id">
                <v-container fluid grid-list-lg>
                    <v-layout row>
                        <v-flex xs7>
                            <div>
                                <div class="headline">{{challenge.title}}</div>
                                <div>{{challenge.description.length > 100 ? challenge.description.slice(0,100) + "..." :
                                    challenge.description}}
                                </div>
                            </div>
                            <v-chip outline label disabled :color="completed ? 'white' : 'black'">{{startDate}} bis {{endDate}}</v-chip>
                            <template v-if="scoreData">
                                <v-progress-linear
                                        :size="100"
                                        :width="15"
                                        :rotate="-90"
                                        :value="100 * scoreData.score / scoreData.maxScore"
                                        :color="scoreData.score === scoreData.maxScore ? 'success' : 'info'"
                                >
                                </v-progress-linear>
                                {{ scoreData.score.toFixed(0) + '/' + scoreData.maxScore}} Punkten
                            </template>
                        </v-flex>
                            <v-flex xs5>
                                <v-card-media
                                        :src="imageUrl"
                                        height="100%"
                                        contain
                                ></v-card-media>


                            </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-container>
    </v-flex>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import ChallengeTime from "./ChallengeTime.vue";

    export default {
        name: "PastChallengeCard",
        components: {ChallengeTime},
        props: [
            "challenge", "to", "scoreData"
        ],
        computed: {
            currentDate: function () {
                let date = new Date(Date.now());
                return this.formatDateDisplayString(date);
            },
            endDate: function () {
                return this.formatDateDisplayString(new Date(this.challenge.endDate))
            },
            startDate: function () {
                return this.formatDateDisplayString(new Date(this.challenge.startDate))

            },
            completed: function () {
                if (!this.completedChallenges
                    || !(this.completedChallenges instanceof Array)) return false;
                const i = this.completedChallenges.filter(challenge =>
                    challenge.id === this.challenge.id
                ).length;
                return i > 0;
            },
            challengeProgress: function () {
                let now = new Date(Date.now());
                let end = new Date(this.challenge.endDate);
                let start = new Date(this.challenge.startDate);
                let overall = end - start;
                let progression = now - start;
                return 100 * progression / overall
            },
            progressColor: function () {
                let color = 'primary';
                if (this.challengeProgress > 80) color = 'warning';
                if (this.challengeProgress > 90) color = 'error';
                if (this.challengeProgress > 100) color = 'info';
                return color;
            },
            imageUrl: function() {
                if (this.challenge.imageUrl) {
                    if(this.challenge.imageUrl.substring(0,4) === "http") {
                        return this.challenge.imageUrl;
                    } else {
                        let escapedTitle = this.challenge.title.replace(" ", "_") + '.jpg';
                        console.log(escapedTitle);
                        return '/images/' + escapedTitle
                    }
                } else {
                    return '/static/default.jpg'
                }
            },

            ...mapGetters({
                completedChallenges: 'completedChallenges'
            })
        },
        methods: {
            formatDateDisplayString: function (date) {
                let mon = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Sep", "Oct", "Nov", "Dez"][date.getMonth()]

                return mon + " - " + date.getDate()
            }
        }


    }
</script>

<style scoped>

</style>