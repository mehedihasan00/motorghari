<template>
  <div :class="{'dropdown-menu cart': true, 'visible': $store.state.isCartVisible }" id="dropdown-menu4">
    <div class="dropdown-content">
      <div class="dropdown-item drowdown-cart">
        <ul>
          <li class="cart-item-line" v-for="(item, i) in $store.state.home.localCart" v-bind:key="i">
            <div style="width:100%">{{item.part_name}} ({{item.quantity}})  <span class="is-pulled-right">TK {{item.quantity * item.price}}</span></div>
            <div style="width:100%" v-if="item.servicePrice">
              Home Service Charge <span class="is-pulled-right">TK {{item.serviceCharge}}</span> 
            </div> 
          </li>
          <li class="cart-item-line total">
            Total <span class="is-pulled-right"><b>TK {{priceTotal}}</b></span>
          </li>
        </ul>
        <div class="columns">
          <div class="column cart-btn">
            <button class="button is-rounded is-small is-pulled-right" @click="$store.commit('SET_CART_VISIBLE', false)">Close</button>
            <button class="button is-rounded is-small is-pulled-right" @click="gotoCart">View</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .cart-btn button{
    background: #ffd83d;
    border-color: #000;
  }
  .cart-item-line {
    display: inherit !important;
  }
  .cart-item-line.total span {
    margin-left: 0px !important;
  }
</style>
<script>
import {getCartMixins} from '../helper/mixins'
export default {
  mixins: [getCartMixins],
  computed: {
    priceTotal () {
      let totalPrice = 0
      this.$store.state.home.localCart.map(item => {
        if(item.servicePrice) {
          totalPrice += (item.quantity * item.price + item.serviceCharge)
        } else {
          totalPrice += (item.quantity * item.price)
        }
      })
      return totalPrice
    }
  },
  methods: {
    gotoCart() {
      this.$router.push('/cart');
      this.$store.commit('SET_CART_VISIBLE', false);
    }
  }
}
</script>
