import Tone from 'tone'
import c from '@/constants'

// define logging mechanism
const log = (log) => c.DEBUG_ENABLED ? console.info(log) : log

export default {
  state: {
    Tone: Tone,
    loop: undefined
  },
  init () {
    log('initializing all submodules before using')
    this.oscillator.init()
    this.envelope.init()
    this.lfo.init()
    this.filter.init()
    this.delay.init()
    this.reverb.init()

    const oscillator = this.oscillator.state.device
    const envelope = this.envelope.state.device
    const lfo = this.lfo.state.device
    const filter = this.filter.state.device
    const delay = this.delay.state.device
    const reverb = this.reverb.state.device

    log(`Connecting LFO to filter frequency`)
    lfo.connect(filter.frequency)
    log(`Generating reverb`)
    reverb.generate()
    log(`Chaining oscillator => envelope => filter => delay => reverb to Master`)
    oscillator.chain(envelope, filter, delay, reverb, Tone.Master)
    log(`Starting oscillator`)
    oscillator.start()
  },
  setBpm (bpm) {
    log(`setting BPM length to: ${bpm}`)
    this.state.Tone.Transport.bpm.value = bpm
    return this.state.Tone.Transport.bpm.value
  },
  setMainLoop ({noteArray, subdivision}, callback) {
    log(`Setting new main loop`)
    this.state.loop = new Tone.Sequence(callback, noteArray, subdivision)
    return this.state.loop
  },
  start () {
    log(`starting Tone.js Transport`)
    return this.state.Tone.Transport.start()
  },
  connectChanelToMaster (channel) {
    log(`Connecting channel: ${channel} to master`)
    // disconnect outputs?
    return channel.toMaster()
  },
  oscillator: {
    state: {
      device: undefined
    },
    init (options) {
      log(`Initializing oscillator with options: ${options}`)
      this.state.device = new Tone.Oscillator({
        type: 'sine',
        frequency: 440,
        detune: 0,
        phase: 0,
        ...options
      })
    }
  },
  envelope: {
    state: {
      device: undefined,
      envelopeToneLength: '1n'
    },
    init (options) {
      log(`Initializing envelope with options: ${options}`)
      this.state.device = new Tone.AmplitudeEnvelope({
        attack: 0.01,
        decay: 0.1,
        sustain: 0.5,
        release: 1,
        attackCurve: 'linear',
        releaseCurve: 'exponential',
        ...options
      })
    },
    playNote (note) {
      log(`Playing note: ${note}`)
      return this.state.device.triggerAttackRelease(note, this.state.envelopeToneLength)
    },
    setToneLength (length) {
      log(`setting envelope tone length to: ${length}`)
      this.state.envelopeToneLength = length
      return this.state.envelopeToneLength
    }
  },
  lfo: {
    state: {
      device: undefined
    },
    init (options) {
      log(`Initializing LFO with options: ${options}`)
      this.state.device = new Tone.LFO({
        type: 'sine',
        min: 0,
        max: 350,
        phase: 0,
        frequency: '4n',
        amplitude: 1,
        ...options
      })
    }
  },
  filter: {
    state: {
      device: undefined
    },
    init (options) {
      log(`Initializing filter with options: ${options}`)
      this.state.device = new Tone.Filter({
        type: 'lowpass',
        frequency: 350,
        rolloff: -12,
        Q: 1,
        gain: 0,
        ...options
      })
    }
  },
  delay: {
    state: {
      device: undefined
    },
    init (options) {
      log(`Initializing delay with options: ${options}`)
      this.state.device = new Tone.FeedbackDelay({
        delayTime: 0.25,
        maxDelay: 1,
        ...options
      })
    }
  },
  reverb: {
    state: {
      device: undefined
    },
    init (options) {
      log(`Initializing reverb with options: ${options}`)
      this.state.device = new Tone.Reverb({
        decay: 1.5,
        preDelay: 0.01,
        ...options
      })
    },
    setParameter(parameter, value, setValueProp = false) {
      log(`Generating new reverb based on new value: : ${parameter} = ${value}`)
      if (setValueProp) this.state.device[parameter].value = value // set value by prop (for signals)
      else this.state.device[parameter] = value // set value directly (for properties)
      this.state.device.generate() // generate new reverb
      return this.state.device[parameter].value
    }
  },
}
