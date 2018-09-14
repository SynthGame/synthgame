// call me Pieter
export default [
  // level 1 - 3 typeOsc
  // level 1
  {
    oscillator1: {
      detune: true
    },
    oscillator2: {},
    filter: {},
    envelope: {},
    lfo: {},
    delay: {},
    reverb: {},
    levelData: {
      text: 'You have 30 seconds to recreate the sound playing now. Use the white guidelines to get going.'
    }
  },
  // level 5
  {
    oscillator1: {
      detune: true,
      typeOsc: true,
    },
    oscillator2: {},
    filter: {},
    envelope: {},
    lfo: {},
    delay: {},
    reverb: {},
    levelData: {
      text: 'You unlocked waveforms!<span>Ranging from the smooth, plain sound of a sine wave, to the harmonically rich buzz of a sawtooth wave, waveforms shape the character of the sound.</span>'
    }
  },
  // level 6
  {
    oscillator1: {
      detune: true,
      typeOsc: true,
    },
    oscillator2: {},
    filter: {
      cutOffFreq: true,
    },
    envelope: {},
    lfo: {},
    delay: {},
    reverb: {},
    levelData: {
      text: 'Introducing the filter!<span>The filter removes unwanted parts from a signal. adjust the frequency and hear the sound change.</span>'
    }
  },
  // level 7 - 9 detune
  // level 7
  {
    oscillator1: {
      detune: true,
      typeOsc: true,
    },
    oscillator2: {},
    filter: {
      cutOffFreq: true,
      type: true
    },
    envelope: {},
    lfo: {},
    delay: {},
    reverb: {},
    levelData: {
      text: 'Filter types!<span>A lowpass filter passes signals with a frequency lower than a selected cutoff frequency. A highpass filter does the opposite, and a bandpass filters both ends.</span>'
    }
  },
  // level 8
  {
    oscillator1: {
      detune: true,
      typeOsc: true,
    },
    oscillator2: {},
    filter: {
      cutOffFreq: true,
      type: true,
      setQ: true
    },
    envelope: {},
    lfo: {},
    delay: {},
    reverb: {},
    levelData: {}
  },
  // level 9
  {
    oscillator1: {
      detune: true,
      typeOsc: true,
    },
    oscillator2: {},
    filter: {
      cutOffFreq: true,
      type: true,
      setQ: true
    },
    envelope: {
      attack: true
    },
    lfo: {},
    delay: {},
    reverb: {},
    levelData: {}
  },
  // level 10 - 15 2 controls
  // level 10
  {
    oscillator1: {
      detune: true,
      typeOsc: true,
    },
    oscillator2: {},
    filter: {
      cutOffFreq: true,
      type: true,
      setQ: true
    },
    envelope: {
      attack: true,
      decay: true
    },
    lfo: {},
    delay: {},
    reverb: {},
    levelData: {}
  },
  // level 11
  {
    oscillator1: {
      detune: true,
      typeOsc: true,
    },
    oscillator2: {},
    filter: {
      cutOffFreq: true,
      type: true,
      setQ: true
    },
    envelope: {
      attack: true,
      decay: true,
      sustain: true,
    },
    lfo: {},
    delay: {},
    reverb: {},
    levelData: {}
  },
  // level 12
  {
    oscillator1: {
      detune: true,
      typeOsc: true,
    },
    oscillator2: {},
    filter: {
      cutOffFreq: true,
      type: true,
      setQ: true
    },
    envelope: {
      attack: true,
      decay: true,
      sustain: true,
      release: true
    },
    lfo: {},
    delay: {},
    reverb: {},
    levelData: {}
  },
  // level 13
  {
    oscillator1: {
      detune: true,
      typeOsc: true,
    },
    oscillator2: {},
    filter: {
      cutOffFreq: true,
      type: true,
      setQ: true
    },
    envelope: {
      attack: true,
      decay: true,
      sustain: true,
      release: true
    },
    lfo: {
      amount: true
    },
    delay: {},
    reverb: {},
    levelData: {}
  },
  // level 14
  {
    oscillator1: {
      detune: true,
      typeOsc: true,
    },
    oscillator2: {},
    filter: {
      cutOffFreq: true,
      type: true,
      setQ: true
    },
    envelope: {
      attack: true,
      decay: true,
      sustain: true,
      release: true
    },
    lfo: {
      amount: true,
      frequency: true
    },
    delay: {},
    reverb: {},
    levelData: {}
  },
  // level 15
  {
    oscillator1: {
      detune: true,
      typeOsc: true,
    },
    oscillator2: {},
    filter: {
      cutOffFreq: true,
      type: true,
      setQ: true
    },
    envelope: {
      attack: true,
      decay: true,
      sustain: true,
      release: true
    },
    lfo: {
      amount: true,
      frequency: true,
      type: true
    },
    delay: {},
    reverb: {},
    levelData: {}
  },
]
