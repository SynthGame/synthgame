<template>
  <div class="module">
    <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
      <!-- <h2 slot="title">Tats</h2> -->
      <h3 v-if="dialsAreWithinMargin" slot="subtitle">Done!</h3>
      <h3 v-else slot="subtitle">Oscillator 1</h3>
    </module-title>
    <module-display
      class="display"
      module="oscillator"
      fill="#ff8574"
      :knobs="[{name: 'Octave', min: freqArray[0], max: freqArray[freqArray.length -1], value: frequency},
              {name: 'Detune', min: -120, max: 120, value: detune},
              {name: 'Volume', min: 0, max: 1, value: 1},
              {name: 'Waveform', min: 0, max:3, value: typeOsc},
              {name: 'OctaveGoal', min: freqArray[0], max: freqArray[freqArray.length -1], value: frequencyGoal},
              {name: 'DetuneGoal', min: -120, max: 120, value: detuneGoal},
              {name: 'VolumeGoal', min: 0, max: 1, value: 1},
              {name: 'WaveformGoal', min: 0, max:3, value: typeOscGoal},
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
      <div class="octave-wrapper"
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
      </div>
      <module-knob
        v-model="detune"
        v-if="knobsAvailable.detune || createModeIsActive"
        :min="0"
        :max="100"
        knobColor="#ff8574"
        name="Pitch"
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
import { mapState } from "vuex";
import { vuexSyncGen, mapValueToRange } from "@/utils";
import { MODULE_OSCILLATORONE_COLOR } from "@/constants";

import audio from "@/audio";
import character from "@/character";
import ModuleKnob from "@/components/ModuleKnob.vue";
import ModuleDisplay from "@/components/ModuleDisplay.vue";
import ModuleTitle from "./ModuleComponents/ModuleTitle.vue";
import ModuleButton from "@/components/ModuleButton";

var self;

export default {
  name: "OscillatorModule",
  data() {
    return {
      name: "oscillator1",
      oscillator1: {},
      moduleColor: MODULE_OSCILLATORONE_COLOR
    };
  },
  components: {
    ModuleKnob,
    ModuleDisplay,
    ModuleTitle,
    ModuleButton
  },
  created() {
    self = this;
    this.oscillator1 = audio.oscillator1.state.device;
  },
  methods: {
    incrementOctave() {
      let currentOctave = this.freqArray.findIndex(el => el == this.frequency);
      if (currentOctave < 3) {
        this.frequency = this.freqArray[currentOctave + 1];
      }
    },
    decrementOctave() {
      let currentOctave = this.freqArray.findIndex(el => el == this.frequency);
      if (currentOctave > 0) {
        this.frequency = this.freqArray[currentOctave - 1];
      }
    }
  },
  computed: {
    timerIsRunning() {
      return this.$store.state.gameState.timerIsRunning;
    },
    dialsAreWithinMargin() {
      if (this.createModeIsActive) return false; // quick hack
      this.title = "Done!";
      return Object.values(
        this.$store.getters.audioParametersMatchGoalWithMargin[this.name]
      ).every(param => param);
    },
    // freqDial: {
    //   get () {
    //     return this.freqArray.findIndex(el => el == this.frequency)
    //   },
    //   set (val) {
    //     this.frequency = this.freqArray[val]
    //   }
    // },
    ...vuexSyncGen("oscillator1", "frequency", val => {
      // self.oscillator1.frequency.value = character.oscillator1.frequency(val)
    }),
    ...vuexSyncGen("oscillator1", "typeOsc", val => {
      // if (self.oscillator1.type === character.oscillator1.typeOsc(val)) return;
      self.oscillator1.type = character.oscillator1.typeOsc(val);
      // console.log("self.oscillator1.type", self.oscillator1.type);
      self.oscillator1.stop();
      self.oscillator1.start();
    }),
    // ...vuexSyncGen('oscillator1', 'phase', val => {
    //   self.oscillator1.phase = character.oscillator1.phase(val) // phase in degrees
    // }),
    ...vuexSyncGen("oscillator1", "detune", val => {
      self.oscillator1.detune.value = character.oscillator1.detune(val);
    }),
    ...mapState({
      frequencyGoal: state => state.gameState.goal.oscillator1.frequency,
      typeOscGoal: state => state.gameState.goal.oscillator1.typeOsc,
      detuneGoal: state => state.gameState.goal.oscillator1.detune,
      // phaseGoal: state => state.gameState.goal.oscillator1.phase,
      typeArray: state => state.gameState.possibleValues.oscillator1.typeOsc,
      freqArray: state => state.gameState.possibleValues.oscillator1.frequency,
      knobsAvailable: state => state.gameState.knobsAvailable.oscillator1,
      createModeIsActive: state => state.gameState.createModeIsActive
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.switch {
  border: 1px solid #ff8574;
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
