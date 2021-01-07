<template>
  <div style="overflow:hidden;padding-top:100px;">
    <div class="columns is-multiline">
      <div class="column is-3"></div>
      <div class="column is-6">
        We sent a token to this number <b>{{$store.state.auth.signUpId}}</b><br><br>
        <h1 class="title">Enter your token below</h1>

        <div class="field is-grouped">
          <p class="control is-expanded">
            <input class="input" type="number" placeholder="Enter Token Here" v-model="token">
          </p>
          <p class="control">
            <a class="button theme-btn" @click="sendToken">
              Send
            </a>
          </p>
        </div>
        <div class="field is-grouped">
          <p class="control">
            <a class="button theme-btn" v-if="sendAgain" @click="resend">
              Resend code
            </a>
          </p>
        </div>
      </div>
      <div class="column is-3"></div>
    </div>
  </div>
</template>

<style>
  .theme-btn {
    background-color: #ffd83d;
    color: #000;
  }
</style>

<script>
  export default {
 
    async asyncData ({query, store}) {
      store.commit('SET_HEAD_SEARCH', true)
      return {
        token: '',
        sendAgain: false
      }
    },
    methods: {
      resend () {
        if (this.$store.state.auth.signUpId) {
          this.$store.dispatch('auth/resendToken', {
          phoneNumber: this.$store.state.auth.signUpId
        })
        }
      },
      sendToken() {
        if (!this.token || this.token.length <6) {
          return;
        }
        this.$store.dispatch('auth/verification', {
          phoneNumber: this.$store.state.auth.signUpId,
          token: this.token
        })
        
      }
    },
    async mounted () {
      let timer = 5000;
      setTimeout(() => {
        this.sendAgain = true
      }, timer)
    }
  }
</script>