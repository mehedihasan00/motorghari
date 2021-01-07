<template>
  <div class="brands-section">
    <h2 class="title has-text-centered">Our Brands</h2>
    <div class="shadowed" :style="{ 'background-position-y': `${pos}%`}">
      <div class="container">
        <slider class="brands-image-box" :options="{ freeScroll: true, contain: true, prevNextButtons: false }" ref="slider">
          <div class="brand-image"  v-for="(b, i) in brands" :key="i">
            <span class="helper"></span>
            <img v-lazy="`${imageUrl}/maker/sm/${b.logo_img[0]}`" alt="" :title="`${b.name}`"/>
          </div>
        </slider>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '~/components/Slider';
import {increaseViewCount} from '~/api/mg-api'
import {toKebabCase} from '../helper'
export default {
  data() {
    return {
      pos: 25,
      imageUrl: process.env.imageUrl
    }
  },
  components: {
    Slider
  },
  computed: {
    brands() {
      return this.$store.state.home.topBrands
    }
  },
  mounted () {
    const self = this
    this.$refs.slider.on('staticClick', (a, b, c, i) => {
      self.onBrandClick(self.brands[i].name, self.brands[i]._id)
    })
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const height = window.innerHeight || document.documentElement.clientHeight;
      const imagePos = this.$el.querySelector('.brands-section .shadowed').getBoundingClientRect()
      if (height >= imagePos.top && imagePos.bottom > 0) {
        var per = imagePos.top * (imagePos.height * 100 / height) / height;
        this.pos = 25 + per;
      }
    },
    async onBrandClick (brandName, makerId) {  
      increaseViewCount(makerId, null, 'maker')
      this.$router.push(`products/all/brand/${toKebabCase(brandName)}`)
    }
  }
}
</script>
<style>
.flickity-page-dots {
  bottom: -1.1rem;
}
/* dots are lines */
.flickity-page-dots .dot {
  height: 4px;
  width: 40px;
  margin: 0;
  border-radius: 0;
}

</style>