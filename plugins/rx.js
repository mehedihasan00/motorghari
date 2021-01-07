import Vue from 'vue'
import VueRx from 'vue-rx'
import { Observable, Subscription, Subject } from 'rxjs'

Vue.use(VueRx, {
  Observable,
  Subscription,
  Subject
})
