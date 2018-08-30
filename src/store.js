import Vue from 'vue'
import Vuex from 'vuex'
import mapValues from 'lodash/mapValues'
import random from 'lodash/random'
import values from 'lodash/values'
import flatMap from 'lodash/flatMap'
import inRange from 'lodash/inRange'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    audioParameters: {
      delay: {
        delayTime: 20,
        wet: 0,
        feedback: 10
      },
      envelope: {
        attack: 11,
        decay: 60,
        sustain: 52,
        release: 34
      },
      filter: {
        cutOffFreq: 50,
        type: 0,
        setQ: 50,
        gain: 50
      },
      lfo: {
        frequency: 0,
        type: 0,
        amount: 0
      },
      oscillator: {
        frequency: 2,
        typeOsc: 2,
        detune: 60,
        phase: 0
      },
      reverb: {
        roomSize: 0,
        wet: 0
      }
    },
    gameState: {
      margin: 10,
      goal: {
        delay: {
          delayTime: 20,
          wet: 0,
          feedback: 10
        },
        envelope: {
          attack: 11,
          decay: 60,
          sustain: 52,
          release: 34
        },
        filter: {
          cutOffFreq: 50,
          type: 0,
          setQ: 50,
          gain: 50
        },
        lfo: {
          frequency: 0,
          type: 0,
          amount: 0
        },
        oscillator: {
          frequency: 2,
          typeOsc: 2,
          detune: 40,
          phase: 0
        },
        reverb: {
          roomSize: 0,
          wet: 0
        }
      }
    }
  },
  mutations: {
    setAudioParameter (state, {device, parameter, value}) {
      state.audioParameters[device][parameter] = value
    },
    setAudioParameterToPreset (state, {preset}) {
      // overwrite parameters from audiostate, this will not fill in nested objects
      state.audioParameters = {
        ...state.audioParameters,
        ...preset
      }
    },
    setGoalToPreset (state, {preset}) {
      // overwrite parameters from audiostate, this will not fill in nested objects
      state.gameState.goal = {
        ...state.gameState.goal,
        ...preset
      }
    },
    setMargin (state, {newMargin}) {
      // overwrite parameters from audiostate, this will not fill in nested objects
      state.gameState.margin = newMargin
    }
  },
  getters: {
    allParametersMatchGoal: (state, getters) => {
      return flatMap(getters.audioParametersMatchGoalWithMargin, val => values(val))
        .every(val => val)
    },
    audioParametersMatchGoalWithMargin: (state) => {
      return mapValues(state.audioParameters, (val, moduleName) => {
        return mapValues(val, (val, parameterName) => {
          return inRange(val,
            (state.gameState.goal[moduleName][parameterName] - state.gameState.margin),
            (state.gameState.goal[moduleName][parameterName] + state.gameState.margin)
          )
        })
      })
    }
  },
  actions: {
    randomizeAudioParameters ({state, commit}) {
      const randomizeValues = obj => mapValues(obj, val => {
        if (typeof val === 'object') return randomizeValues(val) // recuuursion whooo
        return random(0, 100)
      })
      return commit('setAudioParameterToPreset', {
        preset: randomizeValues(state.audioParameters)
      })
    },
    randomizGoalParameters ({state, commit}) {
      const randomizeValues = obj => mapValues(obj, val => {
        if (typeof val === 'object') return randomizeValues(val) // recuuursion whooo
        return random(0, 100)
      })
      return commit('setGoalToPreset', {
        preset: randomizeValues(state.audioParameters)
      })
    }
  }
})
