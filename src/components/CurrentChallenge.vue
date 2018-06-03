<template>
    
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "CurrentChallenge",
        methods: {
            fetchCurrentChallenge: function () {
                this.$store.dispatch('loadCurrentChallenge')
            }
        },
        created: function () {
            this.fetchCurrentChallenge();
        }
    }
</script>

<style scoped>

</style>