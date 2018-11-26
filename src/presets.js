export default [
  {
    bpm: 131,
    name: "bart-proost",
    avatarUrl: "https://i1.sndcdn.com/avatars-000459014022-r4tcc2-t500x500.jpg",
    parameterValues: {
      envelope: {
        attack: 0,
        decay: 25,
        release: 90,
        sustain: 0
      },
      envelope2: {
        assign: "filtercutoff",
        attack: 0,
        decay: 10,
        release: 10,
        amount: 100,
        sustain: 0
      },
      filter: {
        cutOffFreq: 86,
        setQ: 0,
        type: "lowpass"
      },
      lfo: {
        amount: 12,
        frequency: 10,
        type: "sine"
      },
      oscillator1: {
        detune: 50,
        frequency: "131",
        typeOsc: "sine"
      },
      oscillator2: {
        frequency: "65",
        typeOsc: "sine",
        volume: 77
      },
      router: {
        envelope2: "filterCutoff",
        lfo: "osc1Detune"
      }
    },
    sequenceArray: [
      {
        kick: true,
        pitch: 0,
        selected: true
      },
      {
        pitch: 0,
        selected: false
      },
      {
        hat: true,
        pitch: 0,
        selected: true
      },
      {
        kick: true,
        pitch: 0,
        selected: false
      },
      {
        kick: false,
        pitch: 0,
        selected: true
      },
      {
        pitch: 0,
        selected: false
      },
      {
        hat: true,
        kick: true,
        pitch: 0,
        selected: false
      },
      {
        pitch: 0,
        selected: false
      },
      {
        hat: true,
        kick: true,
        pitch: 0,
        selected: true
      },
      {
        pitch: 0,
        selected: false
      },
      {
        pitch: 0,
        selected: false
      },
      {
        hat: true,
        pitch: 0,
        selected: false
      },
      {
        kick: true,
        pitch: 0,
        selected: true
      },
      {
        pitch: 0,
        selected: false
      },
      {
        hat: true,
        pitch: 0,
        selected: false
      },
      {
        pitch: 0,
        selected: false
      }
    ]
  },
  {
    bpm: 113,
    name: "bart proost",
    avatarUrl: "https://i1.sndcdn.com/avatars-000459014022-r4tcc2-t500x500.jpg",
    parameterValues: {
      envelope: {
        attack: 0,
        decay: 25,
        release: 90,
        sustain: 0
      },
      envelope2: {
        assign: "filtercutoff",
        attack: 0,
        decay: 10,
        release: 10,
        amount: 100,
        sustain: 0
      },
      filter: {
        cutOffFreq: 82,
        setQ: 0,
        type: "lowpass"
      },
      lfo: {
        amount: 37,
        frequency: 25,
        type: "sine"
      },
      oscillator1: {
        detune: 50,
        frequency: "131",
        typeOsc: "square"
      },
      oscillator2: {
        frequency: "65",
        typeOsc: "sine",
        volume: 88
      },
      router: {
        envelope2: "filterCutoff",
        lfo: "osc1Detune"
      }
    },
    sequenceArray: [
      {
        cymbal: true,
        kick: true,
        pitch: 5,
        selected: true
      },
      {
        pitch: 0,
        selected: false
      },
      {
        hat: true,
        pitch: 0,
        selected: true
      },
      {
        kick: true,
        pitch: 0,
        selected: false
      },
      {
        clap2: true,
        kick: false,
        pitch: 3,
        selected: true,
        snare: true
      },
      {
        pitch: 0,
        selected: false
      },
      {
        hat: true,
        kick: true,
        pitch: 0,
        selected: false
      },
      {
        pitch: 0,
        selected: false
      },
      {
        cymbal: false,
        hat: true,
        kick: true,
        pitch: 0,
        selected: true
      },
      {
        pitch: 0,
        selected: false
      },
      {
        pitch: 0,
        selected: false
      },
      {
        hat: true,
        pitch: 0,
        selected: false
      },
      {
        clap2: true,
        kick: true,
        noise: false,
        pitch: 7,
        selected: true,
        snare: true
      },
      {
        noise: false,
        pitch: 0,
        selected: false
      },
      {
        hat: true,
        noise: true,
        pitch: 0,
        selected: false
      },
      {
        pitch: 0,
        selected: false
      }
    ]
  },
  {
    bpm: 125,
    name: "hathor libra",
    avatarUrl: "https://i1.sndcdn.com/avatars-000465812631-9gjonu-t500x500.jpg",
    parameterValues: {
      envelope: {
        attack: 29,
        decay: 10,
        release: 0,
        sustain: 33
      },
      envelope2: {
        assign: "filtercutoff",
        attack: 15,
        decay: 90,
        release: 0,
        amount: 100,
        sustain: 0
      },
      filter: {
        cutOffFreq: 59,
        setQ: 0,
        type: "lowpass"
      },
      lfo: {
        amount: 0,
        frequency: 5,
        type: "sine"
      },
      oscillator1: {
        detune: 67,
        frequency: "131",
        typeOsc: "triangle"
      },
      oscillator2: {
        frequency: "65",
        typeOsc: "sine",
        volume: 79
      },
      router: {
        envelope2: "filterCutoff",
        lfo: "osc1Detune"
      }
    },
    sequenceArray: [
      {
        cymbal: true,
        kick: true,
        pitch: 0,
        selected: true
      },
      {
        pitch: 0,
        selected: false
      },
      {
        hat: true,
        pitch: 7,
        selected: false
      },
      {
        pitch: 7,
        selected: true
      },
      {
        clap: true,
        kick: true,
        labmyc: false,
        pitch: 0,
        selected: false
      },
      {
        hat: false,
        noise: false,
        pitch: 0,
        selected: false
      },
      {
        hat: true,
        pitch: 0,
        selected: true
      },
      {
        pitch: 0,
        selected: false
      },
      {
        cymbal: false,
        kick: true,
        pitch: 0,
        selected: false
      },
      {
        hat: true,
        pitch: 0,
        selected: true
      },
      {
        pitch: 0,
        selected: false
      },
      {
        clap: false,
        noise: true,
        pitch: 0,
        selected: false
      },
      {
        clap: true,
        clap2: true,
        cymbal: true,
        kick: true,
        labmyc: true,
        pitch: 0,
        selected: true
      },
      {
        labmyc: false,
        pitch: 0,
        selected: false,
        snare: false
      },
      {
        clap: false,
        hat: true,
        pitch: 8,
        selected: true,
        snare: false
      },
      {
        pitch: 0,
        selected: false,
        snare: true
      }
    ]
  },
  {
    avatarUrl: "https://i1.sndcdn.com/avatars-000510735876-yhri5l-t500x500.jpg",
    bpm: 132,
    name: "oak",
    parameterValues: {
      envelope: {
        attack: 62,
        decay: 25,
        release: 90,
        sustain: 100
      },
      envelope2: {
        assign: "filtercutoff",
        attack: 38,
        decay: 90,
        release: 0,
        amount: 100,
        sustain: 0
      },
      filter: {
        cutOffFreq: 82,
        setQ: 0,
        type: "lowpass"
      },
      lfo: {
        amount: 3,
        frequency: 5,
        type: "triangle"
      },
      oscillator1: {
        detune: 50,
        frequency: "262",
        typeOsc: "sawtooth"
      },
      oscillator2: {
        frequency: "65",
        typeOsc: "square",
        volume: 72
      },
      router: {
        envelope2: "filterCutoff",
        lfo: "oscsDetune"
      }
    },
    sequenceArray: [
      {
        hat: true,
        kick: false,
        pitch: 2,
        selected: true
      },
      {
        pitch: 0,
        selected: false
      },
      {
        hat: true,
        pitch: 0,
        selected: false
      },
      {
        pitch: 0,
        selected: false
      },
      {
        hat: true,
        noise: true,
        pitch: 9,
        selected: false
      },
      {
        kick: false,
        pitch: 9,
        selected: false
      },
      {
        hat: true,
        kick: false,
        pitch: 0,
        selected: false
      },
      {
        pitch: 0,
        selected: false
      },
      {
        clap: true,
        hat: true,
        pitch: 9,
        selected: true
      },
      {
        pitch: 0,
        selected: false
      },
      {
        hat: true,
        kick: false,
        pitch: 0,
        selected: false
      },
      {
        pitch: 0,
        selected: false
      },
      {
        hat: true,
        kick: false,
        noise: true,
        pitch: 3,
        selected: true
      },
      {
        pitch: 0,
        selected: false
      },
      {
        hat: true,
        pitch: 0,
        selected: false
      },
      {
        hat: false,
        pitch: 0,
        selected: false
      }
    ]
  },
  {
    bpm: 75,
    name: "Alex",
    avatarUrl:
      "https://graph.facebook.com/v2.12/10217434300199501/picture?height=200",
    parameterValues: {
      envelope: { attack: 7, decay: 17, release: 15, sustain: 38 },
      envelope2: {
        amount: 63,
        assign: "filtercutoff",
        attack: 88,
        decay: 19,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 71, setQ: 0, type: "bandpass" },
      lfo: { amount: 63, frequency: 50, type: "square" },
      oscillator1: { detune: 74, frequency: "262", typeOsc: "sawtooth" },
      oscillator2: { frequency: "65", typeOsc: "sine", volume: 97 },
      router: { envelope2: "oscsDetune", lfo: "osc1Detune" }
    },
    sequenceArray: [
      {
        cymbal: false,
        glide: true,
        kick: true,
        pitch: 2,
        selected: true,
        snare: false,
        volume: true
      },
      {
        glide: false,
        hat: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        glide: true,
        hat: true,
        noise: true,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        glide: false,
        hat: false,
        kick: false,
        pitch: 1,
        selected: true,
        snare: false,
        volume: false
      },
      {
        clap: false,
        clap2: true,
        cymbal: false,
        glide: false,
        hat: false,
        kick: true,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        glide: false,
        hat: true,
        kick: false,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      },
      {
        glide: true,
        hat: false,
        noise: false,
        pitch: 0,
        selected: true,
        volume: true
      },
      {
        clap: false,
        glide: false,
        hat: true,
        kick: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap: false,
        cymbal: false,
        glide: true,
        hat: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        glide: false,
        hat: false,
        kick: true,
        noise: false,
        pitch: 3,
        selected: true,
        snare: true,
        volume: true
      },
      {
        clap: false,
        glide: false,
        hat: true,
        kick: false,
        noise: true,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        clap: false,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        clap: false,
        clap2: true,
        cymbal: false,
        glide: true,
        hat: false,
        kick: false,
        noise: false,
        pitch: 5,
        selected: true,
        volume: false
      },
      {
        glide: false,
        hat: true,
        kick: false,
        labmyc: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        glide: false,
        hat: true,
        kick: false,
        labmyc: true,
        noise: false,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false }
    ]
  },
  {
    bpm: 125,
    name: "Кирилл Чернов",
    avatarUrl:
      "https://graph.facebook.com/v2.12/2319945104742726/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 49, release: 57, sustain: 0 },
      envelope2: {
        amount: 100,
        assign: "filtercutoff",
        attack: 0,
        decay: 56,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 95, setQ: 0, type: "lowpass" },
      lfo: { amount: 62, frequency: 100, type: "square" },
      oscillator1: { detune: 0, frequency: "262", typeOsc: "sawtooth" },
      oscillator2: { frequency: "262", typeOsc: "square", volume: 71 },
      router: { envelope2: "filterCutoff", lfo: "oscsDetune" }
    },
    sequenceArray: [
      {
        glide: true,
        kick: true,
        noise: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, noise: false, pitch: 0, selected: false, volume: false },
      { glide: false, pitch: 0, selected: false, volume: true },
      {
        glide: true,
        kick: false,
        noise: false,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      },
      {
        clap2: true,
        glide: true,
        kick: true,
        pitch: 2,
        selected: true,
        volume: false
      },
      { glide: false, kick: false, pitch: 0, selected: false, volume: false },
      {
        glide: false,
        kick: false,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      },
      { glide: false, pitch: 3, selected: true, volume: false },
      { glide: false, kick: true, pitch: 0, selected: false, volume: false },
      { glide: false, kick: false, pitch: 0, selected: false, volume: false },
      { glide: false, pitch: 1, selected: true, snare: true, volume: false },
      { glide: false, kick: false, pitch: 0, selected: false, volume: false },
      {
        clap2: true,
        glide: false,
        kick: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        glide: false,
        noise: false,
        pitch: 0,
        selected: true,
        snare: false,
        volume: false
      },
      {
        glide: true,
        kick: false,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false }
    ]
  },
  {
    bpm: 60,
    name: "Lena Robinson",
    avatarUrl:
      "https://graph.facebook.com/v2.12/10212900827568654/picture?height=200",
    parameterValues: {
      envelope: { attack: 27, decay: 93, release: 54, sustain: 62 },
      envelope2: {
        amount: 100,
        assign: "filtercutoff",
        attack: 50,
        decay: 100,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 98, setQ: 0, type: "lowpass" },
      lfo: { amount: 40, frequency: 35, type: "triangle" },
      oscillator1: { detune: 18, frequency: "523", typeOsc: "square" },
      oscillator2: { frequency: "65", typeOsc: "square", volume: 84 },
      router: { envelope2: "filterCutoff", lfo: "oscsDetune" }
    },
    sequenceArray: [
      {
        glide: false,
        kick: true,
        pitch: 0,
        selected: true,
        snare: true,
        volume: false
      },
      {
        cymbal: true,
        glide: false,
        hat: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        glide: false,
        kick: true,
        noise: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap: true,
        glide: false,
        hat: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        clap2: true,
        glide: false,
        kick: true,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      },
      {
        cymbal: true,
        glide: false,
        hat: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, noise: true, pitch: 0, selected: false, volume: false },
      {
        clap: true,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        glide: false,
        kick: true,
        pitch: 0,
        selected: true,
        snare: true,
        volume: false
      },
      {
        cymbal: true,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        glide: false,
        kick: true,
        noise: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        clap: true,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap2: true,
        glide: false,
        kick: true,
        pitch: 0,
        selected: true,
        snare: true,
        volume: false
      },
      {
        cymbal: true,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, kick: true, pitch: 0, selected: true, volume: false },
      {
        clap: true,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        volume: false
      }
    ]
  },
  {
    bpm: 118,
    name: "Cian Smyth",
    avatarUrl:
      "https://graph.facebook.com/v2.12/10213672989921164/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 37, release: 32, sustain: 0 },
      envelope2: {
        amount: 100,
        assign: "filtercutoff",
        attack: 0,
        decay: 49,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 81, setQ: 0, type: "lowpass" },
      lfo: { amount: 49, frequency: 31, type: "triangle" },
      oscillator1: { detune: 50, frequency: "65", typeOsc: "sawtooth" },
      oscillator2: { frequency: "262", typeOsc: "triangle", volume: 76 },
      router: { envelope2: "filterCutoff", lfo: "osc1Detune" }
    },
    sequenceArray: [
      { glide: false, kick: true, pitch: 0, selected: true, volume: true },
      { glide: false, noise: false, pitch: 0, selected: false, volume: false },
      {
        cymbal: false,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap: true,
        glide: false,
        pitch: 3,
        selected: true,
        snare: true,
        volume: false
      },
      {
        clap2: true,
        glide: false,
        kick: true,
        labmyc: false,
        noise: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, labmyc: false, pitch: 0, selected: false, volume: false },
      {
        cymbal: false,
        glide: false,
        hat: true,
        pitch: 1,
        selected: true,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false },
      {
        clap: false,
        glide: false,
        kick: true,
        noise: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap: false,
        cymbal: false,
        glide: false,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      },
      {
        clap: true,
        cymbal: false,
        glide: false,
        hat: true,
        kick: false,
        noise: false,
        pitch: 0,
        selected: true,
        snare: true,
        volume: false
      },
      {
        glide: false,
        kick: true,
        noise: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap2: true,
        glide: false,
        kick: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        cymbal: false,
        glide: true,
        noise: false,
        pitch: 10,
        selected: true,
        volume: true
      },
      {
        cymbal: false,
        glide: false,
        hat: true,
        kick: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false }
    ]
  },
  {
    bpm: 110,
    name: "Kyle Haynes",
    avatarUrl:
      "https://graph.facebook.com/v2.12/10161285911775556/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 25, release: 41, sustain: 100 },
      envelope2: {
        amount: 46,
        assign: "filtercutoff",
        attack: 32,
        decay: 58,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 39, setQ: 0, type: "highpass" },
      lfo: { amount: 44, frequency: 63, type: "sawtooth" },
      oscillator1: { detune: 51, frequency: "65", typeOsc: "triangle" },
      oscillator2: { frequency: "131", typeOsc: "sawtooth", volume: 62 },
      router: { envelope2: "oscsDetune", lfo: "filterCutoff" }
    },
    sequenceArray: [
      {
        clap: false,
        cymbal: false,
        glide: false,
        hat: true,
        kick: true,
        labmyc: false,
        pitch: 5,
        selected: true,
        volume: false
      },
      {
        clap: false,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, hat: true, pitch: 8, selected: true, volume: false },
      { clap: false, glide: false, pitch: 0, selected: false, volume: false },
      {
        clap: true,
        glide: false,
        hat: true,
        kick: false,
        labmyc: true,
        pitch: 5,
        selected: true,
        snare: true,
        volume: false
      },
      { glide: false, pitch: 4, selected: true, volume: false },
      {
        glide: false,
        hat: true,
        kick: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false },
      { glide: false, hat: false, pitch: 0, selected: false, volume: false },
      {
        glide: false,
        hat: false,
        kick: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap2: true,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        clap2: false,
        glide: false,
        hat: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap: true,
        clap2: true,
        glide: false,
        hat: true,
        pitch: 0,
        selected: true,
        snare: true,
        volume: true
      },
      { clap2: false, glide: false, pitch: 0, selected: false, volume: false },
      { glide: false, pitch: 0, selected: false, volume: false },
      { glide: false, pitch: 0, selected: false, volume: false }
    ]
  },
  {
    bpm: 128,
    name: "Adam Gordon",
    avatarUrl:
      "https://graph.facebook.com/v2.12/10155985643033174/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 59, release: 17, sustain: 17 },
      envelope2: {
        amount: 82,
        assign: "filtercutoff",
        attack: 0,
        decay: 25,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 70, setQ: 0, type: "lowpass" },
      lfo: { amount: 25, frequency: 56, type: "sine" },
      oscillator1: { detune: 50, frequency: "65", typeOsc: "square" },
      oscillator2: { frequency: "262", typeOsc: "sawtooth", volume: 75 },
      router: { envelope2: "filterCutoff", lfo: "osc1Detune" }
    },
    sequenceArray: [
      {
        cymbal: true,
        glide: false,
        kick: true,
        labmyc: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false },
      {
        cymbal: false,
        glide: false,
        hat: true,
        labmyc: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: true, kick: false, pitch: 10, selected: true, volume: true },
      {
        clap: true,
        clap2: false,
        glide: false,
        kick: true,
        labmyc: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      { glide: false, noise: false, pitch: 0, selected: false, volume: false },
      {
        cymbal: false,
        glide: false,
        hat: true,
        labmyc: false,
        noise: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, noise: false, pitch: 0, selected: false, volume: false },
      {
        clap2: false,
        cymbal: false,
        glide: false,
        kick: true,
        labmyc: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false },
      {
        cymbal: false,
        glide: false,
        hat: true,
        labmyc: false,
        noise: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false },
      {
        clap: false,
        clap2: true,
        glide: false,
        kick: true,
        labmyc: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: true
      },
      { glide: false, labmyc: false, pitch: 0, selected: false, volume: false },
      {
        cymbal: false,
        glide: true,
        hat: true,
        kick: false,
        labmyc: false,
        pitch: 3,
        selected: true,
        volume: false
      },
      {
        glide: false,
        kick: false,
        labmyc: false,
        noise: false,
        pitch: 0,
        selected: false,
        volume: false
      }
    ]
  },
  {
    bpm: 107,
    name: "Abhishek Chanda",
    avatarUrl:
      "https://graph.facebook.com/v2.12/2361560813885335/picture?height=200",
    parameterValues: {
      envelope: { attack: 30, decay: 67, release: 37, sustain: 30 },
      envelope2: {
        amount: 83,
        assign: "filtercutoff",
        attack: 0,
        decay: 39,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 89, setQ: 0, type: "lowpass" },
      lfo: { amount: 0, frequency: 1, type: "sine" },
      oscillator1: { detune: 0, frequency: "131", typeOsc: "sawtooth" },
      oscillator2: { frequency: "131", typeOsc: "sine", volume: 38 },
      router: { envelope2: "osc1Detune", lfo: "oscsDetune" }
    },
    sequenceArray: [
      {
        cymbal: false,
        glide: false,
        hat: false,
        kick: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, noise: false, pitch: 0, selected: false, volume: true },
      {
        glide: true,
        hat: true,
        noise: true,
        pitch: 0,
        selected: true,
        volume: true
      },
      { cymbal: false, glide: false, pitch: 0, selected: false, volume: false },
      {
        clap: true,
        cymbal: false,
        glide: false,
        kick: true,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      },
      { glide: false, hat: false, pitch: 0, selected: false, volume: false },
      {
        clap2: false,
        glide: false,
        hat: true,
        pitch: 10,
        selected: true,
        volume: false
      },
      { cymbal: false, glide: false, pitch: 0, selected: true, volume: true },
      {
        cymbal: false,
        glide: false,
        kick: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      { clap2: false, glide: false, pitch: 0, selected: false, volume: true },
      {
        glide: true,
        hat: true,
        noise: true,
        pitch: 0,
        selected: true,
        volume: true
      },
      {
        cymbal: false,
        glide: false,
        kick: true,
        pitch: 10,
        selected: false,
        volume: false
      },
      {
        clap: true,
        cymbal: false,
        glide: false,
        hat: false,
        kick: true,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      },
      {
        glide: false,
        hat: false,
        kick: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap2: false,
        glide: true,
        hat: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        cymbal: false,
        glide: false,
        hat: false,
        pitch: 0,
        selected: true,
        volume: true
      }
    ]
  },
  {
    bpm: 110,
    name: "Jeferson Beltron",
    avatarUrl:
      "https://graph.facebook.com/v2.12/1951645061584740/picture?height=200",
    parameterValues: {
      envelope: { attack: 4, decay: 67, release: 99, sustain: 100 },
      envelope2: {
        amount: 39,
        assign: "filtercutoff",
        attack: 51,
        decay: 100,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 65, setQ: 0, type: "lowpass" },
      lfo: { amount: 22, frequency: 85, type: "triangle" },
      oscillator1: { detune: 50, frequency: "131", typeOsc: "square" },
      oscillator2: { frequency: "65", typeOsc: "sine", volume: 96 },
      router: { envelope2: "osc1Detune", lfo: "osc1Detune" }
    },
    sequenceArray: [
      { glide: false, kick: true, pitch: 0, selected: false, volume: false },
      { glide: false, pitch: 0, selected: false, volume: false },
      {
        cymbal: false,
        glide: false,
        hat: true,
        labmyc: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        cymbal: false,
        glide: false,
        hat: true,
        labmyc: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        clap: false,
        clap2: true,
        cymbal: false,
        glide: false,
        hat: true,
        kick: true,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      },
      { glide: false, kick: false, pitch: 0, selected: false, volume: false },
      { glide: false, kick: false, pitch: 0, selected: false, volume: false },
      {
        clap: false,
        glide: false,
        kick: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap: false,
        clap2: false,
        cymbal: true,
        glide: false,
        kick: true,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      { cymbal: false, glide: false, pitch: 0, selected: false, volume: false },
      {
        glide: false,
        hat: false,
        labmyc: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        cymbal: true,
        glide: false,
        hat: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap2: true,
        cymbal: false,
        glide: false,
        hat: false,
        kick: true,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      },
      { glide: false, hat: false, pitch: 0, selected: false, volume: false },
      {
        clap: false,
        glide: false,
        hat: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap: false,
        clap2: false,
        glide: false,
        labmyc: false,
        pitch: 0,
        selected: false,
        volume: false
      }
    ]
  },
  {
    bpm: 107,
    name: "Tommy Lunaire",
    avatarUrl:
      "https://image.redbull.com/rbx00931/0001/2/200/497/www/avatar/57bc0183585269230c67a158/5bdf0dc6c869df064c700afb/avatar.jpg?ts=1541344856",
    parameterValues: {
      envelope: { attack: 0, decay: 89, release: 90, sustain: 24 },
      envelope2: {
        amount: 100,
        assign: "filtercutoff",
        attack: 0,
        decay: 90,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 84, setQ: 0, type: "lowpass" },
      lfo: { amount: 40, frequency: 60, type: "sine" },
      oscillator1: { detune: 63, frequency: "131", typeOsc: "sawtooth" },
      oscillator2: { frequency: "65", typeOsc: "sine", volume: 90 },
      router: { envelope2: "filterCutoff", lfo: "osc1Detune" }
    },
    sequenceArray: [
      {
        glide: false,
        hat: true,
        kick: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false },
      { glide: false, pitch: 0, selected: false, volume: false },
      { glide: false, hat: false, pitch: 0, selected: false, volume: false },
      { glide: false, hat: true, pitch: 0, selected: false, volume: false },
      { glide: false, pitch: 0, selected: false, volume: false },
      {
        clap: true,
        cymbal: false,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false },
      { glide: false, hat: true, pitch: 0, selected: false, volume: false },
      { glide: false, hat: false, pitch: 0, selected: false, volume: false },
      {
        clap: false,
        glide: false,
        hat: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, hat: false, pitch: 0, selected: false, volume: false },
      { glide: false, hat: true, pitch: 5, selected: true, volume: false },
      { glide: false, pitch: 0, selected: false, volume: false },
      {
        clap: true,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false }
    ]
  },
  {
    bpm: 144,
    name: "Thiago Quintas",
    avatarUrl:
      "https://graph.facebook.com/v2.12/2121076381290712/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 29, release: 0, sustain: 0 },
      envelope2: {
        amount: 100,
        assign: "filtercutoff",
        attack: 3,
        decay: 30,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 59, setQ: 0, type: "lowpass" },
      lfo: { amount: 0, frequency: 10, type: "sine" },
      oscillator1: { detune: 50, frequency: "65", typeOsc: "sawtooth" },
      oscillator2: { frequency: "65", typeOsc: "sawtooth", volume: 59 },
      router: { envelope2: "filterCutoff", lfo: "oscsDetune" }
    },
    sequenceArray: [
      {
        glide: false,
        hat: true,
        kick: true,
        labmyc: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, snare: false, volume: false },
      {
        glide: false,
        hat: true,
        pitch: 3,
        selected: true,
        snare: false,
        volume: false
      },
      {
        glide: false,
        hat: true,
        pitch: 0,
        selected: true,
        snare: false,
        volume: false
      },
      {
        clap: true,
        clap2: true,
        glide: false,
        kick: true,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      { glide: false, hat: true, pitch: 0, selected: true, volume: false },
      { glide: false, hat: true, pitch: 2, selected: true, volume: false },
      { glide: false, kick: true, pitch: 0, selected: false, volume: false },
      { glide: false, hat: true, pitch: 0, selected: false, volume: false },
      { glide: false, hat: true, pitch: 0, selected: true, volume: false },
      {
        clap: false,
        glide: false,
        hat: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        clap: true,
        clap2: true,
        glide: false,
        kick: true,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      },
      { glide: false, hat: true, pitch: 0, selected: true, volume: false },
      { glide: false, hat: true, pitch: 0, selected: true, volume: false }
    ]
  },
  {
    bpm: 110,
    name: "Paulo Akio",
    avatarUrl:
      "https://graph.facebook.com/v2.12/2290334580994624/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 25, release: 90, sustain: 100 },
      envelope2: {
        amount: 100,
        assign: "filtercutoff",
        attack: 85,
        decay: 66,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 96, setQ: 0, type: "lowpass" },
      lfo: { amount: 24, frequency: 38, type: "sine" },
      oscillator1: { detune: 51, frequency: "65", typeOsc: "sine" },
      oscillator2: { frequency: "131", typeOsc: "triangle", volume: 85 },
      router: { envelope2: "filterCutoff", lfo: "oscsDetune" }
    },
    sequenceArray: [
      {
        glide: true,
        hat: true,
        kick: true,
        pitch: 10,
        selected: true,
        volume: true
      },
      {
        glide: false,
        hat: true,
        kick: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        glide: false,
        hat: true,
        kick: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap: true,
        glide: false,
        kick: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        glide: false,
        hat: true,
        kick: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, hat: true, pitch: 0, selected: false, volume: false },
      { glide: false, hat: true, pitch: 0, selected: false, volume: false },
      {
        clap: true,
        glide: false,
        kick: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        glide: false,
        hat: true,
        kick: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, hat: true, pitch: 0, selected: false, volume: false },
      { glide: false, hat: true, pitch: 0, selected: false, volume: false },
      {
        clap: true,
        glide: false,
        kick: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        glide: false,
        hat: true,
        kick: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, hat: true, pitch: 0, selected: false, volume: false },
      { glide: false, hat: true, pitch: 0, selected: false, volume: false },
      {
        clap: true,
        glide: false,
        kick: true,
        pitch: 0,
        selected: false,
        volume: false
      }
    ]
  },
  {
    bpm: 122,
    name: "João Freitas",
    avatarUrl:
      "https://graph.facebook.com/v2.12/2284512418244278/picture?height=200",
    parameterValues: {
      envelope: { attack: 22, decay: 21, release: 8, sustain: 100 },
      envelope2: {
        amount: 100,
        assign: "filtercutoff",
        attack: 87,
        decay: 37,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 65, setQ: 0, type: "lowpass" },
      lfo: { amount: 22, frequency: 1, type: "sine" },
      oscillator1: { detune: 48, frequency: "131", typeOsc: "sine" },
      oscillator2: { frequency: "65", typeOsc: "square", volume: 100 },
      router: { envelope2: "filterCutoff", lfo: "oscsDetune" }
    },
    sequenceArray: [
      {
        cymbal: true,
        glide: false,
        hat: true,
        kick: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      { cymbal: false, glide: false, pitch: 3, selected: true, volume: true },
      {
        cymbal: false,
        glide: true,
        hat: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap2: true,
        cymbal: true,
        glide: false,
        kick: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        cymbal: true,
        glide: false,
        hat: false,
        kick: true,
        pitch: 6,
        selected: false,
        snare: true,
        volume: true
      },
      {
        cymbal: false,
        glide: true,
        noise: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        cymbal: false,
        glide: true,
        kick: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        cymbal: true,
        glide: false,
        hat: true,
        kick: false,
        pitch: 0,
        selected: true,
        snare: false,
        volume: false
      },
      {
        clap: true,
        cymbal: true,
        glide: false,
        kick: true,
        pitch: 10,
        selected: false,
        snare: false,
        volume: true
      },
      { cymbal: true, glide: true, pitch: 0, selected: false, volume: false },
      {
        cymbal: false,
        glide: true,
        hat: true,
        kick: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        cymbal: false,
        glide: false,
        hat: true,
        kick: false,
        pitch: 0,
        selected: true,
        snare: false,
        volume: false
      },
      {
        cymbal: true,
        glide: false,
        kick: true,
        labmyc: true,
        noise: true,
        pitch: 7,
        selected: false,
        snare: true,
        volume: true
      },
      {
        cymbal: false,
        glide: true,
        hat: false,
        kick: false,
        labmyc: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        cymbal: false,
        glide: true,
        hat: true,
        kick: false,
        labmyc: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        cymbal: true,
        glide: true,
        kick: false,
        labmyc: false,
        pitch: 0,
        selected: true,
        snare: false,
        volume: false
      }
    ]
  },
  {
    bpm: 110,
    name: "Jools Richardson",
    avatarUrl:
      "https://graph.facebook.com/v2.12/2045071315555171/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 100, release: 0, sustain: 100 },
      envelope2: {
        amount: 96,
        assign: "filtercutoff",
        attack: 41,
        decay: 0,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 70, setQ: 0, type: "lowpass" },
      lfo: { amount: 21, frequency: 34, type: "square" },
      oscillator1: { detune: 29, frequency: "262", typeOsc: "square" },
      oscillator2: { frequency: "65", typeOsc: "sine", volume: 83 },
      router: { envelope2: "filterCutoff", lfo: "osc1Detune" }
    },
    sequenceArray: [
      { glide: false, kick: true, pitch: 0, selected: true, volume: true },
      { glide: false, pitch: 7, selected: false, volume: true },
      {
        glide: false,
        hat: true,
        pitch: 0,
        selected: true,
        snare: true,
        volume: false
      },
      {
        glide: false,
        hat: false,
        kick: true,
        pitch: 7,
        selected: false,
        snare: false,
        volume: false
      },
      {
        clap: true,
        glide: false,
        kick: true,
        pitch: 0,
        selected: false,
        snare: false,
        volume: true
      },
      {
        glide: false,
        hat: false,
        kick: false,
        pitch: 10,
        selected: true,
        snare: true,
        volume: false
      },
      {
        glide: false,
        hat: true,
        pitch: 10,
        selected: false,
        snare: false,
        volume: false
      },
      {
        glide: false,
        hat: true,
        kick: false,
        pitch: 9,
        selected: true,
        volume: false
      },
      {
        glide: false,
        kick: true,
        pitch: 8,
        selected: false,
        snare: false,
        volume: true
      },
      {
        clap: false,
        glide: true,
        hat: true,
        pitch: 9,
        selected: true,
        snare: true,
        volume: false
      },
      {
        clap: false,
        glide: true,
        hat: false,
        kick: true,
        pitch: 10,
        selected: true,
        volume: true
      },
      { glide: false, hat: true, pitch: 8, selected: false, volume: false },
      {
        clap: true,
        glide: false,
        hat: true,
        kick: true,
        pitch: 8,
        selected: false,
        snare: true,
        volume: false
      },
      {
        clap: false,
        glide: false,
        hat: false,
        pitch: 8,
        selected: false,
        volume: false
      },
      {
        clap: false,
        glide: false,
        hat: true,
        pitch: 7,
        selected: true,
        snare: false,
        volume: true
      },
      {
        clap: false,
        glide: false,
        hat: false,
        kick: true,
        pitch: 9,
        selected: false,
        snare: true,
        volume: false
      }
    ]
  },
  {
    bpm: 131,
    name: "Lucas Bayout",
    avatarUrl:
      "https://graph.facebook.com/v2.12/2070841112937886/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 88, release: 90, sustain: 7 },
      envelope2: {
        amount: 82,
        assign: "filtercutoff",
        attack: 69,
        decay: 64,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 25, setQ: 0, type: "highpass" },
      lfo: { amount: 64, frequency: 6, type: "sine" },
      oscillator1: { detune: 18, frequency: "523", typeOsc: "sine" },
      oscillator2: { frequency: "65", typeOsc: "sine", volume: 70 },
      router: { envelope2: "filterCutoff", lfo: "oscsDetune" }
    },
    sequenceArray: [
      {
        glide: false,
        kick: true,
        labmyc: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, pitch: 0, selected: true, volume: false },
      {
        cymbal: false,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false },
      {
        clap: true,
        glide: false,
        kick: true,
        pitch: 1,
        selected: false,
        volume: false
      },
      { glide: false, pitch: 1, selected: false, volume: false },
      { glide: true, hat: true, pitch: 0, selected: false, volume: false },
      { glide: false, pitch: 0, selected: false, volume: false },
      { glide: false, kick: true, pitch: 0, selected: false, volume: false },
      { glide: false, pitch: 0, selected: false, volume: false },
      { glide: false, hat: true, pitch: 0, selected: false, volume: false },
      { glide: false, pitch: 0, selected: false, volume: false },
      {
        clap: true,
        glide: false,
        kick: true,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false },
      {
        cymbal: false,
        glide: true,
        hat: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        glide: false,
        noise: true,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      }
    ]
  },
  {
    bpm: 110,
    name: "Liam Gomez-Kervin",
    avatarUrl:
      "https://graph.facebook.com/v2.12/10217354120027802/picture?height=200",
    parameterValues: {
      envelope: { attack: 2, decay: 60, release: 4, sustain: 15 },
      envelope2: {
        amount: 58,
        assign: "filtercutoff",
        attack: 3,
        decay: 60,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 53, setQ: 0, type: "lowpass" },
      lfo: { amount: 11, frequency: 92, type: "sine" },
      oscillator1: { detune: 50, frequency: "131", typeOsc: "sine" },
      oscillator2: { frequency: "262", typeOsc: "triangle", volume: 84 },
      router: { envelope2: "filterCutoff", lfo: "oscsDetune" }
    },
    sequenceArray: [
      {
        clap: true,
        glide: false,
        hat: true,
        kick: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false },
      { glide: false, hat: true, pitch: 4, selected: true, volume: false },
      {
        clap: true,
        glide: false,
        kick: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        glide: false,
        hat: true,
        kick: false,
        pitch: 4,
        selected: true,
        snare: true,
        volume: false
      },
      { glide: false, hat: false, pitch: 0, selected: false, volume: false },
      { glide: false, kick: true, pitch: 0, selected: true, volume: false },
      { glide: false, hat: true, pitch: 0, selected: false, volume: false },
      {
        clap: true,
        glide: false,
        kick: false,
        pitch: 4,
        selected: true,
        volume: false
      },
      {
        glide: false,
        hat: true,
        kick: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, pitch: 4, selected: true, volume: false },
      { glide: false, pitch: 0, selected: false, volume: false },
      {
        clap: true,
        glide: false,
        hat: true,
        kick: true,
        pitch: 0,
        selected: true,
        snare: true,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false },
      { glide: false, hat: true, pitch: 0, selected: false, volume: false },
      { glide: false, pitch: 0, selected: false, volume: false }
    ]
  },
  {
    bpm: 115,
    name: "Alex Aguayo",
    avatarUrl:
      "https://graph.facebook.com/v2.12/10214910476607938/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 15, release: 29, sustain: 50 },
      envelope2: {
        amount: 70,
        assign: "filtercutoff",
        attack: 0,
        decay: 90,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 70, setQ: 0, type: "lowpass" },
      lfo: { amount: 0, frequency: 40, type: "sine" },
      oscillator1: { detune: 50, frequency: "65", typeOsc: "sawtooth" },
      oscillator2: { frequency: "65", typeOsc: "square", volume: 79 },
      router: { envelope2: "filterCutoff", lfo: "osc1Detune" }
    },
    sequenceArray: [
      {
        glide: false,
        hat: false,
        kick: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, hat: false, pitch: 0, selected: false, volume: false },
      { glide: false, hat: true, pitch: 0, selected: true, volume: false },
      { glide: false, hat: false, pitch: 0, selected: false, volume: false },
      {
        glide: false,
        hat: false,
        kick: true,
        pitch: 3,
        selected: true,
        snare: true,
        volume: false
      },
      { glide: false, hat: false, pitch: 0, selected: false, volume: false },
      { glide: false, hat: true, pitch: 0, selected: true, volume: false },
      { glide: false, hat: true, pitch: 0, selected: false, volume: false },
      {
        glide: false,
        hat: false,
        kick: true,
        pitch: 4,
        selected: true,
        volume: false
      },
      { glide: false, hat: false, pitch: 0, selected: false, volume: false },
      { glide: false, hat: true, pitch: 0, selected: true, volume: false },
      { glide: false, hat: false, pitch: 0, selected: false, volume: false },
      {
        glide: false,
        hat: false,
        kick: true,
        pitch: 0,
        selected: true,
        snare: true,
        volume: false
      },
      { glide: false, hat: false, pitch: 0, selected: false, volume: false },
      { glide: false, hat: true, pitch: 0, selected: true, volume: false },
      { glide: false, pitch: 0, selected: true, volume: false }
    ]
  },
  {
    bpm: 130,
    name: "Gilbert Ragex",
    avatarUrl:
      "https://graph.facebook.com/v2.12/2051859414836325/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 31, release: 62, sustain: 80 },
      envelope2: {
        amount: 98,
        assign: "filtercutoff",
        attack: 7,
        decay: 77,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 86, setQ: 0, type: "lowpass" },
      lfo: { amount: 16, frequency: 22, type: "sawtooth" },
      oscillator1: { detune: 100, frequency: "523", typeOsc: "square" },
      oscillator2: { frequency: "65", typeOsc: "sine", volume: 82 },
      router: { envelope2: "filterCutoff", lfo: "osc1Detune" }
    },
    sequenceArray: [
      {
        cymbal: true,
        glide: false,
        hat: true,
        kick: true,
        pitch: 5,
        selected: true,
        volume: true
      },
      {
        clap2: false,
        glide: false,
        hat: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap: false,
        clap2: false,
        glide: true,
        hat: false,
        noise: true,
        pitch: 0,
        selected: true,
        snare: false,
        volume: false
      },
      {
        clap: false,
        clap2: false,
        glide: false,
        hat: true,
        kick: false,
        pitch: 5,
        selected: false,
        snare: false,
        volume: false
      },
      {
        clap: true,
        cymbal: false,
        glide: false,
        hat: false,
        kick: false,
        pitch: 0,
        selected: true,
        snare: true,
        volume: true
      },
      { glide: false, pitch: 0, selected: false, volume: false },
      {
        clap2: true,
        glide: true,
        hat: true,
        kick: true,
        noise: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        clap: false,
        glide: false,
        kick: false,
        pitch: 4,
        selected: true,
        volume: false
      },
      {
        glide: false,
        kick: false,
        labmyc: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        clap2: false,
        glide: false,
        hat: true,
        kick: false,
        pitch: 4,
        selected: false,
        volume: false
      },
      {
        clap2: false,
        glide: false,
        kick: true,
        noise: true,
        pitch: 3,
        selected: true,
        volume: false
      },
      {
        glide: false,
        hat: false,
        kick: false,
        pitch: 3,
        selected: false,
        volume: false
      },
      {
        clap: true,
        clap2: false,
        glide: false,
        hat: true,
        kick: false,
        pitch: 0,
        selected: false,
        snare: true,
        volume: true
      },
      {
        clap2: false,
        glide: true,
        hat: false,
        kick: false,
        pitch: 10,
        selected: true,
        snare: false,
        volume: false
      },
      {
        clap2: false,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap2: false,
        glide: false,
        kick: false,
        pitch: 7,
        selected: true,
        volume: true
      }
    ]
  },
  {
    bpm: 110,
    name: "Tristan Buesst",
    avatarUrl:
      "https://graph.facebook.com/v2.12/2177860832467196/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 0, release: 0, sustain: 100 },
      envelope2: {
        amount: 100,
        assign: "filtercutoff",
        attack: 100,
        decay: 100,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 57, setQ: 0, type: "lowpass" },
      lfo: { amount: 43, frequency: 57, type: "triangle" },
      oscillator1: { detune: 0, frequency: "65", typeOsc: "sawtooth" },
      oscillator2: { frequency: "65", typeOsc: "square", volume: 73 },
      router: { envelope2: "filterCutoff", lfo: "oscsDetune" }
    },
    sequenceArray: [
      {
        glide: false,
        hat: true,
        kick: true,
        pitch: 10,
        selected: true,
        snare: false,
        volume: false
      },
      {
        glide: false,
        hat: true,
        kick: false,
        pitch: 7,
        selected: false,
        snare: false,
        volume: false
      },
      {
        glide: false,
        hat: true,
        pitch: 10,
        selected: false,
        snare: true,
        volume: false
      },
      {
        glide: false,
        hat: true,
        pitch: 10,
        selected: true,
        snare: true,
        volume: false
      },
      {
        clap2: true,
        glide: false,
        hat: true,
        kick: false,
        pitch: 8,
        selected: false,
        volume: false
      },
      {
        glide: false,
        hat: true,
        pitch: 7,
        selected: true,
        snare: false,
        volume: false
      },
      {
        glide: false,
        hat: true,
        kick: true,
        pitch: 10,
        selected: true,
        snare: true,
        volume: false
      },
      {
        glide: false,
        hat: true,
        pitch: 7,
        selected: false,
        snare: true,
        volume: false
      },
      {
        glide: false,
        hat: true,
        kick: true,
        pitch: 7,
        selected: true,
        snare: true,
        volume: false
      },
      {
        glide: false,
        hat: true,
        pitch: 7,
        selected: false,
        snare: false,
        volume: false
      },
      {
        glide: false,
        hat: true,
        kick: true,
        pitch: 7,
        selected: true,
        volume: false
      },
      {
        glide: false,
        hat: true,
        kick: true,
        pitch: 7,
        selected: false,
        snare: false,
        volume: false
      },
      {
        clap2: true,
        glide: false,
        hat: true,
        kick: false,
        pitch: 7,
        selected: true,
        snare: true,
        volume: false
      },
      { glide: false, hat: true, pitch: 7, selected: true, volume: false },
      {
        glide: false,
        hat: true,
        kick: true,
        pitch: 7,
        selected: false,
        volume: false
      },
      { glide: false, hat: true, pitch: 7, selected: true, volume: false }
    ]
  },
  {
    bpm: 110,
    name: "Nina Sonik",
    avatarUrl:
      "https://graph.facebook.com/v2.12/1973585892677014/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 72, release: 77, sustain: 100 },
      envelope2: {
        amount: 100,
        assign: "filtercutoff",
        attack: 0,
        decay: 90,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 70, setQ: 0, type: "lowpass" },
      lfo: { amount: 1, frequency: 36, type: "sawtooth" },
      oscillator1: { detune: 0, frequency: "131", typeOsc: "sawtooth" },
      oscillator2: { frequency: "262", typeOsc: "sawtooth", volume: 67 },
      router: { envelope2: "filterCutoff", lfo: "oscsDetune" }
    },
    sequenceArray: [
      { glide: false, kick: true, pitch: 0, selected: true, volume: false },
      { glide: false, pitch: 0, selected: false, volume: false },
      {
        cymbal: true,
        glide: false,
        hat: true,
        kick: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        glide: false,
        hat: false,
        kick: false,
        pitch: 10,
        selected: true,
        snare: false,
        volume: false
      },
      {
        clap2: true,
        glide: false,
        hat: false,
        kick: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, hat: false, pitch: 5, selected: false, volume: false },
      {
        glide: true,
        hat: true,
        kick: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        glide: false,
        hat: false,
        kick: false,
        labmyc: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        glide: false,
        hat: false,
        kick: true,
        pitch: 10,
        selected: false,
        snare: true,
        volume: false
      },
      {
        glide: false,
        hat: false,
        kick: false,
        pitch: 1,
        selected: true,
        snare: true,
        volume: false
      },
      {
        clap2: false,
        glide: false,
        hat: true,
        kick: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: true
      },
      {
        clap: true,
        glide: false,
        kick: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        clap2: true,
        glide: false,
        hat: false,
        kick: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        glide: false,
        hat: false,
        kick: false,
        pitch: 0,
        selected: false,
        volume: true
      },
      {
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        glide: false,
        kick: true,
        labmyc: false,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      }
    ]
  },
  {
    bpm: 123,
    name: "Jacques Noronha",
    avatarUrl:
      "https://graph.facebook.com/v2.12/2334641509882850/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 0, release: 100, sustain: 100 },
      envelope2: {
        amount: 17,
        assign: "filtercutoff",
        attack: 12,
        decay: 97,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 82, setQ: 0, type: "lowpass" },
      lfo: { amount: 67, frequency: 1, type: "square" },
      oscillator1: { detune: 0, frequency: "523", typeOsc: "sawtooth" },
      oscillator2: { frequency: "65", typeOsc: "sine", volume: 71 },
      router: { envelope2: "oscsDetune", lfo: "filterCutoff" }
    },
    sequenceArray: [
      {
        clap: true,
        glide: true,
        kick: true,
        labmyc: false,
        noise: false,
        pitch: 8,
        selected: true,
        volume: true
      },
      { clap: true, glide: false, pitch: 0, selected: false, volume: false },
      {
        clap2: true,
        cymbal: false,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      { clap2: false, glide: false, pitch: 0, selected: false, volume: false },
      {
        clap: true,
        glide: true,
        kick: false,
        noise: true,
        pitch: 4,
        selected: true,
        snare: true,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false },
      {
        clap: true,
        clap2: false,
        cymbal: false,
        glide: false,
        hat: true,
        noise: true,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        clap: true,
        clap2: true,
        glide: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: true, kick: true, pitch: 5, selected: true, volume: true },
      { glide: false, pitch: 0, selected: false, volume: false },
      {
        clap: true,
        clap2: true,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap2: false,
        cymbal: false,
        glide: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap: true,
        glide: true,
        kick: false,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      },
      { clap: true, glide: false, pitch: 0, selected: false, volume: false },
      {
        clap2: true,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false }
    ]
  },
  {
    bpm: 105,
    name: "Kalinin Moraes",
    avatarUrl:
      "https://graph.facebook.com/v2.12/1992858364114560/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 44, release: 11, sustain: 0 },
      envelope2: {
        amount: 0,
        assign: "filtercutoff",
        attack: 0,
        decay: 49,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 79, setQ: 0, type: "lowpass" },
      lfo: { amount: 92, frequency: 30, type: "sine" },
      oscillator1: { detune: 0, frequency: "131", typeOsc: "square" },
      oscillator2: { frequency: "65", typeOsc: "triangle", volume: 93 },
      router: { envelope2: "oscsDetune", lfo: "filterCutoff" }
    },
    sequenceArray: [
      {
        glide: false,
        hat: true,
        kick: false,
        noise: false,
        pitch: 10,
        selected: true,
        snare: true,
        volume: false
      },
      {
        clap2: false,
        glide: false,
        hat: true,
        kick: true,
        noise: false,
        pitch: 3,
        selected: true,
        snare: false,
        volume: false
      },
      {
        clap2: false,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        clap2: false,
        glide: false,
        hat: true,
        kick: false,
        noise: false,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      },
      {
        clap: false,
        clap2: false,
        glide: false,
        hat: false,
        kick: false,
        noise: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        clap: true,
        clap2: false,
        glide: true,
        kick: true,
        noise: false,
        pitch: 5,
        selected: true,
        snare: false,
        volume: false
      },
      {
        glide: false,
        hat: false,
        noise: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, snare: false, volume: false },
      {
        glide: false,
        hat: true,
        noise: false,
        pitch: 3,
        selected: true,
        snare: true,
        volume: false
      },
      {
        clap2: false,
        glide: false,
        hat: true,
        kick: true,
        noise: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        glide: false,
        hat: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      { glide: false, pitch: 0, selected: true, snare: true, volume: false },
      {
        clap2: false,
        glide: false,
        hat: false,
        kick: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        clap: true,
        clap2: false,
        glide: false,
        kick: true,
        noise: false,
        pitch: 0,
        selected: true,
        snare: false,
        volume: false
      },
      {
        glide: false,
        hat: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      { glide: true, pitch: 0, selected: true, volume: false }
    ]
  },
  {
    bpm: 110,
    name: "Ryan McKay",
    avatarUrl:
      "https://graph.facebook.com/v2.12/10156811918709111/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 91, release: 15, sustain: 0 },
      envelope2: {
        amount: 62,
        assign: "filtercutoff",
        attack: 2,
        decay: 90,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 68, setQ: 0, type: "lowpass" },
      lfo: { amount: 83, frequency: 87, type: "sine" },
      oscillator1: { detune: 0, frequency: "65", typeOsc: "square" },
      oscillator2: { frequency: "65", typeOsc: "square", volume: 83 },
      router: { envelope2: "filterCutoff", lfo: "oscsDetune" }
    },
    sequenceArray: [
      {
        clap: false,
        clap2: false,
        cymbal: false,
        glide: false,
        hat: false,
        kick: true,
        labmyc: false,
        pitch: 0,
        selected: false,
        volume: true
      },
      {
        clap2: false,
        cymbal: false,
        glide: false,
        hat: false,
        kick: false,
        labmyc: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        clap2: false,
        cymbal: false,
        glide: true,
        hat: true,
        labmyc: false,
        pitch: 0,
        selected: true,
        volume: true
      },
      {
        clap2: false,
        glide: false,
        hat: false,
        labmyc: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap: false,
        clap2: false,
        cymbal: false,
        glide: false,
        hat: false,
        kick: true,
        labmyc: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        clap2: false,
        glide: false,
        hat: false,
        pitch: 3,
        selected: true,
        volume: false
      },
      {
        clap: false,
        clap2: false,
        cymbal: false,
        glide: true,
        hat: true,
        labmyc: false,
        pitch: 0,
        selected: true,
        snare: false,
        volume: true
      },
      {
        clap2: false,
        cymbal: false,
        glide: false,
        hat: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        clap: false,
        clap2: false,
        cymbal: false,
        glide: false,
        hat: false,
        kick: true,
        labmyc: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap2: false,
        cymbal: false,
        glide: false,
        hat: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        clap2: false,
        cymbal: true,
        glide: true,
        hat: true,
        labmyc: false,
        pitch: 0,
        selected: true,
        snare: false,
        volume: true
      },
      {
        clap: false,
        clap2: false,
        glide: false,
        hat: false,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      },
      {
        clap: false,
        clap2: false,
        cymbal: false,
        glide: false,
        hat: false,
        kick: true,
        labmyc: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      { glide: false, hat: false, pitch: 0, selected: true, volume: false },
      {
        clap: false,
        clap2: false,
        cymbal: false,
        glide: true,
        hat: true,
        kick: true,
        labmyc: false,
        pitch: 0,
        selected: true,
        snare: false,
        volume: true
      },
      {
        clap: false,
        clap2: false,
        glide: false,
        hat: false,
        kick: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      }
    ]
  },
  {
    bpm: 110,
    name: "Luke Williams-Rapata",
    avatarUrl:
      "https://graph.facebook.com/v2.12/2160078497357919/picture?height=200",
    parameterValues: {
      envelope: { attack: 12, decay: 69, release: 98, sustain: 100 },
      envelope2: {
        amount: 100,
        assign: "filtercutoff",
        attack: 58,
        decay: 100,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 85, setQ: 0, type: "lowpass" },
      lfo: { amount: 44, frequency: 100, type: "sine" },
      oscillator1: { detune: 0, frequency: "131", typeOsc: "sawtooth" },
      oscillator2: { frequency: "65", typeOsc: "square", volume: 82 },
      router: { envelope2: "oscsDetune", lfo: "osc1Detune" }
    },
    sequenceArray: [
      {
        glide: false,
        hat: true,
        kick: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, noise: false, pitch: 0, selected: false, volume: false },
      {
        clap: true,
        clap2: false,
        glide: false,
        hat: true,
        kick: true,
        noise: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, noise: false, pitch: 0, selected: false, volume: false },
      {
        clap: false,
        cymbal: true,
        glide: false,
        hat: false,
        labmyc: true,
        noise: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap: false,
        glide: false,
        hat: false,
        kick: false,
        noise: false,
        pitch: 0,
        selected: false,
        volume: true
      },
      {
        clap: true,
        glide: false,
        hat: false,
        kick: true,
        noise: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        glide: false,
        hat: false,
        kick: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap: false,
        clap2: true,
        glide: true,
        hat: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, hat: true, pitch: 0, selected: false, volume: true },
      {
        glide: false,
        hat: true,
        kick: false,
        noise: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, hat: false, pitch: 0, selected: false, volume: false },
      {
        clap: false,
        glide: false,
        hat: false,
        kick: false,
        noise: true,
        pitch: 10,
        selected: true,
        volume: false
      },
      {
        clap: false,
        clap2: false,
        glide: false,
        hat: false,
        kick: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap: false,
        clap2: false,
        glide: true,
        hat: true,
        kick: true,
        pitch: 3,
        selected: true,
        volume: false
      },
      {
        clap: true,
        glide: false,
        hat: true,
        kick: false,
        pitch: 0,
        selected: false,
        volume: false
      }
    ]
  },
  {
    bpm: 120,
    name: "Akira Aguirre",
    avatarUrl:
      "https://graph.facebook.com/v2.12/2175193589159045/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 58, release: 24, sustain: 0 },
      envelope2: {
        amount: 77,
        assign: "filtercutoff",
        attack: 0,
        decay: 0,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 63, setQ: 0, type: "lowpass" },
      lfo: { amount: 35, frequency: 35, type: "sine" },
      oscillator1: { detune: 65, frequency: "131", typeOsc: "sine" },
      oscillator2: { frequency: "65", typeOsc: "square", volume: 68 },
      router: { envelope2: "filterCutoff", lfo: "osc1Detune" }
    },
    sequenceArray: [
      {
        cymbal: false,
        glide: false,
        kick: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, hat: false, pitch: 10, selected: false, volume: false },
      { glide: false, hat: false, pitch: 10, selected: false, volume: false },
      { glide: false, hat: true, pitch: 3, selected: true, volume: false },
      {
        clap: true,
        glide: false,
        kick: true,
        pitch: 7,
        selected: false,
        snare: true,
        volume: false
      },
      { glide: false, pitch: 10, selected: false, volume: false },
      { glide: false, hat: false, pitch: 0, selected: true, volume: false },
      { glide: false, hat: true, pitch: 10, selected: false, volume: false },
      { glide: false, kick: true, pitch: 10, selected: false, volume: false },
      { glide: false, hat: true, pitch: 5, selected: true, volume: false },
      { glide: false, hat: false, pitch: 10, selected: false, volume: false },
      { glide: false, hat: false, pitch: 10, selected: false, volume: false },
      {
        clap: true,
        glide: false,
        kick: true,
        labmyc: true,
        pitch: 5,
        selected: true,
        snare: true,
        volume: false
      },
      { glide: false, pitch: 10, selected: false, volume: false },
      { glide: false, hat: true, pitch: 0, selected: true, volume: false },
      { glide: false, hat: true, pitch: 10, selected: false, volume: false }
    ]
  },
  {
    bpm: 115,
    name: "Arnaldo Correa",
    avatarUrl:
      "https://graph.facebook.com/v2.12/2066089673429693/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 100, release: 25, sustain: 74 },
      envelope2: {
        amount: 100,
        assign: "filtercutoff",
        attack: 32,
        decay: 55,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 90, setQ: 0, type: "lowpass" },
      lfo: { amount: 0, frequency: 22, type: "square" },
      oscillator1: { detune: 50, frequency: "65", typeOsc: "square" },
      oscillator2: { frequency: "65", typeOsc: "sine", volume: 86 },
      router: { envelope2: "filterCutoff", lfo: "oscsDetune" }
    },
    sequenceArray: [
      {
        cymbal: false,
        glide: false,
        kick: true,
        pitch: 4,
        selected: true,
        snare: false,
        volume: false
      },
      {
        glide: false,
        hat: false,
        pitch: 3,
        selected: false,
        snare: false,
        volume: false
      },
      {
        cymbal: false,
        glide: false,
        hat: true,
        pitch: 4,
        selected: true,
        volume: false
      },
      { glide: false, pitch: 1, selected: false, snare: true, volume: false },
      {
        clap: false,
        cymbal: false,
        glide: false,
        kick: true,
        pitch: 3,
        selected: true,
        volume: false
      },
      {
        clap: false,
        cymbal: false,
        glide: false,
        hat: false,
        noise: false,
        pitch: 1,
        selected: true,
        volume: false
      },
      {
        clap: false,
        cymbal: false,
        glide: false,
        noise: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        clap2: true,
        glide: false,
        hat: true,
        noise: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, kick: true, pitch: 0, selected: false, volume: false },
      {
        clap: false,
        glide: false,
        kick: false,
        pitch: 2,
        selected: true,
        volume: false
      },
      {
        clap: true,
        clap2: false,
        glide: false,
        hat: true,
        pitch: 2,
        selected: true,
        volume: false
      },
      {
        glide: false,
        hat: true,
        labmyc: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap2: false,
        glide: false,
        hat: false,
        kick: true,
        labmyc: false,
        noise: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        clap2: true,
        glide: false,
        hat: false,
        kick: false,
        noise: true,
        pitch: 5,
        selected: true,
        snare: false,
        volume: false
      },
      {
        cymbal: false,
        glide: false,
        labmyc: false,
        noise: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        cymbal: false,
        glide: true,
        labmyc: false,
        noise: false,
        pitch: 3,
        selected: true,
        snare: true,
        volume: false
      }
    ]
  },
  {
    bpm: 123,
    name: "David Laloux",
    avatarUrl:
      "https://graph.facebook.com/v2.12/10156220504778773/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 0, release: 95, sustain: 0 },
      envelope2: {
        amount: 100,
        assign: "filtercutoff",
        attack: 0,
        decay: 90,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 72, setQ: 0, type: "lowpass" },
      lfo: { amount: 100, frequency: 1, type: "sawtooth" },
      oscillator1: { detune: 0, frequency: "65", typeOsc: "sawtooth" },
      oscillator2: { frequency: "65", typeOsc: "sawtooth", volume: 95 },
      router: { envelope2: "filterCutoff", lfo: "osc1Detune" }
    },
    sequenceArray: [
      {
        cymbal: false,
        glide: false,
        hat: true,
        kick: true,
        pitch: 0,
        selected: true,
        volume: true
      },
      {
        glide: false,
        hat: false,
        noise: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        glide: false,
        hat: false,
        noise: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, hat: true, pitch: 0, selected: true, volume: false },
      {
        glide: false,
        hat: false,
        kick: true,
        pitch: 0,
        selected: true,
        volume: true
      },
      {
        cymbal: false,
        glide: false,
        hat: false,
        kick: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        cymbal: false,
        glide: false,
        hat: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        cymbal: false,
        glide: false,
        kick: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        clap2: true,
        cymbal: false,
        glide: false,
        kick: true,
        pitch: 4,
        selected: true,
        volume: true
      },
      { glide: false, pitch: 0, selected: true, volume: false },
      {
        glide: false,
        hat: true,
        kick: true,
        pitch: 0,
        selected: true,
        snare: true,
        volume: false
      },
      {
        clap2: false,
        glide: false,
        hat: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        clap2: false,
        glide: false,
        kick: true,
        pitch: 10,
        selected: true,
        volume: true
      },
      {
        clap2: false,
        glide: false,
        labmyc: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        clap2: true,
        glide: false,
        labmyc: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, labmyc: false, pitch: 0, selected: true, volume: false }
    ]
  },
  {
    bpm: 110,
    name: "Pedro Henrique",
    avatarUrl:
      "https://image.redbull.com/rbx00931/0001/2/200/497/www/avatar/57bc0183585269230c67a158/5beabbe8d035d10605317451/avatar.jpg?ts=1542111008",
    parameterValues: {
      envelope: { attack: 9, decay: 100, release: 17, sustain: 100 },
      envelope2: {
        amount: 100,
        assign: "filtercutoff",
        attack: 0,
        decay: 90,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 91, setQ: 0, type: "lowpass" },
      lfo: { amount: 0, frequency: 18, type: "sine" },
      oscillator1: { detune: 0, frequency: "65", typeOsc: "triangle" },
      oscillator2: { frequency: "131", typeOsc: "square", volume: 72 },
      router: { envelope2: "filterCutoff", lfo: "osc1Detune" }
    },
    sequenceArray: [
      {
        glide: false,
        hat: true,
        kick: true,
        pitch: 0,
        selected: true,
        volume: false
      },
      {
        glide: true,
        labmyc: false,
        noise: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        glide: false,
        hat: true,
        labmyc: true,
        noise: false,
        pitch: 7,
        selected: true,
        volume: false
      },
      {
        glide: true,
        hat: false,
        kick: false,
        labmyc: false,
        pitch: 0,
        selected: false,
        snare: false,
        volume: false
      },
      {
        glide: false,
        hat: true,
        kick: false,
        pitch: 5,
        selected: true,
        snare: true,
        volume: false
      },
      {
        cymbal: false,
        glide: false,
        hat: false,
        kick: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        cymbal: true,
        glide: false,
        hat: true,
        kick: true,
        pitch: 8,
        selected: true,
        volume: false
      },
      { cymbal: false, glide: false, pitch: 0, selected: false, volume: false },
      {
        glide: false,
        hat: true,
        kick: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        glide: true,
        kick: false,
        noise: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        cymbal: false,
        glide: false,
        hat: true,
        kick: true,
        noise: false,
        pitch: 7,
        selected: true,
        volume: false
      },
      {
        glide: false,
        kick: false,
        noise: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap2: true,
        cymbal: false,
        glide: false,
        hat: true,
        kick: false,
        noise: false,
        pitch: 3,
        selected: true,
        snare: true,
        volume: false
      },
      { glide: true, pitch: 0, selected: false, volume: false },
      {
        clap: true,
        cymbal: false,
        glide: false,
        hat: true,
        noise: false,
        pitch: 8,
        selected: true,
        volume: false
      },
      { glide: true, pitch: 0, selected: false, volume: false }
    ]
  },
  {
    bpm: 110,
    name: "Francisco Sylla",
    avatarUrl:
      "https://graph.facebook.com/v2.12/1996034117121691/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 25, release: 90, sustain: 100 },
      envelope2: {
        amount: 100,
        assign: "filtercutoff",
        attack: 0,
        decay: 90,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 70, setQ: 0, type: "lowpass" },
      lfo: { amount: 42, frequency: 69, type: "triangle" },
      oscillator1: { detune: 51, frequency: "523", typeOsc: "sawtooth" },
      oscillator2: { frequency: "65", typeOsc: "square", volume: 75 },
      router: { envelope2: "filterCutoff", lfo: "osc1Detune" }
    },
    sequenceArray: [
      { glide: false, kick: true, pitch: 0, selected: true, volume: false },
      {
        cymbal: false,
        glide: false,
        hat: false,
        pitch: 9,
        selected: false,
        volume: false
      },
      {
        cymbal: false,
        glide: false,
        hat: true,
        pitch: 9,
        selected: false,
        volume: false
      },
      {
        glide: false,
        hat: false,
        pitch: 9,
        selected: false,
        snare: true,
        volume: false
      },
      {
        glide: false,
        hat: false,
        kick: false,
        pitch: 7,
        selected: false,
        volume: false
      },
      { glide: false, hat: false, pitch: 5, selected: false, volume: false },
      {
        clap2: true,
        glide: false,
        hat: true,
        pitch: 4,
        selected: false,
        volume: false
      },
      { clap: false, glide: false, pitch: 5, selected: false, volume: false },
      { glide: false, kick: true, pitch: 8, selected: false, volume: false },
      { glide: false, kick: false, pitch: 0, selected: false, volume: false },
      { glide: false, hat: true, pitch: 10, selected: false, volume: false },
      { glide: false, pitch: 0, selected: false, volume: false },
      {
        clap: false,
        glide: false,
        pitch: 10,
        selected: false,
        snare: true,
        volume: false
      },
      {
        clap: false,
        glide: false,
        hat: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      {
        clap: true,
        glide: false,
        hat: true,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, pitch: 0, selected: false, volume: false }
    ]
  },
  {
    bpm: 135,
    name: "Ivan Martinez",
    avatarUrl:
      "https://graph.facebook.com/v2.12/10210023419701296/picture?height=200",
    parameterValues: {
      envelope: { attack: 0, decay: 65, release: 34, sustain: 0 },
      envelope2: {
        amount: 61,
        assign: "filtercutoff",
        attack: 84,
        decay: 100,
        release: 0,
        sustain: 0
      },
      filter: { cutOffFreq: 49, setQ: 0, type: "lowpass" },
      lfo: { amount: 54, frequency: 53, type: "sine" },
      oscillator1: { detune: 0, frequency: "65", typeOsc: "square" },
      oscillator2: { frequency: "65", typeOsc: "sawtooth", volume: 46 },
      router: { envelope2: "oscsDetune", lfo: "filterCutoff" }
    },
    sequenceArray: [
      {
        cymbal: false,
        glide: false,
        kick: true,
        noise: false,
        pitch: 0,
        selected: false,
        volume: false
      },
      { glide: false, hat: false, pitch: 1, selected: true, volume: false },
      { glide: false, hat: true, pitch: 0, selected: true, volume: true },
      { glide: false, hat: false, pitch: 2, selected: true, volume: false },
      {
        glide: false,
        kick: true,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      },
      { glide: false, hat: false, pitch: 0, selected: true, volume: false },
      { glide: false, hat: true, pitch: 1, selected: true, volume: true },
      {
        clap: true,
        glide: true,
        hat: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, kick: true, pitch: 0, selected: false, volume: false },
      {
        clap: false,
        clap2: false,
        glide: false,
        hat: false,
        pitch: 0,
        selected: true,
        volume: false
      },
      { glide: false, hat: true, pitch: 0, selected: true, volume: true },
      { glide: false, hat: false, pitch: 2, selected: true, volume: false },
      {
        glide: false,
        kick: true,
        pitch: 0,
        selected: false,
        snare: true,
        volume: false
      },
      { glide: false, hat: false, pitch: 1, selected: true, volume: false },
      {
        glide: false,
        hat: true,
        labmyc: true,
        pitch: 0,
        selected: true,
        volume: true
      },
      {
        glide: true,
        hat: false,
        noise: false,
        pitch: 0,
        selected: true,
        volume: false
      }
    ]
  }
];
