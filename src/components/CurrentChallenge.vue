<template>

    <v-container v-if="currentChallenge">
        <v-container fill-height>
            <v-layout align-center>
                <v-flex text-xs-center>
                    <h3 class="display-3">{{currentChallenge.title}}</h3>
                </v-flex>
            </v-layout>
        </v-container>
        <v-card>
            <v-card-media :src="currentChallenge.imageUrl ? currentChallenge.imageUrl : '/static/default.jpg'" height="300px">
                <v-layout column class="media">

                </v-layout>
            </v-card-media>
            <v-tabs v-model="tab" grow>
                <v-tab>Beschreibung</v-tab>
                <v-tab>Pro-Tipp</v-tab>
                <v-tab>CO2</v-tab>
                <v-tab>Quellen</v-tab>
                <v-tabs-slider color="accent"></v-tabs-slider>
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <v-card>
                            <v-card-text>
                                {{currentChallenge.description}}
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card>
                            <v-card-text>
                                {{currentChallenge.tip}}
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card>
                            <v-card-text>
                                {{currentChallenge.co2_savings}}
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card>
                            <v-card-text>
                                <a :href='"http://"+currentChallenge.sources'>{{currentChallenge.sources}}</a>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-tabs>
        </v-card>
        <div v-if="!completedCurrentChallenge" class="text-xs-center">
            <v-btn depressed block round large color="primary" dark @click="completeCurrentChallenge()">Geschafft!
                <v-icon dark right>check_circle</v-icon>
            </v-btn>
        </div>
        <v-alert :value="completedCurrentChallenge" transition="slide-y-transition" type="success">
            Akutelle Challenge geschafft!
        </v-alert>
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