<template>
  <div class="sequencer">
    <module-title>
      <h2 slot="title">Tats</h2>
      <h3 slot="subtitle">Sequencer</h3>
    </module-title>
    <div class="sequencer__controls">
      <div class="button-wrapper function">
        <button color="#6e01d1" @click="sequencerEditStateChange(0)">Steps</button>
        <button color="#6e01d1" @click="sequencerEditStateChange(1)">Pitch</button>
        <button color="#6e01d1" @click="sequencerEditStateChange(2)">Volume</button>
        <button color="#6e01d1" @click="sequencerEditStateChange(3)">Note Length</button>
        <p>Function</p>
      </div>
      <div height="200px">
        <module-knob
          v-model="bpmKnob"
          :min="80"
          :max="140"
          knobColor="#5bd484"
          name="BPM"
          module="lfo"
        ></module-knob>
      </div>
      <div class="play-random">
        <button @click="playPauseSynth" class="sequencer-stop-button">

        </button>
        <button @click="randomizeSelectedParam" class="sequencer-random-button">
          random
        </button>
      </div>
    </div>
    <div class="button-section" v-for="i in [0,1,2,3]" :key="i">
      <span class="step-wrapper" v-for="j in getSubRange(i)" :key="j">
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
          :min="-60"
          :max="6"
        />
        <SequencerSlider
          v-else-if="sequencerEditState === 3"
          :value="noteArray[j] && noteArray[j].noteLength"
          @input="setNoteLengthValue(j, $event)"
          :min="0"
          :max="4"
        />
        <div class="stepnumber">{{j + 1}}</div>
      </span>
    </div>
  </div>
</template>

<script>
import audio from '@/audio'
import ModuleKnob from '@/components/ModuleKnob.vue'
import ModuleTitle from './ModuleComponents/ModuleTitle.vue'
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
    ModuleTitle,
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
        volume: 0,
        noteLength: null
      }),
      bpmKnob: 110
    }
  },
  created () {
    this.initSynth()
  },
  methods: {
    sequencerEditStateChange(val) {
      this.sequencerEditState = val;
    },
    initSynth () {
      let kickTime = true;
      this.toneLoop = audio.setMainLoop({
        noteArray: range(0, 16),
        subdivision: '8n'
      }, (time, note) => {
        this.setStep(note)
        if (this.$store.state.gameState.timerIsRunning === false && kickTime === true && this.$store.state.gameState.level > 0) {
          audio.playKick();
          kickTime = false;
        } else {
          kickTime = true;
        };
        if(this.noteArray[note].selected) {
          audio.playNote(this.noteArray[note].pitch, {
            noteLength: ['16t', '8n', '4n', '2n','1n'][this.noteArray[note].noteLength],
            volume: this.noteArray[note].volume
          })
        }
      })
      this.toneLoop.start()
    },
    playPauseSynth () {
      if(this.toneLoop.state === 'stopped') return this.toneLoop.start()
      this.toneLoop.stop()
    },
    setStep (i) {
      if(i) return (this.activeButton = i, this.activeButton)
      if(this.activeButton === 15) this.activeButton = 0
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
      const _randomizeNoteVolume = () => this.noteArray.forEach((el, i) => this.setVolumeValue(i, random(-20,6)))
      const _randomizeNoteLength = () => this.noteArray.forEach((el, i) => this.setNoteLengthValue(i, random(0,5)))

      return (
        _randomizeNoteSelected(),
        _randomizeNotePitch(),
        _randomizeNoteVolume(),
        _randomizeNoteLength()
      )
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
    getSubRange (i) {
      // returns the sub step of 4 in a 16 array
      const startArray = (i * 4)
      return range(startArray, startArray + 4)
    },
  },
  watch: {
      bpmKnob (val) {
        return audio.setBpm(val)
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$main-seq-color: #F40056;

.sequencer {
   width: 100%;
   height: 50%;
   display: flex;
   justify-content: space-between;
   padding: 2em;

   & .stepnumber {
     margin-top: .5em;
   }
   & button {
     cursor: pointer;
     transition: all .2s;
     text-transform: uppercase;
     min-height: 45px;

     &:active {
       background: rgba(255,255,255,0.1)
     }
   }
}

.play-random {
  display: flex;
  width: fit-content;
  justify-content: space-around;
}

.module__name {
  position: absolute;
  padding: 0.833% 1.67%
}

button.sequencer-button {
    min-height: 8em;
    justify-content: flex-start;
    display: flex;
    margin: 0;
    margin-top: 1em;
}

.module__name__title {
  h2 {
    color: white;
  }
}

.module__name__sub-title {
  h3 {
    color: white;
  }
}

.main {
  width: 16.67%;
  height: 480px;
}

.sequencer-stop-button {
  height: 45px;
  width: 45px;
  display: inline-flex;
  margin: 10px 5px;
  padding: 0;
  border: 1px solid $main-seq-color;
  background-color: unset;
}

.sequencer-random-button {
  display: inline-flex;
  margin: 10px 5px;
  padding: 10px 30px;
  border: 1px solid $main-seq-color;
  background-color: unset;
  color: white;
}

.button-section {
  border-top: 1px solid $main-seq-color;
  display: flex;
  width: 16em;
  justify-content: space-between;
}

.button-wrapper {
  margin-top: -1em;
  display: flex;
  width: 10%;
  &.function {
    height: fit-content;
    width: 100%;
    button {
      width: 50%;
      border: 1px solid $main-seq-color;
      background-color: black;
      color: white
    }
  }
}
</style>
