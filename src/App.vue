<template>
  <div id="app">
    <start-screen v-if="displayStartOverlay==true"
    @start="startPlayMode"
    @create="startCreateMode"/>
    <success-overlay v-if="displaySuccessOverlay==true"
    @next="startNextLevel"/>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import random from 'lodash/random'
import times from 'lodash/times'
import audio from '@/audio'
import SuccessOverlay from '@/components/SuccessOverlay'
import StartScreen from '@/components/StartScreen'
import { SYNTH_BPM } from '@/constants'
import levels from '@/levels'

export default {
  name: 'App',
  data () {
    return {
      displaySuccessOverlay: false,
      displayStartOverlay: true,
      loop: null
    }
  },
  components: {
    SuccessOverlay,
    StartScreen
  },
  created () {
    this.init()

    // Pc keyboard listener (might be needed for mobile)
    document.addEventListener('keypress', (event) => {
      if (audio.state.Tone.context.state !== 'running') {
        audio.state.Tone.context.resume()
      }
      // const key = event.key
    })
  },
  computed: {
    ...mapState({
      sequencesPassedInCurrentLevel: state => state.gameState.sequencesPassedInCurrentLevel,
      level: state => state.gameState.level,
    }),
    ...mapGetters({
      allParametersMatchGoal: 'allParametersMatchGoal',
    })
  },
  methods: {
    init () {
      // initialize the synth
      audio.init().toMaster()
      // create loop wich sequences 4 notes
      const randomLoop = times(16).map(i => random(-12, 12))
      this.loop = audio.setMainLoop({
        noteArray: times(16),
        subdivision: '8n'
      }, (time, i) => { // i here is just a note from the note array define above
        if (this.displaySuccessOverlay) audio.playKick()
        audio.playNote(randomLoop[i], {})

        if (i === 15) this.$store.commit('increaseSequencesPassedInCurrentLevel')
      })
      // set BPM
      audio.setBpm(SYNTH_BPM)
      // start tone general
      audio.start()
      // start loop
      //
    },
    displaySuccesMessage () {
      this.displaySuccessOverlay = true
    },
    startPlayMode(){
      this.displayStartOverlay = false // hide start overlay
      this.startLevel(0)
    },
    startCreateMode(){
      this.displayStartOverlay = false
      this.$store.commit('setCreateMode', true)
    },
    startLevel(level) {
      // disable all overlays
      this.displaySuccessOverlay = false
      this.displayStartOverlay = false
      // import level config
      const availableParameters = levels[level]

      this.$store.dispatch('startNewLevel', {
        knobsAvailable: availableParameters,
        levelNumber: level || 0
      })
      this.$store.dispatch('randomizGoalParameters') // first randomize the goal
      this.$store.dispatch('setSynthToGoal', audio) // then let the user hear it
      // randomize loop melody
      times(4).forEach(i => {
        this.loop.at(i, random(-12, 12));
      })
      this.loop.start()
      // rest will be done by watcher of sequencesPassedInCurrentLevel
    },
    startNextLevel(level) {
      this.$store.commit('increaseLevelValue', 1)
      this.startLevel(this.level) // TODO: should be + 1
    }
  },
  watch: {
    allParametersMatchGoal (val) {
      if(val === true) {
        this.displaySuccesMessage()
        this.$store.dispatch('levelDone') // would be nice to pass timeleft here but it is being passed by timer on gamestop
      }
    },
    sequencesPassedInCurrentLevel (val) {
      if(val === 2) {
        this.init()
        this.$store.commit('startTimerIsRunning')
        this.$store.dispatch('setSynthToAudioParameters', audio)
      }
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
