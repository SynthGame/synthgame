<template>
  <div class="overlay">
    <div class="overlay-content-wrapper">
      <div>
        <p class="game-over-text">GAME<br/>
        OVER</p>
      </div>

      </svg>
      <svg viewBox="0 0 190 190" height="400px" width="400px">
        <!-- DRUM  -->
        <svg version="1.1" stroke-width="1.5819" x="55" y="80"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
              width="79.1px" height="114px" viewBox="0 0 79.1 114" style="enable-background:new 0 0 79.1 114;"
            xml:space="preserve">
          <g transform="translate(0.000000, 1.000000)" stroke="#FFFFFF" stroke-width="1.5819">

          <path id="loading_page_1_" class="st0" d="M39.6,0c21.8,0,39.5,4.7,39.5,10.4S61.4,20.8,39.6,20.8S0.1,16.1,0.1,10.4S17.8,0,39.6,0z
            M19.5,55.5V29.1 M79,46.5L59.4,29.1l-20,27.8l-20-27.8L0,46.5c0,5.8,17.7,10.4,39.5,10.4S79,52.2,79,46.5V10.4l0.1,9.2
            c0,5.8-17.7,10.4-39.5,10.4S0.1,25.3,0.1,19.6v-9.2v36.1 M5.9,114l33.7-33.6L73.2,114L39.6,79.5v-24V30l20-0.9v26.4"/>
          </g>
        </svg>

        <!-- STICK 1  -->
        <svg width="200px" height="200px" viewBox="0 0 350 350" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"  :transform="`rotate(${anim.drum.stick1})`" transform-origin="30 70">
              <svg x="80px" y="90px" id="DRUM-STICK_Mesa-de-trabajo-1-copia-2_Mesa-de-trabajo-1-copia-2" stroke="#FFFFFF" stroke-width="1.5819" fill-rule="no-zero" :fill="currentColor">
                  <path d="M0.6,0.6 L49.8,49.3 L0.6,0.6 Z M68.9,57.9 C68.9,64.2 63.8,69.4 57.4,69.4 C51,69.4 45.9,64.3 45.9,57.9 C45.9,51.5 51,46.4 57.4,46.4 C63.8,46.4 68.9,51.6 68.9,57.9 Z" id="Shape"></path>
              </svg>
          </g>
        </svg>

        <!-- STICK 2  -->
        <g transform="rotate(00)">
<svg width="200px" height="300px" viewBox="0 0 350 400" x="100px" y="18px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

   <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"  :transform="`rotate(${anim.drum.stick2})`" transform-origin="130 0">
       <svg id="DRUM-STICK2_Mesa-de-trabajo-1-copia-2_Mesa-de-trabajo-1-copia-2_Mesa-de-trabajo-1-copia-8" stroke="#FFFFFF" stroke-width="1.5819" fill-rule="no-zero" :fill="currentColor1" x="15px" y="0px">
           <path d="M19.6,49.3 L68.8,0.6 L19.6,49.3 Z M12.1,46.4 C18.4,46.4 23.6,51.5 23.6,57.9 C23.6,64.3 18.5,69.4 12.1,69.4 C5.7,69.4 0.6,64.3 0.6,57.9 C0.6,51.5 5.8,46.4 12.1,46.4 Z" id="Shape"></path>
       </svg>
   </g>
</svg>
        </g>

      </svg>

    <button class="button-next"
            ref="button"
            @click="startAgain"
            @mouseover="litUpButton=true"
            @mouseout="buttonLeave"
            :style="{'background-color': litUpButton ? buttonColor: ''}">GO AGAIN</button>
    </div>
  </div>
</template>

<script>
import { keyframes, easing } from 'popmotion'
import { MODULE_OSCILLATOR_COLOR, MODULE_ENVELOPE_COLOR, MODULE_FILTER_COLOR, MODULE_LFO_COLOR, MODULE_DELAY_COLOR, MODULE_REVERB_COLOR } from '@/constants'
import { color } from 'style-value-types';

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
  data () {
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
        },
      },
      colorArray: [],
      currentColor: '',
      currentColor1: '',
      buttonColor: '',
      litUpButton: false
    }
  },
  created() {
    // randomize animation:
    const currentAnimationNumber = Math.floor(Math.random()*Object.keys(this.anim).length)
    this.currentAnim = Object.keys(this.anim)[currentAnimationNumber]

    window.addEventListener('keyup', this.emitOnKey)
    this.colorArray.push(MODULE_OSCILLATOR_COLOR, MODULE_ENVELOPE_COLOR, MODULE_FILTER_COLOR, MODULE_LFO_COLOR, MODULE_DELAY_COLOR, MODULE_REVERB_COLOR)
    this.buttonColor = this.changeColor(this.buttonColor)
    this.currentColor = this.changeColor(this.currentColor)
    this.currentColor1 = this.changeColor(this.currentColor1)

  },

  mounted() {
    let conf;
    let callback;

    if (this.currentAnim == 'ping') {
      conf = {
        values: [
          { ballY: 0, racketRotate: 0, racketYOffset: 0, stick1: 0},
          { ballY: -200, racketRotate: 12, racketYOffset: 15, stick1: 20},
          { ballY: 0, racketRotate:0 , racketYOffset: 0, stick1: 0}
        ],
        loop: Infinity,
        duration: this.duration,
        easings: [easing.easeOut, easing.easeIn, easing.lineair]
      }
      callback = {
        update: v => {
          this.anim.ping.ballHeight = v.ballY
          this.anim.ping.racketTurn = v.racketRotate
          this.anim.ping.racketYOffset = v.racketYOffset
          // this.anim.drum.stick1 = v.stick1
          if (v.ballY == 0) {
            this.currentColor = this.changeColor()
          }
        },
        complete: () => {console.log('lalala')}
      }
    } else if (this.currentAnim == 'drum') {
      conf = {
        values: [
          { stick1: 0, stick2: 20, time: 0},
          { stick1: -20, stick2: 0, time: 1},
          { stick1: 0, stick2: 20, time: 1},
        ],
        loop: 1,
        duration: this.duration*2,
        easings: easing.cubicBezier(.29,.06,1,-0.24)
      }

      callback = {
        update: v => {
          this.anim.drum.stick1 = v.stick1
          this.anim.drum.stick2 = v.stick2
          if (v.stick1 === 0) {
            this.currentColor = this.changeColor(this.currentColor)
            console.log(`this.currentColor changed!`)
          }
          if (v.stick2 < 0.1) {
            this.currentColor1 = this.changeColor(this.currentColor1)
            console.log(`this.currentColor1 changed!`)
          }
        },
        complete: () => {}
      }
    }
    keyframes(conf).start(callback)
    this.$refs.button.focus()
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.emitOnKey)
  },
  methods:{
    emitOnKey() {
      if (event.keyCode === 13) {
        this.$emit('next');
      }
    },
    changeColor(current) {
      let randomColor = this.colorArray[Math.floor(Math.random()*this.colorArray.length)]
      // does that even work?
      if (randomColor===current) {
        randomColor = this.colorArray[Math.floor(Math.random()*this.colorArray.length)]
        console.log('repeat!')
      }
      return randomColor
    },
    buttonLeave() {
      this.litUpButton = false;
      console.log(`the button leaft the building: ${this.changeColor(this.buttonColor)}`)
      this.buttonColor = this.changeColor(this.buttonColor)
    },
    startAgain() {
      this.$emit('startagain')
    }
  },
  computed: {
    gameScore () {
      return this.$store.state.gameState.score
    },
    gameHighScore () {
      return this.$store.state.gameState.highScore
    },
    gameLevel () {
      return this.$store.state.gameState.level
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
  stroke: white;
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

.game-over-text {
  font-size: 6rem;
  margin: 1rem;
  font-weight: 200;
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
    font-size: 2.5rem;
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
</style>
