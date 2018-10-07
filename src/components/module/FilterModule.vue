<template>
  <div class="module">
    <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
      <!-- <h2 slot="title">Tats</h2> -->
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
      <module-knob
        v-model="cutOffFreq"
        v-if="knobsAvailable.cutOffFreq || createModeIsActive"
        :min="0"
        :max="100"
        knobColor="#6e01d1"
        name="Frequency"
        module="filter"
      ></module-knob>
      <!-- <module-knob
        v-model="setQ"
        v-if="knobsAvailable.setQ || createModeIsActive"
        :min="0"
        :max="100"
        knobColor="#6e01d1"
        name="Resonance"
        module="filter"
      ></module-knob> -->
      <div
        v-if="knobsAvailable.type || createModeIsActive"
        class="button-wrapper"
      >
        <module-button color="#6e01d1" shape="lowpass" :isPressed="type==='lowpass'" @click.native="type='lowpass'"/>
        <module-button color="#6e01d1" shape="highpass" :isPressed="type==='highpass'" @click.native="type='highpass'"/>
        <module-button color="#6e01d1" shape="bandpass" :isPressed="type==='bandpass'" @click.native="type='bandpass'"/>
        <p>SHAPE</p>
      </div>
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
    this.envelope2 = audio.envelope2.state.device
  },
  methods: {
    envTwoAssigned () {
      return this.$store.state.envelope2.assign
    },
  },
  computed: {
    timerIsRunning () {
      return this.$store.state.gameState.timerIsRunning
    },
    dialsAreWithinMargin () {
      if (this.createModeIsActive) return false // quick hack
      this.title = 'Done!'
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin[this.name])
        .every(param => param)
    },
    ...vuexSyncGen('filter', 'cutOffFreq', val => {
      if (self.$store.state.audioParameters.router.envelope2 === 'filterCutoff') {
        self.filter.frequency.value = character.filter.cutOffFreq(val);
        audio.envelope2.state.device.max = character.filter.cutOffFreq(val)
      } else if (self.$store.state.audioParameters.router.lfo === 'filterCutoff') {
        audio.lfo.state.device.max = character.filter.cutOffFreq(val) * (1 + self.$store.state.audioParameters.lfo.amount/100);
        audio.lfo.state.device.min = character.filter.cutOffFreq(val) - (character.filter.cutOffFreq(val) * self.$store.state.audioParameters.lfo.amount/100) ;
      } else {
        self.filter.frequency.value = character.filter.cutOffFreq(val);
      }
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
      typeArray: state => state.gameState.possibleValues.filter.type,
      knobsAvailable: state => state.gameState.knobsAvailable.filter,
      createModeIsActive: state => state.gameState.createModeIsActive
    })
  },
  watch: {
    typeDial (val) {
      this.type = this.typeArray[mapValueToRange(val, 100, (this.typeArray.length - 1))]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

svg.display {
    fill: #6e01d1;
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

.button-wrapper{
  button {
    border-color: #6e01d1;
  }
}
</style>
