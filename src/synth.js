import Tone from 'tone';

// define logging mechanism
const log = console.info

// let allows aditing object, const not??
export let state = {
  synthToneLength: '4n'
}

// returns configured sequence 
export const createLoop = ({
  noteArray,
  subdivision
}, callback) => {
  return new Tone.Sequence(callback, noteArray, subdivision)
}

export const synth = new Tone.Synth().toMaster()

export const playNote = (note) => {
  log(`Playing note: ${note}`)
  return synth.triggerAttackRelease(note, state.synthToneLength)
}

export const setBpm = (bpm) => {
  log(`setting BPM length to: ${bpm}`)
  return Tone.Transport.bpm.value = bpm;
}

export const setSynthToneLength = (length) => {
  log(`setting tone length to: ${length}`)
  return state.synthToneLength = length
}

export const start = () => {
  log(`starting Tone.js Transport`)
  return Tone.Transport.start();
}

export const ToneInstance = Tone
