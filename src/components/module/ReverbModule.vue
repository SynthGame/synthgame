<template>
  <div class="module">
    <display class="display" module="filter" :lowpass="cutOffFreq" :highpass="cutOffFreq1" :gain="gain"/>
    <circle-slider
      v-model="decay"
      :min="50"
      :max="10000"
      knobColor="#3c32ff"
      name="Time"
    ></circle-slider>
    <circle-slider
      v-model="preDelay"
      :min="50"
      :max="10000"
      knobColor="#3c32ff"
      name="Predelay"
    ></circle-slider>
    <circle-slider
      v-model="wet"
      :min="50"
      :max="10000"
      knobColor="#3c32ff"
      name="Dry/wet"
    ></circle-slider>
  </div>
</template>

<script>
import audio from '@/audio'
import CircleSlider from '@/components/knob.vue'
import display from '@/components/display.vue'

export default {
  name: 'ReverbModule',
  props: {
    msg: String
  },
  data () {
    return {
      decay: 350,
      preDelay: 1,
      wet: 0,
      reverb: {},
      sliderValue: 0
    }
  },
  components: {
    CircleSlider,
    display
  },
  created () {
    this.reverb = audio.reverb.state.device
  },
  watch: {
    decay (val) {
      // this might be abstracted away
      this.reverb.frequency.value = val
    },
    preDelay (val) {
      // this might be abstracted away
      this.reverb.preDelay.value = val
    },
    wet (val) {
      // this might be abstracted away
      this.reverb.wet.value = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

svg.display {
    fill: #3c32ff;
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
