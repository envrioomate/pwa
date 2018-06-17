<template>
    <v-list-tile avatar @click.native="$emit('viewGroup', group)" ripple>
        <v-list-tile-avatar :color="colors">
            <span class="white--text headline">{{ group.name.charAt(0).toUpperCase() }}</span>
        </v-list-tile-avatar>
        <v-list-tile-content>
            <v-list-tile-title v-html="group.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="group.score"></v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action >
            <v-btn  flat icon color="accent" @click.native="$emit('removeGroup', group)" ripple>
                <v-icon>delete_forever</v-icon>
            </v-btn>
        </v-list-tile-action>
    </v-list-tile>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import currentChallenge from "../modules/currentChallenge";

    export default {
        name: "FriendListEntry",
        props: ["group"],
        computed: {
            colors: function () {
                var colors = [
                    'red', 'pink', 'purple', 'blue', 'cyan', 'teal', 'yellow', 'red'

                ];
                var randomNumber = Math.floor(Math.random() * colors.length);
                return colors[randomNumber];
            },
        }
    }
</script>

<style scoped>

</style>