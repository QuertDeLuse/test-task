<template>
    <div
        class="main-page__overlay"
        :class="{ 'main-page__overlay_active': isCartOpen }"
        @click="toggleCart"
    >
        <Transition name="cart-transition">
            <div v-if="isCartOpen" class="modal-wrapper" @click="stopPropagation($event)">
                <div class="modal">
                    <div v-if="!cartProducts.length" class="cart_empty">
                        <h3 class="cart_empty__heading">Корзина пуста</h3>
                        <h4 class="cart_empty__subheading">
                            <a @click.prevent="toggleCart($event)">Вперед к покупкам!</a>
                        </h4>
                    </div>
                    <div class="cart" v-else>
                        <div class="cart__row cart__row_heading">
                            <span>Наименование и описание товара</span>
                            <span>Количество</span>
                            <span class="numerals">Цена</span>
                        </div>

                        <div class="cart__product-list">
                            <div
                                class="cart__row cart-product"
                                v-for="(product, index) in cartProducts"
                                :key="index"
                            >
                                <span>{{ product.title }}</span>
                                <span>
                                    <input
                                        class="cart-qty"
                                        type="number"
                                        min="1"
                                        :max="product.qty"
                                        v-model="product.cartQty"
                                        @change="changeCartQty($event, product.id)"
                                    />
                                    шт. / {{ product.qty }} шт.
                                </span>
                                <span
                                    class="numerals"
                                    :class="{ 'red-numbers': !isGrow, 'green-numbers': isGrow }"
                                >
                                    {{ Number(product.priceRub).toFixed(2) | currency }} / шт.
                                </span>
                                <div class="numerals">
                                    <span
                                        class="delete-btn"
                                        @click="deleteFromCartItems(product.id)"
                                    >
                                        Удалить
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="cart__result" v-if="cartProducts.length">
                            Общая стоимость:
                            <span
                                class="cart__result__cost"
                                :class="{ 'red-numbers': !isGrow, 'green-numbers': isGrow }"
                            >
                                {{ Number(cartAllCost).toFixed(2) | currency }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
export default {
    props: {
        isCartOpen: {
            type: Boolean,
            default: () => false,
        },
    },
    data() {
        return {}
    },
    computed: {
        products() {
            return this.$store.getters["products"]
        },
        cartItems() {
            return this.$store.getters["cartItems"]
        },
        cartProducts() {
            return this.$store.getters["cartProducts"]
        },
        cartAllCost() {
            return this.$store.getters["cartAllCost"]
        },
        isGrow() {
            return this.$store.getters["isGrow"]
        },
    },
    watch: {
        cartItems: {
            immediate: true,
            deep: true,
            handler: function () {
                this.$store.dispatch("getCartProducts")
                this.getAllCost()
            },
        },
    },
    mounted() {
        this.getAllCost()
    },
    methods: {
        getAllCost() {
            this.$store.dispatch("getCartAllCost")
        },
        toggleCart(e) {
            e.stopPropagation()
            this.$emit("toggle:cart")
        },
        stopPropagation(event) {
            event.stopPropagation()
        },
        deleteFromCartItems(productId) {
            this.$store.dispatch("removeFromCartItems", productId)
        },
        changeCartQty(e, productId) {
            this.getAllCost()
        },
    },
}
</script>

<style lang="scss">
.cart-transition-enter-active,
.cart-transition-leave-active {
    transition: all 0.3s ease;
}

.cart-transition-enter,
.cart-transition-leave-to {
    opacity: 0;
    transform: translateX(100px);
}
</style>
