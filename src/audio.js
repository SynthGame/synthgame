import Tone from 'tone'

// define logging mechanism
const log = console.info

export default {
  state: {
    Tone: Tone,
    loop: undefined
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
  synth: {
    state: {
      synth: undefined,
      synthToneLength: '4n'
    },
    init (options) {
      log(`Initializing synth with options: ${options}`)
      this.state.synth = new Tone.MonoSynth({
        envelope: {
          attack: 0.01,
          decay: 0.01,
          sustain: 1,
          release: 0.01
        },
        ...options // might have to be moved up
      })
    },
    playNote (note) {
      log(`Playing note: ${note}`)
      return this.state.synth.triggerAttackRelease(note, this.state.synthToneLength)
    },
    setToneLength (length) {
      log(`setting synth tone length to: ${length}`)
      this.state.synthToneLength = length
      return this.state.synthToneLength
    }
  }
}
