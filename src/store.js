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
        // gain: 50
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
        roomSize: 20,
        wet: 20
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
          // gain: 50
        },
        lfo: {
          frequency: 10,
          type: 'square',
          amount: 50
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
      return flatMap(getters.audioParametersMatchGoalWithMargin, val => values(val))
        .every(val => val)
    },
    audioParametersMatchGoalWithMargin: (state) => {
      return mapValues(state.audioParameters, (val, moduleName) => {
        return mapValues(val, (val, parameterName) => {
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
    },
    setSynthToGoal ({state}, synth) {
      // This is absolute garbage but really can't think of anything else
      // if someone comes up with an elegant sollution for this I will
      // buy them dinner & beers for 1 night - Will Willems
      synth.delay.state.device.delayTime.value = state.gameState.goal.delay.delayTime
      synth.delay.state.device.feedback.value = state.gameState.goal.delay.feedback
      synth.delay.state.device.wet.value = state.gameState.goal.delay.wet
      synth.envelope.state.device.attack = state.gameState.goal.envelope.attack
      synth.envelope.state.device.decay = state.gameState.goal.envelope.decay
      synth.envelope.state.device.sustain = state.gameState.goal.envelope.sustain
      synth.envelope.state.device.release = state.gameState.goal.envelope.release
      synth.filter.state.device.frequency.value = state.gameState.goal.filter.cutOffFreq
      synth.filter.state.device.type = state.gameState.goal.filter.type
      synth.filter.state.device.Q.value = state.gameState.goal.filter.setQ
      synth.lfo.state.device.frequency.value = state.gameState.goal.lfo.frequency
      synth.lfo.state.device.max = state.gameState.goal.lfo.max
      synth.lfo.state.device.type = state.gameState.goal.lfo.type
      synth.oscillator.state.device.frequency.value = state.gameState.goal.oscillator.frequency
      synth.oscillator.state.device.type = state.gameState.goal.oscillator.typeOsc
      synth.oscillator.state.device.detune.value = state.gameState.goal.oscillator.detune
      synth.reverb.state.device.wet.value = state.gameState.goal.reverb.wet
      synth.reverb.state.device.roomSize.value = state.gameState.goal.reverb.roomSize
    }
  }
})
