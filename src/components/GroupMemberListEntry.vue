<template>
    <v-list-tile v-else :key="member.screenName" avatar @click="">
        <v-list-tile-avatar :color="colors">
            <span class="white--text headline">{{ member.screenName.charAt(0).toUpperCase() }}</span>
        </v-list-tile-avatar>
        <v-list-tile-content>
            <v-list-tile-title v-html="member.screenName"> {{member.screenName}} </v-list-tile-title>
        </v-list-tile-content>
    </v-list-tile>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import currentChallenge from "../modules/currentChallenge";

    export default {
        name: "GroupMemberListEntry",
        props: ["member"],
        computed: {
            isYou: function() {
                return this.member.name === this.userName
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
                userName: 'userName',
                currentChallenge: 'currentChallenge'
            })
        }
    }
</script>

<style scoped>

</style>