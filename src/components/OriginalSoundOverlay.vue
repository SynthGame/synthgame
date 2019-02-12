<template>
  <div class="overlay">
    <div class="overlay-content-wrapper">
      <div>
        <h4>You have made {{ attempts }} of 25 attempts.</h4>
        <h3>Listen to the original audio</h3>
        <h3>{{ timer }}</h3>
        <span>
          <button class="button-next" @click="closeoverlay">Try again</button>
        </span>
        <span>
          <button class="button-next" @click="forfeit">Forfeit Level</button>
        </span>
      </div>
      <svg viewBox="0 0 250 250" height="400px" width="400px">
        <g :transform="`rotate(${anim.ping.racketTurn}) translate(0, ${anim.ping.racketYOffset})`">
          <svg version="1.1"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
          x="40px" y="100px" width="350px" height="127px"
          xml:space="preserve">
            <path id="loading_page_1_" class="st0" d="M10.9,90.9L0,77.2l0.5-15l10.3,13.7c0,0,6-1.1,22.6-6.9c14.8-5.5,33.4-6.6,34.3-6.6
                c5.9,0.2,9.2,2.5,14.6,6.3c4.2,2.9,9.5,6.6,17.7,10.5c0.1,0,0.1,0,0.2,0.1c0.4,0.2,0.7,0.4,1.1,0.6c18.9,8.9,46.7,5.9,57.8,4.2
                c30.1-4.6,47.6-26,40.6-49.7c-3.6-12.2-12.8-22.2-25.9-28.4c-11.7-5.5-25.3-7.3-39.2-5.1c-11.9,1.8-40.5,7.7-51.9,22.6l-0.1,0.1
                c-5.4,6-8,10.7-10.1,14.4c-2.7,4.8-4.1,7.4-9.3,9.4 M78.5,28.5l23.1,52v10.7 M0.5,62.2c25.1-7.5,38.1-4,62.8-14.9l9.4,6.1l-7.4,9.1
                v11.2 M10.9,75.9v15c0,0,40.5-18.4,55.8-17.3s33.7,28.9,83.7,21.5s50.9-49.3,50.9-49.3"/>

          </svg>
        </g>
        <svg  width="37px" height="390px" x="145px" y="-35px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="loadingscreen_icon1-01" :transform="`translate(-120.000000, ${anim.ping.ballHeight})`" stroke="#FFFFFF" fill-rule="nonzero" stroke-width="1.5819" :fill="currentColor">
                    <circle id="Oval" cx="138.6" cy="18.2" r="17.3"></circle>
                </g>
        </svg>
      </svg>
    </div>
  </div>
</template>

<script>
import { keyframes, easing } from 'popmotion'
import { MODULE_OSCILLATOR_COLOR, MODULE_ENVELOPE_COLOR, MODULE_FILTER_COLOR, MODULE_LFO_COLOR, MODULE_DELAY_COLOR, MODULE_REVERB_COLOR } from '@/constants'
import { color } from 'style-value-types'

export default {
  name: 'original-sound-overlay',
  props: {
    // level: {
    //   type: Number,
    //   default: 1
    // }
    closeoverlay: Function,
    retreat: Function,
    forfeit: Function,
    timer: Number,
  },
  data () {
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
      currentColor: '',
      attempts: this.$store.state.gameState.attempts,
    }
  },
  created () {
  },
  mounted () {
    // this.anim[Math.floor(Math.random()*this.anim.length)]
    // console.log(this.anim[drum])
    this.currentAnim = Math.floor(Math.random() * this.anim.length)
    window.addEventListener('keydown', this.emitOnKey)
    this.colorArray.push(MODULE_OSCILLATOR_COLOR, MODULE_ENVELOPE_COLOR, MODULE_FILTER_COLOR, MODULE_LFO_COLOR, MODULE_DELAY_COLOR, MODULE_REVERB_COLOR)
    this.changeColor()
  },
  beforeDestroy () {

  },
  methods: {

  },
  created () {
    keyframes({
      values: [ // you can include anything here, jus values or '10px' or colors whatever
        { ballY: 0, racketRotate: 0, racketYOffset: 0},
        { ballY: -180, racketRotate: 12, racketYOffset: 20},
        { ballY: 0, racketRotate: 0, racketYOffset: 0}
      ],
      loop: Infinity,
      duration: 545,
      easings: [easing.easeOut, easing.easeIn, easing.lineair]
    }).start({
      update: v => {
        this.anim.ping.ballHeight = v.ballY
        this.anim.ping.racketTurn = v.racketRotate
        this.anim.ping.racketYOffset = v.racketYOffset
        if (v.ballY == 0) {
          this.changeColor()
        }
      },
      complete: () => { console.log('lalala') }
    })
  },
  methods: {
    changeColor () {
      // make sure they do not repeat:
      // let list = this.colorArray.splice(this.colorArray.indexOf(this.currentColor), 1)
      // do so they don't repeat list.splice( list.indexOf('foo'), 1 );
      this.currentColor = this.colorArray[Math.floor(Math.random() * this.colorArray.length)]
    }
  },
  computed: {
    computedRackedStyles () {
      return {'animation-name': 'racket-movement',
        'animation-duration': '1s',
        'animation-iteration-count': '10',
        'animation-direction': 'alternate', /* or: normal */
        'animation-timing-function': 'ease-out', /* or: ease, ease-in, ease-in-out, linear, cubic-bezier(x1, y1, x2, y2) */
        'animation-fill-mode': 'forwards', /* or: backwards, both, none */
        'animation-delay': '2s' /* or: Xms */}
    }

  }
}
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  display: flex;
  align-content: center;
  justify-content: center;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .90);
  transition: opacity .3s ease;
  fill: none;
  stroke: red;
  stroke-width: 3;
  & h1 {
    text-transform: uppercase;
  }
  & h2 {
    font-weight: 300;
    font-size: 3em;
    max-width: 13em;
  }
}

.overlay-content-wrapper {
  padding: 1rem;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  align-content: center;
}

.heading {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.subheading {
  margin-top:0;
  font-size: 3.5rem;
  font-weight: 500
}
.button-next {
    background: none;
    color: inherit;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    padding: 1rem 2rem;
  border: 1px solid white;
}

// ok, so apparently regular keyframes do not work unless defined somewhere higher:
// https://stackoverflow.com/questions/47283989/why-are-css-keyframe-animations-broken-in-vue-components-with-scoped-styling
// @keyframes racket-movement {
//   0% { transform: rotate(0) }
//   20% { transform: rotate(10deg)}
//   50% { transform: rotate(20deg) }
//   100% { transform: rotate(100%) }
// }

  .timer-text {
    font-size: 1.3em;
    padding: 30px;
  }
</style>
