<template>
  <div class="module">
    <display class="display" module="delay"/>
    <circle-slider
      v-model="delayTime"
      :min="0"
      :max="100"
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
import { vuexSyncGen } from '@/utils'

import audio from '@/audio'
import CircleSlider from '@/components/knob.vue'
import display from '@/components/display.vue'

var self

export default {
  name: 'DelayModule',
  data () {
    return {
      delay: {}
    }
  },
  components: {
    CircleSlider,
    display
  },
  created () {
    self = this
    this.delay = audio.delay.state.device
  },
  computed: {
    ...vuexSyncGen('delay', 'delayTime', val => {
      // const nth = 2 ** self.delayTime // 2 to the power of delaytime
      // return `${nth}n`
      console.log('val', val)
      self.delay.delayTime.value = val / 100
    }),
    ...vuexSyncGen('delay', 'wet', val => {
      self.delay.wet.value = val / 100
    }),
    ...vuexSyncGen('delay', 'feedback', val => {
      self.delay.feedback.value = val / 100
    })
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
