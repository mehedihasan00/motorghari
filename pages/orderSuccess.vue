<template>
  <section>
    <div class="container order">
      <div class="columns is-multiline" >
        <div class="column is-3"></div>
        <!-- VALID -->
        <div v-if="orderStatus == 'VALID'" class="column is-6">
          <p>Payment success. Thank you for ordering and your order is under process.</p>
        </div>
        <!-- FAILED -->
        <div v-if="orderStatus == 'FAILED'" class="column is-6">
          <p>Payment has failed. please contact support</p>
        </div>
        <!-- VALID -->
        <div v-if="orderStatus == 'CANCELLED'" class="column is-6">
          <p>You have cancelled the payment process</p>
        </div>

      </div>
    </div>
  </section>
</template>
<style scoped>
  section {
    padding-top: 12px;
  }
  .order {
    background-color:#fff;
    padding:100px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    overflow:hidden
  }
  .danger {
    border: 1px solid red;
    border-radius: 5px;
  }
  p {
    font-size: 22px;
    text-align: center;
    color: #333;
  }
</style>

<script>
import {orderStatus} from '../api/payment.js'
    export default {
      async asyncData ({ store, query }) {

        return {
          orderStatus: query.status || null
        }
      },
      methods: {
        async paymentStatus () {
         let orderId = localStorage.getItem('oi')
         let order = await orderStatus(orderId)
         this.orderStatus = order && order.data
        },
        forgotPassword () {
          this.$router.push('reset')
        }
      },
      mounted() {
        this.paymentStatus();
      }
    }
  </script>
  