<template>
    <v-container>
        <section>
            <v-parallax src="/static/default.jpg" height="600">
            <v-layout
                    column
                    align-center
                    justify-center
                    class="white--text" xs12>
                        <img src='../assets/Logo_neu_icon.png'>
                        <div class="subheading mb-3 display-1 text-xs-center summer">Willkommen bei</div>
                        <h1 class="white--text mb-2 display-1  text-xs-center summer">Enviroomate</h1>
            </v-layout>
            </v-parallax>
        </section>
        <section>
            <v-layout>
                <v-flex xs12 sm6 mx-2 id="copy-text">
                    <div>Wir von Enviroommate haben uns überlegt, wie wir alle etwas für unser Klima tun können.
                        Besonders
                        wichtig war uns dabei, dass wir am Ende auch Lust haben die Tipps umzusetzen. Deshalb findet ihr
                        auf
                        unserer Seite jede Woche eine neue Challenge, die ihr zusammen mit eurer WG erledigen könnt.
                        Dabei
                        gibt es immer eine Aufgabe für die von euch, die einfach gerne einmal in der Woche etwas neues,
                        lustiges mit ihren lieben Mitbewohnern unternehmen wollen und dann noch einen Zusatztipp für die
                        Profis unter euch. Für jede geschaffte Challenge bekommt ihr Punkte, die euren WG Baum wachsen
                        lassen und die ihr mit befreundeten WGs vergleichen könnt. Falls ihr coole Ideen für neue
                        Challenges
                        habt oder euch anders einbringen wollt, schreibt uns gerne eine Mail! Wir freuen uns über alle
                        neuen
                        Enviroommates 💚
                    </div>

                </v-flex>
            </v-layout>
        </section>

        <section>
            <v-layout>
            <v-flex xs12 sm5 align-center text-xs-center mx-2 id="login">
                <v-card>
                    <v-card-text>
                        <v-alert :value='resetTokenSendAlert' type="info">Wir haben dir eine E-Mail gesendet</v-alert>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-Mail"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    v-model="password"
                                    :rules="passwordRules"
                                    type="password"
                                    label="Passwort"
                                    required
                            ></v-text-field>
                            <v-alert :value='loginStatus == "failed"' type="error" transition="scale-transition"
                            >
                                Benutzername oder Passwort falsch!
                            </v-alert>
                            <div>
                                <v-btn class="landingBtn" round depressed large color="primary"
                                       :disabled="!valid"
                                       @click="login()"
                                >
                                    Login
                                </v-btn>
                            </div>
                            <div>
                                <v-btn small outline depressed color="accent"
                                       @click.stop="pwResetDialog = true"
                                >
                                    Passwort vergessen...?
                                </v-btn>
                            </div>
                        </v-form>

                        <v-divider class="my-3"></v-divider>
                        <div>
                            <v-btn depressed class="landingBtn" color="info" to="/register">Registrieren</v-btn>
                        </div>
                        <div>
                            <v-btn depressed class="landingBtn" color="accent" to="/hilfe">Hilfe</v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
            </v-layout>
        </section>

        <v-dialog
                v-model="pwResetDialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable
        >

            <v-card tile>
                <v-toolbar card dark color="primary">
                    <v-btn icon dark @click.native="pwResetDialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Passwort zurücksetzen</v-toolbar-title>
                </v-toolbar>
                <v-layout align-center>
                    <v-flex xs12 align-center>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-Mail"
                                    required
                            ></v-text-field>
                            <v-btn round depressed large color="primary"
                                   :disabled="!valid"
                                   @click="resetPassword"
                            >Passwort zurücksetzen
                            </v-btn>
                        </v-form>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import Api from '../api/api'

    export default {
        computed: mapGetters({
            token: 'token',
            loginStatus: 'loginStatus'
        }),

        methods: {
            fetchUserData: function () {
                if (this.$store.state.login.token) {
                    this.$router.push({name: 'loggedin'})
                }
            },
            login() {
                console.log("dispatch login with " + this.$data.email + " " + this.$data.password)
                this.$store.dispatch('login', {email: this.$data.email, password: this.$data.password})
            },
            resetPassword() {
                Api.requestPasswordReset(this.$data.email, (res) => {
                    this.pwResetDialog = false;
                    this.resetTokenSendAlert = true;
                    console.log(res)
                }, (err) => {
                    console.error(err)
                })
            }
        },
        watch: {
            loginStatus: function (newStatus) {
                console.log(newStatus);
                if (newStatus == "success") {
                    this.$router.push({name: 'loggedin'})
                }
            },
        },
        data: () => ({
            valid: true,
            email: '',
            emailRules: [
                v => !!v || 'E-Mail wird benötigt',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/.test(v) || 'Das sieht nicht aus wie eine E-Mail-Adresse'
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Passwort wird benötigt',
                v => (v && v.length >= 4) || 'Passwort muss länger als 4 Zeichen sein'
            ],
            checkbox: false,
            pwResetDialog: false,
            resetTokenSendAlert: false
        }),
        created: function () {
            this.fetchUserData();
        }

    }
</script>

<style scoped>
    .summer {
        font-family: "Summer Font";
    }

    h2 {
        font-family: "Summer Font";
    }
</style>