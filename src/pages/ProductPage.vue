<template>
  <main class="content container" v-if="productLoading">Loading products...</main>
  <main class="content container" v-else-if="!productsData">Error, We sorry <button @click.prevent="loadProduct">Try again</button></main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <!--          <a class="breadcrumbs__link" href="#" @click.prevent="goToPage('main')">-->
          <!--          <a class="breadcrumbs__link" href="#/">-->
          <!--            Каталог-->
          <!--          </a>-->
          <!--          <router-link tag="button" class="breadcrumbs__link" to="/">-->
          <!--            Каталог-->
          <!--          </router-link>-->
          <router-link class="breadcrumbs__link" :to="{name:'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <!--          <a class="breadcrumbs__link" href="#" @click.prevent="goToPage('main')">-->
          <a class="breadcrumbs__link" @click.prevent="$router.push({name:'main'})">
            {{ category.title }}
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>
    
    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image.file.url"
               :alt="product.title">
        </div>
        <!--        <ul class="pics__list">-->
        <!--          <li class="pics__item">-->
        <!--            <a href="" class="pics__link pics__link&#45;&#45;current">-->
        <!--              <img width="98" height="98" src="img/phone-square-1.jpg" srcset="img/phone-square-1@2x.jpg 2x"-->
        <!--                   alt="Название товара">-->
        <!--            </a>-->
        <!--          </li>-->
        <!--          <li class="pics__item">-->
        <!--            <a href="" class="pics__link">-->
        <!--              <img width="98" height="98" src="img/phone-square-2.jpg" srcset="img/phone-square-2@2x.jpg 2x"-->
        <!--                   alt="Название товара">-->
        <!--            </a>-->
        <!--          </li>-->
        <!--          <li class="pics__item">-->
        <!--            <a href="" class="pics__link">-->
        <!--              <img width="98" height="98" src="img/phone-square-3.jpg" srcset="img/phone-square-3@2x.jpg 2x"-->
        <!--                   alt="Название товара">-->
        <!--            </a>-->
        <!--          </li>-->
        <!--          <li class="pics__item">-->
        <!--            <a class="pics__link" href="#">-->
        <!--              <img width="98" height="98" src="img/phone-square-4.jpg" srcset="img/phone-square-4@2x.jpg 2x"-->
        <!--                   alt="Название товара">-->
        <!--            </a>-->
        <!--          </li>-->
        <!--        </ul>-->
      </div>
      
      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCArt">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>
            
            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="color in product.colors" :key="color.id">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-item" :value="color.title" checked="">
                    <span class="colors__value" :style="{ 'background-color': color.code}">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>
            
            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар" @click.prevent="reduceItem">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>
                
                <input type="text" v-model.number="productAmount">
                
                <button type="button" aria-label="Добавить один товар" @click.prevent="addItem">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>
              
              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>
            </div>
            <div v-show="productAdded">Item added to Cart</div>
            <div v-show="productAddSending">Adding item to Cart...</div>
          </form>
        </div>
      </div>
      
    </section>
  </main>
</template>

<script>
// import products from '@/data/products'
// import categories from '@/data/categories'
import goToPage from '@/helpers/goToPage'
import numberFormat from '@/helpers/numberFormat'
import axios from 'axios'
import {API_BASE_URL, API_PRODUCTS} from '../config'
import {mapActions} from 'vuex'
export default {
  name: "ProductPage",
  data() {
    return {
      productAmount: 1,
      productsData: null,
      productLoading: false,
      productLoadingFailed: false,
      
      productAdded: false,
      productAddSending: false,
    }
  },
  // props: ['pageParams'],
  filters: {
    numberFormat
  },
  computed: {
    product() {
      // return products.find(product => product.id === this.pageParams.id)
      // return products.find(product => product.id === +this.$route.params.id)
      return this.productsData
    },
    category() {
      // return categories.find(category => category.id === this.product.categoryId)
      return this.productsData.category
    }
  },
  // created() {
  //   this.loadProduct()
  // },
  watch: {
    '$route.params.id': {
      handler(){
        this.loadProduct()
      },
      immediate: true
    }
  },
  methods: {
    goToPage,
    loadProduct() {
      this.productLoading = true
      this.productLoadingFailed = false
      axios.get(API_BASE_URL+API_PRODUCTS +'/'+this.$route.params.id)
      .then(response => this.productsData = response.data)
      .catch(()=>this.productLoadingFailed= true)
      .then(()=>this.productLoading = false)
    },
    addItem() {
      this.productAmount++
    },
    reduceItem() {
      if (this.productAmount > 0) {
        this.productAmount--
      }
    },
    addToCArt() {
      // this.$store.state.cartProducts.push(
      //   {productId: this.product.id, amount: this.productAmount}
      // )
      
      // this.$store.commit(
      //   'addProductToCart',
      //   {productId: this.product.id, amount: this.productAmount}
      // )
      this.productAdded = false
      this.productAddSending = true
      this.addProductToCart({productId: this.product.id, amount: this.productAmount})
      .then(()=>{
        this.productAdded = true
        this.productAddSending = false
      })
    },
    ...mapActions(['addProductToCart'])
  },
}
</script>

<style scoped>

</style>