<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>
      
      <h1 class="content__title">
        Заказ оформлен <span>№ {{$route.params.id}}</span>
      </h1>
    </div>
    
    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>
          
          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{$store.state.orderInfo.name}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{$store.state.orderInfo.address}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{$store.state.orderInfo.phone}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{$store.state.orderInfo.email}}
              </span>
            </li>
          </ul>
        </div>
        
        <div class="cart__block">
          <ul class="cart__orders">
            <CardOrderItem v-for="item in $store.state.orderProducts.orderProducts" :key="item.product.id" :item="item"></CardOrderItem>
          </ul>
          <div class="cart__total">
            <p>Доставка: <b>{{$store.state.sendPrice.value}} ₽</b></p>
            <p>Итого: <b>3</b> товара на сумму <b>{{ ($store.state.orderProducts.orderProductsPrice + $store.state.sendPrice.value)| numberFormat}} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CardOrderItem from '../components/CardOrderItem'
import {mapGetters} from 'vuex'
import numberFormat from '@/helpers/numberFormat'
export default {
  name: "OrderInfoPage",
  components: {CardOrderItem},
  filters: {numberFormat},
  created () {
    if(this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id){
      return;
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.id)
  },
  computed: {
    ...mapGetters({products: 'cartDetailProducts', totalPrice: 'cartTotalPrice'}),
  },
}
</script>

<style scoped>

</style>