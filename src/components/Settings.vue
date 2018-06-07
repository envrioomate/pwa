<template>
    <v-container fill-height grid-list-md text-xs-center>
        <v-layout align-center>
            <h3 class="display-3">Einstellungen</h3>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    data () {
      return {
        notifications: false,
        setEnglish: false,
        dark: false,
        invites: false
      }
    }
  }
</script>

<style scoped>

</style>