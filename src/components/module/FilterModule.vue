<template>
  <div class="module">
    <div class="title">
      <h2>Tats</h2>
      <h3>Filter</h3>
    </div>
    <module-display
      fill="#6e01d1"
      module="filter"
      :knobs="[{name: 'type', min: 0, max: 2, value: this.selectedType},
                {name: 'frequency', min: 0, max: 100, value: this.cutOffFreq},
                {name: 'q', min: 0, max: 100, value: this.setQ},
                {name: 'gain', min: 0, max: 100, value: this.gain}
                ]"/>
    <div class="knobs">
      <module-knob
        v-model="type"
        :min="0"
        :max="100"
        knobColor="#6e01d1"
        name="Type"
        module="filter"
      ></module-knob>
      <module-knob
        v-model="cutOffFreq"
        :min="0"
        :max="100"
        knobColor="#6e01d1"
        name="Frequency"
        module="filter"
      ></module-knob>
      <module-knob
        v-model="setQ"
        :min="0"
        :max="100"
        knobColor="#6e01d1"
        name="Resonance"
        module="filter"
      ></module-knob>
    </div>
  </div>

</template>

<script>
import { vuexSyncGen, mapValueToRange } from '@/utils'

import audio from '@/audio'
import ModuleKnob from '@/components/ModuleKnob.vue'
import ModuleDisplay from '@/components/ModuleDisplay.vue'

var self

export default {
  name: 'FilterModule',
  props: {
    msg: String
  },
  data () {
    return {
      typeArray: [
        'lowpass',
        'highpass',
        'bandpass'
      ],
      selectedType: '',
      filter: {},
      sliderValue: 0,
      displayHeight: 300,
      displayWidth: 600
    }
  },
  components: {
    ModuleKnob,
    ModuleDisplay
  },
  created () {
    self = this
    this.filter = audio.filter.state.device
  },
  methods: {

  },
  computed: {
    ...vuexSyncGen('filter', 'cutOffFreq', val => {
      // self.filter.frequency.value = val
      self.filter.frequency.value = Math.pow((val * 200), (val / 100)) + 20
    }),
    ...vuexSyncGen('filter', 'type', val => {
      self.filter.type = self.typeArray[mapValueToRange(val, 100, (self.typeArray.length - 1))]
      self.selectedType = self.typeArray[mapValueToRange(val, 100, (self.typeArray.length - 1))]
      if (self.filter.type === self.selectedType) return
      self.filter.type = self.selectedType
    }),
    ...vuexSyncGen('filter', 'setQ', val => {
      self.filter.Q.value = val / 8
    }),
    ...vuexSyncGen('filter', 'gain', val => {
      self.filter.gain.value = val
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

svg.display {
    fill: #6e01d1;
}

h3 {
  color: #6e01d1;
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
