<template>
    <v-container v-if="!loading">
        <v-layout >
            <v-flex >
                <template v-if="hasGroup" >
                    <v-container grid-list-md text-xs-center>
                        <v-layout  align-center>
                            <v-flex align-center fill-height>
                                <span>
                                    <h3 class="display-2">{{group ? group.name : "placeholder"}}
                                        <v-btn flat icon color="accent" @click.native="renameGroupDialog = true" class="text-lg-right">
                                            <v-icon>edit</v-icon>
                                        </v-btn>
                                    </h3>

                                </span>
                                <div>
                                    <v-list>
                                        <template v-for="(member, index) in group.members">
                                            <GroupMemberListEntry :member="member" v-on:leaveGroup="leaveGroupDialog = true"></GroupMemberListEntry>
                                            <v-divider v-if="index + 1 < group.members.length" :key="index"></v-divider>
                                        </template>
                                        <template v-if="group.members.length < 2">
                                            <v-divider></v-divider>
                                            <v-list-tile @click="">
                                                <v-list-tile-content>Etwas leer hier. Lade Leute in deine WG ein, indem Du den Share-Button drückst. </v-list-tile-content>
                                            </v-list-tile>
                                        </template>
                                    </v-list>
                                    <div><h3 class="display-2"><v-icon x-large>nature_people</v-icon>: {{group ? group.score : "placeholder"}}</h3></div>
									<div>
										
										<img src="../assets/Baum/11.png" v-if="group.score > 10000" height="200px"></img>
										<img src="../assets/Baum/10.png" v-else-if="group.score > 9000" height="200px"></img>
										<img src="../assets/Baum/9.png" v-else-if="group.score > 8000" height="200px"></img>
										<img src="../assets/Baum/8.png" v-else-if="group.score > 7000" height="200px"></img>
										<img src="../assets/Baum/7.png" v-else-if="group.score > 6000" height="200px"></img>
										<img src="../assets/Baum/6.png" v-else-if="group.score > 5000" height="200px"></img>
										<img src="../assets/Baum/5.png" v-else-if="group.score > 4000" height="200px"></img>
										<img src="../assets/Baum/4.png" v-else-if="group.score > 3000" height="200px"></img>
										<img src="../assets/Baum/3.png" v-else-if="group.score > 2000" height="200px"></img>
										<img src="../assets/Baum/2.png" v-else-if="group.score > 1000" height="200px"></img>
										<img src="../assets/Baum/1.png" v-else height="200px"></img>
									</div>
                                </div>
                                <v-fab-transition>
                                    <v-btn
                                            color="primary"
                                            v-model="hasGroup"
                                            fab
                                            fixed
                                            bottom
                                            right
                                            @click.native="shareDialog = true"
                                    >
                                        <v-icon>person_add</v-icon>
                                    </v-btn>
                                </v-fab-transition>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </template>
                <template v-else>
                    <v-btn round block color="primary" @click.native="createGroupDialog = true">
                        WG erstellen
                    </v-btn>
                    <v-btn round block color="primary" @click.native="joinGroupDialog = true">
                        WG beitreten
                    </v-btn>
                </template>
            </v-flex>
        </v-layout>

        <v-dialog
                v-model="createGroupDialog"
                transition="slide-y-transition"
                scrollable
        >
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click.native="createGroupDialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>WG erstellen</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" v-model="nameValid" lazy-validation>
                        <v-text-field
                                v-model="newName"
                                :rules="newNameRules"
                                label="Neuer WG Name"
                                required
                                prepend-icon="person"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn round depressed large color="primary"
                           :disabled="!nameValid"
                           @click="createGroup"
                    >WG erstellen
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
                v-model="joinGroupDialog"
                transition="slide-y-transition"
                scrollable
        >
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click.native="joinGroupDialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>WG beitreten</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" v-model="inviteValid" lazy-validation>
                        <v-text-field
                                v-model="joinId"
                                :rules="inviteRules"
                                label="Einladungslink"
                                required
                                prepend-icon="group_add"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn round depressed large color="primary"
                           :disabled="!inviteValid"
                           @click="joinGroup"
                    >WG beitreten
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
                v-model="renameGroupDialog"
                transition="slide-y-transition"
                scrollable
        >
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click.native="renameGroupDialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>WG umbenennen</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" v-model="nameValid" lazy-validation>
                        <v-text-field
                                v-model="newName"
                                :rules="newNameRules"
                                label="Neuer WG Name"
                                required
                                prepend-icon="person"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn round depressed large color="primary"
                           :disabled="!nameValid"
                           @click="renameGroup"
                    >WG umbenennen
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
                v-model="shareDialog"
                transition="slide-y-transition"
                scrollable
        >
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click.native="shareDialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Leute einladen</v-toolbar-title>
                </v-toolbar>
                <v-card-actions>
                    <a :href="'mailto:?subject='+ mailSubject +'&amp;body='+ mailBody">
                        <v-icon>email</v-icon>
                    </a>
                    <v-btn icon @click="copyShareLinkToClipBoard">
                        <v-icon>send</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-dialog
                v-model="leaveGroupDialog"
                transition="slide-y-transition"
                scrollable
        >
            <v-card class="elevation-12">
                <v-toolbar dark color="error">
                    <v-btn icon dark @click.native="leaveGroupDialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>WG verlassen</v-toolbar-title>
                </v-toolbar>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn round depressed large color="error"
                           @click="leaveGroup"
                    >WG verlassen
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar
                :timeout="2000"
                :bottom="true"
                :vertical="false"
                v-model="snackbar"
        >
            Link in die Zwischenablage kopiert!
            <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
    </v-container>

    <v-container v-else>
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import GroupMemberListEntry from './GroupMemberListEntry.vue'
    import Api from '../api/api'

    export default {
        components: {GroupMemberListEntry},
        data: () => {
            return {
                loading: false,
                renameGroupDialog: false,
                joinGroupDialog: false,
                createGroupDialog: false,
                leaveGroupDialog: false,
                shareDialog: false,
                snackbar: false,
                joinId: '',
                newName: '',
                nameValid: false,
                newNameRules: [
                    v => !!v || 'Ein Name wird benötigt',
                    v => (v && v.length >= 2) || 'Der Name sollte länger als 2 Zeichen sein'
                ],
                inviteValid: false,
                inviteRules: [
                    v => !!v || 'Bitte einen Einladungslink einfügen'
                ]
            };
        },
        computed: {
            avatars: function () {
                return group.members.map((member) => member.screenName.charAt(0))
            },
            mailSubject: function() {
                return "Enviroommate";
            },
            mailBody: function() {
                return "Hi%2C%20" + this.inviteLink + "%20LG";
            },
            colors: function () {
                var colors = [
                    'red', 'pink', 'purple', 'blue', 'cyan', 'teal', 'yellow', 'red'

                ];
                var randomNumber = Math.floor(Math.random() * colors.length);
                return colors[randomNumber];
            },
            inviteLink: function () {
                if (this.inviteId) {
                    const inviteLink ="https://enviroommate.org/#/register?i=" + this.inviteId;
                    this.$emit('shareId', inviteLink);
                    return inviteLink;
                }
            },
            ...mapGetters({
                hasGroup: 'hasGroup',
                group: 'myGroup',
                inviteId: 'inviteId',
                token: 'token'

            })
        },
        actions: {},
        methods: {
            closeDialogs: function () {
                this.renameGroupDialog = false;
                this.joinGroupDialog = false;
                this.createGroupDialog = false;
                this.leaveGroupDialog = false;
                this.shareDialog = false;
            },
            fetchGroupData: async function () {
                await this.loadGroup()
            },
            createGroup: function () {
                Api.createGroup(this.token, (res) => {
                    this.closeDialogs();
                    this.renameGroup();
                    this.fetchGroupData();
                }, (err) => {
                    console.error(err)
                });
            },
            renameGroup: function () {
                console.log("Rename to" + this.newName)

                Api.renameGroup(this.token, this.newName, (res) => {
                    this.closeDialogs();
                    this.fetchGroupData()
                }, (err) => {
                    console.error(err)
                });
            },
            leaveGroup: function () {
                console.log("leave group")
                Api.leaveGroup(this.token, (res) => {
                    this.closeDialogs();
                    this.fetchGroupData()
                }, (err) => {
                    console.error(err)
                });
            },
            joinGroup: function () {
                if(this.joinId.length > 6) {
                    this.joinId = this.joinId.substring(this.joinId.length - 6);
                }
                console.log("attepmt to join " + this.joinId);

                Api.joinGroup(this.token, this.joinId, (res) => {
                    this.closeDialogs();
                    this.fetchGroupData()
                }, (err) => {
                    console.error(err)
                });
            },
            copyShareLinkToClipBoard: function() {
                if (!navigator.clipboard) {
                    this.snackbar = fallbackCopyTextToClipboard(this.inviteLink);
                    return;
                }
                navigator.clipboard.writeText(this.inviteLink).then(function() {
                    this.snackbar = true;
                    console.log('Async: Copying to clipboard was successful!');
                }, function(err) {
                    console.error('Async: Could not copy text: ', err);
                });
            },
            ...mapActions([
                'loadGroup'
            ])
        },
        created: async function () {
            this.loading = true;
            await this.fetchGroupData();
            this.loading = false;
        },
    }

    function fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        var successful = false;
        try {
            successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
        return successful;
    }
</script>

<style scoped>

</style>