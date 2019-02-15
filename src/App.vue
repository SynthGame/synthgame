<template>
  <div id="app">
    <transition name="slideout">
      <success-overlay
        v-if="displaySuccessOverlay"
        @next="startNextLevel"
        @closesuccessoverlay="closeSuccessOverlay"
      />
    </transition>

    <transition name="slideout">
      <original-sound-overlay
        v-if="displayOriginalOverlay"
        :retreat="retreat"
        :closeoverlay="killOrignalSoundPrompt"
        :timer="originalSoundTimer"
        :forfeit="forfeit"
      />
    </transition>


    <failure-overlay v-if="isGameOver" @startagain="startAgain" @startlastlevel="startLastLevel"/>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import random from "lodash/random";
import times from "lodash/times";
import mapValues from "lodash/mapValues";
import audio from "@/audio";
import { getPresetById } from "@/db";
import SuccessOverlay from "@/components/SuccessOverlay";
import FailureOverlay from "@/components/FailureOverlay";
import BeforeCreateOverlay from "@/components/BeforeCreateOverlay";
import OriginalSoundOverlay from "@/components/OriginalSoundOverlay";
import StartScreen from "@/components/StartScreen";
import PreviewScreen from "@/components/PreviewScreen";
import Svoosh from "@/components/Svoosh";
import { SYNTH_BPM } from "@/constants";
import levels from "@/levels";
import presets from "@/presets";
import range from "lodash/range";
import fill from "lodash/fill";
import character from "@/character";

export default {
  name: "App",
  data() {
    return {
      kickTime: 0,
      pickedPreset: 0,
      displaySuccessOverlay: false,
      displayFailureOverlay: false,
      displayStartOverlay: true, // change
      displayPreviewOverlay: false,
      displayOriginalOverlay: false,
      // gameSummary: true,
      loop: null,
      isThereSvooshComponent: false,
      svooshIt: false,
      isThereSuccessSvooshComponent: false,
      successSvooshIt: false,
      customLevelIsActive: false,
      customLevelSequence: [],
      showCreatePreview: false,
      customLevelCreator: "Anonymous",
      noteArray: fill(range(0, 16), {
        selected: false,
        pitch: 0,
        volume: false,
        glide: false
      }),
      originalSoundTimer: 8,
      timerInterval: 0
    };
  },
  components: {
    SuccessOverlay,
    FailureOverlay,
    StartScreen,
    PreviewScreen,
    Svoosh,
    BeforeCreateOverlay,
    OriginalSoundOverlay,
  },
  computed: {
    ...mapState({
      sequencesPassedInCurrentLevel: state =>
        state.gameState.sequencesPassedInCurrentLevel,
      level: state => state.gameState.level,
      timerIsRunning: state => state.gameState.timerIsRunning
      // nextLevelRequested: state => state.gameState.nextLevelRequested
    }),
    ...mapGetters({
      allParametersMatchGoal: "allParametersMatchGoal",
      nextLevelClickedInNavBar: "nextLevelClickedInNavBar"
    }),
    isGameOver() {
      return this.$store.state.gameState.isGameOver;
    },
    madeAttempt() {
      return this.$store.state.gameState.madeAttempt;
    },
    completedLevel() {
      return this.$store.state.gameState.completedLevel;
    }
    // nextLevelRequested () {
    //   if (this.$store.state.gameState.nextLevelRequested) {
    //     console.log('hiiieeaaa working finally');
    //   }
    //   // return this.$store.state.gameState.nextLevelRequested
    // }
  },
  methods: {
    switchToCreate() {
      this.showCreatePreview = true;
      this.displayPreviewOverlay = false;
    },
    closeSuccessOverlay() {
      this.displaySuccessOverlay = false;
    },
    back() {
      this.showCreatePreview = false;
      if (this.level < 6) {
        this.displaySuccessOverlay = true;
      }
    },
    displaySuccesMessage() {
      // this.displaySuccessOverlay = true;
      this.displayStartOverlay = true;
    },
    // displayFailureMessage () {
    //   this.displaySuccessOverlay = true
    // },
    startAgain() {
      location.reload();
    },
    startLastLevel() {
      this.startLevel(this.$store.state.gameState.level);
      this.displayFailureOverlay = false;
      audio.startMainLoop();
      this.$store.commit("setTheGameFromGameOver");
      this.$store.commit("stopTimerIsRunning");
      // this.$nextTick(() => this.$store.commit('startTimerIsRunning'))
    },
    startPlayMode() {
      this.displayStartOverlay = false; // hide start overlay
      this.startLevel(0);
    },
    startCreateMode() {
      this.displayStartOverlay = false;
      this.displayFailureOverlay = false;
      this.$store.commit("setCreateMode", true);
    },
    beginSvoosh() {
      this.displayStartOverlay = false;
      this.isThereSvooshComponent = true;
      this.$nextTick(() => (this.svooshIt = true));
      this.displayPreviewOverlay = false;
      audio.playSweep();
      this.endPreview();
    },
    endSvoosh() {
      setTimeout(() => {
        this.isThereSvooshComponent = false;
        this.svooshIt = false;
        this.$store.commit("armSweep")
      }, 300);
    },
    beginSuccessSvoosh() {
      this.isThereSuccessSvooshComponent = true;
      this.$nextTick(() => (this.successSvooshIt = true));
    },
    endSuccessSvoosh() {
      setTimeout(() => {
        this.isThereSuccessSvooshComponent = false;
        this.successSvooshIt = false;
        // Update note array with pickedpreset sequence
        this.noteArray = presets[this.pickedPreset].sequenceArray;
      }, 300);
    },
    endPreview() {
      this.$store.commit("startTimerIsRunning");
      this.$store.dispatch("setSynthToDefaultParameters", audio);
      audio.playKick();
    },
    startNextLevel() {
      this.$store.commit("increaseLevelValue", 1);
      this.startLevel(this.level) // TODO: should be + 1
      this.$store.commit({
        type: "setCompletedLevel",
        value: false
      });
    },
    gameLevel() {
      return this.$store.state.gameState.level;
    },
    showCreate() {
      this.showCreatePreview = false;
      audio.playKick();
      this.startCreateMode();
      window.parent.postMessage("make-music-activated", "*");
    },
    // NEW METHODS
    retreat() {
      // advance to next level failing current level + 0 Points
    },
    countdown() {
      this.originalSoundTimer -= 1;
      console.log(this.originalSoundTimer);
      if (this.originalSoundTimer === 0) {
        this.killOrignalSoundPrompt();
      }
    },
    originalSoundPrompt() {
      this.$store.dispatch("setSynthToGoal", audio);
      this.displayOriginalOverlay = true; // create this overlay.
      this.timerInterval = setInterval(this.countdown, 1000);
    },
    killOrignalSoundPrompt() {
      this.displayOriginalOverlay = false;
      clearInterval(this.timerInterval);
      this.originalSoundTimer = 8;
      this.$store.dispatch("setSynthToUserAttempt", audio);
    },
    forfeit() {
      this.killOrignalSoundPrompt();
      this.startNextLevel();
    }
  },
  watch: {
    madeAttempt() {
      if (this.allParametersMatchGoal === true) {
        this.beginSuccessSvoosh();
        const score = 10 - this.$store.state.gameState.attempts;
        this.$store.commit("addValueToScore", score);
        this.$store.commit("setLevelScore", score);
        watch
        this.$store.commit({
          type: "setCompletedLevel",
          value: true
        });

        this.$store.dispatch("levelDone")
        this.$store.commit("resetAttempts")
      } else {
        if (this.$store.state.gameState.attempts == 10) {
          // need to reset global attemps in gameOver action.....
          this.$store.dispatch("gameOver");
        } else {
          this.originalSoundPrompt();
        }
      }
    },
    nextLevelClickedInNavBar(val) {
      console.log("nextLevelClickedInNavBar", val);
      if (val === "true") {
        console.log("nextLevelClickedInNavBar triggered in app.vue");
        this.$store.dispatch("notNextLevel");
        this.startNextLevel();
      }
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:300,600,900");

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
  height: 10%;
  align-items: center;
  text-transform: uppercase;
  &__tab {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    border: 0.5px solid white;
    cursor: pointer;
    background: black;
    position: relative;
    z-index: 2;

    // &:hover {
    //   background: white;
    //   color: black;
    // }
  }
}

.level {
  display: block;
  position: relative;
  background: #101010;
  background-image: url(./assets/bg.svg);
  background-size: auto 100%;
  width: 100vw;
  height: 92vh;
}

.empty {
  display: inline-block;
  height: calc(0.6 * 92vh);
  width: 16.67em;
  &:nth-of-type(1) {
    height: calc(0.2 * 92vh);
  }
  &:nth-of-type(2) {
    height: calc(0.4 * 92vh);
  }
}

.module {
  width: auto;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;


  // // width: 16.7vw;
  // width: 31.4vh;
  // max-width: 16.7vw;
  // height: 50%;
  // margin: 0;
  // margin-right: -1px;
  // display: block;
  // float: left;
  // position: relative;
  // border: 1px solid #b7b7b7;
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
    // margin-top: 0.5em;
    .switch {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 2em;
      height: 5.4em;
      box-sizing: content-box;
      margin: 0 auto;
      button {
        font-size: 1em;
        svg {
          padding: 0;
        }
      }
    }
    button {
      min-height: 4vh;
      height: 100%;
      width: 100%;
      box-sizing: content-box;
      padding: 0;
      margin: auto;
      background: unset;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
    svg {
      width: 1em;
      stroke: white;
    }
    & p {
      margin: 0;
      font-size: 0.7em;
      width: 100%;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
  .button-wrapper {
    display: flex;
    padding: 0em;
    width: 80%;
    margin: 0;
    flex-wrap: wrap;
    justify-content: space-around;
    min-height: 4em;
    button {
      // width:2.5em;
      // height: 2.5em;
      width: 4vh;
      height: 4vh;
    }
    svg {
      width: 1em;
    }
    & p {
      margin: 0;
      font-size: 0.7em;
      width: 100%;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
  &:before {
    content: "";
    display: block;
    position: absolute;
    background: #b7b7b7;
    width: 0.4em;
    height: 0.4em;
    border-radius: 100%;
    top: 0.45em;
    left: 0.55em;
  }
  &:after {
    content: "";
    display: block;
    position: absolute;
    background: #b7b7b7;
    width: 0.4em;
    height: 0.4em;
    border-radius: 100%;
    top: 0.45em;
    right: 0.55em;
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
      transition: 0.1s all ease-out;
    }
  }
  & .knobs {
    width: 80%;
    min-height: 14.5em;
    margin: auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    &:before {
      content: "";
      display: block;
      position: absolute;
      background: #b7b7b7;
      width: 0.4em;
      height: 0.4em;
      border-radius: 100%;
      bottom: 0.55em;
      left: 0.55em;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      background: #b7b7b7;
      width: 0.4em;
      height: 0.4em;
      border-radius: 100%;
      bottom: 0.55em;
      right: 0.55em;
    }
  }
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
  background-color: rgba(0, 0, 0, 0.9);
  transition: opacity 0.3s ease;
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
      font-size: 0.6em;
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
  padding: 0.8rem 1.4rem;
  border: none;
  margin: 5px;
  background: none;
  border: 1px solid #ff8574;
  transition: all 0.2s;
  &:hover {
    background: #ff8574;
  }
}

* {
  box-sizing: border-box;
}

@keyframes blink {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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

*:focus {
  outline: 0 !important;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* OVERLAYS TRANSITIONING
*
* the way the start screen goes away:
*/
.slideout-leave-active {
  animation: slideout 1s;
}

/* ...and the preview screen enters: */
.slide-up-slide-down-enter-active {
  animation: slidein 1s;
}

/* and the way it disappears after a black svoosh */
.slide-up-slide-down-leave-active {
  animation: slidedown 900ms ease-in 0.3s;
}

/* these animations, defined in keyframes: */
@keyframes slideout {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}

@keyframes slidein {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes slidedown {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}

@media only screen and (max-width: 1000px) {
  .stepnumber {
    display: none;
  }

  .sequencer-slider [type="range"] {
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
    height: 1.5em !important;
  }

  button.sequencer-stop-button.button-drums {
    padding-left: 1.6em !important;
  }

  .sequencer.module.sequencer.active {
    width: 100%;
    height: 82vh;
  }

  .button-wrapper.function button {
    width: 20% !important;
    height: 15% !important;
  }

  .module .octave-wrapper {
    height: 7.4em;
    transform: scale(1.7);
  }

  #app {
    font-size: 0.7em;
    width: 100vw;
    height: 100% !important;
    overflow: hidden;
  }

  body {
    // height: 100% !important;
    // overflow: hidden !important;
    position: absolute;
  }

  .game {
    height: 100% !important;
  }

  .overlay {
    height: 100% !important;
  }

  .level {
    height: 82% !important;
  }
  .sequencer.module.sequencer {
    left: 0 !important;
  }
  .tabs {
    display: flex;
    &__tab {
      flex-direction: column;
      height: 100%;
      padding: 2vh 0;
      justify-content: space-around;
    }
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
  }
  .module .display {
    height: 11em;
  }
}
</style>
