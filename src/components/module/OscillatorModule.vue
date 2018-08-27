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
import VueCircleSlider from '@/components/knob.vue'
import display from '@/components/display.vue'

export default {
  name: 'OscillatorModule',
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
      detune: 1,
      phase: 0,
      oscillator: {}
    }
  },
  components: {
    'rotary': VueCircleSlider,
    display
  },
  created () {
    this.oscillator = new audio.state.Tone
      .Oscillator(this.frequency, this.typeArray[this.type])

    // audio.synth.state.synth.disconnect()
    // audio.synth.state.synth.connect(this.filter)
    // audio.connectChanelToMaster(this.filter)
  },
  watch: {
    frequency (val) {
      // this might be abstracted away
      this.oscillator.frequency.value = val
    },
    detune (val) {
      // this might be abstracted away
      this.oscillator.detune.value = val
    },
    phase (val) {
      // this might be abstracted away
      this.oscillator.phase.value = val
    },
    type (val) {
      // this might be abstracted away
      this.oscillator.type = this.typeArray[val]
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
