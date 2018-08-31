<template>
  <div class="module">
    <div class="title">
      <h2>Tats</h2>
      <h3>Delay</h3>
    </div>
    <module-display
      class="display"
      module="delay"
      fill="#43bede"
      :knobs="[{name:'Time', min: 0, max: 100, value: this.delayTime},
              {name:'Feedback', min: 0, max: 100, value: this.feedback},
              {name:'Wet', min: 0, max: 100, value: this.wet},
              {name:'Placeholder', min: 0, max: 100, value: 'fake'},
              {name:'TimeGoal', min: 0, max: 100, value: this.delayTimeGoal},
              {name:'FeedbackGoal', min: 0, max: 100, value: this.feedbackGoal},
              {name:'WetGoal', min: 0, max: 100, value: this.wetGoal},
              {name:'PlaceholderGoal', min: 0, max: 100, value: 'fake'}]" 
    />
    <div class="knobs">
      <module-knob
        v-model="delayTime"
        :min="0"
        :max="100"
        knobColor="#43bede"
        name="Time"
        module="delay"
      ></module-knob>
      <module-knob
        v-model="feedback"
        :min="0"
        :max="100"
        knobColor="#43bede"
        name="Feedback"
        module="delay"
      ></module-knob>
      <module-knob
        v-model="wet"
        :min="0"
        :max="100"
        knobColor="#43bede"
        name="Dry/wet"
        module="delay"
      ></module-knob>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { vuexSyncGen } from '@/utils'

import audio from '@/audio'
import ModuleKnob from '@/components/ModuleKnob.vue'
import ModuleDisplay from '@/components/ModuleDisplay.vue'

var self

export default {
  name: 'DelayModule',
  data () {
    return {
      delay: {}
    }
  },
  components: {
    ModuleKnob,
    ModuleDisplay
  },
  created () {
    self = this
    this.delay = audio.delay.state.device
  },
  computed: {
    ...vuexSyncGen('delay', 'delayTime', val => {
      // const nth = 2 ** self.delayTime // 2 to the power of delaytime
      // return `${nth}n`
      self.delay.delayTime.value = val / 100
    }),
    ...vuexSyncGen('delay', 'wet', val => {
      self.delay.wet.value = val / 100
    }),
    ...vuexSyncGen('delay', 'feedback', val => {
      self.delay.feedback.value = val / 100
    }),
    ...mapState({
      delayTimeGoal: state => state.gameState.goal.delay.delayTime,
      feedbackGoal: state => state.gameState.goal.delay.feedback,
      wetGoal: state => state.gameState.goal.delay.wet,
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

svg.display {
    fill: #43bede;
}

h3 {
  color: #43bede;
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
