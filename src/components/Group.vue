<template>
    <v-jumbotron color="grey lighten-2">
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">Your Group</h3>
                    <span class="subheading">Here you can see information about your team</span>
					
					<v-list two-line v-if="group==='(loading)' && group.data.messgae!='Group not found'">
					  <template v-for="(item, index) in items">
						<v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
						<v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
						<v-list-tile v-else :key="item.title" avatar @click="">
						  <v-list-tile-avatar :color="item.color">
							<span class="white--text headline">{{ item.avatar }}</span>
						  </v-list-tile-avatar>
						  <v-list-tile-content>
							<v-list-tile-title v-html="item.title"></v-list-tile-title>
							<v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
						  </v-list-tile-content>
						</v-list-tile>
					  </template>
					</v-list>
					<v-btn v-else @Click="createGroup">Create Group</v-btn>
					
                </v-flex>
            </v-layout>
        </v-container>
    </v-jumbotron>
</template>

<script>
	import axios from 'axios'

    export default {
        data: () => {
			return {
				group: '(loading)',
			}
        },
        methods: {
            fetchUserData: function () {
                axios.get("/api/auth/wg",
                    {
                        headers: {
                            "Authorization": "Bearer " + this.$store.state.token
                        }
                    }).then((res) => {
                    console.log("gotten profile: ", res);
                    this.group = res.data.group;
                }).catch((err) => console.log("It broke while retrieving the user profile!", err))
            },
			createGroup: function () {
                // Native form submission is not yet supported
                axios.post('/api/new-wg', {
                    headers: {
                        "Authorization": "Bearer " + this.$store.state.token
                    }
                }).then((res) => {
					console.log("created profile: ", res);
                    this.group = res.data.group;
				}).catch((err) => console.log("It broke while registering", err))
			}				
        },
        created: function (){
            this.fetchUserData();
        }
    }
</script>

<style scoped>

</style>