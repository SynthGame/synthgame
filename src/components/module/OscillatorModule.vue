<template>
  <div class="module">
    <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
      <h2 slot="title">Tats</h2>
      <h3 v-if="dialsAreWithinMargin" slot="subtitle">Done!</h3>
      <h3 v-else slot="subtitle">Oscillator</h3>
    </module-title>
    <module-display
      class="display"
      module="oscillator"
      fill="#ff8574"
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
        :max="100"
        knobColor="#ff8574"
        name="Octave"
      ></module-knob>
      <module-knob
        v-model="detune"
        v-if="knobsAvailable.detune || createModeIsActive"
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
      <div class="button-wrapper"
        v-if="knobsAvailable.typeOsc"
        v-show="timerIsRunning"
      >
        <module-button color="#ff8574" shape="sine" :isPressed="typeOsc==='sine'" @click.native="typeOsc='sine'"/>
        <module-button color="#ff8574" shape="square" :isPressed="typeOsc==='square'" @click.native="typeOsc='square'"/>
        <module-button color="#ff8574" shape="sawtooth" :isPressed="typeOsc==='sawtooth'" @click.native="typeOsc='sawtooth'"/>
        <module-button color="#ff8574" shape="triangle" :isPressed="typeOsc==='triangle'" @click.native="typeOsc='triangle'"/>
        <p>WAVEFORM</p>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { vuexSyncGen, mapValueToRange } from '@/utils'
import { MODULE_OSCILLATOR_COLOR } from '@/constants'

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
      name: 'oscillator',
      typeDial: 0,
      freqDial: 0,
      oscillator: {},
      moduleColor: MODULE_OSCILLATOR_COLOR
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
    this.oscillator = audio.oscillator.state.device
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
    ...vuexSyncGen('oscillator', 'frequency', val => {
      self.oscillator.frequency.value = character.oscillator.frequency(val)
    }),
    ...vuexSyncGen('oscillator', 'typeOsc', val => {
      if (self.oscillator.type === character.oscillator.typeOsc(val)) return
      self.oscillator.type = character.oscillator.typeOsc(val)
      self.oscillator.stop()
      self.oscillator.start()
    }),
    // ...vuexSyncGen('oscillator', 'phase', val => {
    //   self.oscillator.phase = character.oscillator.phase(val) // phase in degrees
    // }),
    ...vuexSyncGen('oscillator', 'detune', val => {
      self.oscillator.detune.value = character.oscillator.detune(val)
    }),
    ...mapState({
      frequencyGoal: state => state.gameState.goal.oscillator.frequency,
      typeOscGoal: state => state.gameState.goal.oscillator.typeOsc,
      detuneGoal: state => state.gameState.goal.oscillator.detune,
      // phaseGoal: state => state.gameState.goal.oscillator.phase,
      typeArray: state => state.gameState.possibleValues.oscillator.typeOsc,
      freqArray: state => state.gameState.possibleValues.oscillator.frequency,
      knobsAvailable: state => state.gameState.knobsAvailable.oscillator,
      createModeIsActive: state => state.gameState.createModeIsActive
    })
  },
  watch: {
    freqDial(val) {
      this.frequency = this.freqArray[mapValueToRange(val, 100, (this.freqArray.length -1))]
    },
    typeDial(val) {
      this.typeOsc = this.typeArray[mapValueToRange(val, 100, (this.typeArray.length -1))]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

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
