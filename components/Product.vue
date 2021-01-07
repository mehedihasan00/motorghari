<template>
  <div>
   
    <div  class="product-box">
      <nuxt-link :to="`/details/${this.item.slug}`">
      <div class="product-image"  @click="goDetails">
        <span class="helper"></span>
        <img :src="`${imageUrl}/carparts/lg/${item.part_image[0]}`" alt="" />
      </div>
    </nuxt-link>
 
        <div class="details">
            <nuxt-link :to="`/details/${this.item.slug}`">
              <div>
                  <h2 style="cursor: pointer" @click="goDetails" class="product-title">{{item.part_name}}</h2>
                  <p><b>{{item.vendor_name}}</b></p>
              </div>
            </nuxt-link>
            <div class="columns is-mobile product-cart">
              <div class="column is-8 is-8-mobile">
                <h1 class="price-tag">TK {{item.price}}</h1>
              </div>
           
              <div class="column is-4 is-4-mobile">
                <button class="button is-warning round-button" @click="addToCart()" >
                  <i class="fas fa-shopping-cart"></i>
                </button>
              </div>
            </div>
          
          </div>
    
       
    </div>
    <div class="modal" :class="{'is-active': show}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <h1 class="subtitle">Add home installation service charge  <b>{{item.serviceCharge}} tk ?</b></h1>

        <div class="buttons is-right">
          <button class="button" @click="addToCartWithService()" >
            Yes
          </button>&nbsp;&nbsp;
          <button class="button is-warning round-button" @click="addToCart()" >
            No
          </button>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="show=false"></button>
    </div>
  </div>
</template>
<style>
  .product-image img {
    cursor: pointer;
  }
  .modal-content {
    background: #fff;
    border-radius: 7px;
    padding: 50px;
  }
  .modal-content button {
    width: 90px;
  }
  .modal-content .subtitle {
    padding-bottom: 30px;
  }
</style>

<script>
import {increaseViewCount} from '~/api/mg-api'

export default {
  props: ['item'],
  data() {
      return {
        show: false,
        modal: false,
        imageUrl: process.env.imageUrl
      }
    },
  methods: {
    addToCartWithService () {
      console.log("this.item", this.item)
      this.$store.dispatch('home/addCartService', this.item)
      this.$toaster.warning('Successfully added to cart.')
      this.show = false
      this.modal = false
    },
    addToCart () {
      this.$store.dispatch('home/addCart', this.item)
      this.$toaster.warning('Successfully added to cart.')
      this.show = false
    },
    async goDetails() {
      await increaseViewCount(null, this.item.slug, 'parts')
      this.$router.push(`/details/${this.item.slug}`)
    }
  }
}
</script>

