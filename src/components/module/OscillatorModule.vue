<template>
  <div class="module">
    <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
      <h2 slot="title">Tats</h2>
      <h3 slot="subtitle">Oscillator</h3>
    </module-title>
    <module-display
      class="display"
      module="oscillator"
      fill="#ff8574"
      :knobs="[{name: 'Octave', min: freqArray[0], max: freqArray[freqArray.length -1], value: this.selectedFreq},
              {name: 'Detune', min: -120, max: 120, value: this.detune},
              {name: 'Phase', min: 50, max: 10000, value: 0},
              {name: 'Waveform', min: 0, max:3, value: this.selectedType},
              {name: 'OctaveGoal', min: freqArray[0], max: freqArray[freqArray.length -1], value: freqArray[Math.round((this.frequencyGoal/100)*(freqArray.length - 1))]},
              {name: 'DetuneGoal', min: -120, max: 120, value: this.detuneGoal},
              {name: 'PhaseGoal', min: 50, max: 10000, value: 0},
              {name: 'WaveformGoal', min: 0, max:3, value: typeArray[Math.round((this.typeOscGoal/100)*(typeArray.length - 1))]},
            ]"/>
    <div class="knobs">
      <module-knob
        v-model="typeOsc"
        :min="0"
        :max="100"
        knobColor="#ff8574"
        name="Waveform"
        module="oscillator"
      ></module-knob>
      <module-knob
        v-model="frequency"
        :min="0"
        :max="100"
        knobColor="#ff8574"
        name="Octave"
      ></module-knob>
      <module-knob
        v-model="detune"
        :min="0"
        :max="120"
        knobColor="#ff8574"
        name="Detune"
      ></module-knob>
      <!-- <module-knob
        v-model="phase"
        :min="50"
        :max="10000"
        knobColor="#ff8574"
        name="Phase"
      ></module-knob> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { vuexSyncGen, mapValueToRange } from '@/utils'
import { MODULE_OSCILLATOR_COLOR } from '@/constants'

import audio from '@/audio'
import ModuleKnob from '@/components/ModuleKnob.vue'
import ModuleDisplay from '@/components/ModuleDisplay.vue'
import ModuleTitle from './ModuleComponents/ModuleTitle.vue'

var self

export default {
  name: 'OscillatorModule',
  data () {
    return {
      typeArray: [
        'sine',
        'square',
        'sawtooth',
        'triangle'
      ],
      selectedType: '',
      freqArray: [
        33, 65, 131, 262, 523, 1047, 2093, 4186
      ],
      selectedFreq: '',
      oscillator: {},
      moduleColor: MODULE_OSCILLATOR_COLOR
    }
  },
  components: {
    ModuleKnob,
    ModuleDisplay,
    ModuleTitle
  },
  created () {
    self = this
    this.oscillator = audio.oscillator.state.device
  },
  computed: {
    dialsAreWithinMargin() {
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin['oscillator'])
        .every(param => param)        
    },
    ...vuexSyncGen('oscillator', 'frequency', val => {
      self.selectedFreq = self.freqArray[mapValueToRange(val, 100, (self.freqArray.length - 1))]
      self.oscillator.frequency.value = self.selectedFreq
    }),
    ...vuexSyncGen('oscillator', 'typeOsc', val => {
      self.selectedType = self.typeArray[mapValueToRange(val, 100, (self.typeArray.length - 1))]
      if (self.oscillator.type === self.selectedType) return
      self.oscillator.type = self.selectedType
      self.oscillator.stop()
      self.oscillator.start()
    }),
    ...vuexSyncGen('oscillator', 'phase', val => {
      self.oscillator.phase = val // phase in degrees
    }),
    ...vuexSyncGen('oscillator', 'detune', val => {
      self.oscillator.detune.value = (val * 2) - 120
    }),
    ...mapState({
      frequencyGoal: state => state.gameState.goal.oscillator.frequency,
      typeOscGoal: state => state.gameState.goal.oscillator.typeOsc,
      detuneGoal: state => state.gameState.goal.oscillator.detune,
      phaseGoal: state => state.gameState.goal.oscillator.phase
    })
  },
  watch: {
    dialsAreWithinMargin(val) {
      if(val === true) {
        alert('well done!')
        // this.$store.dispatch('randomizeAudioParameters')
        this.$store.dispatch('randomizGoalParameters')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

h3 {
  color: #ff8574;
}

svg.display {
    fill: #ff8574;
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
