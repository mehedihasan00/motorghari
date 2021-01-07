<template>
  <section>
    <product-title />
    <div class="container">
      <breadcrumb />
      <div class="content-area">
        <div class="columns is-multiline">
          <div class="column is-12">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
  .content-area {
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
      {title: 'Shipping Rates', url: '/shipping'}
    ]
    store.commit('SET_BREAD_CRUMB', breadCrumbUrl)
    store.commit('SET_HEAD', ['Shipping Rates', ''])
    store.commit('SET_HEAD_SEARCH', true)
  },
  components: {
    ProductTitle,
    Breadcrumb
  }
}
</script>