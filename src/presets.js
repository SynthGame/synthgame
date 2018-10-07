export default [
  {
  "bpm": 131,
  "name": "bart-proost",
  "avatarUrl": "https://i1.sndcdn.com/avatars-000459014022-r4tcc2-t500x500.jpg",
  "parameterValues": {
    "envelope": {
      "attack": 0,
      "decay": 25,
      "release": 90,
      "sustain": 0
    },
    "envelope2": {
      "assign": "filtercutoff",
      "attack": 0,
      "decay": 10,
      "release": 10,
      "amount": 100,
      "sustain": 0
    },
    "filter": {
      "cutOffFreq": 86,
      "setQ": 0,
      "type": "lowpass"
    },
    "lfo": {
      "amount": 12,
      "frequency": 10,
      "type": "sine"
    },
    "oscillator1": {
      "detune": 50,
      "frequency": "131",
      "typeOsc": "sine"
    },
    "oscillator2": {
      "frequency": "65",
      "typeOsc": "sine",
      "volume": 77
    },
    "router": {
      "envelope2": "filterCutoff",
      "lfo": "osc1Detune"
    }
  },
  "sequenceArray": [{
    "kick": true,
    "pitch": 0,
    "selected": true
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "pitch": 0,
    "selected": true
  }, {
    "kick": true,
    "pitch": 0,
    "selected": false
  }, {
    "kick": false,
    "pitch": 0,
    "selected": true
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "kick": true,
    "pitch": 0,
    "selected": false
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "kick": true,
    "pitch": 0,
    "selected": true
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "pitch": 0,
    "selected": false
  }, {
    "kick": true,
    "pitch": 0,
    "selected": true
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "pitch": 0,
    "selected": false
  }, {
    "pitch": 0,
    "selected": false
  }]
},
{
  "bpm": 113,
  "name": "bart-proost",
  "avatarUrl": "https://i1.sndcdn.com/avatars-000459014022-r4tcc2-t500x500.jpg",
  "parameterValues": {
    "envelope": {
      "attack": 0,
      "decay": 25,
      "release": 90,
      "sustain": 0
    },
    "envelope2": {
      "assign": "filtercutoff",
      "attack": 0,
      "decay": 10,
      "release": 10,
      "amount": 100,
      "sustain": 0
    },
    "filter": {
      "cutOffFreq": 82,
      "setQ": 0,
      "type": "lowpass"
    },
    "lfo": {
      "amount": 37,
      "frequency": 25,
      "type": "sine"
    },
    "oscillator1": {
      "detune": 50,
      "frequency": "131",
      "typeOsc": "square"
    },
    "oscillator2": {
      "frequency": "65",
      "typeOsc": "sine",
      "volume": 88
    },
    "router": {
      "envelope2": "filterCutoff",
      "lfo": "osc1Detune"
    }
  },
  "sequenceArray": [{
    "cymbal": true,
    "kick": true,
    "pitch": 5,
    "selected": true
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "pitch": 0,
    "selected": true
  }, {
    "kick": true,
    "pitch": 0,
    "selected": false
  }, {
    "clap2": true,
    "kick": false,
    "pitch": 3,
    "selected": true,
    "snare": true
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "kick": true,
    "pitch": 0,
    "selected": false
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "cymbal": false,
    "hat": true,
    "kick": true,
    "pitch": 0,
    "selected": true
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "pitch": 0,
    "selected": false
  }, {
    "clap2": true,
    "kick": true,
    "noise": false,
    "pitch": 7,
    "selected": true,
    "snare": true
  }, {
    "noise": false,
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "noise": true,
    "pitch": 0,
    "selected": false
  }, {
    "pitch": 0,
    "selected": false
  }]
},
// {
//   "avatarUrl": "https://i1.sndcdn.com/avatars-000086505759-0hpuas-t500x500.jpg",
//   "bpm": 107,
//   "name": "holbachmusic",
//   "parameterValues": {
//     "envelope": {
//       "attack": 0,
//       "decay": 25,
//       "release": 90,
//       "sustain": 100
//     },
//     "envelope2": {
//       "assign": "filtercutoff",
//       "attack": 0,
//       // "decay": 83,
//       "release": 90,
//       "amount": 100,
//       // "sustain": 100
//     },
//     "filter": {
//       "cutOffFreq": 76,
//       "setQ": 0,
//       "type": "lowpass"
//     },
//     "lfo": {
//       "amount": 37,
//       "frequency": 15,
//       "type": "sawtooth"
//     },
//     "oscillator1": {
//       "detune": 50,
//       "frequency": "131",
//       "typeOsc": "sawtooth"
//     },
//     "oscillator2": {
//       "frequency": "65",
//       "typeOsc": "square",
//       "volume": 65
//     },
//     "router": {
//       "envelope2": "oscsDetune",
//       "lfo": "filterCutoff"
//     }
//   },
//   "sequenceArray": [{
//     "clap2": true,
//     "kick": false,
//     "pitch": 0,
//     "selected": true
//   }, {
//     "clap2": false,
//     "kick": true,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "hat": false,
//     "kick": false,
//     "pitch": 2,
//     "selected": true
//   }, {
//     "hat": true,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "clap2": false,
//     "hat": false,
//     "kick": false,
//     "pitch": 5,
//     "selected": true
//   }, {
//     "clap2": false,
//     "kick": true,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "clap2": false,
//     "kick": false,
//     "pitch": 9,
//     "selected": true
//   }, {
//     "clap2": true,
//     "hat": true,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "hat": false,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "clap2": false,
//     "hat": false,
//     "kick": true,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "pitch": 0,
//     "selected": false
//   }, {
//     "hat": true,
//     "labmyc": false,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "labmyc": true,
//     "pitch": 2,
//     "selected": true
//   }, {
//     "clap2": false,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "clap2": false,
//     "hat": true,
//     "labmyc": false,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "hat": true,
//     "noise": true,
//     "pitch": 0,
//     "selected": false
//   }]
// },
{
  "bpm": 125,
  "name": "hathor-libra",
  "avatarUrl": "https://i1.sndcdn.com/avatars-000465812631-9gjonu-t500x500.jpg",
  "parameterValues": {
    "envelope": {
      "attack": 29,
      "decay": 10,
      "release": 0,
      "sustain": 33
    },
    "envelope2": {
      "assign": "filtercutoff",
      "attack": 15,
      "decay": 90,
      "release": 0,
      "amount": 100,
      "sustain": 0
    },
    "filter": {
      "cutOffFreq": 59,
      "setQ": 0,
      "type": "lowpass"
    },
    "lfo": {
      "amount": 0,
      "frequency": 5,
      "type": "sine"
    },
    "oscillator1": {
      "detune": 67,
      "frequency": "131",
      "typeOsc": "triangle"
    },
    "oscillator2": {
      "frequency": "65",
      "typeOsc": "sine",
      "volume": 79
    },
    "router": {
      "envelope2": "filterCutoff",
      "lfo": "osc1Detune"
    }
  },
  "sequenceArray": [{
    "cymbal": true,
    "kick": true,
    "pitch": 0,
    "selected": true
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "pitch": 7,
    "selected": false
  }, {
    "pitch": 7,
    "selected": true
  }, {
    "clap": true,
    "kick": true,
    "labmyc": false,
    "pitch": 0,
    "selected": false
  }, {
    "hat": false,
    "noise": false,
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "pitch": 0,
    "selected": true
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "cymbal": false,
    "kick": true,
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "pitch": 0,
    "selected": true
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "clap": false,
    "noise": true,
    "pitch": 0,
    "selected": false
  }, {
    "clap": true,
    "clap2": true,
    "cymbal": true,
    "kick": true,
    "labmyc": true,
    "pitch": 0,
    "selected": true
  }, {
    "labmyc": false,
    "pitch": 0,
    "selected": false,
    "snare": false
  }, {
    "clap": false,
    "hat": true,
    "pitch": 8,
    "selected": true,
    "snare": false
  }, {
    "pitch": 0,
    "selected": false,
    "snare": true
  }]
},
{
  "avatarUrl": "https://i1.sndcdn.com/avatars-000510735876-yhri5l-t500x500.jpg",
  "bpm": 132,
  "name": "oak",
  "parameterValues": {
    "envelope": {
      "attack": 62,
      "decay": 25,
      "release": 90,
      "sustain": 100
    },
    "envelope2": {
      "assign": "filtercutoff",
      "attack": 38,
      "decay": 90,
      "release": 0,
      "amount": 100,
      "sustain": 0
    },
    "filter": {
      "cutOffFreq": 82,
      "setQ": 0,
      "type": "lowpass"
    },
    "lfo": {
      "amount": 3,
      "frequency": 5,
      "type": "triangle"
    },
    "oscillator1": {
      "detune": 50,
      "frequency": "262",
      "typeOsc": "sawtooth"
    },
    "oscillator2": {
      "frequency": "65",
      "typeOsc": "square",
      "volume": 72
    },
    "router": {
      "envelope2": "filterCutoff",
      "lfo": "oscsDetune"
    }
  },
  "sequenceArray": [{
    "hat": true,
    "kick": false,
    "pitch": 2,
    "selected": true
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "pitch": 0,
    "selected": false
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "noise": true,
    "pitch": 9,
    "selected": false
  }, {
    "kick": false,
    "pitch": 9,
    "selected": false
  }, {
    "hat": true,
    "kick": false,
    "pitch": 0,
    "selected": false
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "clap": true,
    "hat": true,
    "pitch": 9,
    "selected": true
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "kick": false,
    "pitch": 0,
    "selected": false
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "kick": false,
    "noise": true,
    "pitch": 3,
    "selected": true
  }, {
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "pitch": 0,
    "selected": false
  }, {
    "hat": false,
    "pitch": 0,
    "selected": false
  }]
},
// {
//   "avatarUrl": "https://i1.sndcdn.com/avatars-000272676277-fslgk8-t500x500.jpg",
//   "bpm": 80,
//   "name": "eery",
//   "parameterValues": {
//     "envelope": {
//       "attack": 11,
//       // "decay": 25,
//       "release": 90,
//       // "sustain": 51
//     },
//     "envelope2": {
//       "assign": "filtercutoff",
//       "attack": 43,
//       // "decay": 100,
//       "release": 90,
//       // "sustain": 100
//       "amount": 100,
//     },
//     "filter": {
//       "cutOffFreq": 45,
//       "setQ": 0,
//       "type": "lowpass"
//     },
//     "lfo": {
//       "amount": 95,
//       "frequency": 31,
//       "type": "sine"
//     },
//     "oscillator1": {
//       "detune": 49,
//       "frequency": "262",
//       "typeOsc": "sawtooth"
//     },
//     "oscillator2": {
//       "frequency": "131",
//       "typeOsc": "sawtooth",
//       "volume": 68
//     },
//     "router": {
//       "envelope2": "osc1Detune",
//       "lfo": "filterCutoff"
//     }
//   },
//   "sequenceArray": [{
//     "cymbal": false,
//     "kick": true,
//     "pitch": 0,
//     "selected": true
//   }, {
//     "pitch": 0,
//     "selected": false
//   }, {
//     "pitch": 0,
//     "selected": false
//   }, {
//     "hat": true,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "pitch": 0,
//     "selected": false,
//     "snare": true
//   }, {
//     "pitch": 0,
//     "selected": false
//   }, {
//     "cymbal": true,
//     "kick": true,
//     "pitch": 0,
//     "selected": true
//   }, {
//     "hat": true,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "labmyc": false,
//     "pitch": 4,
//     "selected": false
//   }, {
//     "pitch": 0,
//     "selected": false
//   }, {
//     "pitch": 0,
//     "selected": false
//   }, {
//     "hat": true,
//     "kick": true,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "labmyc": true,
//     "pitch": 0,
//     "selected": false,
//     "snare": true
//   }, {
//     "pitch": 0,
//     "selected": false
//   }, {
//     "noise": true,
//     "pitch": 10,
//     "selected": true
//   }, {
//     "hat": true,
//     "pitch": 0,
//     "selected": false
//   }]
// },
// {
//   "bpm": 116,
//   "name": "summertryouts",
//   "avatarUrl": "https://i1.sndcdn.com/avatars-000500444838-gtohaq-t500x500.jpg",
//   "parameterValues": {
//     "envelope": {
//       "attack": 59,
//       "decay": 28,
//       "release": 9,
//       "sustain": 54
//     },
//     "envelope2": {
//       "assign": "filtercutoff",
//       "attack": 100,
//       "decay": 60,
//       "release": 60,
//       "sustain": 0,
//       "amount": 0
//     },
//     "filter": {
//       "cutOffFreq": 51,
//       "setQ": 0,
//       "type": "lowpass"
//     },
//     "lfo": {
//       "amount": 5,
//       "frequency": 81,
//       "type": "square"
//     },
//     "oscillator1": {
//       "detune": 0,
//       "frequency": "65",
//       "typeOsc": "sine"
//     },
//     "oscillator2": {
//       "frequency": "131",
//       "typeOsc": "sine",
//       "volume": 31
//     },
//     "router": {
//       "envelope2": "lfoFrequency",
//       "lfo": "oscsDetune"
//     }
//   },
//   "sequenceArray": [{
//     "clap": false,
//     "hat": true,
//     "kick": false,
//     "pitch": 7,
//     "selected": false
//   }, {
//     "clap": false,
//     "hat": false,
//     "kick": false,
//     "pitch": 0,
//     "selected": true
//   }, {
//     "clap": false,
//     "cymbal": false,
//     "hat": true,
//     "kick": true,
//     "noise": false,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "hat": true,
//     "labmyc": false,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "hat": false,
//     "labmyc": false,
//     "pitch": 0,
//     "selected": true
//   }, {
//     "cymbal": false,
//     "hat": true,
//     "kick": false,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "clap": true,
//     "clap2": false,
//     "hat": false,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "clap": false,
//     "clap2": false,
//     "hat": true,
//     "kick": false,
//     "pitch": 12,
//     "selected": false
//   }, {
//     "cymbal": false,
//     "hat": true,
//     "kick": true,
//     "pitch": 0,
//     "selected": true
//   }, {
//     "kick": true,
//     "noise": false,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "clap2": false,
//     "hat": true,
//     "kick": false,
//     "pitch": 0,
//     "selected": true
//   }, {
//     "clap": false,
//     "noise": false,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "clap": false,
//     "clap2": true,
//     "hat": true,
//     "kick": true,
//     "noise": false,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "clap2": false,
//     "hat": true,
//     "noise": false,
//     "pitch": 0,
//     "selected": true
//   }, {
//     "clap2": false,
//     "hat": true,
//     "kick": false,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "clap2": false,
//     "hat": true,
//     "kick": false,
//     "noise": false,
//     "pitch": 0,
//     "selected": false
//   }]
// },
// {
//   "bpm": 110,
//   "name": "intricate-at-the-lab",
//   "avatarUrl": "https://i1.sndcdn.com/avatars-000001589241-eiigg3-t500x500.jpg",
//   "parameterValues": {
//     "envelope": {
//       "attack": 14,
//       "decay": 0,
//       "release": 21,
//       "sustain": 14
//     },
//     "envelope2": {
//       "assign": "filtercutoff",
//       "attack": 0,
//       "decay": 90,
//       "release": 90,
//       "sustain": 0,
//       "amount": 0
//     },
//     "filter": {
//       "cutOffFreq": 69,
//       "setQ": 0,
//       "type": "lowpass"
//     },
//     "lfo": {
//       "amount": 21,
//       "frequency": 36,
//       "type": "sine"
//     },
//     "oscillator1": {
//       "detune": 1,
//       "frequency": "131",
//       "typeOsc": "sawtooth"
//     },
//     "oscillator2": {
//       "frequency": "65",
//       "typeOsc": "triangle",
//       "volume": 78
//     },
//     "router": {
//       "envelope2": "lfoFrequency",
//       "lfo": "filterCutoff"
//     }
//   },
//   "sequenceArray": [{
//     "kick": true,
//     "pitch": 0,
//     "selected": true
//   }, {
//     "clap": true,
//     "noise": true,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "hat": true,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "kick": true,
//     "pitch": 0,
//     "selected": true
//   }, {
//     "pitch": 0,
//     "selected": false,
//     "snare": true
//   }, {
//     "pitch": 0,
//     "selected": false
//   }, {
//     "hat": true,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "kick": true,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "pitch": 0,
//     "selected": true
//   }, {
//     "pitch": 0,
//     "selected": false
//   }, {
//     "hat": true,
//     "kick": true,
//     "labmyc": false,
//     "noise": true,
//     "pitch": 0,
//     "selected": false
//   }, {
//     "labmyc": false,
//     "pitch": 3,
//     "selected": true
//   }, {
//     "labmyc": false,
//     "pitch": 0,
//     "selected": false,
//     "snare": true
//   }, {
//     "cymbal": true,
//     "pitch": 4,
//     "selected": false
//   }, {
//     "clap": true,
//     "cymbal": false,
//     "hat": true,
//     "pitch": 3,
//     "selected": true
//   }, {
//     "pitch": 0,
//     "selected": false,
//     "snare": true
//   }]
// },
{
  "bpm": 104,
  "name": "user-347766802",
  "avatarUrl": "https://i1.sndcdn.com/avatars-000197576750-fzoibs-t500x500.jpg",
  "parameterValues": {
    "envelope": {
      "attack": 2,
      "decay": 3,
      "release": 0,
      "sustain": 46
    },
    "envelope2": {
      "assign": "filtercutoff",
      "attack": 0,
      "decay": 90,
      "release": 90,
      "sustain": 0,
      "amount": 0
    },
    "filter": {
      "cutOffFreq": 79,
      "setQ": 0,
      "type": "bandpass"
    },
    "lfo": {
      "amount": 5,
      "frequency": 100,
      "type": "sawtooth"
    },
    "oscillator1": {
      "detune": 49,
      "frequency": "523",
      "typeOsc": "sawtooth"
    },
    "oscillator2": {
      "frequency": "523",
      "typeOsc": "triangle",
      "volume": 50
    },
    "router": {
      "envelope2": "filterCutoff",
      "lfo": "oscsDetune"
    }
  },
  "sequenceArray": [{
    "cymbal": true,
    "hat": true,
    "kick": true,
    "noise": false,
    "pitch": 2,
    "selected": true,
    "snare": false
  }, {
    "hat": true,
    "pitch": 0,
    "selected": false
  }, {
    "clap": true,
    "hat": false,
    "pitch": 4,
    "selected": true,
    "snare": true
  }, {
    "hat": true,
    "pitch": 0,
    "selected": false,
    "snare": false
  }, {
    "hat": true,
    "kick": true,
    "pitch": 5,
    "selected": true,
    "snare": false
  }, {
    "hat": false,
    "pitch": 0,
    "selected": false,
    "snare": true
  }, {
    "hat": true,
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "pitch": 0,
    "selected": false
  }, {
    "clap": true,
    "hat": false,
    "kick": true,
    "noise": true,
    "pitch": 5,
    "selected": true,
    "snare": true
  }, {
    "hat": true,
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "pitch": 0,
    "selected": false
  }, {
    "hat": true,
    "kick": true,
    "labmyc": true,
    "noise": false,
    "pitch": 7,
    "selected": true,
    "snare": false
  }, {
    "hat": false,
    "pitch": 0,
    "selected": false
  }, {
    "hat": false,
    "kick": true,
    "pitch": 0,
    "selected": false
  }, {
    "hat": false,
    "labmyc": false,
    "pitch": 0,
    "selected": false
  }]
}
]
