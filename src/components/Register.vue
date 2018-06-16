<template>
    <v-container fluid grid-list-md text-xs-center>

        <v-layout align-center>
            <v-flex xs12 align-center>
                <h3 class="display-3">Account erstellen</h3>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                            v-model="name"
                            :rules="nameRules"
                            :counter="10"
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
                            label="Passwort"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="password2"
                            :rules="password2Rules"
                            label="Passwort bestätigen"
                            required
                    ></v-text-field>

                    <v-btn round block large color="primary"
                           :disabled="!valid"
                           v-on:click="submit"
                    >
                        submit
                    </v-btn>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
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
        }),
        computed: {
            invite: function () {
                return this.$route.query.i;
            }
        },
        methods: {
            submit() {
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
            },
            clear() {
                this.$refs.form.reset()
            }
        }
    }
</script>

<style scoped>

</style>