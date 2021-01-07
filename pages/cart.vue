<template>
  <section>
    <product-title />
    <div class="container">
      <breadcrumb />
      <div class="columns">
        <div class="column is-9">
          <nav class="panel">
            <p class="panel-heading">
              Your Cart ({{cartLength}})
            </p>
            <div class="cart-area"  v-for="(item, i) in localCart" v-bind:key="i">
              <div class="columns">
                <div class="column is-3">
                  <img v-lazy="`${imageUrl}/carparts/sm/${item.part_image}`">
                </div>
                <div class="column is-3">
                  <h2 class="item-name">{{item.part_name}}</h2><br><br>
                  <button class="button is-light is-margin" @click="removeCart(item, i)">Remove Item</button>
                </div>
                <div class="column is-4">
                  Quantity: <input id="the_number_input" @change="updatePrice(item, i, $event)" class="quantity" type="number" :max="item.baseQuantity" min="1" :value="item.quantity"><br><br>
                  <label v-if="!item.serviceStatus" class="checkbox">
                    <input type="checkbox" @click="updatePriceCarts(item)">
                    Include home service charge
                  </label>

                  <label v-else class="checkbox">
                    <input type="checkbox" checked @click="removePriceCarts(item)">
                    Included home service charge
                  </label>
                </div>
                <div v-if="item.servicePrice" class="column is-2 text-right">
                  TK {{item.price * item.quantity}}<br><br>
                  TK {{item.serviceCharge}}
                </div>
                <div v-else class="column is-2 text-right">
                  TK {{item.price * item.quantity}}<br><br>
                  TK {{item.serviceCharge}}
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div class="column is-3">
          <div class="summary">
            <h5 class="title is-5">SUMMARY</h5>
            <h6 class="title is-6">Subtotal<span class="fright">TK {{priceTotal}}</span></h6>
            <h6 class="title is-6">Home Service Charge <span class="fright">TK {{priceService}}</span></h6>
            <h6 class="title is-6">Estimated shipping <span class="fright">
              <span v-if="total > 3000"> Free</span>
              <span v-else> TK 100.00</span>
              </span></h6>
            <h6 class="title is-6">Tax<span class="fright">TK 00 .00</span></h6>
            <h5 class="title is-5">Total<span class="fright">TK {{total}}</span></h5>
            <div class="checkout">
              <nuxt-link class="checkout" to="checkout">Checkout</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .f14 {
    font-size: 14px;
  }
  .cart-area {
    border:1px solid #ddd;
    padding:20px
  }
  .item-name {
    font-size: 20px;
    font-weight:bold
  }
  .quantity {
    width: 100px;
    border: 1px solid #ddd;
  }
  .is-margin {
    margin-right: 10px;
  }
  .text-right {
    text-align: right;
  }
  .fright {
    float: right;
  }
  .summary {
    background:#333;
    border-radius:5px;
  }
  .summary .title {
    color:#fff;
    padding:18px;
    border-bottom:1px solid #ffd83d10;
    margin-bottom:0px;
    font-weight: normal;
  }
  .checkout {
    text-align:center;
    padding:20px;
    color: green
  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
  @media screen and (max-width: 500px) {
    .details {
      text-align: center;
    }
  }
</style>
<script>
import ProductTitle from '~/components/ProductTitle.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'
import {getCartMixins} from '../helper/mixins'

export default {
  mixins: [getCartMixins],
  async asyncData ({ store }) {
    let breadCrumbUrl = [
      {title: 'Cart', url: '/cart'}
    ]
    store.commit('SET_BREAD_CRUMB', breadCrumbUrl)
    store.commit('SET_HEAD', ['Cart', ''])
    store.commit('SET_HEAD_SEARCH', true)
    let headers = {
      'Content-Type': 'application/json'
    }
    return {
      cart: store.state.localCart || [],
      totalPrice: 0,
      serviceAdded: 0,
      totaltk: 0,
      quantity: 0,
      storeKeeper: null,
      imageUrl: process.env.imageUrl
    }
  },
  computed: {
    priceTotal () {
      let totalPrice = 0
      this.$store.state.home.localCart.map(item => {
        totalPrice += (item.quantity * item.price)
      })
      return totalPrice
    },
    total () {
      let totaltk = 0
      this.$store.state.home.localCart.map(item => {
        if(item.servicePrice) {
          totaltk += (item.quantity * item.price + item.serviceCharge)
        } else {
          totaltk += (item.quantity * item.price)
        }
      })
      return totaltk
    },
    priceService () {
      let serviceAdded = 0
      this.$store.state.home.localCart.map(item => {
        if(item.servicePrice) {
          serviceAdded += item.serviceCharge
        }
      })
      return serviceAdded
    },
    localCart () {
      return this.$store.state.home.localCart
    },
    cartLength () {
      return this.$store.state.home.localCart.length
    }
  },
  watch: {
    quantity() {
      let input = document.getElementById("the_number_input")
      input.addEventListener("mousewheel", function(event){ this.blur() })
    }
  },
  components: {
    ProductTitle,
    Breadcrumb
  },
  methods: {
    checkout () {
      this.$router.push('/checkout')
    },
    updatePriceCarts (part) {
      this.$store.dispatch('home/updatePriceCart', {item: part})
    },
    removePriceCarts (part) {
      this.$store.dispatch('home/removePriceCart', {item: part})
    },
    callUpdateHandler (...parameters) {
      let [item, i, event] = parameters
      if(item.servicePrice) {
        this.$store.dispatch('home/updateCartQtyPrice', {item: item, qty: event.target.value})
      } else {
        this.$store.dispatch('home/updateCartQty', {item: item, qty: event.target.value})
      }
    },
    removeCart (item, i) {
      this.$store.dispatch('home/removeCart', i)
      this.totalPrice = 0
      this.$store.state.home.localCart.map(item => {
        this.totalPrice += (item.quantity * item.price)
      })
      this.$toaster.success('Successfully removed.')
    }
  },
  subscriptions () {
    return {
      cartValueChange$: this.$createObservableMethod('updatePrice')
    }
  },
  created () {
    this.$watchAsObservable('cartValueChange$')
      .pluck('newValue')
      .debounceTime(500)
      .subscribe(parameters => this.callUpdateHandler(...parameters))
  }
}
</script>