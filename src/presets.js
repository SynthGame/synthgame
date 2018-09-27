export default [
  {
  "bpm": 131,
  "name": "bart-proost",
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
      "decay": 100,
      "release": 10,
      "sustain": 37
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
      "decay": 15,
      "release": 10,
      "sustain": 37
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
}
]
