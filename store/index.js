// import data from "~/assets/data/data.json"

export const state = () => ({
    products: [],
    groups: [],
    activeGroupId: 0,

    usdRate: 60,
    isGrow: undefined,

    cartItems: [],
    cartProducts: [],
    cartAllCost: 0,
})

export const getters = {
    products: state => state.products,
    productsWithGroup: state => {
        const productsTmp = state.products

        if (state.activeGroupId === 0) return productsTmp
        return productsTmp.filter(item => item.group.id === state.activeGroupId)
    },
    groups: state => state.groups,
    activeGroupId: state => state.activeGroupId,

    usdRate: state => state.usdRate,
    isGrow: state => state.isGrow,

    cartItems: state => state.cartItems,
    cartProducts: state => state.cartProducts,
    cartAllCost: state => state.cartAllCost,
}

export const mutations = {
    SET_PRODUCTS(state, payload) {
        state.products = payload
    },
    SET_GROUPS(state, payload) {
        state.groups = payload
    },
    SET_ACTIVE_GROUP_ID(state, payload) {
        state.activeGroupId = payload
    },

    SET_USD_RATE(state, payload) {
        state.usdRate = payload
    },
    SET_IS_GROW(state, payload) {
        state.isGrow = payload
    },

    SET_CART_ITEMS(state, payload) {
        state.cartItems = payload
    },
    SET_CART_PRODUCTS(state, payload) {
        state.cartProducts = payload
    },
    SET_CART_ALL_COST(state, payload) {
        state.cartAllCost = payload
    },
}

export const actions = {
    getDataFromJson({ commit, getters }) {
        const data = require(`~/assets/data/data.json`)
        const names = require(`~/assets/data/names.json`)

        let groups = []
        let productNames = []
        let productsTransformed = []

        //Поучение групп
        Object.keys(names).forEach(key => {
            const groupItem = {
                id: +key,
                title: names[key].G,
            }

            groups.push(groupItem)
        })

        //Поучение списка именований товаров
        groups.forEach(item => {
            Object.keys(names[item.id].B).forEach(key => {
                const productName = {
                    id: +key,
                    title: names[item.id].B[key].N,
                }

                productNames.push(productName)
            })
        })

        //Преобразованные товары
        data.Value.Goods.forEach(item => {
            const newProduct = {
                id: item.T,
                title:
                    productNames.find(productNamesItem => productNamesItem.id == item.T)?.title ??
                    "",
                group: {
                    id: item.G,
                    title: groups.find(groupsItem => groupsItem.id == item.G)?.title ?? "",
                },
                priceUsd: +item.C,
                priceRub: +item.C * getters.usdRate,
                qty: +item.P,
            }

            productsTransformed.push(newProduct)
        })

        commit("SET_GROUPS", groups)
        commit("SET_PRODUCTS", productsTransformed)
    },

    setActiveGroup({ commit }, newActiveGroupId) {
        commit("SET_ACTIVE_GROUP_ID", newActiveGroupId)
    },

    setUsdRate({ commit }, newUsdRate) {
        commit("SET_USD_RATE", newUsdRate)
    },
    newUsdRate({ commit, getters }) {
        const max = 80
        const min = 20
        const newUsdRate = Math.random() * (max - min) + min

        let isGrow = undefined

        if (newUsdRate > getters.usdRate) isGrow = true
        if (newUsdRate < getters.usdRate) isGrow = false

        commit("SET_USD_RATE", Number(newUsdRate).toFixed(0))
        commit("SET_IS_GROW", isGrow)
    },

    addToCartItems({ commit, getters }, itemId) {
        let newItems = [...getters.cartItems]

        const foundItem = newItems.find(item => item === itemId)
        if (foundItem) return

        newItems.push(itemId)

        commit("SET_CART_ITEMS", newItems)
    },

    removeFromCartItems({ commit, getters }, itemId) {
        let newItems = [...getters.cartItems]

        newItems = newItems.filter(item => item !== itemId)

        commit("SET_CART_ITEMS", newItems)
    },

    getCartAllCost({ commit, getters }) {
        const cost = getters.cartProducts.reduce(
            (sum, item) => sum + item.cartQty * item.priceRub,
            0
        )

        commit("SET_CART_ALL_COST", cost)
    },
    getCartProducts({ commit, getters }) {
        let productsTmp = getters.products.filter(item =>
            getters.cartItems.find(cartitem => cartitem === item.id)
        )

        productsTmp.forEach(item => {
            item.cartQty = 1
        })

        commit("SET_CART_PRODUCTS", productsTmp)
    },
}
