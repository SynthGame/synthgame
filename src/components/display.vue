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

              <!-- lfo: -->
              <!--positioning wrapperfix -->
             <g :style="centerLFOSwing">

              <!-- the swing: -->
              <g v-if="this.module === 'lfo'"
                stroke="black"
                class="swing"
                                >
                <path
                  :stroke-width="1"
                  fill="black"
                  :d="'m 0,'+ (-displayHeight/2)+
                      ' v ' + (displayHeight)
                      "/>

                      <circle :cx="0" :cy="displayHeight*0.6" :r="displayHeight/4"/>
                </g>
              </g>

              <!-- <g v-if="module === 'delay'">
                <rect :x="" :y="" :width="300" :height="300"/>
                <rect v-if="(knobs[1].value/(knobs[1].max-knobs[1].min)) > (100/14)*2" :x="" :y="" :width="300" :height=""/>
                <rect v-if="(knobs[1].value/(knobs[1].max-knobs[1].min)) > (100/14)*3" :x="" :y="" :width="300" :height=""/>
                <rect v-if="(knobs[1].value/(knobs[1].max-knobs[1].min)) > (100/14)*4" :x="" :y="" :width="300" :height=""/>
                <rect v-if="(knobs[1].value/(knobs[1].max-knobs[1].min)) > (100/14)*5" :x="" :y="" :width="300" :height=""/>
                <rect v-if="(knobs[1].value/(knobs[1].max-knobs[1].min)) > (100/14)*6" :x="" :y="" :width="300" :height=""/>
                <rect v-if="(knobs[1].value/(knobs[1].max-knobs[1].min)) > (100/14)*7" :x="" :y="" :width="300" :height=""/>
                <rect v-if="(knobs[1].value/(knobs[1].max-knobs[1].min)) > (100/14)*8" :x="" :y="" :width="300" :height=""/>
                <rect v-if="(knobs[1].value/(knobs[1].max-knobs[1].min)) > (100/14)*9" :x="" :y="" :width="300" :height=""/>
                </g> -->

        <!-- // <path v-if="this.module === 'lfo'"
        //       :stroke-width="strokeWidth"
        //       :d="'M ' + '" -->
        <!-- //       fill="black"
        //       style="fill-rule: nozero" -->

        <text x="45%" y="40%" fill="transparent">
          <tspan x="45%" y="50%">{{knobs[0].name}}: {{knobs[0].value}}</tspan>
          <tspan x="45%" y="60%">{{knobs[1].name}}: {{knobs[1].value}}</tspan>
          <tspan x="45%" y="70%">{{knobs[2].name}}: {{knobs[2].value}}</tspan>
          <tspan x="45%" y="80%" v-if="this.knobs[3]">{{knobs[3].name}}: {{knobs[3].value}}</tspan>
        </text>
      </svg>
    </div>

</template>

<script>

// TODO:
// [v]. translate the values so they work properly
// [v]. Gain
// [v]. turn the curve from the cubic one to quadratic
// [v]. make the lowpass & highpass one method
// [v]. do something about the colors

// [v] REDISiGN in accrodance with knobs !!
// [] embed into modules ?? actually not such a great idea!
// [v] trying to move them back together

// ===============
// [v] the required margin data object and path
// [v] have the other knobs connected to the filter audio output
// [v] relativize and clean up the path drawing function (inc. the curve "global" variable)


// lfo:
// [] create swing
// [] have it move for sine
// [] have two other types

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
    }
  },
  data () {
    return {
      // default values to not have the calculation derail at created()
      displayHeight: 300,
      displayWidth: 600,
      curveAmnt: 90,
      strokeWidth : '0.1',
      lfoRotation: 20,
    }
  },
  mounted () {
    console.log('display: mounted!', this.module)
    // update dimentions:
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions())
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateDimensions())
  },
  methods: {
    // curve drawing helper:
    curve (dir) {
      var mod1 = (dir === 'left-up' || dir === 'left-down') ? 1 : 0
      var mod2 = (dir === 'left-up' || dir === 'left-down') ? 0 : (dir === 'down-right') ? -1 : 1
      var mod3 = 1
      var mod4 = (dir === 'left-down' || dir === 'up-right') ? 1 : -1

      return ' q ' + (this.curveAmnt * mod1) + ' ' + (this.curveAmnt * mod2) + ' ' + (this.curveAmnt * mod3) + ' ' + (this.curveAmnt * mod4)
    },
    updateDimensions () {
      this.displayHeight = this.$refs.displayWrapper.clientHeight
      this.displayWidth = this.$refs.displayWrapper.clientWidth
    }
  },
  computed: {
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
        line = 'M 0, ' + this.displayHeight +
              ' l ' + attackXPosition + ', ' + (-attackYPosition) + ' ' +
              ' l ' + decayXPosition + ', ' + decayYPosition + ' ' +
              // a horizontal line representing sustain level including a fix regarding adding the release:
              ' h ' + (this.displayWidth - attackXPosition - decayXPosition - (((release.value / release.max)) * fourthOfWidth)) +
              // release end position:
              ' L ' + this.displayWidth + ', ' + this.displayHeight + ' ' +
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
        if (type.value === 0) {
          line = 'M 0,' + this.displayHeight +
                ' v ' + (-(halfHeight + gainAddedDistance - yOffset)) +
                ' h ' + (freqDistance) +
                ' h ' + ((q.value / q.max) * (halfWidth) / 2) +
                ' q ' + (qDistance / 2) + ', 0 ' +
                      +qDistance + ', ' + (halfHeight + gainAddedDistance) +

                ' Z'
        } else if (type.value === 1) {
          line = 'M 0,' + this.displayHeight +
                ' h ' + freqDistance +
                ' h ' + ((q.value / q.max) * (halfWidth) / 2) +
                ' q ' + (qDistance / 2) + ', ' + (-(halfHeight + gainAddedDistance)) + ' ' +
                          qDistance + ', ' + (-(halfHeight + gainAddedDistance)) +
                ' h ' + this.displayWidth +
                ' v ' + this.displayHeight +
                ' Z'
        } else if (type.value === 2) {
          line = 'M 0, ' + this.displayHeight +
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

        const iteration = 1.2 * h - h * (0.6 * (octave.value / (octave.max - octave.min))) + (h * 0.2 * (1 - (detune.value / (detune.max))))

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
              wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave +
              ' Z '
      }

      if (this.module === 'lfo') {
        // helpers:
        const r = this.displayHeight/4
        const rate = this.knobs[0]
        const amount = this.knobs[1]
        const shape = this.knobs[2]
        // let position = null
        // Bart's little experiment
        // setInterval(function(){
        //   console.log('this.lfoRotation',this.lfoRotation);
        //   if (this.lfoRotation === 40) {
        //       this.lfoRotation = -40
        //     } else{
        //      this.lfoRotation = 40;
        //    }
        //  }, rate * 10 + 1000);

        //making a circle with a path..
        const circle = ' q ' + '0, ' + (-r) + ' ' + r + ', ' + (-r) +
                       ' q ' + r + ', 0 ' + r + ', ' + r +
                       ' q ' + '0, '+ r + ' ' + (-r) + ', ' + r +
                       ' q ' + (-r) + ', 0 ' + (-r) + ', ' + (-r)

        // the idea from https://codepen.io/jakob-e/pen/bgBegJ
        const archCrcl= 'M'+((this.displayWidth/2)-r)+', '+ ((this.displayHeight/2))+
        // 'm '+(-r)+', 0'+
        'a '+r+', '+r+ ' 0 1,0 '+(2*r)+',0'+
        'a '+r+', '+r+ ' 0 1,0 '+(-2*r)+',0'

        // not good enough, since how would it be animated?


        // might actually go with <circle>

        // line = ' M ' + (this.displayWidth/2) + ', ' + this.displayHeight/2 +
        // archCrcl +
        // ' Z '
        line = ''

        // ideas - GET back to it:
        // [] lfo prop watched/computed
        // [] transition
        // [] stylesheetapi

      }

      if (this.module === 'delay') {
        // helpers:
        const time = this.knobs[0]
        const feedback = this.knobs[1]
        const wet = this.knobs[2]




        line = 'M 0, 0' +
               'm 0, ' + this.displayHeight
        return line
      }
      if (this.module === 'reverb') {
        // helpers:



        line = ''
        return line
      }

      return line
    },
    centerLFOSwing() {
      return 'transform: translateX('+(this.displayWidth/2) + 'px)'
    },
    // moveLFOSwingUp() {
    //   return 'translateY(-' + (this.displayHeight/2) + 'px)'
    // }
  },
  watch: {
    // knobs() {
    //   if (this.module === 'lfo') {
    //     const amount = this.knobs[1]
    //
    //   }
    //
    // }

  }
}
</script>

 <style scoped>
 path {
   display: inline-block;
 }

 .swing {
   /* transform: translateX(100px); */
   animation: swing  ease-in-out 1s infinite alternate
 }

/* https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule */
 @keyframes swing {
    0% { transform: rotate(-40deg); }
    to { transform: rotate(40deg);}
}

 </style>
