<template>
  <div class="module">
    <div class="display" ref="filterDisplay">
      <svg width="100%" height="100%">
        <rect fill="rgb(14, 80, 186)" :width="displayWidth" :height="displayHeight" />

        <path stroke="black"
              stroke-width="3"
              :d="filterPath"
              fill="black"
              style="fill-rule: nozero"
              />

        <text x="45%" y="40%" fill="blue">
          <tspan x="45%" y="50%">Freq: {{cutOffFreq}}</tspan>
          <tspan x="45%" y="60%">type: {{type}}</tspan>
        </text>
      </svg>

    </div>

    <rotary
            v-model="type"
            :min="0"
            :max="2"
            knobColor="#ff8574"
            name="Type"
          ></rotary>
    <rotary
            v-model="cutOffFreq"
            :min="0"
            :max="20000"
            knobColor="#ff8574"
            name="frequency"
          ></rotary>

   <rotary
            v-model="setQ"
            :min="0"
            :max="10"
            knobColor="#ff8574"
            name="Q"
          ></rotary>
    <rotary
            v-model="gain"
            :min="0"
            :max="100"
            knobColor="#ff8574"
            name="Gain"
          ></rotary>
    <!-- <ul>
      <div v-for="score in highscores" :key="score.id">
        <strong>{{`🏆: ${score.name}: ${score.score}`}}</strong>
      </div>
    </ul> -->
  </div>

</template>

<script>
import audio from '@/audio'
import VueCircleSlider from '@/components/knob.vue'


export default {
  name: 'FilterModule',
  props: {
    msg: String
  },
  data () {
    return {
      highscores: [], // remove this
      cutOffFreq: 5000,
      typeArray: [
        'lowpass',
        'highpass',
        'bandpass'
      ],
      type: 0,
      setQ: 0.1,
      gain: 0.1,
      filter: {},
      sliderValue: 0,
      displayHeight: 300,
      displayWidth: 600,
    }
  },
  components: {
    'rotary': VueCircleSlider,
  },
  created () {
    this.filter = audio.filter.state.device
  },
  mounted () {
    console.log('filter: mounted!')

    // update dimentions:
    this.displayHeight = this.$refs.filterDisplay.clientHeight
    this.displayWidth = this.$refs.filterDisplay.clientWidth
  },
  methods: {
    curve(dir, amnt) {

      const mod1 = (dir === "left-up" || dir === "left-down") ? 1 : 0
      const mod2 = (dir === "left-up" || dir === 'left-down') ? 0 : (dir === "down-right") ? -1: 1
      const mod3 = 1
      const mod4 = (dir === "left-down" || dir === "up-right") ? 1 : -1

      return " q "+(amnt*mod1) + " " + (amnt*mod2) + " " + (amnt*mod3) + " " + (amnt*mod4)
    },
    curve2(dir, amnt) {
      const mod1 = (dir === "left-up" || dir === "left-down") ? 1 : 0
      const mod2 = (dir === "left-up" || dir === 'left-down') ? 0 : (dir === "down-right") ? -1: 1
      const mod3 = 1
      const mod4 = (dir === "left-down" || dir === "up-right") ? 1 : -1

      return " q "+(amnt*mod1) + " " + (amnt*mod2) + " " + (amnt*mod3/this.displayWidth) + " " + (amnt*mod4/this.displayWidth)
    }
  },
  computed: {

//       |-------------------------------------\
//       |                                      \
//       |                                       \
//       |                                        \
//       |                                         \
//       |  //////////////////// gain ///////       \
//       |                                           \
//       |                                            -----------------------------
//       |


    filterPath() {
      // helpers:
      let halfHeight = this.displayHeight/2
      let halfWidth = this.displayWidth/2
      const gainAddedDistance = ((this.gain/100)*halfHeight)-5
      const yOffset = 0
      const qDistance = (1-(this.setQ/100))*(halfWidth)
      const freqDistance = (this.cutOffFreq/10000)*(halfWidth)
      const bandpassQ = (this.setQ/100)*halfHeight

      const Q = 1-(this.setQ/100)

      // svg path:
      let line;

      if (this.type == 0) {
        line = "M 0," +this.displayHeight+
               " v " + (-(halfHeight+gainAddedDistance-yOffset)) +
               " h " + (freqDistance)+
               " h " + ((this.setQ/100)*(halfWidth)/2) +
               " q " + (qDistance/2) + ", 0 " +
                     + qDistance + ", " + (halfHeight+gainAddedDistance) +


              // " v " + (-(gainAddedDistance+halfHeight-yOffset)) +
              // " h " + (halfWidth + freqDistance-qDistance)+
              // // this.curve2("left-down", qDistance) +
              // " q " + this.displayWidth+",0 " + qDistance +", " +(gainAddedDistance) +
              // " v " + (halfHeight+gainAddedDistance-(2*qDistance))+
              // // this.curve("up-right", qDistance) +
              // " h "+ this.displayWidth +
               " Z"
      }
      else if (this.type == 1) {
        line = "M 0," + this.displayHeight+
               " h " + freqDistance +
               " h " + ((this.setQ/100)*(halfWidth)/2) +
               " q " + (qDistance/2) + ", " + (-(halfHeight+gainAddedDistance)) + " " +
                        qDistance +", " + (-(halfHeight+gainAddedDistance)) +
               " h " + this.displayWidth +
               " v " + this.displayHeight  +
               " Z"

        // line = "M"+(-halfWidth)+", "+ this.displayHeight+
        //        " h " + (halfWidth + freqDistance-qDistance)+
        //        this.curve("left-up", qDistance) +
        //        " v " + (-(halfHeight+gainAddedDistance-(2*qDistance)))+
        //        this.curve("down-right", qDistance) +
        //        " h " + this.displayWidth +
        //        " v " + this.displayHeight+ "Z"
      }
      else {

        line = "M 0, " + this.displayHeight +
               " h " + (freqDistance + (halfWidth/2)-qDistance) +
               " q " + (qDistance/2) + ", " + (-(halfHeight+gainAddedDistance)) + " " +
                       qDistance + ", " + (-(halfHeight+gainAddedDistance)) +
               " q " + (qDistance/2) + ", 0 " +
                       qDistance + ", " + (halfHeight+gainAddedDistance) + " " +
        // line = "M"+(-halfWidth)+", "+this.displayHeight +
        //       " h " + ((freqDistance-(2*bandpassQ/2))+halfWidth)+
        //        this.curve("left-up", bandpassQ) +
        //        this.curve("down-right", bandpassQ) +
        //        this.curve("left-down", bandpassQ) +
        //        this.curve("up-right", bandpassQ) +

              // " v " + (-gainAddedDistance) +
              // " v " + gainAddedDistance+
              " Z "

      }

      return line
    },
        highpassPath() {
      let line = "M0,0"+ "Z"
      return line
    },
        bandpassPath() {
      let line = "M0,0"+"Z"
      return line
    }
  },
  watch: {
    cutOffFreq (val) {
      // this might be abstracted away
      // this.filter.frequency.value = val
      this.filter.frequency.value = Math.round(Math.pow(val, (val/20000)) + 20)
      // console.log('this.filter.frequency.value', this.filter.frequency.value);
    },
    setQ (val) {
      // this might be abstracted away
      this.filter.Q.value = val
    },
    gain (val) {
      // this might be abstracted away
      this.filter.gain.value = val
    },
    type (val) {
      // this might be abstracted away
      this.filter.type = this.typeArray[Math.round(val)]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

svg.display {
    fill: #6e01d1;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
