<template>

    <div class="display" ref="displayWrapper">
      <svg width="100%" height="100%">
        <rect :fill="fill" width="100%" height="100%" />

        <path stroke="black"
              :stroke-width="strokeWidth"
              :d="path"
              fill="black"
              style="fill-rule: nozero"
              :class="{reverb: module=== 'reverb'}"
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
        <svg :viewBox="lfoVB">

        <!-- the swing: -->
        <g v-if="this.module === 'lfo'" ref="swing"
          stroke="black"
          :style="swingStyle"
                          >
          <path
            :stroke-width="1"
            fill="black"
            :d="'m 0,'+ (-displayHeight/2)+
                ' v ' + (displayHeight)
                "/>

                <circle :cx="0" :cy="displayHeight*0.6" :r="displayHeight/4" />
          </g>

          <g v-if="this.module === 'lfo'"
            stroke="white"
            fill="none"
            ref="swingGoal"
            :stroke-width="2"
            :style="goalSwingStyle"
                            >
            <path
              :stroke-width="2"
              fill="none"
              stroke="white"
              :d="'m 0,'+ (-displayHeight/1.52)+
                  ' v ' + (displayHeight)
                  "/>

                  <circle :cx="0" :cy="displayHeight*0.6" :r="displayHeight/4"/>
            </g>
        </svg>

        <!-- Reverb: -->
        <svg :viewBox="reverbVB" v-if="module==='reverb'">
          <g>
            <circle :r="reverbCirclesRay(1)"
                    :cy="displayHeight/2"
                    :cx="firstCircleLeftMargin" class="reverb"
                    />
            <circle :r="reverbCirclesRay(2)"
                    :cy="displayHeight/2"
                    :cx="spaceBetweenReverbCicles(1)"
                    class="reverb"/>
            <circle :r="reverbCirclesRay(3)"
                    :cy="displayHeight/2"
                    :cx="spaceBetweenReverbCicles(2)"
                    class="reverb"/>
            <circle :r="reverbCirclesRay(4)"
                    :cy="displayHeight/2"
                    :cx="spaceBetweenReverbCicles(3)"
                    class="reverb"/>
            <circle :r="reverbCirclesRay(5)"
                    :cy="displayHeight/2"
                    :cx="spaceBetweenReverbCicles(4)"
                    class="reverb"/>
            <circle :r="reverbCirclesRay(6)"
                    :cy="displayHeight/2"
                    :cx="spaceBetweenReverbCicles(5)"
                    class="reverb"/>
            <circle :r="reverbCirclesRay(7)"
                    :cy="displayHeight/2"
                    :cx="spaceBetweenReverbCicles(6)"
                    class="reverb"/>
            <circle :r="reverbCirclesRay(8)"
                    :cy="displayHeight/2"
                    :cx="spaceBetweenReverbCicles(7)"
                    class="reverb"/>
            <!-- <circle :r="reverbCirclesRay(10)"
                    :cy="displayHeight/2"
                    :cx="spaceBetweenReverbCicles(9)"
                    class="reverb"/> -->
          </g>

          <!-- goal -->
          <g>
            <circle :r="reverbCirclesRayGoal(1)"
                    :cy="displayHeight/2"
                    :cx="firstCircleLeftMargin" class="reverb__goal"
                    />
            <circle :r="reverbCirclesRayGoal(2)"
                    :cy="displayHeight/2"
                    :cx="spaceBetweenReverbCiclesGoal(1)"
                    class="reverb__goal"/>
            <circle :r="reverbCirclesRayGoal(3)"
                    :cy="displayHeight/2"
                    :cx="spaceBetweenReverbCiclesGoal(2)"
                    class="reverb__goal"/>
            <circle :r="reverbCirclesRayGoal(4)"
                    :cy="displayHeight/2"
                    :cx="spaceBetweenReverbCiclesGoal(3)"
                    class="reverb__goal"/>
            <circle :r="reverbCirclesRayGoal(5)"
                    :cy="displayHeight/2"
                    :cx="spaceBetweenReverbCiclesGoal(4)"
                    class="reverb__goal"/>
            <circle :r="reverbCirclesRayGoal(6)"
                    :cy="displayHeight/2"
                    :cx="spaceBetweenReverbCiclesGoal(5)"
                    class="reverb__goal"/>
            <circle :r="reverbCirclesRayGoal(7)"
                    :cy="displayHeight/2"
                    :cx="spaceBetweenReverbCiclesGoal(6)"
                    class="reverb__goal"/>
            <circle :r="reverbCirclesRayGoal(8)"
                    :cy="displayHeight/2"
                    :cx="spaceBetweenReverbCiclesGoal(7)"
                    class="reverb__goal"/>
            <!-- <circle :r="reverbCirclesRay(10)"
                    :cy="displayHeight/2"
                    :cx="spaceBetweenReverbCiclesGoal(9)"
                    class="reverb"/> -->
          </g>
        </svg>
        <g v-if="debug" class="debug-text">
          <text x="0" y="0">
            <tspan x="0" y="10%">{{knobs[0].name}}: {{knobs[0].value}}</tspan>
            <tspan x="0" y="20%">{{knobs[1].name}}: {{knobs[1].value}}</tspan>
            <tspan x="0" y="30%" v-if="this.knobs[2]">{{knobs[2].name}}: {{knobs[2].value}}</tspan>
            <tspan x="0" y="40%" v-if="this.knobs[3]">{{knobs[3].name}}: {{knobs[3].value}}</tspan>
          </text>
          <text x="0" y="40%">
            <tspan x="0%" y="60%" v-if="this.knobs[4]">{{knobs[4].name}}: {{knobs[4].value}}</tspan>
            <tspan x="0%" y="70%" v-if="this.knobs[5]">{{knobs[5].name}}: {{knobs[5].value}}</tspan>
            <tspan x="0%" y="80%" v-if="this.knobs[6]">{{knobs[6].name}}: {{knobs[6].value}}</tspan>
            <tspan x="0%" y="90%" v-if="this.knobs[7]">{{knobs[7].name}}: {{knobs[7].value}}</tspan>
          </text>
        </g>
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
// [v] cleanup
// STILL TODO:
// [] bug: the swing does not update when the knob is held/ slowly turned
// [] sawtooth timing

// Week 3.:
// [] Reverb screen
// circles no: the design way
// <circles> czy path?
// size changes circles move aparart
// dry/wet - size of the circles
//
//


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
    debug: {
      type: Boolean,
      default: false
    }
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
      shouldGoalGoRight: false,
      intervalId: null,
      goalIntervalId: null
    }
  },
  mounted () {
    console.log('display: mounted!', this.module)
    // update dimentions:
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions())

    if (this.module == 'lfo') {
      var intervalTest =  setInterval(this.updateSeconds, this.knobs[3].value)
      this.intervalId = intervalTest
      this.goalIntervalId = setInterval(this.updateGoalSeconds, (1 / (this.knobs[7].value) ) * 1000 )
    }
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.updateDimensions())
  },
  methods: {
    updateSeconds() {
     this.shouldItGoRight=!this.shouldItGoRight
    },
    updateGoalSeconds() {
     this.shouldGoalGoRight=!this.shouldGoalGoRight
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
    drawReverbCicle (mutiplier,r) {
      const ratio = r*mutiplier
      const rTimes2 = 2*ratio
      const circle = 'a '+ratio+', '+ ratio+ ' 0 1,0 ' +rTimes2+',0'+
        'a '+ratio+', '+ratio + ' 0 1,0 '+(-rTimes2)+',0'
      return circle
    }
  },
  computed: {
    // used to refer to LFO rate knob in a watcher (no way to do it directly using because of "[...]")
    firstCircleLeftMargin() {
      let margin = ''
      if (this.module === 'reverb'){
        // helpers:
        const sizeRatio = this.knobs[0].value/(this.knobs[0].max - this.knobs[0].min)
        margin = (this.displayWidth/100)-(this.displayWidth/10)*(sizeRatio)
      }
      return margin
    },
    firstCircleLeftMarginGoal() {
      let margin = ''
      if (this.module === 'reverb'){
        // helpers:
        const sizeRatio = this.knobs[4].value/(this.knobs[4].max - this.knobs[4].min)
        margin = (this.displayWidth/100)-(this.displayWidth/10)*(sizeRatio)
      }
      return margin
    },
    reverbCirclesRay(){
      if (this.module =='reverb') {
        const ratio = this.knobs[1].value/(this.knobs[1].max - this.knobs[1].min)
        return number => this.displayHeight*(0.38-(number*3*0.01)) + 20*ratio
       }
      return ''
    },
    reverbCirclesRayGoal(){
      if (this.module =='reverb') {
        const ratio = this.knobs[5].value/(this.knobs[5].max - this.knobs[5].min)
        return number => this.displayHeight*(0.38-(number*3*0.01)) + 20*ratio
       }
      return ''
    },
    spaceBetweenReverbCicles() {
      if (this.module === 'reverb') {
        const sizeRatio = this.knobs[0].value/(this.knobs[0].max - this.knobs[0].min)
        let max = 30
        const min = 10
        let cumulate = this.firstCircleLeftMargin;
        const cumulateDistances = (number) => {
          for (let i=0; i> number.length; i++) {
            cumulate = cumulate + (sizeRatio*max)
          }
          return cumulate
        }
        return number => {
          return this.firstCircleLeftMargin + number*(max*sizeRatio)
        }
      }
      return ''
    },
    spaceBetweenReverbCiclesGoal() {
      if (this.module === 'reverb') {
        const sizeRatio = this.knobs[4].value/(this.knobs[4].max - this.knobs[4].min)
        let max = 30
        const min = 10
        let cumulate = this.firstCircleLeftMarginGoal;
        const cumulateDistances = (number) => {
          for (let i=0; i> number.length; i++) {
            cumulate = cumulate + (sizeRatio*max)
          }
          return cumulate
        }
        return number => {
          return this.firstCircleLeftMargin + number*(max*sizeRatio)
        }
      }
      return ''
    },
    lfoValue() {
      if (this.module === 'lfo') {
        return this.knobs[0].value
      }
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

        // making a circle with a path..
        const circle = ' q ' + '0, ' + (-r) + ' ' + r + ', ' + (-r) +
                       ' q ' + r + ', 0 ' + r + ', ' + r +
                       ' q ' + '0, ' + r + ' ' + (-r) + ', ' + r +
                       ' q ' + (-r) + ', 0 ' + (-r) + ', ' + (-r)

        // the idea from https://codepen.io/jakob-e/pen/bgBegJ
        const archCrcl = 'M' + ((this.displayWidth / 2) - r) + ', ' + ((this.displayHeight / 2)) +
        // 'm '+(-r)+', 0'+
        'a ' + r + ', ' + r + ' 0 1,0 ' + (2 * r) + ',0' +
        'a ' + r + ', ' + r + ' 0 1,0 ' + (-2 * r) + ',0'

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
        // const spaceBetween = timeRatio*this.displayWidth/3 + 15
        const spaceBetween = timeRatio*this.displayWidth/12 + 15

        const barTrigger = 100 / 7

        line = 'M 0, 0 ' +
               'm 0, ' + (this.displayHeight+this.displayHeight*(1-wetRatio)) +
               this.drawDelayBar(spaceBetween, barWidth, 0) +

               // DRY-nasty, sure
               // the 7.142... number is a result of 100/14
               ((feedbackRatio > barTrigger*2/100) ? this.drawDelayBar(spaceBetween, barWidth, 1):'') +
               ((feedbackRatio > barTrigger*3/100) ? this.drawDelayBar(spaceBetween, barWidth, 2):'') +
               ((feedbackRatio > barTrigger*4/100) ? this.drawDelayBar(spaceBetween, barWidth, 3):'') +
               ((feedbackRatio > barTrigger*5/100) ? this.drawDelayBar(spaceBetween, barWidth, 4):'') +
               ((feedbackRatio > barTrigger*6/100) ? this.drawDelayBar(spaceBetween, barWidth, 5):'') +
               ((feedbackRatio > barTrigger*7/100) ? this.drawDelayBar(spaceBetween, barWidth, 6):'') +
               ((feedbackRatio > barTrigger*8/100) ? this.drawDelayBar(spaceBetween, barWidth, 7):'') +
               ((feedbackRatio > barTrigger*9/100) ? this.drawDelayBar(spaceBetween, barWidth, 8):'') +
               ((feedbackRatio > barTrigger*10/100) ? this.drawDelayBar(spaceBetween, barWidth, 9):'') +
               ((feedbackRatio > barTrigger*11/100) ? this.drawDelayBar(spaceBetween, barWidth, 10):'') +
               ((feedbackRatio > barTrigger*12/100) ? this.drawDelayBar(spaceBetween, barWidth, 11):'') +
               ((feedbackRatio > barTrigger*13/100) ? this.drawDelayBar(spaceBetween, barWidth, 12):'')


      }
      if (this.module === 'reverb') {


        // Reverb path not going to work!
        // Each circle neccessitates its own opacity

        // helpers:
        const size = this.knobs[0]
        const dry = this.knobs[1]

        const sizeRatio = size.value/(size.max-size.min)
        const dryRatio = dry.value/(dry.max-dry.min)
        const r = this.displayHeight*0.4


        line = 'M 0,0' +
               'm 0,' + this.displayHeight/2 +
               this.drawReverbCicle(1,r) +
               this.drawReverbCicle(0.9,r) +
               this.drawReverbCicle(0.8,r) +
               this.drawReverbCicle(0.7,r) +
               this.drawReverbCicle(0.6,r) +
               this.drawReverbCicle(0.5,r) +
               this.drawReverbCicle(0.4,r) +
               this.drawReverbCicle(0.3,r) +
               this.drawReverbCicle(0.2,r) +
               this.drawReverbCicle(0.1,r)
        // disable
        line= ''
      }
      return line
    },

    lfoVB() {
      return (0-this.displayWidth/2) + ' 0 ' + this.displayWidth + ' ' + this.displayHeight
    },
    reverbVB() {
      return '-90,0,'+this.displayWidth+ ',' + this.displayHeight
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
    goalSwingStyle() {
      // helpers:
      const rate = this.knobs[4]
      const amount = this.knobs[5]
      const shape = this.knobs[6]

      const rateRatio = (rate.value/(rate.max-rate.min))
      const amountRatio = (amount.value/(amount.max-amount.min))

      const realGoalFreq = this.knobs[7].value

      const transitionTime = ( 1 / (realGoalFreq) )
      const rotateAmnt = 50


      let transitionString;
      if (shape.value=='sine') {
        transitionString = transitionTime+'s'
      } else if (shape.value == 'square') {
        transitionString =''
      } else if (shape.value == 'sawtooth') {
        if (!this.shouldGoalGoRight) {
          transitionString = transitionTime+'s linear'
        }
        else {
          transitionString = ''
        }
      } else if (shape.value == 'triangle') {
        transitionString = transitionTime+'s linear'
      }
      let rotateAmount = 2500*amountRatio;
      let rotateString
      if (this.shouldGoalGoRight){
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

      if (this.module === 'lfo') {
        // helpers:
        const r = this.displayHeight / 4
        const rate = this.knobs[4]
        const amount = this.knobs[5]
        const shape = this.knobs[6]

        // making a circle with a path..
        const circle = ' q ' + '0, ' + (-r) + ' ' + r + ', ' + (-r) +
                       ' q ' + r + ', 0 ' + r + ', ' + r +
                       ' q ' + '0, ' + r + ' ' + (-r) + ', ' + r +
                       ' q ' + (-r) + ', 0 ' + (-r) + ', ' + (-r)

        // the idea from https://codepen.io/jakob-e/pen/bgBegJ
        const archCrcl = 'M' + ((this.displayWidth / 2) - r) + ', ' + ((this.displayHeight / 2)) +
        // 'm '+(-r)+', 0'+
        'a ' + r + ', ' + r + ' 0 1,0 ' + (2 * r) + ',0' +
        'a ' + r + ', ' + r + ' 0 1,0 ' + (-2 * r) + ',0'

        line = ''
      }

      if (this.module === 'delay') {
        // helpers:
        const time = this.knobs[4]
        const feedback = this.knobs[5]
        const wet = this.knobs[6]

        const feedbackRatio = feedback.value/(feedback.max-feedback.min)
        const timeRatio = time.value/(time.max-time.min)
        const wetRatio = wet.value/(wet.max-wet.min)

        const barWidth = 0
        const spaceBetween = timeRatio*this.displayWidth/7 + 28
        const barTrigger = 100 / 7

        line = 'M 0, 0 ' +
               'm 0, ' + (this.displayHeight+this.displayHeight*(1-wetRatio)) +
               this.drawDelayBar(spaceBetween - 7, barWidth, 0) +

               // DRY-nasty, sure
               // the 7.142... number is a result of 100/14
               ((feedbackRatio > barTrigger*2/100) ? this.drawDelayBar(spaceBetween, barWidth, 1):'') +
               ((feedbackRatio > barTrigger*3/100) ? this.drawDelayBar(spaceBetween, barWidth, 2):'') +
               ((feedbackRatio > barTrigger*4/100) ? this.drawDelayBar(spaceBetween, barWidth, 3):'') +
               ((feedbackRatio > barTrigger*5/100) ? this.drawDelayBar(spaceBetween, barWidth, 4):'') +
               ((feedbackRatio > barTrigger*6/100) ? this.drawDelayBar(spaceBetween, barWidth, 5):'') +
               ((feedbackRatio > barTrigger*7/100) ? this.drawDelayBar(spaceBetween, barWidth, 6):'') +
               ((feedbackRatio > barTrigger*8/100) ? this.drawDelayBar(spaceBetween, barWidth, 7):'') +
               ((feedbackRatio > barTrigger*9/100) ? this.drawDelayBar(spaceBetween, barWidth, 8):'') +
               ((feedbackRatio > barTrigger*10/100) ? this.drawDelayBar(spaceBetween, barWidth, 9):'') +
               ((feedbackRatio > barTrigger*11/100) ? this.drawDelayBar(spaceBetween, barWidth, 10):'') +
               ((feedbackRatio > barTrigger*12/100) ? this.drawDelayBar(spaceBetween, barWidth, 11):'') +
               ((feedbackRatio > barTrigger*13/100) ? this.drawDelayBar(spaceBetween, barWidth, 12):'')

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

          this.changeInterval(( 1 / (realFreq) ) * 1000 )
        }
        return
      },
      deep: true
    }

  }
}
</script>

 <style scoped lang="scss">
 path {
   display: inline-block;
 }
 .reverb {
   fill-opacity: 0.5;
   &__goal {
     fill-opacity: 0;
     stroke: white;
     stroke-width: 2;
     }
  }
.debug-text {
  font: bold 20px sans-serif;
  fill: red;
}
 </style>
