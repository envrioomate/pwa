<template>
    <v-container fill-height>
        <v-layout align-center>
            <v-flex text-xs-center>
                <h3 class="display-3">{{challenge.title}}</h3>
            </v-flex>
        </v-layout>
    </v-container>
    <v-card>
        <v-card-media :src="challenge.imageUrl ? challenge.imageUrl : '/static/default.jpg'"
                      height="300px">
            <v-layout column class="media">

            </v-layout>
        </v-card-media>
        <v-tabs v-model="tab" growr show-arrows>
            <v-tab>Beschreibung</v-tab>
            <v-tab>Pro-Tipp</v-tab>
            <v-tab>CO2</v-tab>
            <v-tab>Quellen</v-tab>
            <v-tabs-slider color="accent"></v-tabs-slider>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-card>
                        <v-card-text>
                            {{challenge.description}}
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card>
                        <v-card-text>
                            {{challenge.tip}}
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card>
                        <v-card-text>
                            {{challenge.co2_savings}}
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card>
                        <v-card-text>
                            <a :href='"http://"+challenge.sources'>{{challenge.sources}}</a>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-tabs>
    </v-card>
</template>

<script>
    export default {
        name: "ChallengeDetails",
        props: ["challenge"]
    }
</script>

<style scoped>

</style>