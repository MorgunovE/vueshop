import Vue from 'vue'
import Vuex from 'vuex'
// import products from '@/data/products'
import axios from 'axios'
import {API_BASE_URL, API_BASKETS, API_BASKETS_PRODUCTS} from '../config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
  },
  mutations: {
    // addProductToCart(state, payload){
    //   state.cartProducts.push({
    //     productId: payload.productId,
    //     amount: payload.amount,
    //   })
    // }
    // addProductToCart(state, {productId, amount}) {
    //   const item = state.cartProducts.find(item => item.productId === productId)
    //   if (item) {
    //     item.amount += amount
    //   } else {
    //     state.cartProducts.push({
    //       productId,
    //       amount,
    //     })
    //   }
    // },
    updateCartProductAmount(state, {productId, amount}) {
      const item = state.cartProducts.find(item => item.productId === productId)
      if (item) {
        item.amount = amount
      }
    },
    deleteCartProduct(state, productId) {
      // state.cartProducts = state.cartProducts.filter(item => item.productId !== productId)
      state.cartProducts = state.cartProductsData.filter(item=>item.product.id !== productId).map(item => {
        return {
          productId: item.product.id
        }
      })
    },
    addAmountToCart(state, productId) {
      const item = state.cartProducts.find(item => item.productId === productId)
      if (item) {
        item.amount++
      }
    },
    reduceAmountToCart(state, productId) {
      const item = state.cartProducts.find(item => item.productId === productId)
      if (item) {
        item.amount--
      }
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        }
      })
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find(p => p.product.id === item.productId).product
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url
          }
        }
      })
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0)
    }
  },
  actions: {
    loadCart(context) {
      return axios.get(API_BASE_URL + API_BASKETS, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(response => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey)
            context.commit('updateUserAccessKey', response.data.user.accessKey)
          }
          context.commit('updateCartProductsData', response.data.items)
          context.commit('syncCartProducts')
        })
    },
    addProductToCart(context, {productId, amount}) {
      return (new Promise(resolve => setTimeout(resolve, 0)))
        .then(() => {
          return axios.post(API_BASE_URL + API_BASKETS_PRODUCTS, {
            productId,
            quantity: amount
          }, {
            params: {
              userAccessKey: context.state.userAccessKey
            }
          })
            .then(response => {
              context.commit('updateCartProductsData', response.data.items)
              context.commit('syncCartProducts')
            })
        })
    },
    deleteProductToCart(context,{productId}){
      context.commit('deleteCartProduct', {productId})
      return axios.delete(API_BASE_URL + API_BASKETS_PRODUCTS,{
        data:productId, userAccessKey: context.state.userAccessKey
      }).then(response => {
        console.log(response)
      })
    },
    updateCartProductAmount(context, {productId, amount}){
      context.commit('updateCartProductAmount', {productId, amount})
      if(amount < 1){
        return;
      }
      return axios.put(API_BASE_URL + API_BASKETS_PRODUCTS, {
        productId,
        quantity: amount
      }, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items)
        })
        .catch(()=>{
          context.commit('syncCartProducts')
        })
    },
  },
  modules: {}
})
