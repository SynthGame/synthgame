<template>
  <div class="main">
    <span style="display: inline-block; width: 55px;" v-for="i in 16" :key="i">
      <sequencer-button 
        v-if="true"
        @click="toggleNoteOnOff(i)"
        :button-active="i === activeButton" 
        :button-selected="noteArray[i] && noteArray[i].selected"
      />
      <SequencerSlider v-else/>
      <div style="opacity: 0.7;">{{i}}</div>
    </span>
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
    console.log(this.noteArray)
  },
  methods: {
    nextStep () {
      if(this.activeButton === 16) this.activeButton = 0
      this.activeButton++
    },
    toggleNoteOnOff (i) {
      this.noteArray = this.noteArray.map((el, j) => i === j ? {...el, selected:!el.selected} : el)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 480px;
}
</style>