<template>
    <v-app>
    <v-navigation-drawer
            v-model="drawer"
            fixed
            app
    >
        <v-list dense>
            <v-list-tile @click="" to="/">
                <v-list-tile-action>
                    <v-icon>home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Home</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
			
			<v-list-tile @click="" to="/login" v-if="!token">
                <v-list-tile-action>
                    <v-icon>vpn_key</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Log In</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
			
			<v-list-tile @click="" to="/register" v-if="!token">
                <v-list-tile-action>
                    <v-icon>format_align_left</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Registrieren</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
			
			<v-list-tile @click="" to="/group" v-if="token">
                <v-list-tile-action>
                    <v-icon>group</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>WG</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="" to="/friends" v-if="token">
                <v-list-tile-action>
                    <v-icon>group</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Friends</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
			
			<v-list-tile @click="" to="/challenges" v-if="token">
                <v-list-tile-action>
                    <v-icon>grade</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Challenges</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="" to="/current_challenge" v-if="token">
                <v-list-tile-action>
                    <v-icon>grade</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>current_challenge</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="" to="/settings" v-if="token">
                <v-list-tile-action>
                    <v-icon>settings</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Einstellungen</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
			
            <v-list-tile @click="">
                <v-list-tile-action>
                    <v-icon>contact_mail</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Kontakt</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
			
			<v-list-tile three-line @click="logout" v-if="token">
                <v-list-tile-action>
                    <v-icon>directions_walk</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Log Out</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Enviroomate</v-toolbar-title>
    </v-toolbar>
    <v-content>
                <router-view></router-view>
    </v-content>
    <v-footer color="primary" app justify-right>
        <span class="white--text text-xs-right" > <3 </span>
    </v-footer>
    </v-app>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

	export default {
		name: 'App',
		data: () => ({
			drawer: null,
            ...mapGetters({
                token: 'token'
            })
		}),
		props: {
			source: String
		},
		methods: {
		  logout: function () {
			this.$store.commit('setUserId', null);
            this.$store.commit('setToken', null);
			this.$store.commit('setAuthorization', false);
			this.$router.push({name: 'Index'});
		  }
		},
	}
	
</script>