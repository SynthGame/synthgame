<template>
  <div class="module">
    <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
      <h3 v-if="dialsAreWithinMargin" slot="subtitle">Done!</h3>
      <h3 v-else slot="subtitle">Oscillator 1</h3>
    </module-title>
    <module-display
      class="display"
      module="oscillator"
      fill="#ff8574"
      :knobs="[{name: 'Octave', min: freqArray[0], max: freqArray[freqArray.length -1], value: frequencyOpponent},
              {name: 'Detune', min: -120, max: 120, value: detuneOpponent},
              {name: 'Volume', min: 0, max: 1, value: 1},
              {name: 'Waveform', min: 0, max:3, value: typeOscOpponent},
              {name: 'OctaveGoal', min: freqArray[0], max: freqArray[freqArray.length -1], value: frequencyGoal},
              {name: 'DetuneGoal', min: -120, max: 120, value: detuneGoal},
              {name: 'VolumeGoal', min: 0, max: 1, value: 1},
              {name: 'WaveformGoal', min: 0, max:3, value: typeOscGoal},
            ]"/>
    <div class="knobs">
      <div class="octave-wrapper"
        v-if="knobsAvailable.frequency || createModeIsActive"
      >
        <div class="switch">
          <button color="#ff8574">
            <svg version="1.1"
              x="0px" y="0px" width="12.3px" height="12.6px" viewBox="0 0 12.3 6.6" style="enable-background:new 0 0 12.3 6.6;"
              xml:space="preserve">
              <g>
                  <polyline class="st0" points="12,6.2 6.3,0.6 0.3,6.2     "/>
              </g>
            </svg>
          </button>
          <button color="#ff8574">  <svg version="1.1"
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
        :value="detuneOpponent"
        v-if="knobsAvailable.detune || createModeIsActive"
        :min="0"
        :max="100"
        knobColor="#ff8574"
        name="Pitch"
      ></module-knob>
      <div class="button-wrapper"
        v-if="knobsAvailable.typeOsc || createModeIsActive"
      >
        <module-button color="#ff8574" shape="sine" :isPressed="typeOscOpponent==='sine'" />
        <module-button color="#ff8574" shape="square" :isPressed="typeOscOpponent==='square'" />
        <module-button color="#ff8574" shape="sawtooth" :isPressed="typeOscOpponent==='sawtooth'" />
        <module-button color="#ff8574" shape="triangle" :isPressed="typeOscOpponent==='triangle'" />
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
    // this.oscillator1 = audio.oscillator1.state.device;
  },
  methods: {},
  computed: {
    timerIsRunning() {
      return this.$store.state.gameState.timerIsRunning;
    },
    dialsAreWithinMargin() {
      if (this.createModeIsActive) return false; // quick hack
      this.title = "Done!";
      return Object.values(
        this.$store.getters.opponentParametersMatchGoalWithMargin[this.name]
      ).every(param => param);
    },

    // ...vuexSyncGen("oscillator1", "frequency", val => {
    //   // self.oscillator1.frequency.value = character.oscillator1.frequency(val)
    // }),
    // ...vuexSyncGen("oscillator1", "typeOsc", val => {
    //   // if (self.oscillator1.type === character.oscillator1.typeOsc(val)) return;
    //   self.oscillator1.type = character.oscillator1.typeOsc(val);
    //   self.oscillator1.stop();
    //   self.oscillator1.start();
    // }),
    // ...vuexSyncGen("oscillator1", "detune", val => {
    //   self.oscillator1.detune.value = character.oscillator1.detune(val);
    // }),
    ...mapState({
      frequencyGoal: state => state.gameState.goal.oscillator1.frequency,
      typeOscGoal: state => state.gameState.goal.oscillator1.typeOsc,
      detuneGoal: state => state.gameState.goal.oscillator1.detune,
      frequencyOpponent: state =>
        state.gameState.opponent.oscillator1.frequency,
      typeOscOpponent: state => state.gameState.opponent.oscillator1.typeOsc,
      detuneOpponent: state => state.gameState.opponent.oscillator1.detune,
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
