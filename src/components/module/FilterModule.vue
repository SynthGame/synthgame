<template>
  <div class="module">
    <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
      <h2 slot="title">Tats</h2>
      <h3 slot="subtitle">Filter</h3>
    </module-title>
    <module-display
      fill="#6e01d1"
      module="filter"
      :knobs="[{name: 'type', min: 0, max: 2, value: this.selectedType},
                {name: 'frequency', min: 0, max: 100, value: this.cutOffFreq},
                {name: 'q', min: 0, max: 100, value: this.setQ},
                {name: 'gain', min: 0, max: 100, value: this.gain},
                {name: 'typeGoal', min: 0, max: 2, value: typeArray[Math.round((this.typeGoal/100)*(typeArray.length - 1))]},
                {name: 'frequencyGoal', min: 0, max: 100, value: this.cutOffFreqGoal},
                {name: 'qGoal', min: 0, max: 100, value: this.setQGoal},
                {name: 'gainGoal', min: 0, max: 100, value: this.gain},
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
import { mapState } from 'vuex'
import { vuexSyncGen, mapValueToRange } from '@/utils'
import { MODULE_FILTER_COLOR } from '@/constants'

import audio from '@/audio'
import ModuleKnob from '@/components/ModuleKnob.vue'
import ModuleDisplay from '@/components/ModuleDisplay.vue'
import ModuleTitle from './ModuleComponents/ModuleTitle.vue'

var self

export default {
  name: 'FilterModule',
  data () {
    return {
      name: 'filter',
      typeArray: [
        'lowpass',
        'highpass',
        'bandpass'
      ],
      selectedType: '',
      filter: {},
      sliderValue: 0,
      displayHeight: 300,
      displayWidth: 600,
      gain: 60,
      moduleColor: MODULE_FILTER_COLOR
    }
  },
  components: {
    ModuleKnob,
    ModuleDisplay,
    ModuleTitle
  },
  created () {
    self = this
    this.filter = audio.filter.state.device
  },
  methods: {

  },
  computed: {
    dialsAreWithinMargin() {
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin[this.name])
        .every(param => param)        
    },
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
    // ...vuexSyncGen('filter', 'gain', val => {
    //   self.filter.gain.value = val
    // }),
    ...mapState({
      cutOffFreqGoal: state => state.gameState.goal.filter.cutOffFreq,
      typeGoal: state => state.gameState.goal.filter.type,
      setQGoal: state => state.gameState.goal.filter.setQ,
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
