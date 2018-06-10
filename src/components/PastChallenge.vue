<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-card-media :src="challenge.imageUrl" height="300px">
                    <v-layout column class="media" v-if="challenge.imageUrl">
                        <v-card-title >
                            <v-btn icon dark router-link to='/past_challenges'>
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-card-title class="white--text pl-5 pt-5">
                            <div class="display-1 pl-5 pt-5">{{challenge.title}}</div>
                        </v-card-title>
                    </v-layout>
                    <v-layout column class="media" v-else>

                        <v-card-title>
                            <v-btn icon router-link to='/past_challenges'>
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-card-title class="black--text pl-5 pt-5">
                            <div class="display-1 pl-5 pt-5">{{challenge.title}}</div>
                        </v-card-title>

                    </v-layout>
                </v-card-media>
                <v-expansion-panel expand depressed>
                    <v-expansion-panel-content>
                        <div slot="header">Beschreibung</div>
                        <v-card>
                            <v-card-text class="grey lighten-3">
                                {{challenge.description}}
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                        <div slot="header">Pro-Tipp</div>
                        <v-card>
                            <v-card-text class="grey lighten-3">
                                {{challenge.tip}}
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                        <div slot="header">CO2</div>
                        <v-card>
                            <v-card-text class="grey lighten-3">
                                {{challenge.co2_savings}}
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                        <div slot="header">Quellen</div>
                        <v-card>
                            <v-card-text class="grey lighten-3">
                                <a :href='"http://"+challenge.sources'>{{challenge.sources}}</a>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-alert :value="completed" transition="slide-y-transition" type="success">
                    Challenge geschafft!
                </v-alert>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "PastChallenge",
        props: ['id'],
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
                pastChallenges: 'pastChallenges'
            })
        },
        methods: {
            reloadPastChallenegs: function () {
                this.loadPastChallenges();
            },
            ...mapActions({
                loadPastChallenges: 'loadPastChallenges'
            })
        },
        data: () => ({
            gradient: 'to top right, rgba(63,181,81, .7), rgba(25,72,32, .7)'
        }),

    }
</script>

<style scoped>

</style>