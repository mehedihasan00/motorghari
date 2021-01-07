<template>
    <div style="background-color:#fff;border-bottom-right-radius: 10px;border-bottom-left-radius: 10px;overflow:hidden">
      <div class="columns is-multiline">
        <div class="column is-3"></div>
        <div class="column is-6 box">
          <div ref="form" :model="form">
            <h2 class="title">Reset</h2>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Phone Number</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <input required="true" type="number" class="input" v-model="phone"/>
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
                    <button @click="resetPass" class="button theme-btn">
                      Reset Password
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
</template>
<style scoped>
  .box{
    margin-top: 100px;
    padding: 20px;
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
  data() {
    return {
      phone: ""
    };
  },
  async asyncData ({ store }) {
    store.commit('SET_HEAD_SEARCH', true)
  },
  methods: {
    resetPass() {
      if (!this.phone || this.phone.length < 11) {
        return;
      }
      this.$store.dispatch("auth/forgotpassword", this.phone);
      this.$router.push("login");
    }
  }
};
</script>