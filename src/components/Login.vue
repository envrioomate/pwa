<template>
    <v-container fluid fill-height>

        <v-layout fill-height>
            <v-flex xs12>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            label="Password"
                            required
                    ></v-text-field>
                    <v-alert :value='loginStatus == "failed"' type="error"      transition="scale-transition"
                    >
                        Username or Password not found...
                    </v-alert>
                    <v-btn
                            :disabled="!valid"
                            @click="login()"
                    >
                        submit
                    </v-btn>
                    <v-btn @click="clear">clear</v-btn>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'

export default {
    computed: mapGetters({
        token: 'token',
        loginStatus: 'loginStatus'
    }),
    methods: {
        login() {
            console.log("dispatch login with " + this.$data.email + " " + this.$data.password )
            this.$store.dispatch('login', {email : this.$data.email, password : this.$data.password})
        },
        clear() {
            this.$refs.form.reset()
        }
    },
    watch: {
        loginStatus: function(newStatus) {
            if(newStatus == "success") {
                this.$router.push({name: 'Index'})
            }
        },
    },
    data: () => ({
        valid: true,
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must conform to regex /^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$/'
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 4) || 'Password must be more than 4 characters'
        ],
        checkbox: false
    }),
}
</script>

<style scoped>

</style>