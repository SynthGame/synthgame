<template>

    <div class="display" ref="displayWrapper">
      <svg width="100%" height="100%">
        <rect :fill="fill" width="100%" height="100%" />

        <path stroke="black"
              :stroke-width="strokeWidth"
              :d="path"
              fill="black"
              style="fill-rule: nozero"
              />

        <path v-if="this.module === 'oscillator' || this.module === 'filter' || this.module === 'envelope' || this.module === 'delay'"
              stroke="white"
              :stroke-width="2"
              :d="pathGoal"
              fill="none"
              style="fill-rule: nozero"
              />

        <!-- lfo: -->
        <!--positioning wrapperfix -->
        <svg :viewBox="swingViewport" ref="swing">

        <!-- the swing: -->
        <g v-if="this.module === 'lfo'"
          stroke="black"
          :style="swingStyle"
                          >
          <path
            :stroke-width="1"
            fill="black"
            :d="'m 0,'+ (-displayHeight/2)+
                ' v ' + (displayHeight)
                "/>

                <circle :cx="0" :cy="displayHeight*0.6" :r="displayHeight/4"/>
          </g>
        </svg>

        <text x="45%" y="40%" fill="transparent">
          <tspan x="45%" y="50%">{{knobs[0].name}}: {{knobs[0].value}}</tspan>
          <tspan x="45%" y="60%">{{knobs[1].name}}: {{knobs[1].value}}</tspan>
          <tspan x="45%" y="70%">{{knobs[2].name}}: {{knobs[2].value}}</tspan>
          <tspan x="45%" y="80%" v-if="this.knobs[3]">{{knobs[3].name}}: {{knobs[3].value}}</tspan>
        </text>
        <text v-if="this.module === 'oscillator' || 'filter'" fill="transparent">
          <tspan x="0%" y="50%">{{knobs[4].name}}: {{knobs[4].value}}</tspan>
          <tspan x="0%" y="60%">{{knobs[5].name}}: {{knobs[5].value}}</tspan>
          <tspan x="0%" y="70%">{{knobs[6].name}}: {{knobs[6].value}}</tspan>
          <tspan x="0%" y="80%" v-if="this.knobs[7]">{{knobs[7].name}}: {{knobs[7].value}}</tspan>
        </text>
      </svg>
    </div>

</template>

<script>
import store from '../store'; // path to your Vuex store

// TODO:
// [v]. translate the values so they work properly
// [v]. Gain
// [v]. turn the curve from the cubic one to quadratic
// [v]. make the lowpass & highpass one method
// [v]. do something about the colors

// [v] REDISiGN in accrodance with knobs !!
// [v] embed into modules
// [v] trying to move them back together

// ===============
// [v] the required margin data object and path
// [v] have the other knobs connected to the filter audio output
// [v] relativize and clean up the path drawing function (inc. the curve "global" variable)

// lfo:
// [v] create swing
// [v] have it move for sine - but it is hardcoded
// [x] have two other types
// [v] lfo prop watched/computed
// [v] transition
// [x] stylesheetapi
//http://danielcwilson.com/blog/2017/10/all-the-transform-ways/ - does not work, the properties are not recognized
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
// [~] try transitions: define two kinds of transforms with class and switch between them
// [v] a bit more complicated : set interval with a callback function changing a bolean data property every given time, watch changes in the rate knob to call a function replacing the current interval time with a new one. Custom transition bound and used to indicate LFO's shape
// STILL TODO:
// [] bug: the swing does not update when the knob is held/ slowly turned
// [] sawtooth timing
// [v] cleanup

// delay:
// [v] drynevss shall be controlling y positioning of all the elements

export default {
  name: 'display',
  props: {
    module: {
      type: String
    },
    fill: {
      type: String
    },
    knobs: {
      type: Array,
      default () { return [] }
    },
  },
  data () {
    return {
      // default values to not have the calculation derail at created()
      displayHeight: 300,
      displayWidth: 600,
      curveAmnt: 90,
      strokeWidth: '0.1',
      lfoRotation: 20,
      shouldItGoRight: false,
      intervalId: null
    }
  },
  mounted () {
    console.log('display: mounted!', this.module)
    // update dimentions:
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions())
    if (this.module == 'lfo') {
      var intervalTest =  setInterval(this.updateSeconds, 1000)
      this.intervalId = intervalTest
    }
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.updateDimensions())
  },
  methods: {
    updateSeconds() {
     this.shouldItGoRight=!this.shouldItGoRight
    },

    changeInterval(time) {
     clearInterval(this.intervalId)
      this.intervalId = setInterval(this.updateSeconds, time)
    },
    updateDimensions () {
      this.displayHeight = this.$refs.displayWrapper.clientHeight
      this.displayWidth = this.$refs.displayWrapper.clientWidth
    },

    drawDelayBar (space,  width, number) {
      // the function is used to draw a bar in delay basing on a numer of variables
      // space is spaceBetween
      // width is the arbitrary width of a bar
      // number is used as a multiplier to deal with changing height of bars when dry
      // goes together with wetness.

      // how high should the bars be?
      const basicBarHeight = this.displayHeight*0.9

      // how much smaller should consective bars be?
      const diff = basicBarHeight*((number/12))

      const bar = ' h ' + space +
                  ' v ' + (-(basicBarHeight-diff)) +
                  ' h ' + width +
                  ' v ' + (basicBarHeight-diff)
      return bar
    },
  },
  computed: {
    // used to refer to LFO rate knob in a watcher (no way to do it directly using because of "[...]")
    lfoValue() {
      return this.knobs[0].value
    },
    path () {
      let line

      if (this.module === 'envelope') {
        // helpers:
        let fourthOfWidth = this.displayWidth / 4

        const attack = this.knobs[0]
        const decay = this.knobs[1]
        const sustain = this.knobs[2]
        const release = this.knobs[3]

        const attackXPosition = (attack.value / attack.max) * fourthOfWidth
        const attackYPosition = this.displayHeight * 0.75
        const decayXPosition = (decay.value / decay.max) * fourthOfWidth

        // the vertical decay position shall include a fix stopping it
        // from going all the way down (5% height) to perserve release indication:
        const decayYPosition = (1 - (sustain.value / sustain.max)) * (attackYPosition) - (1 - (sustain.value / sustain.max)) * (attackYPosition) * 0.05
        // no sustain, as it basically a horizontal line
        // release is known and shall be market with absolute position

        // svg path:
        line = 'M 0, ' + (this.displayHeight + 1) +
              ' l ' + attackXPosition + ', ' + (-attackYPosition) + ' ' +
              ' l ' + decayXPosition + ', ' + decayYPosition + ' ' +
              // a horizontal line representing sustain level including a fix regarding adding the release:
              ' h ' + (this.displayWidth - attackXPosition - decayXPosition - (((release.value / release.max)) * fourthOfWidth)) +
              // release end position:
              ' L ' + this.displayWidth + ', ' + (this.displayHeight + 1) + ' ' +
              ' Z'
      }

      if (this.module === 'filter') {
        // helpers:
        const type = this.knobs[0]
        const cutOffFreq = this.knobs[1]
        const q = this.knobs[2]
        const gain = this.knobs[3]

        let halfHeight = this.displayHeight / 2
        let halfWidth = this.displayWidth / 2
        const gainAddedDistance = ((gain.value / gain.max) * halfHeight) - 5
        const yOffset = 0
        const qDistance = (1 - (q.value / q.max)) * (halfWidth)
        const freqDistance = (cutOffFreq.value / cutOffFreq.max) * (halfWidth)

        // svg path:
        if (type.value === 'lowpass') {
          line = 'M 0,' + (this.displayHeight + 1) +
                ' v ' + (-(halfHeight + gainAddedDistance - yOffset)) +
                ' h ' + (freqDistance) +
                ' h ' + ((q.value / q.max) * (halfWidth) / 2) +
                ' q ' + (qDistance / 2) + ', 0 ' +
                      +qDistance + ', ' + (halfHeight + gainAddedDistance) +

                ' Z'
        } else if (type.value === 'highpass') {
          line = 'M 0,' + (this.displayHeight + 1) +
                ' h ' + freqDistance +
                ' h ' + ((q.value / q.max) * (halfWidth) / 2) +
                ' q ' + (qDistance / 2) + ', ' + (-(halfHeight + gainAddedDistance)) + ' ' +
                          qDistance + ', ' + (-(halfHeight + gainAddedDistance)) +
                ' h ' + this.displayWidth +
                ' v ' + this.displayHeight +
                ' Z'
        } else if (type.value === 'bandpass') {
          line = 'M 0, ' + (this.displayHeight + 1) +
                ' h ' + (freqDistance + (halfWidth / 2) - qDistance) +
                ' q ' + (qDistance / 2) + ', ' + (-(halfHeight + gainAddedDistance)) + ' ' +
                        qDistance + ', ' + (-(halfHeight + gainAddedDistance)) +
                ' q ' + (qDistance / 2) + ', 0 ' +
                        qDistance + ', ' + (halfHeight + gainAddedDistance) + ' ' +
                ' Z '
        }
      }

      if (this.module === 'oscillator') {
        // helpers:
        const octave = this.knobs[0]
        const detune = this.knobs[1]
        const phase = this.knobs[2]
        const type = this.knobs[3]

        const lineLength = 1.5 * this.displayWidth
        const yAxisMiddle = this.displayHeight / 2
        const h = yAxisMiddle / 2


        const octaveRatio = (octave.value/(octave.max-octave.min))
        const detuneRatio = ((detune.value/detune.max)*1000)/(octave.max-octave.min)

        const iteration = 6.6 * h - h * (4.9 * octaveRatio) + (h * 0.3 * (1 - detuneRatio))

        let wave
        // square:
        if (type.value === 'square') {
          wave = ' v ' + h +
                 ' h ' + iteration +
                 ' v ' + (-yAxisMiddle) +
                 ' h ' + iteration +
                 ' v ' + h
        // sine:
        } else if (type.value === 'sine') {
          wave = ' q ' + '0, ' + h + ' ' + iteration / 2 + ', ' + h +
                 ' q ' + iteration / 2 + ', 0 ' + iteration / 2 + ', ' + (-h) +
                 ' q 0, ' + (-h) + ' ' + iteration / 2 + ' ' + (-h) +
                 ' q ' + iteration / 2 + ', 0 ' + ' ' + iteration / 2 + ' ' + h
        // sawtooth:
        } else if (type.value === 'sawtooth') {
          wave = ' v ' + h +
                 ' l ' + 2 * iteration + ', ' + (-yAxisMiddle) +
                 ' v ' + h
        // triangle
        } else if (type.value === 'triangle') {
          wave = ' l ' + iteration / 2 + ', ' + h +
                 ' l ' + iteration + ', ' + (-yAxisMiddle) +
                 ' l ' + iteration / 2 + ', ' + h
        }
        line = 'M ' + iteration * (phase.value / (phase.max)) + ', 0 ' +
              ' m ' + lineLength + ', ' + yAxisMiddle +
              ' h ' + (-lineLength - iteration) +
              wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave +wave + wave + wave + wave + wave + wave +
              wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave +wave + wave + wave + wave + wave + wave +
              wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave +wave + wave + wave + wave + wave + wave +
              ' Z '
      }

      if (this.module === 'lfo') {

        // NON OF THE BELOW PRESENETED APPROACHED WORKED (and should be deleted)
        // used a custom svg in the template

        // helpers:
        const r = this.displayHeight / 4
        const rate = this.knobs[0]
        const amount = this.knobs[1]
        const shape = this.knobs[2]

        line = ''

      }

      if (this.module === 'delay') {
        // helpers:
        const time = this.knobs[0]
        const feedback = this.knobs[1]
        const wet = this.knobs[2]

        const feedbackRatio = feedback.value/(feedback.max-feedback.min)
        const timeRatio = time.value/(time.max-time.min)
        const wetRatio = wet.value/(wet.max-wet.min)

        const barWidth = 15
        const spaceBetween = timeRatio*this.displayWidth/3 + 15

        line = 'M 0, 0 ' +
               'm 0, ' + (this.displayHeight+this.displayHeight*(1-wetRatio)) +
               this.drawDelayBar(spaceBetween, barWidth, 0) +

               // DRY-nasty, sure
               // the 7.142... number is a result of 100/14
               ((feedbackRatio > 7.142857143*2/100) ? this.drawDelayBar(spaceBetween, barWidth, 1):'') +
               ((feedbackRatio > 7.142857143*3/100) ? this.drawDelayBar(spaceBetween, barWidth, 2):'') +
               ((feedbackRatio > 7.142857143*4/100) ? this.drawDelayBar(spaceBetween, barWidth, 3):'') +
               ((feedbackRatio > 7.142857143*5/100) ? this.drawDelayBar(spaceBetween, barWidth, 4):'') +
               ((feedbackRatio > 7.142857143*6/100) ? this.drawDelayBar(spaceBetween, barWidth, 5):'') +
               ((feedbackRatio > 7.142857143*7/100) ? this.drawDelayBar(spaceBetween, barWidth, 6):'') +
               ((feedbackRatio > 7.142857143*8/100) ? this.drawDelayBar(spaceBetween, barWidth, 7):'') +
               ((feedbackRatio > 7.142857143*9/100) ? this.drawDelayBar(spaceBetween, barWidth, 8):'') +
               ((feedbackRatio > 7.142857143*10/100) ? this.drawDelayBar(spaceBetween, barWidth, 9):'') +
               ((feedbackRatio > 7.142857143*11/100) ? this.drawDelayBar(spaceBetween, barWidth, 10):'') +
               ((feedbackRatio > 7.142857143*12/100) ? this.drawDelayBar(spaceBetween, barWidth, 11):'') +
               ((feedbackRatio > 7.142857143*13/100) ? this.drawDelayBar(spaceBetween, barWidth, 12):'')


      }
      if (this.module === 'reverb') {
        // helpers:

        line = ''

      }
      return line
    },

    swingViewport() {
      return (0-this.displayWidth/2) + ' 0 ' + this.displayWidth + ' ' + this.displayHeight
    },
    swingStyle() {
      // helpers:
      const rate = this.knobs[0]
      const amount = this.knobs[1]
      const shape = this.knobs[2]

      const rateRatio = (rate.value/(rate.max-rate.min))
      const amountRatio = (amount.value/(amount.max-amount.min))

      const realFreq = this.knobs[3].value

      const transitionTime = ( 1 / (realFreq) )
      const rotateAmnt = 50

      let transitionString;
      // differenciate shapes using transitions:
      if (shape.value=='sine') {
        transitionString = transitionTime+'s'
      } else if (shape.value == 'square') {
        transitionString =''
      } else if (shape.value == 'sawtooth') {
        if (!this.shouldItGoRight) {
          transitionString = transitionTime*2+'s linear'
        }
        else {
          transitionString = ''
        }
      } else if (shape.value == 'triangle') {
        transitionString = transitionTime+'s linear'
      }
      let rotateAmount = 2500*amountRatio;
      let rotateString
      if (this.shouldItGoRight){
        // go right:
        rotateString = 'rotate('+rotateAmount+'deg)'
      } else {
        // go left:
        rotateString = 'rotate(-'+rotateAmount+'deg)'
      }
      return {transform: rotateString, transition: transitionString }
    },
    pathGoal () {
      let line

      if (this.module === 'delay') {
        // helpers:
        const time = this.knobs[4]
        const feedback = this.knobs[5]
        const wet = this.knobs[6]

        const feedbackRatio = feedback.value/(feedback.max-feedback.min)
        const timeRatio = time.value/(time.max-time.min)
        const wetRatio = wet.value/(wet.max-wet.min)

        const barWidth = 0
        const spaceBetween = timeRatio*this.displayWidth/3 + 30

        line = 'M 0, 0 ' +
               'm 0, ' + (this.displayHeight+this.displayHeight*(1-wetRatio)) +
               this.drawDelayBar((spaceBetween - 7.5), barWidth, 0) +

               // DRY-nasty, sure
               // the 7.142... number is a result of 100/14
               ((feedbackRatio > 7.142857143*2/100) ? this.drawDelayBar(spaceBetween, barWidth, 1):'') +
               ((feedbackRatio > 7.142857143*3/100) ? this.drawDelayBar(spaceBetween, barWidth, 2):'') +
               ((feedbackRatio > 7.142857143*4/100) ? this.drawDelayBar(spaceBetween, barWidth, 3):'') +
               ((feedbackRatio > 7.142857143*5/100) ? this.drawDelayBar(spaceBetween, barWidth, 4):'') +
               ((feedbackRatio > 7.142857143*6/100) ? this.drawDelayBar(spaceBetween, barWidth, 5):'') +
               ((feedbackRatio > 7.142857143*7/100) ? this.drawDelayBar(spaceBetween, barWidth, 6):'') +
               ((feedbackRatio > 7.142857143*8/100) ? this.drawDelayBar(spaceBetween, barWidth, 7):'') +
               ((feedbackRatio > 7.142857143*9/100) ? this.drawDelayBar(spaceBetween, barWidth, 8):'') +
               ((feedbackRatio > 7.142857143*10/100) ? this.drawDelayBar(spaceBetween, barWidth, 9):'') +
               ((feedbackRatio > 7.142857143*11/100) ? this.drawDelayBar(spaceBetween, barWidth, 10):'') +
               ((feedbackRatio > 7.142857143*12/100) ? this.drawDelayBar(spaceBetween, barWidth, 11):'') +
               ((feedbackRatio > 7.142857143*13/100) ? this.drawDelayBar(spaceBetween, barWidth, 12):'')

        return line
      }

      if (this.module === 'envelope') {
        // helpers:
        let fourthOfWidth = this.displayWidth / 4

        const attack = this.knobs[4]
        const decay = this.knobs[5]
        const sustain = this.knobs[6]
        const release = this.knobs[7]

        const attackXPosition = (attack.value / attack.max) * fourthOfWidth
        const attackYPosition = this.displayHeight * 0.75
        const decayXPosition = (decay.value / decay.max) * fourthOfWidth

        // the vertical decay position shall include a fix stopping it
        // from going all the way down (5% height) to perserve release indication:
        const decayYPosition = (1 - (sustain.value / sustain.max)) * (attackYPosition) - (1 - (sustain.value / sustain.max)) * (attackYPosition) * 0.05
        // no sustain, as it basically a horizontal line
        // release is known and shall be market with absolute position

        // svg path:
        line = 'M 0, ' + (this.displayHeight + 1) +
              ' l ' + attackXPosition + ', ' + (-attackYPosition) + ' ' +
              ' l ' + decayXPosition + ', ' + decayYPosition + ' ' +
              // a horizontal line representing sustain level including a fix regarding adding the release:
              ' h ' + (this.displayWidth - attackXPosition - decayXPosition - (((release.value / release.max)) * fourthOfWidth)) +
              // release end position:
              ' L ' + this.displayWidth + ', ' + (this.displayHeight + 1) + ' '
      }

      if (this.module === 'filter') {
        // helpers:
        const type = this.knobs[4]
        const cutOffFreq = this.knobs[5]
        const q = this.knobs[6]
        const gain = this.knobs[7]

        let halfHeight = this.displayHeight / 2
        let halfWidth = this.displayWidth / 2
        const gainAddedDistance = ((gain.value / gain.max) * halfHeight) - 5
        const yOffset = 0
        const qDistance = (1 - (q.value / q.max)) * (halfWidth)
        const freqDistance = (cutOffFreq.value / cutOffFreq.max) * (halfWidth)

        // svg path:
        if (type.value === 'lowpass') {
          line = 'M 0,' + ((this.displayHeight + 1) - (halfHeight + gainAddedDistance - yOffset)) +
                // ' v ' + (-(halfHeight + gainAddedDistance - yOffset)) +
                ' h ' + (freqDistance) +
                ' h ' + ((q.value / q.max) * (halfWidth) / 2) +
                ' q ' + (qDistance / 2) + ', 0 ' +
                      +qDistance + ', ' + (halfHeight + gainAddedDistance)
        } else if (type.value === 'highpass') {
          line = 'M' + (freqDistance + ((q.value / q.max) * (halfWidth) / 2)) + ', ' + (this.displayHeight + 1) +
                ' q ' + (qDistance / 2) + ', ' + (-(halfHeight + gainAddedDistance)) + ' ' +
                          qDistance + ', ' + (-(halfHeight + gainAddedDistance)) +
                ' h ' + this.displayWidth +
                ' v ' + this.displayHeight
        } else if (type.value === 'bandpass') {
          line = 'M' + (freqDistance + (halfWidth / 2) - qDistance) + ', ' + (this.displayHeight + 1) +
                ' q ' + (qDistance / 2) + ', ' + (-(halfHeight + gainAddedDistance)) + ' ' +
                        qDistance + ', ' + (-(halfHeight + gainAddedDistance)) +
                ' q ' + (qDistance / 2) + ', 0 ' +
                        qDistance + ', ' + (halfHeight + gainAddedDistance) + ' '
        }
      }

      if (this.module === 'oscillator') {
        // helpers:
        const octave = this.knobs[4]
        const detune = this.knobs[5]
        const phase = this.knobs[6]
        const type = this.knobs[7]

        const lineLength = 1.5 * this.displayWidth
        const yAxisMiddle = this.displayHeight / 2
        const h = yAxisMiddle / 2

        const octaveRatio = (octave.value/(octave.max-octave.min))
        const detuneRatio = ((detune.value/detune.max)*1000)/(octave.max-octave.min)

        const iteration = 6.6 * h - h * (4.9 * octaveRatio) + (h * 0.3 * (1 - detuneRatio))

        let wave
        // square:
        if (type.value === 'square') {
          wave = ' v ' + h +
                 ' h ' + iteration +
                 ' v ' + (-yAxisMiddle) +
                 ' h ' + iteration +
                 ' v ' + h
        // sine:
        } else if (type.value === 'sine') {
          wave =
                ' q ' + '0, ' + h + ' ' + iteration / 2 + ', ' + h +
                 ' q ' + iteration / 2 + ', 0 ' + iteration / 2 + ', ' + (-h) +
                 ' q 0, ' + (-h) + ' ' + iteration / 2 + ' ' + (-h) +
                 ' q ' + iteration / 2 + ', 0 ' + ' ' + iteration / 2 + ' ' + h
        // sawtooth:
        } else if (type.value === 'sawtooth') {
          wave = ' v ' + h +
                 ' l ' + 2 * iteration + ', ' + (-yAxisMiddle) +
                 ' v ' + h
        // triangle
        } else if (type.value === 'triangle') {
          wave = ' l ' + iteration / 2 + ', ' + h +
                 ' l ' + iteration + ', ' + (-yAxisMiddle) +
                 ' l ' + iteration / 2 + ', ' + h
        }
        line =
              ' m -' + iteration + ', ' + yAxisMiddle +
              wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave +wave + wave + wave + wave + wave + wave +
              wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave +wave + wave + wave + wave + wave + wave +
              wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave +wave + wave + wave + wave + wave + wave +
              wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave +wave + wave + wave + wave + wave + wave
      }

      return line
    },
    centerLFOSwing () {
      return 'transform: translateX(' + (this.displayWidth / 2) + 'px)'
    }
    // moveLFOSwingUp() {
    //   return 'translateY(-' + (this.displayHeight/2) + 'px)'
    // }
  },
  watch: {
    // used to update the interval length on rate knob turn
    lfoValue: {
      handler(newValue, oldValue) {
        if (this.module =='lfo') {
          let realFreq = this.knobs[3].value
          console.log();

          this.changeInterval(( 1 / (realFreq) ) * 1000 )
        }
      },
      deep: true
    }

  }
}
</script>

 <style scoped>
 path {
   display: inline-block;
 }
 </style>
