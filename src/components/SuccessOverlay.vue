<template>
  <div class="overlay">
    <div class="overlay-content-wrapper">
      <div>
        <h1>Level {{gameLevel}} cleared</h1>
        <h2>Your Score: {{gameScore}}</h2>
        <h2>High Score: {{gameHighScore}}</h2>
        <!-- <p class="score">Your current score: {{gameScore}}</p> -->
      </div>
      <svg :style="{'transform': ballHeight}" width="37px" height="37px" viewBox="0 0 37 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs></defs>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="loadingscreen_icon1-01" transform="translate(-120.000000, 0.000000)" stroke="#FFFFFF" fill-rule="nonzero" stroke-width="1.5819" fill="#FF8575">
                  <circle id="Oval" cx="138.6" cy="18.2" r="17.3"></circle>
              </g>
          </g>
      </svg>
    <svg version="1.1" :style="computedRackedStyles"
     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
     x="0px" y="0px" width="205px" height="104px" viewBox="0 0 203 98" style="enable-background:new 0 0 203 98;"
     xml:space="preserve">
    <path id="loading_page_1_" class="st0" d="M10.9,90.9L0,77.2l0.5-15l10.3,13.7c0,0,6-1.1,22.6-6.9c14.8-5.5,33.4-6.6,34.3-6.6
        c5.9,0.2,9.2,2.5,14.6,6.3c4.2,2.9,9.5,6.6,17.7,10.5c0.1,0,0.1,0,0.2,0.1c0.4,0.2,0.7,0.4,1.1,0.6c18.9,8.9,46.7,5.9,57.8,4.2
        c30.1-4.6,47.6-26,40.6-49.7c-3.6-12.2-12.8-22.2-25.9-28.4c-11.7-5.5-25.3-7.3-39.2-5.1c-11.9,1.8-40.5,7.7-51.9,22.6l-0.1,0.1
        c-5.4,6-8,10.7-10.1,14.4c-2.7,4.8-4.1,7.4-9.3,9.4 M78.5,28.5l23.1,52v10.7 M0.5,62.2c25.1-7.5,38.1-4,62.8-14.9l9.4,6.1l-7.4,9.1
        v11.2 M10.9,75.9v15c0,0,40.5-18.4,55.8-17.3s33.7,28.9,83.7,21.5s50.9-49.3,50.9-49.3"/>

    </svg>
    <!-- <p>Don't stop here!</p> -->
    <button class="button-next" @click="$emit('next')">NEXT LEVEL</button>
    </div>
  </div>
</template>

<script>
import { keyframes, easing } from 'popmotion'
import posed from 'vue-pose';

export default {
  name: "Overlay",
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      ballHeight: 0
    }
  },
  mounted() {
    window.addEventListener('keyup', this.emitOnKey)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.emitOnKey)
  },
  methods: {
    emitOnKey() {
      if (event.keyCode === 13) {
        this.$emit('next');
      }
    }
  },
  created() {
    keyframes({
      values: [ // you can include anything here, jus values or '10px' or colors whatever
        { x: 0, background: 'hsla(125, 100, 50, 1)' },
        { x: -60, background: 'hsla(20, 100, 60, 1)' },
        { x: 0, background: 'hsla(20, 100, 60, 1)' }
      ],
      loop: Infinity,
      duration: 1000,
      easings: [easing.easeOut, easing.easeIn, easing.lineair]
    }).start(v => this.ballHeight = `translateY(${v.x + 20}px)`)
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
    },
    computedRackedStyles() {
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
</style>
