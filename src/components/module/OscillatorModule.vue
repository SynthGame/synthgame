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
      <!-- <module-knob
        v-model="typeDial"
        :min="0"
        :max="100"
        knobColor="#ff8574"
        name="Waveform"
        module="oscillator"
      ></module-knob> -->
      <!-- <module-knob
        v-model="freqDial"
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
      ></module-knob> -->
      <!-- <module-knob
        v-model="phase"
        :min="50"
        :max="10000"
        knobColor="#ff8574"
        name="Phase"
      ></module-knob> -->
      <div class="button-wrapper">
        <button @click="typeOsc='sine'" :class="typeOsc==='sine' ? 'selected': ''">
          <svg version="1.1"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
            x="0px" y="0px" width="16.3px" height="8.8px" viewBox="0 0 16.3 8.8" style="enable-background:new 0 0 16.3 8.8;"
            xml:space="preserve">
            <path class="st0" d="M15.7,4.4c0,2.1-1.7,3.8-3.8,3.8S8.2,6.5,8.2,4.4S6.5,0.6,4.4,0.6S0.6,2.3,0.6,4.4"/>
          </svg>
        </button>
                <button @click="typeOsc='square'" :class="typeOsc==='square' ? 'selected': ''">
    <svg version="1.1"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"   xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
      x="0px" y="0px" width="16.3px" height="16.3px" viewBox="0 0 16.3 16.3"    style="enable-background:new 0 0 16.3 16.3;"
      xml:space="preserve">
      <path class="st0" d="M0.6,8.1V0.6h7.6v7.6v7.6h7.6V8.1l0,0"/>
    </svg>
        </button>
                <button @click="typeOsc='sawtooth'" :class="typeOsc==='sawtooth' ? 'selected': ''">
    <svg version="1.1"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
    x="0px" y="0px" width="21.9px" height="9.9px" viewBox="0 0 21.9 9.9" style="enable-background:new 0 0 21.9 9.9;"
    xml:space="preserve">
    <path class="st0" d="M21.5,1.2L21.5,1.2L10.9,8.8V1.2L0.3,8.8"/>
    </svg>
        </button>
                <button @click="typeOsc='triangle'" :class="typeOsc==='triangle' ? 'selected': ''">
    <svg version="1.1"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
      x="0px" y="0px" width="15.9px" height="8.8px" viewBox="0 0 15.9 8.8" style="enable-background:new 0 0 15.9 8.8;"
      xml:space="preserve">
      <path class="st0" d="M0.4,8.4L8,0.8l7.5,7.6"/>
    </svg>
        </button>
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
    dialsAreWithinMargin() {
      this.title = 'Done!';
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
button, input[type="submit"], input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    // cursor: pointer;
    outline: inherit;
      border: 1px #ff8574 solid;
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
  background-color: #ff8574
}
</style>
