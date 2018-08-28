<template>
  <div class="module">
    <display fill="rgb(14, 80, 186)"
        module="filter"
        :knobs="[{name: 'type', min: 0, max: 2, value: this.type},
                  {name: 'frequency', min: 0, max: 20000, value: this.cutOffFreq},
                  {name: 'q', min: 0, max: 100, value: this.setQ},
                  {name: 'gain', min: 0, max: 100, value: this.gain}
                  ]"/>

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
            :max="100"
            knobColor="#ff8574"
            name="Resonance"
          ></rotary>
    <!-- <rotary
            v-model="gain"
            :min="0"
            :max="100"
            knobColor="#ff8574"
            name="Gain"
          ></rotary> -->
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
import display from '@/components/display'


export default {
  name: 'FilterModule',
  props: {
    msg: String
  },
  data () {
    return {
      highscores: [], // remove this
      cutOffFreq: 8000,
      typeArray: [
        'lowpass',
        'highpass',
        'bandpass'
      ],
      type: 0,
      setQ: 50,
      gain: 1,
      filter: {},
      sliderValue: 0,
      displayHeight: 300,
      displayWidth: 600,
    }
  },
  components: {
    'rotary': VueCircleSlider,
    display
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

  },
  computed: {

  },
  watch: {
    cutOffFreq (val) {
      // this might be abstracted away
      // this.filter.frequency.value = val
      this.filter.frequency.value = Math.pow(val, (val/20000)) + 20;
      // console.log('this.filter.frequency.value', this.filter.frequency.value);
    },
    setQ (val) {
      // this might be abstracted away
      this.filter.Q.value = val/8
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
