<template>
    <v-jumbotron color="grey lighten-2">
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">Deine WG</h3>
					
					<div  v-if="group==='(loading)' && group.data.messgae!='Group not found'">
						<v-list two-line>
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
					</div>
					<div v-else>
						<span class="subheading">Du bist nicht Teil einer WG</span>
						<div/>
						<v-btn @click="createGroup" color="info">Erstelle WG</v-btn>	
						<v-text-field
                              v-model="inviteId"
							  label="WG Link"
                              required
							></v-text-field>
						<v-btn color="info" @click="joinGroup">Trete WG bei</v-btn>			  
					</div>		
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
				name: '(loading)',
				inviteId: '',
				groups: '(loading)'
			}
        },
        methods: {
            fetchUserData: function () {
				//get user's current group
                axios.get("/api/auth/wg",
                    {
                        headers: {
                            "Authorization": "Bearer " + this.$store.state.token
                        }
                    }).then((res) => {
                    console.log("gotten group: ", res);
                    this.group = res.data.group;
					this.name = res.data.group.name;
					this.inviteId = res.data.group.inviteId;
                }).catch((err) => console.log("It broke while retrieving the user profile!", err)),
				//Get all the followed groups
				axios.get("/api/auth/followed-wgs",
                    {
                        headers: {
                            "Authorization": "Bearer " + this.$store.state.token
                        }
                    }).then((res) => {
                    console.log("gotten followed groups: ", res);
                    this.groups = res.data.groups;
                }).catch((err) => console.log("It broke while retrieving the user profile!", err))
            },
			//Create a new group, should there exist none
			createGroup() {
                // Native form submission is not yet supported
                axios.post('/api/new-wg', {
                    headers: {
                        "Authorization": "Bearer " + this.$store.state.token
                    }
                }).then((res) => {
					console.log("created profile: ", res);
                    this.group = res.data.group;
				}).catch((err) => console.log("It broke while trying to create a group", err))
			},
			//Join a group based on a link
			joinGroup() {
				console.log("Hello!");
                // Native form submission is not yet supported
                axios.post('/api/join-wg', {
                    headers: {
                        "Authorization": "Bearer " + this.$store.state.token
                    },
					params: {
						'inviteId': this.inviteId
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