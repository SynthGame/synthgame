<template>
  <div class="overlay">
    <div class="overlay--inner">
      <div class="overlay--title">Oooops!</div>
      <div class="overlay--description">You have made {{ attempts }} of 10 attempts.</div>
      <div class="overlay--description"><b>Listen</b> to the original audio</div>
      <button
        @click="closeoverlay"
        :class="['btn', 'btn_full', 'btn_stroke', 'btn_primary', {'is-disabled': timer > 0}]"
      >
        <span class="btn--inner">
          <span class="btn--inner-text">{{ timer > 0 ? timer : 'Try again' }}</span>
        </span>
      </button>
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

export default {
  name: "original-sound-overlay",
  props: {
    // level: {
    //   type: Number,
    //   default: 1
    // }
    closeoverlay: Function,
    retreat: Function,
    forfeit: Function
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
        drum: {}
      },
      colorArray: [],
      currentColor: "",
      attempts: this.$store.state.gameState.attempts
    };
  },
  mounted() {
    this.$store.commit("resetPreviewTimer");
    // this.anim[Math.floor(Math.random()*this.anim.length)]
    // console.log(this.anim[drum])
    this.currentAnim = Math.floor(Math.random() * this.anim.length);
    window.addEventListener("keydown", this.emitOnKey);
    this.colorArray.push(
      MODULE_OSCILLATOR_COLOR,
      MODULE_ENVELOPE_COLOR,
      MODULE_FILTER_COLOR,
      MODULE_LFO_COLOR,
      MODULE_DELAY_COLOR,
      MODULE_REVERB_COLOR
    );
    this.changeColor();
  },
  beforeDestroy() {
  },
  created() {
    // keyframes({
    //   values: [ // you can include anything here, jus values or '10px' or colors whatever
    //     { ballY: 0, racketRotate: 0, racketYOffset: 0},
    //     { ballY: -180, racketRotate: 12, racketYOffset: 20},
    //     { ballY: 0, racketRotate: 0, racketYOffset: 0}
    //   ],
    //   loop: Infinity,
    //   duration: 545,
    //   easings: [easing.easeOut, easing.easeIn, easing.lineair]
    // }).start({
    //   update: v => {
    //     this.anim.ping.ballHeight = v.ballY
    //     this.anim.ping.racketTurn = v.racketRotate
    //     this.anim.ping.racketYOffset = v.racketYOffset
    //     if (v.ballY == 0) {
    //       this.changeColor()
    //     }
    //   },
    //   complete: () => { console.log('lalala') }
    // })
  },
  methods: {
    changeColor() {
      // make sure they do not repeat:
      // let list = this.colorArray.splice(this.colorArray.indexOf(this.currentColor), 1)
      // do so they don't repeat list.splice( list.indexOf('foo'), 1 );
      this.currentColor = this.colorArray[
        Math.floor(Math.random() * this.colorArray.length)
      ];
    }
  },
  computed: {
    timer() {
      return this.$store.state.gameState.previewTimer;
    },
    previewClasses() {
      return this.timer > 0 ? "btn--inner is-disabled" : "btn--inner";
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
// .overlay {
//   position: fixed;
//   display: flex;
//   align-content: center;
//   justify-content: center;
//   z-index: 9998;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, .90);
//   transition: opacity .3s ease;
//   fill: none;
//   stroke: red;
//   stroke-width: 3;
//   & h1 {
//     text-transform: uppercase;
//   }
//   & h2 {
//     font-weight: 300;
//     font-size: 3em;
//     max-width: 13em;
//   }
// }

// .overlay-content-wrapper {
//   padding: 1rem;
//   display: flex;
//   height: 100%;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: center;
//   align-content: center;
// }

// .heading {
//   font-size: 4rem;
//   font-weight: 700;
//   margin-bottom: 1rem;
// }

// .subheading {
//   margin-top:0;
//   font-size: 3.5rem;
//   font-weight: 500
// }
// .button-next {
//     background: none;
//     color: inherit;
//     padding: 0;
//     font: inherit;
//     cursor: pointer;
//     outline: inherit;
//     padding: 1rem 2rem;
//   border: 1px solid white;
// }

// // ok, so apparently regular keyframes do not work unless defined somewhere higher:
// // https://stackoverflow.com/questions/47283989/why-are-css-keyframe-animations-broken-in-vue-components-with-scoped-styling
// // @keyframes racket-movement {
// //   0% { transform: rotate(0) }
// //   20% { transform: rotate(10deg)}
// //   50% { transform: rotate(20deg) }
// //   100% { transform: rotate(100%) }
// // }

//   .timer-text {
//     font-size: 1.3em;
//     padding: 30px;
//   }
</style>
