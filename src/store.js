import Vue from "vue";
import Vuex from "vuex";
import mapValues from "lodash/mapValues";
import random from "lodash/random";
import values from "lodash/values";
import flatMap from "lodash/flatMap";
import inRange from "lodash/inRange";
import isArray from "lodash/isArray";
import add from "lodash/add";
import find from "lodash/find";
import character from "@/character";
import { addPreset } from "@/db";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bpm: 110,
    name: "Anonymous",
    avatarUrl: null,
    audioParameters: {
      oscillator1: {
        frequency: "131",
        typeOsc: "sawtooth",
        detune: 50
        // phase: 0
      },
      oscillator2: {
        frequency: "131",
        typeOsc: "sawtooth",
        // detune: 50,
        volume: 50
        // phase: 0
      },
      filter: {
        cutOffFreq: 70,
        type: "lowpass",
        setQ: 0
        // gain: 50
      },
      envelope: {
        attack: 0,
        decay: 25,
        sustain: 100,
        release: 90
      },
      envelope2: {
        attack: 0,
        decay: 90,
        sustain: 0,
        release: 0,
        assign: "filtercutoff",
        amount: 100
      },
      lfo: {
        frequency: 10,
        type: "sine",
        amount: 0
      },
      router: {
        lfo: "osc1Detune",
        envelope2: "filterCutoff"
      }
    },
    gameState: {
      createModeIsActive: false,
      sweepArmed: true,
      marginOsc: 0,
      marginFil: 0,
      marginEnv: 0,
      marginLfo: 0,
      rackSlotArray: [0, 1, 2, 3, 4, 5],
      margin: 10,
      timerIsRunning: false,
      isGameOver: false,
      nextLevelRequested: false,
      level: 0,
      sequencesPassedInCurrentLevel: 0,
      knobsAvailable: {
        oscillator1: {},
        oscillator2: {},
        filter: {},
        envelope: {},
        envelope2: {},
        lfo: {},
        router: {}
      },
      score: 0,
      highScore: 0,
      goal: {
        oscillator1: {
          frequency: "131",
          typeOsc: "sawtooth",
          detune: 50
          // phase: 0
        },
        oscillator2: {
          frequency: "131",
          typeOsc: "sawtooth",
          // detune: 50,
          volume: 50
          // phase: 0
        },
        filter: {
          cutOffFreq: 70,
          type: "lowpass",
          setQ: 0
          // gain: 50
        },
        envelope: {
          attack: 0,
          decay: 0,
          sustain: 100,
          release: 0
        },
        envelope2: {
          attack: 0,
          decay: 90,
          sustain: 0,
          release: 0,
          assign: "filterCutoff",
          amount: 100
        },
        lfo: {
          frequency: 10,
          type: "sine",
          amount: 0
        },
        router: {
          lfo: "oscsDetune",
          envelope2: "filterCutoff"
        }
      },
      possibleValues: {
        envelope: {},
        envelope2: {
          assign: ["filtercutoff"]
        },
        filter: {
          type: ["lowpass", "highpass", "bandpass"]
        },
        lfo: {
          type: ["sine", "square", "sawtooth", "triangle"]
        },
        oscillator1: {
          frequency: ["65", "131", "262", "523"],
          typeOsc: ["sine", "square", "sawtooth", "triangle"]
        },
        oscillator2: {
          frequency: ["65", "131", "262", "523"],
          typeOsc: ["sine", "square", "sawtooth", "triangle"]
        },
        router: {
          lfo: ["oscsDetune", "osc1Detune", "filterCutoff"],
          envelope2: ["oscsDetune", "osc1Detune", "filterCutoff"]
        }
      },
      defaultParams: {
        oscillator1: {
          frequency: "131",
          typeOsc: "sawtooth",
          detune: 50
        },
        oscillator2: {
          frequency: "131",
          typeOsc: "sawtooth",
          // detune: 50,
          volume: 50
        },
        filter: {
          cutOffFreq: 40,
          type: "lowpass",
          setQ: 0
        },
        envelope: {
          attack: 0,
          decay: 25,
          sustain: 100,
          release: 90
        },
        envelope2: {
          attack: 0,
          decay: 90,
          sustain: 0,
          release: 0,
          assign: "filtercutoff",
          amount: 100
        },
        lfo: {
          frequency: 10,
          type: "sine",
          amount: 0
        },
        router: {
          lfo: "oscsDetune",
          envelope2: "filterCutoff"
        }
      }
    }
  },
  mutations: {
    setAudioParameter(state, { device, parameter, value }) {
      state.audioParameters[device][parameter] = value;
    },
    setFeaturedArtist(state, { artistName, avatarUrl }) {
      state.name = artistName;
      state.avatarUrl = avatarUrl;
    },
    setBpm(state, { parameter, value }) {
      state[parameter] = value;
    },
    setPresetBpm(state, bpm) {
      state.bpm = bpm;
    },
    setAudioParameterToPreset(state, { preset }) {
      // overwrite parameters from audiostate, this will not fill in nested objects
      state.audioParameters = {
        ...state.audioParameters,
        ...preset
      };
    },
    setGoalToPreset(state, { preset }) {
      // overwrite parameters from audiostate, this will not fill in nested objects
      state.gameState.goal = {
        ...state.gameState.goal,
        ...preset
      };
    },
    setMargin(state, { newMargin }) {
      // overwrite parameters from audiostate, this will not fill in nested objects
      state.gameState.margin = newMargin;
    },
    startTimerIsRunning(state) {
      // overwrite parameters from audiostate, this will not fill in nested objects
      state.gameState.timerIsRunning = true;
    },
    stopTimerIsRunning(state) {
      // overwrite parameters from audiostate, this will not fill in nested objects
      state.gameState.timerIsRunning = false;
    },
    armSweep(state) {
      // overwrite parameters from audiostate, this will not fill in nested objects
      state.gameState.sweepArmed = true;
    },
    disarmSweep(state) {
      // overwrite parameters from audiostate, this will not fill in nested objects
      state.gameState.sweepArmed = false;
    },
    addValueToScore(state, val) {
      state.gameState.score = add(state.gameState.score, val);
    },
    increaseLevelValue(state, val) {
      state.gameState.level = add(state.gameState.level, val);
    },
    setLevelValue(state, level) {
      state.gameState.level = level;
    },
    updateHighScore(state, val) {
      state.gameState.highScore = val;
      if (localStorage.getItem("highscore") < val) {
        localStorage.setItem("highscore", val);
      }
    },
    setKnobsAvailable(state, obj) {
      state.gameState.knobsAvailable = obj;
    },
    setCreateMode(state, isActive) {
      state.gameState.createModeIsActive = isActive;
    },
    increaseSequencesPassedInCurrentLevel(state) {
      state.gameState.sequencesPassedInCurrentLevel++;
    },
    resetSequencesPassedInCurrentLevel(state) {
      state.gameState.sequencesPassedInCurrentLevel = 0;
    },
    setTheGameToGameOver(state) {
      state.gameState.isGameOver = true;
    },
    setRequestNextLevelToTrue(state) {
      state.gameState.nextLevelRequested = true;
    },
    setRequestNextLevelToFalse(state) {
      state.gameState.nextLevelRequested = false;
    },
    setTheGameFromGameOver(state) {
      state.gameState.isGameOver = false;
    },
    setActiveSequence(state, sequence) {
      state.activeSequence = sequence;
    }
  },
  getters: {
    allParametersMatchGoal: (state, getters) => {
      return flatMap(getters.audioParametersMatchGoalWithMargin, val =>
        values(val)
      ).every(val => val);
    },
    nextLevelClickedInNavBar: state => {
      return state.gameState.nextLevelRequested ? "true" : "false";
    },
    displayedLevel: (state, getters) => {
      return state.gameState.level + 1;
    },
    audioParametersMatchGoalWithMargin: state => {
      return mapValues(state.audioParameters, (val, moduleName) => {
        return mapValues(val, (val, parameterName) => {
          return isArray(
            state.gameState.possibleValues[moduleName][parameterName]
          )
            ? val === state.gameState.goal[moduleName][parameterName]
            : inRange(
                val,
                state.gameState.goal[moduleName][parameterName] -
                  state.gameState.margin,
                state.gameState.goal[moduleName][parameterName] +
                  state.gameState.margin
              );
        });
      });
    }
  },
  actions: {
    shuffleRackSlotArray({ state, commit }) {
      var array = state.gameState.rackSlotArray;
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      state.gameState.rackSlotArray = array;
      return array;
    },
    randomizeAudioParameters({ state, commit }, randomizeArray) {
      const randomizeValues = (obj, selectObj) =>
        mapValues(obj, (val, moduleName) => {
          return mapValues(val, (val, parameterName) => {
            // if selectObj is provided and the value is falsey return obj value
            if (selectObj && !selectObj[moduleName][parameterName])
              return obj[moduleName][parameterName];
            const parameterValDef =
              state.gameState.possibleValues[moduleName][parameterName];
            return Array.isArray(parameterValDef)
              ? parameterValDef[random(0, parameterValDef.length - 1)]
              : random(0, 95);
          });
        });

      const randomizeWithoutMatches = (obj, selectObj, itrs = 0) => {
        if (itrs === 20) return obj;
        const randomPreset = randomizeValues(obj, selectObj); // randomly generated preset
        const accedentlyCorrectValues = mapValues(
          randomPreset,
          (val, moduleName) => {
            return mapValues(val, (val, parameterName) => {
              if (selectObj[moduleName][parameterName] !== true) return false;
              return isArray(
                state.gameState.possibleValues[moduleName][parameterName]
              )
                ? val === state.gameState.goal[moduleName][parameterName]
                : inRange(
                    val,
                    state.gameState.goal[moduleName][parameterName] -
                      state.gameState.margin,
                    state.gameState.goal[moduleName][parameterName] +
                      state.gameState.margin
                  );
            });
          }
        );
        if (
          find(accedentlyCorrectValues, mod => !!find(mod, par => par === true))
        )
          return randomizeWithoutMatches(
            randomPreset,
            accedentlyCorrectValues,
            itrs + 1
          );
        return randomPreset;
      };

      return commit("setAudioParameterToPreset", {
        preset: randomizeWithoutMatches(state.gameState.goal, randomizeArray)
      });
    },
    randomizGoalParameters({ state, commit }) {
      const randomizeValues = obj =>
        mapValues(obj, (val, moduleName) => {
          return mapValues(val, (val, parameterName) => {
            if (
              state.gameState.knobsAvailable &&
              state.gameState.knobsAvailable[moduleName] &&
              state.gameState.knobsAvailable[moduleName][parameterName]
            ) {
              const parameterValDef =
                state.gameState.possibleValues[moduleName][parameterName];
              return Array.isArray(parameterValDef)
                ? parameterValDef[random(0, parameterValDef.length - 1)]
                : random(0, 95);
            }
            return state.gameState.defaultParams[moduleName][parameterName];
          });
        });
      return commit("setGoalToPreset", {
        preset: randomizeValues(state.audioParameters)
      });
    },
    setSynthToGoal({ state }, synth) {
      synth.envelope.state.device.attack = character.envelope.attack(
        state.gameState.goal.envelope.attack
      );
      synth.envelope.state.device.decay = character.envelope.decay(
        state.gameState.goal.envelope.decay
      );
      synth.envelope.state.device.sustain = character.envelope.sustain(
        state.gameState.goal.envelope.sustain
      );
      synth.envelope.state.device.release = character.envelope.release(
        state.gameState.goal.envelope.release
      );
      synth.envelope2.state.device.attack = character.envelope2.attack(
        state.gameState.goal.envelope2.attack
      );
      synth.envelope2.state.device.decay = character.envelope2.decay(
        state.gameState.goal.envelope2.decay
      );
      synth.envelope2.state.device.sustain = character.envelope2.sustain(
        state.gameState.goal.envelope2.sustain
      );
      synth.envelope2.state.device.release = character.envelope2.release(
        state.gameState.goal.envelope2.release
      );
      synth.envelope2.state.device.max = character.envelope2.amount(
        state.gameState.goal.envelope2.amount
      );
      synth.filter.state.device.frequency.value = character.filter.cutOffFreq(
        state.gameState.goal.filter.cutOffFreq
      );
      synth.filter.state.device.type = character.filter.type(
        state.gameState.goal.filter.type
      );
      synth.filter.state.device.Q.value = character.filter.setQ(
        state.gameState.goal.filter.setQ
      );
      synth.lfo.state.device.frequency.value = character.lfo.frequency(
        state.gameState.goal.lfo.frequency
      );
      synth.lfo.state.device.max = character.lfo.amount(
        state.gameState.goal.lfo.amount
      );
      synth.lfo.state.device.type = character.lfo.type(
        state.gameState.goal.lfo.type
      );
      // synth.oscillator1.state.device.frequency.value = character.oscillator1.frequency(state.gameState.goal.oscillator1.frequency)
      synth.oscillator1.state.device.type = character.oscillator1.typeOsc(
        state.gameState.goal.oscillator1.typeOsc
      );
      synth.oscillator1.state.device.detune.value = character.oscillator1.detune(
        state.gameState.goal.oscillator1.detune
      );
      // synth.oscillator2.state.device.frequency.value = character.oscillator2.frequency(state.gameState.goal.oscillator2.frequency)
      synth.oscillator2.state.device.type = character.oscillator2.typeOsc(
        state.gameState.goal.oscillator2.typeOsc
      );
      synth.oscillator2.state.device.volume.value = character.oscillator2.volume(
        state.gameState.goal.oscillator2.volume
      );
      synth.connectLfo(state.gameState.goal.router.lfo);
      synth.connectEnvelope2(state.gameState.goal.envelope2);
    },
    setSynthToDefaultParameters({ state }, synth) {
      synth.envelope.state.device.attack = character.envelope.attack(
        state.audioParameters.envelope.attack
      );
      synth.envelope.state.device.decay = character.envelope.decay(
        state.audioParameters.envelope.decay
      );
      synth.envelope.state.device.sustain = character.envelope.sustain(
        state.audioParameters.envelope.sustain
      );
      synth.envelope.state.device.release = character.envelope.release(
        state.audioParameters.envelope.release
      );
      synth.envelope2.state.device.attack = character.envelope2.attack(
        state.audioParameters.envelope2.attack
      );
      synth.envelope2.state.device.decay = character.envelope2.decay(
        state.audioParameters.envelope2.decay
      );
      synth.envelope2.state.device.sustain = character.envelope2.sustain(
        state.audioParameters.envelope2.sustain
      );
      synth.envelope2.state.device.release = character.envelope2.release(
        state.audioParameters.envelope2.release
      );
      synth.envelope2.state.device.max = character.envelope2.amount(
        state.audioParameters.envelope2.amount
      );
      synth.filter.state.device.frequency.value = character.filter.cutOffFreq(
        state.audioParameters.filter.cutOffFreq
      );
      synth.filter.state.device.type = character.filter.type(
        state.audioParameters.filter.type
      );
      synth.filter.state.device.Q.value = character.filter.setQ(
        state.audioParameters.filter.setQ
      );
      synth.lfo.state.device.frequency.value = character.lfo.frequency(
        state.audioParameters.lfo.frequency
      );
      synth.lfo.state.device.max = character.lfo.amount(
        state.audioParameters.lfo.amount
      );
      synth.lfo.state.device.type = character.lfo.type(
        state.audioParameters.lfo.type
      );
      // synth.oscillator1.state.device.frequency.value = character.oscillator1.frequency(state.audioParameters.oscillator1.frequency)
      synth.oscillator1.state.device.type = character.oscillator1.typeOsc(
        state.audioParameters.oscillator1.typeOsc
      );
      synth.oscillator1.state.device.detune.value = character.oscillator1.detune(
        state.audioParameters.oscillator1.detune
      );
      // synth.oscillator2.state.device.frequency.value = character.oscillator2.frequency(state.audioParameters.oscillator2.frequency)
      synth.oscillator2.state.device.type = character.oscillator2.typeOsc(
        state.audioParameters.oscillator2.typeOsc
      );
      synth.oscillator2.state.device.volume.value = character.oscillator2.volume(
        state.audioParameters.oscillator2.volume
      );
      synth.connectLfo(state.audioParameters.router.lfo);
      synth.connectEnvelope2(state.audioParameters.router.envelope2);
    },
    exportPreset({ state }, data) {
      return addPreset({
        name: data.name,
        bpm: state.bpm,
        parameterValues: state.audioParameters,
        sequenceArray: state.activeSequence
      });
    },
    setLevel({ state, commit }, { knobsAvailable }) {
      commit("setKnobsAvailable", knobsAvailable);
    },
    startNewLevel({ state, commit, dispatch }, { knobsAvailable, level }) {
      commit("resetSequencesPassedInCurrentLevel");
      if (level) commit("setLevelValue", level);
      return dispatch("setLevel", {
        knobsAvailable
      });
    },
    levelDone({ state, commit }) {
      commit("stopTimerIsRunning");
      // commit('addValueToScore', timeLeft)
    },
    gameOver({ state, commit }) {
      commit("setTheGameToGameOver");
      // commit('stopTimerIsRunning')
      // console.log(`you failed at: ${state.gameState.level + 1}`)
      // commit('setLevelValue', state.gameState.level)
      // commit('startTimerIsRunning')
    },
    nextLevel({ state, commit }) {
      commit("setRequestNextLevelToTrue");
    },
    notNextLevel({ state, commit }) {
      commit("setRequestNextLevelToFalse");
    },
    startAgain({ state, commit }) {
      commit("setTheGameFromGameOver");
    }
  }
});
