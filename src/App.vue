<template>
    <v-app>
        <v-navigation-drawer
                v-model="drawer"
                fixed
                app
        >
            <v-list dense>
				
                <template v-if="menu.loggedInWithGroup" v-for="(item, index) in menu.loggedInWithGroup">
                    <v-list-tile :click="item.click" :to="item.to">
                        <v-list-tile-action>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{item.title}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>

                <template v-if="menu.loggedInWithoutGroup" v-for="(item, index) in menu.loggedInWithoutGroup">
                    <v-list-tile :click="item.click" :to="item.to">
                        <v-list-tile-action>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{item.title}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>

                <v-divider></v-divider>

                <template v-if="menu.loggedIn" v-for="(item, index) in menu.loggedIn">
                    <v-list-tile :click="item.click" :to="item.to">
                        <v-list-tile-action>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{item.title}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
                <v-divider></v-divider>

                <template v-if="menu.general" v-for="(item, index) in menu.general">
                    <v-list-tile :click="item.click" :to="item.to ? item.to : null" :href="item.href ? item.href : null">
                        <v-list-tile-action>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{item.title}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
                <v-divider></v-divider>

                <v-list-tile three-line @click="logout">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Abmelden</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="secondary" light flat fixed app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
             <img src='./assets/Logo_neu_sq.png' />
            <v-toolbar-title style="font-face: 'Summer Font Light'">Enviroommate</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: 'App',
        data: () => ({
            drawer: null
        }),
        computed: {
            menu: function () {
                console.log("rebuild menu, token = " + this.token + " group =" + this.hasGroup)
                let nav = {};
                if (this.token) {
                    if (this.hasGroup) {
                        nav.loggedInWithGroup = [
                            {title: "Start", to: "/home", icon: "home"},
                            {title: "Meine WG", to: "/group", icon: "group"},
                            {title: "Gefolgte WGs", to: "/friends", icon: "favorite"},
                            {title: "Wochen Challenge", to: "/current_challenge", icon: "grade"},
                            {title: "Challengeverlauf", to: "/past_challenges", icon: "grade"},

                        ]
                    } else {
                        nav.loggedInWithoutGroup = [
                            {title: "Start", to: "/home", icon: "home"},
                            {title: "WG finden oder erstellen", to: "/group", icon: "group"},
                        ]
                    }
                    nav.loggedIn = [
                        {title: "Einstellungen", to: "/settings", icon: "settings"},
                    ]

                } else {
                }
                nav.general = [
                    {title: "Umfrage", href: "https://www.survio.com/survey/d/Q5A9P9A5A9C2F6Y5K", icon: "grade"},
                    {title: "Kontakt & Impressum", to: "/contact", icon: "mail_outline"},
                ]
                return nav;
            },
            ...mapGetters({
                token: 'token',
                hasGroup: 'group'
            })
        },
        props: {
            source: String
        },
        methods: {
            logout: function () {
                console.log("clearing local storage");
                localStorage.clear();
                this.$router.push({name: 'Index'});
                location.reload();
            }
        },
        created: function () {

        }
    }

</script>

<style lang="styl">

</style>