import Tone from 'tone';

// returns configured sequence 
export const createLoop = ({
  noteArray,
  subdivision
}, callback) => {
  return new Tone.Sequence(callback, noteArray, subdivision)
}

export const synth = new Tone.Synth().toMaster()

export const playNote = (note) => {
  return synth.triggerAttackRelease(note, "4n")
}

export const setBpm = (bpm) => {
  return Tone.Transport.bpm.value = bpm;
}

export const start = () => {
  return Tone.Transport.start();
}

export const ToneInstance = Tone
