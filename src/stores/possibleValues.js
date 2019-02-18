const possibleValues = {
    envelope: {},
    envelope2: {
      assign: ['filtercutoff']
    },
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
    },
    router: {
      lfo: ['oscsDetune', 'osc1Detune', 'filterCutoff'],
      envelope2: ['oscsDetune', 'osc1Detune', 'filterCutoff'],
    }
};

export default possibleValues;