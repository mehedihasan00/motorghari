<template>
  <div style="background-color:#fff;border-bottom-right-radius: 10px;border-bottom-left-radius: 10px;overflow:hidden">
    <div class="columns is-multiline">
      <div class="column is-3"></div>
      <div class="column is-6 box">
        <div ref="form" :model="form">
          <h2 class="title">Login</h2>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Phone Number</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input required="true" type="number" class="input" v-model="phoneNumber"/>
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Password</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input required="true" class="input" type="password" v-model="password"/>
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
                  <button @click="login" class="button theme-btn">
                    Login
                  </button><hr>
                  <p><a href="/signup">Sign Up Now</a> . Forgot Password? <a href="#" @click="forgotPassword">Click here</a></p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div class="column is-3"></div>
    </div>
  </div>
  </template>
  
  <style scoped>
   .box {
     margin-top: 100px;
     padding: 30px;
   }
   .title {
     text-align: center;
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
    export default {
      head () {
        return {
          title: `Login`
        }
      },
      asyncData ({ store }) {
        return {
          formError: null,
          phoneNumber: '',
          password: '',
          count: null
        }
      },
      methods: {
        async login () {
          await this.$store.dispatch('auth/loginUser', {
            phoneNumber: this.phoneNumber,
            password: this.password
          })
          if(this.$store.state.auth.isLoggedin) {
            this.$toaster.warning('Login Successfull.')
          } else {
            this.$toaster.error('Login failed.')
          }
        },
        forgotPassword () {
          this.$router.push('reset')
        }
      }
    }
  </script>
  