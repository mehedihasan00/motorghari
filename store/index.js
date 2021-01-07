'use strict'
import cookie from 'js-cookie'
import parser from 'cookie'
import * as parts from '../api/parts'
export const state = () => ({
  heading: {
    title: '',
    subtitle: ''
  },
  makers: [],
  car_names: [],
  maker_names: [],
  carsWithMakers: {},
  makersWithCars: {},
  part_names: [],
  part_price: {},
  isHeadSearch: false,
  isCartVisible: false,
  isMenuVisible: false,
  breadcrumb: []
})
export const mutations = {
  SET_HEAD: function (state, heading) {
    state.heading.title = heading[0]
    state.heading.subtitle = heading[1]
  },
  SET_HEAD_SEARCH: function(state, val) {
    state.isHeadSearch = val
  },
  SET_CART_VISIBLE: function(state, val) {
    state.isCartVisible = val
  },
  SET_MENU_VISIBLE: function(state, val) {
    state.isMenuVisible = val
  },
  SET_BREAD_CRUMB: function (state, breadcrumb) {
    state.breadcrumb = breadcrumb.slice().reverse()
  },
  SET_MAKERS: function (state, makers) {
    state.makers = [...makers]
  },
  SET_CARS_WITH_MAKERS(state, {carNames, makers, carsWithMakers, carWithYears}) {
    state.car_names = [...carNames]
    state.maker_names = [...makers]
    state.carsWithMakers = carsWithMakers
    state.carWithYears = carWithYears
  },
  SET_PART_NAMES(state, list) {
    state.part_names = [...list]
  },
  SET_MODEL_YEARS(state, year) {
    state.car_model = year
  },
  SET_PART_PRICE(state, {index, price, carIndex}) {
    let obj = {...state.part_price}
    obj[`${index}${carIndex}`] = { price }
    state.part_price = Object.assign({}, obj)
  }
}
export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req) {
      try {
        if (req.headers.cookie) {
          const c = parser.parse(req.headers.cookie)
          const user = c['motorgari_cookie'] ? JSON.parse(c['motorgari_cookie']) : { token: '1' }
          commit('auth/USER_LOC_ID', c.ui, {root: true})
          if (user.token && user.token.length > 0) {
            commit('auth/SET_USER', user, {root: true})
          }
        }
      } catch (e) {
        return false
      }
    }
  },
  
  setVehicleNumber ({ commit }, user) {
    commit('SET_USER', user)
    cookie.set('motorgari_cookie', user)
  },
  async carsWithMakers({commit}) {
    let result = await parts.carsWithMakers();
    let cars = Object.keys(result.data.carWithYears)
    let makers = Object.keys(result.data.makersWithCars)
    commit('SET_CARS_WITH_MAKERS', {carNames: cars, makers})
  },

  async partNames({commit}) {
    let result = await parts.partNames();
    commit('SET_PART_NAMES', result.data.sort())
  },
  
  async partPrice({commit, state},{part_name, car_name, maker_name, year, index, carIndex}) {
    let result = await parts.partPrice({part_name,car_name, maker_name, year});
    let part = result.data
    if (part && part.price) {
      commit('SET_PART_PRICE', {index, price: part.price, carIndex})
    }
    if (part == undefined && state.part_price[`${index}${carIndex}`]) {
      commit('SET_PART_PRICE', {index, price: null, carIndex})
    }
  }
}
