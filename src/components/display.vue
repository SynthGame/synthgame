<template>
  <!-- envelope display -->
  <!-- <svg v-if="module=='filter'"
  style="margin: auto; width: 100%">
  <rect :width="displayWidth" :height="displayHeight" fill="rgb(14, 80, 186)"/>
    <path stroke="black" stroke-width="3" :d="filterPath" fill="black" style="fill-rule: nozero"/>
	  <text x="45%" y="40%" fill="blue">
      <tspan>L: {{lowpass}}</tspan>
      <tspan x="45%" y="50%">H: {{highpass}}</tspan>
      <tspan x="45%" y="60%">G: {{gain}}</tspan>
    </text>
  </svg> -->
  <!-- envelope display -->
    <!-- <svg v-else-if="module=='envelope'"
  style="margin: auto;">
  <rect  :width="displayWidth" :height="displayHeight" fill="rgb(244, 200, 66)"/> -->

    <!-- </svg> -->

    <div class="display" style="margin: auto;" ref="displayWrapper">
      <svg :width="displayWidth" :height="displayHeight">
        <rect :fill="fill" :width="displayWidth" :height="displayHeight" />

        <path stroke="black"
              stroke-width="0.1"
              :d="path"
              fill="black"
              style="fill-rule: nozero"
              />

        <text x="45%" y="40%" fill="blue">
          <tspan x="45%" y="50%">{{knobs[0].name}}: {{knobs[0].value}}</tspan>
          <tspan x="45%" y="60%">{{knobs[1].name}}: {{knobs[1].value}}</tspan>
          <tspan x="45%" y="70%">{{knobs[2].name}}: {{knobs[2].value}}</tspan>
          <tspan x="45%" y="80%">{{knobs[3].name}}: {{knobs[3].value}}</tspan>
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

// [] REDISiGN in accrodance with knobs !!
// embed into modules ?? actually not such a great idea!
// [v] trying to move them back together

// type:
//
//
//

// ===============
// [] the required margin data object and path
// [] have the other knobs connected to the filter audio output
// [] relativize and clean up the path drawing function (inc. the curve "global" variable)

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
      default: []
    }
  },
  data () {
    return {
      // default values to not have the calculation derail at created()
      displayHeight: 300,
      displayWidth: 600,
      curveAmnt: 90
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

        const lineLength = 1.5*this.displayWidth
        const yAxisMiddle = this.displayHeight/2
        const h = yAxisMiddle/2

        const iteration = 1.2 * h - h*(0.6*(octave.value/(octave.max-octave.min))) +(h*0.2*(phase.value/(phase.max)))

        let wave;
        // square:
        if (type.value == 0) {
          wave = ' v ' + h +
                 ' h ' + iteration +
                 ' v ' + (-yAxisMiddle) +
                 ' h ' + iteration +
                 ' v ' + h
        // sine:
        } else if (type.value == 1) {
          wave = ' q ' + '0, ' + h + ' ' + iteration/2 + ', ' + h +
                 ' q ' + iteration/2 + ', 0 ' + iteration/2 + ', '+ (-h) +
                 ' q 0, ' + (-h) + ' ' + iteration/2 + ' ' + (-h) +
                 ' q ' + iteration/2 + ', 0 ' + ' ' + iteration/2 + ' ' + h
        // sawtooth:
        } else if (type.value == 2) {
          wave = ' v ' + h +
                 ' l ' + 2*iteration + ', ' + (-yAxisMiddle) +
                 ' v ' + h
        // triangle
        } else if (type.value == 3) {
          wave = ' l ' + iteration/2 +  ', ' + h +
                 ' l ' + iteration + ', ' + (-yAxisMiddle) +
                 ' l ' + iteration/2 + ', ' + h
        }
        line = 'M ' + iteration * (detune.value/(detune.max)) + ', 0 ' +
              ' m ' + lineLength + ', ' + yAxisMiddle  +
              ' h ' + (-lineLength-iteration) +
              wave + wave + wave + wave + wave + wave + wave + wave+ wave+ wave+ wave +
              ' Z '
      }

      return line
    }
  },
  watch: {

  }
}
</script>

 <style scoped>
 path {
   display: inline;
 }

 </style>
