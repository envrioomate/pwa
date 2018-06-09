<template>
        
    <v-container v-if="currentChallenge">
		<v-layout align-center>
            <v-flex align-center>
					<img src='../assets/Logo_neu_icon.png' />
                    <h3 class="display-3">Enviroomate</h3>
			</v-flex>
		</v-layout>
        <v-jumbotron dark :gradient="gradient" v-bind:src="currentChallenge.imageUrl">
            <v-container fill-height>
                <v-layout align-center>
                    <v-flex text-xs-center>
                        <h3 class="display-3">{{currentChallenge.title}}</h3>
                    </v-flex>
                </v-layout>


            </v-container>
        </v-jumbotron>
        <v-expansion-panel expand depressed>
            <v-expansion-panel-content>
                <div slot="header">Beschreibung</div>
                <v-card>
                    <v-card-text class="grey lighten-3">
                        {{currentChallenge.description}}
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
                <div slot="header">Pro-Tipp</div>
                <v-card>
                    <v-card-text class="grey lighten-3">
                        {{currentChallenge.tip}}
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
                <div slot="header">CO2</div>
                <v-card>
                    <v-card-text class="grey lighten-3">
                        {{currentChallenge.co2_savings}}
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
                <div slot="header">Quellen</div>
                <v-card>
                    <v-card-text class="grey lighten-3">
                        <a :href='"http://"+currentChallenge.sources'>{{currentChallenge.sources}}</a>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>

        </v-expansion-panel>

        <div v-if="!completedCurrentChallenge" class="text-xs-center">
            <v-btn depressed color="primary" dark @click="completeCurrentChallenge()">Geschafft!
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
					<img src='../assets/Logo_neu_icon.png' />
                    <h3 class="display-3">Enviroomate</h3>
			</v-flex>
		</v-layout>
        Lade...
    </v-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import Api from "../api/api";
    import currentChallenge from "../modules/currentChallenge";

    export default {
        name: "CurrentChallenge",
        computed: {
            completedCurrentChallenge: function () {
                if(!this.$store.state.pastChallenges.challenges
                || !(this.$store.state.pastChallenges.challenges instanceof Array ) )return false;
                const i = this.$store.state.pastChallenges.challenges.filter(challenge =>
                    challenge.id === this.currentChallenge.id
                ).length;
                return i > 0;
            },
            ...mapGetters({
                currentChallenge: 'currentChallenge',
                group: 'group',
                pastChallenges: 'pastChallenges',
                token: 'token'
            })
        },
        data: () => ({
            gradient: 'to top right, rgba(63,181,81, .7), rgba(25,72,32, .7)'
        }),
        actions: mapActions({
            loadGroup: 'loadGroup',
            loadCurrentChallenge: 'loadCurrentChallenge',
            loadPastChallenges: 'loadChallenges'
        }),

        methods: {
            init: function () {
                this.$store.dispatch('loadCurrentChallenge');
                this.$store.dispatch('loadChallenges');
                this.$store.dispatch('loadGroup');

            },
            completeCurrentChallenge: function () {
                Api.completeCurrentChallenge(this.token, this.currentChallenge.id, (res) => {
                    this.$store.dispatch('loadGroup');
                    this.$store.dispatch('loadChallenges');
                }, (err) => {
                    console.error(err)
                });
            },
        },
        created: function () {
            this.init();
        }
    }
</script>

<style scoped>

</style>