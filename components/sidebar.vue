<template>
    <div class="sidebar">
        <h3 class="sidebar__heading">
            <span>Каталог</span>
            <span class="sidebar__heading__cart" @click="toggleCart">
                Корзина
                <span v-if="cartItems.length" class="sidebar__heading__cart__qty">
                    {{ cartItems.length }}
                </span>
            </span>
        </h3>
        <ul class="sidebar-menu">
            <li class="sidebar-menu__item">
                <a
                    class="link"
                    :class="{ link_active: activeGroupId === 0 }"
                    @click.prevent="openGroup(0)"
                >
                    Все товары
                </a>
            </li>
            <li class="sidebar-menu__item" v-for="(group, index) in groups" :key="index">
                <a
                    class="link"
                    :class="{ link_active: activeGroupId === group.id }"
                    @click.prevent="openGroup(group.id)"
                >
                    {{ group.title }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        activeGroupId: {
            type: Number,
            default: () => 0,
        },
    },
    data() {
        return {}
    },
    computed: {
        groups() {
            return this.$store.getters["groups"]
        },
        cartItems() {
            return this.$store.getters["cartItems"]
        },
    },
    methods: {
        openGroup(groupId) {
            this.$emit("open:group", groupId)
        },
        toggleCart() {
            this.$emit("toggle:cart")
        },
    },
}
</script>

<style></style>
