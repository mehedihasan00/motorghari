<template>
  <section>
    <product-title />
    <div class="container">
      <breadcrumb />
      <div class="profile-area">
        <div class="columns is-multiline">
          <div class="column is-12">
            <div class="field is-grouped is-grouped-right">
              <p class="control">
                <a href="/change-password" class="button theme-btn">
                  Change Password
                </a>
              </p>
            </div>
          </div>
          <div class="column is-2"></div>
          <div class="column is-21 profile-title">
            <div><img src="../assets/cart.gif"></div>
            <div class="title">Enjoy online shopping <nuxt-link to="/" >Start Shoping Now</nuxt-link>
            </div>
          </div>
          <div class="column is-1"></div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
  .profile-title {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    padding-top: 50px;
    width: 100%;
    display: inherit;
  }
  .profile-title .title {
    padding-top: 32px;
  }
  .profile-area {
    background:#fff;
    text-align: center;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .theme-btn {
    background-color: #ffd83d;
    color: #000;
  }
</style>
<script>
import ProductTitle from '~/components/ProductTitle.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'

export default {
  async asyncData ({ store, redirect }) {
    if (!store.state.auth.authUser) {
      redirect('/login')
    }
    let breadCrumbUrl = [
      {title: 'Profile', url: '/profile'}
    ]
    store.commit('SET_BREAD_CRUMB', breadCrumbUrl)
    store.commit('SET_HEAD', ['Welcome to motorgari.shop', ''])
    store.commit('SET_HEAD_SEARCH', true)
    return {
      password: {
        nPass: '',
        cnPass: ''
      },
      flag: true
    }
  },
  watch: {
    "password.cnPass": function () {
      if (this.password.nPass === this.password.cnPass) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  },
  methods: {
    changePass () {
      let id = this.$store.state.auth.authUser.user._id
      this.$store.dispatch('auth/changePassword', {id, password: this.password.cnPass})
    }
  },  
  components: {
    ProductTitle,
    Breadcrumb
  }
}
</script>