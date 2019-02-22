<template>
  <div class="sequencer">
    <module-title :module-color="moduleColor">
      <h3 slot="subtitle">Sequencer</h3>
    </module-title>
    <div class="sequencer__controls">
      <!-- <div class="button-wrapper function">
        <button :style="sequencerEditState === 0 ? 'background: #F40056 !important' : ''" color="#6e01d1" @click="sequencerEditStateChange(0)">Steps</button>
        <button :style="sequencerEditState === 1 ? 'background: #F40056 !important' : ''" color="#6e01d1" @click="sequencerEditStateChange(1)">Pitch</button>
        <button :style="sequencerEditState === 3 ? 'background: #F40056 !important' : ''" color="#6e01d1" @click="sequencerEditStateChange(3)">Glide</button>
        <button :style="sequencerEditState === 2 ? 'background: #F40056 !important' : ''" color="#6e01d1" @click="sequencerEditStateChange(2)">Accent</button>
        <button :style="sequencerEditState === 4 ? 'background: #F40056 !important' : ''" class="button-drums" @click="sequencerEditStateChange(4)">Kick</button>
        <button :style="sequencerEditState === 5 ? 'background: #F40056 !important' : ''" class="button-drums" @click="sequencerEditStateChange(5)">Hat</button>
        <button :style="sequencerEditState === 11 ? 'background: #F40056 !important' : ''" class="button-drums" @click="sequencerEditStateChange(11)">Snare</button>
        <button :style="sequencerEditState === 6 ? 'background: #F40056 !important' : ''" class="button-drums" @click="sequencerEditStateChange(6)">Clap 1</button>
        <button :style="sequencerEditState === 7 ? 'background: #F40056 !important' : ''" class="button-drums" @click="sequencerEditStateChange(7)">Clap 2</button>
        <button :style="sequencerEditState === 8 ? 'background: #F40056 !important' : ''" class="button-drums" @click="sequencerEditStateChange(8)">Cymbal</button>
        <button :style="sequencerEditState === 9 ? 'background: #F40056 !important' : ''" class="button-drums" @click="sequencerEditStateChange(9)">Labmyc</button>
        <button :style="sequencerEditState === 10 ? 'background: #F40056 !important' : ''" class="button-drums" @click="sequencerEditStateChange(10)">Noise</button>
        <button @click="playPauseSynth" class="sequencer-stop-button button-drums"><span>▶</span></button>
        <p>Drums</p>
      </div> -->
      <!-- <div height="200px">
        <div class="play-random">
          <!-- <button @click="randomizeSelectedParam" class="sequencer-random-button">
            random
          </button> -->
          <!-- <button @click="playPauseBeat" class="sequencer-random-button">
            Beat
          </button>
          <module-knob
          style="width:4rem"
            v-model="bpm"
            :min="60"
            :max="300"
            knobColor="#F40056"
            name="TEMPO"
            module="sequencer"
          ></module-knob>
          <span class="timer">{{bpm}}</span>
        </div>
      </div> -->
    </div>
    <div class="button-section" v-for="i in [0,1,2,3]" :key="i">
      <span class="step-wrapper" v-for="j in getSubRange(i)" :key="j">
        <sequencer-button
          v-if="knobsAvailable.steps || createModeIsActive"
          @click="toggleNoteOnOff(j)"
          :button-active="j === activeButton"
          :button-selected="noteArray[j] && noteArray[j].selected"
        />
        <SequencerSlider
          v-if="knobsAvailable.pitch || createModeIsActive"
          :value="noteArray[j] && noteArray[j].pitch"
          @input="setPitchValue(j, $event)"
          :min="0"
          :max="10"
          :button-active="j === activeButton"
          :button-selected="noteArray[j] && noteArray[j].selected"
        />
        <!-- <SequencerSlider
          v-else-if="sequencerEditState === 2"
          :value="noteArray[j] && noteArray[j].volume"
          @input="setVolumeValue(j, $event)"
          :min="0"
          :max="5"
          :button-active="j === activeButton"
          :button-selected="noteArray[j] && noteArray[j].selected"
        /> -->
        <sequencer-button
          v-if="knobsAvailable.accent || createModeIsActive"
          @click="toggleAccentOnOff(j)"
          :button-active="j === activeButton"
          :button-selected="noteArray[j] && noteArray[j].volume"
        />
        <sequencer-button
          v-if="knobsAvailable.glide || createModeIsActive"
          @click="toggleGlideOnOff(j)"
          :button-active="j === activeButton"
          :button-selected="noteArray[j] && noteArray[j].glide"
        />
        <!-- <SequencerSlider
          v-else-if="sequencerEditState === 3"
          :value="noteArray[j] && noteArray[j].glide"
          @input="setGlideValue(j, $event)"
          :min="0"
          :max="10"
          :button-active="j === activeButton"
          :button-selected="noteArray[j] && noteArray[j].selected"
        /> -->
        <sequencer-button
          v-if="knobsAvailable.kick || createModeIsActive"
          @click="toggleKickOnOff(j)"
          :button-active="j === activeButton"
          :button-selected="noteArray[j] && noteArray[j].kick"
        />
        <sequencer-button
          v-if="knobsAvailable.hat || createModeIsActive"
          @click="toggleHatOnOff(j)"
          :button-active="j === activeButton"
          :button-selected="noteArray[j] && noteArray[j].hat"
        />
        <sequencer-button
          v-if="knobsAvailable.clap1 || createModeIsActive"
          @click="toggleClapOnOff(j)"
          :button-active="j === activeButton"
          :button-selected="noteArray[j] && noteArray[j].clap"
        />
        <sequencer-button
          v-if="knobsAvailable.clap2 || createModeIsActive"
          @click="toggleClap2OnOff(j)"
          :button-active="j === activeButton"
          :button-selected="noteArray[j] && noteArray[j].clap2"
        />
        <sequencer-button
          v-if="knobsAvailable.cymbal || createModeIsActive"
          @click="toggleCymbalOnOff(j)"
          :button-active="j === activeButton"
          :button-selected="noteArray[j] && noteArray[j].cymbal"
        />
        <sequencer-button
          v-if="knobsAvailable.labmyc || createModeIsActive"
          @click="toggleLabmycOnOff(j)"
          :button-active="j === activeButton"
          :button-selected="noteArray[j] && noteArray[j].labmyc"
        />
        <sequencer-button
          v-if="knobsAvailable.noise || createModeIsActive"
          @click="toggleNoiseOnOff(j)"
          :button-active="j === activeButton"
          :button-selected="noteArray[j] && noteArray[j].noise"
        />
        <sequencer-button
          v-if="knobsAvailable.snare || createModeIsActive"
          @click="toggleSnareOnOff(j)"
          :button-active="j === activeButton"
          :button-selected="noteArray[j] && noteArray[j].snare"
        />
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { vuexSyncGenBpm } from "@/utils";
import audio from "@/audio";
import ModuleKnob from "@/components/ModuleKnob.vue";
import ModuleTitle from "./ModuleComponents/ModuleTitle.vue";
import SequencerButton from "./SequencerModule/SequencerButton.vue";
import SequencerSlider from "./SequencerModule/SequencerSlider.vue";
import { setInterval } from "timers";
import range from "lodash/range";
import { getPresetById } from "@/db";
import fill from "lodash/fill";
import sample from "lodash/sample";
import random from "lodash/random";
import { MODULE_SEQUENCER_COLOR } from "@/constants";
import Tone from "tone";
import character from "@/character";

export default {
  name: "SequencerModule",
  components: {
    SequencerButton,
    SequencerSlider,
    ModuleTitle,
    ModuleKnob
  },
  data: function() {
    return {
      isActive: false,
      toneLoop: null,
      sequencerEditState: 0,
      moduleColor: MODULE_SEQUENCER_COLOR,
      activeButton: 0,
      noteArray: fill(range(0, 16), {
        selected: false,
        pitch: 0,
        volume: false,
        glide: false
      }),
      bpmKnob: 110
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
  created() {
    // this.initSynth();
    // this.$store.commit("setActiveSequence", this.noteArray);
    if (this.$route.query.preset) {
      getPresetById(this.$route.query.preset).then(data => {
        console.log("custom preset JSON", data);
        // window.postMessage(this.$route.query.preset, '*')
        // this.customLevelIsActive = true
        this.noteArray = data.sequenceArray;
        this.$store.commit("setAudioParameterToPreset", {
          preset: data.parameterValues
        });
        this.bpm = data.bpm;
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
        // this.submitPreset() // also submit preset so new id is requested and sent
      });
    } else {
      this.$router.push("?artist");
    }
  },
  methods: {
    // receiveMessage(event) {
    //   this.submitPreset()
    //   // if (event.origin !== "http://example.org:8080")
    //   //   return;
    //   //
    //   // // ...
    // },
    // submitPreset (val) {
    //   // this.showAfterCreateOverlay = true
    //   this.$store.dispatch('exportPreset', {name: val})
    //     .then(presetId => {
    //       // alert(`${window.location.origin}/?preset=${presetId}`)
    //       this.exportPresetLink = `${window.location.origin}/?preset=${presetId}`;
    //       this.$router.push('?preset=' + presetId)
    //       window.parent.postMessage(presetId, '*');
    //       console.log('id',presetId);
    //     })
    // },
    emitOnKey() {
      if (event.keyCode === 32) {
        this.playPauseSynth();
      }
    },
    sequencerEditStateChange(val) {
      this.sequencerEditState = val;
      val === 4 ? audio.playKick() : "";
      val === 5 ? audio.playHat() : "";
      val === 6 ? audio.playClap() : "";
      val === 7 ? audio.playClap2() : "";
      val === 8 ? audio.playCymbal() : "";
      val === 9 ? audio.playLabmyc() : "";
      val === 10 ? audio.playNoise() : "";
      val === 11 ? audio.playSnare() : "";
    },
    initSynth() {
      var self = this;
      this.toneLoop = audio.setMainLoop(
        {
          noteArray: range(0, 16),
          subdivision: "8n"
        },
        (time, note) => {
          this.setStep(note);
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
    },
    playPauseSynth() {
      if (this.toneLoop.state === "stopped") return this.toneLoop.start();
      this.toneLoop.stop();
    },
    playPauseBeat() {
      this.toneLoop.stop();
    },
    setStep(i) {
      // document.getElementsByClassName("example")
      if (i) return (this.activeButton = i), this.activeButton;
      if (this.activeButton === 15) this.activeButton = -1;
      this.activeButton++;
    },
    setNoteOnOff(i, val) {
      this.noteArray = this.noteArray.map(
        (el, j) => (i === j ? { ...el, selected: val } : el)
      );
    },
    toggleNoteOnOff(i) {
      // use setNoteOnOff
      this.noteArray = this.noteArray.map(
        (el, j) => (i === j ? { ...el, selected: !el.selected } : el)
      );
    },
    toggleKickOnOff(i) {
      // use setNoteOnOff
      this.noteArray = this.noteArray.map(
        (el, j) => (i === j ? { ...el, kick: !el.kick } : el)
      );
    },
    toggleHatOnOff(i) {
      // use setNoteOnOff
      this.noteArray = this.noteArray.map(
        (el, j) => (i === j ? { ...el, hat: !el.hat } : el)
      );
    },
    toggleClapOnOff(i) {
      // use setNoteOnOff
      this.noteArray = this.noteArray.map(
        (el, j) => (i === j ? { ...el, clap: !el.clap } : el)
      );
    },
    toggleClap2OnOff(i) {
      // use setNoteOnOff
      this.noteArray = this.noteArray.map(
        (el, j) => (i === j ? { ...el, clap2: !el.clap2 } : el)
      );
    },
    toggleCymbalOnOff(i) {
      // use setNoteOnOff
      this.noteArray = this.noteArray.map(
        (el, j) => (i === j ? { ...el, cymbal: !el.cymbal } : el)
      );
    },
    toggleLabmycOnOff(i) {
      // use setNoteOnOff
      this.noteArray = this.noteArray.map(
        (el, j) => (i === j ? { ...el, labmyc: !el.labmyc } : el)
      );
    },
    toggleNoiseOnOff(i) {
      // use setNoteOnOff
      this.noteArray = this.noteArray.map(
        (el, j) => (i === j ? { ...el, noise: !el.noise } : el)
      );
    },
    toggleSnareOnOff(i) {
      // use setNoteOnOff
      this.noteArray = this.noteArray.map(
        (el, j) => (i === j ? { ...el, snare: !el.snare } : el)
      );
    },
    setPitchValue(i, val) {
      this.noteArray = this.noteArray.map(
        (el, j) => (i === j ? { ...el, pitch: Number(val) } : el)
      );
    },
    setGlideValue(i, val) {
      this.noteArray = this.noteArray.map(
        (el, j) => (i === j ? { ...el, glide: Number(val) } : el)
      );
    },
    toggleGlideOnOff(i) {
      // use setNoteOnOff
      this.noteArray = this.noteArray.map(
        (el, j) => (i === j ? { ...el, glide: !el.glide } : el)
      );
    },
    toggleAccentOnOff(i) {
      // use setNoteOnOff
      this.noteArray = this.noteArray.map(
        (el, j) => (i === j ? { ...el, volume: !el.volume } : el)
      );
    },
    setVolumeValue(i, val) {
      this.noteArray = this.noteArray.map(
        (el, j) => (i === j ? { ...el, volume: Number(val) } : el)
      );
      // this.noteArray = this.noteArray.map((el, j) => i === j ? {...el, volume: 3} : el)
    },
    setNoteLengthValue(i, val) {
      this.noteArray = this.noteArray.map(
        (el, j) => (i === j ? { ...el, noteLength: val } : el)
      );
    },
    randomizeSelectedParam(param) {
      const _randomizeNoteSelected = () =>
        this.noteArray.forEach((el, i) =>
          this.setNoteOnOff(i, sample([true, false]))
        );
      const _randomizeNotePitch = () =>
        this.noteArray.forEach((el, i) =>
          this.setPitchValue(i, random(-12, 12))
        );
      const _randomizeNoteVolume = () =>
        this.noteArray.forEach((el, i) =>
          this.setVolumeValue(i, random(-20, 6))
        );
      const _randomizeNoteLength = () =>
        this.noteArray.forEach((el, i) =>
          this.setNoteLengthValue(i, random(0, 5))
        );

      return (
        _randomizeNoteSelected(),
        _randomizeNotePitch(),
        _randomizeNoteVolume(),
        _randomizeNoteLength()
      );
      // switch(this.sequencerEditState) {
      //   case 0:
      //     _randomizeNoteSelected()
      //     break
      //   case 1:
      //     _randomizeNotePitch()
      //     break
      //   case 2:
      //     _randomizeNoteVolume()
      //     break
      //   case 3:
      //     _randomizeNoteLength()
      //     break
      //   default:
      //     _randomizeNoteSelected()
      //     _randomizeNotePitch()
      //     _randomizeNoteVolume()
      //     _randomizeNoteLength()
      //     break
      // }
    },
    getSubRange(i) {
      // returns the sub step of 4 in a 16 array
      const startArray = i * 4;
      return range(startArray, startArray + 4);
    }
  },
  computed: {
    ...vuexSyncGenBpm("bpm", val => {
      audio.setBpm(val * 2);
    }),
    ...mapState({
      knobsAvailable: state => state.gameState.knobsAvailable.sequencer,
      createModeIsActive: state => state.gameState.createModeIsActive
    })
  },
  watch: {
    // bpmKnob (val) {
    //   return audio.setBpm(val*2)
    // },
    noteArray(val) {
      this.$store.commit("setActiveSequence", val);
    }
  }
};
</script>
