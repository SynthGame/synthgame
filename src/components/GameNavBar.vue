<template>
  <nav class="main">
    <div class="left">
      <h2 class="game_title">Tats
      <span
        v-if="moduleIsUseable('oscillator1') && !createModeIsActive || createModeIsActive"
        :class="{
                  'module__name__status-indicator': true,
                  'module__name__status-indicator--active': oscillator1Complete && !createModeIsActive
                }"
        :style="{
                  'background-color': oscillator1Complete && !createModeIsActive ? oscillatorColor : '',
                  'box-shadow': oscillator1Complete && !createModeIsActive ? `0px 0px 16px ${oscillatorColor}` : '',
                }"
      ></span>
      <span
        v-if="moduleIsUseable('oscillator2') && !createModeIsActive"
        :class="{
                  'module__name__status-indicator': true,
                  'module__name__status-indicator--active': oscillator2Complete
                }"
        :style="{
                  'background-color': oscillator2Complete ? oscillatorTwoColor : '',
                  'box-shadow': oscillator2Complete ? `0px 0px 16px ${oscillatorTwoColor}` : '',
                }"
      ></span>
      <span
        v-if="moduleIsUseable('filter') && !createModeIsActive"
        :class="{
                  'module__name__status-indicator indicator__osctwo': true,
                  'module__name__status-indicator--active indicator__osctwo': filterComplete
                }"
            :style="{
                  'background-color': filterComplete ? filterColor : '',
                  'box-shadow': filterComplete ? `0px 0px 16px ${filterColor}` : '',
                }"
      ></span>
      <span
        v-if="moduleIsUseable('envelope') && !createModeIsActive"
        :class="{
                  'module__name__status-indicator indicator__envelope': true,
                  'module__name__status-indicator--active indicator__envelope': envelopeComplete
                }"
        :style="{
                  'background-color': envelopeComplete ? envelopeColor : '',
                  'box-shadow': envelopeComplete ? `0px 0px 16px ${envelopeColor}` : '',
                }"
      ></span>
      <span
        v-if="moduleIsUseable('lfo') && !createModeIsActive"
        :class="{
                  'module__name__status-indicator': true,
                  'module__name__status-indicator--active': lfoComplete
                }"
        :style="{
                  'background-color': lfoComplete ? lfoColor : '',
                  'box-shadow': lfoComplete ? `0px 0px 16px ${lfoColor}` : '',
                }"
      ></span>
      <span v-if="!createModeIsActive" class="main__level">Level {{gameLevel}}</span>
      <span v-if="createModeIsActive" class="main__level">Artist</span>
      </h2>
    </div>

    <span v-if="createModeIsActive === false && timerIsRunning === false && timeLeftSeconds < 60">
      <button class="button-next"
              @click="requestNextLevel"
              ref="button"
              >NEXT LEVEL</button>
    </span>

    <div class="right">

      <template v-if="createModeIsActive">
        <input class="name-input" placeholder="Enter your Soundcloud username" v-model="exportPresetName"/>
        <button @click="submitPreset(exportPresetName)">submit</button>
        <!-- <button @click="submitPreset()">submit</button> -->
      </template>
      <after-create-overlay v-if="showAfterCreateOverlay" :link="exportPresetLink" @closeCreate="exitAfterCreate"/>
      <svg @click="exitGame" class="exit" width="18px" height="17px" viewBox="0 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="exit_icon" fill="#7D00DA" fill-rule="nonzero" stroke="#FFFFFF" stroke-width="1.785">
                  <path d="M16.6,0.6 L0.9,16.3" id="Shape"></path>
                  <path d="M16.6,16.3 L0.9,0.6" id="Shape"></path>
              </g>
          </g>
      </svg>
    </div>
  </nav>
</template>

<script>
import {
  MODULE_OSCILLATOR_COLOR,
  MODULE_OSCILLATORTWO_COLOR,
  MODULE_ENVELOPE_COLOR,
  MODULE_FILTER_COLOR,
  MODULE_DELAY_COLOR,
  MODULE_REVERB_COLOR,
  MODULE_LFO_COLOR
} from "@/constants";
import padStart from "lodash/padStart";
import some from "lodash/some";
import AfterCreateOverlay from "@/components/AfterCreateOverlay";

export default {
  name: "gameNavBar",
  data: function() {
    return {
      timeLeftSeconds: 45,
      timer: null,
      indicatorActive: true,
      exportPresetName: "",
      exportPresetLink: "",
      oscillatorColor: MODULE_OSCILLATOR_COLOR,
      oscillatorTwoColor: MODULE_OSCILLATORTWO_COLOR,
      envelopeColor: MODULE_ENVELOPE_COLOR,
      filterColor: MODULE_FILTER_COLOR,
      lfoColor: MODULE_LFO_COLOR,
      showAfterCreateOverlay: false
    };
  },
  components: {
    AfterCreateOverlay
  },
  computed: {
    timerIsRunning() {
      return this.$store.state.gameState.timerIsRunning;
    },
    score() {
      return this.$store.state.gameState.score;
    },
    highScore() {
      return this.$store.state.gameState.highScore;
    },
    createModeIsActive() {
      return this.$store.state.gameState.createModeIsActive;
    },
    knobsAvailable() {
      return this.$store.state.gameState.knobsAvailable;
    },
    oscillator1Complete() {
      return Object.values(
        this.$store.getters.audioParametersMatchGoalWithMargin["oscillator1"]
      ).every(param => param);
    },
    oscillator2Complete() {
      return Object.values(
        this.$store.getters.audioParametersMatchGoalWithMargin["oscillator2"]
      ).every(param => param);
    },
    filterComplete() {
      return Object.values(
        this.$store.getters.audioParametersMatchGoalWithMargin["filter"]
      ).every(param => param);
    },
    envelopeComplete() {
      return Object.values(
        this.$store.getters.audioParametersMatchGoalWithMargin["envelope"]
      ).every(param => param);
    },
    lfoComplete() {
      return Object.values(
        this.$store.getters.audioParametersMatchGoalWithMargin["lfo"]
      ).every(param => param);
    },
    gameLevel() {
      return this.$store.getters.displayedLevel;
    },
    paddedTimeLeftString() {
      return `00:${padStart(this.timeLeftSeconds, 2, "0")}`;
    },
    paddedScoreString() {
      return `${padStart(this.score, 5, "0")}`;
    },
    paddedHighScoreString() {
      return `${padStart(this.highScore, 5, "0")}`;
    }
  },
  mounted() {
    window.addEventListener("message", this.receiveMessage, false);
  },
  beforeDestroy() {
    window.removeEventListener("message", this.receiveMessage, false);
  },
  methods: {
    receiveMessage(event) {
      if (event.data !== "clicked-next") {
        return;
      } else {
        this.submitPreset();
      }
    },
    startTimer() {
      this.timeLeftSeconds = 59;
      // TEMP: switched off to create multiplayer mode
      // this.timer =
      //   this.timer ||
      //   window.setInterval(() => {
      //     if (this.timeLeftSeconds === 0) return this.timeIsUp();
      //     this.timeLeftSeconds--;
      //   }, 1000);
    },
    stopTimer() {
      window.clearInterval(this.timer);
      this.timer = null;
      this.$store.commit("addValueToScore", this.timeLeftSeconds);
      if (
        this.$store.state.gameState.score >
        this.$store.state.gameState.highScore
      ) {
        this.$store.commit(
          "updateHighScore",
          this.$store.state.gameState.score
        );
      }
    },
    timeIsUp() {
      // alert('game\'s over')
      this.stopTimer();
      this.$store.dispatch("gameOver");
      // this.startTimer()
    },
    moduleIsUseable(moduleName) {
      if (this.createModeIsActive) return true;
      return some(this.knobsAvailable[moduleName]); // some are truthy
    },
    exitGame() {
      this.$router.push("/");
      location.reload();
    },
    exitAfterCreate() {
      this.showAfterCreateOverlay = false;
    },
    submitPreset(val) {
      // this.showAfterCreateOverlay = true
      this.$store.dispatch("exportPreset", { name: "" }).then(presetId => {
        // alert(`${window.location.origin}/?preset=${presetId}`)
        this.exportPresetLink = `${window.location.origin}/?preset=${presetId}`;
        this.$router.push("?preset=" + presetId);
        window.parent.postMessage(presetId, "*");
        this.showAfterCreateOverlay = true;
        console.log("id", presetId);
      });
    },
    requestNextLevel() {
      console.log("requestNextLevel fired in gamenavbar");
      this.$store.dispatch("nextLevel");
    }
  },
  watch: {
    timerIsRunning(val) {
      if (val) return this.startTimer();
      this.stopTimer();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main {
  width: 100%;
  text-transform: uppercase;
  padding: 0 1.5%;
  height: 8vh;
  // font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: black;
  // border: 1px solid white;
  align-items: center;
  justify-content: space-between;
  & .score {
    display: flex;
    flex-direction: column;
    width: 8em;
  }
  & .highscore {
    border-left: 1px solid white;
    display: flex;
    flex-direction: column;
    width: 8em;
  }
  & .exit {
    transform: scale(0.8);
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
      transform: rotate(90deg);
    }
  }
  & .left {
    width: 40%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  & .right {
    & span {
      font-size: 0.7em;
    }
    & .data {
      font-weight: 600;
      font-size: 1em;
    }
    width: 40%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &__level {
    font-weight: 300;
    margin-left: 0.6em;
  }
}
.game_title {
  text-transform: uppercase;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  letter-spacing: 2px;
  font-size: 1em;
}
.timer {
  display: flex;
  font-size: 2em;
  font-family: ledscreen;
}

.module__name__status-indicator {
  display: inline-block;
  margin-left: 0.6em;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  transition: 0.5s;
  border: 1px solid white;

  &--active {
    border: none;
    transition: 0.5s;
    border: 1px solid white;
  }
}

.name-input {
  min-width: 20em;
  color: white;
  background: unset;
  border: unset;
  border-bottom: 1px solid white;
  margin-right: 1em;
  font-size: 1.1em;
  font-family: montserrat;
  outline: 0;
}

button {
  border: 1px solid rgb(255, 133, 116);
  background: unset;
  color: white;
  text-transform: uppercase;
  margin-right: 2em;
  padding: 0.5em 1em;
  font-family: montserrat;
  font-weight: 600;
  outline: 0;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: rgb(255, 133, 116);
  }
}

@keyframes blink {
  from {
    opacity: 0;
  }
}

@media only screen and (max-width: 1000px) {
  .name-input {
    min-width: 14em;
  }
  .main__level {
    display: none;
  }
  // .game_title {
  //     display: none;
  // }
  .module__name__status-indicator {
    display: none;
  }
  .highscore {
    display: none !important;
  }
}
</style>
