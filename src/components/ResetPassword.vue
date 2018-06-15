<template>
    <v-container fluid fill-height grid-list-md text-xs-center>

        <v-layout align-center>
            <v-flex xs12 align-center>
                <h3 class="display-3">Enviroomate</h3>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            label="Password"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="password2"
                            :rules="password2Rules"
                            label="Confirm Password"
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
            valid: true,
            password: '',
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 4) || 'Password must be more than 4 characters'
            ],
            password2: '',
            password2Rules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 4) || 'Password must be more than 4 characters'
            ],
        }),
        computed: {
            token: function () {
                return this.$route.query.resettoken;
            }
        },
        methods: {
            submit() {
                // Native form submission is not yet supported
                Api.resetPassword(this.token, this.password, () => {
                    this.$router.push({name: 'home'})
                }, (err) => {
                    this.error = err;
                })
            }
        }
    }
</script>

<style scoped>

</style>