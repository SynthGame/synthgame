<template>
  <div id="app">
    <start-screen v-if="isStartgame==true"
    @start="start"/>
    <success-overlay v-if="isOverlayed==true"
    @next="next"/>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
import random from 'lodash/random'
import times from 'lodash/times'
import audio from '@/audio'
import SuccessOverlay from '@/components/SuccessOverlay'
import StartScreen from '@/components/StartScreen'
import { SYNTH_BPM } from '@/constants'

export default {
  name: 'App',
  data () {
    return {
      isOverlayed: false,
      isStartgame: true
    }
  },
  components: {
    SuccessOverlay,
    StartScreen
  },
  created () {
    this.$store.dispatch('setLevel', {
      levelNumber: 1,
      knobsAvailable: {
        oscillator: {
          frequency: false,
          typeOsc: true,
          detune: false
          // phase: 0
        },
        filter: {
          cutOffFreq: false,
          type: true,
          setQ: false,
          // gain: 50
        },
        envelope: {
          attack: false,
          decay: true,
          sustain: false,
          release: false
        },
        lfo: {
          frequency: false,
          type: true,
          amount: false
        },
        delay: {
          delayTime: false,
          feedback: false,
          wet: true
        },
        reverb: {
          roomSize: false,
          wet: true
        }
      }
    })
    const masterBus = new audio.state.Tone.CrossFade(0.5)
    masterBus.toMaster()
    // initialize the synth
    audio.init().connect(masterBus, 0, 0)
    // audio.goalMirrorInstance.init().connect(masterBus, 0, 1)
    // create loop wich sequences 4 notes
    const loop = audio.setMainLoop({
      noteArray: times(4).map(i => random(-12, 12)),
      subdivision: '4n'
    }, (time, note) => {
      if (this.isOverlayed) {audio.playKick()};
      audio.playNote(note)
      // audio.goalMirrorInstance.playNote(note)
      // audio.playNote(Math.round(12 * Math.random())) // let's have some fun
    })
    // set BPM
    audio.setBpm(SYNTH_BPM)
    // audio.goalMirrorInstance.setBpm(SYNTH_BPM)
    // start tone general
    audio.start()
    // audio.goalMirrorInstance.start()
    // start loop
    loop.start()
    // set goal synth to goal
    // this.$store.dispatch('setSynthToGoal', audio.goalMirrorInstance)

    window.randomizeGoal = () => {
      this.$store.dispatch('randomizGoalParameters')
        .then() //() => this.$store.dispatch('setSynthToGoal', audio.goalMirrorInstance))
    }
    window.randomizeParams = () => {
      this.$store.dispatch('randomizeAudioParameters')
        .then(() => console.log('success'))
    }

    // Pc keyboard listener (might be needed for mobile)
    document.addEventListener('keypress', (event) => {
      if (audio.state.Tone.context.state !== 'running') {
        audio.state.Tone.context.resume()
      }
      // const key = event.key
    })
  },
  computed: {
    allParametersMatchGoal () {
      return this.$store.getters.allParametersMatchGoal
    }
  },
  methods: {
    displaySuccesMessage () {
      this.isOverlayed = true
      this.$store.commit('stopGame')
      this.$store.dispatch('randomizGoalParameters', {
      oscillator: {
        frequency: false,
        typeOsc: true,
        detune: false
        // phase: 0
      },
      filter: {
        cutOffFreq: false,
        type: true,
        setQ: false,
        // gain: 50
      },
      envelope: {
        attack: false,
        decay: true,
        sustain: false,
        release: false
      },
      lfo: {
        frequency: false,
        type: true,
        amount: false
      },
      delay: {
        delayTime: false,
        feedback: false,
        wet: true
      },
      reverb: {
        roomSize: false,
        wet: true
      }
    })
      times(4).forEach(i => {
        audio.state.loop.at(i, random(-12, 12));
      });
    },
    start(){
      this.isStartgame=false
      this.$store.commit('startGame')
    },
    next() {
      this.isOverlayed=false
      this.$store.commit('startGame')
    }
  },
  watch: {
    allParametersMatchGoal (val) {
      if(val) this.displaySuccesMessage()
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,900');

.tabs {
  display: none;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 10vh;
  align-items: center;
  &__tab {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16.66%;
    border: .5px solid white;
    cursor: pointer;
    &:hover {
      background: white;
      color: black;
    }
  }
}


.level {
  // display: grid;
  display: block;
  // grid-auto-flow: column;
  // justify-content: start;
  // grid-auto-flow: dense;
  // grid-template-columns: repeat(6, 1fr);
  // grid-template-rows: repeat(5, 1fr);
  position: relative;
  background: #101010;
  background-image: url(./assets/bg.svg);
  background-size: stretch;
  width:100vw;
  min-height:92vh;
}

.empty {
  display: inline-block;
  height: calc(0.6*92vh);
  width: 16.67em;
  &:nth-of-type(1) {
    height: calc(0.2*92vh);
  }
  &:nth-of-type(2) {
    height: calc(0.4*92vh);
  }
}

.module {
  background: black;
  min-height: calc(0.4*92vh);
  width: 16.67em;
  margin: 0;
  // padding: 1.5% 2%;
  display: block;
  position: relative;
  &.empty {
    background: none;
    &::after {
      background: none;
    }
    &::before {
      background: none;
    }
  }
  &.sequencer {
    // width: 1;
    // position: absolute;
    height: calc(92vh);
    // bottom: 0;
    // right: 0;
  }
  .button-wrapper {
      display: flex;
      padding: 1em;
      width: 45%;
      height: 18.4vh;
      margin: 0 auto;
      flex-wrap: wrap;
      justify-content: center;
      button {
        width:2.5em;
        height: 2.5em;
      }
      svg{
        height: .4em;
      }
    & p {
       margin: .5em 0 0 0;
       font-size: .7em;
       width: 100%;
       text-transform: uppercase;
       letter-spacing: 1px;
    }
  }
  &:before {
    content:'';
    display: block;
    position: absolute;
    background: #fff;
    width: .4em;
    height: .4em;
    border-radius: 100%;
    top: .4em;
    left: .55em;
  }
  &:after {
    content:'';
    display: block;
    position: absolute;
    background: #fff;
    width: .4em;
    height: .4em;
    border-radius: 100%;
    top: .4em;
    right: .55em;
  }
  & .display {
    // margin: 2% 2%;
    height: 18.4vh;
    width: 100%;
    & path {
      transition: .1s all ease-out;
    }
    &:before {
      content:'';
      display: block;
      position: absolute;
      background: #fff;
      width: .4em;
      height: .4em;
      border-radius: 100%;
      bottom: .8em;
      left: .55em;
    }
    &:after {
      content:'';
      display: block;
      position: absolute;
      background: #fff;
      width: .4em;
      height: .4em;
      border-radius: 100%;
      bottom: .8em;
      right: .55em;
    }
  }
  & .knobs {
    width: 16.66vw;
    min-height: 18.4vh;
    margin: auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }
}

body {
  background: black;
  margin: 0;
}

#app {
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  font-size: 1vw;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

* {
  box-sizing: border-box;
}

@keyframes blink {
    from {opacity: 0}
    to {opacity: 1}
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@media only screen and (max-width: 1000px) {
    .tabs {
      display: flex;
    }
    .module {
      width: 100vw;
      height: 90vh;
      position: absolute;
      opacity: 0;
    }
    .module.active {
      left: 0;
      opacity: 1;
      z-index: 1;
    }
}
</style>
