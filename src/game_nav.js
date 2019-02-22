
export default {
  title: "Bart's song",
  active: {
    title: "frequency",
    knobName: "octave",
    author: "Lawson",
    score: 0
  },
  groups: [
    {
      title: "Osc 1",
      moduleName: "oscillator1",
      icon: "osc",
      items: [
        {
          title: "frequency",
          knobName: "octave",
          author: "Lawson",
          score: 0
        },
        {
          title: "detune",
          knobName: "detune",
          author: "Lawson",
          score: 1
        },
        {
          title: "typeOsc",
          knobName: "shape",
          author: "Bart",
          score: 2
        }
      ]
    },
    {
      moduleName: "filter",
      title: "Filter",
      icon: "filter",
      items: [
        {
          title: "cutOffFreq",
          knobName: "Frequency",
          author: "Momcilo",
          score: 6
        },
        {
          title: "type",
          knobName: "shape",
          author: "Basti",
          score: 7
        }
      ]
    },
    {
      moduleName: "envelope",
      title: "AMP Env",
      icon: "envelope",
      items: [
        {
          title: "attack",
          knobName: "attack",
          author: "",
          score: 8
        },
        {
          title: "decay",
          knobName: "decay",
          author: "",
          score: 9
        },
        {
          title: "sustain",
          knobName: "sustain",
          author: "",
          score: 10
        },
        {
          title: "release",
          knobName: "release",
          author: "",
          score: 11
        }
      ]
    },
    {
      moduleName: "envelope2",
      title: "MOD ENV",
      icon: "envelope2",
      items: [
        {
          title: "attack",
          knobName: "attack",
          author: "",
          score: 12
        },
        {
          title: "decay",
          knobName: "decay",
          author: "",
          score: 13
        },
        {
          title: "amount",
          knobName: "amount",
          author: "",
          score: 13
        }
      ]
    },
    {
      moduleName: "lfo",
      title: "LFO",
      icon: "lfo",
      items: [
        {
          title: "Speed",
          knobName: "Speed",
          author: "",
          score: 15
        },
        {
          title: "frequency",
          knobName: "frequency",
          author: "",
          score: 16
        },
        {
          title: "type",
          knobName: "type",
          author: "",
          score: 17
        }
      ]
    },
    {
      moduleName: "router",
      title: "Router",
      icon: "router",
      items: [
        {
          title: "lfo",
          knobName: "lfo",
          author: "",
          score: 18
        },
        {
          title: "envelope2",
          knobName: "envelope2",
          author: "",
          score: 19
        }
      ]
    },
    {
      moduleName: "sequencer",
      title: "Sequencer",
      icon: "sequencer",
      items: [
        {
          title: "steps",
          knobName: "steps",
          author: "",
          score: 20
        },
        {
          title: "pitch",
          knobName: "pitch",
          author: "",
          score: 21
        },
        {
          title: "glide",
          knobName: "glide",
          author: "",
          score: 22
        },
        {
          title: "accent",
          knobName: "accent",
          author: "",
          score: 23
        },
        {
          title: "kick",
          knobName: "kick",
          author: "",
          score: 24
        },
        {
          title: "hat",
          knobName: "hat",
          author: "",
          score: 24
        },
        {
          title: "snare",
          knobName: "snare",
          author: "",
          score: 25
        },
        {
          title: "clap1",
          knobName: "clap1",
          author: "",
          score: 26
        },
        {
          title: "clap2",
          knobName: "clap2",
          author: "",
          score: 27
        },
        {
          title: "cymbal",
          knobName: "cymbal",
          author: "",
          score: 28
        },
        {
          title: "labmyc",
          knobName: "labmyc",
          author: "",
          score: 29
        },
        {
          title: "noise",
          knobName: "noise",
          author: "",
          score: 30
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
};
