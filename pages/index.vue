<template>
  <section>
    <!-- Search box with image in background -->
    <search-box />

    <!-- Parts Icon Set -->
    <home-parts />

    <!-- Brand Icon section -->
    <home-brands />
    <div class="container">
      <h2 class="title has-text-centered">Our Services</h2>
      <div class="columns is-multiline special-service">
        <div class="column is-5">
          <!-- Services -->
          <home-services />
        </div>
        <div class="column is-7">
          <!-- Special Category -->
          <home-specials />
        </div>
      </div>
    </div>

    <!-- Featured Product -->
    <div class="container">
      <h2 class="title has-text-centered">Top Parts</h2>
      <div class="columns is-multiline">
        <div class="column is-3" v-for="(p,i) in products" :key="i">
          <product :item="p"/>
        </div>
        <div class="column is-12">
          <div class="field is-grouped is-grouped-centered load-more">
            <p class="control">
              <button class="button is-rounded" @click="moreTopParts">View All</button>
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>

</template>
<style>
.load-more .button {
  width: 160px;
}
</style>


<script>
import SearchBox from '~/components/SearchBox.vue'
import HomeParts from '~/components/HomeParts.vue'
import HomeBrands from '~/components/HomeBrands.vue'
import HomeSpecials from '~/components/HomeSpecials.vue'
import HomeServices from '~/components/HomeServices.vue'
import Product from '~/components/Product.vue'
import {mapActions} from 'vuex'

export default {
  async fetch({store}) {
    await store.dispatch('home/addParts')
    await store.dispatch('home/addTopParts')
    await store.dispatch('home/addTopBrands')
    await store.dispatch('home/fetchAllCarParts')
  },
  data() {
    return {
      
    }
  },
  computed: {
    products() {
      return this.$store.state.home.topParts;
    }
  },
  components: {
    SearchBox,
    HomeParts,
    HomeBrands,
    HomeSpecials,
    HomeServices,
    Product
  },
  methods: {
    ...mapActions('home', ['addTopParts', 'partCategory', 'brand']),
    moreTopParts () {
      this.$router.push('products/top/brand/all')
    }
  }
}
</script>


