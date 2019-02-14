import store from './store';


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
          score: 0
        },
        {
          title: 'detune',
          knobName: 'detune',
          author: 'Lawson',
          score: 1
        },
        {
          title: 'typeOsc',
          knobName: 'shape',
          author: 'Bart',
          score: 2
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
          score: 3
        },
        {
          title: 'volume',
          knobName: 'volume',
          author: 'Lauren',
          score: 4
        },
        {
          title: 'typeOsc',
          knobName: 'shape',
          author: 'Daniel',
          score: 5,
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
          score: 6
        },
        {
          title: 'type',
          knobName: 'shape',
          author: 'Basti',
          score: 7
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
          score: 8
        },
        {
          title: 'decay',
          knobName: 'decay',
          author: '',
          score: 9
        },
        {
          title: 'sustain',
          knobName: 'sustain',
          author: '',
          score: 10
        },
        {
          title: 'release',
          knobName: 'release',
          author: '',
          score: 11
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
          score: 12
        },
        {
          title: 'decay',
          knobName: 'decay',
          author: '',
          score: 13
        },
        {
          title: 'amount',
          knobName: 'amount',
          author: '',
          score: 14
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
          score: 15
        },
        {
          title: 'amount',
          knobName: 'amount',
          author: '',
          score: 16
        },
        {
          title: 'type',
          knobName: 'type',
          author: '',
          score: 17
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
          score: 18
        },
        {
          title: 'envelope2',
          knobName: 'envelope2',
          author: '',
          score: 19
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
