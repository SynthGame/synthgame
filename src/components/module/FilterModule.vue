<template>
  <div class="module" :style="'background:' + moduleColor">
    <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
      <h2 slot="title">Tats</h2>
      <h3 v-if="dialsAreWithinMargin" slot="subtitle">Done!</h3>
      <h3 v-else slot="subtitle">Filter</h3>
    </module-title>
    <module-display
      fill="#6e01d1"
      module="filter"
      :knobs="[{name: 'type', min: 0, max: 2, value: type},
                {name: 'frequency', min: 0, max: 100, value: cutOffFreq},
                {name: 'q', min: 0, max: 100, value: setQ},
                {name: 'gain', min: 0, max: 100, value: gain},
                {name: 'typeGoal', min: 0, max: 2, value: typeGoal},
                {name: 'frequencyGoal', min: 0, max: 100, value: cutOffFreqGoal},
                {name: 'qGoal', min: 0, max: 100, value: setQGoal},
                {name: 'gainGoal', min: 0, max: 100, value: gain},
                ]"/>
    <div class="knobs">
            <div class="button-wrapper">
        <module-button color="#6e01d1" shape="lowpass" :isPressed="type==='lowpass'" @click.native="type='lowpass'"/>
        <module-button color="#6e01d1" shape="highpass" :isPressed="type==='highpass'" @click.native="type='highpass'"/>
        <module-button color="#6e01d1" shape="bandpass" :isPressed="type==='bandpass'" @click.native="type='bandpass'"/>
<p>SHAPE</p>
      </div>

      <!-- <module-knob
        v-model="typeDial"
        :min="0"
        :max="100"
        knobColor="#6e01d1"
        name="Type"
        module="filter"
      ></module-knob> -->
      <!-- <module-knob
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
      ></module-knob> -->
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import { vuexSyncGen, mapValueToRange } from '@/utils'
import { MODULE_FILTER_COLOR } from '@/constants'

import audio from '@/audio'
import character from '@/character'
import ModuleKnob from '@/components/ModuleKnob.vue'
import ModuleDisplay from '@/components/ModuleDisplay.vue'
import ModuleTitle from './ModuleComponents/ModuleTitle.vue'
import ModuleButton from '@/components/ModuleButton.vue'

var self

export default {
  name: 'FilterModule',
  data () {
    return {
      name: 'filter',
      typeDial: 0,
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
    ModuleTitle,
    ModuleButton
  },
  created () {
    self = this
    this.filter = audio.filter.state.device
  },
  methods: {

  },
  computed: {
    dialsAreWithinMargin() {
      this.title = 'Done!';
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin[this.name])
        .every(param => param)
    },
    ...vuexSyncGen('filter', 'cutOffFreq', val => {
      // self.filter.frequency.value = val
      self.filter.frequency.value = character.filter.cutOffFreq(val)
    }),
    ...vuexSyncGen('filter', 'type', val => {
      self.filter.type = character.filter.type(val)
    }),
    ...vuexSyncGen('filter', 'setQ', val => {
      self.filter.Q.value = character.filter.setQ(val)
    }),
    // ...vuexSyncGen('filter', 'gain', val => {
    //   self.filter.gain.value = val
    // }),
    ...mapState({
      cutOffFreqGoal: state => state.gameState.goal.filter.cutOffFreq,
      typeGoal: state => state.gameState.goal.filter.type,
      setQGoal: state => state.gameState.goal.filter.setQ,
      typeArray: state => state.gameState.possibleValues.filter.type
    })
  },
  watch: {
    typeDial(val) {
      this.type = this.typeArray[mapValueToRange(val, 100, (this.typeArray.length -1))]
    }
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
button, input[type="submit"], input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    outline: inherit;
      border: 1px #6e01d1 solid;
  justify-content: center;
  align-items: center;
  display: flex;
  min-width: 40%;

  min-height: 1.3rem;
  cursor: pointer;
  margin: 0.1rem
}

  p {
     margin: .5em 0 0 0;
     font-size: .7em;
     text-transform: uppercase;
     letter-spacing: 1px;
  }
  .button-wrapper {
      display: flex;
      flex-wrap: wrap;
      width: 25%;
      min-width: 5rem;
  }

.selected {
  background-color: #6e01d1
}

</style>
