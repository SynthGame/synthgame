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
      text: "",
      knobColor: "#e4e259",
      score: 0,
      name: "Detune",
      parent: "OSC 1",
      number: 3,
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
      name: "volume",
      parent: "OSC 2",
      number: 6,
    }
  },
  // level 7
  {
    oscillator1: {
    },
    oscillator2: {
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
      text: "",
      knobColor: "#e4e259",
      name: "waveform",
      parent: "Filter",
      number: 7,
    }
  },
  //  level 8
  {
    oscillator1: {
    },
    oscillator2: {
    },
    filter: {
      cutOffFreq: true
    },
    envelope: {},
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      score: 0,
      text: "",
      knobColor: "#e4e259",
      score: 0,
      name: "Frequency",
      parent: "Filter",
      number: 8,
    }
  },
  //  level 9
  {
    oscillator1: {
    },
    oscillator2: {
    },
    filter: {
    },
    envelope: {
      attack: true
    },
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      score: 0,
      text: "",
      knobColor: "#e4e259",
      score: 0,
      name: "Attack",
      parent: "Envelope",
      number: 9,
    }
  },
  //  level 10
  {
    oscillator1: {
    },
    oscillator2: {
    },
    filter: {
    },
    envelope: {
      decay: true
    },
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      score: 0,
      text: "",
      knobColor: "#e4e259",
      score: 0,
      name: "Decay",
      parent: "Envelope",
      number: 10,
    }
  },
  //  level 11
  {
    oscillator1: {
    },
    oscillator2: {
    },
    filter: {
    },
    envelope: {
      sustain: true
    },
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      score: 0,
      text: "",
      knobColor: "#e4e259",
      score: 0,
      name: "Sustain",
      parent: "Envelope",
      number: 11,
    }
  },
  //  level 12
  {
    oscillator1: {
    },
    oscillator2: {
    },
    filter: {
    },
    envelope: {
      release: true
    },
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      text: "",
      knobColor: "#e4e259",
      score: 0,
      name: "Release",
      parent: "Envelope",
      number: 12
    }
  },
  // level 13
  {
    oscillator1: {
    },
    oscillator2: {
    },
    filter: {
    },
    envelope: {
    },
    envelope2: {},
    lfo: {
      amount: true
    },
    router: {},
    levelData: {
      score: 0,
      text: "",
      knobColor: "#e4e259",
      name: "Amount",
      parent: "LFO",
      number: 13,
    }
  },
  // level 14
  {
    oscillator1: {
    },
    oscillator2: {
    },
    filter: {
    },
    envelope: {
    },
    envelope2: {},
    lfo: {
      frequency: true
    },
    router: {},
    levelData: {
      score: 0,
      text: "",
      knobColor: "#e4e259",
      score: 0,
      name: "Frequency",
      parent: "LFO",
      number: 14,
    }
  },
  // level 15
  {
    oscillator1: {
    },
    oscillator2: {
    },
    filter: {

    },
    envelope: {
    },
    envelope2: {},
    lfo: {
      type: true
    },
    router: {},
    levelData: {
      score: 0,
      text: "",
      knobColor: "#e4e259",
      score: 0,
      name: "Detune",
      parent: "OSC 1",
      number: 3,
    }
  },
  //  level 16
  {
    oscillator1: {
    },
    oscillator2: {
    },
    filter: {
    },
    envelope: {
    },
    envelope2: {
      attack: true,
    },
    lfo: {
    },
    router: {},
    levelData: {
      score: 0,
      text: "",
      knobColor: "#e4e259",
      score: 0,
      name: "Detune",
      parent: "OSC 1",
      number: 3,
    }
  },
  //  level 17
  {
    oscillator1: {
    },
    oscillator2: {
    },
    filter: {
    },
    envelope: {
    },
    envelope2: {
      decay: true
    },
    lfo: {
    },
    router: {},
    levelData: {
      score: 0,
      text: "",
      knobColor: "#e4e259",
      score: 0,
      name: "Detune",
      parent: "OSC 1",
      number: 3,
    }
  },
  //  level 18
  {
    oscillator1: {
    },
    oscillator2: {
    },
    filter: {
    },
    envelope: {
    },
    envelope2: {
      sustain: true
    },
    lfo: {
    },
    router: {},
    levelData: {
      score: 0,
      text: "",
      knobColor: "#e4e259",
      score: 0,
      name: "Detune",
      parent: "OSC 1",
      number: 3,
    }
  },
  //  level 19
  {
    oscillator1: {
    },
    oscillator2: {
    },
    filter: {
    },
    envelope: {
      release: true
    },
    envelope2: {
      release: true
    },
    lfo: {
    },
    router: {},
    levelData: {
      score: 0,
      text: "",
      knobColor: "#e4e259",
      score: 0,
      name: "Detune",
      parent: "OSC 1",
      number: 3,
    }
  },
  //  level 20
  {
    oscillator1: {
    },
    oscillator2: {
    },
    filter: {
    },
    envelope: {
    },
    envelope2: {
    },
    lfo: {
    },
    router: {
      lfo: true
    },
    levelData: {
      score: 0,
      text: "",
      knobColor: "#e4e259",
      score: 0,
      name: "Detune",
      parent: "OSC 1",
      number: 3,
    }
  },
    //  level 21
    {
      oscillator1: {
      },
      oscillator2: {
      },
      filter: {
      },
      envelope: {
      },
      envelope2: {
      },
      lfo: {
      },
      router: {
        envelope2: true
      },
      levelData: {
        score: 0,
        text: "",
        knobColor: "#e4e259",
        score: 0,
        name: "Detune",
        parent: "OSC 1",
        number: 3,
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