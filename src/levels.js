export default [
  // level 1
  {
    oscillator1: {
      typeOsc: true
    },
    oscillator2: {
    },
    filter: {},
    envelope: {},
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      text: "Use the white guidelines to recreate this sound in 60 seconds."
    }
  },
  // level 2
  {
    oscillator1: {
      frequency: true,
      typeOsc: true
    },
    oscillator2: {},
    filter: {},
    envelope: {},
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      text: 'The oscillator is the source of electronic sound. Use the knobs and dials to shape the outputted signal. '
    }
  },
  // level 3
  {
    oscillator1: {
      typeOsc: true,
      frequency: true,
      detune: true
    },
    oscillator2: {},
    filter: {},
    envelope: {},
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      text: 'Both detune and octave control the pitch.'
    }
  },
  // level 4
  {
    oscillator1: {
      typeOsc: true,
      frequency: true,
      detune: true
    },
    oscillator2: {
      typeOsc: true
    },
    filter: {},
    envelope: {},
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      text: 'You unlocked the second oscillator!'
    }
  },
  // level 5
  {
    oscillator1: {
      detune: true,
      frequency: true,
      typeOsc: true
    },
    oscillator2: {
      typeOsc: true,
      frequency: true
    },
    filter: {},
    envelope: {},
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      text: 'Use detune on Osc 1 to detune the oscillators, resulting in a fatter sound.'
    }
  },
  // level 6
  {
    oscillator1: {
      detune: true,
      frequency: true,
      typeOsc: true
    },
    oscillator2: {
      typeOsc: true,
      frequency: true,
      volume: true
    },
    filter: {},
    envelope: {},
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      text: 'Use volume on Osc 2 to alter the mix between the oscillators.'
    }
  },
  // level 7
  {
    oscillator1: {
      detune: true,
      frequency: true,
      typeOsc: true
    },
    oscillator2: {
      typeOsc: true,
      frequency: true,
      volume: true
    },
    filter: {
      type: true
    },
    envelope: {},
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      text: 'You unlocked the filter!'
    }
  },
  // level 8
  {
    oscillator1: {
      detune: true,
      frequency: true,
      typeOsc: true
    },
    oscillator2: {
      typeOsc: true,
      frequency: true,
      volume: true
    },
    filter: {
      type: true,
      cutOffFreq: true
    },
    envelope: {},
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      text: 'The cutoff frequency control sets the range of the sound passed.'
    }
  },
  // level 9
  {
    oscillator1: {
      detune: true,
      frequency: true,
      typeOsc: true
    },
    oscillator2: {
      typeOsc: true,
      frequency: true,
      volume: true
    },
    filter: {
      type: true,
      cutOffFreq: true
    },
    envelope: {
      attack: true
    },
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      text: 'You unlocked the Amplifier Envelope!'
    }
  },
  // level 10
  {
    oscillator1: {
      detune: true,
      frequency: true,
      typeOsc: true
    },
    oscillator2: {
      typeOsc: true,
      frequency: true,
      volume: true
    },
    filter: {
      type: true,
      cutOffFreq: true
    },
    envelope: {
      attack: true,
      decay: true
    },
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      text: 'Every time a note is played, the envelope is triggered.'
    }
  },
  // level 11
  {
    oscillator1: {
      detune: true,
      frequency: true,
      typeOsc: true
    },
    oscillator2: {
      typeOsc: true,
      frequency: true,
      volume: true
    },
    filter: {
      type: true,
      cutOffFreq: true
    },
    envelope: {
      attack: true,
      decay: true,
      sustain: true
    },
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      text: 'Use attack, decay, sustain and release to decide on the volume of the note over time.'
    }
  },
  // level 12
  {
    oscillator1: {
      detune: true,
      frequency: true,
      typeOsc: true
    },
    oscillator2: {
      typeOsc: true,
      frequency: true,
      volume: true
    },
    filter: {
      type: true,
      cutOffFreq: true
    },
    envelope: {
      attack: true,
      decay: true,
      sustain: true,
      release: true
    },
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      text: 'Hint: set attack and decay to low levels for snappy sounds.'
    }
  },
  // // level 13
  // {
  //   oscillator1: {
  //     detune: true,
  //     frequency: true,
  //     typeOsc: true
  //   },
  //   oscillator2: {
  //     typeOsc: true,
  //     frequency: true,
  //     volume: true
  //   },
  //   filter: {
  //     type: true,
  //     cutOffFreq: true
  //   },
  //   envelope: {
  //     attack: true,
  //     decay: true,
  //     sustain: true,
  //     release: true
  //   },
  //   envelope2: {},
  //   lfo: {
  //     amount: true
  //   },
  //   router: {},
  //   levelData: {
  //     text: 'You unlocked the LFO!'
  //   }
  // },
  // // level 14
  // {
  //   oscillator1: {
  //     detune: true,
  //     frequency: true,
  //     typeOsc: true
  //   },
  //   oscillator2: {
  //     typeOsc: true,
  //     frequency: true,
  //     volume: true
  //   },
  //   filter: {
  //     type: true,
  //     cutOffFreq: true
  //   },
  //   envelope: {
  //     attack: true,
  //     decay: true,
  //     sustain: true,
  //     release: true
  //   },
  //   envelope2: {},
  //   lfo: {
  //     amount: true,
  //     frequency: true
  //   },
  //   router: {},
  //   levelData: {
  //     text: 'LFO stands for low frequency oscillator. It produces an output signal which can modulate other controls.'
  //   }
  // },
  // // level 15
  // {
  //   oscillator1: {
  //     detune: true,
  //     frequency: true,
  //     typeOsc: true
  //   },
  //   oscillator2: {
  //     typeOsc: true,
  //     frequency: true,
  //     volume: true
  //   },
  //   filter: {
  //     type: true,
  //     cutOffFreq: true
  //   },
  //   envelope: {
  //     attack: true,
  //     decay: true,
  //     sustain: true,
  //     release: true
  //   },
  //   envelope2: {},
  //   lfo: {
  //     amount: true,
  //     frequency: true,
  //     type: true
  //   },
  //   router: {},
  //   levelData: {
  //     text: "Low frequency oscillators can bring life to otherwise static sounds."
  //   }
  // },
  // level 16
  {
    oscillator1: {
      detune: true,
      frequency: true,
      typeOsc: true
    },
    oscillator2: {
      typeOsc: true,
      frequency: true,
      volume: true
    },
    filter: {
      type: true,
      cutOffFreq: true
    },
    envelope: {
      attack: true,
      decay: true,
      sustain: true,
      release: true
    },
    envelope2: {
      attack: true
    },
    lfo: {
      // amount: true,
      // frequency: true,
      // type: true
    },
    router: {},
    levelData: {
      text: 'You unlocked the Modulation Envelope!'
    }
  },
  // level 17
  {
    oscillator1: {
      detune: true,
      frequency: true,
      typeOsc: true
    },
    oscillator2: {
      typeOsc: true,
      frequency: true,
      volume: true
    },
    filter: {
      type: true,
      cutOffFreq: true
    },
    envelope: {
      attack: true,
      decay: true,
      sustain: true,
      release: true
    },
    envelope2: {
      attack: true,
      decay: true,
    },
    lfo: {
      // amount: true,
      // frequency: true,
      // type: true
    },
    router: {},
    levelData: {
      text: 'We use modulation envelope to modulate another synth control.'
    }
  },
  // // level 18
  // {
  //   oscillator1: {
  //     detune: true,
  //     frequency: true,
  //     typeOsc: true
  //   },
  //   oscillator2: {
  //     typeOsc: true,
  //     frequency: true,
  //     volume: true
  //   },
  //   filter: {
  //     type: true,
  //     cutOffFreq: true
  //   },
  //   envelope: {
  //     attack: true,
  //     decay: true,
  //     sustain: true,
  //     release: true
  //   },
  //   envelope2: {
  //     attack: true,
  //     decay: true,
  //     sustain: true
  //   },
  //   lfo: {
  //     amount: true,
  //     frequency: true,
  //     type: true
  //   },
  //   router: {},
  //   levelData: {
  //     text: 'With both an lfo and an mod envelope the world is your oyster.'
  //   }
  // },
  // level 19
  // {
  //   oscillator1: {
  //     detune: true,
  //     frequency: true,
  //     typeOsc: true
  //   },
  //   oscillator2: {
  //     typeOsc: true,
  //     frequency: true,
  //     volume: true
  //   },
  //   filter: {
  //     type: true,
  //     cutOffFreq: true
  //   },
  //   envelope: {
  //     attack: true,
  //     decay: true,
  //     sustain: true,
  //     release: true
  //   },
  //   envelope2: {
  //     attack: true,
  //     release: true
  //   },
  //   lfo: {
  //     amount: true,
  //     frequency: true,
  //     type: true
  //   },
  //   router: {},
  //   levelData: {
  //     text: "We're impressed."
  //   }
  // },
  // level 20
  {
    oscillator1: {
      detune: true,
      frequency: true,
      typeOsc: true
    },
    oscillator2: {
      typeOsc: true,
      frequency: true,
      volume: true
    },
    filter: {
      type: true,
      cutOffFreq: true
    },
    envelope: {
      attack: true,
      decay: true,
      sustain: true,
      release: true
    },
    envelope2: {
      attack: true,
      decay: true
    },
    lfo: {
      // amount: true,
      // frequency: true,
      // type: true
    },
    router: {
      lfo: true
    },
    levelData: {
      text: 'You must be a famous producer already.'
    }
  },
  // level 21
  {
    oscillator1: {
      detune: true,
      frequency: true,
      typeOsc: true
    },
    oscillator2: {
      typeOsc: true,
      frequency: true,
      volume: true
    },
    filter: {
      type: true,
      cutOffFreq: true
    },
    envelope: {
      attack: true,
      decay: true,
      sustain: true,
      release: true
    },
    envelope2: {
      attack: true,
      decay: true
    },
    lfo: {
      // amount: true,
      // frequency: true,
      // type: true
    },
    router: {
      lfo: true,
      envelope2: true
    },
    levelData: {
      text: 'Make your own preset in Make Music, share your link on twitter and get featured in game.'
    }
  },
  // level 21
  {
    oscillator1: {
      detune: true,
      frequency: true,
      typeOsc: true
    },
    oscillator2: {
      typeOsc: true,
      frequency: true,
      volume: true
    },
    filter: {
      type: true,
      cutOffFreq: true
    },
    envelope: {
      attack: true,
      decay: true,
      sustain: true,
      release: true
    },
    envelope2: {
      attack: true,
      decay: true
    },
    lfo: {
      amount: true,
      // frequency: true,
      // type: true
    },
    router: {
      lfo: true,
      envelope2: true
    },
    levelData: {
       text: 'You unlocked the LFO!'
    }
  },
  // level 21
  {
    oscillator1: {
      detune: true,
      frequency: true,
      typeOsc: true
    },
    oscillator2: {
      typeOsc: true,
      frequency: true,
      volume: true
    },
    filter: {
      type: true,
      cutOffFreq: true
    },
    envelope: {
      attack: true,
      decay: true,
      sustain: true,
      release: true
    },
    envelope2: {
      attack: true,
      decay: true
    },
    lfo: {
      amount: true,
      frequency: true,
      // type: true
    },
    router: {
      lfo: true,
      envelope2: true
    },
    levelData: {
      text: 'LFO stands for low frequency oscillator. It produces an output signal which can modulate other controls.'
    }
  },
  // level 21
  {
    oscillator1: {
      detune: true,
      frequency: true,
      typeOsc: true
    },
    oscillator2: {
      typeOsc: true,
      frequency: true,
      volume: true
    },
    filter: {
      type: true,
      cutOffFreq: true
    },
    envelope: {
      attack: true,
      decay: true,
      sustain: true,
      release: true
    },
    envelope2: {
      attack: true,
      decay: true
    },
    lfo: {
      amount: true,
      frequency: true,
      type: true
    },
    router: {
      lfo: true,
      envelope2: true
    },
    levelData: {
      text: 'Created by www.okbye.io, together with Tatsuya Takahashi.'
    }
  }
]
