<template>
    <div class="main-page-wrapper">
        <div class="main-page">
            <sidebar
                :active-group-id="activeGroupId"
                @toggle:cart="toggleCart"
                @open:group="openGroup"
            />
            <product-list :products="products" :cart-items="cartItems" />
            <cart-modal :is-cart-open="isCartOpen" @toggle:cart="toggleCart" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeGroupId: 0,
            isCartOpen: false,
        }
    },
    computed: {
        products() {
            const productsTmp = this.$store.getters["products"]

            if (this.activeGroupId === 0) return productsTmp
            return productsTmp.filter(item => item.group.id === this.activeGroupId)
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
            this.activeGroupId = groupId
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
