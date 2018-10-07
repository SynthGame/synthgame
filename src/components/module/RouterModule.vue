<template>
  <div class="module">
    <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
      <!-- <h2 slot="title">Tats</h2> -->
      <h3 v-if="dialsAreWithinMargin" slot="subtitle">Done!</h3>
      <h3 v-else slot="subtitle">Modulation</h3>
    </module-title>
    <module-display
      class="display"
      module="router"
      fill="#000"
      :knobs="[{name: 'Lfo', min: 0, max: 100, value: lfo},
              {name: 'Envelope2', min: 0, max: 100, value: envelope2},
              {name: 'LfoGoal', min: 0, max: 100, value: lfoGoal},
              {name: 'Envelope2Goal', min: 0, max:100, value: envelope2Goal},
              {name: 'OctaveGoal', min: 0, max: 100, value: 0},
              {name: 'DetuneGoal', min: -120, max: 120, value: 0},
              {name: 'VolumeGoal', min: 0, max: 1, value: 0},
              {name: 'WaveformGoal', min: 0, max:3, value: 0},
            ]"/>
    <div class="knobs">
      <!-- <module-knob
        v-model="freqDial"
        v-if="knobsAvailable.frequency || createModeIsActive"
        :min="0"
        :step="1"
        :max="freqArray.length - 1"
        knobColor="#ff8574"
        name="Octave"
      ></module-knob> -->
      <!-- <div class="octave-wrapper"
        v-if="knobsAvailable.frequency || createModeIsActive"
      >
        <div class="switch">
          <button color="#ff8574" @click="incrementOctave">
            <svg version="1.1"
              x="0px" y="0px" width="12.3px" height="12.6px" viewBox="0 0 12.3 6.6" style="enable-background:new 0 0 12.3 6.6;"
              xml:space="preserve">
              <g>
                  <polyline class="st0" points="12,6.2 6.3,0.6 0.3,6.2     "/>
              </g>
            </svg>
          </button>
          <button color="#ff8574" @click="decrementOctave">  <svg version="1.1"
              x="0px" y="0px" width="12.3px" height="12.6px" viewBox="0 0 12.3 6.6" style="transform: rotate(180deg);enable-background:new 0 0 12.3 6.6;"
              xml:space="preserve">
              <g>
                  <polyline class="st0" points="12,6.2 6.3,0.6 0.3,6.2     "/>
              </g>
            </svg>
          </button>
        </div>
        <p>OCTAVE</p>
      </div> -->
      <!-- <module-knob
        v-model="detune"
        v-if="knobsAvailable.detune || createModeIsActive"
        :min="0"
        :max="100"
        knobColor="#ff8574"
        name="Pitch"
      ></module-knob> -->
      <!-- <module-knob
        v-model="phase"
        :min="50"
        :max="10000"
        knobColor="#ff8574"
        name="Phase"
      ></module-knob> -->
      <div class="button-wrapper"
        v-if="knobsAvailable.envelope2 || createModeIsActive"
      >
      <module-button :color="moduleColor" shape="frq" :isPressed="envelope2==='oscsDetune'" @click.native="envelope2='oscsDetune'"/>
      <module-button :color="moduleColor" shape="osc1 frq" :isPressed="envelope2==='osc1Detune'" @click.native="envelope2='osc1Detune'"/>
      <module-button :color="moduleColor" shape="fil frq" :isPressed="envelope2==='filterCutoff'" @click.native="envelope2='filterCutoff'"/>
      <!-- <module-button :color="moduleColor" shape="lfo frq" :isPressed="envelope2==='lfoFrequency'" @click.native="envelope2='lfoFrequency'"/> -->
        <p>mod Env</p>
      </div>
      <div class="button-wrapper"
        v-if="knobsAvailable.lfo || createModeIsActive"
      >
        <module-button :color="moduleColor" shape="frq" :isPressed="lfo==='oscsDetune'" @click.native="lfo='oscsDetune'"/>
        <module-button :color="moduleColor" shape="osc1 frq" :isPressed="lfo==='osc1Detune'" @click.native="lfo='osc1Detune'"/>
        <module-button :color="moduleColor" shape="fil frq" :isPressed="lfo==='filterCutoff'" @click.native="lfo='filterCutoff'"/>
        <!-- <module-button color="#ff8574" shape="fil frq" :isPressed="lfo==='env1decay'" @click.native="lfo='env1decay'"/> -->
        <p>Mod LFO</p>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { vuexSyncGen, mapValueToRange } from '@/utils'
import { MODULE_ROUTER_COLOR } from '@/constants'

import audio from '@/audio'
import character from '@/character'
import ModuleKnob from '@/components/ModuleKnob.vue'
import ModuleDisplay from '@/components/ModuleDisplay.vue'
import ModuleTitle from './ModuleComponents/ModuleTitle.vue'
import ModuleButton from '@/components/ModuleButton'

var self

export default {
  name: 'RouterModule',
  data () {
    return {
      name: 'router',
      oscillator1: {},
      moduleColor: MODULE_ROUTER_COLOR
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
    this.realEnvelope2 = audio.envelope2.state.device
    this.filter = audio.filter.state.device

    // this.lfo = audio.lfo.state.device
  },
  methods: {
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
    // ...vuexSyncGen('oscillator1', 'frequency', val => {
    //   self.oscillator1.frequency.value = character.oscillator1.frequency(val)
    // }),
    ...vuexSyncGen('router', 'lfo', val => {
      audio.connectLfo(val);
      self.filter.frequency.value = character.filter.cutOffFreq(self.$store.state.audioParameters.filter.cutOffFreq);
      if (val === 'filterCutoff' && self.envelope2 === 'filterCutoff') {
        self.envelope2 = 'oscsDetune'
      }
    }),
    ...vuexSyncGen('router', 'envelope2', val => {
      audio.connectEnvelope2(val)
      // if (val ==='filterCutoff') {
      //   self.realEnvelope2.max = character.filter.cutOffFreq(self.$store.state.audioParameters.filter.cutOffFreq)
      // } else {
        self.filter.frequency.value = character.filter.cutOffFreq(self.$store.state.audioParameters.filter.cutOffFreq);
      // }
      if (val === 'filterCutoff' && self.lfo === 'filterCutoff') {
        self.lfo = 'oscsDetune'
      }
    }),
    ...mapState({
      lfoGoal: state => state.gameState.goal.router.lfo,
      envelope2Goal: state => state.gameState.goal.router.envelope2,
      lfoArray: state => state.gameState.possibleValues.router.lfo,
      envelope2Array: state => state.gameState.possibleValues.router.envelope2,
      knobsAvailable: state => state.gameState.knobsAvailable.router,
      createModeIsActive: state => state.gameState.createModeIsActive,
      cutOffFreq: state => state.gameState.filter.cutOffFreq
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.knobs {
  justify-content: center;
  flex-direction: column;
}

.switch {
  border: 1px solid #313131;
}

button.button {
  border: 1px solid #fff;
}

svg.display {
    fill: #fff;
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
  color: #fff;
}
</style>
