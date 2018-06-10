<template>
    <v-app>
    <v-navigation-drawer
            v-model="drawer"
            fixed
            app
    >
        <v-list dense>
            <v-list-tile @click="" to="/group/create">
                <v-list-tile-content>
                    <v-list-tile-title>Team Erstellen</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
			
			<v-list-tile @click="" to="/group/edit">
                <v-list-tile-content>
                    <v-list-tile-title>Team Bearbeiten</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
			
			<v-list-tile @click="" to="/group/show">
                <v-list-tile-content>
                    <v-list-tile-title>Mein Team</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
			
			<v-list-tile @click="" to="/friends">
                <v-list-tile-content>
                    <v-list-tile-title>Gefolgte Teams</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
			
			<v-list-tile @click="" to="/current_challenge">
                <v-list-tile-content>
                    <v-list-tile-title>Wochenchallenges</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="" to="/settings">
                <v-list-tile-content>
                    <v-list-tile-title>Einstellungen</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
			
			<v-list-tile @click="" to="/help">
                <v-list-tile-content>
                    <v-list-tile-title>Hilfe</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="" to="/contact">
                <v-list-tile-content>
                    <v-list-tile-title>Impressum</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
			
			<v-list-tile></v-list-tile>
			<v-list-tile></v-list-tile>
			
			<v-list-tile three-line @click="logout">
                <v-list-tile-content>
                    <v-list-tile-title>Abmelden</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar color="secondary" light flat fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
                <router-view></router-view>
    </v-content>
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

<style lang="styl">

</style>