<template>
  <div id="app">
    <transition name="slideout">
      <start-screen
        v-if="displayStartOverlay"
        @startPreview="startPlayMode"
        @create="startCreateMode"
      />
    </transition>
    <transition name="slidein">
    <preview-screen
      v-if="displayPreviewOverlay"
      @startLevel="beginSvoosh"
    />
    </transition>
    <svoosh
      v-if="isThereSvooshComponent"
      :isFired="svooshIt"
      @midway="endPreview"
      @bye="endSvoosh"
      black
    />
    <svoosh
      v-if="isThereSuccessSvooshComponent"
      :isFired="successSvooshIt"
      @midway="displaySuccessOverlay=true"
      @bye="endSuccessSvoosh"
    />
    <transition name="slideout">
    <success-overlay
      v-if="displaySuccessOverlay"
      @next="startNextLevel"
    />
    </transition>

    <failure-overlay
      v-if="isGameOver"
      @startagain="startAgain"
    />

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
import FailureOverlay from '@/components/FailureOverlay'
import StartScreen from '@/components/StartScreen'
import PreviewScreen from '@/components/PreviewScreen'
import Svoosh from '@/components/Svoosh'
import { SYNTH_BPM } from '@/constants'
import levels from '@/levels'

export default {
  name: 'App',
  data () {
    return {
      displaySuccessOverlay: false,
      displayFailureOverlay: false,
      displayStartOverlay: true,
      displayPreviewOverlay: false,
      loop: null,
      isThereSvooshComponent: false,
      svooshIt: false,
      isThereSuccessSvooshComponent: false,
      successSvooshIt: false
    }
  },
  components: {
    SuccessOverlay,
    FailureOverlay,
    StartScreen,
    PreviewScreen,
    Svoosh
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
      timerIsRunning: state => state.gameState.timerIsRunning
    }),
    ...mapGetters({
      allParametersMatchGoal: 'allParametersMatchGoal',
    }),
    isGameOver() {
      return this.$store.state.gameState.isGameOver
    }
  },
  methods: {
    init () {
      // initialize the synth
      audio.init().toMaster()
      // create loop wich sequences 4 notes
      const randomLoop = times(16).map(i => random(-12, 12))
      let kickTime = true;
      let sweepCounter = 0;
      this.loop = audio.setMainLoop({
        noteArray: times(16),
        subdivision: '8n'
      }, (time, i) => { // i here is just a note from the note array define above
        if (this.$store.state.gameState.timerIsRunning === false && !this.displaySuccessOverlay && !this.displayPreviewOverlay) {

          if (sweepCounter === 0) {
            audio.playSweep();
            sweepCounter++;
          } else if (sweepCounter === 4){
            sweepCounter = 0
          }
        }
        if (this.displaySuccessOverlay && kickTime === true && !this.displayStartOverlay) {
          audio.playKick();
          kickTime = false;
        } else {
          kickTime = true;
        };
        audio.playNote(randomLoop[i], {})

        // if (i === 15) this.$store.commit('increaseSequencesPassedInCurrentLevel')
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
    // displayFailureMessage () {
    //   this.displaySuccessOverlay = true
    // },
    startAgain(){
      this.$store.dispatch('startAgain')
      this.startLevel(this.gameLevel)
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
      this.displayFailureOverlay = false
      this.displayStartOverlay = false
      this.displayPreviewOverlay = true
      // import level config
      const availableParameters = levels[level]

      this.$store.dispatch('startNewLevel', {
        knobsAvailable: availableParameters,
        levelNumber: level || 0
      })
      this.$store.dispatch('randomizGoalParameters') // first randomize the goal
      this.$store.dispatch('randomizeAudioParameters', availableParameters) // and the audio params
      this.$store.dispatch('setSynthToGoal', audio) // then let the user hear it
      // randomize loop melody
      times(4).forEach(i => {
        this.loop.at(i, random(-12, 12));
      })
      this.loop.start()
      // rest will be done by watcher of sequencesPassedInCurrentLevel
    },
    beginSvoosh() {
      this.isThereSvooshComponent = true;
      setTimeout(()=>{this.svooshIt=true}, 0)
    },
    endSvoosh() {
      setTimeout(()=>{
        this.isThereSvooshComponent=false
        this.svooshIt = false
        }, 500)

    },
    beginSuccessSvoosh() {
      this.isThereSuccessSvooshComponent = true;
      setTimeout(()=>{this.successSvooshIt=true}, 0)
    },
    endSuccessSvoosh() {
      setTimeout(()=>{
        this.isThereSuccessSvooshComponent=false
        this.successSvooshIt = false
        }, 500)

    },
    endPreview() {
      this.displayPreviewOverlay = false
      this.$store.commit('startTimerIsRunning')
      this.$store.dispatch('setSynthToDefaultParameters', audio)
    },
    startNextLevel(level) {
      this.$store.commit('increaseLevelValue', 1)
      this.startLevel(this.level) // TODO: should be + 1
    },
    gameLevel () {
      return this.$store.state.gameState.level
    },
  },
  watch: {
    allParametersMatchGoal (val) {
      if(val === true && this.timerIsRunning) {
        this.beginSuccessSvoosh()
        this.$store.dispatch('levelDone') // would be nice to pass timeleft here but it is being passed by timer on gamestop
      }
    },
    sequencesPassedInCurrentLevel (val) {
      if(val === 2) {
        // this.init()
        // this.loop.start()

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
  display: block;
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
  min-height: calc(0.2*92vh);
  width: 16.67em;
  margin: 0;
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
    height: calc(92vh);
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

.slideout-leave-active {
  animation: slideout 1s
}
.slidein-enter-active {
  animation: slidein 1s
}

@keyframes slideout {
  0% {
  transform: translateY(0);
  }
  100% {
  transform: translateY(-100%)
  }
}

@keyframes slidein {
  0% {
  transform: translateY(100%);
  }
  100% {
  transform: translateY(0)
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
