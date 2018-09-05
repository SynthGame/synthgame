<template>
  <div id="app">
    <success-overlay v-if="isOverlayed==true" @next="(isOverlayed=false, $store.commit('startGame'))"/>
    <start-screen v-if="isStartgame==true" @next="(isStartgame=false, $store.commit('startGame'))"/>

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
    audio.goalMirrorInstance.init().connect(masterBus, 0, 1)
    // create loop wich sequences 4 notes
    const loop = audio.setMainLoop({
      noteArray: times(4).map(i => random(-12, 12)),
      subdivision: '4n'
    }, (time, note) => {
      audio.playNote(note)
      audio.goalMirrorInstance.playNote(note)
      // audio.playNote(Math.round(12 * Math.random())) // let's have some fun
    })
    // set BPM
    audio.setBpm(SYNTH_BPM)
    audio.goalMirrorInstance.setBpm(SYNTH_BPM)
    // start tone general
    audio.start()
    audio.goalMirrorInstance.start()
    // start loop
    loop.start()
    // set goal synth to goal
    this.$store.dispatch('setSynthToGoal', audio.goalMirrorInstance)

    window.randomizeGoal = () => {
      this.$store.dispatch('randomizGoalParameters')
        .then(() => this.$store.dispatch('setSynthToGoal', audio.goalMirrorInstance))
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
        audio.state.loop.at(i, random(-12, 12))
      });
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

.module {
  background: black;
  max-height: 50%;
  margin: 0;
  padding: 1.5% 2%;
  display: flex;
  max-width: fit-content;
  justify-content: space-between;
  flex-flow: column wrap;
  position: relative;
  .button-wrapper {
      display: flex;
      width: 40%;
      margin: 0 auto;
      flex-wrap: wrap;
      justify-content: center;
      button {
        width: 1em;
        height: 1em;
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
    background: rgba(255,255,255,0.1);
    width: .5em;
    height: .5em;
    border-radius: 100%;
    top: 4%;
    left: 4%;
  }
  &:after {
    content:'';
    display: block;
    position: absolute;
    background: rgba(255,255,255,0.1);
    width: .5em;
    height: .5em;
    border-radius: 100%;
    top: 4%;
    right: 4%;
  }
  & .display {
    // margin: 10% 2%;
    height: 5em;
    width: 10em;
    & path {
      transition: .1s all ease-out;
    }
    &:before {
      content:'';
      display: block;
      position: absolute;
      background: rgba(255,255,255,0.1);
      width: .5em;
      height: .5em;
      border-radius: 100%;
      bottom: 4%;
      left: 4%;
    }
    &:after {
      content:'';
      display: block;
      position: absolute;
      background: rgba(255,255,255,0.1);
      width: .5em;
      height: .5em;
      border-radius: 100%;
      bottom: 4%;
      right: 4%;
    }
  }
  & .knobs {
    width: 90%;
    height: 60%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

.level {
  display: flex;
  position: relative;
  background: #101010;
  justify-content: flex-start;
  flex-wrap: wrap;
  width:100%;
  height:92vh;
  background-image: url("/src/assets/bg.svg");
  background-size: cover;
}

body {
  background: black;
  margin: 0;
}

#app {
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
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
