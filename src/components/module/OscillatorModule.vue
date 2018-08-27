<template>
  <div class="module">
    <display class="display" module="oscillator"/>
    <circle-slider
      v-model="frequency"
      :min="0"
      :max="7"
      knobColor="#ff8574"
      name="Frequency"
    ></circle-slider>
    <circle-slider
      v-model="detune"
      :min="-120"
      :max="120"
      knobColor="#ff8574"
      name="Detune"
    ></circle-slider>
    <circle-slider
      v-model="phase"
      :min="50"
      :max="10000"
      knobColor="#ff8574"
      name="Phase"
    ></circle-slider>
    <circle-slider
      v-model="type"
      :min="50"
      :max="10000"
      knobColor="#ff8574"
      name="Type"
    ></circle-slider>
  </div>
</template>

<script>
import audio from '@/audio'
import CircleSlider from '@/components/knob.vue'
import display from '@/components/display.vue'

export default {
  name: 'OscillatorModule',
  props: {
    msg: String
  },
  data () {
    return {
      frequency: 2,
      typeArray: [
        'sine',
        'square',
        'sawtooth',
        'triangle'
      ],
      freqArray: [
        33,65,131,262,523,1047,2093,4186
      ],
      type: 0,
      detune: 1,
      phase: 0,
      oscillator: {}
    }
  },
  components: {
    CircleSlider,
    display
  },
  created () {
    this.oscillator = audio.oscillator.state.device
  },
  watch: {
    frequency (val) {
      // this might be abstracted away
      this.oscillator.frequency.value = this.freqArray[val]
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

svg.display {
    fill: #ff8574;
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
