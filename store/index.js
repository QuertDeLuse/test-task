// import data from "~/assets/data/data.json"

export const state = () => ({
    products: [],
    groups: [],

    usdRate: 60,
    isGrow: undefined,

    cartItems: [],
    cartProducts: [],
    cartAllCost: 0,
})

export const getters = {
    products: state => state.products,
    groups: state => state.groups,

    usdRate: state => state.usdRate,
    isGrow: state => state.isGrow,

    cartItems: state => state.cartItems,
    cartProducts: state => state.cartProducts,
    cartAllCost: state => state.cartAllCost,
}

export const mutations = {
    SET_PRODUCTS(state, paylaod) {
        state.products = paylaod
    },
    SET_GROUPS(state, paylaod) {
        state.groups = paylaod
    },

    SET_USD_RATE(state, payload) {
        state.usdRate = payload
    },
    SET_IS_GROW(state, paylaod) {
        state.isGrow = paylaod
    },

    SET_CART_ITEMS(state, paylaod) {
        state.cartItems = paylaod
    },
    SET_CART_PRODUCTS(state, paylaod) {
        state.cartProducts = paylaod
    },
    SET_CART_ALL_COST(state, paylaod) {
        state.cartAllCost = paylaod
    },
}

export const actions = {
    setUsdRate({ commit }, newUsdRate) {
        commit("SET_USD_RATE", newUsdRate)
    },
    setIsGrow({ commit }, newValue) {
        commit("SET_IS_GROW", newValue)
    },

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
