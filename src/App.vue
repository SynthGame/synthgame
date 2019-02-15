<template>
  <div id="app">
    <transition name="confetti">
      <div v-show="showConfetti" class="overlay">
        <canvas id="confetti"></canvas>
        <div class="overlay--inner">
          <div class="overlay--title">Yay! You made it!</div>
          <div class="overlay--description">{{ 10 - attempts }} attempts left.</div>
          <button
            @click="showNextLevel()"
            class="btn_full btn btn_stroke btn_primary">
            <span class="btn--inner">
              <span class="btn--inner-text">Next</span>
            </span>
          </button>
        </div>
      </div>
    </transition>
    <transition name="slideout">
      <success-overlay
        v-if="displaySuccessOverlay"
        @next="startNextLevel"
        @closesuccessoverlay="closeSuccessOverlay"
      />
    </transition>

    <transition name="fade">
      <original-sound-overlay
        v-if="displayOriginalOverlay"
        :retreat="retreat"
        :closeoverlay="killOrignalSoundPrompt"
        :timer="originalSoundTimer"
        :forfeit="forfeit"
      />
    </transition>


    <failure-overlay v-if="isGameOver" @startagain="startAgain" @startlastlevel="startLastLevel"/>
    <router-view />
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
import "confetti-js";

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
      showConfetti: false,
      nextLevel: false,
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
  mounted() {
    var confettiSettings = {
      target: 'confetti',
      size: 8,
      max: 30,
      clock: 50,
      colors: [[255, 126, 110],[67, 190, 222],[110, 1, 209],[124, 208, 139], [228, 226, 89], [75, 27, 255], [255, 255, 255]]
    };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
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
    attempts() {
      return this.$store.state.gameState.attempts;
    },
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
    goToLevel(level) {
      // Add check for lvl avalible....
      this.$store.commit("setLevelValue", level)
      this.startLevel(level); // TODO: should be + 1
      this.$store.commit({
        type: "setCompletedLevel",
        value: false
      })
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
      let self = this
      self.$store.dispatch("setSynthToGoal", audio);
      this.displayOriginalOverlay = true; // create this overlay.
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
    },
    showNextLevel() {
      document.querySelector('.btn_next').click()
      this.showConfetti = false
    }
  },
  watch: {
    madeAttempt() {
      if (this.allParametersMatchGoal === true) {
        this.showConfetti = true
        const score = 10 - this.$store.state.gameState.attempts;
        this.$store.commit("addValueToScore", score);
        this.$store.commit("setLevelScore", score);
        
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
// @import url("https://fonts.googleapis.com/css?family=Montserrat:300,600,900");

// @font-face {
//   font-family: ledscreen;
//   src: url(./assets/ledscreen.ttf);
// }

// .tabs {
//   display: none;
//   justify-content: flex-start;
//   position: absolute;
//   bottom: 0;
//   width: 100vw;
//   height: 10%;
//   align-items: center;
//   text-transform: uppercase;
//   &__tab {
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 20%;
//     border: 0.5px solid white;
//     cursor: pointer;
//     background: black;
//     position: relative;
//     z-index: 2;

//     // &:hover {
//     //   background: white;
//     //   color: black;
//     // }
//   }
// }

// .level {
//   display: block;
//   position: relative;
//   background: #101010;
//   background-image: url(./assets/bg.svg);
//   background-size: auto 100%;
//   width: 100vw;
//   height: 92vh;
// }

// .empty {
//   display: inline-block;
//   height: calc(0.6 * 92vh);
//   width: 16.67em;
//   &:nth-of-type(1) {
//     height: calc(0.2 * 92vh);
//   }
//   &:nth-of-type(2) {
//     height: calc(0.4 * 92vh);
//   }
// }

// .overlay {
//   position: fixed;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 9998;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.9);
//   transition: opacity 0.3s ease;
//   fill: none;
//   stroke: red;
//   stroke-width: 3;
//   // position: relative;
//   z-index: 20000;
//   & h1 {
//     text-transform: uppercase;
//   }
//   & h2 {
//     font-weight: 300;
//     font-size: 2.5em;
//     max-width: 18em;
//     margin: 0;
//     & span {
//       font-size: 0.6em;
//       margin-top: 1.5em;
//       line-height: 1.5em;
//       max-width: 20em;
//       display: inline-block;
//     }
//   }
// }

// .overlay-content-wrapper {
//   // padding: 1rem;
//   height: 80%;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
// }

// .button-next {
//   text-transform: uppercase;
//   letter-spacing: 1px;
//   font-size: 1em;
//   color: inherit;
//   padding: 0;
//   font: inherit;
//   cursor: pointer;
//   outline: inherit;
//   padding: 0.8rem 1.4rem;
//   border: none;
//   margin: 5px;
//   background: none;
//   border: 1px solid #ff8574;
//   transition: all 0.2s;
//   &:hover {
//     background: #ff8574;
//   }
// }

// * {
//   box-sizing: border-box;
// }

// @keyframes blink {
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// }

// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.confetti-enter-active, .confetti-leave-active {
  transition: opacity .1s;
}
.confetti-enter, .confetti-leave-to {
  opacity: 0;
}

/* OVERLAYS TRANSITIONING
*
* the way the start screen goes away:
*/
.slideout-leave-active {
  animation: slideout 1s;
}

// /* ...and the preview screen enters: */
// .slide-up-slide-down-enter-active {
//   animation: slidein 1s;
// }

// /* and the way it disappears after a black svoosh */
// .slide-up-slide-down-leave-active {
//   animation: slidedown 900ms ease-in 0.3s;
// }

/* these animations, defined in keyframes: */
@keyframes slideout {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}

// @keyframes slidein {
//   0% {
//     transform: translateY(100%);
//   }
//   100% {
//     transform: translateY(0);
//   }
// }

// @keyframes slidedown {
//   0% {
//     transform: translateY(0);
//   }
//   100% {
//     transform: translateY(100%);
//   }
// }

// @media only screen and (max-width: 1000px) {
//   .stepnumber {
//     display: none;
//   }

//   .sequencer-slider [type="range"] {
//     margin: -25px 0 0 16px !important;
//     width: 4em !important;
//   }

//   .sequencer.module.sequencer.active {
//     .module__name {
//       padding: 5% 0% !important;
//     }
//     padding: 0 10%;
//   }

//   .module__name {
//     padding: 5% 10% !important;
//   }

//   .sequencer-button__content {
//     margin-top: 0 !important;
//   }

//   button.sequencer-button {
//     min-height: 1em !important;
//     height: 4em !important;
//     margin-top: 0 !important;
//   }

//   .sequencer.module.sequencer.active {
//     flex-direction: column;
//   }

//   .button-section {
//     width: 100% !important;
//     margin-top: 0em !important;
//     border-top: none !important;
//   }

//   .sequencer__controls {
//     width: 100% !important;
//   }

//   button.button-drums {
//     min-width: 3em !important;
//     height: 1.5em !important;
//   }

//   button.sequencer-stop-button.button-drums {
//     padding-left: 1.6em !important;
//   }

//   .sequencer.module.sequencer.active {
//     width: 100%;
//     height: 82vh;
//   }

//   .button-wrapper.function button {
//     width: 20% !important;
//     height: 15% !important;
//   }

//   .module .octave-wrapper {
//     height: 7.4em;
//     transform: scale(1.7);
//   }

//   .game {
//     height: 100% !important;
//   }

//   .overlay {
//     height: 100% !important;
//   }

//   .level {
//     height: 82% !important;
//   }
//   .sequencer.module.sequencer {
//     left: 0 !important;
//   }
//   .tabs {
//     display: flex;
//     &__tab {
//       flex-direction: column;
//       height: 100%;
//       padding: 2vh 0;
//       justify-content: space-around;
//     }
//   }
//   .module .button-wrapper button {
//     width: 4.5em;
//     height: 4.5em;
//   }
//   .module .button-wrapper p {
//     font-size: 1.2em;
//   }
//   .module.active {
//     left: 0;
//     opacity: 1;
//     z-index: 1;
//   }
//   .module .display {
//     height: 11em;
//   }
// }
</style>
