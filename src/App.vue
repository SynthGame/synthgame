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
        @closesuccessoverlay="closeSuccessOverlay"
      />
    </transition>

    <failure-overlay
      v-if="isGameOver"
      @startagain="startAgain"
      @startlastlevel="startLastLevel"
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
import presets from '@/presets'
import range from 'lodash/range'
import fill from 'lodash/fill'

export default {
  name: 'App',
  data () {
    return {
      kickTime: 0,
      pickedPreset: 0,
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
      showCreatePreview: false,
      customLevelCreator: 'Anonymous',
      noteArray: fill(range(0, 16), {
        selected: false,
        pitch: 0,
      }),
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
    this.initSynth()
    if (this.$route.query.preset) {
      window.postMessage(this.$route.query.preset, '*');
      console.log('id',this.$route.query.preset);
      this.customLevelIsActive = true
      this.displayStartOverlay = false
      this.showCreatePreview = true
      getPresetById(this.$route.query.preset)
        .then(data => {
          this.$store.commit('setFeaturedArtist', {
            artistName: data.name,
            avatarUrl: data.avatarUrl
          })
        })
    }

    window.letsPlay = () => this.initM()

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
      timerIsRunning: state => state.gameState.timerIsRunning,
      // nextLevelRequested: state => state.gameState.nextLevelRequested
    }),
    ...mapGetters({
      allParametersMatchGoal: 'allParametersMatchGoal',
      nextLevelClickedInNavBar: 'nextLevelClickedInNavBar'
    }),
    isGameOver () {
      return this.$store.state.gameState.isGameOver
    },
    // nextLevelRequested () {
    //   if (this.$store.state.gameState.nextLevelRequested) {
    //     console.log('hiiieeaaa working finally');
    //   }
    //   // return this.$store.state.gameState.nextLevelRequested
    // }
  },
  methods: {
    initSynth () {
      this.toneLoop = audio.setMainLoop({
        noteArray: range(0, 16),
        subdivision: '8n'
      }, (time, note) => {
        // this.setStep(note)
        if (this.noteArray[note].selected) {
          audio.playNote(this.noteArray[note].pitch, {
            // noteLength: ['16t', '8n', '4n', '2n', '1n'][this.noteArray[note].noteLength],
            noteLength: '8n',
            volume: this.noteArray[note].volume,
            time: note
          })
        }
        if (this.noteArray[note].kick) {
          audio.playKick()
        }
        if (this.noteArray[note].hat) {
          audio.playHat()
        }
        if (this.noteArray[note].clap) {
          audio.playClap()
        }
        if (this.noteArray[note].clap2) {
          audio.playClap2()
        }
        if (this.noteArray[note].cymbal) {
          audio.playCymbal()
        }
        if (this.noteArray[note].labmyc) {
          audio.playLabmyc()
        }
        if (this.noteArray[note].noise) {
          audio.playNoise()
        }
        if (this.noteArray[note].snare) {
          audio.playSnare()
        }
      })
      this.toneLoop.start()
    },
    closeSuccessOverlay () {
      this.displaySuccessOverlay = false;
    },
    init () {
      // Retrieve highscore from local storage
      this.$store.commit('updateHighScore', localStorage.getItem('highscore'))
      // initialize the synth
      audio.init().toMaster()

      // set BPM
      audio.setBpm(SYNTH_BPM)
      // TODO: update drum animation in success overlay time animation

      // start tone general
      audio.start()
      // start loop
      //
    },
    initM () {
      navigator.requestMIDIAccess()
        .then(access => {
          if (access.inputs.size > 0) {
            const input = access.inputs.values().next().value // get the first input
            console.log(input.name)
            input.onmidimessage = e => {
              if (e.data.length !== 3) return
              const pS = e.data[1]
              const value = e.data[2]
              const device = Object.keys(this.$store.state.audioParameters)[('' + pS)[0] - 1]
              const parameter = Object.keys(this.$store.state.audioParameters[device])[('' + pS)[1]]
              this.$store.commit('setAudioParameter', { device,
                parameter,
                value: this.$store.state.gameState.possibleValues[device][parameter]
                  ? this.$store.state.gameState.possibleValues[device][parameter][e.data[2]]
                  : e.data[2]
              })
            }
          }
        }, error => console.log)
    },
    displaySuccesMessage () {
      this.displaySuccessOverlay = true
    },
    // displayFailureMessage () {
    //   this.displaySuccessOverlay = true
    // },
    startAgain () {
      location.reload()
    },
    startLastLevel () {
      this.startLevel(this.$store.state.gameState.level);
      this.displayFailureOverlay = false;
      audio.startMainLoop();
      this.$store.commit('setTheGameFromGameOver');
      this.$store.commit('stopTimerIsRunning');
        // this.$nextTick(() => this.$store.commit('startTimerIsRunning'))
    },
    startPlayMode () {
      this.displayStartOverlay = false // hide start overlay
      this.startLevel(0)
    },
    startCreateMode () {
      this.displayStartOverlay = false
      this.displayFailureOverlay = false
      this.$store.commit('setCreateMode', true)
    },
    startLevel (level) {

      // this.beginSuccessSvoosh()
      this.$nextTick(() => {
        // disable all overlays when svoosh is done
        this.displaySuccessOverlay = false
        this.displayFailureOverlay = false
        this.displayStartOverlay = false
        this.displayPreviewOverlay = true
      })
      audio.playSweep()

      // Shuffle rack slot array
      let array = this.$store.dispatch('shuffleRackSlotArray')

      // randomly pick preset
      this.pickedPreset = Math.round(Math.random() * (presets.length - 1) );
      // console.log('pickedPreset =', this.pickedPreset);

      // load the preset on synth
      this.$store.commit('setAudioParameterToPreset', {
        preset: presets[this.pickedPreset].parameterValues
      })
      this.$store.commit('setFeaturedArtist', {
        artistName: presets[this.pickedPreset].name,
        avatarUrl: presets[this.pickedPreset].avatarUrl
      })
      // console.log('preset audioParameters loaded: ', presets[this.pickedPreset].parameterValues );

      // Set back Envs to standard audioParameters

      // Set LFO amount to 0 TODO only when level is under lfo level check which level that is

      // Set bpm from preset
      audio.setBpm(presets[this.pickedPreset].bpm*2)
      // Set bpm in store
      this.$store.commit('setPresetBpm', presets[this.pickedPreset].bpm)

      // Set noteArray to sequence preset
      this.noteArray = presets[this.pickedPreset].sequenceArray

      // clear drums
      this.noteArray = fill(range(0, 16), {
        kick: false,
        hat: false,
        snare: false,
        cymbal: false,
        clap1: false,
        clap2: false,
        labmyc: false,
        noise: false,
      });

      //Just play 1 note with standard envs
      this.noteArray[0].selected = true;
      this.noteArray[0].pitch = 0;

      // import level config
      const availableParameters = levels[level] || levels[levels.length - 1]

      this.$store.dispatch('startNewLevel', {
        knobsAvailable: availableParameters,
        levelNumber: level || 0
      })
      this.$store.commit('setGoalToPreset', { preset: Object.assign(presets[this.pickedPreset].parameterValues, {}) })
      this.$store.dispatch('randomizeAudioParameters', availableParameters) // and the audio params
      this.$store.dispatch('setSynthToGoal', audio) // then let the user hear it

      // this.loop.start()
      // rest will be done by watcher of sequencesPassedInCurrentLevel
    },
    startPreset (parameters, bpm) {
      const usedParameters = mapValues(parameters,
        audioModule => mapValues(audioModule,
          parameter => !!parameter))

      // disable all overlays
      this.displaySuccessOverlay = false
      this.displayFailureOverlay = false
      this.displayStartOverlay = false
      this.displayPreviewOverlay = false
      this.showCreatePreview=true

      this.$store.dispatch('startNewLevel', {
        knobsAvailable: usedParameters,
        levelNumber: 0
      })
      this.$store.commit('setGoalToPreset', {
        preset: parameters
      })
      // this.$store.dispatch('randomizeAudioParameters', usedParameters) // and the audio params
      this.$store.dispatch('setSynthToGoal', audio) // then let the user hear it

      this.loop.start()
      // rest will be done by watcher of sequencesPassedInCurrentLevel
    },
    beginSvoosh () {
      this.isThereSvooshComponent = true
      this.$nextTick(() => this.svooshIt = true)
      this.displayPreviewOverlay = false
      audio.playSweep()
      this.endPreview()
    },
    endSvoosh () {
      setTimeout(() => {
        this.isThereSvooshComponent = false
        this.svooshIt = false
        this.$store.commit('armSweep')
      }, 300)
      // this.endPreview()
    },
    beginSuccessSvoosh () {
      this.isThereSuccessSvooshComponent = true
      this.$nextTick(() => this.successSvooshIt = true)
    },
    endSuccessSvoosh () {
      setTimeout(() => {
        this.isThereSuccessSvooshComponent = false
        this.successSvooshIt = false
        // Update note array with pickedpreset sequence
        this.noteArray = presets[this.pickedPreset].sequenceArray
      }, 100)
    },
    endPreview () {
      this.$store.commit('startTimerIsRunning')
      this.$store.dispatch('setSynthToDefaultParameters', audio)
      audio.playKick()
    },
    startNextLevel (level) {
      this.$store.commit('increaseLevelValue', 1)
      this.startLevel(this.level) // TODO: should be + 1
    },
    gameLevel () {
      return this.$store.state.gameState.level
    },
    showCreate () {
      this.showCreatePreview = false
      this.startCreateMode()
    }
  },
  watch: {
    allParametersMatchGoal (val) {
      if (val === true && this.timerIsRunning) {
        this.beginSuccessSvoosh()
        audio.playSweep()
        setTimeout(() => {
          // Update note array with pickedpreset sequence
          this.noteArray = presets[this.pickedPreset].sequenceArray
        }, 500)
        // load the preset makers preset
        this.$store.commit('setAudioParameterToPreset', {
          preset: presets[this.pickedPreset].parameterValues
        })
        // this.$store.dispatch('setSynthToDefaultParameters', audio) // then let the user hear it
        this.$store.dispatch('levelDone') // would be nice to pass timeleft here but it is being passed by timer on gamestop
        // // Update note array with pickedpreset sequence
        // this.noteArray = presets[this.pickedPreset].sequenceArray
        // Re-set the audioParameters with pickedpreset to undo envs and lfo modifications on startlevel

        // TODO:
      }
    },
    nextLevelClickedInNavBar (val) {
      console.log('nextLevelClickedInNavBar', val);
      if (val === 'true') {
        console.log('nextLevelClickedInNavBar triggered in app.vue');
        this.$store.dispatch('notNextLevel')
        this.startNextLevel();
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
  top: 90vh;
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
    background: black;
    position: relative;
    z-index: 2;

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
  background-size: auto 100%;
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
  // width: 16.7vw;
  width: 31.4vh;
  max-width: 16.7vw;
  height: 50%;
  margin: 0;
  margin-right: -.5px;
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
  .octave-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 40%;
    height: 6.9em;
    margin-top: .5em;
    .switch {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: fit-content;
      margin: auto;
    }
    button {
      // width: 3em;
      // height: 3em;
      width: 4vh;
      height: 4vh;
      margin: auto;
      background: unset;
      border: none;
      cursor: pointer;
      transition: all .2s;
      &:hover {
        background: rgba(255,255,255,0.1);
      }
    }
    svg{
      width: 1em;
      stroke: white;
    }
    & p {
       margin: .5em 0 0 0;
       font-size: .7em;
       width: 100%;
       text-transform: uppercase;
       letter-spacing: 1px;
    }
  }
  .button-wrapper {
      display: flex;
      padding: 0em;
      width: 85%;
      margin: 0 0 1em 0;
      flex-wrap: wrap;
      justify-content: center;
      button {
        // width:2.5em;
        // height: 2.5em;
        width: 4vh;
        height: 4vh;
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
    overflow: hidden;
    & path {
      transition: .1s all ease-out;
    }
  }
  & .knobs {
    width: 100%;
    min-height: 14.5em;
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
  user-select: none;
  touch-action: none !important;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#app {
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  font-size: 1.8vh;
  -webkit-font-smoothing: antialiased;
  touch-action: none !important;
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
    font-size: 2.5em;
    max-width: 18em;
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
  // padding: 1rem;
  height: 80%;
  width: 100%;
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

*:focus {outline:0 !important}

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

  .stepnumber {
    display: none;
  }

  .sequencer-slider [type='range'][data-v-08d8bd4d] {
    margin: -25px 0 0 16px !important;
    width: 4em !important;
  }

  .sequencer.module.sequencer.active {
    .module__name {
      padding: 5% 0% !important;
    }
    padding: 0 10%;
  }

  .module__name {
    padding: 5% 10% !important;
  }

  .sequencer-button__content {
    margin-top: 0 !important;
  }

  button.sequencer-button {
    min-height: 1em !important;
    height: 4em !important;
    margin-top: 0 !important;
  }

  .sequencer.module.sequencer.active {
    flex-direction: column;
  }

  .button-section {
    width: 100% !important;
    margin-top: 0em !important;
    border-top: none !important;
  }

  .sequencer__controls {
    width: 100% !important;
  }

  button.button-drums {
    min-width: 3em !important;
  }

  button.sequencer-stop-button.button-drums {
    padding-left: 1.6em !important;
  }

  .sequencer.module.sequencer.active {
    width: 100%;
    height: 82vh;
  }

  .module .octave-wrapper {
      height: 7.4em;
      transform: scale(1.7);
  }

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
    max-width: 100vw;
    height: 82vh;
    position: absolute !important;
    left:0 !important;
    top:0 !important;
    opacity: 0;
    padding-bottom: 2em !important;
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
