import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase/app'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'firebase/firestore' // import the db to use with firebase

Vue.config.productionTip = false

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAWPa6eGYyind5Gu74KqGLiRT2NBkS0Pmc',
  authDomain: 'synthgame-c2436.firebaseapp.com',
  databaseURL: 'https://synthgame-c2436.firebaseio.com',
  projectId: 'synthgame-c2436',
  storageBucket: 'synthgame-c2436.appspot.com',
  messagingSenderId: '109010755971'
}

firebase.initializeApp(config)

const db = firebase.firestore()

db.settings({timestampsInSnapshots: true}) // time snapshot will change in future version

db.collection('highscores').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(`🏆: ${doc.data().name}: ${doc.data().score}`)
    })
  })
  .catch((err) => {
    console.log('Error getting documents', err)
  })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
