<template>
  <svg v-if="module=='filter'" fill="rgb(14, 80, 186)"
  style="margin: auto;">
  <rect :width="displayWidth" :height="displayHeight"/>
    <path stroke="black" stroke-width="3" :d="filterPath" fill="black" style="fill-rule: nozero"/>

	  <text x="45%" y="40%" fill="blue">
      <tspan>L: {{lowpass}}</tspan>
      <tspan x="45%" y="50%">H: {{highpass}}</tspan>
      <tspan x="45%" y="60%">G: {{gain}}</tspan>
    </text>

  </svg>
</template>

<script>

// TODO:
// [v]. translate the values so they work properly
// [v]. Gain
// [v]. turn the curve from the cubic one to quadratic
// [v]. make the lowpass & highpass one method
// [v]. do something about the colors
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
      displayWidth: 600
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
    curve(dir, amnt) {
      var mod1 = (dir === "left-up" || dir === "left-down") ? 1 : 0
      var mod2 = (dir === "left-up" || dir === 'left-down') ? 0 : (dir === "down-right") ? -1: 1
      var mod3 = 1
      var mod4 = (dir === "left-down" || dir === "up-right") ? 1 : -1

      return " q "+(amnt*mod1) + " " + (amnt*mod2) + " " + (amnt*mod3) + " " + (amnt*mod4)
    }
  },
  computed: {
    filterPath() {
      // TODO: hardcoded = change it
      let lowpassVar = ((this.lowpass/(10000-50))*250)-3
      let highpassVar = ((this.highpass/(10000-50))*250)-30
      let gainVar = ((this.gain/(10000-50))*(this.displayHeight-110))

      let line = "M-300,"+(this.displayHeight)+
                " h 270 " + lowpassVar +
                 this.curve("left-up", 50) +
                " v -"+(gainVar) + " " +
                 this.curve("down-right", 50)+
                " h "+((this.displayWidth/2)-lowpassVar-80)+" h "+((this.displayWidth/2)-highpassVar-80)+
                 this.curve("left-down", 50) +
                " v "+ (gainVar) + " " +
                 this.curve("up-right", 50) +
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
