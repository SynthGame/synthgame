export default {
  delay: {
    delayTime: val => val / 100,
    wet: val => val / 100,
    feedback: val => val / 100
  },
  envelope: {
    attack: val => val + 0.01,
    decay: val => Math.pow(val, (val / 100)) - 0.99,
    sustain: val => val / 100,
    release: val => val
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
  oscillator: {
    frequency: val => val,
    typeOsc: val => val,
    detune: val => (val * 2) - 120
    // phase: 0
  },
  reverb: {
    roomSize: val => val / 100,
    wet: val => val / 200
  }
}
