<template>
        <v-container fill-height grid-list-md text-xs-center>
            <v-layout align-center>
                <v-flex align-center>
					<img src='../assets/Logo_neu_icon.png' />
                    <h3 class="display-3">Enviroomate</h3>
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
                            label="Passwort"
                            required
                    ></v-text-field>
                    <v-alert :value='loginStatus == "failed"' type="error"      transition="scale-transition"
                    >
                        Username or Password not found...
                    </v-alert>
					<div>
                    <v-btn block round depressed large color="primary"
                            :disabled="!valid"
                            @click="login()"
                    >
                        Login
                    </v-btn>
					</div>
					<div>
					<v-btn small outline depressed color="accent"
                            :disabled="!valid"
                            @click=""
                    >
                        Passwort vergessen...?
                    </v-btn>
					</div>
					</v-form>
                    <v-divider class="my-3"></v-divider>
					<div>
						<v-btn depressed block color="info" to="/register">Registrieren</v-btn>
					</div>
					<div>
						<v-btn depressed block color="accent" to="/hilfe">Hilfe</v-btn>
					</div>
                    
                </v-flex>
            </v-layout>
        </v-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
		computed: mapGetters({
			token: 'token',
			loginStatus: 'loginStatus'
		}),
        
        methods: {
            fetchUserData: function () {
                if(this.$store.state.login.token) {
                    this.$router.push({name: 'loggedin'})
                }
            },
			login() {
				console.log("dispatch login with " + this.$data.email + " " + this.$data.password )
				this.$store.dispatch('login', {email : this.$data.email, password : this.$data.password})
			}
        },
		watch: {
			loginStatus: function(newStatus) {
				console.log(newStatus);
				if(newStatus == "success") {
					this.$router.push({name: 'loggedin'})
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
        created: function () {
            this.fetchUserData();
        }

    }
</script>

<style scoped>

</style>