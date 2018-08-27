<template>
  <div class="module">
    <display class="display" module="filter" :lowpass="cutOffFreq" :highpass="cutOffFreq1" :gain="gain"/>
    <circle-slider
      v-model="delayTime"
      :step-size="1"
      :min="50"
      :max="10000"
      knobColor="#43bede"
      name="Time"
    ></circle-slider>
    <circle-slider
      v-model="feedback"
      :min="50"
      :max="10000"
      knobColor="#43bede"
      name="Feedback"
    ></circle-slider>
    <circle-slider
      v-model="wet"
      :min="50"
      :max="10000"
      knobColor="#43bede"
      name="Dry/wet"
    ></circle-slider>
  </div>
</template>

<script>
import audio from '@/audio'
import CircleSlider from '@/components/knob.vue'
import display from '@/components/display.vue'

export default {
  name: 'DelayModule',
  props: {
    msg: String
  },
  data () {
    return {
      delayTime: 1,
      mappedDelayTime: '8n',
      wet: 0,
      feedback: 1,
      delay: {}
    }
  },
  components: {
    CircleSlider,
    display
  },
  created () {
    this.delay = audio.delay.state.device

    // audio.synth.state.synth.disconnect()
    // audio.synth.state.synth.connect(this.filter)
    // audio.connectChanelToMaster(this.filter)
  },
  watch: {
    mappedDelayTime (val) {
      // this might be abstracted away
      this.delay.delayTime.value = val
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

svg.display {
    fill: #43bede;
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
