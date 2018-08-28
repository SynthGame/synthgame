import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    audioParameters: {
      delay: {
        delayTime: 1,
        wet: 1,
        feedback: 100
      },
      envelope: {
        attack: 0.11,
        decay: 0.21,
        sustain: 0.09,
        release: 1.2
      },
      filter: {
        cutOffFreq: 5000,
        type: 0,
        setQ: 25,
        gain: 0.1,
      },
      lfo: {
        frequency: 10,
        type: 0,
        amount: 4000,
      },
      oscillator: {
        frequency: 2,
        typeOsc: 1,
        detune: 1,
        phase: 0,
      },
      reverb: {
        decay: 2.4, // setting this smaler than 2 will produce an error with scheduling
        preDelay: 1,
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
