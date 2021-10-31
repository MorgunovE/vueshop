<template>
  <main class="content container">
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
          <img width="570" height="570" :src="product.image" :srcset="product.image.split('.')[0]+'@2x.jpg 2x'"
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
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-item" value="blue" checked="">
                    <span class="colors__value" style="background-color: #73B6EA;">
                    </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-item" value="yellow">
                    <span class="colors__value" style="background-color: #FFBE15;">
                    </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-item" value="gray">
                    <span class="colors__value" style="background-color: #939393;">
                  </span></label>
                </li>
              </ul>
            </fieldset>
            
            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>
              
              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128" checked="">
                    <span class="sizes__value">
                      128gb
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
              
              <button class="button button--primery" type="submit">
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>
        
        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>
          
          <a href="#">
            Все характеристики
          </a>
          
          <h3>Что это?</h3>
          
          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки, сделав их
            максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+, объединяя полученную с
            них информацию. Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное
            устройство можно установить как фирменное приложение, так и различные приложения сторонних разработчиков.
            Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников. Эта информация
            позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
          </p>
          
          <h3>Дизайн</h3>
          
          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм.
            что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика. На обращенной к
            пользователю стороне расположен дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость, а
            также полученная со смартфона и синхронизированных датчиков информация: интенсивность, скорость вращения
            педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень защиты от
            влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут)
            погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import products from '@/data/products'
import categories from '@/data/categories'
import goToPage from '@/helpers/goToPage'
import numberFormat from '@/helpers/numberFormat'

export default {
  name: "ProductPage",
  data() {
    return {
      productAmount: 1,
    }
  },
  // props: ['pageParams'],
  filters: {
    numberFormat
  },
  computed: {
    product() {
      // return products.find(product => product.id === this.pageParams.id)
      return products.find(product => product.id === +this.$route.params.id)
    },
    category() {
      return categories.find(category => category.id === this.product.categoryId)
    }
  },
  methods: {
    goToPage,
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
      this.$store.commit(
        'addProductToCart',
        {productId: this.product.id, amount: this.productAmount}
      )
    }
  },
}
</script>

<style scoped>

</style>