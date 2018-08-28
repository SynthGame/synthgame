<template>
  <div class="module">
    <display class="display" module="reverb"/>
    <circle-slider
      v-model="decay"
      :step-size="0.1"
      :min="2"
      :max="8"
      knobColor="#3c32ff"
      name="Time"
    ></circle-slider>
    <circle-slider
      v-model="preDelay"
      :step-size="0.1"
      :min="2"
      :max="8"
      knobColor="#3c32ff"
      name="Predelay"
    ></circle-slider>
    <circle-slider
      v-model="wet"
      :min="0"
      :max="1"
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

var self = undefined

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
    ...vuexSyncGen('reverb', 'decay', val => { // setting this smaler than 2 will produce an error with scheduling
      // const mappedDecay = `${2 ** val}n`
      console.log(val)
      audio.reverb.setParameter('decay', val)
    }),
    ...vuexSyncGen('reverb', 'preDelay', val => {
      // const mappedPreDelay = `${2 ** val}n`
      audio.reverb.setParameter('preDelay', val)
    }),
    ...vuexSyncGen('reverb', 'wet', val => {
      self.reverb.wet.value = val
    }),
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
