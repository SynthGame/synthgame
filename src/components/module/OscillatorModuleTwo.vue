<template>
  <div class="module">
    <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
      <h2 slot="title">Tats</h2>
      <h3 v-if="dialsAreWithinMargin" slot="subtitle">Done!</h3>
      <h3 v-else slot="subtitle">Oscillator 2</h3>
    </module-title>
    <module-display
      class="display"
      module="oscillator"
      fill="#43bede"
      :knobs="[{name: 'Octave', min: freqArray[0], max: freqArray[freqArray.length -1], value: frequency},
              {name: 'Detune', min: -120, max: 120, value: detune},
              {name: 'Phase', min: 50, max: 10000, value: 0},
              {name: 'Waveform', min: 0, max:3, value: typeOsc},
              {name: 'OctaveGoal', min: freqArray[0], max: freqArray[freqArray.length -1], value: frequencyGoal},
              {name: 'DetuneGoal', min: -120, max: 120, value: detuneGoal},
              {name: 'PhaseGoal', min: 50, max: 10000, value: 0},
              {name: 'WaveformGoal', min: 0, max:3, value: typeOscGoal},
            ]"/>
    <div class="knobs">
      <module-knob
        v-model="freqDial"
        v-if="knobsAvailable.frequency || createModeIsActive"
        :min="0"
        :step="1"
        :max="freqArray.length - 1"
        knobColor="#43bede"
        name="Octave"
      ></module-knob>
      <module-knob
        v-model="detune"
        v-if="knobsAvailable.detune || createModeIsActive"
        :min="0"
        :max="100"
        knobColor="#43bede"
        name="Detune"
      ></module-knob>
      <!-- <module-knob
        v-model="phase"
        :min="50"
        :max="10000"
        knobColor="#ff8574"
        name="Phase"
      ></module-knob> -->
      <div class="button-wrapper"
        v-if="knobsAvailable.typeOsc || createModeIsActive"
      >
        <module-button color="#43bede" shape="sine" :isPressed="typeOsc==='sine'" @click.native="typeOsc='sine'"/>
        <module-button color="#43bede" shape="square" :isPressed="typeOsc==='square'" @click.native="typeOsc='square'"/>
        <module-button color="#43bede" shape="sawtooth" :isPressed="typeOsc==='sawtooth'" @click.native="typeOsc='sawtooth'"/>
        <module-button color="#43bede" shape="triangle" :isPressed="typeOsc==='triangle'" @click.native="typeOsc='triangle'"/>
        <p>WAVEFORM</p>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { vuexSyncGen, mapValueToRange } from '@/utils'
import { MODULE_OSCILLATORTWO_COLOR } from '@/constants'

import audio from '@/audio'
import character from '@/character'
import ModuleKnob from '@/components/ModuleKnob.vue'
import ModuleDisplay from '@/components/ModuleDisplay.vue'
import ModuleTitle from './ModuleComponents/ModuleTitle.vue'
import ModuleButton  from '@/components/ModuleButton'

var self

export default {
  name: 'OscillatorModule',
  data () {
    return {
      name: 'oscillator2',
      typeDial: 0,
      freqDial: 0,
      oscillator2: {},
      moduleColor: MODULE_OSCILLATORTWO_COLOR
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
    this.oscillator2 = audio.oscillator2.state.device
  },
  computed: {
    timerIsRunning () {
      return this.$store.state.gameState.timerIsRunning
    },
    dialsAreWithinMargin() {
      if(this.createModeIsActive) return false // quick hack
      this.title = 'Done!'
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin[this.name])
        .every(param => param)
    },
    ...vuexSyncGen('oscillator2', 'frequency', val => {
      self.oscillator2.frequency.value = character.oscillator2.frequency(val)
    }),
    ...vuexSyncGen('oscillator2', 'typeOsc', val => {
      if (self.oscillator2.type === character.oscillator2.typeOsc(val)) return
      self.oscillator2.type = character.oscillator2.typeOsc(val)
      self.oscillator2.stop()
      self.oscillator2.start()
    }),
    // ...vuexSyncGen('oscillator2', 'phase', val => {
    //   self.oscillator2.phase = character.oscillator2.phase(val) // phase in degrees
    // }),
    ...vuexSyncGen('oscillator2', 'detune', val => {
      self.oscillator2.detune.value = character.oscillator2.detune(val)
    }),
    ...mapState({
      frequencyGoal: state => state.gameState.goal.oscillator2.frequency,
      typeOscGoal: state => state.gameState.goal.oscillator2.typeOsc,
      detuneGoal: state => state.gameState.goal.oscillator2.detune,
      // phaseGoal: state => state.gameState.goal.oscillator2.phase,
      typeArray: state => state.gameState.possibleValues.oscillator2.typeOsc,
      freqArray: state => state.gameState.possibleValues.oscillator2.frequency,
      knobsAvailable: state => state.gameState.knobsAvailable.oscillator2,
      createModeIsActive: state => state.gameState.createModeIsActive
    })
  },
  watch: {
    freqDial(val) {
      this.frequency = this.freqArray[val]
      // this.frequency = this.freqArray[mapValueToRange(val, 100, (this.freqArray.length -1))]
    },
    typeDial(val) {
      this.typeOsc = this.typeArray[mapValueToRange(val, 100, (this.typeArray.length -1))]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.module .button-wrapper button {
    border: 1px solid #43bede;
}

svg.display {
    fill: #43bede;
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
  color: #43bede;
}
</style>
