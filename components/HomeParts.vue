<template>
    <div class="home-parts container">
      <div class="parts-image-box">
        <div class="carousel" ref="slider" >
          <a  href="javascript:" :class="{'selected': p[3]}" :title="p[1]" class="carousel-cell" v-for="(p, i) in parts" :key="i" :style="{'visibility': loaded ? 'visible': 'hidden' }">
            <div :class="{'parts-image': true }">
              <span class="helper"></span>
              <img v-lazy="`${imageUrl}/parts/sm/${p[2][0]}`" :alt="p[1]" />
            </div>
          </a>
        </div>
      </div>
    </div>
  </template>
  <style scoped>
    .title{
      margin-bottom: 8px;
    }
  </style>
  <script>
  import Slider from '~/components/Slider';
  import {increaseViewCount} from '~/api/mg-api'
  export default {
    data({env}) {
      return {
        loaded: false,
        imageUrl: process.env.imageUrl
      }
    },
    components: {
      Slider
    },
    computed: {
      parts() {
        return this.$store.state.home.partCats
      }
    },
    methods: {
      searchByImage(name) {
        this.$router.push(`products/${name}`)
      },
    },
    mounted() {
      const Flickity = require('flickity')
      this.flickity = new Flickity(this.$refs.slider, { freeScroll: true, contain: true, pageDots: false, prevNextButtons: false  })
      let self = this
      this.flickity.on( 'staticClick', (event, pointer, cellElement, i) => {
        self.goTo(self.parts[i][0])
      })
      this.loaded = true
      
      this.$store.watch(state => state.home.partCats, (old, newV) => {
        let pos = 0
        for (let i = 0; i < newV.length; i++) {
          if(newV[i][3]) {
            pos = i
            break
          }        
        }
        self.flickity.select(pos)
      })
    },
    methods: {
      async goTo(name) {
        await increaseViewCount(null, name, 'parts')
        this.$router.push(`/products/${name}/brand/all`)
      }
    }
  }
  </script>
  
  