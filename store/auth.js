'use strict'
import fetch from 'isomorphic-fetch'
import cookie from 'js-cookie'
import parser from 'cookie'
import * as user from '../api/user';
export const state = () => ({
  authUser: null,
  role: '',
  permissions: [],
  signUpId: null,
  isLoggedin: false
})
export const mutations = {
  SET_USER: function (state, user) {
    if (!user) {
      state.authUser = user
      state.localCart = []
      return
    } else {
      state.authUser = user
    }
    if (user.cart && user.cart.length > 0) {
      state.localCart = user.userInfo.cart
      localStorage.setItem('localCart', JSON.stringify(state.localCart))
    }
    state.authUser = user
  },
  RESET_COOKIE: function () {
    cookie.set('motorgari_cookie', null)
  },
  USER_ID: function (state, id) {
    state.signUpId = id
    cookie.set('ui', id)
  },
  USER_LOC_ID: function (state, ui) {
    state.signUpId = ui
  },
  Set_Logged_IN_STATUS: function (state, flag) {
    state.isLoggedin = flag
  }
 
}
export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req) {
      try {
        if (req.headers.cookie) {
          const c = parser.parse(req.headers.cookie)
          const user = c['motorgari_cookie'] ? JSON.parse(c['motorgari_cookie']) : { token: '1' }
       
          if (user.token && user.token.length > 0) {
            commit('SET_USER', user)
          }
        }
       
      } catch (e) {
        return false
      }
    }
  },
  async loc_id ({commit}) {
    commit('USER_LOC_ID')
  },

  async signupWithPhone ({ commit }, phoneNumber) {
    let result = await user.signupWithPhone(phoneNumber)
    if (result.data.success) {
      commit('USER_ID', result.data.user.phoneNumber)
    }
  },
  async resendToken ({ commit }, phoneNumber) {
    let result = await user.resend(phoneNumber)
    return {result}
  },
  async verification ({ commit }, {phoneNumber, token}) {
    let result = await user.verification({phoneNumber, token})
    if (result.data.success) {
      this.$router.push('confirm')
    }
  },
  async signup ({ commit }, {phoneNumber, password}) {
    let result = await user.signup({phoneNumber, password})
    if (result.data.success) {
      this.$router.push('login')
    }
   
  },
  async loginUser ({ commit }, { phoneNumber, password }) {
    let userData = await user.login({phoneNumber, password})
 
    if (userData.data.success) {
      commit('Set_Logged_IN_STATUS', true)
      commit('SET_USER', userData.data.data)
      cookie.set('motorgari_cookie', userData.data.data)
      if (localStorage.ck) {
        localStorage.setItem('ck', false)
        this.$router.push('/checkout')
      } else {
        this.$router.push('profile')
      }
      
    }
  },
  logout ({ commit }) {
    commit('Set_Logged_IN_STATUS', false)
    commit('SET_USER', null)
    cookie.set('motorgari_cookie', null)
    // localStorage.clear()
  },
  async forgotpassword ({ commit }, phone) {
    let result = await user.resetPass(phone)
  },
  async changePassword ({ commit }, {id, password}) {
    let result = await user.changePass({id, password})
    if (result.data.success) {
      this.$router.push('login')
    }
  }
}
