<template>
  <section>
    <div class="columns is-multiline">
      <span class="signup-title">Please fill out all required field for sign up</span>
      <div class="column is-3"></div>
      <div class="column is-6">
        <div class="signup-details box">
          <h2 class="title">Sign Up</h2>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Phone Number</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input v-model="phoneNumber" required="true" type="text" class="input">
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <div class="control text-center">
                  <button @click="signup" class="button theme-btn">
                    Sign Up
                  </button><br><br>
                  <p>Already registered? <a href="/login">login Now</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-3"></div>
    </div>
  </section>
</template>
<style scoped>
  section {
    padding-top: 12px;
  }
  .text-center {
    text-align: center;
  }
  img.logo {
    margin-top: 40px;
  }
  .signup-title {
    font-size:30px;
    text-align:center;
    width:100%;
    float:left;
    padding-bottom: 40px;
    padding-top: 20px;
    color:#fff
  }
  .signup-details {
    text-align:center;
    padding-top:40px;
    padding-bottom:40px;
    background:#fff;
    padding:40px;
  }

  .card {
    margin-top: 10px;
    margin-bottom: 100px;
  }

  .card-footer {
    padding: 10px;
  }

  .card-footer-item {
    margin-left: 5px;
    margin-right: 5px;
  }

  .register-title {
    padding: 13px;
    text-align: center;
  }
  .title {
     text-align: center;
   }

  .danger {
    border: 1px solid red;
    border-radius: 5px;
  }
  .field-body {
    flex: 3;
  }
  .theme-btn {
    background-color: #ffd83d;
    color: #000;
  }
</style>

<script>
export default {
  async asyncData ({ store }) {
    store.commit('SET_HEAD_SEARCH', true)
    return {
      phoneNumber: ''
    }
  },
  methods: {
    async signup () {
     
      if (!this.phoneNumber || this.phoneNumber.length < 11) {
        return
      }
      this.$store.dispatch('auth/signupWithPhone', this.phoneNumber)
      this.$router.push('token')
     
    }
  }
}
</script>