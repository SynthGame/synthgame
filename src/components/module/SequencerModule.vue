<template>
  <div class="main">
    <span style="display: inline-block;" v-for="i in 16" :key="i">
      <sequencer-button 
        @click="toggleNoteOnOff(i)"
        :button-active="i === activeButton" 
        :button-selected="noteArray[i]"
      />
      <div style="opacity: 0.7;">{{i}}</div>
    </span>
  </div>
</template>

<script>
import SequencerButton from './SequencerModule/SequencerButton.vue'
import { setInterval } from 'timers';
import range from 'lodash/range'
import fill from 'lodash/fill'

export default {
  name: 'SequencerModule',
  components: {
    SequencerButton
  },
  data: function () {
    return {
      activeButton: 0,
      noteArray: fill(range(0,16), false)
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
      // make this nicer please
      this.noteArray = this.noteArray.splice(i, 1, !this.noteArray[i])
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