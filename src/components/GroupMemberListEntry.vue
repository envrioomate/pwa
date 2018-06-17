<template>
    <v-list-tile v-else :key="member.screenName" avatar @click="" ripple>
        <v-list-tile-avatar :color="colors">
            <span class="white--text headline">{{ member.screenName.charAt(0).toUpperCase() }}</span>
        </v-list-tile-avatar>
        <v-list-tile-content>
            <v-list-tile-title v-html="member.screenName"> {{member.screenName}} </v-list-tile-title>
        </v-list-tile-content>
        <template v-if="showChallengeState">
            <v-list-tile-action>
                <v-icon v-if="completedCurrentChallenge" color="primary">star</v-icon>
                <v-icon v-else>star_border</v-icon>
            </v-list-tile-action>
        </template>
        <template v-else>
            <v-list-tile-action v-if="isYou">
                <v-btn  flat icon color="accent" @click.native="$emit('leaveGroup')" ripple>
                    <v-icon>delete_forever</v-icon>
                </v-btn>
            </v-list-tile-action>
        </template>
    </v-list-tile>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import currentChallenge from "../modules/currentChallenge";

    export default {
        name: "GroupMemberListEntry",
        props: ["member", "showChallengeState"],
        computed: {
            isYou: function() {
                return this.member.screenName === this.screenName;
            },
            completedCurrentChallenge: function () {
                if (!this.member.completedChallenges
                    || !(this.member.completedChallenges instanceof Array)) return false;
                const i = this.member.completedChallenges.filter(challenge =>
                    challenge.id === this.currentChallenge.id
                ).length;
                return i > 0;
            },
            colors: function () {
                var colors = [
                    'red', 'pink', 'purple', 'blue', 'cyan', 'teal', 'yellow', 'red'

                ];
                var randomNumber = Math.floor(Math.random() * colors.length);
                return colors[randomNumber];
            },
            ...mapGetters({
                screenName: 'screenName',
                currentChallenge: 'currentChallenge',
                hasGroup: 'hasGroup',
                group: 'myGroup',

            })
        }
    }
</script>

<style scoped>

</style>