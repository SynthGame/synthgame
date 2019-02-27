<template>
  <div id="app">
    <transition name="confetti">
      <div v-show="showConfetti" class="overlay">
        <canvas id="confetti"></canvas>
        <div class="overlay--inner">
          <div class="overlay--title">Yay! You made it!</div>
          <div class="overlay--title">SCORED +{{ levelScore }} POINTS!</div>
          <button @click="showNextLevel()" class="btn_full btn btn_stroke btn_primary">
            <span class="btn--inner">
              <span class="btn--inner-text">Next</span>
            </span>
          </button>
        </div>
      </div>
    </transition>

    <transition name="confetti">
      <div v-show="gameComplete" class="overlay">
        <div class="overlay--inner-win">
          <div class="overlay--title">YOUR FINAL SCORE IS {{ totalScore }} POINTS!</div>
          <!-- PLAY AGAIN OR CHALLENGE YOUR FRIENDS -->
          <div class="screen--share--win">
            <p>Fill in your name, hit enter and you’ll receive a link to challenge your friends!</p>
            <div v-if="!userSet" class="username_container_win">
              <input class="username_input" v-model="userName" type="text" placeholder="Username">
              <button class="btn btn_stroke btn_primary btn-username" @click="setUsername">ENTER</button>
            </div>
            <!-- <div v-if="!shareLink" class="play-with-friends-win">
              <button
                @click="generateShareLink"
                class="btn btn_stroke btn_primary"
              >PLAY WITH FRIENDS</button>
            </div> -->
            <div v-if="shareLink" class="screen--share-inner">
              <div class="screen--share-url">
                <span>{{ shareLink }}</span>
              </div>
              <button class="btn btn_icon btn_primary">
                <svg viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect
                    x="8.904"
                    y="8"
                    width="12.999"
                    height="13"
                    rx="2"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></rect>
                  <path
                    d="M4.902 14h-1a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <button @click="startAgain()" class="btn_full btn btn_stroke btn_primary">
            <span class="btn--inner">
              <span class="btn--inner-text">PLAY AGAIN</span>
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
    </transition>-->
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
import "confetti-js";
import "prevent-pull-refresh";

export default {
  name: "App",
  data() {
    return {
      userName: '',
      userSet: false,
      kickTime: 0,
      pickedPreset: 0,
      displaySuccessOverlay: false,
      displayFailureOverlay: false,
      displayStartOverlay: true, // change
      displayPreviewOverlay: false,
      displayOriginalOverlay: false,
      showConfetti: false,
      gameComplete: false,
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
      timerInterval: null
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
    totalScore() {
      console.log(`HighScore ${this.$store.state.gameState.highScore}`)
      return this.$store.state.gameState.score;
    },
    shareLink() {
      const base = window.location.hostname;
      return this.$store.state.roomId
        ? `${base}/play/${this.$store.state.roomId}`
        : false;
    },
    ...mapState({
      level: state => state.gameState.level,
      timerIsRunning: state => state.gameState.timerIsRunning
    }),
    ...mapGetters({
      allParametersMatchGoal: "allParametersMatchGoal",
      levelScore: "returnLevelScore"
    }),
    preViewtimer() {
      return this.$store.state.gameState.previewTimer;
    },
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
      setUsername() {
      console.log(this.userName);
      this.userSet = true;
      this.$store.commit('setUsername', { userName: this.userName });
      this.generateShareLink();
    },
    generateShareLink() {
      this.$store.dispatch("createNewRoom");
    },
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
      this.gameComplete = false;
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
    // countdown() {
    //   this.originalSoundTimer -= 1;
    //   console.log(this.originalSoundTimer);
    //   if (this.originalSoundTimer === 0) {
    //     this.killOrignalSoundPrompt();
    //   }
    // },
    originalSoundPrompt() {
      let self = this;
      self.$store.dispatch("setSynthToGoal", audio);
      this.displayOriginalOverlay = true; // create this overlay.
    },
    killOrignalSoundPrompt() {
      if (!(this.preViewtimer > 0)) {
        this.displayOriginalOverlay = false;
        clearInterval(this.timerInterval);
        this.originalSoundTimer = 5;
        this.$store.dispatch("setSynthToAudioParameters", audio);
      }
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
        if (this.level == levels.length -1) {
          // win
          console.log('WIN!')
          this.gameComplete = true;
        } else {
          this.showConfetti = true;
          const score = 6 - this.$store.state.gameState.attempts;
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
        }
      } else {
        if (this.$store.state.gameState.attempts == 5) {
          // need to reset global attemps in gameOver action.....
          this.$store.dispatch("gameOver");
        } else {
          this.displayOriginalOverlay = true;
          audio.playGameOver();
          this.originalSoundPrompt();
          this.timerInterval = setInterval(() => {
            this.$store.commit("decrementPreviewTimer");
            if (this.previewTimer == 0) {
              clearInterval(this.timerInterval);
            }
          }, 1000);
        }
      }
    }
  }
};
</script>

<style lang="scss">

.screen--share-win {
   max-width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: auto;
}

.username_container_win {
    margin: 0px;
    margin-top: 30px;
    input {
      	width: 70%;
		    height: 60px;
    }
    button {
      margin: 0px;
      margin-left: 4%;
      width: 25%;
    }
}

.play-with-friends-win {
    margin-top: 20px;
    width: 100%;
    button {
      width: 100%
    }
}

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

.overlay--inner-win {
  z-index: 20;
}
</style>
