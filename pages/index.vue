<template>
    <div class="main-page-wrapper">
        <div class="main-page">
            <sidebar @toggle:cart="toggleCart" @open:group="openGroup" />
            <product-list :products="productsWithGroup" :cart-items="cartItems" />
            <cart-modal :is-cart-open="isCartOpen" @toggle:cart="toggleCart" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCartOpen: false,
        }
    },
    computed: {
        activeGroupId() {
            this.$store.getters["activeGroupId"]
        },
        productsWithGroup() {
            return this.$store.getters["productsWithGroup"]
        },
        groups() {
            return this.$store.getters["groups"]
        },
        cartItems() {
            return this.$store.getters["cartItems"]
        },
    },
    mounted() {
        this.getDataFromJson()
    },
    methods: {
        getDataFromJson() {
            this.$store.dispatch("getDataFromJson")
        },
        openGroup(groupId) {
            this.$store.dispatch("setActiveGroup", groupId)
        },
        toggleCart() {
            this.isCartOpen = !this.isCartOpen
        },
    },
}
</script>

<style lang="scss">
.main-page {
    &-wrapper {
    }
}
</style>
