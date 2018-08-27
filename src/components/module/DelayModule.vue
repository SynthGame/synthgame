<template>
  <div class="hello">
    <div style="margin: auto">
    <display :data="delayTime"/></div>
    <circle-slider
      v-model="delayTime"
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
  name: 'DelayModule',
  props: {
    msg: String
  },
  data () {
    return {
      delayTime: '1',
      mappedDelayTime: '8n',
      wet: 0,
      feedback: 1,
      delay: {}
    }
  },
  components: {
    'rotary': VueCircleSlider,
    display
  },
  created () {
    this.delay = new audio.state.Tone
      .FeedbackDelay(this.delayTime, this.feedback)

    // audio.synth.state.synth.disconnect()
    // audio.synth.state.synth.connect(this.filter)
    // audio.connectChanelToMaster(this.filter)
  },
  watch: {
    mappedDelayTime (val) {
      // this might be abstracted away
      this.delay.mappedDelayTime.value = val
    },
    wet (val) {
      // this might be abstracted away
      this.delay.wet.value = val
    },
    feedback (val) {
      // this might be abstracted away
      this.delay.feedback.value = val
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
