<template>
<section>
  <product-title />
  <div class="container">
    <breadcrumb />
    <div class="checkout-area">
       <div v-if="!authUser.address" class="column is-offset-2">
              <h3 >If you have an account please <a @click="ckLogin">Login</a> otherwise new account will be created</h3>
              <br/>
              <br/>
          </div>
      <div class="columns is-multiline">
        <div class="column is-9">
          
          <div class="columns is-multiline">
         
            <div class="column is-12" v-if="!authUser.address">
              <h1 class="checkout-title"><span>1</span> Shipping Address</h1>
            </div>
            <div class="column is-12" v-if="!authUser.address">
              <div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">* Billing Name</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control is-expanded has-icons-left">
                        <input v-model="checkoutForm.name" class="input" type="text" placeholder="Billing Name">
                      </p>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">*Email Address</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control is-expanded has-icons-left">
                        <input id="the_number_input" v-model="checkoutForm.email" class="input" type="email" placeholder="email address">
                      </p>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">*Phone Number</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control is-expanded has-icons-left">
                        <input id="the_number_input" v-model="checkoutForm.phoneNumber" class="input" type="number" placeholder="Phone Number">
                      </p>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">* Shipping Address</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control is-expanded has-icons-left">
                        <input v-model="checkoutForm.address" class="input" type="text" placeholder="Shipping Address">
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- continue button -->
            <div v-if="!authUser.address" class="column is-offset-2 is-12">
              <div class="columns is-gapless">
              <div class="column">
              </div>
              <div class="column">
              
              </div>
              <div class="column">

              </div>
              <div class="column">
                <span class="icon">
                 <a @click="checkLogin" class="has-text-success"> <i class="fas  fa-3x fa-check-circle"></i></a>
                </span>
              </div>
              </div>
            </div>
            <!-- User login pop up -->
            <div class="column is-6">
              <div v-bind:class="{ 'is-active': notLogedIn }" class="modal">
              <div class="modal-background"></div>
              <div class="modal-card column is-4">
                 <header class="modal-card-head">
                    <p class="modal-card-title"></p>
                    <button class="delete" @click="notLogedIn = false" aria-label="close"></button>
                  </header>
                <section class="modal-card-body ">
                  <input v-model="password" class="input" type="password" placeholder="Your  passowrd">
                </section>
                <footer class="modal-card-foot">
                <button @click="login" class="button is-success">Login</button>
                <button v-show="sendAgain" @click="resendPass" class="button">Resend</button>
              </footer>
                
              </div>
            </div>
             
            </div>
           
            <div class="column is-12" v-if="!authUser.address">
              <br><br>
              <h1 v-show="step.validAddress" class="checkout-title"><span>2</span> Vehicle Information</h1>
            </div>
            <div v-show="step.validAddress" class="column is-12" v-if="!authUser.address">
              <div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Registration Number</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control is-expanded">
                        <div class="select is-fullwidth">
                          <select v-model="district" placeholder="District">
                            <option v-for="item in districts" :key="item" :label="item" :value="item"></option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div class="field">
                      <div class="control is-expanded">
                        <div class="select is-fullwidth">
                          <select ref="vehicleClass" v-model="vClass" placeholder="Select" class="vselect">
                            <option v-for="item in vehicleClass" :key="item" :label="item" :value="item"></option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="field">
                      <p class="control is-expanded has-icons-left">
                        <input  id="series" class="input" ref="vehicleSeries" placeholder="series i.e 12" v-bind:class="{ danger: seriesWarning }" type="number" v-model="vSeries">
                      </p>
                    </div>
                    <div class="field">
                      <p class="control is-expanded has-icons-left">
                        <input id="reg" class="input" ref="vehicleRegistration" placeholder="Reg No i.e 1342" v-bind:class="{danger: regWarning}" type="number" v-model="vReg">
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
             <!-- continue button -->
            <div   class="column is-offset-2  is-12">
              <div class="columns is-gapless">
              <div class="column">
              </div>
              <div class="column">
              
              </div>
              <div class="column">

              </div>
              <div v-if="step.validAddress && !authUser.address" class="column">
                <span class="icon">
                 <a id="vehicleInfo" @click="checkVinformation" class="has-text-success"> <i class="fas  fa-3x fa-check-circle"></i></a>
                </span>
              </div>
              </div>
            </div>
            <!-- Payment section -->
            <div class="column is-12" v-if="!authUser.address">
              <br><br>
              <h1 v-show="step.validVehicle" class="checkout-title"><span>3</span> Payment Information</h1>
            </div>
            <div v-show="step.validVehicle" class="column is-12 ">
               <div class="columns is-multiline is-centered">
                  <div class="column is-2" v-for="(card, index) in supportedGateWays" :key="index">
                    <img style="cursor:pointer" @click="cardSelection(card)" class="card-logo" :src="card.logo" alt="">
                  </div>
               </div>
             
            </div>


            <!-- USER EXIST SHOW INFORMATION AS TEXT -->

            <!-- edit button -->
            <div  class="column is-12">
              <div class="columns is-gapless">
              <div class="column">
              </div>
              <div class="column">
              
              </div>
              <div class="column">

              </div>
              <div v-if="authUser.address && !changeInfo" class="column">
                <span class="icon">
                 <a @click="changeInfo = true" class="has-text-warning"> <i class="fas    fa-edit"></i></a>
                </span>
              </div>
              </div>
            </div>
            <!-- end button -->
            <div class="column is-12" v-if="authUser.address && !changeInfo">
              <p><b>Name: </b> &nbsp; &nbsp; {{authUser.name}}</p>
              <p><b>Phone Number: </b> &nbsp; &nbsp; {{authUser.phoneNumber}}</p>
              <p><b>Address: </b> &nbsp; &nbsp; {{authUser.address}}</p>
              <p>
                <b>Vehicle Details: </b> &nbsp; &nbsp; <i>District : &nbsp; </i> {{authUser.vehicleDetails.district}} &nbsp; &nbsp; <i>Series :&nbsp; </i>  {{authUser.vehicleDetails.vSeries}}
                &nbsp; &nbsp; <i>Reg No : &nbsp; </i> {{authUser.vehicleDetails.vReg}} &nbsp; &nbsp; <i>Class : &nbsp; </i> {{authUser.vehicleDetails.vClass}}
              </p>
            </div>

            <!-- EDIT INFO MODE -->
            <div class="column is-12" v-if="changeInfo">
              <h1 class="checkout-title"><span>1</span> Shipping Address</h1>
            </div>
            <div class="column is-12" v-if="changeInfo">
              <div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">* Billing Name</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control is-expanded has-icons-left">
                        <input v-model="checkoutForm.name" class="input" type="text" placeholder="Billing Name">
                      </p>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">*Phone Number</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control is-expanded has-icons-left">
                        <input v-model="checkoutForm.phoneNumber" class="input" type="number" placeholder="Phone Number">
                      </p>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">* Shipping Address</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <p class="control is-expanded has-icons-left">
                          <input v-model="checkoutForm.address" class="input" type="text" placeholder="Billing Address">
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
            <div class="column is-12" v-if="changeInfo">
               <br/>
              <br/>
              <h1 class="checkout-title"><span>2</span> Vehicle Information</h1>
            </div>
            <div  class="column is-12" v-if="changeInfo">
              <div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Registration Number</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control is-expanded">
                        <div class="select is-fullwidth">
                          <select v-model="district" placeholder="District">
                            <option v-for="item in districts" :key="item" :label="item" :value="item"></option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div class="field">
                      <div class="control is-expanded">
                        <div class="select is-fullwidth">
                          <select ref="vehicleClass" v-model="vClass" placeholder="Select" class="vselect">
                            <option v-for="item in vehicleClass" :key="item" :label="item" :value="item"></option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="field">
                      <p class="control is-expanded has-icons-left">
                        <input id="series" class="input" ref="vehicleSeries" placeholder="series i.e 12" v-bind:class="{ danger: seriesWarning }" type="number" v-model="vSeries">
                      </p>
                    </div>
                    <div class="field">
                      <p class="control is-expanded has-icons-left">
                        <input id="reg" class="input" ref="vehicleRegistration" placeholder="Reg No i.e 1342" v-bind:class="{danger: regWarning}" type="number" v-model="vReg">
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
               <!-- edit button -->
              
            <div  class="column is-12">
              <div class="columns is-gapless">
              <div class="column">
              </div>
              <div class="column">
              
              </div>
               <div class="column">
              
              </div>
              <div class="column">

              </div>
              <div class="column">

              </div>
              <div v-if="changeInfo" class="column">
                 <br/>
               <br/>
                <span class="icon">
                 <a @click="changeInfo = false" class="has-text-success"> <i class="fas  fa-3x  fa-check-circle"></i></a>
                </span>
              </div>
              </div>
            </div>
            <!-- end button -->

            <!-- Payment method -->
             <div class="column is-12" v-if="authUser.address">
              <br><br>
              <h1  class="checkout-title"><span>3</span> Payment Information</h1>
            </div>
            <div  class="column is-12" v-if="authUser.address">
              <div>
                <div v-for="(card, index) in supportedGateWays" :key="index">
                  <img :src="card.logo" alt="">
                </div>
              </div>
            </div>
        
          </div>
        </div>
        <!-- USER EXIST SHOW INFORMATION AS TEXT -->
        <div id='place-order' class="column is-3">
          <div class="summary">
            <h5 class="title is-5 sum-titile">{{$store.state.home.localCart.length}} Item</h5>
            <div class="cart" v-for="(item, i) in $store.state.home.localCart" v-bind:key="i">
              <div class="columns is-multiline">
                <div class="column is-3">
                  <img v-lazy="`${imageUrl}/carparts/sm/${item.part_image}`">
                </div>
                <div class="column is-9">
                  <div style="width:100%">
                    <span class="f11">{{item.part_name}} ({{item.quantity}})</span>
                    <span class="f11 is-pulled-right">TK {{item.quantity * item.price}}</span>
                  </div>
                  <div style="width:100%" v-if="item.servicePrice">
                    <span class="f11">Home Service Charge</span>
                    <span class="f11 is-pulled-right">TK {{item.serviceCharge}}</span>
                  </div>
                </div>

              </div>
            </div>
            <h6 class="title is-6">Total<span class="fright">{{priceTotal}} TK</span></h6>
            <h6 class="title is-6">Estimated shipping <span class="fright">
              <span v-if="priceTotal > 3000"> Free</span>
              <span v-else> TK 100.00</span>
              </span></h6>
            <h6 class="title is-6">Tax<span class="fright">00 TK</span></h6>
            <h5 class="title is-5 total">Total<span class="fright">{{priceTotal}} TK</span></h5><br>
            <div class="field p10">
              <div class="control">
                <label v-if="selectedCard.name" style="margin-bottom:10px" class="checkbox">
                  Your payment method is <b>{{selectedCard.name}}</b>
                </label>
                <label class="checkbox">
                  <input v-model="aggred" type="checkbox">
                  I agree to the terms and conditions
                </label>
              </div>
            </div>
            <div  class="button-area">
              <button :disabled="!aggred"  @click="checkout" class="button is-success">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<style scoped>
  .button.is-success {
    background: #ffd83d;
    color: #000;
  }
  .custom-field .field-body {
    margin-bottom: 25px;
  }
  .f11.is-pulled-right {
    padding-top: 5px;
  }
  .checkout-area {
    background-color:#fff;
    padding:20px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    overflow:hidden
  }
  .checkout-title {
    font-size:30px;
    width:100%;
    float:left;
    margin-bottom: 50px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .checkout-title span {
    font-size: 20px;
    border: 1px solid #ddd;
    border-radius: 100%;
    padding: 3px 10px;
  }
  .theme-btn {
    background-color: #ffd83d;
    color: #000;
  }
  .checkout-btn {
    text-align:center;
    padding-top:40px;
    padding-bottom:40px
  }
  .checkout-btn .is-danger {
    margin-right:10px
  }
  .summary {
    background:#333;
    border-radius:5px;
  }
  .sum-titile {
    color:#fff;
    padding:10px;
    border-bottom:1px solid #ffd83d;
    margin-bottom:0px;
    text-align:center
  }
  .cart {
    border-bottom:1px solid #ffd83d;
    padding:20px;
    color:#fff
  }
  .f11 {
    font-size: 11px;
  }
  .fright {
    float: right;
  }
  .title.is-6 {
    color:#fff;
    padding:16px;
    border-bottom:1px solid #ffd83d;
    margin-bottom:0px;
    font-size:10px;
  }
  .p10 {
    padding: 10px;
    padding-left: 15px;
  }
  .total {
    color:#fff;
    padding:16px;
    border-bottom:1px solid #ffd83d;
    margin-bottom:0px;
    font-size:13px;
  }
  .button-area {
    text-align:center;
    padding:20px;
    color:#fff;
  }
  .checkbox:hover, .radio:hover, .checkbox, .radio {
    color: #fff;
  }
  .danger {
    border: 1px solid red;
    border-radius: 5px;
  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
  .services {
    color: #ffd83d;
    font-size: 1rem;
  }
  .vselect {
    width: 120px !important;
  }
  .card-logo{
    max-width: 90%;
  }
  .sticky {
    position: fixed !important;
    top: 0;
    right: 200px;
    width: 335px;
  }
</style>
<script>
import ProductTitle from '~/components/ProductTitle.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'
import * as user from "../api/user"
import {getCartMixins} from '../helper/mixins'
import crypto from 'crypto'
import * as payment from '../api/payment.js'
export default {
  mixins: [getCartMixins],
  async asyncData ({req, store, query }) {
    let breadCrumbUrl = [
      {title: 'Checkout', url: '/checkout'}
    ]
    store.commit('SET_BREAD_CRUMB', breadCrumbUrl)
    store.commit('SET_HEAD', ['Checkout', ''])
    store.commit('SET_HEAD_SEARCH', true)
    let headers = {
      'Content-Type': 'application/json'
    }
    let authUser = ''
    if (store.state.auth.authUser) {
      authUser = store.state.auth.authUser.user
    }
    return {
      authUser,
      changeInfo: false,
      aggred: false,
      notLogedIn: false,
      step: {
        validAddress: false,
        validVehicle: false,
        validPayment: false
      },
      payment: {
        total_amount: null,
        currency: 'BDT',
        tran_id: crypto.createHash('md5').update(Date.now().toString()).digest('hex'),
      },
      selectedCard: {},
      supportedGateWays: [],
      password: "",
      imageUrl: process.env.imageUrl,
      sendAgain: false,
      checkoutForm: {
        name: authUser.name || '',
        address: authUser.address || '',
        phoneNumber: authUser.phoneNumber || '',
        email: authUser.email || ''
      },
      districts: ['B.BARIA', 'BAGERHAT', 'BANDARBAN', 'BARGUNA', 'BARISAL', 'BHOLA', 'BOGRA', 'CHANDPUR', 'CCHATTA METRO', 'CHITTAGONG', 'CHUADANGA', 'COMILLA', 'COXSBAZAR', 'DHAKA', 'DHAKA METRO', 'DINAJPUR', 'FARIDPURFENI', 'GAIBANDA', 'GAIBANDHA', 'GAZIPUR', 'GOPALGANJ', 'HABIGONG', 'JAIPURHAT', 'JESSORE', 'JHALAKATI', 'JHENIDAH', 'JHENIDHA', 'KHAGRACHARI', 'KHULNA', 'KKHULNA METRO', 'KISHOREGANJ', 'KURIGRAM', 'KUSHTIA', 'LAKSHMIPUR', 'LAXMIPUR', 'LALMONIRHAT', 'MADARIPUR', 'MAGURA', 'MANIKGANJ', 'MEHERPUR', 'MMOULAVIBAZAR', 'MOULVIBAZAR', 'MUNSHIGANJ', 'MYMENSINGH', 'NAOGAON', 'NARAIL', 'NARAYANGANJ', 'NARSINGDI', 'NATOR', 'NATORE', 'NAWABGANJ', 'NETRAKONA', 'NILPHAMARI', 'NOAKHALI', 'PABNA', 'PANCHAGAR', 'PATUAKHALI', 'POTUAKHALI', 'PIROJPUR', 'RAJBARI', 'RAJ METRO', 'RAJSHAHI', 'RANGAMATI', 'RANGPUR', 'SATKHIRA', 'SHARIATPUR', 'SHERPUR', 'SIRAJGONG', 'SIRAJGONJ', 'SUNAMGONJ', 'SYLHET', 'SSYLHET METRO', 'TANGAIL', 'THAKURGAON'],
      vehicleClass: ['A', 'AU', 'BA', 'BHA', 'CAA', 'CHA', 'DA', 'DAW', 'DHA', 'E', 'FA', 'GA', 'GHA', 'HA', 'JA', 'JHA', 'KA', 'KHA', 'LA', 'MA', 'NA', 'PA', 'RA', 'SA', 'SHA', 'TA', 'TAW', 'THA', 'U', 'WUA', 'ZA'],
      cart: [],
      headers,
      district: authUser.vehicleDetails ? authUser.vehicleDetails.district : '',
      vClass: authUser.vehicleDetails ? authUser.vehicleDetails.vClass : '',
      seriesWarning: false,
      regWarning: false,
      vSeries: authUser.vehicleDetails ? authUser.vehicleDetails.vSeries : '',
      vReg: authUser.vehicleDetails ? authUser.vehicleDetails.vReg : ''
    }
  },
  watch: {
    "checkoutForm.phoneNumber"() {
      let input = document.getElementById("the_number_input")
      input.addEventListener("mousewheel", function(event){ this.blur() })
    },
    district (value) {
      this.$refs.vehicleClass.focus()
    },
     vClass (value) {
      this.$refs.vehicleSeries.focus()
    },
    vSeries (value) {
      let input = document.getElementById("series")
      input.addEventListener("mousewheel", function(event){ this.blur() })
      if ((value.length > 0 && value.length < 2) || value.length > 2) {
        this.seriesWarning = true
      } else {
        this.seriesWarning = false
      }
      if (value.length === 2) {
        this.$refs.vehicleRegistration.focus()
      }
    },
    vReg (value) {
      let input = document.getElementById("reg")
      input.addEventListener("mousewheel", function(event){ this.blur() })
      if ((value.length > 0 && value.length < 4) || value.length > 4) {
        this.regWarning = true
      } else {
        this.regWarning = false
      }
    }
    
  },
  methods: {
    async getGetWays() {
      let host = window.location.host
      let params = {
        ...this.payment,
        total_amount: this.priceTotal,
        cus_name: this.checkoutForm.name,
        cus_phone: this.checkoutForm.phoneNumber,
        cus_email: this.checkoutForm.email,
        success_url: `http://${host}/orderSuccess`,
        fail_url: `http://${host}/orderSuccess?status=FAILED`,
        cancel_url: `http://${host}/orderSuccess?status=CANCELLED`
      }
      let cards = await payment.getWays(params)
      this.supportedGateWays = [...cards.data.desc]
    },
    ckLogin() {
      if (!this.$store.state.auth.authUser) {
      this.$router.push('/login')
      localStorage.setItem('ck', true)
    }
    },
    cardSelection(card) {
      this.selectedCard = card
    },
   async checkLogin() {
    if (!this.checkoutForm.name ||!this.checkoutForm.email || !this.checkoutForm.address || !this.checkoutForm.phoneNumber) {
         this.$toaster.error('provide all required field information')
        return
      }
     if (!this.$store.state.auth.authUser) {
        localStorage.setItem('ck', true)
       let result =  await user.signupWithPassword(this.checkoutForm.phoneNumber)
        this.getGetWays();
       if (result.data.success) {
          this.notLogedIn = true
          // new user creating show resend button after delay
         if (result.data.data == 'new'){
            setTimeout(() => { this.sendAgain = true }, 7000)
         }
       }
     } else {
       this.getGetWays();
       localStorage.setItem('oi', this.payment.tran_id)
       this.step.validAddress = true
     }
   },
   checkVinformation () {
     if (
        this.district
        && this.vSeries 
        && this.vReg 
        && this.vClass 
        && !this.seriesWarning 
        && !this.regWarning
       ) {
       this.step.validVehicle = true
     } else {
      
       this.$toaster.error("Provide vehicle information")
     }
   },
   async resendPass () {
      let result =  await user.resetPass(this.checkoutForm.phoneNumber)
      this.sendAgain = false
      setTimeout(() => { this.sendAgain = true }, 7000)
   },
    async login () {
          await this.$store.dispatch('auth/loginUser', {
            phoneNumber: this.checkoutForm.phoneNumber,
            password: this.password
          })
          if(this.$store.state.auth.isLoggedin) {
            this.getGetWays();
            this.$toaster.warning('Login Successfull.')
            this.notLogedIn = false
            this.authUser = this.$store.state.auth.authUser.user
            this.step.validAddress = true
          } else {
            this.$toaster.error('Login failed.')
          }
          setTimeout(() => { this.sendAgain = true }, 2000)
        },
    async checkout () {
      if (!this.selectedCard.name) {
        this.$toaster.error('Please select a payment method')
        return 
      }
      // send user to ssl commerz page
      window.location = this.selectedCard.redirectGatewayURL
      let checkoutDetials = {
        info: this.checkoutForm,
        order: this.$store.state.home.localCart,
        paymentMethod: this.selectedCard.name
      }
      let vehicleDetails = {
        district: this.district,
        vClass: this.vClass,
        vSeries: this.vSeries,
        vReg: this.vReg
      }
      checkoutDetials.info.vehicleDetails = vehicleDetails
      let response = await fetch(`http://admin.motorgari.shop/api/carts/onProgress`, {
        method: 'POST',
        body: JSON.stringify(checkoutDetials),
        headers: this.headers
      })
      let result = await response.json()
    }
  },
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
    },
    service () {
      let serviceCharge = 0
      this.$store.state.home.localCart.map(item => {
        serviceCharge = item.serviceCharge
      })
      return serviceCharge
    }
  },
  components: {
    ProductTitle,
    Breadcrumb
  },
  mounted(){
    let target = document.getElementById('place-order')
    console.log('here is target ', target.y)
    let targetPosition = target.getBoundingClientRect()
    window.addEventListener('scroll',function(){
      let height = window.scrollY
      if (height > targetPosition.y) {
        target.classList.add('sticky')
      }
      if (height < targetPosition.y) {
        target.classList.remove('sticky')
      }
    })
  }
}
</script>

