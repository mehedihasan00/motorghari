<template>
    <section>
      <product-title />
      <div class="container">
        <breadcrumb />
        <div class="details-area">
          <div class="columns is-multiline">
            <div class="column is-7">
              <div class="columns">
                <div class="column is-12">
                  <!-- {{part.part_image[0]}} -->
                <figure class="image is-4by3">
                  <img  v-lazy="`${imageUrl}/carparts/lg/${part.part_image}`">
                </figure>
                </div>
              </div>
            </div>
            <div class="column is-5 quantity">
              <p><span class="price">BDT {{part.price}}</span></p>
              <br>
              <p>This item ship to anywhere in Bangladesh. Please check other sellers who may ship internationally.</p>
              <br>
              <b>Quantity </b> <input id="the_number_input" class="input" v-model="quantity" :max="part.quantity" min="1" type="number" ref="quantity"><br><br>
              <label class="checkbox" >
                <input v-model="services" type="checkbox">
                Include service charge {{part.serviceCharge}} BDT
              </label><br>
              <button v-if="services" class="button is-large theme-btn" @click="addToCartService(part)"> <i class="fa fa-shopping-cart cart-icon"></i>  Add to Cart</button>
              <button v-else class="button is-large theme-btn" @click="addToCart(part)"> <i class="fa fa-shopping-cart cart-icon"></i>  Add to Cart</button>
              <hr>
             
              <h2 class="subtitle">Delivery & Returns</h2>
              <p>1. Standard deliveries arrive in 3–11 days; we deliver 5 days a week.</p>
              <p>2. You can return your order for any reason, free of charge, within 30 days</p>
              <hr>
              <a href="#">Need Help</a>  Contact us with questions about motorgari.shop.
            </div>
            <div class="container">

              <div class="columns tab-area">
                <div class="column" style="border: 1px solid #ddd;">
                  <div class="tabs is-centered">
                    <ul>
                      <li :class="{'is-active': isOverview}" @click="isOverview=true"><a class="subtitle">Overview</a></li>
                      <li :class="{'is-active': !isOverview}" @click="isOverview=false"><a class="subtitle">Specification</a></li>
                    </ul>
                  </div>
                  <div class="tab-content" v-show="isOverview">
                    <div class="columns is-mobile">
                      <div class="column is-8 is-offset-2 is-12-mobile">
                        <h3 class="subtitle">
                          Description 
                        </h3>
                        <p v-html="part.description"></p>
                        <hr>
                        <h3 class="subtitle">Compatible with</h3>
                        <div v-if="part.belongs_to"> 
                          <p v-for="(p,i) in part.belongs_to" :key="i">
                            <b>For Brand:</b>{{p.maker_name}}<br>
                            <br><b>Model:</b>
                            <ul class="model-list">
                              <li>{{p.car_name}} <br> <span v-for="(y,i) in p.year" :key="i">{{y}}, &nbsp;</span></li>
                            </ul>
                            <br>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-content" v-show="!isOverview">
                    <div class="columns is-mobile">
                      <div class="column is-8 is-offset-2 is-12-mobile">
                        <p v-if="part.specs">
                          <span v-for="(p,i) in part.specs[0]" :key="i"> {{p}}</span><br>
                          <span v-for="(p,i) in part.specs[1]" :key="i"> {{p}}</span><br>
                          <span v-for="(p,i) in part.specs[2]" :key="i"> {{p}}</span><br>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h2 class="title has-text-centered">Recommended products</h2><br>
            
              <slider :options="{ freeScroll: true, contain: true, prevNextButtons: true }" class="recommended-product">
                <product v-for="(p, i) in recommnededProducts" :key="i" :item="p"/>
              </slider>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  <style scoped>
    .title {
      margin-top: 30px;
    }
    .vue-tabs .nav > li span.title {
      font-size: 1rem !important;
    }
    .details-title {
      text-align: center;
      font-size: 35px;
      margin-bottom: 1.5rem;
    }
    .details-area {
      background:#fff;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    .theme-btn {
      background-color: #ffd83d;
      color: #ff3e0a;
    }
    .details-img {
      width:100%;
      padding-right:20px
    }
    .details {
      border:1px solid #ddd; 
      padding:20px
    }
    .quantity {
      padding: 20px;
      padding-top: 7px;
    }
    .quantity #the_number_input {
      width:80px;
      height: 30px;
    }
    .quantity button {
      margin-top:20px;
    }
    .cart-icon {
      margin-right: 10px;
    }
    .price {
      font-size: 32px;
      color: #ff3e0a;
      font-weight: 500;
    }
    @media screen and (max-width: 768px) {
      .details, .quantity {
        text-align: center;
      }
      .details-img {
        padding-left: 20px;
      }
    }
    .model-list {
      list-style: disc;
      padding-left: 1.2rem;
    }
    
  </style>
  <style>
    .recommended-product .product-box {
      width: 14rem;
      margin: .5rem;
    }
    .flickity-page-dots {
      display: none !important;
    }
    .tab-area {
      margin-top: 100px;
      margin-bottom: 80px !important;
    }
    .cart-item-line.total span {
      margin-right: 0px !important;
    }
  </style>
  <script>
  import Slider from '~/components/Slider'
  import ProductTitle from '~/components/ProductTitle.vue'
  import Breadcrumb from '~/components/Breadcrumb.vue'
  import HomeParts from '~/components/HomeParts.vue'
  import Product from '~/components/Product.vue'
  import {recommnededProducts} from '~/api/product'
  import * as home from "~/api/home"
  import {mapActions} from 'vuex'
  
  export default {
    data() {
      return {
        quantity: '',
        isOverview: true,
        services: false,
        imageUrl: process.env.imageUrl
      }
    },
    async fetch({store, params}) {
      await store.dispatch('home/addTopParts')
     
      // await store.dispatch('home/addDetails',  params.name)
      // store.commit('SET_HEAD', [`Details of ${store.state.home.details.part}`])
    },
    async asyncData ({ store, params }) {
      let id = params.id
      let name = params.name
      let breadCrumbUrl = [
        {title: 'Product Details', url: `/details/${name}`}
      ]
      let dtls = await home.details(params.name)
      let recommended = await recommnededProducts(name)
      console.log('here is details ', dtls.data[0].part_image);
      store.commit('SET_BREAD_CRUMB', breadCrumbUrl)
      store.commit('SET_HEAD', [`Details of ${dtls.data[0].part}`])
      store.commit('SET_HEAD_SEARCH', true)
      return {
        part: dtls.data[0],
        recommnededProducts: recommended.data || []
      }
    },
    computed: {
      products() {
        return this.$store.state.home.topParts;
      }
    },
    watch: {
      quantity() {
        let input = document.getElementById("the_number_input")
        input.addEventListener("mousewheel", function(event){ this.blur() })
      }
    },
    components: {
      HomeParts,
      ProductTitle,
      Breadcrumb,
      Product,
      Slider
    },
    methods: {
      addToCart (part) {
        console.log('part is ', part);
        if (!this.quantity) {
          this.quantity = 1
        }
        this.$store.dispatch('home/updateCartQty', {item: part, qty: this.quantity})
        this.$toaster.warning('Successfully added to cart.')
      },
      addToCartService (part) {
        console.log('part is ', part);
        if (!this.quantity) {
          this.quantity = 1
        }
        this.$store.dispatch('home/updateCartQtyPrice', {item: part, qty: this.quantity})
        this.$toaster.warning('Successfully added to cart.')
      }
    },
    mounted () {
      if (localStorage.product) {
        this.$store.commit('home/set_product')
      }
    }
  }
  </script>