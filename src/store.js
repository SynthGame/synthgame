import Vue from 'vue'
import Vuex from 'vuex'
import mapValues from 'lodash/mapValues'
import random from 'lodash/random'
import values from 'lodash/values'
import flatMap from 'lodash/flatMap'
import inRange from 'lodash/inRange'
import isArray from 'lodash/isArray'
import add from 'lodash/add'
import character from '@/character'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    visualParameters: {
    },
    audioParameters: {
      oscillator: {
        frequency: 131,
        typeOsc: 'sawtooth',
        detune: 60
        // phase: 0
      },
      filter: {
        cutOffFreq: 60,
        type: 'lowpass',
        setQ: 0,
        // gain: 50
      },
      envelope: {
        attack: 0,
        decay: 5,
        sustain: 30,
        release: 10
      },
      lfo: {
        frequency: 10,
        type: 'sine',
        amount: 0
      },
      delay: {
        delayTime: 30,
        feedback: 80,
        wet: 0
      },
      reverb: {
        roomSize: 50,
        wet: 0
      }
    },
    gameState: {
      createModeIsActive: false,
      margin: 10,
      timerIsRunning: false,
      level: 0,
      sequencesPassedInCurrentLevel: 0,
      knobsAvailable: {},
      score: 0,
      highScore: 0,
      goal: {
        oscillator: {
          frequency: 131,
          typeOsc: 'sawtooth',
          detune: 60
          // phase: 0
        },
        filter: {
          cutOffFreq: 60,
          type: 'lowpass',
          setQ: 0,
          // gain: 50
        },
        envelope: {
          attack: 0,
          decay: 5,
          sustain: 30,
          release: 10
        },
        lfo: {
          frequency: 10,
          type: 'sine',
          amount: 0
        },
        delay: {
          delayTime: 30,
          feedback: 80,
          wet: 0
        },
        reverb: {
          roomSize: 50,
          wet: 0
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
    },
    startTimerIsRunning (state) {
      // overwrite parameters from audiostate, this will not fill in nested objects
      state.gameState.timerIsRunning = true
    },
    stopTimerIsRunning (state) {
      // overwrite parameters from audiostate, this will not fill in nested objects
      state.gameState.timerIsRunning = false
    },
    addValueToScore (state, val) {
      state.gameState.score = add(state.gameState.score, val)
    },
    increaseLevelValue (state, val) {
      state.gameState.level = add(state.gameState.level, val)
    },
    setLevelValue (state, level) {
      state.gameState.level = level
    },
    updateHighScore (state, val) {
      state.gameState.highScore = val
    },
    setKnobsAvailable (state, obj) {
      state.gameState.knobsAvailable = obj
    },
    setCreateMode (state, isActive) {
      state.gameState.createModeIsActive = isActive
    },
    increaseSequencesPassedInCurrentLevel (state) {
      state.gameState.sequencesPassedInCurrentLevel++
    },
    resetSequencesPassedInCurrentLevel (state) {
      state.gameState.sequencesPassedInCurrentLevel = 0
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
    randomizeAudioParameters ({state, commit}, randomizeArray) {
      const randomizeValues = obj => mapValues(obj, (val, moduleName) => {
        return mapValues(val, (val, parameterName) => {
          // if randomizeArray is provided and the value is falsey return store value
          if (randomizeArray && !randomizeArray[moduleName][parameterName]) return state.audioParameters[moduleName][parameterName]
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
          if (state.gameState.knobsAvailable && state.gameState.knobsAvailable[moduleName] && state.gameState.knobsAvailable[moduleName][parameterName]) {
            const parameterValDef = state.gameState.possibleValues[moduleName][parameterName]
            return Array.isArray(parameterValDef)
              ? parameterValDef[random(0, parameterValDef.length - 1)]
              : random(0, 100)
          }
          return state.gameState.goal[moduleName][parameterName]
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
      console.log('setsynthtoGoal')
      synth.delay.state.device.delayTime.value = character.delay.delayTime(state.gameState.goal.delay.delayTime)
      synth.delay.state.device.feedback.value = character.delay.feedback(state.gameState.goal.delay.feedback)
      synth.delay.state.device.wet.value = character.delay.wet(state.gameState.goal.delay.wet)
      synth.envelope.state.device.attack = character.envelope.attack(state.gameState.goal.envelope.attack)
      synth.envelope.state.device.decay = character.envelope.decay(state.gameState.goal.envelope.decay)
      synth.envelope.state.device.sustain = character.envelope.sustain(state.gameState.goal.envelope.sustain)
      synth.envelope.state.device.release = character.envelope.release(state.gameState.goal.envelope.release)
      synth.filter.state.device.frequency.value = character.filter.cutOffFreq(state.gameState.goal.filter.cutOffFreq)
      synth.filter.state.device.type = character.filter.type(state.gameState.goal.filter.type)
      synth.filter.state.device.Q.value = character.filter.setQ(state.gameState.goal.filter.setQ)
      synth.lfo.state.device.frequency.value = character.lfo.frequency(state.gameState.goal.lfo.frequency)
      synth.lfo.state.device.max = character.lfo.amount(state.gameState.goal.lfo.amount)
      synth.lfo.state.device.type = character.lfo.type(state.gameState.goal.lfo.type)
      synth.oscillator.state.device.frequency.value = character.oscillator.frequency(state.gameState.goal.oscillator.frequency)
      synth.oscillator.state.device.type = character.oscillator.typeOsc(state.gameState.goal.oscillator.typeOsc)
      synth.oscillator.state.device.detune.value = character.oscillator.detune(state.gameState.goal.oscillator.detune)
      synth.reverb.state.device.wet.value = character.reverb.wet(state.gameState.goal.reverb.wet)
      synth.reverb.state.device.roomSize.value = character.reverb.roomSize(state.gameState.goal.reverb.roomSize)
    },
    setSynthToAudioParameters ({state}, synth) {
      // This is absolute garbage but really can't think of anything else
      // if someone comes up with an elegant sollution for this I will
      // buy them dinner & beers for 1 night - Will Willems
      console.log('setsynthtoaudioparams', )
      synth.delay.state.device.delayTime.value = character.delay.delayTime(state.audioParameters.delay.delayTime)
      synth.delay.state.device.feedback.value = character.delay.feedback(state.audioParameters.delay.feedback)
      synth.delay.state.device.wet.value = character.delay.wet(state.audioParameters.delay.wet)
      synth.envelope.state.device.attack = character.envelope.attack(state.audioParameters.envelope.attack)
      synth.envelope.state.device.decay = character.envelope.decay(state.audioParameters.envelope.decay)
      synth.envelope.state.device.sustain = character.envelope.sustain(state.audioParameters.envelope.sustain)
      synth.envelope.state.device.release = character.envelope.release(state.audioParameters.envelope.release)
      synth.filter.state.device.frequency.value = character.filter.cutOffFreq(state.audioParameters.filter.cutOffFreq)
      synth.filter.state.device.type = character.filter.type(state.audioParameters.filter.type)
      synth.filter.state.device.Q.value = character.filter.setQ(state.audioParameters.filter.setQ)
      synth.lfo.state.device.frequency.value = character.lfo.frequency(state.audioParameters.lfo.frequency)
      synth.lfo.state.device.max = character.lfo.amount(state.audioParameters.lfo.amount)
      synth.lfo.state.device.type = character.lfo.type(state.audioParameters.lfo.type)
      synth.oscillator.state.device.frequency.value = character.oscillator.frequency(state.audioParameters.oscillator.frequency)
      synth.oscillator.state.device.type = character.oscillator.typeOsc(state.audioParameters.oscillator.typeOsc)
      synth.oscillator.state.device.detune.value = character.oscillator.detune(state.audioParameters.oscillator.detune)
      synth.reverb.state.device.wet.value = character.reverb.wet(state.audioParameters.reverb.wet)
      synth.reverb.state.device.roomSize.value = character.reverb.roomSize(state.audioParameters.reverb.roomSize)
    },
    setLevel ({state, commit}, {knobsAvailable}) {
      commit('setKnobsAvailable', knobsAvailable)
    },
    startNewLevel ({state, commit, dispatch}, {knobsAvailable, level}) {
      commit('resetSequencesPassedInCurrentLevel')
      if(level) commit('setLevelValue', level);
      return dispatch('setLevel', {
        knobsAvailable
      })
    },
    levelDone ({state, commit}) {
      commit('stopTimerIsRunning')
      // commit('addValueToScore', timeLeft)
    },
    gameOver ({state, commit}, {}) {

    }
  }
})
