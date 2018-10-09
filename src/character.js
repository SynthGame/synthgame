export default {
  envelope: {
    attack: val => val / 100 + 0.001,
    decay: val => Math.pow(val, (val / 100)) - 0.9,
    sustain: val => val / 100,
    release: val => Math.pow(val, (val / 100)) - 0.7,
  },
  envelope2: {
    attack: val => val / 100 + 0.001,
    decay: val => Math.pow(val, (val / 100)) - 0.9,
    sustain: val => val / 100,
    release: val => Math.pow(val, (val / 100)) - 0.7,
    amount: val => Math.pow((val * 200), (val / 100)) + 20,
  },
  filter: {
    cutOffFreq: val => Math.pow((val * 200), (val / 100)) + 20,
    type: val => val,
    setQ: val => val / 8
    // gain: val =>
  },
  lfo: {
    frequency: val => Math.pow(val, (val / 100)) - 0.99,
    type: val => val,
    amount: val => Math.pow((val * 100), (val / 100))
  },
  oscillator1: {
    frequency: val => val,
    typeOsc: val => val,
    detune: val => (val * 24) - 1200,
    // phase: val => val
  },
  oscillator2: {
    frequency: val => val,
    typeOsc: val => val,
    // detune: val => (val * 2) - 120,
    volume: val => (val/1.5) - 75
  },
  router: {
    envelope2: val => val,
    lfo: val => val,
  },
}
