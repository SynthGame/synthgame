<template>
  <div class="module">
    <display class="display" module="reverb"/>
    <circle-slider
      v-model="roomSize"
      :min="0"
      :max="100"
      knobColor="#3c32ff"
      name="Room Size"
    ></circle-slider>
    <!-- <circle-slider
      v-model="preDelay"
      :step-size="0.1"
      :min="2"
      :max="8"
      knobColor="#3c32ff"
      name="Predelay"
    ></circle-slider> -->
    <circle-slider
      v-model="wet"
      :min="0"
      :max="100"
      knobColor="#3c32ff"
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
  name: 'ReverbModule',
  props: {
    msg: String
  },
  data () {
    return {
      reverb: {},
      sliderValue: 0
    }
  },
  components: {
    CircleSlider,
    display
  },
  created () {
    self = this
    this.reverb = audio.reverb.state.device
  },
  computed: {
    ...vuexSyncGen('reverb', 'wet', val => {
      self.reverb.wet.value = val / 100
    }),
    ...vuexSyncGen('reverb', 'roomSize', val => {
      self.reverb.roomSize.value = val / 100
    })
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
