import Vue from 'vue'
import VueLazyload from 'vue-lazyload'


Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/img/error.png',
  loading: '/img/loading.svg',
  attempt: 1
})

Vue.config.devtools = false;
Vue.config.productionTip = false
Vue.config.silent = true;