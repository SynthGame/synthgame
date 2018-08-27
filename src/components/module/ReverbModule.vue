<template>
  <div class="hello">
    <div style="margin: auto">
    <display :data="decay"/></div>
    <circle-slider
      v-model="decay"
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
    'rotary': VueCircleSlider,
    display
  },
  created () {
    this.reverb = new audio.state.Tone
      .Reverb({
        decay: this.decay,
        preDelay: this.preDelay
      })

    // audio.synth.state.synth.disconnect()
    // audio.synth.state.synth.connect(this.filter)
    // audio.connectChanelToMaster(this.filter)
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
