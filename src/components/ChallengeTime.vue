<template>
    <v-card>
        <v-card-title><div class="headline">{{headerText ? headerText : 'Zeit'}}</div></v-card-title>
        <v-container fluid grid-list-xs>
            <v-layout row wrap>
                <v-flex xs4 sm2 class="text-xs-left">
                    <v-chip outline label disabled color="black">{{startDate}}</v-chip>
                </v-flex>
                <v-flex align-center xs4 sm8>
                    <v-progress-linear class="my-2" v-model="challengeProgress" height="27" :color="progressColor"></v-progress-linear>
                </v-flex>
                <v-flex xs4 sm2  class="text-xs-right">
                    <v-chip outline label disabled color="black">{{endDate}}</v-chip>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "ChallengeTime",
        props: ["challenge", "headerText"],
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
            }
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