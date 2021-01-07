<template>
  <section>
    <product-title />
    <div class="container">
      <breadcrumb />
      <div class="compare-area">
        <div class="columns is-multiline">
          <div class="column is-12">
            <table>
              <tbody>
                <tr>
                  <th><h2 class="compare-title">Part Name</h2></th>
                  <th style="display: 'none'" v-for="(number, j) in makerNameRow" :key="j">
                    <!--  maker -->
                    <div>
                      <v-select  placeholder=" Maker"  v-model="car.maker[j]" :options="maker_names"></v-select>
                    </div><br>
                    <!--  car -->
                    <div>
                      <v-select :disabled="!car.maker[j]"  placeholder=" Car"  v-model="car.name[j]" :options="car_names[j]"></v-select>
                    </div><br>
                    <!--  year -->
                    <div>
                      <v-select :disabled="!car.name[j]"   placeholder=" Year"  v-model="car.year[j]" :options="years[j]"></v-select>
                    </div>
                  </th>
                </tr>
                <!-- 2ND ROW -->
                <tr  v-for="(row, r) in partNameRow" :key="r">
                  <td style="width: 400px">
                      <v-select  placeholder=" Part Name"  v-model="car.part_name[r]" :options="allParts"></v-select><br><br>
                      <button class="button is-success" @click="addPartRow" v-if="r == partNameRow.length - 1">+</button> 
                  </td>
                  <td v-for="(col, c) in 4" :key="c">
                    <span v-if="partIndexLength">
                      <span v-if="active.partIndex.includes(r) && active.cars.includes(c)">
                        <h1 v-if ="part_price[`${r}${c}`]">{{part_price[`${r}${c}`].price}} TK</h1>
                      </span>
                    </span>
                  </td>
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
  .compare-title {
    text-align: center;
    font-size: 25px;
  }
  .compare-area {
    background:#fff;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
}

td, th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
}
</style>
<script>
import ProductTitle from '~/components/ProductTitle.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'
import Vue from 'vue'
if (process.browser) {
  var vSelect = require('vue-select').VueSelect
}
import {mapState} from 'vuex'
import { get } from '../api'
export default {
  async fetch({store}) {
    await store.dispatch('partNames')
  },
  async asyncData ({ store }) {
    let result = await get(`cars/makers`)
    let breadCrumbUrl = [
      {title: 'Compare', url: '/compare'}
    ]
    store.commit('SET_BREAD_CRUMB', breadCrumbUrl)
    store.commit('SET_HEAD', ['Car Compare', ''])
    store.commit('SET_HEAD_SEARCH', true)
    return {
      maker_names: Object.keys(result.data.makersWithCars).sort(),
      car_names: [],
      carWithYears: result.data.carWithYears,
      carsWithMakers: result.data.makersWithCars,
      car: {
        name: {},
        maker: {},
        year: {},
        part_name: {}
      },
      oldCar: {
        name: {},
        maker: {},
        year: {},
        part_name: {}
      },
      oldPartName: {
        part_name: {}
      },
      disabled: {
        partName: true
      },
      active: {
        cars:[],
        parts: [],
        partIndex:[],
        carModels: [],
        part_name: []
      },
      info: [],
      carAndPartsInfo: [],
      makerNameRow: 4,
      partNameRow: Array(4),
      years: [],
      selected: null
    }
  },
  computed: {
    ...mapState(['part_names', 'car_model', 'part_price']),
    partIndexLength: function () {
      return this.active.partIndex.length
    },
    allParts: function () {
      return this.part_names.filter((name) => {
        return !Object.values(this.car.part_name).includes(name)
      })
    }
  },
  watch: {
    'car.maker': {
      handler: function (val) {
        this.active.carModels = []
        let currentValue = this.currentSelection(val, this.oldCar.maker)
        let [index, selectedMaker] = currentValue
        let carsForSelectedMakers = this.carsWithMakers[selectedMaker] || []
        if (!selectedMaker) {
          this.active.cars.splice(Number(index), 1)
           // empty corresponding name field
          this.$set(this.car.name, index, null)
        }
        this.oldCar.maker = Object.assign({}, val);
        this.car_names[index] = carsForSelectedMakers.sort()
      },
      deep: true
    },
    'car.name': {
      handler: function (val) {
        this.active.carModels = []
        let currentValue = this.currentSelection(val, this.oldCar.name)
        let [index, selectedCar] = currentValue
        // prevent undefined for map 
        let yearsForSelectedCar = this.carWithYears[selectedCar] || []
        if (!selectedCar) {
          this.active.cars.splice(Number(index), 1)
          // empty corresponding year field
          this.$set(this.car.year, index, null)
        }
        this.oldCar.name = Object.assign({}, val);
        // years only supports string array
        yearsForSelectedCar = yearsForSelectedCar.map(y => (''+ y))
        this.years[index] = yearsForSelectedCar
      },
      deep: true
    },
    'car.year': {
      handler: function (val) {
        this.active.carModels = []
        let newVal = this.currentSelection(val, this.oldCar.year)
        let cIndex = Number(newVal[0])
        Object.keys(val).forEach((key, index) => {
         let carModel = {
            car_name : this.car.name[key],
            maker_name : this.car.maker[key],
            year : this.car.year[key],
            carIndex: Number(key)
        };
        this.active.carModels.push(carModel)
        if (this.car.year[key] == null) {
           this.active.carModels = this.active.carModels.filter((model, i) => {
             return cIndex !== model.carIndex;
           })
         }
       })
       this.oldCar.year = Object.assign({}, val);
       if (this.active.part_name.length && newVal[1]) {
        this.active.part_name.forEach(async (part, i) => {
           let data = {
             part_name: part.part_name,
             index: part.index,
             car_name: this.car.name[newVal[0]],
             maker_name: this.car.maker[newVal[0]],
             year: this.car.year[newVal[0]],
             carIndex: cIndex
           }
            await this.$store.dispatch('partPrice', data)
          })
       }
       this.activeCar()
      },
      deep: true
    },
    'car.part_name': {
      handler: function (val, oldVal) { 
        let newVal = this.currentSelection(val, this.oldPartName.part_name) || {}
        let index = Number(newVal[0])
        let activeIndex = this.active.partIndex.indexOf(index)
        if (activeIndex < 0) {
          this.active.partIndex.push(index)
          this.active.part_name[index]= {index, part_name: newVal[1]}
        }
        if (activeIndex >= 0 && newVal[1] !== null) {
          this.active.part_name[index].part_name = newVal[1]
        }
        if (newVal[1] == null) {
          this.active.partIndex.splice(activeIndex, 1)
          this.active.part_name.splice(index, 1)
          if (this.active.partIndex.length == 0) {
            this.active.part_name = []
          }
        }
        if (newVal[1] !== null) {
          
          this.active.carModels.forEach(async (model, i) => {
            model.part_name = newVal[1]
            model.index = index
            await this.$store.dispatch('partPrice', model)
          })
        }
        this.oldPartName.part_name = Object.assign({}, val);
        },
      deep: true
    }
  },
  components: {
    ProductTitle,
    Breadcrumb,
    vSelect
  },
  methods: {
    addPartRow () {
      if (this.partNameRow.length === 10) return ;
      this.partNameRow.push(this.partNameRow.length)
    },
    currentSelection(newValue, oldValue) {
      let old = Object.entries(oldValue)
      let newVal = Object.entries(newValue).filter((arr, index) => {
        return JSON.stringify(arr) !== JSON.stringify(old[index])
      })[0]
      return newVal;
    },
    async fetchYear(index) {
      if (!this.car.name[index] || !this.car.maker[index]) {
        return
      }
      await this.$store.dispatch('carWithYears',{name: this.car.name[index], maker_name: this.car.maker[index]})
      let arr = Array(this.makerNameRow).fill([])
      if (!this.years.length) {
        this.years = [...arr]
      }
      if (this.car_model == undefined) {
      this.years.splice(index, 1, [])
        
      } else {
        this.years.splice(index, 1, [`${this.car_model}`])
      }
      
    },
    activeCar() {
      this.active.cars = []
      Object.entries(this.car.year).forEach(([key, value], index)=> {
          if (this.car.year[key]) {
             this.active.cars.push(Number(key))
             this.disabled.partName = false
           }
           if (this.active.cars.length == 0) {
             this.disabled.partName = true
           }
      })
      let years = Object.values(this.car.year).filter(val => val)
      if (!years.length) {
        this.car.part_name = {}
      }
    }
  }
}
</script>