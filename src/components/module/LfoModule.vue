<template>
  <div class="hello">
    <div style="margin: auto">
    <display :data="frequency"/></div>
    <circle-slider
      v-model="frequency"
      :min="50"
      :max="10000"
    ></circle-slider>
  </div>
</template>

<script>
import audio from '@/audio'
import VueCircleSlider from './knob.vue'
import display from '@/components/display.vue'

export default {
  name: 'LfoModule',
  props: {
    msg: String
  },
  data () {
    return {
      frequency: 350,
      typeArray: [
        'sine',
        'square',
        'sawtooth',
        'triangle'
      ],
      type: 0,
      amplitude: 1,
      lfo: {}
    }
  },
  components: {
    'circle-slider': VueCircleSlider,
    display
  },
  created () {
    this.lfo = new audio.state.Tone
      .LFO({
        type: this.typeArray[this.type],
        frequency: this.frequency,
        amplitude: this.amplitude
      })

    // audio.synth.state.synth.disconnect()
    // audio.synth.state.synth.connect(this.filter)
    // audio.connectChanelToMaster(this.filter)
  },
  watch: {
    frequency (val) {
      // this might be abstracted away
      this.lfo.frequency.value = val
    },
    amplitude (val) {
      // this might be abstracted away
      this.lfo.amplitude.value = val
    },
    type (val) {
      // this might be abstracted away
      this.lfo.type = this.typeArray[val]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

h3 {
  margin: 40px 0 0;
}
ul {
  margin-top: 5em;
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
