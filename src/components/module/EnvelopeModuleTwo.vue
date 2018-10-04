<template>
  <div class="module">
    <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
      <!-- <h2 slot="title">Tats</h2> -->
      <h3 v-if="dialsAreWithinMargin" slot="subtitle">Done!</h3>
      <h3 v-else slot="subtitle">Mod Env</h3>
    </module-title>
    <module-display
      fill="#4b1bff"
      module="envelope"
      :knobs="[{name: 'attack', min: 1, max: 100, value: this.attack},
                {name: 'decay', min: 1, max: 100, value: this.decay},
                {name: 'sustain', min: 1, max: 100, value: 1},
                {name: 'release', min: 1, max: 100, value: 1},
                {name: 'attackGoal', min: 1, max: 100, value: this.attackGoal},
                {name: 'decayGoal', min: 1, max: 100, value: this.decayGoal},
                {name: 'sustainGoal', min: 1, max: 100, value: 1},
                {name: 'releasevGoal', min: 1, max: 100, value: 1},
                {name: 'amount', min: 1, max: 100, value: this.amount},
                {name: 'amountGoal', min: 1, max: 100, value: this.amountGoal},
                ]"/>
    <div class="knobs">
      <module-knob
        v-model="attack"
        v-if="knobsAvailable.attack || createModeIsActive"
        :min="0"
        :max="100"
        knobColor="#4b1bff"
        name="Attack"
        module="envelope"
      ></module-knob>
      <module-knob
        v-model="decay"
        v-if="knobsAvailable.decay || createModeIsActive"
        :min="0"
        :max="100"
        knobColor="#4b1bff"
        name="Decay"
        module="envelope"
      ></module-knob>
      <!-- <module-knob
        v-model="sustain"
        v-if="knobsAvailable.sustain || createModeIsActive"
        :min="0"
        :max="100"
        knobColor="#4b1bff"
        name="Sustain"
        module="envelope"
      ></module-knob> -->
      <!-- <module-knob
        v-model="release"
        v-if="knobsAvailable.release || createModeIsActive"
        :min="0"
        :max="100"
        knobColor="#4b1bff"
        name="Release"
        module="envelope"
      ></module-knob> -->
      <module-knob
        v-model="amount"
        v-if="knobsAvailable.amount || createModeIsActive"
        :min="0"
        :max="100"
        knobColor="#4b1bff"
        name="Amount"
        module="envelope"
      ></module-knob>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { vuexSyncGen } from '@/utils'
import { MODULE_ENVELOPETWO_COLOR } from '@/constants'

import audio from '@/audio'
import character from '@/character'
import ModuleKnob from '@/components/ModuleKnob.vue'
import ModuleDisplay from '@/components/ModuleDisplay.vue'
import ModuleTitle from './ModuleComponents/ModuleTitle.vue'

var self

export default {
  name: 'EnvelopeModule',
  props: {
    msg: String
  },
  data () {
    return {
      name: 'envelope2',
      envelope2: {},
      displayHeight: 300,
      displayWidth: 600,
      moduleColor: MODULE_ENVELOPETWO_COLOR,
      message: 'Done',
      messageArray: [
        'Ya man',
        // 'Nailed it',
        'Tune!',
        'Rad'
      ]
    }
  },
  components: {
    ModuleKnob,
    ModuleDisplay,
    ModuleTitle
  },
  created () {
    self = this
    this.envelope2 = audio.envelope2.state.device
  },
  // watch: {
  //   filterFreqMaxUpdate () {
  //
  //     this.$store.filter.max
  //   }
  // },
  computed: {
    timerIsRunning () {
      return this.$store.state.gameState.timerIsRunning
    },
    dialsAreWithinMargin () {
      if (this.createModeIsActive) return false // quick hack
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin[this.name])
        .every(param => param)
    },
    ...vuexSyncGen('envelope2', 'attack', val => {
      // somehow these values cause weird problems when they're 0
      // this is not a proper fix but if it works it's not stupid
      self.envelope2.attack = character.envelope2.attack(val || 1)
    }),
    ...vuexSyncGen('envelope2', 'decay', val => {
      self.envelope2.decay = character.envelope2.decay(val || 1)
    }),
    ...vuexSyncGen('envelope2', 'sustain', val => {
      self.envelope2.sustain = character.envelope2.sustain(val)
    }),
    ...vuexSyncGen('envelope2', 'release', val => {
      self.envelope2.release = character.envelope2.release(val || 1)
    }),
    ...vuexSyncGen('envelope2', 'amount', val => {
      self.envelope2.max = character.envelope2.amount(val || 1)
    }),
    // ...vuexSyncGen('envelope2', 'max', val => {
    //   // when filter updates, update env2 to TODO: only when connected to filter
    //   self.envelope2.max = this.$store.filter.cutOffFreq;
    //   console.log('self.envelope2.max', self.envelope2.max);
    // }),
    ...mapState({
      attackGoal: state => state.gameState.goal.envelope2.attack,
      decayGoal: state => state.gameState.goal.envelope2.decay,
      // sustainGoal: state => state.gameState.goal.envelope2.sustain,
      // releaseGoal: state => state.gameState.goal.envelope2.release,
      amountGoal: state => state.gameState.goal.envelope2.amount,
      knobsAvailable: state => state.gameState.knobsAvailable.envelope2,
      createModeIsActive: state => state.gameState.createModeIsActive
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

svg.display {
    fill: #4b1bff;
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
  color: #4b1bff;
}
</style>
