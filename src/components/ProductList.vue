<template>
  <ul class="catalog__list">
<!--    <ProductItem v-for="product in products" :product="product" :key="product.id" @goToPage="(pageName, pageParams)=>$emit('goToPage', pageName, pageParams)"></ProductItem>-->
    <ProductItem v-for="product in products" :product="product" :key="product.id"></ProductItem>
  </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem'
export default {
  name: "ProductList",
  components: {ProductItem},
  props: ['products']
}
</script>

<style scoped>

</style>