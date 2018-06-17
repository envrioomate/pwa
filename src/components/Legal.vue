<template>
    <v-container>
        <Tos></Tos>
        <PrivacyAgreement></PrivacyAgreement>
    </v-container>
</template>

<script>
    import Tos from "./Tos.vue";
    import PrivacyAgreement from "./PrivacyAgreement.vue";
    export default {
        name: "Legal",
        components: {PrivacyAgreement, Tos}
    }
</script>

<style scoped>

</style>