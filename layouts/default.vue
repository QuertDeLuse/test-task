<template>
    <div>
        <nuxt />
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    computed: {
        usdRate() {
            return this.$store.getters["usdRate"]
        },
    },
    created() {
        const seconds = 5

        setInterval(() => {
            this.$store.dispatch("newUsdRate")
            this.$store.dispatch("getDataFromJson")
            this.$store.dispatch("getCartProducts")
            this.$store.dispatch("getCartAllCost")
        }, seconds * 1000)
    },
    methods: {},
}
</script>

<style></style>
