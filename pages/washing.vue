<template>
  <section>
    <product-title />
    <div class="container">
      <breadcrumb />
      <div class="wash-area">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h1 class="wash-title">Wash Your MotorGari at Your Place </h1><br>
            <div class="content box">
              <h3><b>Motorcycle Wash @ 400/- </b></h3>
              <ul>
                <li>High pressure water pre-wash</li>
                <li>Inside Air Pressure with Blower</li>
                <li>Wheel Brush & Clean </li>
                <li>Full Polish</li>
              </ul>
              <h3><b>Car Basic Wash @ 1199/- </b></h3>
              <ul>
                <li>High pressure water pre-wash</li>
                <li>Inside Air Pressure with Blower</li>
                <li>Car engine clean with Blower & Oil</li>
                <li>Wheel Brush & Clean</li>
                <li>Window clean & shine </li>
                <li>Car Polish</li>
              </ul>
              <h3><b>Car Super Wash @ 1999/- </b></h3>
              <ul>
                <li>High pressure water pre-wash</li>
                <li>Inside Air Pressure with Blower</li>
                <li>Car engine clean with Blower & Oil</li>
                <li>Wheel Brush & Clean</li>
                <li>Window clean & shine </li>
                <li>Car Polish</li>
                <li>Vacuum floor, mats, seats, doors clean</li>
                <li>Brush Body panels, grills, bumpers</li>
                <li>Dash board & console wipe</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
  .wash-title {
    text-align: center;
    font-size: 35px;
    font-weight: bold;
  }
  .wash-area {
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
      {title: 'Washing & Cleaning', url: '/washing'}
    ]
    store.commit('SET_BREAD_CRUMB', breadCrumbUrl)
    store.commit('SET_HEAD', ['Washing & Cleaning', ''])
    store.commit('SET_HEAD_SEARCH', true)
  },
  components: {
    ProductTitle,
    Breadcrumb
  }
}
</script>