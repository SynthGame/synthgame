import Tone from 'tone'
import { DEBUG_ENABLED } from '@/constants'

// define logging mechanism
const log = (log) => false ? console.info(log) : log

export default {
  state: {
    Tone: Tone,
    loop: undefined,
    toneLength: '16n'
  },
  init () {
    log('initializing all submodules before using')
    this.player.init()
    this.gameOverPlayer.init()
    this.sweepPlayer.init()
    this.oscillator1.init()
    this.oscillator2.init()
    this.envelope.init()
    this.lfo.init()
    this.filter.init()
    this.delay.init()
    this.reverb.init()
    this.compressor.init()
    this.volume.init()

    const player = this.player.state.device
    const gameOverPlayer = this.gameOverPlayer.state.device
    const sweepPlayer = this.sweepPlayer.state.device
    const oscillator1 = this.oscillator1.state.device
    const oscillator2 = this.oscillator2.state.device
    const pitchShift = this.oscillator1.state.pitchShift
    const envelope = this.envelope.state.device
    const lfo = this.lfo.state.device
    const filter = this.filter.state.device
    const volume = this.volume.state.device
    const delay = this.delay.state.device
    const reverb = this.reverb.state.device
    const compressor = this.compressor.state.device


    log(`Created new general output for audio device`)
    const output = new Tone.Volume(6)
    log(`Connecting LFO to filter frequency`)
    lfo.connect(oscillator1.detune).start()
    log(`Connecting player to compressor`)
    player.connect(compressor)
    log(`Connecting sweepPlayer to compressor`)
    sweepPlayer.connect(compressor)
    log(`Connecting gameOverPlayer to compressor`)
    gameOverPlayer.connect(compressor)
    log(`Adjusting volume to make an ok mix`)
    player.volume.value = 0
    sweepPlayer.volume.value = 3
    gameOverPlayer.volume.value = 0
    oscillator1.volume.value = -12
    oscillator2.volume.value = -12
    lfo.connect(oscillator1.detune).start()
    log(`Chaining oscillator1 => pitch shift => envelope => filter => delay => reverb`)
    oscillator1.chain(pitchShift, filter, envelope, compressor, volume, output)
    oscillator2.connect(pitchShift)

    log(`Starting oscillator1`)
    oscillator1.start()
    oscillator2.start()

    return output
  },
  setBpm (bpm) {
    log(`setting BPM length to: ${bpm}`)
    this.state.Tone.Transport.bpm.value = bpm
    return this.state.Tone.Transport.bpm.value
  },
  resetSynth() {
    console.log('this.reverb.state.device.dispose', this.reverb.state.device.dispose());
    // this.reverb.state.device.dispose();
    // this.delay.state.device.dispose();
  },
  setMainLoop ({noteArray, subdivision}, callback) {
    log(`Setting new main loop`)
    if(this.state.loop) this.state.loop.dispose()
    this.state.loop = new Tone.Sequence(callback, noteArray, subdivision)
    return this.state.loop
  },
  stopMainLoop () {
    this.state.loop.stop();
    this.oscillator1.state.device.stop()
    this.oscillator2.state.device.stop()
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
  playNote (shift, {noteLength, volume}) {
    log(`Playing shifted note: ${shift}`)
    this.oscillator1.state.pitchShift.pitch = shift
    this.oscillator2.state.pitchShift.pitch = shift
    if(volume) this.volume.state.device.volume.value = volume // TODO: should only set volume for this note
    return this.envelope.state.device.triggerAttackRelease(noteLength || this.state.toneLength)
  },
  playKick () {
    log(`Playing kick`)
    return this.player.state.device.start('+0.11');
  },
  stopKick () {
    log(`Playing kick`)
    return this.player.state.device.stop();
  },
  playGameOver () {
    log(`Playing Game Over`)
    return this.gameOverPlayer.state.device.start();
  },
  playSweep () {
    log(`Playing sweep`)
    return this.sweepPlayer.state.device.start();
  },
  stopSweep () {
    log(`Stopping sweep`)
    return this.sweepPlayer.state.device.stop();
  },
  setToneLength (length) {
    log(`setting envelope tone length to: ${length}`)
    this.state.toneLength = length
    return this.state.toneLength
  },
  player: {
    state: {
      device: undefined
    },
    init (options) {
      log(`Initializing player with options: ${options}`)
      this.state.device = new Tone.Player({
        url : require('./assets/beat.mp3'),
        loop  : true ,
      })
    }
  },
  gameOverPlayer: {
    state: {
      device: undefined
    },
    init (options) {
      log(`Initializing player with options: ${options}`)
      this.state.device = new Tone.Player({
        url : require('./assets/gameover.mp3'),
      })
    }
  },
  sweepPlayer: {
    state: {
      device: undefined
    },
    init (options) {
      log(`Initializing player with options: ${options}`)
      this.state.device = new Tone.Player({
        url : require('./assets/sweeptats.wav'),
      })
    }
  },
  oscillator1: {
    state: {
      device: undefined,
      pitchShift: undefined
    },
    init (options) {
      log(`Initializing oscillator1 with options: ${options}`)
      this.state.device = new Tone.Oscillator({
        type: 'sine',
        frequency: 131,
        detune: 0,
        phase: 0,
        ...options
      })
      log(`Initializing pitch shift effect on oscillator1`)
      this.state.pitchShift = new Tone.PitchShift()
    }
  },
  oscillator2: {
    state: {
      device: undefined,
      pitchShift: undefined
    },
    init (options) {
      log(`Initializing oscillator2 with options: ${options}`)
      this.state.device = new Tone.Oscillator({
        type: 'sine',
        frequency: 131,
        detune: 0,
        phase: 0,
        ...options
      })
      log(`Initializing pitch shift effect on oscillator2`)
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
  compressor: {
    state: {
      device: undefined
    },
    init (options) {
      log(`Initializing Compressor with options: ${options}`)
      this.state.device = new Tone.Compressor({
      ratio  : 10 ,
      threshold  : -18 ,
      release  : 0.11 ,
      attack  : 0.003 ,
      knee  : 20
      });
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
  },
  volume: {
    state: {
      device: undefined
    },
    init (options) {
      log(`Initializing reverb with options: ${options}`)
      this.state.device = new Tone.Volume()
    }
  }
}
