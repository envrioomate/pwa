<template>
    <v-container fluid fill-height grid-list-md text-xs-center>

        <v-layout align-center>
            <v-flex xs12 align-center>
                <h3 class="display-3">Passwort zurücksetzen</h3>
                <v-form ref="form" v-model="valid" lazy-validation>
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
                    <v-btn round depressed large color="primary"
                           :disabled="!valid"
                           @click="submit"
                    >Passwort zurücksetzen</v-btn>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import Api from "../api/api";

    export default {
        name: "ResetPassword",
        data: () => ({
            error: null,
            password: '',
            passwordRules: [
                v => !!v || 'Passwort wird benötigt',
                v => (v && v.length >= 4) || 'Passwort muss länger als 4 Zeichen sein'
            ],
            password2: '',
            password2Rules: [
                v => !!v || 'Passwort wird benötigt',
                v => (v && v.length >= 4) || 'Passwort muss länger als 4 Zeichen sein'
            ],
        }),
        computed: {
            valid: function() {
                return (this.password && this.password === this.password2)
            },
            token: function () {
                return this.$route.query.resettoken;
            }
        },
        methods: {
            submit() {
                // Native form submission is not yet supported
                if(!(this.password === this.password2)) return;
                Api.resetPassword(this.token, this.password, () => {
                    this.$router.push({name: 'index'})
                }, (err) => {
                    this.error = err;
                })
            }
        }
    }
</script>

<style scoped>

</style>