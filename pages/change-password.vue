<template>
  <section>
    <product-title />
    <div class="container">
      <breadcrumb />
      <div class="profile-area">
        <div class="columns is-multiline">
          <div class="column is-3"></div>
          <div class="column is-6 box">
            <h2 class="title">Change Password</h2>
            <div ref="form" :model="form">
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="label">New Password</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control is-expanded has-icons-left">
                      <input required="true" type="password" class="input" v-model="password.nPass"/>
                    </p>
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="label">Confirm New Password</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control is-expanded has-icons-left">
                      <input required="true" type="password" class="input" v-model="password.cnPass"/>
                    </p>
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-label">
                  <!-- Left empty for spacing -->
                </div>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <button :disabled="flag" @click="changePass" class="button theme-btn">
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-3"></div>
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
    margin-top: 100px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .field-body {
    flex: 2;
  }
  .title {
    text-align: center;
  }
  .box {
    padding: 20px;
  }
  .field {
     margin-bottom: 15px;
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