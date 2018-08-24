<template>
  <div class="hello">
    <div style="margin: auto">
    <display :data="attack"/></div>
    <circle-slider
      v-model="attack"
      :min="50"
      :max="10000"
    ></circle-slider>
  </div>
</template>

<script>
import audio from '@/audio'
import VueCircleSlider from 'vue-circle-slider'
import display from '@/components/display.vue'

export default {
  name: 'EnvelopeModule',
  props: {
    msg: String
  },
  data () {
    return {
      attack: 1,
      delay: 1,
      sustain: 1,
      release: 0,
      envelope: {},
    }
  },
  components: {
    'rotary': VueCircleSlider,
    display
  },
  created () {
    this.envelope = new audio.state.Tone
      .Envelope(
        this.attack,
        this.delay,
        this.sustain,
        this.release
      )

    // audio.synth.state.synth.disconnect()
    // audio.synth.state.synth.connect(this.filter)
    // audio.connectChanelToMaster(this.filter)
  },
  watch: {
    attack (val) {
      // this might be abstracted away
      this.envelope.attack.value = val
    },
    decay (val) {
      // this might be abstracted away
      this.envelope.decay.value = val
    },
    sustain (val) {
      // this might be abstracted away
      this.envelope.sustain.value = val
    },
    release (val) {
      // this might be abstracted away
      this.envelope.release.value = val
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
