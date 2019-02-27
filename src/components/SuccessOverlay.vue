<template>
  <div class="overlay success">
    <div class="overlay-content-wrapper">
      <div>
        <h2>Well done!</h2>
        <!-- <p class="score">Your current score: {{gameScore}}</p> -->
      </div>
      <svg viewBox="0 0 250 250" height="200px" width="200px" v-if="currentAnim==='ping'">
        <!-- Ping-pong Racket -->
        <g :transform="`rotate(${anim.ping.racketYOffset}) translate(0, 0)`" transform-origin="0px 180px" stroke-width="1.5819">
          <svg width="203px" height="99px" version="1.1" y="110px" x="10px">
            <g id="Sin-título-2_Mesa-de-trabajo-1" transform="translate(0.000000, 1.000000)" stroke="#FFFFFF" stroke-width="1.5819">
              <path d="M11.8,91.4 L0.9,77.7 L1.4,62.7 L11.7,76.4 C11.7,76.4 17.7,75.3 34.3,69.5 C49.1,64 67.7,62.9 68.6,62.9 C74.5,63.1 77.8,65.4 83.2,69.2 C87.4,72.1 92.7,75.8 100.9,79.7 C101,79.7 101,79.7 101.1,79.8 C101.5,80 101.8,80.2 102.2,80.4 C121.1,89.3 148.9,86.3 160,84.6 C190.1,80 207.6,58.6 200.6,34.9 C197,22.7 187.8,12.7 174.7,6.5 C163,1 149.4,-0.8 135.5,1.4 C123.6,3.2 95,9.1 83.6,24 C83.6,24 83.5,24.1 83.5,24.1 C78.1,30.1 75.5,34.8 73.4,38.5 C70.7,43.3 69.3,45.9 64.1,47.9" id="Shape" stroke-linejoin="round"></path>
              <polyline id="Shape" points="79.4 29.1 102.5 81.1 102.5 91.7"></polyline>
              <path d="M1.4,62.8 C26.5,55.2 39.5,58.8 64.2,47.9 L73.6,54 L66.1,63 L66.1,74.2" id="Shape"></path>
              <path d="M11.8,76.4 L11.8,91.4 C11.8,91.4 52.3,73 67.6,74.1 C82.9,75.2 101.3,103 151.3,95.6 C201.3,88.2 202.2,46.3 202.2,46.3" id="Shape" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </svg>
        </g>
        <!-- The Ball -->
        <svg  width="37px" height="390px" x="130px" y="-30px" viewBox="0 0 50 50">
          <g id="loadingscreen_icon1-01" :transform="`translate(-120.000000, ${anim.ping.ballHeight})`" stroke="#FFFFFF" fill-rule="nonzero" stroke-width="1.5819" :fill="currentColor">
              <circle id="Oval" cx="138.6" cy="18.2" r="15"></circle>
          </g>
        </svg>

      </svg>
      <svg class="drum" viewBox="0 0 190 190" height="400px" width="400px" v-if="currentAnim==='drum'">
        <!-- DRUM  -->
        <svg version="1.1" stroke-width="1.5819" x="70" y="60"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
              width="49.1px" height="114px" viewBox="0 0 79.1 114" style="enable-background:new 0 0 79.1 114;"
            xml:space="preserve">
          <g transform="translate(0.000000, 1.000000)" stroke="#FFFFFF" stroke-width="1.5819">

          <path id="loading_page_1_" class="st0" d="M39.6,0c21.8,0,39.5,4.7,39.5,10.4S61.4,20.8,39.6,20.8S0.1,16.1,0.1,10.4S17.8,0,39.6,0z
            M19.5,55.5V29.1 M79,46.5L59.4,29.1l-20,27.8l-20-27.8L0,46.5c0,5.8,17.7,10.4,39.5,10.4S79,52.2,79,46.5V10.4l0.1,9.2
            c0,5.8-17.7,10.4-39.5,10.4S0.1,25.3,0.1,19.6v-9.2v36.1 M5.9,114l33.7-33.6L73.2,114L39.6,79.5v-24V30l20-0.9v26.4"/>
          </g>
        </svg>

        <!-- STICK 1  -->
222        <svg width="200px" height="200px" viewBox="0 0 400 400" x="11" y="11">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"  :transform="`rotate(${anim.drum.stick1})`" transform-origin="30 70">
              <svg x="80px" y="90px" id="DRUM-STICK_Mesa-de-trabajo-1-copia-2_Mesa-de-trabajo-1-copia-2" stroke="#FFFFFF" stroke-width="1.5819" fill-rule="no-zero" :fill="currentColor">
                  <path d="M0.6,0.6 L49.8,49.3 L0.6,0.6 Z M68.9,57.9 C68.9,64.2 63.8,69.4 57.4,69.4 C51,69.4 45.9,64.3 45.9,57.9 C45.9,51.5 51,46.4 57.4,46.4 C63.8,46.4 68.9,51.6 68.9,57.9 Z" id="Shape"></path>
              </svg>
          </g>
        </svg>

        <!-- STICK 2  -->
        <g transform="rotate(00)">
<svg width="200px" height="300px" viewBox="0 0 400 400" x="96" y="6">

   <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"  :transform="`rotate(${anim.drum.stick2})`" transform-origin="130 0">
       <svg id="DRUM-STICK2_Mesa-de-trabajo-1-copia-2_Mesa-de-trabajo-1-copia-2_Mesa-de-trabajo-1-copia-8" stroke="#FFFFFF" stroke-width="1.5819" fill-rule="no-zero" :fill="currentColor1" x="15px" y="0px">
           <path d="M19.6,49.3 L68.8,0.6 L19.6,49.3 Z M12.1,46.4 C18.4,46.4 23.6,51.5 23.6,57.9 C23.6,64.3 18.5,69.4 12.1,69.4 C5.7,69.4 0.6,64.3 0.6,57.9 C0.6,51.5 5.8,46.4 12.1,46.4 Z" id="Shape"></path>
       </svg>
   </g>
</svg>
        </g>

      </svg>
      <div class="scores">
        <div class="score">
          <span>score</span>
          <span class="data">{{paddedScoreString}}</span>
        </div>
        <div class="highscore">
          <span>High score</span>
          <span class="data">{{paddedHighScoreString}}</span>
        </div>
      </div>
      <div class="scores">
        <img width="50" eight="50" class="custom-user-avatar" :src="avatarUrl"/>
        <span class="data artist">Preset by {{nameArtist}}</span>
      </div>
      <div>
        <button class="button-next"
                @click="$emit('closesuccessoverlay')"
                ref="button"
                >KEEP TWEAKING</button>
        <button class="button-next"
                @click="$emit('next')"
                ref="button"
                >NEXT LEVEL</button>
      </div>
      <div class="credits">
        Game created by <a href="https://okbye.io" target="_blank"><span>Ok Bye</span></a>. Read the <a href="https://casestudies.okbye.io/tats/" target="_blank"><span>Case Study</span></a>.
      </div>
    </div>
  </div>
</template>

<script>
import { keyframes, easing } from "popmotion";
import {
  MODULE_OSCILLATOR_COLOR,
  MODULE_ENVELOPE_COLOR,
  MODULE_FILTER_COLOR,
  MODULE_LFO_COLOR,
  MODULE_DELAY_COLOR,
  MODULE_REVERB_COLOR
} from "@/constants";
import { color } from "style-value-types";
import padStart from "lodash/padStart";

export default {
  name: "Overlay",
  props: {
    level: {
      type: Number,
      default: 1
    },
    duration: {
      type: Number,
      default: 545
    }
  },
  data() {
    return {
      currentAnim: null,
      anim: {
        ping: {
          ballHeight: 0,
          racketTurn: 0,
          racketYOffset: 0
        },
        drum: {
          stick1: 0,
          stick2: 0
        }
      },
      colorArray: [],
      currentColor: "",
      currentColor1: "",
      litUpButton: false
    };
  },
  created() {
    // randomize animation:
    const currentAnimationNumber = Math.floor(
      Math.random() * Object.keys(this.anim).length
    );
    this.currentAnim = "drum";

    window.addEventListener("keydown", this.emitOnKey);
    this.colorArray.push(
      MODULE_OSCILLATOR_COLOR,
      MODULE_ENVELOPE_COLOR,
      MODULE_FILTER_COLOR,
      MODULE_LFO_COLOR,
      MODULE_DELAY_COLOR,
      MODULE_REVERB_COLOR
    );
    this.currentColor = this.changeColor(this.currentColor);
    this.currentColor1 = this.changeColor(this.currentColor1);
  },

  mounted() {
    let conf;
    let callback;

    if (this.currentAnim == "ping") {
      conf = {
        values: [
          { ballY: 0, racketRotate: 0, racketYOffset: 0, stick1: 0 },
          { ballY: -200, racketRotate: 12, racketYOffset: 15, stick1: 20 },
          { ballY: 0, racketRotate: 0, racketYOffset: 0, stick1: 0 }
        ],
        loop: Infinity,
        duration: this.duration,
        easings: [easing.easeOut, easing.easeIn, easing.lineair]
      };
      callback = {
        update: v => {
          this.anim.ping.ballHeight = v.ballY;
          this.anim.ping.racketTurn = v.racketRotate;
          this.anim.ping.racketYOffset = v.racketYOffset;
          // this.anim.drum.stick1 = v.stick1
          if (v.ballY == 0) {
            this.currentColor = this.changeColor();
          }
        },
        complete: () => {
          console.log("lalala");
        }
      };
    } else if (this.currentAnim == "drum") {
      conf = {
        values: [
          { stick1: 0, stick2: 20, time: 0 },
          { stick1: -20, stick2: 0, time: 1 },
          { stick1: 0, stick2: 20, time: 1 }
        ],
        loop: Infinity,
        duration: this.bpm * 9.90909090909, // 1090 = 110
        // easings: easing.cubicBezier(.29,.06,1,-0.24)
        easings: easing.easeIn
      };

      callback = {
        update: v => {
          this.anim.drum.stick1 = v.stick1;
          this.anim.drum.stick2 = v.stick2;
          if (v.stick1 === 0) {
            this.currentColor = this.changeColor(this.currentColor);
          }
          if (v.stick2 < 0.01) {
            this.currentColor1 = this.changeColor(this.currentColor1);
            // console.log(v.stick2)
          }
        },
        complete: () => {}
      };
    }
    keyframes(conf).start(callback);
    this.$refs.button.focus();
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.emitOnKey);
  },
  methods: {
    emitOnKey() {
      if (event.keyCode === 13) {
        this.$emit("next");
      }
    }
  },
  methods: {
    changeColor(current) {
      let randomColor = this.colorArray[
        Math.floor(Math.random() * this.colorArray.length)
      ];
      // does that even work?
      if (randomColor === current) {
        randomColor = this.colorArray[
          Math.floor(Math.random() * this.colorArray.length)
        ];
        // console.log('repeat!')
      }
      return randomColor;
    }
    // buttonLeave() {
    //   this.litUpButton = false;
    //   console.log(`the button leaft the building: ${this.changeColor(this.buttonColor)}`)
    //   this.buttonColor = this.changeColor(this.buttonColor)
    // },
  },
  computed: {
    bpm() {
      return this.$store.state.bpm;
    },
    nameArtist() {
      return this.$store.state.name;
    },
    avatarUrl() {
      return this.$store.state.avatarUrl;
    },
    gameScore() {
      return this.$store.state.gameState.score;
    },
    gameHighScore() {
      return this.$store.state.gameState.highScore;
    },
    paddedScoreString() {
      return `${padStart(this.gameScore, 5, "0")}`;
    },
    paddedHighScoreString() {
      return `${padStart(this.gameHighScore, 5, "0")}`;
    },
    gameLevel() {
      return this.$store.getters.displayedLevel;
    },
    computedRackedStyles() {
      return {
        "animation-name": "racket-movement",
        "animation-duration": "1s",
        "animation-iteration-count": "10",
        "animation-direction": "alternate" /* or: normal */,
        "animation-timing-function":
          "ease-out" /* or: ease, ease-in, ease-in-out, linear, cubic-bezier(x1, y1, x2, y2) */,
        "animation-fill-mode": "forwards" /* or: backwards, both, none */,
        "animation-delay": "2s" /* or: Xms */
      };
    }
  }
};
</script>

<style scoped lang="scss">
.drum {
  height: 60%;
  margin: -4% 0;
}

.custom-user-avatar {
  height: 50px;
  width: 50px;
  border-radius: 100%;
  border: 2px solid white;
}

.success {
  .scores {
    width: 20em;
    display: flex;
    justify-content: center;
    align-items: center;
    .artist {
      font-size: 1em;
      font-weight: 200;
      text-transform: uppercase;
      margin-left: 1em;
      a {
        color: white;
      }
    }
  }
  & .score {
    display: flex;
    font-size: 2em;
    flex-direction: column;
    width: 8em;
  }
  & .highscore {
    display: flex;
    font-size: 2em;
    flex-direction: column;
    width: 8em;
  }
  & span {
    font-size: 0.7em;
  }
  & .data {
    font-weight: 600;
    font-size: 1em;
  }
}

.score {
  & h2 {
    margin: 0.5rem;
  }
  & p {
    font-size: 2rem;
    margin: 0.5rem;
  }
}

.credits {
  font-size: 1em;
  font-weight: 200;
  & a {
    text-decoration: none;
    color: white;
    text-transform: uppercase;
    // transition: 0.6s all;
    &:hover {
      border-bottom: 1px solid white;
    }
    & span {
      color: #ff8574;
      text-decoration: none;
      font-weight: 600;
      font-size: 1em;
    }
  }
}
</style>
