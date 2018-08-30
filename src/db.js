import firebase from 'firebase/app'
import 'firebase/firestore' // https://cloud.google.com/nodejs/docs/reference/firestore/

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

export const db = firebase.firestore()

db.settings({timestampsInSnapshots: true}) // time snapshot will change in future version

const scoreRef = db.collection('highscores')

export const getHighscores = (amount) => {
  scoreRef.orderBy('score').limit(amount)
}

// too many doc reads this will ramp up costs quickly need to change structure
export const getHighscoresByName = (name) => {
  // returns a promise
  return scoreRef.where('name', '==', name).get()
    .then((snapshot) => {
      let dataAsJson = []
      snapshot.forEach((doc) => {
        dataAsJson.push({
          name: doc.data().name,
          score: doc.data().score
        })
      })
      return dataAsJson
    })
}
