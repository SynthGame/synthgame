import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    audioParameters: {
      delay: {
        delayTime: 20,
        wet: 0.2,
        feedback: 10,
      },
      envelope: {
        attack: 11,
        decay: 21,
        sustain: 9,
        release: 12,
      },
      filter: {
        cutOffFreq: 8000,
        type: 0,
        setQ: 50,
        gain: 1,
      },
      lfo: {
        frequency: 0,
        type: 0,
        amount: 0,
      },
      oscillator: {
        frequency: 2,
        typeOsc: 1,
        detune: 60,
        phase: 0,
      },
      reverb: {
        roomSize: 0.5,
        wet: 0.2,
      }
    }

  },
  mutations: {
    setAudioParameter (state, {device, parameter, value}) {
      state.audioParameters[device][parameter] = value
    }
  },
  actions: {

  }
})
