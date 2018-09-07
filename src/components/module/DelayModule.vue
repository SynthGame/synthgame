<template>
  <div class="module">
    <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
      <h2 slot="title">Tats</h2>
      <h3 v-if="dialsAreWithinMargin" slot="subtitle">Done!</h3>
      <h3 v-else slot="subtitle">Delay</h3>
    </module-title>
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
      <!-- <module-knob
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
      ></module-knob> -->
      <module-knob
        v-model="wet"
        v-if="knobsAvailable.wet"
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
import { MODULE_DELAY_COLOR } from '@/constants'

import audio from '@/audio'
import character from '@/character'
import ModuleKnob from '@/components/ModuleKnob.vue'
import ModuleDisplay from '@/components/ModuleDisplay.vue'
import ModuleTitle from './ModuleComponents/ModuleTitle.vue'

var self

export default {
  name: 'DelayModule',
  data () {
    return {
      name: 'delay',
      delay: {},
      moduleColor: MODULE_DELAY_COLOR
    }
  },
  components: {
    ModuleKnob,
    ModuleDisplay,
    ModuleTitle,
  },
  created () {
    self = this
    this.delay = audio.delay.state.device
  },
  computed: {
    dialsAreWithinMargin() {
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin[this.name])
        .every(param => param)
    },
    ...vuexSyncGen('delay', 'delayTime', val => {
      // const nth = 2 ** self.delayTime // 2 to the power of delaytime
      // return `${nth}n`
      self.delay.delayTime.value = character.delay.delayTime(val)
    }),
    ...vuexSyncGen('delay', 'wet', val => {
      self.delay.wet.value = character.delay.wet(val)
    }),
    ...vuexSyncGen('delay', 'feedback', val => {
      self.delay.feedback.value = character.delay.feedback(val)
    }),
    ...mapState({
      delayTimeGoal: state => state.gameState.goal.delay.delayTime,
      feedbackGoal: state => state.gameState.goal.delay.feedback,
      wetGoal: state => state.gameState.goal.delay.wet,
      knobsAvailable: state => state.gameState.knobsAvailable.delay,
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

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
  color: #42b983;
}
</style>
