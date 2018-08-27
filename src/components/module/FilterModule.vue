<template>
  <div class="module">
    <display class="display" module="filter" :lowpass="cutOffFreq" :highpass="cutOffFreq1" :gain="gain"/>
    <circle-slider
      v-model="cutOffFreq"
      :min="0"
      :max="10000"
      knobColor="#6e01d1"
    ></circle-slider>
    <circle-slider
      v-model="setQ"
      :min="50"
      :max="10000"
      knobColor="#6e01d1"
    ></circle-slider>
    <circle-slider
      v-model="gain"
      :min="50"
      :max="10000"
      knobColor="#6e01d1"
    ></circle-slider>
    <circle-slider
      v-model="type"
      :min="50"
      :max="10000"
      knobColor="#6e01d1"
    ></circle-slider>
  </div>
</template>

<script>
import audio from '@/audio'
import CircleSlider from '@/components/knob.vue'
import display from '@/components/display.vue'

export default {
  name: 'FilterModule',
  props: {
    msg: String
  },
  data () {
    return {
      cutOffFreq: 350,
      cutOffFreq1: 350,
      cutOffFreq2: 350,
      typeArray: [
        'lowpass',
        'highpass',
        'bandpass'
      ],
      type: 0,
      setQ: 1,
      gain: 0,
      filter: {},
      sliderValue: 0
    }
  },
  components: {
    CircleSlider,
    display
  },
  created () {
    this.filter = audio.filter.state.device
  },
  watch: {
    cutOffFreq (val) {
      // this might be abstracted away
      this.filter.frequency.value = val
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
