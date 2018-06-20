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
                            <a :href='"mailto:info@enviroommate.org"'> info@enviroommate.org</a>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-card>

            <v-card fill-height>
                <v-layout align-center>
                    <v-flex>
                        <v-card-title class="title mb-3">Impressum</v-card-title>
                        <v-card-text>

                            <p>Die Webseite enviroommate.org wird betrieben durch den:</p>

                            <p><a href="http://www.verein-allgemeinbildung.de">Allgemeinbildung - Natur Mensch Technik
                                e.V.</a><br> Wielandstraße 15<br> 28203 Bremen</p>
                            <p>Vertretungsberechtigte Vorstände des Vereins:<br>Laura Schnee<br>Christian Gutsche</p>
                            <p>Tel.: +49 421 17310792 <br>
                            Fax: +49 421 17310793</p>
                            <p>Mail: <span id="cloakaca20c202e704c0719e234a79615250d"> <a
                                    :href='"mailto:info@enviroommate.org"'> info@enviroommate.org</a> </span>
                            </p>

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
                                Datenschutz
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