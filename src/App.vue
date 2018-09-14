<template>
  <div id="app">
    <transition name="slideout">
      <start-screen
        v-if="displayStartOverlay"
        @startPreview="startPlayMode"
        @create="showCreatePreview=true"
      />
    </transition>
    <before-create-overlay v-if="showCreatePreview" @showCreate="showCreate"/>
    <transition name="slide-up-slide-down">
      <preview-screen
        v-if="displayPreviewOverlay"
        @startLevel="beginSvoosh"
      />
    </transition>
    <svoosh
      v-if="isThereSvooshComponent"
      :isFired="svooshIt"
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
import mapValues from 'lodash/mapValues'
import audio from '@/audio'
import { getPresetById } from '@/db'
import SuccessOverlay from '@/components/SuccessOverlay'
import FailureOverlay from '@/components/FailureOverlay'
import BeforeCreateOverlay from '@/components/BeforeCreateOverlay'
import StartScreen from '@/components/StartScreen'
import PreviewScreen from '@/components/PreviewScreen'
import Svoosh from '@/components/Svoosh'
import { SYNTH_BPM } from '@/constants'
import levels from '@/levels'

export default {
  name: 'App',
  data () {
    return {
      kickTime: 0,
      displaySuccessOverlay: false,
      displayFailureOverlay: false,
      displayStartOverlay: true,
      displayPreviewOverlay: false,
      loop: null,
      isThereSvooshComponent: false,
      svooshIt: false,
      isThereSuccessSvooshComponent: false,
      successSvooshIt: false,
      customLevelIsActive: false,
      customLevelSequence: [],
      showCreatePreview: false
    }
  },
  components: {
    SuccessOverlay,
    FailureOverlay,
    StartScreen,
    PreviewScreen,
    Svoosh,
    BeforeCreateOverlay
  },
  created () {
    this.init()
    if(this.$route.query.preset) {
      getPresetById(this.$route.query.preset)
        .then(data => {
          this.customLevelIsActive = true
          this.customLevelSequence = data.sequenceArray
          this.startPreset(data.parameterValues)
        })
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
      // Retrieve highscore from local storage
        this.$store.commit('updateHighScore', localStorage.getItem("highscore"))
      // initialize the synth
      audio.init().toMaster()
      // create loop wich sequences 4 notes
      const randomLoop = times(16).map(i => random(-12, 12))
      this.loop = audio.setMainLoop({
        noteArray: times(16),
        subdivision: '8n'
      }, (time, i) => { // i here is just a note from the note array define above
        if (this.$store.state.gameState.timerIsRunning === false && !this.displaySuccessOverlay && !this.displayPreviewOverlay) {
          if (this.$store.state.gameState.sweepArmed) {
            audio.playSweep(); //plan this ahead?
            this.$store.commit('disarmSweep')
          }
        }
        if ((this.displayPreviewOverlay && this.kickTime === 0 && !this.displayStartOverlay) || (this.displaySuccessOverlay && this.kickTime === 0 && !this.displayStartOverlay)) {
          audio.playKick();
          this.$store.commit('armSweep')
          this.kickTime++
        } else if (this.kickTime < 15) {
          this.kickTime++
        } else {
          this.kickTime = 0;
        };
        if (!this.customLevelIsActive) {
          audio.playNote(randomLoop[i], {})
        } else {
          if(this.customLevelSequence[i].selected) audio.playNote(this.customLevelSequence[i].pitch, {
            noteLength: ['16t', '8n', '4n', '2n','1n'][this.customLevelSequence[i].noteLength],
            volume: this.customLevelSequence[i].volume
          })
        }

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
      location.reload();
    },
    startPlayMode(){
      this.displayStartOverlay = false // hide start overlay
      this.startLevel(0)
    },
    startCreateMode(){
      this.displayStartOverlay = false
      this.displayFailureOverlay=false;
      this.$store.commit('setCreateMode', true)
    },
    startLevel(level) {
      // disable all overlays
      this.displaySuccessOverlay = false
      this.displayFailureOverlay = false
      this.displayStartOverlay = false
      this.displayPreviewOverlay = true
      // import level config
      const availableParameters = levels[level] || levels[levels.length -1]

      this.$store.dispatch('startNewLevel', {
        knobsAvailable: availableParameters,
        levelNumber: level || 0
      })
      this.$store.dispatch('randomizGoalParameters') // first randomize the goal
      this.$store.dispatch('randomizeAudioParameters', availableParameters) // and the audio params
      this.$store.dispatch('setSynthToGoal', audio) // then let the user hear it

      this.loop.start()
      // rest will be done by watcher of sequencesPassedInCurrentLevel
    },
    startPreset(parameters) {
      const usedParameters = mapValues(parameters,
      audioModule => mapValues(audioModule,
      parameter => !!parameter))

      // disable all overlays
      this.displaySuccessOverlay = false
      this.displayFailureOverlay = false
      this.displayStartOverlay = false
      this.displayPreviewOverlay = true

      this.$store.dispatch('startNewLevel', {
        knobsAvailable: usedParameters,
        levelNumber: 0
      })
      this.$store.commit('setGoalToPreset', {
        preset: parameters
      })
      this.$store.dispatch('randomizeAudioParameters', usedParameters) // and the audio params
      this.$store.dispatch('setSynthToGoal', audio) // then let the user hear it

      this.loop.start()
      // rest will be done by watcher of sequencesPassedInCurrentLevel
    },
    beginSvoosh() {
      this.isThereSvooshComponent = true;
      this.$nextTick(() => this.svooshIt = true)
      this.displayPreviewOverlay = false
    },
    endSvoosh() {
      setTimeout(()=>{
        this.isThereSvooshComponent=false
        this.svooshIt = false
        this.$store.commit('armSweep')
        }, 500)
      this.endPreview()
    },
    beginSuccessSvoosh() {
      this.isThereSuccessSvooshComponent = true
      this.$nextTick(() => this.successSvooshIt=true)
    },
    endSuccessSvoosh() {
      setTimeout(()=>{
        this.isThereSuccessSvooshComponent=false
        this.successSvooshIt = false
        }, 500)

    },
    endPreview() {
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
    showCreate() {
      this.showCreatePreview=false
      this.startCreateMode()
    }
  },
  watch: {
    allParametersMatchGoal (val) {
      if(val === true && this.timerIsRunning) {
        this.beginSuccessSvoosh()
        this.$store.dispatch('levelDone') // would be nice to pass timeleft here but it is being passed by timer on gamestop
      }
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,600,900');

@font-face {
    font-family: ledscreen;
    src: url(./assets/ledscreen.ttf);
}

.tabs {
  display: none;
  justify-content: flex-start;
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 10vh;
  align-items: center;
  text-transform: uppercase;
  &__tab {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
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
  height: 92vh;
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
  width: 16.67em;
  height: 50%;
  margin: 0;
  display: block;
  float: left;
  position: relative;
  border: 1px solid #b7b7b7;
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
      padding: 0em;
      width: 85%;
      margin: 0 0 1em 0;
      flex-wrap: wrap;
      justify-content: center;
      button {
        width:2.5em;
        height: 2.5em;
      }
      svg{
        width: 1em;
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
    background: #b7b7b7;
    width: .4em;
    height: .4em;
    border-radius: 100%;
    top: .45em;
    left: .55em;
  }
  &:after {
    content:'';
    display: block;
    position: absolute;
    background: #b7b7b7;
    width: .4em;
    height: .4em;
    border-radius: 100%;
    top: .45em;
    right: .55em;
  }
  & .display {
    position: relative;
    z-index: 99;
    margin: 2% 2%;
    height: 6em;
    width: 80%;
    margin-left: 10%;
    & path {
      transition: .1s all ease-out;
    }
  }
  & .knobs {
    width: 100%;
    min-height: 15em;
    margin: auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    &:before {
      content:'';
      display: block;
      position: absolute;
      background: #b7b7b7;
      width: .4em;
      height: .4em;
      border-radius: 100%;
      bottom: .55em;
      left: .55em;
    }
    &:after {
      content:'';
      display: block;
      position: absolute;
      background: #b7b7b7;
      width: .4em;
      height: .4em;
      border-radius: 100%;
      bottom: .55em;
      right: .55em;
    }
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

.overlay {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .90);
  transition: opacity .3s ease;
  fill: none;
  stroke: red;
  stroke-width: 3;
  // position: relative;
  z-index: 20000;
  & h1 {
    text-transform: uppercase;
  }
  & h2 {
    font-weight: 300;
    font-size: 3em;
    max-width: 12em;
    margin: 0;
    & span {
      font-size: .6em;
      margin-top: 1.5em;
      line-height: 1.5em;
      max-width: 20em;
      display: inline-block;
    }
  }
}

.overlay-content-wrapper {
  padding: 1rem;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.button-next {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1em;
    color: inherit;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    padding: .8rem 1.4rem;
    border: none;
    margin: 5px;
    background: none;
    border: 1px solid #ff8574;
    transition: all .2s;
    &:hover {
      background: #ff8574;
    }
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

/* OVERLAYS TRANSITIONING
*
* the way the start screen goes away:
*/
.slideout-leave-active {
  animation: slideout 1s
}

/* ...and the preview screen enters: */
.slide-up-slide-down-enter-active {
  animation: slidein 1s
}

/* and the way it disappears after a black svoosh */
.slide-up-slide-down-leave-active {
  animation: slidedown 900ms ease-in 0.3s
}

/* these animations, defined in keyframes: */
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

@keyframes slidedown {
  0% {
  transform: translateY(0);
  }
  100% {
  transform: translateY(100%)
  }
}

@media only screen and (max-width: 1000px) {
  #app {
    font-size: .8em;
  }
  .level {
    height: 82vh !important;
  }
  .tabs {
    display: flex;
    &__tab {
      flex-direction: column;
      height:100%;
      padding: 2vh 0;
      justify-content: space-around;
    }
  }
  .module {
    width: 100vw;
    height: 90vh;
    position: absolute;
    opacity: 0;
  }
  .module .knobs {
    padding-top: 5vh;
    min-height: 55vh;
}
.module .button-wrapper button {
    width: 4.5em;
    height: 4.5em;
}
.module .button-wrapper p {
    font-size: 1.2em;
}
  .module.active {
    left: 0;
    opacity: 1;
    z-index: 1;
    height: 82vh;
  }
  .module .display {
    height: 20vh;
  }
}
</style>
