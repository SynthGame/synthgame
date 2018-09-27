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
const presetRef = db.collection('customPresets')

// Highscore funtions

export const addHighscore = ({name, score}) => {
  return scoreRef.add({
    name,
    score
  })
}

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

// Custom preset functions

/**
 *  Adds a user created preset to the databse
 *  @param  {Object} obj - Object with data
 *  @param  {String} obj.name - The name of the new preset
 *  @param  {Object} obj.parameterValues - The values of the audio components
 *  @param  {Object} obj.sequenceArray - Array with 16 objects that define the steps in the sequence
 *  @return {Promise} Returns the uid of the newly created preset
 */
export const addPreset = ({name, bpm, parameterValues, sequenceArray}) => {
  return presetRef
    .add({
      name,
      bpm,
      parameterValues,
      sequenceArray
    })
    .then(docRef => {
      return docRef.id
    })
}

/**
 *  Returns user defined preset by given ID.
 *  @param  {String} id - The ID of the preset
 *  @return {Promise} Returns the data of the document
 */
export const getPresetById = (id) => {
  // returns a promise
  return presetRef
    .doc(id)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) return snapshot.data()
      return undefined
    })
}
