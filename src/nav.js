export default {
    title: "Bart's song",
    active: {
      title: "Detune",
      author: "Lawson"
    },
    groups: [
      {
        title: "Osc 1",
        moduleName: "oscillator1",
        items: [
          {
            title: 'frequency',
            knobName: 'octave',
            author: 'Lawson'
          },
          {
            title: 'detune',
            knobName: 'detune',
            author: 'Lawson'
          },
          {
            title: 'typeOsc',
            knobName: 'shape',
            author: 'Bart'
          }
        ]
      },
      {
        moduleName: "oscillator2",
        title: "Osc 2",
        items: [
          {
            title: 'frequency',
            knobName: 'octave',
            author: ''
          },
          {
            title: 'volume',
            knobName: 'volume',
            author: 'Lauren'
          },
          {
            title: 'typeOsc',
            knobName: 'shape',
            author: 'Daniel'
          }
        ]
      },
      {
        moduleName: "filter",
        title: "Filter",
        items: [
          {
            title: 'cutOffFreq',
            knobName: 'Frequency',
            author: 'Momcilo'
          },
          {
            title: 'type',
            knobName: 'shape',
            author: 'Basti'
          },
        ]
      },
      {
        moduleName: "envelope",
        title: "Envelope",
        items: [
          {
            title: 'attack',
            knobName: 'attack',
            author: ''
          },
          {
            title: 'decay',
            knobName: 'decay',
            author: ''
          },
          {
            title: 'sustain',
            knobName: 'sustain',
            author: ''
          },
          {
            title: 'release',
            knobName: 'release',
            author: ''
          }
        ]
      },
      {
        moduleName: "envelope2",
        title: "Envelope 2",
        items: [
          {
            title: 'attack',
            knobName: 'attack',
            author: ''
          },
          {
            title: 'decay',
            knobName: 'decay',
            author: ''
          },
          {
            title: 'amount',
            knobName: 'amount',
            author: ''
          }
        ]
      },
      {
        moduleName: "lfo",
        title: "LFO",
        items: [
          {
            title: 'frequency',
            knobName: 'frequency',
            author: ''
          },
          {
            title: 'amount',
            knobName: 'amount',
            author: ''
          },
          {
            title: 'type',
            knobName: 'type',
            author: ''
          }
        ]
      },
      {
        moduleName: "router",
        title: "Router",
        items: [
          {
            title: 'lfo',
            knobName: 'lfo',
            author: ''
          },
          {
            title: 'envelope2',
            knobName: 'envelope2',
            author: ''
          }
        ]
      }
    ],

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
      amount: true
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
      text:
        "Congratulations! You're an electronic music producer. Make the music for one of the levels, or keep playing the game and break the highscore: level 135."
    }
  }