<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a href="#" @click.prevent="paginateAdd(page)" class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled': page < 2}" aria-label="Предыдущая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a href="#" class="pagination__link" :class="{' pagination__link--current': pageNumber === page}" @click.prevent="paginate(pageNumber)">
        {{pageNumber}}
      </a>
    </li>
    <li class="pagination__item">
      <a @click.prevent="paginateReduce(page)" class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled' : page === pages}" href="#" aria-label="Следующая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "BasePagination",
  model:{
    prop: 'page',
    event: 'paginate'
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pages(){
      return Math.ceil(this.count / this.perPage)
    }
  },
  methods: {
    paginate(page){
      this.$emit('paginate', page)
    },
    paginateAdd(page){
      if(page > 1) {
        page--
        this.paginate(page)
      }
    },
    paginateReduce(page){
      if(page < this.pages) {
        page++
        this.paginate(page)
      }
    }
  },
}
</script>

<style scoped>

</style>