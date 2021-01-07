<template>
  <div style="overflow:hidden;padding-top:100px;">
    <div class="columns is-multiline">
      <div class="column is-3"></div>
      <div class="column is-6 box">
        <h2 class="title">Confirm Password</h2>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Password</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" v-model="password" type="password" placeholder="password">
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Confirm Password</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" v-model="confirmPassword" type="password" placeholder="password">
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
                <button class="button theme-btn" :disabled="!correctPassword" @click="submit">
                  Submit
                </button>
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
  .field-body {
    flex: 3;
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
  export default {
    async asyncData ({ store }) {
      store.commit('SET_HEAD_SEARCH', true)
      return {
        password: '',
        confirmPassword: '',
        correctPassword: false
      }
    },
   watch: {
    confirmPassword () {
      if (this.password === this.confirmPassword) {
        this.correctPassword = true
      } else {
        this.correctPassword = false
      }
     }
   },
    methods: {
      submit () {
        if (!this.correctPassword) {
          return
        }
        this.$store.dispatch('auth/signup', {
          phoneNumber: this.$store.state.auth.signUpId,
          password: this.confirmPassword
        })
      }
    }
  }
</script>