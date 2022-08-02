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
    watch: {
        usdRate: {
            immediate: false,
            handler: function (newValue, oldValue) {
                let isGrow = undefined
                if (newValue > oldValue) isGrow = true
                if (newValue < oldValue) isGrow = false

                this.$store.dispatch("setIsGrow", isGrow)
            },
        },
    },
    mounted() {
        const seconds = 15

        setInterval(() => {
            this.$store.dispatch("getDataFromJson")

            const max = 80
            const min = 20

            const newUsdRate = Math.random() * (max - min) + min

            this.$store.dispatch("setUsdRate", Number(newUsdRate).toFixed(0))
            this.$store.dispatch("getCartProducts")
            this.$store.dispatch("getCartAllCost")
        }, seconds * 1000)
    },
    methods: {},
}
</script>

<style></style>
