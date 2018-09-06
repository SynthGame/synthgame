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
          @input="setPitchValue(j, $event)"
        />
        <SequencerSlider 
          v-else-if="sequencerEditState === 2"
          @input="setVolumeValue(j, $event)"
          :min="-12"
          :max="0"
        />
        <SequencerSlider 
          v-else-if="sequencerEditState === 3"
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

export default {
  name: 'SequencerModule',
  components: {
    SequencerButton,
    SequencerSlider,
    ModuleKnob
  },
  data: function () {
    return {
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
      const loop = audio.setMainLoop({
        noteArray: range(1, 16),
        subdivision: '4n'
      }, (time, note) => {
        this.setStep(note)
        if(this.noteArray[note].selected) audio.playNote(this.noteArray[note].pitch, {
          noteLength: this.noteArray[note].noteLength, 
          volume: this.noteArray[note].volume
        })
      })
      loop.start()
    },
    setStep (i) {
      if(i) return (this.activeButton = i, this.activeButton)
      if(this.activeButton === 16) this.activeButton = 0
      this.activeButton++
    },
    toggleNoteOnOff (i) {
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