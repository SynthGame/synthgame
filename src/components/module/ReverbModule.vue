<template>
  <div class="module">
    <module-title :indicator-active="false" :module-color="moduleColor">
      <h2 slot="title">Tats</h2>
      <h3 slot="subtitle">Reverb</h3>
    </module-title>
    <!-- <display class="display" module="reverb"/> -->
    <div class="knobs">
      <module-knob
        v-model="roomSize"
        :min="0"
        :max="100"
        knobColor="#3c32ff"
        name="Room Size"
        module="reverb"
      ></module-knob>
      <module-knob
        v-model="wet"
        :min="0"
        :max="100"
        knobColor="#3c32ff"
        name="Dry/wet"
        module="reverb"
      ></module-knob>
    </div>
  </div>
</template>

<script>
import { vuexSyncGen } from '@/utils'
import { MODULE_REVERB_COLOR } from '@/constants'

import audio from '@/audio'
import ModuleKnob from '@/components/ModuleKnob.vue'
import ModuleDisplay from '@/components/ModuleDisplay.vue'
import ModuleTitle from './ModuleComponents/ModuleTitle.vue'

var self

export default {
  name: 'ReverbModule',
  props: {
    msg: String
  },
  data () {
    return {
      reverb: {},
      sliderValue: 0,
      moduleColor: MODULE_REVERB_COLOR
    }
  },
  components: {
    ModuleKnob,
    ModuleDisplay,
    ModuleTitle
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
  color: #3c32ff;
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
