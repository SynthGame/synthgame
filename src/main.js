import Vue from 'vue'
import App from './App.vue'
import VueAnalytics from 'vue-analytics'

import router from './router'
import store from './store'
import db from './db'
import './registerServiceWorker'
import ModuleKnob from './components/ModuleKnob.vue'

Vue.config.productionTip = false

require('tone')

Vue.use(ModuleKnob)

Vue.use(VueAnalytics, {
  id: 'UA-126660114-1',
  router
})

var vm = new Vue({
  el: '#app', // needed?
  components: { App }, // needed?
  template: '<App/>', // needed?
  router,
  store,
  data () { return {db} },
  render: h => h(App)
}).$mount('#app')
