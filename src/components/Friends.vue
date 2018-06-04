<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12>
                <v-subheader v-text="'Finde andere WGs:'"></v-subheader>
            </v-flex>
            <v-flex xs12 sm8>
                <v-select
                        :loading="loading"
                        :items="items"
                        :rules="[() => select.length > 0 || 'You must choose at least one']"
                        :search-input.sync="search"
                        v-model="select"
                        label="Async items"
                        autocomplete
                        cache-items
                        chips
                        required
                ></v-select>
            </v-flex>
            <v-flex x212 sm4>
                <v-btn @click="addGroups" :disabled="select.length === 0 ">hizufügen</v-btn>
            </v-flex>

            <v-flex xs12 sm12>
                <v-list two-line subheader>
                    <v-subheader inset>Freunde</v-subheader>
                    <v-list-tile v-for="item in friends" :key="item.name" @click="">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ item.score }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon ripple>
                                <v-icon color="grey lighten-1">info</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Api from "../api/api";
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "Friends",
        computed: mapGetters({
            token: 'token',
            friends: 'friends'
        }),
        data() {
            return {
                loading: false,
                items: [],
                search: null,
                select: [],
                groups: []
            }
        },
        watch: {
            search(val) {
                val && this.querySelections(val)
            }
        },
        actions: mapActions({
            loadFriends: 'loadFriends'
        }),
        methods: {
            querySelections(v) {
                this.loading = true
                Api.searchGroup(this.token, v, (res) => {
                    this.groups = res.data;
                    this.items = this.groups.map((g) => g.name)
                    this.loading = false
                }, (err) => {
                });
            },
            addGroups() {
                if (this.select) {
                    this.items.forEach((name, index) => {
                        if (name === this.select) {
                            Api.followGroup(this.token, this.groups[index].id, (res) => {
                                this.$store.dispatch('loadFriends');
                            }, (err) => console.error(err))
                        }
                    })
                }
            }
        },
        created: function () {
            this.$store.dispatch('loadFriends');

        }
    }
</script>

<style scoped>

</style>