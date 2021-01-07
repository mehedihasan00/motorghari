<template>
<section>
  <product-title />
  <div class="container">
    <breadcrumb />
    <div class="payment">
      <div class="columns is-multiline" >
        <div class="column is-12">
            <span class="payment-title">Welcome to payment section</span>
        </div>
        <div class="column is-6">
          <div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">* Billing Name</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <input class="input" type="text" placeholder="Billing Name">
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
                    <input class="input" type="number" placeholder="Phone Number">
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">*Vehicle Number</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <input class="input" type="number" placeholder="Phone Number">
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">* Billing Address</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <div class="select is-fullwidth">
                      <select>
                        <option></option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">*City</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <div class="select is-fullwidth">
                      <select>
                        <option></option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Vehicle details</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control is-expanded">
                    <div class="select is-fullwidth">
                      <select placeholder="District">
                        <option></option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <input class="input" ref="vehicleSeries" placeholder="series i.e 12" type="number" v-model="vSeries">
                  </p>
                </div>
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <input class="input" ref="vehicleRegistration" placeholder="Reg No i.e 1342" type="number" v-model="vReg">
                  </p>
                </div>
                <div class="field">
                  <div class="control is-expanded">
                    <div class="select is-fullwidth">
                      <select ref="vehicleClass" v-model="vClass" placeholder="Select">
                        <option></option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- USER EXIST SHOW INFORMATION AS TEXT -->
        <div class="column is-6">
          <p><b>Name: </b> &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;<el-button type="danger">Change Info</el-button></p>
          <p><b>Phone Number: </b> &nbsp; &nbsp;</p>
          <p><b>Vehicle Number: </b> &nbsp; &nbsp;</p>
          <p><b>Address: </b> &nbsp; &nbsp;</p>
          <p><b>City: </b> &nbsp; &nbsp;</p>
          <p>
            <b>Vehicle Details: </b> &nbsp; &nbsp; <i>District : &nbsp; </i> &nbsp; &nbsp; <i>Series :&nbsp; </i> 
            &nbsp; &nbsp; <i>Reg No : &nbsp; </i> &nbsp; &nbsp; <i>Class : &nbsp; </i>
          </p>
        </div>
        <div class="column is-12 pbtn">
          <a class="button mr10"></a>
          <a class="button">Card</a>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
  .mr10 {
    margin-right: 10px;
  }
  .pbtn {
    text-align:center;
    padding-top:40px;
    padding-bottom:40px
  }
  .payment {
    background-color:#fff;
    padding:20px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    overflow:hidden
  }
  .payment-title {
    font-size:30px;
    text-align:center;
    width:100%;
    float:left;
    padding-bottom: 40px;
    padding-top: 20px;
  }
  .danger {
    border: 1px solid red;
    border-radius: 5px;
  }
</style>
<script>
import ProductTitle from '~/components/ProductTitle.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'

export default {
  async asyncData ({ store }) {
    let breadCrumbUrl = [
      {title: 'Payment', url: '/payment'}
    ]
    store.commit('SET_BREAD_CRUMB', breadCrumbUrl)
    store.commit('SET_HEAD', ['Payment', ''])
    store.commit('SET_HEAD_SEARCH', true)
  },
 
  components: {
    ProductTitle,
    Breadcrumb
  }
}
</script>

