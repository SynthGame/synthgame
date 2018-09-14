import Vue from 'vue'
import Vuex from 'vuex'
import mapValues from 'lodash/mapValues'
import random from 'lodash/random'
import values from 'lodash/values'
import flatMap from 'lodash/flatMap'
import inRange from 'lodash/inRange'
import isArray from 'lodash/isArray'
import add from 'lodash/add'
import find from 'lodash/find'
import character from '@/character'
import { addPreset } from '@/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    audioParameters: {
      oscillator1: {
        frequency: 131,
        typeOsc: 'sawtooth',
        detune: 60
        // phase: 0
      },
      oscillator2: {
        frequency: 131,
        typeOsc: 'sawtooth',
        detune: 60
        // phase: 0
      },
      filter: {
        cutOffFreq: 70,
        type: 'lowpass',
        setQ: 0,
        // gain: 50
      },
      envelope: {
        attack: 50,
        decay: 25,
        sustain: 10,
        release: 90
      },
      lfo: {
        frequency: 10,
        type: 'sine',
        amount: 0
      }
    },
    gameState: {
      createModeIsActive: false,
      sweepArmed: true,
      marginOsc: 0,
      marginFil: 0,
      marginEnv: 0,
      marginLfo: 0,
      margin: 10,
      timerIsRunning: false,
      isGameOver: false,
      level: 0,
      sequencesPassedInCurrentLevel: 0,
      knobsAvailable: {
        oscillator1: {},
        oscillator2: {},
        filter: {},
        envelope: {},
        lfo: {}
      },
      score: 0,
      highScore: 0,
      goal: {
        oscillator1: {
          frequency: 131,
          typeOsc: 'sawtooth',
          detune: 60
          // phase: 0
        },
        oscillator2: {
          frequency: 131,
          typeOsc: 'sawtooth',
          detune: 60
          // phase: 0
        },
        filter: {
          cutOffFreq: 70,
          type: 'lowpass',
          setQ: 0,
          // gain: 50
        },
        envelope: {
          attack: 0,
          decay: 0,
          sustain: 90,
          release: 0
        },
        lfo: {
          frequency: 10,
          type: 'sine',
          amount: 0
        }
      },
      possibleValues: {
        envelope: {},
        filter: {
          type: ['lowpass', 'highpass', 'bandpass']
        },
        lfo: {
          type: ['sine', 'square', 'sawtooth', 'triangle']
        },
        oscillator1: {
          frequency: ['65', '131', '262', '523'],
          typeOsc: ['sine', 'square', 'sawtooth', 'triangle']
        },
        oscillator2: {
          frequency: ['65', '131', '262', '523'],
          typeOsc: ['sine', 'square', 'sawtooth', 'triangle']
        }
      },
      defaultParams: {
        oscillator1: {
          frequency: 131,
          typeOsc: 'sawtooth',
          detune: 60
        },
        oscillator2: {
          frequency: 131,
          typeOsc: 'sawtooth',
          detune: 60
        },
        filter: {
          cutOffFreq: 70,
          type: 'lowpass',
          setQ: 0
        },
        envelope: {
          attack: 50,
          decay: 25,
          sustain: 10,
          release: 90
        },
        lfo: {
          frequency: 10,
          type: 'sine',
          amount: 0
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
    },
    startTimerIsRunning (state) {
      // overwrite parameters from audiostate, this will not fill in nested objects
      state.gameState.timerIsRunning = true
    },
    stopTimerIsRunning (state) {
      // overwrite parameters from audiostate, this will not fill in nested objects
      state.gameState.timerIsRunning = false
    },
    armSweep (state) {
      // overwrite parameters from audiostate, this will not fill in nested objects
      state.gameState.sweepArmed = true
    },
    disarmSweep (state) {
      // overwrite parameters from audiostate, this will not fill in nested objects
      state.gameState.sweepArmed = false
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
      state.gameState.highScore = val;
      if (localStorage.getItem("highscore") < val) {
        localStorage.setItem("highscore", val);
      }
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
    },
    setTheGameToGameOver (state) {
      state.gameState.isGameOver = true
    },
    setTheGameFromGameOver (state) {
      state.gameState.isGameOver = false
    },
    setActiveSequence (state, sequence) {
      state.activeSequence = sequence
    }
  },
  getters: {
    allParametersMatchGoal: (state, getters) => {
      return flatMap(getters.audioParametersMatchGoalWithMargin, val => values(val))
        .every(val => val)
    },
    displayedLevel: (state, getters) => {
      return state.gameState.level + 1
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
      const randomizeValues = (obj, selectObj) => mapValues(obj, (val, moduleName) => {
        return mapValues(val, (val, parameterName) => {
          // if selectObj is provided and the value is falsey return store value
          if (selectObj && !selectObj[moduleName][parameterName]) return state.gameState.goal[moduleName][parameterName]
          const parameterValDef = state.gameState.possibleValues[moduleName][parameterName]
          return Array.isArray(parameterValDef)
            ? parameterValDef[random(0, parameterValDef.length - 1)]
            : random(0, 100)
        })
      })

      const randomizeWithoutMatches = (obj, selectObj) => {
        const randomPreset = randomizeValues(obj, selectObj) // randomly generated preset
        const accedentlyCorrectValues = mapValues(randomPreset, (modulePreset, moduleName) => {
          return mapValues(modulePreset, (val, parameterName) => {
            const a = val
            const b = state.gameState.goal[moduleName][parameterName]
            return selectObj[moduleName][parameterName]
              ? a === b || inRange(a, b + state.gameState.margin, b - state.gameState.margin)
              : false
          })
        })
        if(find(accedentlyCorrectValues, mod => find(mod, true))) return randomizeValues(randomPreset, accedentlyCorrectValues)
        return randomPreset
      }

      return commit('setAudioParameterToPreset', {
        preset: randomizeWithoutMatches(state.audioParameters, randomizeArray)
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
      synth.oscillator1.state.device.frequency.value = character.oscillator1.frequency(state.gameState.goal.oscillator1.frequency)
      synth.oscillator1.state.device.type = character.oscillator1.typeOsc(state.gameState.goal.oscillator1.typeOsc)
      synth.oscillator1.state.device.detune.value = character.oscillator1.detune(state.gameState.goal.oscillator1.detune)
      synth.oscillator2.state.device.frequency.value = character.oscillator2.frequency(state.gameState.goal.oscillator2.frequency)
      synth.oscillator2.state.device.type = character.oscillator2.typeOsc(state.gameState.goal.oscillator2.typeOsc)
      synth.oscillator2.state.device.detune.value = character.oscillator2.detune(state.gameState.goal.oscillator2.detune)
    },
    setSynthToDefaultParameters ({state}, synth) {
      // This is absolute garbage but really can't think of anything else
      // if someone comes up with an elegant sollution for this I will
      // buy them dinner & beers for 1 night - Will Willems
      synth.envelope.state.device.attack = character.envelope.attack(state.gameState.defaultParams.envelope.attack)
      synth.envelope.state.device.decay = character.envelope.decay(state.gameState.defaultParams.envelope.decay)
      synth.envelope.state.device.sustain = character.envelope.sustain(state.gameState.defaultParams.envelope.sustain)
      synth.envelope.state.device.release = character.envelope.release(state.gameState.defaultParams.envelope.release)
      synth.filter.state.device.frequency.value = character.filter.cutOffFreq(state.gameState.defaultParams.filter.cutOffFreq)
      synth.filter.state.device.type = character.filter.type(state.gameState.defaultParams.filter.type)
      synth.filter.state.device.Q.value = character.filter.setQ(state.gameState.defaultParams.filter.setQ)
      synth.lfo.state.device.frequency.value = character.lfo.frequency(state.gameState.defaultParams.lfo.frequency)
      synth.lfo.state.device.max = character.lfo.amount(state.gameState.defaultParams.lfo.amount)
      synth.lfo.state.device.type = character.lfo.type(state.gameState.defaultParams.lfo.type)
      synth.oscillator1.state.device.frequency.value = character.oscillator1.frequency(state.gameState.defaultParams.oscillator1.frequency)
      synth.oscillator1.state.device.type = character.oscillator1.typeOsc(state.gameState.defaultParams.oscillator1.typeOsc)
      synth.oscillator1.state.device.detune.value = character.oscillator1.detune(state.gameState.defaultParams.oscillator1.detune)
      synth.oscillator2.state.device.frequency.value = character.oscillator2.frequency(state.gameState.defaultParams.oscillator2.frequency)
      synth.oscillator2.state.device.type = character.oscillator2.typeOsc(state.gameState.defaultParams.oscillator2.typeOsc)
      synth.oscillator2.state.device.detune.value = character.oscillator2.detune(state.gameState.defaultParams.oscillator2.detune)
    },
    exportPreset ({state}) {
      return addPreset({
        name: 'test', 
        parameterValues: state.audioParameters,
        sequenceArray: state.activeSequence
      })
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
    gameOver ({state, commit}) {
      commit('setTheGameToGameOver')
      // commit('stopTimerIsRunning')
      // console.log(`you failed at: ${state.gameState.level + 1}`)
      // commit('setLevelValue', state.gameState.level)
      // commit('startTimerIsRunning')
    },
    startAgain ({state, commit}) {
      commit('setTheGameFromGameOver')
    }
  }
})
