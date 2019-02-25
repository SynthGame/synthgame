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

    <!-- <transition name="slideout">
      <success-overlay
        v-if="displaySuccessOverlay"
        @next="startNextLevel"
        @closesuccessoverlay="closeSuccessOverlay"
      />
    </transition> -->

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
      target: "confetti",
      size: 8,
      max: 30,
      clock: 50,
      colors: [
        [255, 126, 110],
        [67, 190, 222],
        [110, 1, 209],
        [124, 208, 139],
        [228, 226, 89],
        [75, 27, 255],
        [255, 255, 255]
      ]
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
    OriginalSoundOverlay
  },
  computed: {
    ...mapState({
      level: state => state.gameState.level,
      timerIsRunning: state => state.gameState.timerIsRunning
    }),
    ...mapGetters({
      allParametersMatchGoal: "allParametersMatchGoal"
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
        this.$store.commit("armSweep");
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
      this.startLevel(this.level); // TODO: should be + 1
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
      let self = this;
      self.$store.dispatch("setSynthToGoal", audio);
      this.displayOriginalOverlay = true; // create this overlay.
    },
    killOrignalSoundPrompt() {
      this.displayOriginalOverlay = false;
      clearInterval(this.timerInterval);
      this.originalSoundTimer = 8;
      this.$store.dispatch("setSynthToAudioParameters", audio);
    },
    forfeit() {
      this.killOrignalSoundPrompt();
      this.startNextLevel();
    },
    showNextLevel() {
      document.querySelector(".btn_next").click();
      this.showConfetti = false;
    }
  },
  watch: {
    madeAttempt() {
      if (this.allParametersMatchGoal === true) {
        this.showConfetti = true;
        const score = 11 - this.$store.state.gameState.attempts;
        this.$store.commit("addValueToScore", score);
        this.$store.commit("setLevelScore", score);
        this.$store.commit({
          type: "setCompletedLevel",
          value: true
        });
        if (this.$store.state.roomId !== null) {
          this.$store.dispatch("updateHighScore");
        }
        this.$store.dispatch("levelDone");
        this.$store.commit("resetAttempts");
      } else {
        if (this.$store.state.gameState.attempts == 10) {
          // need to reset global attemps in gameOver action.....
          this.$store.dispatch("gameOver");
        } else {
          this.displayOriginalOverlay = true;
          audio.playGameOver();
          this.originalSoundPrompt();
        }
      }
    }
  }
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.confetti-enter-active,
.confetti-leave-active {
  transition: opacity 0.1s;
}
.confetti-enter,
.confetti-leave-to {
  opacity: 0;
}

/* OVERLAYS TRANSITIONING
*
* the way the start screen goes away:
*/
.slideout-leave-active {
  animation: slideout 1s;
}
@keyframes slideout {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>
