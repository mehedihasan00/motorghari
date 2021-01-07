<template>
  <section>
    <product-title />
    <div class="container">
      <breadcrumb />
      <div class="interior-area">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h2 class="interior-title">Interior & Exterior</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
  .interior-title {
    text-align: center;
    font-size: 35px;
    font-weight: bold;
  }
  .interior-area {
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
      {title: 'Interior & Exterior', url: '/interior'}
    ]
    store.commit('SET_BREAD_CRUMB', breadCrumbUrl)
    store.commit('SET_HEAD', ['Interior & Exterior', ''])
    store.commit('SET_HEAD_SEARCH', true)
  },
  components: {
    ProductTitle,
    Breadcrumb
  }
}
</script>