import Vue from 'vue'
import App from './App.vue'

import store from './store'
import db from './db'
import './registerServiceWorker'
import ModuleKnob from './components/ModuleKnob.vue'
import {VueMasonryPlugin} from 'vue-masonry';

Vue.config.productionTip = false

require('tone')

Vue.use(ModuleKnob)
Vue.use(VueMasonryPlugin)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store,
  data () { return {db} },
  render: h => h(App)
}).$mount('#app')
