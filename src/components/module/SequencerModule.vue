<template>
  <div class="main">
    <div class="button-section" v-for="i in 4" :key="i">
      <span class="button-wrapper" v-for="j in getSubRange(i)" :key="j">
        <sequencer-button 
          v-if="true"
          @click="toggleNoteOnOff(j)"
          :button-active="j === activeButton" 
          :button-selected="noteArray[j] && noteArray[j].selected"
        />
        <SequencerSlider v-else/>
        <div style="opacity: 0.7;">{{j}}</div>
      </span>
    </div>
  </div>
</template>

<script>
import SequencerButton from './SequencerModule/SequencerButton.vue'
import SequencerSlider from './SequencerModule/SequencerSlider.vue'
import { setInterval } from 'timers';
import range from 'lodash/range'
import fill from 'lodash/fill'

export default {
  name: 'SequencerModule',
  components: {
    SequencerButton,
    SequencerSlider
  },
  data: function () {
    return {
      activeButton: 0,
      noteArray: fill(range(0,16), {
        selected: false,
        pitch: null,
        volume: null,
        length: null
      })
    }
  },
  created () {
    setInterval(this.nextStep, 500) // use tone for this!
  },
  methods: {
    nextStep () {
      if(this.activeButton === 16) this.activeButton = 0
      this.activeButton++
    },
    toggleNoteOnOff (i) {
      this.noteArray = this.noteArray.map((el, j) => i === j ? {...el, selected:!el.selected} : el)
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