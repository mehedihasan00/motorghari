<template>
  <section>
    <product-title />
    <div class="container">
      <breadcrumb />
      <div class="arrival-area">
        <div class="columns is-multiline">
          <div class="column is-12">
            <div class="content box">
              <h2><b>Motorcycle Servicing Starts from 600/-</b></h2>
              <p>Features : </p>
              <ul>
                <li>Full Body wash & polish</li>
                <li>Engine oil change / ch</li>
                <li>Battery maintenance</li>
                <li>Air Filter check & clean / change</li>
                <li>Break maintenance</li>
                <li>Moving parts cleaning, lubing & greasin</li>
                <li>Tappet Adju</li>
                <li>Radiator maintenance</li>
                <li>Chain cleaning, lubing & greasing</li>
                <li>Fuel injector cleaning</li>
                <li>Ignition parts maintenance</li>
                <li>Carburetor tuning</li>
                <li>Tyre & wheel mai</li>
                <li>Suspension maintena</li>
                <li>Electric maintenance </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
  .arrival-title {
    text-align: center;
    font-size: 35px;
    font-weight: bold;
  }
  .arrival-area {
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
      {title: 'Parts & Bike Services', url: '/bike-services'}
    ]
    store.commit('SET_BREAD_CRUMB', breadCrumbUrl)
    store.commit('SET_HEAD', ['Parts & Bike Services', ''])
    store.commit('SET_HEAD_SEARCH', true)
  },
  components: {
    ProductTitle,
    Breadcrumb
  }
}
</script>