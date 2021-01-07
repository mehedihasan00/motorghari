<template>
  <section>
    <product-title />
    <div class="container">
      <breadcrumb />
      <div class="repair-area">
        <div class="columns is-multiline">
          <div class="column is-12">
            <table border="1" class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Service Description</th>
                  <th>car type</th>
                  <th>Garage service Charge</th>
                  <th>Total This Loss</th>
                </tr>
              </thead>
              
              <tbody>
                <!-- first -->
                <tr>
                  <td>General Service(Include mobile change, air filter change, cabin filter change, oil filter change, raditaor coolant change)</td>
                  <td>ALL Type of Car</td>
                  <td>200 tk</td>
                  <td>250 tk</td>
                </tr>
                <!-- second -->
                <tr>
                  <td rowspan="3">FRONT BRAKE SERVICING</td>
                  <td>Sedan</td>
                  <td>200</td>
                  <td>300</td>
                </tr>
                <tr>
                  <td>MPV</td>
                  <td>300</td>
                  <td>400</td>
                </tr>
                <tr>
                  <td>SUV</td>
                  <td>500</td>
                  <td>600</td>
                </tr>
                <!-- THIRD -->
                <tr>
                  <td rowspan="3">REAR BRAKE SERVICING</td>
                  <td>Sedan</td>
                  <td>300</td>
                  <td>400</td>
                </tr>
                <tr>
                  <td>MPV</td>
                  <td>400</td>
                  <td>500</td>
                </tr>
                <tr>
                  <td>SUV</td>
                  <td>600</td>
                  <td>700</td>
                </tr>
                <!-- FOURTH -->
                <tr>
                  <td rowspan="3">Suspension systems Front Shock Absorber check up With Necessary Change</td>
                  <td>Sedan</td>
                  <td>600</td>
                  <td>900</td>
                </tr>
                <tr>
                  <td>MPV</td>
                  <td>600</td>
                  <td>900</td>
                </tr>
                <tr>
                  <td>SUV</td>
                  <td>1500</td>
                  <td>2000</td>
                </tr>
                <!-- fifth -->
                <tr>
                  <td rowspan="3">Suspension system: Knuckle, Tie Rod, Ball Joint, Link Rod Check up with necessary Change </td>
                  <td>Sedan</td>
                  <td>1500</td>
                  <td>2000</td>
                </tr>
                <tr>
                  <td>MPV</td>
                  <td>2000</td>
                  <td>2200</td>
                </tr>
                <tr>
                  <td>SUV</td>
                  <td>4000</td>
                  <td>4500</td>
                </tr>
                <!-- sixth -->
                <tr>
                  <td rowspan="3">Hubs Assembly replacement (01 Pair)</td>
                  <td>Sedan</td>
                  <td>1000</td>
                  <td>1500</td>
                </tr>
                <tr>
                  <td>MPV</td>
                  <td>1000</td>
                  <td>1500</td>
                </tr>
                <tr>
                  <td>SUV</td>
                  <td>1500</td>
                  <td>2000</td>
                </tr>
                <!-- seven -->
                <tr>
                  <td rowspan="3">Power Steering Box Replacement</td>
                  <td>Sedan</td>
                  <td>1500</td>
                  <td>2000</td>
                </tr>
                <tr>
                  <td>MPV</td>
                  <td>1500</td>
                  <td>2000</td>
                </tr>
                <tr>
                  <td>SUV</td>
                  <td>2500</td>
                  <td>3000</td>
                </tr>
                <!-- eight -->
                <tr>
                  <td rowspan="3">Water Pump replacement</td>
                  <td>Sedan</td>
                  <td>500</td>
                  <td>600</td>
                </tr>
                <tr>
                  <td>MPV</td>
                  <td>1000</td>
                  <td>1200</td>
                </tr>
                <tr>
                  <td>SUV</td>
                  <td>1000</td>
                  <td>1200</td>
                </tr>
                <!-- nine -->
                <tr>
                  <td rowspan="3">Master Cylinder with Booster Replacement</td>
                  <td>Sedan</td>
                  <td>1000</td>
                  <td>1500</td>
                </tr>
                <tr>
                  <td>MPV</td>
                  <td>1000</td>
                  <td>1500</td>
                </tr>
                <tr>
                  <td>SUV</td>
                  <td>2000</td>
                  <td>2500</td>
                </tr>
                <!-- ten -->
                <tr>
                  <td rowspan="3">Raditor Change</td>
                  <td>Sedan</td>
                  <td>500</td>
                  <td>800</td>
                </tr>
                <tr>
                  <td>MPV</td>
                  <td>1000</td>
                  <td>1500</td>
                </tr>
                <tr>
                  <td>SUV</td>
                  <td>1000</td>
                  <td>1500</td>
                </tr>
                <!-- elevent -->
                <tr>
                  <td rowspan="3">Engine Mounting Change</td>
                  <td>Sedan</td>
                  <td>1200</td>
                  <td>1800</td>
                </tr>
                <tr>
                  <td>MPV</td>
                  <td>1200</td>
                  <td>2000</td>
                </tr>
                <tr>
                  <td>SUV</td>
                  <td>2500</td>
                  <td>3000</td>
                </tr>
                <!-- twelve -->
                <tr>
                  <td rowspan="3">Rear Suspension Restore</td>
                  <td>Sedan</td>
                  <td>600</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>MPV</td>
                  <td>2000</td>
                  <td>2500</td>
                </tr>
                <tr>
                  <td>SUV</td>
                  <td>2500</td>
                  <td>3000</td>
                </tr>

                <!-- Ac -->
                <tr>
                  <td rowspan="3"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>AC inspection charge</td>
                  <td>300</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>

                <!-- AC SERVICING In Garage -->
                <tr>
                  <td><b>AC SERVICING In Garage</b></td>
                  <td>Sedan</td>
                  <td>MPV</td>
                  <td>Suv</td>
                </tr>

                <!-- Ac2 -->
                <tr>
                  <td rowspan="2">Service Charge</td>
                  <td>1500</td>
                  <td rowspan="2">3000</td>
                  <td rowspan="2">4000</td>
                </tr>
                <tr>
                  <td>2500(With Dashboard opening)</td>
                </tr>

                <!-- AC3 -->
                <tr>
                  <td>Gas Charge</td>
                  <td>2000</td>
                  <td>3500</td>
                  <td>3500</td>
                </tr>


                <!-- AC SERVICING In Home -->
                <tr>
                  <td><b>AC SERVICING In Home</b></td>
                  <td>Sedan</td>
                  <td>MPV</td>
                  <td>Suv</td>
                </tr>

                <!-- Ac2 -->
                <tr>
                  <td rowspan="2">Service Charge</td>
                  <td>2000</td>
                  <td rowspan="2">3500</td>
                  <td rowspan="2">4000</td>
                </tr>
                <tr>
                  <td>3000(With Dashboard opening)</td>
                </tr>

                <!-- AC3 -->
                <tr>
                  <td>Gas Charge</td>
                  <td>2000</td>
                  <td>3500</td>
                  <td>3500</td>
                </tr>
              </tbody>
            </table>
            <br><p>We provide denting painting in gargae only. Below price is calculated as medium category dents</p><br>

            <table border="1" class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>DENTING N PAINTING</th>
                  <th>White</th>
                  <th>Other than white and pearl</th>
                  <th>Pearl</th>
                </tr>
              </thead>
              
              <tbody>
                <tr>
                  <td>Sedan Any Single Part Like front Bumper/back bumper/bonnet/any singel door etc</td>
                  <td>3000</td>
                  <td>3500</td>
                  <td>4000</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
  th, td {
    padding: 10px;
  }
  .repair-title {
    text-align: center;
    font-size: 35px;
    font-weight: bold;
  }
  .repair-area {
    background:#fff;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
</style>
<script>
import ProductTitle from '~/components/ProductTitle.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'

export default {
  async asyncData ({ store }) {
    let breadCrumbUrl = [
      {title: 'Maintainance & Repair', url: '/repair'}
    ]
    store.commit('SET_BREAD_CRUMB', breadCrumbUrl)
    store.commit('SET_HEAD', ['Maintainance & Repair', ''])
    store.commit('SET_HEAD_SEARCH', true)
  },
  components: {
    ProductTitle,
    Breadcrumb
  }
}
</script>