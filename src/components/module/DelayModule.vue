<template>
  <div class="module">
    <display class="display" module="delay"/>
    <circle-slider
      v-model="delayTime"
      :step-size="1"
      :min="1"
      :max="6"
      knobColor="#43bede"
      name="Time"
    ></circle-slider>
    <circle-slider
      v-model="feedback"
      :min="0"
      :max="100"
      knobColor="#43bede"
      name="Feedback"
    ></circle-slider>
    <circle-slider
      v-model="wet"
      :min="0"
      :max="100"
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
      wet: 1,
      feedback: 100,
      delay: {}
    }
  },
  components: {
    CircleSlider,
    display
  },
  created () {
    this.delay = audio.delay.state.device
  },
  computed: {
    mappedDelayTime () {
      const nth = 2 ** this.delayTime // 2 to the power of delaytime
      return `${nth}n`
    }
  },
  watch: {
    mappedDelayTime (val) {
      // this might be abstracted away
      this.delay.delayTime.value = val;
      // this.delay.stop();
      // this.delay.start();
      console.log('this.delay.delayTime', this.delay.delayTime);
    },
    wet (val) {
      // this might be abstracted away
      this.delay.wet.value = val /100
    },
    feedback (val) {
      // this might be abstracted away
      this.delay.feedback.value = val /100
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
