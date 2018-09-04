import Tone from 'tone'
import { DEBUG_ENABLED } from '@/constants'

// define logging mechanism
const log = (log) => DEBUG_ENABLED ? console.info(log) : log

const audioInstance = () => ({
  state: {
    Tone: Tone,
    loop: undefined,
    toneLength: '16n'
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
    const pitchShift = this.oscillator.state.pitchShift
    const envelope = this.envelope.state.device
    const lfo = this.lfo.state.device
    const filter = this.filter.state.device
    const delay = this.delay.state.device
    const reverb = this.reverb.state.device

    log(`Created new general output for audio device`)
    const output = new Tone.Volume(-12)
    log(`Connecting LFO to filter frequency`)
    lfo.connect(filter.frequency).start()
    log(`Generating reverb`)
    // reverb.generate()
    log(`Chaining oscillator => pitch shift => envelope => filter => delay => reverb`)
    oscillator.chain(pitchShift, envelope, filter, reverb, delay)

    log(`Starting oscillator`)
    oscillator.start()

    log(`Connecting last node, delay, to general output ${output}`)
    delay.connect(output)
    return output

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
  playNote (shift) {
    log(`Playing shifted note: ${shift}`)
    this.oscillator.state.pitchShift.pitch = shift
    return this.envelope.state.device.triggerAttackRelease(this.state.toneLength)
  },
  setToneLength (length) {
    log(`setting envelope tone length to: ${length}`)
    this.state.toneLength = length
    return this.state.toneLength
  },
  oscillator: {
    state: {
      device: undefined,
      pitchShift: undefined
    },
    init (options) {
      log(`Initializing oscillator with options: ${options}`)
      this.state.device = new Tone.Oscillator({
        type: 'sine',
        frequency: 131,
        detune: 0,
        phase: 0,
        ...options
      })
      log(`Initializing pitch shift effect on oscillator`)
      this.state.pitchShift = new Tone.PitchShift()
    }
  },
  envelope: {
    state: {
      device: undefined
    },
    init (options) {
      log(`Initializing envelope with options: ${options}`)
      this.state.device = new Tone.AmplitudeEnvelope({
        attack: 0.11,
        decay: 0.21,
        sustain: 0.09,
        release: 1.2,
        attackCurve: 'linear',
        releaseCurve: 'exponential',
        ...options
      })
    }
  },
  lfo: {
    state: {
      device: undefined
    },
    init (options) {
      log(`Initializing LFO with options: ${options}`)
      this.state.device = new Tone.LFO(
      //   {
      //   type: 'sine',
      //   min: 0.1,
      //   max: 10,
      //   phase: 0,
      //   frequency: 1,
      //   amplitude: 1,
      //   ...options
      // }
        '4n', 0, 8000
      )
    }
  },
  filter: {
    state: {
      device: undefined
    },
    init (options) {
      log(`Initializing filter with options: ${options}`)
      this.state.device = new Tone.Filter(
        {
          type: 'lowpass',
          frequency: 8000,
          rolloff: -12,
          Q: 1,
          gain: 1,
          ...options
        }
      )
    }
  },
  delay: {
    state: {
      device: undefined
    },
    init (options) {
      log(`Initializing delay with options: ${options}`)
      this.state.device = new Tone.FeedbackDelay(
      //   {
      //   delayTime: 0.25,
      //   maxDelay: 1,
      //   ...options
      // }
        '8n', 0.5
      )
    }
  },
  reverb: {
    state: {
      device: undefined
    },
    init (options) {
      log(`Initializing reverb with options: ${options}`)
      this.state.device = new Tone.JCReverb(
      //   {
      //   decay: 1.5,
      //   preDelay: 0.01,
      //   ...options
      // }
        0.9
      )
    },
    setParameter (parameter, value) {
      log(`Generating new reverb based on new value: : ${parameter} = ${value}`)
      this.state.device[parameter] = value // set value directly (for properties)
      return this.state.device.generate() // generate new reverb returns promise
    }
  }
})

export default {...new audioInstance(), ...{goalMirrorInstance: new audioInstance()}}
