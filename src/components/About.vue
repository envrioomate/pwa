<template>
    <v-container>
        <template>
            <v-card fill-height>
                <v-layout align-center>
                    <v-flex>
                        <v-card-title class="title mb-3">Kontakt</v-card-title>
                        <v-card-text>Fragen, Anmerkungen, Kritik? Schreibe uns doch eine mail:</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn :href='"mailto:contact@enviroommate.org"'> contact@enviroommate.org</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-card>

            <v-card fill-height>
                <v-layout align-center>
                    <v-flex>
                        <v-card-title class="title mb-3">Impressum</v-card-title>
                        <v-card-text>

                            --- TODO ---

                        </v-card-text>

                    </v-flex>
                </v-layout>
            </v-card>

            <v-card fill-height>
                <v-layout align-center>
                    <v-flex>
                        <v-card-actions class="title mb-3" to="/legal">
                            <v-spacer></v-spacer>

                            <v-btn round depressed outline color="info" to="/legal">
                                AGB & Datenschutz
                            </v-btn>
                        </v-card-actions>


                    </v-flex>
                </v-layout>
            </v-card>
        </template>
    </v-container>
</template>

<script>
    export default {
        name: "About"
    }
</script>

<style scoped>

</style>