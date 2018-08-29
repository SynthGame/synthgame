<template>
  <div class="module">
  <display class="display" module="lfo"/>
    <circle-slider
      v-model="frequency"
      :min="1"
      :max="100"
      knobColor="#5bd484"
      name="Rate"
    ></circle-slider>
    <circle-slider
      v-model="amount"
      :min="0"
      :max="100"
      knobColor="#5bd484"
      name="Amount"
    ></circle-slider>
    <circle-slider
      v-model="type"
      :min="0"
      :max="3"
      knobColor="#5bd484"
      name="Shape"
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
  name: 'LfoModule',
  props: {
    msg: String
  },
  data () {
    return {
      typeArray: [
        'sine',
        'square',
        'sawtooth',
        'triangle'
      ],
      lfo: {}
    }
  },
  components: {
    CircleSlider,
    display
  },
  created () {
    self = this
    this.lfo = audio.lfo.state.device
  },
  computed: {
    ...vuexSyncGen('lfo', 'frequency', val => {
      self.lfo.frequency.value = Math.pow(val, (val / 100)) - 1
      console.log('self.lfo.frequency.value', self.lfo.frequency.value)
    }),
    ...vuexSyncGen('lfo', 'amount', val => {
      self.lfo.max = (val * 40)
    }),
    ...vuexSyncGen('lfo', 'type', val => {
      if(val >= self.typeArray.length) self.lfo.type = self.typeArray[self.typeArray.length - 1]
      else self.lfo.type = self.typeArray[val]
      self.lfo.stop()
      self.lfo.start()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

svg.display {
    fill: #5bd484;
}

h3 {
  margin: 40px 0 0;
}
ul {
  margin-top: 5em;
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
