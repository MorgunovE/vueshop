<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{countProducts}} товара
      </span>
    </div>
    
    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
                     :category-id.sync="filterCategoryId"></ProductFilter>
      <section class="catalog">
        <div v-if="productsLoading">Loading Products...</div>
        <div v-if="productsLoadingFailed">Error, We sorry <button @click.prevent="loadProducts">Try again</button></div>
        <!--        <ProductList :products="products" @goToPage="(pageName, pageParams)=>$emit('goToPage', pageName, pageParams)"></ProductList>-->
        <ProductList :products="products"></ProductList>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"></BasePagination>
      </section>
    
    </div>
  </main>
</template>

<script>
// import products from '@/data/products'
import ProductList from '@/components/ProductList'
import BasePagination from '@/components/BasePagination'
import ProductFilter from '@/components/ProductFilter'
import axios from 'axios'
import {API_BASE_URL, API_PRODUCTS} from '../config'

export default {
  name: 'MainPage',
  components: {ProductList, BasePagination, ProductFilter},
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      
      page: 1,
      productsPerPage: 3,
      
      productsData: null,
      
      productsLoading: false,
      productsLoadingFailed: true
    }
  },
  methods: {
    loadProducts() {
      this.productsLoading = true
      this.productsLoadingFailed = false
      clearTimeout(this.loadProductsTimer)
      this.loadProductsTimer = setTimeout(() => {
        axios.get(API_BASE_URL + API_PRODUCTS, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
          }
        })
          .then(response => this.productsData = response.data)
          .catch(() => this.productsLoadingFailed = true)
          .then(() => this.productsLoading = false)
      }, 0)
    }
  },
  created() {
    this.loadProducts()
  },
  watch: {
    page() {
      this.loadProducts()
    },
    filterPriceFrom() {
      this.loadProducts()
    },
    filterPriceTo() {
      this.loadProducts()
    },
    filterCategoryId() {
      this.loadProducts()
    },
  },
  computed: {
    // filteredProducts(){
    //   let filteredProducts = products
    //   if(this.filterPriceFrom > 0){
    //     filteredProducts = filteredProducts.filter(product=> product.price > this.filterPriceFrom)
    //   }
    //   if(this.filterPriceTo > 0){
    //     filteredProducts = filteredProducts.filter(product=> product.price < this.filterPriceTo)
    //   }
    //   if(this.filterCategoryId){
    //     filteredProducts = filteredProducts.filter(product=> product.categoryId === this.filterCategoryId)
    //   }
    //   return filteredProducts
    // },
    products() {
      // const offset = (this.page - 1) * this.productsPerPage
      // return this.filteredProducts.slice(offset, offset + this.productsPerPage)
      return this.productsData
        ? this.productsData.items.map(product => {
          return {
            ...product,
            image: product.image.file.url
          }
        })
        : []
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0
    },
  }
}
</script>

<style scoped>

</style>