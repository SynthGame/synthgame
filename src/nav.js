export default {
  title: "Bart's song",
  active: {
    title: 'frequency',
    knobName: 'octave',
    author: 'Lawson',
    score: 1
  },
  groups: [
    {
      title: "Osc 1",
      moduleName: "oscillator1",
      icon: 'osc',
      items: [
        {
          title: 'frequency',
          knobName: 'octave',
          author: 'Lawson',
          score: 1
        },
        {
          title: 'detune',
          knobName: 'detune',
          author: 'Lawson',
          score: 0
        },
        {
          title: 'typeOsc',
          knobName: 'shape',
          author: 'Bart',
          score: 0
        }
      ]
    },
    {
      moduleName: "oscillator2",
      title: "Osc 2",
      icon: 'osc',
      items: [
        {
          title: 'frequency',
          knobName: 'octave',
          author: '',
          score: 0
        },
        {
          title: 'volume',
          knobName: 'volume',
          author: 'Lauren',
          score: 0
        },
        {
          title: 'typeOsc',
          knobName: 'shape',
          author: 'Daniel',
          score: 0
        }
      ]
    },
    {
      moduleName: "filter",
      title: "Filter",
      icon: 'filter',
      items: [
        {
          title: 'cutOffFreq',
          knobName: 'Frequency',
          author: 'Momcilo',
          score: 0
        },
        {
          title: 'type',
          knobName: 'shape',
          author: 'Basti',
          score: 0
        },
      ]
    },
    {
      moduleName: "envelope",
      title: "Envelope",
      icon: "envelope",
      items: [
        {
          title: 'attack',
          knobName: 'attack',
          author: '',
          score: 0
        },
        {
          title: 'decay',
          knobName: 'decay',
          author: '',
          score: 0
        },
        {
          title: 'sustain',
          knobName: 'sustain',
          author: '',
          score: 0
        },
        {
          title: 'release',
          knobName: 'release',
          author: '',
          score: 0
        }
      ]
    },
    {
      moduleName: "envelope2",
      title: "Envelope 2",
      icon: 'envelope2',
      items: [
        {
          title: 'attack',
          knobName: 'attack',
          author: '',
          score: 0
        },
        {
          title: 'decay',
          knobName: 'decay',
          author: '',
          score: 0
        },
        {
          title: 'amount',
          knobName: 'amount',
          author: '',
          score: 0
        }
      ]
    },
    {
      moduleName: "lfo",
      title: "LFO",
      icon: 'lfo',
      items: [
        {
          title: 'frequency',
          knobName: 'frequency',
          author: '',
          score: 0
        },
        {
          title: 'amount',
          knobName: 'amount',
          author: '',
          score: 0
        },
        {
          title: 'type',
          knobName: 'type',
          author: '',
          score: 0
        }
      ]
    },
    {
      moduleName: "router",
      title: "Router",
      icon: 'router',
      items: [
        {
          title: 'lfo',
          knobName: 'lfo',
          author: '',
          score: 0
        },
        {
          title: 'envelope2',
          knobName: 'envelope2',
          author: '',
          score: 0
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
