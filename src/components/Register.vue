<template>
    <v-container fluid grid-list-md text-xs-center>

        <v-layout align-center>
            <v-flex xs12 align-center>
                <h3 class="display-3">Account erstellen</h3>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                            v-model="name"
                            :rules="nameRules"
                            :counter="255"
                            label="Name"
                            required
                    ></v-text-field>
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
                    <v-text-field
                            v-model="password2"
                            :rules="password2Rules"
                            label="Passwort bestätigen"
                            type="password"
                            required
                    ></v-text-field>

                    <!--
                    <v-checkbox
                            v-model="agreedTos"
                            :rules="[v => !!v || 'You must agree to continue!']"
                            required
                            value
                    ><span slot="label">Ich habe die <a @click="showTos">allgemeinen Geschäftsbedingunen</a> gelesen und stimme zu.</span>
                    </v-checkbox>
                    -->
                    <v-checkbox
                            v-model="agreedPA"
                            :rules="[v => !!v || 'You must agree to continue!']"
                            required
                            value
                    ><span slot="label">Ich habe die <a @click="showPa">Datenschutzvereinbarung</a> gelesen und stimme zu.</span>
                    </v-checkbox>

                    <v-btn round block large color="primary"
                           :disabled="!valid"
                           v-on:click="submit"
                    >

                        Registrieren
                    </v-btn>
                </v-form>
            </v-flex>
        </v-layout>

        <v-dialog
                v-model="paDialog"
                fullscreen
                transition="dialog-bottom-transition"
                full-width
        >

            <v-card tile>
                <v-toolbar card dark color="primary">
                    <v-btn icon dark @click="dismissPaDialog">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Datenschutzvereinbarung</v-toolbar-title>
                </v-toolbar>
                <legal></legal>
            </v-card>
        </v-dialog>

        <v-dialog
                v-model="tosDialog"
                fullscreen
                transition="dialog-bottom-transition"
                full-width
        >

            <v-card tile>
                <v-toolbar card dark color="primary">
                    <v-btn icon dark @click="dismissTosDialog">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Allgemeine Geschäftsbedingungen</v-toolbar-title>
                </v-toolbar>
                <tos></tos>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
    import axios from 'axios'
    import Legal from "./PrivacyAgreement.vue";
    import Tos from "./Tos.vue";

    export default {
        components: {Legal, Tos},
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name wird benötigt',
                v => (v && v.length <= 255) || 'Name sollte kürzer als 256 Zeichen sein'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-Mail wird benötigt',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/.test(v) || 'E-mail must be valid'
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Passwort wird benötigt',
                v => (v && v.length >= 4) || 'Passwort muss länger als 4 Zeichen sein'
            ],
            password2: '',
            password2Rules: [
                v => !!v || 'Passwortbestätigung wird benötigt',
                v => (v && v.length >= 4) || 'Passwort muss länger als 4 Zeichen sein'
            ],
            agreedPA: false,
            paRead: false,
            paDialog: false,
            agreedTos: false,
            tosRead: false,
            tosDialog: false
        }),
        computed: {
            invite: function () {
                return this.$route.query.i;
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    console.log("submit");
                    if (this.valid) {
                        // Native form submission is not yet supported
                        axios.post('/api/register', {
                            screenname: this.name,
                            username: this.email,
                            password: this.password,
                            confirm_password: this.password2,
                            invite: this.invite
                        }).then((res) => {
                            console.log(res);
                            if (res.status === 200) {
                                axios.post('/api/login', {
                                    username: this.email,
                                    password: this.password
                                }).then((res) => {
                                    console.log(res);
                                    this.$store.commit('setUserId', res.data.id);
                                    this.$store.commit('setToken', res.data.token);
                                    this.$router.push({name: 'loggedin'})
                                }).catch((err) => console.log("It broke while logging in", err))
                            }
                        }).catch((err) => console.log("It broke while registering", err))
                    }
                }
            },
            clear() {
                this.$refs.form.reset()
            },
            showPa: function (e) {
                e.preventDefault();
                this.paDialog = true;
            },
            dismissPaDialog: function () {
                this.agreedPA = false;
                this.paRead = true;
                this.paDialog = false;
            },
            showTos: function (e) {
                e.preventDefault();
                this.tosDialog = true;
            },
            dismissTosDialog: function () {
                this.agreedTos = false;
                this.tosRead = true;
                this.tosDialog = false;
            }
        }
    }
</script>

<style scoped>

</style>