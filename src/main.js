import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import db from './db'
import './registerServiceWorker'
import VueCircleSlider from './components/knob.vue'

Vue.config.productionTip = false

require('tone')

Vue.use(VueCircleSlider)

new Vue({
  el: '#app', // needed?
  components: { App }, // needed?
  template: '<App/>', // needed?
  router,
  store,
  data () { return {db} },
  render: h => h(App)
}).$mount('#app')
