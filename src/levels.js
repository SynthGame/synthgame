const levels = [
  // level 1
  {
    oscillator1: {
      frequency: true,
    },
    oscillator2: {},
    filter: {},
    envelope: {},
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      score: 0,
      text: "Use the white guidelines to recreate this sound in 60 seconds.",
      knobColor: "#e4e259",
      score: 0,
      name: "Waveform",
      parent: "OSC 1",
      number: 1,
      device: 'oscillator1',
      paramater: 'frequency',
    }
  },
  // level 2
  {
    oscillator1: {
      detune: true
    },
    oscillator2: {},
    filter: {},
    envelope: {},
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      score: 0,
      text: "The oscillator is the source of electronic sound. Use the knobs and dials to shape the outputted signal. ",
      knobColor: "#e4e259",
      score: 0,
      name: "Octave",
      parent: "OSC 1",
      number: 2,
      device: 'oscillator1',
      paramater: 'detune',
    }
  },
  // level 3
  {
    oscillator1: {
      typeOsc: true
    },
    oscillator2: {},
    filter: {},
    envelope: {},
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      score: 0,
      text: "Both detune and octave control the pitch.",
      knobColor: "#e4e259",
      score: 0,
      name: "Detune",
      parent: "OSC 1",
      number: 3,
      device: 'oscillator1',
      paramater: 'typeOsc',
    }
  },
  // level 4
  {
    oscillator1: {
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
      score: 0,
      text: "You unlocked the second oscillator!",
      knobColor: "#e4e259",
      score: 0,
      name: "Waveform",
      parent: "OSC 2",
      number: 4,
      device: 'oscillator2',
      paramater: 'typeOsc',
    }
  },
  // level 5
  {
    oscillator1: {
    },
    oscillator2: {
      frequency: true
    },
    filter: {},
    envelope: {},
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      score: 0,
      number: 0,
      text:
        "Use detune on Osc 1 to detune the oscillators, resulting in a fatter sound.",
      knobColor: "#e4e259",
      score: 0,
      name: "Octave",
      parent: "OSC 2",
      number: 5,
      device: 'oscillator2',
      paramater: 'frequency',
    }
  },
  // level 6
  {
    oscillator1: {
    },
    oscillator2: {
      volume: true
    },
    filter: {},
    envelope: {},
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      score: 0,
      number: 0,

      text: "Use volume on Osc 2 to alter the mix between the oscillators.",
      knobColor: "#e4e259",
      score: 0,
      name: "volume",
      parent: "OSC 2",
      number: 6,
      device: 'oscillator2',
      paramater: 'frequency',
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
      score: 0,
      number: 0,

      text: "You unlocked the filter!"
    }
  },
  //  level 8
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
      score: 0,
      number: 0,

      text:
        "The cutoff frequency control sets the range of the sound passed through the filter."
    }
  },
  //  level 9
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
      score: 0,
      number: 0,

      text: "You unlocked the Amplifier Envelope!"
    }
  },
  //  level 10
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
      score: 0,
      number: 0,

      text: "Every time a note is played, the envelope is triggered."
    }
  },
  //  level 11
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
      score: 0,
      number: 0,

      text:
        "Use attack, decay, sustain and release to decide on the volume of the note over time."
    }
  },
  //  level 12
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
      score: 0,
      number: 0,

      text: "Hint: set attack and decay to low levels for snappy sounds."
    }
  },
  // level 13
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
    lfo: {
      amount: true
    },
    router: {},
    levelData: {
      score: 0,
      number: 0,

      text: 'You unlocked the LFO!'
    }
  },
  // level 14
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
    lfo: {
      amount: true,
      frequency: true
    },
    router: {},
    levelData: {
      score: 0,
      number: 0,

      text: 'LFO stands for low frequency oscillator. It produces an output signal which can modulate other controls.'
    }
  },
  // level 15
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
    lfo: {
      amount: true,
      frequency: true,
      type: true
    },
    router: {},
    levelData: {
      score: 0,
      number: 0,

      text: "Low frequency oscillators can bring life to otherwise static sounds."
    }
  },
  //  level 16
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
      score: 0,
      number: 0,

      text: "You unlocked the Modulation Envelope!"
    }
  },
  //  level 17
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
    router: {},
    levelData: {
      score: 0,
      number: 0,

      text: "We use modulation envelope to modulate another synth control."
    }
  },
  //  level 18
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
      sustain: true
    },
    lfo: {
      amount: true,
      frequency: true,
      type: true
    },
    router: {},
    levelData: {
      score: 0,
      number: 0,

      text: 'With both an lfo and an mod envelope the world is your oyster.'
    }
  },
  //  level 19
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
      release: true
    },
    lfo: {
      amount: true,
      frequency: true,
      type: true
    },
    router: {},
    levelData: {
      score: 0,
      number: 0,

      text: "We're impressed."
    }
  },
  //  level 20
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
      score: 0,
      text: "You must be a famous producer already."
    }
  },
  //  level 21
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
  //     decay: true
  //   },
  //   lfo: {
  //     // amount: true,
  //     // frequency: true,
  //     // type: true
  //   },
  //   router: {
  //     lfo: true,
  //     envelope2: true
  //   },
  //   levelData: {  


  //     text: "The router routes the LFO and MOD ENV to different controls."
  //   }
  // },
  //  level 21
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
  //     decay: true
  //   },
  //   lfo: {
  //     amount: true
  //     // frequency: true,
  //     // type: true
  //   },
  //   router: {
  //     lfo: true,
  //     envelope2: true
  //   },
  //   levelData: {  

  //     text: "You unlocked the LFO!"
  //   }
  // },
  //  level 21 
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
  //     decay: true
  //   },
  //   lfo: {
  //     amount: true,
  //     // frequency: true,
  //     type: true
  //   },
  //   router: {
  //     lfo: true,
  //     envelope2: true
  //   },
  //   levelData: {  
  //     text:
  //       "LFO stands for low frequency oscillator. It produces an output signal which can modulate other controls."
  //   }
  // },
  //  level 21 
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
  //     decay: true
  //   },
  //   lfo: {
  //     amount: true,
  //     frequency: true,
  //     type: true
  //   },
  //   router: {
  //     lfo: true,
  //     envelope2: true
  //   },
  //   levelData: {  

  //     text:
  //       "Congratulations! You're an electronic music producer. Make the music for one of the levels, or keep playing the game and break the highscore: level 135."
  //   }
  // }
];

export default levels;