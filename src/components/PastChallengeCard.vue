<template>
    <v-flex xs12>
        <v-container
                fluid
                style="min-height: 0;"
                grid-list-lg
        >
        <v-card :color="completed ? 'success' : 'grey'" class="white--text" :to=" to ? to : '/past_challenges/' + challenge.id">
            <v-container fluid grid-list-lg>
                <v-layout row>
                    <v-flex xs7>
                        <div>
                            <div class="headline">{{challenge.title}}</div>
                            <div>{{challenge.description.length > 100 ? challenge.description.slice(0,100) + "..." :
                                challenge.description}}
                            </div>
                        </div>
                    </v-flex>
                    <v-flex xs5>
                        <v-card-media
                                :src="challenge.imageUrl"
                                height="125px"
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

    export default {
        name: "PastChallengeCard",
        props: [
            "challenge", "to"
        ],
        computed: {
            completed: function () {
                if (!this.completedChallenges
                    || !(this.completedChallenges instanceof Array)) return false;
                const i = this.completedChallenges.filter(challenge =>
                    challenge.id === this.challenge.id
                ).length;
                return i > 0;
            },
            ...mapGetters({
                completedChallenges: 'completedChallenges'
            })
        },

    }
</script>

<style scoped>

</style>