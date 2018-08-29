import Vue from 'vue'
import Vuex from 'vuex'
import mapValues from 'lodash/mapValues'
import random from 'lodash/random'
import matches from 'lodash/matches'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    audioParameters: {
      delay: {
        delayTime: 20,
        wet: 0.2,
        feedback: 10
      },
      envelope: {
        attack: 11,
        decay: 21,
        sustain: 9,
        release: 12
      },
      filter: {
        cutOffFreq: 12000,
        type: 0,
        setQ: 50,
        gain: 1
      },
      lfo: {
        frequency: 0,
        type: 0,
        amount: 0
      },
      oscillator: {
        frequency: 2,
        typeOsc: 1,
        detune: 60,
        phase: 0
      },
      reverb: {
        roomSize: 0.5,
        wet: 0.2
      }
    },
    gameState: {
      goal: {
        delay: {
          delayTime: 40,
          wet: 0.2,
          feedback: 10
        },
        envelope: {
          attack: 11,
          decay: 21,
          sustain: 9,
          release: 12
        },
        filter: {
          cutOffFreq: 12000,
          type: 0,
          setQ: 50,
          gain: 1
        },
        lfo: {
          frequency: 0,
          type: 0,
          amount: 0
        },
        oscillator: {
          frequency: 2,
          typeOsc: 1,
          detune: 60,
          phase: 0
        },
        reverb: {
          roomSize: 0.5,
          wet: 0.2
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
    }
  },
  getters: {
    gameGoalMatcher: (state, getters) => {
      return matches(state.gameState.goal)
    },
    audioParametersMatchGoal: (state, getters) => {
      return getters.gameGoalMatcher(state.audioParameters)
    }
  },
  actions: {
    randomizeAudioParameters ({state, commit}) {
      const randomizeValues = obj => mapValues(obj, val => {
        if(typeof val === 'object') return randomizeValues(val) // recuuursion whooo
        return random(0, 100)
      })
      return commit('setAudioParameterToPreset', {
        preset: randomizeValues(state.audioParameters)
      })
    }
  }
})
