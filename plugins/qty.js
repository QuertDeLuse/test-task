import Vue from "vue"

const qty = value => {
    return `${value} шт.`
}
Vue.filter("qty", qty)
