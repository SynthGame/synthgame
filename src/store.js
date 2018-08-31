import Vue from 'vue'
import Vuex from 'vuex'
import mapValues from 'lodash/mapValues'
import random from 'lodash/random'
import values from 'lodash/values'
import flatMap from 'lodash/flatMap'
import inRange from 'lodash/inRange'
import isArray from 'lodash/isArray'
import isEqual from 'lodash/isArray'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    audioParameters: {
      delay: {
        delayTime: 40,
        wet: 50,
        feedback: 50
      },
      envelope: {
        attack: 11,
        decay: 60,
        sustain: 52,
        release: 34
      },
      filter: {
        cutOffFreq: 50,
        type: 'lowpass',
        setQ: 50,
        gain: 50
      },
      lfo: {
        frequency: 0,
        type: 'sine',
        amount: 0
      },
      oscillator: {
        frequency: 65,
        typeOsc: 'sine',
        detune: 60
        // phase: 0
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
          wet: 50,
          feedback: 90
        },
        envelope: {
          attack: 11,
          decay: 70,
          sustain: 52,
          release: 34
        },
        filter: {
          cutOffFreq: 40,
          type: 'highpass',
          setQ: 50,
          gain: 50
        },
        lfo: {
          frequency: 10,
          type: 'square',
          amount: 0
        },
        oscillator: {
          frequency: 65,
          typeOsc: 'sine',
          detune: 40
          // phase: 0
        },
        reverb: {
          roomSize: 10,
          wet: 20
        }
      },
      possibleValues: {
        delay: {},
        envelope: {},
        filter: {
          type: ['lowpass', 'highpass', 'bandpass']
        },
        lfo: {
          type: ['sine', 'square', 'sawtooth', 'triangle']
        },
        oscillator: {
          frequency: [65, 131, 262, 523, 1047, 2093],
          typeOsc: ['sine', 'square', 'sawtooth', 'triangle']
        },
        reverb: {}
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
      console.log('allParametersMatchGoal triggered!');
      return flatMap(getters.audioParametersMatchGoalWithMargin, val => values(val))
        .every(val => val)
    },
    audioParametersMatchGoalWithMargin: (state) => {
      return mapValues(state.audioParameters, (val, moduleName) => {
        return mapValues(val, (val, parameterName) => {
          console.log(val, state.gameState.goal[moduleName][parameterName])
          return isArray(state.gameState.possibleValues[moduleName][parameterName])
            ? (val === state.gameState.goal[moduleName][parameterName])
            : inRange(val,
                (state.gameState.goal[moduleName][parameterName] - state.gameState.margin),
                (state.gameState.goal[moduleName][parameterName] + state.gameState.margin)
              )
        })
      })
    }
  },
  actions: {
    randomizeAudioParameters ({state, commit}) {
      const randomizeValues = obj => mapValues(obj, (val, moduleName) => {
        return mapValues(val, (val, parameterName) => {
          const parameterValDef = state.gameState.possibleValues[moduleName][parameterName]
          return Array.isArray(parameterValDef)
            ? parameterValDef[random(0, parameterValDef.length - 1)]
            : random(0, 100)
        })
      })
      return commit('setAudioParameterToPreset', {
        preset: randomizeValues(state.audioParameters)
      })
    },
    randomizGoalParameters ({state, commit}) {
      const randomizeValues = obj => mapValues(obj, (val, moduleName) => {
        return mapValues(val, (val, parameterName) => {
          const parameterValDef = state.gameState.possibleValues[moduleName][parameterName]
          return Array.isArray(parameterValDef)
            ? parameterValDef[random(0, parameterValDef.length - 1)]
            : random(0, 100)
        })
      })
      return commit('setGoalToPreset', {
        preset: randomizeValues(state.audioParameters)
      })
    }
  }
})
