<template>
    <v-card>
        <v-card-title><div class="headline">Zeit</div></v-card-title>
        <v-container>
            <v-layout>
            </v-layout>
            <v-layout row>
                <v-flex xs2 class="text-xs-left">
                    <v-chip outline label disabled>{{startDate}}</v-chip>
                </v-flex>
                <v-flex align-center xs8>
                    <v-progress-linear class="my-2" v-model="challengeProgress" height="27" :color="challengeProgress > 80 ? 'warning' : 'error'"></v-progress-linear>
                </v-flex>
                <v-flex xs2 class="text-xs-right">
                    <v-chip outline label disabled>{{endDate}}</v-chip>
                </v-flex>
            </v-layout>

        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "ChallengeTime",
        props: ["challenge"],
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