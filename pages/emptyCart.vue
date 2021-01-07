<template>
  <section>
    <product-title />
    <div class="container">
      <breadcrumb />
      <div class="cart-area">
        <div class="columns is-multiline">
          <div class="column is-2"></div>
          <div class="column is-21 cart-title">
            <div><img src="../assets/cart.gif"></div>
            <div class="title">Your Shopping Cart is empty. <nuxt-link to="/" >Start Shoping Now</nuxt-link></div>
          </div>
          <div class="column is-1"></div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
  .cart-title {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    padding: 50px;
    width: 100%;
    display: inherit;
  }
  .cart-title .title {
    padding-top: 32px;
  }
  .cart-area {
    background:#fff;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
</style>
<script>
import ProductTitle from '~/components/ProductTitle.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'

export default {
  async asyncData ({ store }) {
    let breadCrumbUrl = [
      {title: 'Cart', url: '/emptyCart'}
    ]
    store.commit('SET_BREAD_CRUMB', breadCrumbUrl)
    store.commit('SET_HEAD', ['Cart', ''])
    store.commit('SET_HEAD_SEARCH', true)
  },
  components: {
    ProductTitle,
    Breadcrumb
  }
}
</script>