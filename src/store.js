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
import { addPreset, createRoom, updateMyScore, getRoom } from "@/db";
import Levels from "./levels";
import audio from "./audio";

//
import PossibleValues from "./stores/possibleValues";
import AudioParameters from "./stores/audioParameters";
import NoSequenceAvailable from "./stores/sequence";
import NoKnobsAvalible from "./stores/noKnobsAvalible";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bpm: 110,
    name: "Anonymous",
    activeButton: 0,
    avatarUrl: null,
    audioParameters: AudioParameters(),
    sequence: NoSequenceAvailable,
    roomId: null,
    roomHighScores: [
      {
        name: "Anonymous",
        score: 0
      }
    ],
    gameState: {
      // GAME SCORING //
      level: -1,
      attempts: 0,
      score: 0,
      highScore: 0,

      // GAME MECHANICS //
      levels: Levels,
      goal: AudioParameters(),
      userAttemptPreset: AudioParameters(),
      defaultParams: AudioParameters(),
      knobsAvailable: NoKnobsAvalible,

      presetNumber: 0,

      // TOGGLES //
      madeAttempt: false,
      completedLevel: false,
      createModeIsActive: false,
      sweepArmed: true,
      isGameOver: false,

      // CONTSTANTS //
      margin: 10,
      possibleValues: PossibleValues
    }
  },
  mutations: {
    // Multiplayer
    setUsername(state, { userName }) {
      state.name = userName;
    },
    setRoomId(state, { roomId }) {
      state.roomId = roomId;
    },
    setRoomHighScores(state, scores) {
      const results = Object.keys(scores).map(key => {
        return {
          score: scores[key],
          name: key
        };
      });

      state.roomHighScores = results;
    },
    // GAME STATE
    setKnobAvalible(state, payload) {
      const { knobName, moduleName } = payload;
      let knobs = {
        oscillator1: {},
        oscillator2: {},
        filter: {},
        envelope: {},
        envelope2: {},
        lfo: {},
        router: {},
        sequencer: {}
      };

      knobs[moduleName][knobName] = true;

      state.gameState.knobsAvailable = knobs;
    },
    // setUserAttemptParameters(state, { device, parameter, value }) {
    //   state.gameState.userAttemptPreset[device][parameter] = value
    // },
    setPresetNumber(state, payload) {
      state.gameState.presetNumber = payload.value;
    },
    setFeaturedArtist(state, { artistName, avatarUrl }) {
      // state.name = artistName;
      state.avatarUrl = avatarUrl;
    },
    setBpm(state, { parameter, value }) {
      state[parameter] = value;
    },
    setStep(state, i) {
      if (i) return (state.activeButton = i), state.activeButton;
      if (state.activeButton === 15) state.activeButton = -1;
      state.activeButton++;
    },
    setSequence(state, { parameter, value }) {
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
      console.log("preset", preset);
      // state.gameState.goal = JSON.parse(JSON.stringify(preset));
    },
    setMargin(state, { newMargin }) {
      // overwrite parameters from audiostate, this will not fill in nested objects
      state.gameState.margin = newMargin;
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
      state.gameState.score = state.gameState.score + val;
    },
    increaseLevelValue(state, val) {
      state.gameState.level = state.gameState.level + val;
    },
    setLevelValue(state, level) {
      state.gameState.level = level;
    },
    // updateHighScore(state, val) {
    //   state.gameState.highScore = val;
    //   if (localStorage.getItem("highscore") < val) {
    //     localStorage.setItem("highscore", val);
    //   }
    // },
    setKnobsAvailable(state, obj) {
      state.gameState.knobsAvailable = obj;
    },
    setCreateMode(state, isActive) {
      state.gameState.createModeIsActive = isActive;
    },
    setTheGameToGameOver(state) {
      state.gameState.isGameOver = true;
    },
    setTheGameFromGameOver(state) {
      state.gameState.isGameOver = false;
    },
    setActiveSequence(state, sequence) {
      state.activeSequence = sequence;
    },
    toggleAttemptMade(state) {
      state.gameState.madeAttempt = !state.gameState.madeAttempt;
    },
    incrementAttempt(state) {
      state.gameState.attempts += 1;
    },
    resetAttempts(state) {
      state.gameState.attempts = 0;
    },
    setCompletedLevel(state, payload) {
      state.gameState.completedLevel = payload.value;
    },
    setLevelScore(state, payload) {
      const lvl = state.gameState.level;
      console.log(payload);
      console.log(`Level ${lvl}`);
      state.gameState.levels[lvl].levelData.score = payload;
    },
    setAudioParameter(state, { device, parameter, value }) {
      state.audioParameters[device][parameter] = value;
    }
  },
  getters: {
    allParametersMatchGoal: (state, getters) => {
      return getters.audioParametersMatchGoalWithMargin;
    },
    displayedLevel: (state, getters) => {
      return state.gameState.level + 1;
    },
    audioParametersMatchGoalWithMargin: state => {
      function reduceKnobsAvalible() {
        const knobs = state.gameState.knobsAvailable;

        let devices = Object.keys(knobs);

        let parent = Object.values(knobs).find(knob => {
          return Object.entries(knob).length !== 0;
        });

        const parameter = Object.keys(parent)[0];
        const device = devices.filter(
          device => Object.keys(knobs[device])[0] === parameter
        );

        return { device, parameter };
      }

      const { device, parameter } = reduceKnobsAvalible();

      let val = state.audioParameters[device][parameter];

      console.log(`value: ${val}`);
      console.log(`Goal: ${state.gameState.goal[device][parameter]}`);

      return isArray(state.gameState.possibleValues[device][parameter])
        ? val === state.gameState.goal[device][parameter]
        : inRange(
            val,
            state.gameState.goal[device][parameter] - state.gameState.margin,
            state.gameState.goal[device][parameter] + state.gameState.margin
          );
    }
  },
  actions: {
    // CREATE NEW ROOM
    createNewRoom(store) {
      const name = store.state.name;
      const score = store.state.gameState.score;

      createRoom({ name, score }, (URL) => {
        store.commit("setRoomId", { roomId: URL });
      });
    },
    updateRoom(store) {
      console.log(`Room ID: ${store.state.roomId}`);
      getRoom(store.state.roomId, (scoreData) => {
        store.commit("setRoomHighScores", scoreData);
      });
    },
    updateHighScore(store) {
      const url = store.state.roomId,
        name = store.state.name,
        score = store.state.gameState.score;
      updateMyScore({ url, name, score }, () => store.dispatch("updateRoom"));
    },
    setAudioParameter(state, { device, parameter, value }) {
      console.log(`device ${device}; param: ${parameter}; value: ${value}`);
      console.log(audio[device].state.device[parameter]);

      this.commit("setAudioParameter", { device, parameter, value });

      const baddies = ['cutOffFreq', "typeOsc", "volume"]

      if (!(baddies.includes(parameter))) {
        if (audio[device].state.device[parameter].value === undefined) {
          audio[device].state.device[parameter] = value;
        } else {
          audio[device].state.device[parameter].value = value;
        }
      }
    },
    madeAttempt({ state, commit }) {
      commit("toggleAttemptMade");
      commit("incrementAttempt");
    },
    randomizeAudioParameters({ state, commit }, { device, paramater }) {
      const stringsParams = (state, device, paramater) => {
        if (device === "lfo") {
          return Math.random(0, 100);
        } else {
          const possibleValues = state.gameState.possibleValues;
          let len = possibleValues[device][paramater].length;
          let rando = Math.round(Math.random() * (len - 1) + 1);
          console.log(possibleValues[device][paramater][rando]);
          return possibleValues[device][paramater][rando];
        }
      };

      const randomizeWithoutMatches = (goal, device, paramater) => {
        let randomGameState = { ...goal };
        const stringers = [
          "frequency",
          "typeOsc",
          "type",
          "assign",
          "lfo",
          "envelope2"
        ];
        // if param is a string type...
        if (stringers.includes(paramater)) {
          let newValue = stringsParams(state, device, paramater);
          return (randomGameState[device][paramater] = newValue);
          console.log(`New Value: ${newValue}`);
          console.log(`device ${device}, param ${paramater}`);
          console.log(goal);
        } else {
          let newValue = Math.random() * (100 - 1) + 1;
          console.log(`device ${device}, param ${paramater}`);
          console.log(randomGameState);
          return (randomGameState[device][paramater] = newValue);
        }
      };

      return commit("setAudioParameterToPreset", {
        preset: randomizeWithoutMatches(state.gameState.goal, device, paramater)
      });
    },

    ///
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
    setSynthToUserAttempt({ state }, synth) {
      synth.envelope.state.device.attack = character.envelope.attack(
        state.gameState.userAttemptPreset.envelope.attack
      );
      synth.envelope.state.device.decay = character.envelope.decay(
        state.gameState.userAttemptPreset.envelope.decay
      );
      synth.envelope.state.device.sustain = character.envelope.sustain(
        state.gameState.userAttemptPreset.envelope.sustain
      );
      synth.envelope.state.device.release = character.envelope.release(
        state.gameState.userAttemptPreset.envelope.release
      );
      synth.envelope2.state.device.attack = character.envelope2.attack(
        state.gameState.userAttemptPreset.envelope2.attack
      );
      synth.envelope2.state.device.decay = character.envelope2.decay(
        state.gameState.userAttemptPreset.envelope2.decay
      );
      synth.envelope2.state.device.sustain = character.envelope2.sustain(
        state.gameState.userAttemptPreset.envelope2.sustain
      );
      synth.envelope2.state.device.release = character.envelope2.release(
        state.gameState.userAttemptPreset.envelope2.release
      );
      synth.envelope2.state.device.max = character.envelope2.amount(
        state.gameState.userAttemptPreset.envelope2.amount
      );
      synth.filter.state.device.frequency.value = character.filter.cutOffFreq(
        state.gameState.userAttemptPreset.filter.cutOffFreq
      );
      synth.filter.state.device.type = character.filter.type(
        state.gameState.userAttemptPreset.filter.type
      );
      synth.filter.state.device.Q.value = character.filter.setQ(
        state.gameState.userAttemptPreset.filter.setQ
      );
      synth.lfo.state.device.frequency.value = character.lfo.frequency(
        state.gameState.userAttemptPreset.lfo.frequency
      );
      synth.lfo.state.device.max = character.lfo.amount(
        state.gameState.userAttemptPreset.lfo.amount
      );
      synth.lfo.state.device.type = character.lfo.type(
        state.gameState.userAttemptPreset.lfo.type
      );
      synth.oscillator1.state.device.frequency.value = character.oscillator1.frequency(
        state.gameState.userAttemptPreset.oscillator1.frequency
      );
      synth.oscillator1.state.device.type = character.oscillator1.typeOsc(
        state.gameState.userAttemptPreset.oscillator1.typeOsc
      );
      synth.oscillator1.state.device.detune.value = character.oscillator1.detune(
        state.gameState.userAttemptPreset.oscillator1.detune
      );
      synth.oscillator2.state.device.frequency.value = character.oscillator2.frequency(
        state.gameState.userAttemptPreset.oscillator2.frequency
      );
      synth.oscillator2.state.device.type = character.oscillator2.typeOsc(
        state.gameState.userAttemptPreset.oscillator2.typeOsc
      );
      synth.oscillator2.state.device.volume.value = character.oscillator2.volume(
        state.gameState.userAttemptPreset.oscillator2.volume
      );
      synth.connectLfo(state.gameState.userAttemptPreset.router.lfo);
      synth.connectEnvelope2(state.gameState.userAttemptPreset.envelope2);
    },
    setSynthToAudioParameters({ state }, synth) {
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
      synth.oscillator1.state.device.frequency.value = character.oscillator1.frequency(
        state.audioParameters.oscillator1.frequency
      );
      synth.oscillator1.state.device.type = character.oscillator1.typeOsc(
        state.audioParameters.oscillator1.typeOsc
      );
      synth.oscillator1.state.device.detune.value = character.oscillator1.detune(
        state.audioParameters.oscillator1.detune
      );
      synth.oscillator2.state.device.frequency.value = character.oscillator2.frequency(
        state.audioParameters.oscillator2.frequency
      );
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
      if (level) commit("setLevelValue", level);
      return dispatch("setLevel", {
        knobsAvailable
      });
    },
    levelDone({ state, commit }) {
      // commit('addValueToScore', timeLeft)
    },
    gameOver({ state, commit }) {
      commit("setTheGameToGameOver");
      // console.log(`you failed at: ${state.gameState.level + 1}`)
      // commit('setLevelValue', state.gameState.level)
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
