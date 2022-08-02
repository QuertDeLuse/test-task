<template>
    <div class="content">
        <TransitionGroup tag="ul" name="products-transition" class="products">
            <div class="products__item" v-for="(product, index) in products" :key="index">
                <div class="item__text">{{ product.title }}</div>
                <div class="item__qty">{{ product.qty | qty }}</div>
                <div
                    class="item__price"
                    :class="{ 'red-numbers': !isGrow, 'green-numbers': isGrow }"
                >
                    {{ Number(product.priceRub).toFixed(2) | currency }}
                </div>
                <div class="item__actions">
                    <a
                        v-if="cartItems.find(itemId => itemId === product.id)"
                        @click.prevent="removeFromCart(product.id)"
                    >
                        <span class="item__actions__add-btn">X</span>
                    </a>
                    <a v-else @click.prevent="addToCart(product.id)">
                        <span class="item__actions__add-btn">+</span>
                    </a>
                </div>
            </div>
            <div v-if="products.length == 0" :key="products.length + 1">
                <b>Товары по данной категории отсутсвуют</b>
            </div>
        </TransitionGroup>
    </div>
</template>

<script>
export default {
    props: {
        products: {
            type: Array,
            default: () => [],
        },
        cartItems: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {}
    },
    computed: {
        isGrow() {
            return this.$store.getters["isGrow"]
        },
    },
    methods: {
        addToCart(productId) {
            this.$store.dispatch("addToCartItems", productId)
        },
        removeFromCart(productId) {
            this.$store.dispatch("removeFromCartItems", productId)
        },
    },
}
</script>

<style lang="scss">
.products-transition-move,
.products-transition-enter-active,
.products-transition-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.products-transition-enter,
.products-transition-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
