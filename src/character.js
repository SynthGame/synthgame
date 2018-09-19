export default {
  envelope: {
    attack: val => val / 100 + 0.01,
    decay: val => Math.pow(val, (val / 300)) - 0.95,
    sustain: val => val / 100,
    release: val => val / 100
  },
  envelope2: {
    attack: val => val / 50 + 0.01,
    decay: val => Math.pow(val, (val / 300)) - 0.95,
    sustain: val => val / 100,
    release: val => val / 100
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
    amount: val => (val * 40)
  },
  oscillator1: {
    frequency: val => val,
    typeOsc: val => val,
    detune: val => (val * 2) - 120,
    // phase: val => val
  },
  oscillator2: {
    frequency: val => val,
    typeOsc: val => val,
    // detune: val => (val * 2) - 120,
    volume: val => (val/1.5) - 75
  }
}
