<template>
    <v-jumbotron color="grey lighten-2">
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">Your Group</h3>
                    <span class="subheading">Here you can see information about your team</span>
					
					<v-list two-line v-if='hasGroup'>
					  <template v-for="(item, index) in group.members">
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
    import {mapGetters, mapActions} from 'vuex'
    import Api from '../api/api'

    export default {
        data: () => {
            return {newName: ''};
        },
        computed: {
            avatars: function () {
                return group.members.map((member) => member.screenName.charAt(0))
            },
            ...mapGetters({
                hasGroup: 'hasGroup',
                group: 'group',
                inviiteId: 'inviteId',
                token: 'token'

            })
        },
        actions: {
        ...mapActions([
            'loadGroup'
        ])},
        methods: {
            fetchGroupData: function () {
                this.$store.dispatch('loadGroup')
            },
            createGroup: function () {
                Api.createGroup(this.token, (res) => {
                    this.fetchGroupData()
                }, (err) => {
                    console.error(err)
                });
            },
            renameGroup: function () {
                Api.renameGroup(this.token, this.newName,  (res) => {
                    this.fetchGroupData()
                }, (err) => {
                    console.error(err)
                });
            }
        },
        created: function (){
            this.fetchGroupData();

        }
    }
</script>

<style scoped>

</style>