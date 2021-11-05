<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name:'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name:'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name:'order'}">
            Оформление заказа
          </router-link>
        </li>
      </ul>
      
      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{products.length}} товара
      </span>
    </div>
    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText title="ФИО" :error="formError.name" placeholder="Введите ваше полное имя"
                          v-model="formData.name">
            </BaseFormText>
            
            <BaseFormText title="Адрес доставки" :error="formError.address" placeholder="Введите ваш адрес"
                          v-model="formData.address">
            </BaseFormText>
            
            <BaseFormText title="Телефон" type="tel" :error="formError.phone" placeholder="Введите ваш телефон"
                          v-model="formData.phone">
            </BaseFormText>
            
            <BaseFormText title="Email" type="email" :error="formError.email" placeholder="Введи ваш Email"
                          v-model="formData.email">
            </BaseFormText>
            
            <BaseFromTextarea title="Комментарий к заказу" :error="formError.comment" placeholder="Ваши пожелания"
                              v-model="formData.comment"></BaseFromTextarea>
          </div>
          
          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="" v-model.number="sendPrice">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500" v-model.number="sendPrice">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="cart__block">
          <ul class="cart__orders">
            <CardOrderItem v-for="item in products" :key="item.product.id" :item="item"></CardOrderItem>
          </ul>
          
          <div class="cart__total">
            <p>Доставка: <b>{{sendPrice}} ₽</b></p>
            <p>Итого: <b>3</b> товара на сумму <b>{{(totalPrice + sendPrice) | numberFormat}} ₽</b></p>
          </div>
          
          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText'
import BaseFromTextarea from '@/components/BaseFromTextarea'
import CardOrderItem from '@/components/CardOrderItem'
import axios from 'axios'
import {API_BASE_URL, API_ORDERS} from '../config'
import {mapGetters} from 'vuex'
import numberFormat from '@/helpers/numberFormat'

export default {
  name: "OrderPage",
  components: {
    BaseFormText,
    BaseFromTextarea,
    CardOrderItem
  },
  filters: {numberFormat},
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
    }
  },
  computed: {
    ...mapGetters({products: 'cartDetailProducts', totalPrice: 'cartTotalPrice'}),
    sendPrice:{
      get(){
        return this.$store.state.sendPrice.value
      },
      set(value){
        this.$store.commit('updateSendPrice', {value})
      }
    }
  },
  methods: {
    order() {
      this.orderProducts()
      this.formError = {}
      this.formErrorMessage = ''
      axios.post(API_BASE_URL + API_ORDERS, {
        ...this.formData
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey
        }
      })
        .then(response => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data)
          this.$router.push({name: 'orderInfo', params: {id: response.data.id}})
        })
        .catch(error => {
          this.formError = error.response.data.error.request || {}
          this.formErrorMessage = error.response.data.error.message
        })
    },
    orderProducts(){
      this.$store.commit('updateOrderProducts', {orderProducts:this.products, orderProductsPrice: this.totalPrice})
    },
  },
}
</script>

<style scoped>

</style>