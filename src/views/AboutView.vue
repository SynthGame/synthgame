<template>
  <div class="casestudy">
    <div class="navbar-casestudy">
      <a href="https://okbye.io" target="_blank"><span>Ok Bye</span></a>
      <button type="button" name="button" @click="loadPreset">Hire</button>
    </div>
    <h1>case Study</h1>
    <h2>How we turned music production into a game</h2>

    <div class="rack">
      <oscillator-module-one />
      <filter-module />
      <lfo-module />
    </div>

    <h1>Develop faster, for less</h1>
    <h2>We house the best, in return for agency work</h2>

    <h3>Case study: Tats</h3>
    <div class="part left dial">
      <div class="text">
        <h4>The mighty dial</h4>
        <p>We love dials dialing dials everywhere.</p>
      </div>
      <module-knob
        v-model="detune"
        :min="0"
        :max="100"
        knobColor="#ff8574"
        name="Pitch"
      ></module-knob>
    </div>
    <div class="part right">
      <div class="rack">
        <oscillator-module-two />
      </div>
    </div>
    <div class="part left">
      <div class="rack">
        <envelope-module />
      </div>
    </div>
    <div class="part right">
      <div class="rack">
        <filter-module />
      </div>
    </div>
    <!-- <div class="part left">
      <div class="rack">
        <lfo-module />
      </div>
    </div> -->
    <div class="part right">
      <div class="rack">
        <envelope-module-two />
      </div>
    </div>
    <div class="part left">
      <div class="rack">
          <router-module />
      </div>
    </div>
    <div class="player">
      <img class="custom-user-avatar" :src="avatarUrl"/>
      <span class="data artist">{{nameArtist}}</span>
    </div>
  </div>
</template>

<script>
import OscillatorModuleOne from "@/components/module/OscillatorModuleOne.vue";
import OscillatorModuleTwo from "@/components/module/OscillatorModuleTwo.vue";
import EnvelopeModule from "@/components/module/EnvelopeModule.vue";
import EnvelopeModuleTwo from "@/components/module/EnvelopeModuleTwo.vue";
import FilterModule from "@/components/module/FilterModule.vue";
import LfoModule from "@/components/module/LfoModule.vue";
import RouterModule from "@/components/module/RouterModule.vue";
import presets from "@/presets";
import audio from "@/audio";
import levels from "@/levels";
import character from "@/character";
import range from "lodash/range";
import fill from "lodash/fill";
import { mapState } from "vuex";
import { vuexSyncGen, mapValueToRange } from "@/utils";
import ModuleKnob from "@/components/ModuleKnob.vue";

var casestudyScope;

export default {
  components: {
    OscillatorModuleOne,
    OscillatorModuleTwo,
    EnvelopeModule,
    EnvelopeModuleTwo,
    FilterModule,
    LfoModule,
    RouterModule,
    ModuleKnob
  },
  created() {
    this.initSynth();
    casestudyScope = this;
    this.oscillator1 = audio.oscillator1.state.device;
  },
  data() {
    return {
      noteArray: fill(range(0, 16), {
        selected: false,
        pitch: 0,
        volume: false,
        glide: false
      })
    };
  },
  mounted() {
    window.addEventListener("keydown", this.emitOnKey);
    // window.addEventListener("message", this.receiveMessage, false);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.emitOnKey);
    // window.removeEventListener('message', this.receiveMessage, false);
  },
  computed: {
    ...vuexSyncGen("oscillator1", "detune", val => {
      casestudyScope.oscillator1.detune.value = character.oscillator1.detune(
        val
      );
    }),
    nameArtist() {
      return this.$store.state.name;
    },
    avatarUrl() {
      return this.$store.state.avatarUrl;
    }
  },
  methods: {
    initSynth() {
      var self = this;
      this.toneLoop = audio.setMainLoop(
        {
          noteArray: range(0, 16),
          subdivision: "8n"
        },
        (time, note) => {
          if (this.noteArray[note].selected) {
            audio.playNote(this.noteArray[note].pitch, {
              noteLength: "16n",
              volume: this.noteArray[note].volume,
              time: note,
              glide: this.noteArray[note].glide,
              octaveOsc1:
                self.$store.state.audioParameters.oscillator1.frequency,
              octaveOsc2:
                self.$store.state.audioParameters.oscillator2.frequency
            });
          }
          if (this.noteArray[note].kick) {
            audio.playKick();
          }
          if (this.noteArray[note].hat) {
            audio.playHat();
          }
          if (this.noteArray[note].clap) {
            audio.playClap();
          }
          if (this.noteArray[note].clap2) {
            audio.playClap2();
          }
          if (this.noteArray[note].cymbal) {
            audio.playCymbal();
          }
          if (this.noteArray[note].labmyc) {
            audio.playLabmyc();
          }
          if (this.noteArray[note].noise) {
            audio.playNoise();
          }
          if (this.noteArray[note].snare) {
            audio.playSnare();
          }
        }
      );
      this.toneLoop.start();
      this.loadPreset();
    },
    emitOnKey() {
      if (event.keyCode === 32) {
        this.playPauseSynth();
      }
    },
    playPauseSynth() {
      if (this.toneLoop.state === "stopped") return this.toneLoop.start();
      this.toneLoop.stop();
    },
    loadPreset() {
      // randomly pick preset
      this.pickedPreset = Math.round(Math.random() * (presets.length - 1));

      // load the preset on synth
      this.$store.commit("setAudioParameterToPreset", {
        preset: presets[this.pickedPreset].parameterValues
      });

      // set correct routing
      audio.connectLfo(this.$store.state.audioParameters.router.lfo);
      audio.connectEnvelope2(
        this.$store.state.audioParameters.router.envelope2
      );
      audio.filter.state.device.frequency.value = character.filter.cutOffFreq(
        this.$store.state.audioParameters.filter.cutOffFreq
      );

      //and again to correct pitch
      // load the preset on synth
      this.$store.commit("setAudioParameterToPreset", {
        preset: presets[this.pickedPreset].parameterValues
      });

      this.$store.commit("setFeaturedArtist", {
        artistName: presets[this.pickedPreset].name,
        avatarUrl: presets[this.pickedPreset].avatarUrl
      });

      // Set bpm from preset
      audio.setBpm(presets[this.pickedPreset].bpm * 2);
      // Set bpm in store
      this.$store.commit("setPresetBpm", presets[this.pickedPreset].bpm);

      // Set noteArray to sequence preset globally
      this.$store.commit(
        "setActiveSequence",
        presets[this.pickedPreset].sequenceArray
      );
      //and locally
      this.noteArray = presets[this.pickedPreset].sequenceArray;

      //reset oscs for waveforms
      audio.oscillator1.state.device.type =
        presets[this.pickedPreset].parameterValues.oscillator1.typeOsc;
      audio.oscillator2.state.device.type =
        presets[this.pickedPreset].parameterValues.oscillator2.typeOsc;
      audio.oscillator1.state.device.stop();
      audio.oscillator1.state.device.start();
      audio.oscillator2.state.device.stop();
      audio.oscillator2.state.device.start();
      audio.lfo.state.device.type =
        presets[this.pickedPreset].parameterValues.lfo.type;
      audio.filter.state.device.type =
        presets[this.pickedPreset].parameterValues.filter.type;

      // import level config to highest level
      const availableParameters = levels[levels.length - 1];

      // rest will be done by watcher of sequencesPassedInCurrentLevel
    }
  }
};
</script>

<style lang="scss">
body {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  font-size: 2.5vh;
  -webkit-font-smoothing: antialiased;
  touch-action: none !important;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  text-transform: uppercase;
  overflow: auto;
}

h1,
h2,
h3 {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
}

h1 {
  font-weight: 900;
  font-size: 3em;
}

.navbar-casestudy {
  display: flex;
  justify-content: space-between;
  font-weight: 900;
  height: 4em;
  align-items: center;
  padding: 0 2em;
  a {
    color: white;
    text-decoration: none;
  }
}

button {
  letter-spacing: 1px;
  font-size: 1em;
  padding: 0;
  cursor: pointer;
  color: inherit;
  text-transform: uppercase;
  padding: 0.8rem 1.4rem;
  margin: 5px;
  background: none;
  border: 1px solid #ff8574;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  &:hover {
    background: #ff8574;
  }
}

.module {
  max-width: 16em;
}

.part {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15em;
  &.left {
    justify-content: flex-end;
  }
  &.right {
    justify-content: flex-start;
  }
  &.dial {
    .knob {
      max-width: 34vh;
      p {
        font-size: 1.7em;
      }
    }
  }
  .rack {
    max-width: 30em;
    justify-content: center;
    margin: unset;
    transform: scale(1.4);
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}

.rack {
  display: flex;
  max-width: 60em;
  margin: auto;
  justify-content: center;
}

.player {
  display: flex;
  position: fixed;
  z-index: 1000;
  width: 100%;
  bottom: -1px;
  height: 4em;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  background: black;
  padding: 0 2em;
  & .custom-user-avatar {
    height: 50px;
    width: 50px;
    border-radius: 100%;
    border: 1px solid white;
  }
  & .artist {
    font-size: 1em;
    font-weight: 200;
    text-transform: uppercase;
    margin-left: 1em;
    height: fit-content;
  }
}
</style>
