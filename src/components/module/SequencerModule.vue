<template>
  <div class="main">
    <module-knob
      v-model="sequencerEditState"
      :min="0"
      :max="3"
      knobColor="#5bd484"
      name="Control"
      module="lfo"
    ></module-knob>
    <div>
      <button @click="playPauseSynth" class="sequencer-stop-button">

      </button>
      <button @click="randomizeSelectedParam" class="sequencer-random-button">
        random
      </button>
    </div>
    <div class="button-section" v-for="i in 4" :key="i">
      <span class="button-wrapper" v-for="j in getSubRange(i)" :key="j">
        <sequencer-button 
          v-if="sequencerEditState === 0"
          @click="toggleNoteOnOff(j)"
          :button-active="j === activeButton" 
          :button-selected="noteArray[j] && noteArray[j].selected"
        />
        <SequencerSlider 
          v-else-if="sequencerEditState === 1"
          :value="noteArray[j] && noteArray[j].pitch"
          @input="setPitchValue(j, $event)"
          :min="-12"
          :max="12"
        />
        <SequencerSlider 
          v-else-if="sequencerEditState === 2"
          :value="noteArray[j] && noteArray[j].volume"
          @input="setVolumeValue(j, $event)"
          :min="-12"
          :max="0"
        />
        <SequencerSlider 
          v-else-if="sequencerEditState === 3"
          :value="noteArray[j] && noteArray[j].noteLength"
          @input="setNoteLengthValue(j, $event)"
        />
        <div style="opacity: 0.7;">{{j}}</div>
      </span>
    </div>
  </div>
</template>

<script>
import audio from '@/audio'
import ModuleKnob from '@/components/ModuleKnob.vue'
import SequencerButton from './SequencerModule/SequencerButton.vue'
import SequencerSlider from './SequencerModule/SequencerSlider.vue'
import { setInterval } from 'timers';
import range from 'lodash/range'
import fill from 'lodash/fill'
import sample from 'lodash/sample'
import random from 'lodash/random'

export default {
  name: 'SequencerModule',
  components: {
    SequencerButton,
    SequencerSlider,
    ModuleKnob
  },
  data: function () {
    return {
      toneLoop: null,
      sequencerEditState: 0,
      activeButton: 0,
      noteArray: fill(range(0,16), {
        selected: false,
        pitch: null,
        volume: null,
        noteLength: null
      })
    }
  },
  created () {
    this.initSynth()
  },
  methods: {
    initSynth () {
      this.toneLoop = audio.setMainLoop({
        noteArray: range(1, 16),
        subdivision: '8n'
      }, (time, note) => {
        this.setStep(note)
        if(this.noteArray[note].selected) audio.playNote(this.noteArray[note].pitch, {
          noteLength: this.noteArray[note].noteLength, 
          volume: this.noteArray[note].volume
        })
      })
      this.toneLoop.start()
    },
    playPauseSynth () {
      if(this.toneLoop.state === 'stopped') return this.toneLoop.start() 
      this.toneLoop.stop()  
    },
    setStep (i) {
      if(i) return (this.activeButton = i, this.activeButton)
      if(this.activeButton === 16) this.activeButton = 0
      this.activeButton++
    },
    setNoteOnOff (i, val) {
      this.noteArray = this.noteArray.map((el, j) => i === j ? {...el, selected:val} : el)
    },
    toggleNoteOnOff (i) { // use setNoteOnOff
      this.noteArray = this.noteArray.map((el, j) => i === j ? {...el, selected:!el.selected} : el)
    },
    setPitchValue (i, val) {
      this.noteArray = this.noteArray.map((el, j) => i === j ? {...el, pitch: val} : el)
    },
    setVolumeValue (i, val) {
      this.noteArray = this.noteArray.map((el, j) => i === j ? {...el, volume: val} : el)
    },
    setNoteLengthValue (i, val) {
      this.noteArray = this.noteArray.map((el, j) => i === j ? {...el, noteLength: val} : el)
    },
    randomizeSelectedParam (param) {
      const _randomizeNoteSelected = () => this.noteArray.forEach((el, i) => this.setNoteOnOff(i, sample([true, false])))
      const _randomizeNotePitch = () => this.noteArray.forEach((el, i) => this.setPitchValue(i, random(-12,12)))
      const _randomizeNoteVolume = () => this.noteArray.forEach((el, i) => this.setVolumeValue(i, random(-12,0)))
      const _randomizeNoteLength = () => this.noteArray.forEach((el, i) => this.setNoteLengthValue(i, random(0,100)))

      switch(this.sequencerEditState) {
        case 0:
          _randomizeNoteSelected()
          break
        case 1:
          _randomizeNotePitch()
          break
        case 2:
          _randomizeNoteVolume()
          break
        case 3:
          _randomizeNoteLength()
          break
        default:
          _randomizeNoteSelected()
          _randomizeNotePitch()
          _randomizeNoteVolume()
          _randomizeNoteLength()
          break
      }
    },
    getSubRange (i) {
      // returns the sub step of 4 in a 16 array
      const startArray = ((i - 1) * 4) + 1
      return range(startArray, startArray + 4)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$main-seq-color: #F40056;

.main {
  width: 100%;
  height: 480px;
}

.sequencer-stop-button {
  height: 45px;
  width: 45px;
  display: inline-flex;
  margin: 10px 5px;
  padding: 0;
  border: 2px solid $main-seq-color;
  background-color: unset;
}

.sequencer-random-button {
  display: inline-flex;
  margin: 10px 5px;
  padding: 10px 30px;
  border: 2px solid $main-seq-color;
  background-color: unset;
  color: white;
}

.button-section {
  display: inline-block;
  border-top: 2px solid $main-seq-color;
  width: 220px;
  margin: 5px;
}

.button-wrapper {
  display: inline-block;
  width: 55px;
}
</style>