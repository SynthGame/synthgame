<template>
  <div class="module">
    <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
      <h3 v-if="dialsAreWithinMargin" slot="subtitle">Done!</h3>
      <h3 v-else slot="subtitle">Oscillator 2</h3>
    </module-title>
    <module-display
      class="display"
      module="oscillator"
      fill="#43bede"
      :knobs="[{name: 'Octave', min: freqArray[0], max: freqArray[freqArray.length -1], value: frequencyOpponent},
              {name: 'Detune', min: -120, max: 120, value: 50},
              {name: 'Volume', min: 0, max: 100, value: volumeOpponent},
              {name: 'Waveform', min: 0, max:3, value: typeOscOpponent},
              {name: 'OctaveGoal', min: freqArray[0], max: freqArray[freqArray.length -1], value: frequencyGoal},
              {name: 'DetuneGoal', min: -120, max: 120, value: 50},
              {name: 'VolumeGoal', min: 0, max: 100, value: volumeGoal},
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
        :value="volumeOpponent"
        :min="0"
        :max="100"
        knobColor="#43bede"
        name="Volume"
      ></module-knob>
      <div class="button-wrapper"
        v-if="knobsAvailable.typeOsc || createModeIsActive"
      >
        <module-button color="#43bede" shape="sine" :isPressed="typeOscOpponent==='sine'" />
        <module-button color="#43bede" shape="square" :isPressed="typeOscOpponent==='square'" />
        <module-button color="#43bede" shape="sawtooth" :isPressed="typeOscOpponent==='sawtooth'" />
        <module-button color="#43bede" shape="triangle" :isPressed="typeOscOpponent==='triangle'" />
        <p>WAVEFORM</p>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { vuexSyncGen, mapValueToRange } from "@/utils";
import { MODULE_OSCILLATORTWO_COLOR } from "@/constants";

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
      name: "oscillator2",
      oscillator2: {},
      moduleColor: MODULE_OSCILLATORTWO_COLOR
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
    // this.oscillator2 = audio.oscillator2.state.device;
    // start the second oscillator
    // this.oscillator2.start();
  },
  beforeDestroy() {
    // stop the second oscillator
    // this.oscillator2.stop();
  },
  methods: {
    // incrementOctave() {
    //   let currentOctave = this.freqArray.findIndex(el => el == this.frequency);
    //   if (currentOctave < 3) {
    //     this.frequency = this.freqArray[currentOctave + 1];
    //   }
    // },
    // decrementOctave() {
    //   let currentOctave = this.freqArray.findIndex(el => el == this.frequency);
    //   if (currentOctave > 0) {
    //     this.frequency = this.freqArray[currentOctave - 1];
    //   }
    // }
  },
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
    // ...vuexSyncGen("oscillator2", "frequency", val => {
    //   // self.oscillator2.frequency.value = character.oscillator2.frequency(val)
    // }),
    // ...vuexSyncGen("oscillator2", "typeOsc", val => {
    //   if (self.oscillator2.type === character.oscillator2.typeOsc(val)) return;
    //   self.oscillator2.type = character.oscillator2.typeOsc(val);
    //   self.oscillator2.stop();
    //   self.oscillator2.start();
    // }),
    // ...vuexSyncGen("oscillator2", "volume", val => {
    //   self.oscillator2.volume.value = character.oscillator2.volume(val);
    // }),
    ...mapState({
      frequencyGoal: state => state.gameState.goal.oscillator2.frequency,
      typeOscGoal: state => state.gameState.goal.oscillator2.typeOsc,
      volumeGoal: state => state.gameState.goal.oscillator2.volume,
      frequencyOpponent: state =>
        state.gameState.opponent.oscillator2.frequency,
      typeOscOpponent: state => state.gameState.opponent.oscillator2.typeOsc,
      volumeOpponent: state => state.gameState.opponent.oscillator2.volume,
      typeArray: state => state.gameState.possibleValues.oscillator2.typeOsc,
      freqArray: state => state.gameState.possibleValues.oscillator2.frequency,
      knobsAvailable: state => state.gameState.knobsAvailable.oscillator2,
      createModeIsActive: state => state.gameState.createModeIsActive
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.switch {
  border: 1px solid #43bede;
}

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
