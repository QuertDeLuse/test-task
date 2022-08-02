import Vue from "vue"

const currency = value => {
    return `${value} ₽`
}
Vue.filter("currency", currency)
