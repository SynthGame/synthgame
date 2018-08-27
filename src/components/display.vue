<template>
  <!-- envelope display -->
  <svg v-if="module=='filter'"
  style="margin: auto; width: 100%">
  <rect :width="displayWidth" :height="displayHeight" fill="rgb(14, 80, 186)"/>
    <path stroke="black" stroke-width="3" :d="filterPath" fill="black" style="fill-rule: nozero"/>
	  <text x="45%" y="40%" fill="blue">
      <tspan>L: {{lowpass}}</tspan>
      <tspan x="45%" y="50%">H: {{highpass}}</tspan>
      <tspan x="45%" y="60%">G: {{gain}}</tspan>
    </text>
  </svg>
  <!-- envelope display -->
    <svg v-else-if="module=='envelope'"
  style="margin: auto;">
  <rect  :width="displayWidth" :height="displayHeight" fill="rgb(244, 200, 66)"/>

    </svg>
</template>

<script>

// TODO:
// [v]. translate the values so they work properly
// [v]. Gain
// [v]. turn the curve from the cubic one to quadratic
// [v]. make the lowpass & highpass one method
// [v]. do something about the colors


// [] REDISiGN in accrodance with knobs !!
// embed into modules

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
    lowpass: {
      // as of now:
      type: Number
    },
    highpass: {
      // as of now:
      type: Number
    },
    gain: {
      // as of now:
      type: Number
    },
    module: {
      type: String
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
    console.log('display: mounted!')
    // update dimentions:
    this.displayHeight = this.$el.clientHeight
    this.displayWidth = this.$el.clientWidth
  },
  methods: {
    // curve drawing helper:
    curve(dir) {
      var mod1 = (dir === "left-up" || dir === "left-down") ? 1 : 0
      var mod2 = (dir === "left-up" || dir === 'left-down') ? 0 : (dir === "down-right") ? -1: 1
      var mod3 = 1
      var mod4 = (dir === "left-down" || dir === "up-right") ? 1 : -1

      return " q "+(this.curveAmnt*mod1) + " " + (this.curveAmnt*mod2) + " " + (this.curveAmnt*mod3) + " " + (this.curveAmnt*mod4)
    }
  },
  computed: {
    filterPath() {
      // TODO: hardcoded = change it
      let lowpassVar = (this.lowpass/(10000-50))*(((this.displayWidth/2)-4*this.curveAmnt))
      let highpassVar = ((this.highpass/(10000-50))*((this.displayWidth/2)-4*this.curveAmnt))
      let gainVar = ((this.gain/(10000-50))*(this.displayHeight-110))

      let line = "M0,"+(this.displayHeight)+
                " h "+ lowpassVar+
                 this.curve("left-up") +
                " v -"+(gainVar) + " " +
                 this.curve("down-right")+
                // " h "+((this.displayWidth/2)-lowpassVar-80)+" h "+((this.displayWidth/2)-highpassVar-80)+
                //  " h " + ((((this.displayWidth-4*this.curveAmnt)/2) -lowpassVar) + (((this.displayWidth-4*this.curveAmnt)/2) - highpassVar)) +
                // " h " + ((-(highpassVar+lowpassVar))>=0 ? (-(highpassVar+lowpassVar)) : 0) +
                 this.curve("left-down") +
                " v "+ (gainVar) + " " +
                 this.curve("up-right") +
                " h 300"+ highpassVar+ "Z"
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
