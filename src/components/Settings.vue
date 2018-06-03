<template>
    <v-jumbotron color="grey lighten-2">
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">Settings</h3>
					
					<v-list two-line subheader>
					  <v-list-tile avatar>
						<v-list-tile-action>
						  <v-checkbox v-model="notifications"></v-checkbox>
						</v-list-tile-action>
						<v-list-tile-content>
						  <v-list-tile-title>Notifications</v-list-tile-title>
						  <v-list-tile-sub-title>Allow notifications</v-list-tile-sub-title>
						</v-list-tile-content>
					  </v-list-tile>
					  <v-list-tile avatar>
						<v-list-tile-action>
						  <v-checkbox v-model="mute"></v-checkbox>
						</v-list-tile-action>
						<v-list-tile-content>
						  <v-list-tile-title>Mute</v-list-tile-title>
						  <v-list-tile-sub-title>Mute all sounds</v-list-tile-sub-title>
						</v-list-tile-content>
					  </v-list-tile>
					  <v-list-tile avatar>
						<v-list-tile-action>
						  <v-checkbox v-model="dark"></v-checkbox>
						</v-list-tile-action>
						<v-list-tile-content>
						  <v-list-tile-title>Dark Theme</v-list-tile-title>
						  <v-list-tile-sub-title>Gives the app a darker theme for low light environments</v-list-tile-sub-title>
						</v-list-tile-content>
					  </v-list-tile>
					  <v-list-tile avatar>
						<v-list-tile-action>
						  <v-checkbox v-model="invites"></v-checkbox>
						</v-list-tile-action>
						<v-list-tile-content>
						  <v-list-tile-title>Invites</v-list-tile-title>
						  <v-list-tile-sub-title>Notify when receiving invites</v-list-tile-sub-title>
						</v-list-tile-content>
					  </v-list-tile>
					</v-list>
                </v-flex>
            </v-layout>
        </v-container>
    </v-jumbotron>
</template>

<script>
  export default {
    data () {
      return {
        notifications: false,
        mute: false,
        dark: false,
        invites: false
      }
    }
  }
</script>

<style scoped>

</style>