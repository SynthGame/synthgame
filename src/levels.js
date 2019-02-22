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
      score: 9,
      text: "Use the white guidelines to recreate this sound in 60 seconds.",
      knobColor: "#e4e259",
      score: 9,
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
      score: 9,
      text: "The oscillator is the source of electronic sound. Use the knobs and dials to shape the outputted signal. ",
      knobColor: "#e4e259",
      score: 9,
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
      score: 9,
      text: "",
      knobColor: "#e4e259",
      score: 9,
      name: "Detune",
      parent: "OSC 1",
      number: 3,
      device: 'oscillator1',
      paramater: 'typeOsc',
    }
  },
  // // level 4
  // {
  //   oscillator1: {
  //   },
  //   oscillator2: {
  //     frequency: true,
  //   },
  //   filter: {},
  //   envelope: {},
  //   envelope2: {},
  //   lfo: {},
  //   router: {},
  //   levelData: {
  //     score: 9,
  //     text: "You unlocked the second oscillator!",
  //     knobColor: "#e4e259",
  //     score: 9,
  //     name: "Waveform",
  //     parent: "OSC 2",
  //     number: 4,
  //     device: 'oscillator2',
  //     paramater: 'frequency',
  //   }
  // },
  // // level 5
  // {
  //   oscillator1: {
  //   },
  //   oscillator2: {
  //     volume: true
  //   },
  //   filter: {},
  //   envelope: {},
  //   envelope2: {},
  //   lfo: {},
  //   router: {},
  //   levelData: {
  //     score: 9,
  //     number: 0,
  //     text:
  //       "Use detune on Osc 1 to detune the oscillators, resulting in a fatter sound.",
  //     knobColor: "#e4e259",
  //     score: 9,
  //     name: "Octave",
  //     parent: "OSC 2",
  //     number: 5,
  //     device: 'oscillator2',
  //     paramater: 'volume',
  //   }
  // },
  // // level 6
  // {
  //   oscillator1: {
  //   },
  //   oscillator2: {
  //     typeOsc: true
  //   },
  //   filter: {},
  //   envelope: {},
  //   envelope2: {},
  //   lfo: {},
  //   router: {},
  //   levelData: {
  //     score: 9,
  //     number: 0,
  //     text: "Use volume on Osc 2 to alter the mix between the oscillators.",
  //     knobColor: "#e4e259",
  //     name: "volume",
  //     parent: "OSC 2",
  //     number: 6,
  //     device: 'oscillator2',
  //     paramater: 'typeOsc',
  //   }
  // },
  // level 7
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
      score: 9,
      text: "",
      knobColor: "#e4e259",
      name: "waveform",
      parent: "Filter",
      number: 7,
      device: 'filter',
      paramater: 'cutOffFreq',
    }
  },
  //  level 8
  {
    oscillator1: {
    },
    oscillator2: {
    },
    filter: {
      type: true,
    },
    envelope: {},
    envelope2: {},
    lfo: {},
    router: {},
    levelData: {
      score: 9,
      text: "",
      knobColor: "#e4e259",
      score: 9,
      name: "Frequency",
      parent: "Filter",
      number: 8,
      device: 'filter',
      paramater: 'type',
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
      score: 9,
      text: "",
      knobColor: "#e4e259",
      score: 9,
      name: "Attack",
      parent: "Envelope",
      number: 9,
      device: 'envelope',
      paramater: 'attack',
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
      score: 9,
      text: "",
      knobColor: "#e4e259",
      score: 9,
      name: "Decay",
      parent: "Envelope",
      number: 10,
      device: 'envelope',
      paramater: 'decay',
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
      score: 9,
      text: "",
      knobColor: "#e4e259",
      score: 9,
      name: "Sustain",
      parent: "Envelope",
      number: 11,
      device: 'envelope',
      paramater: 'sustain',
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
      score: 9,
      name: "Release",
      parent: "Envelope",
      number: 12,
      device: 'envelope',
      paramater: 'release',
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
      },
      envelope2: {
        attack: true
      },
      lfo: {},
      router: {},
      levelData: {
        score: 9,
        text: "",
        knobColor: "#e4e259",
        score: 9,
        name: "Attack",
        parent: "Envelope",
        number: 9,
        device: 'envelope',
        paramater: 'attack',
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
      },
      envelope2: {
        decay: true
      },
      lfo: {},
      router: {},
      levelData: {
        score: 9,
        text: "",
        knobColor: "#e4e259",
        score: 9,
        name: "Decay",
        parent: "Envelope",
        number: 10,
        device: 'envelope',
        paramater: 'decay',
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
      },
      envelope2: {
        amount: true
      },
      lfo: {},
      router: {},
      levelData: {
        score: 9,
        text: "",
        knobColor: "#e4e259",
        score: 9,
        name: "Sustain",
        parent: "Envelope",
        number: 11,
        device: 'envelope',
        paramater: 'amount',
      }
    },
    //  level 12
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
      frequency: true
    },
    router: {},
    levelData: {
      score: 9,
      text: "",
      knobColor: "#e4e259",
      score: 9,
      name: "Waveform",
      parent: "LFO",
      number: 15,
      device: 'lfo',
      paramater: 'frequency',
    }
  },
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
      score: 9,
      text: "",
      knobColor: "#e4e259",
      score: 9,
      name: "Waveform",
      parent: "LFO",
      number: 15,
      device: 'lfo',
      paramater: 'amount',
    }
  },
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
      score: 9,
      text: "",
      knobColor: "#e4e259",
      score: 9,
      name: "Waveform",
      parent: "LFO",
      number: 15,
      device: 'lfo',
      paramater: 'type',
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
      score: 9,
      text: "",
      knobColor: "#e4e259",
      score: 9,
      name: "LFO",
      parent: "Router",
      number: 20,
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
        score: 9,
        text: "",
        knobColor: "#e4e259",
        score: 9,
        name: "Envelope 2",
        parent: "LFO",
        number: 21,
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