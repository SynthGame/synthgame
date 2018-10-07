<template>
  <div class="module">
    <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
      <!-- <h2 slot="title">Tats</h2> -->
      <h3 v-if="dialsAreWithinMargin" slot="subtitle">Done!</h3>
      <h3 v-else slot="subtitle">Amp Env</h3>
    </module-title>
    <module-display
      fill="#e4e259"
      module="envelope"
      :knobs="[{name: 'attack', min: 1, max: 100, value: this.attack},
                {name: 'decay', min: 1, max: 100, value: this.decay},
                {name: 'sustain', min: 1, max: 100, value: this.sustain},
                {name: 'release', min: 1, max: 100, value: this.release},
                {name: 'attackGoal', min: 1, max: 100, value: this.attackGoal},
                {name: 'decayGoal', min: 1, max: 100, value: this.decayGoal},
                {name: 'sustainGoal', min: 1, max: 100, value: this.sustainGoal},
                {name: 'releasevGoal', min: 1, max: 100, value: this.releaseGoal},
                {name: 'amount', min: 1, max: 100, value: 100},
                {name: 'amountGoal', min: 1, max: 100, value: 100},
                ]"/>
    <div class="knobs">
      <module-knob
        v-model="attack"
        v-if="knobsAvailable.attack || createModeIsActive"
        :min="0"
        :max="100"
        knobColor="#e4e259"
        name="Attack"
        module="envelope"
      ></module-knob>
      <module-knob
        v-model="decay"
        v-if="knobsAvailable.decay || createModeIsActive"
        :min="0"
        :max="100"
        knobColor="#e4e259"
        name="Decay"
        module="envelope"
      ></module-knob>
      <module-knob
        v-model="sustain"
        v-if="knobsAvailable.sustain || createModeIsActive"
        :min="0"
        :max="100"
        knobColor="#e4e259"
        name="Sustain"
        module="envelope"
      ></module-knob>
      <module-knob
        v-model="release"
        v-if="knobsAvailable.release || createModeIsActive"
        :min="0"
        :max="100"
        knobColor="#e4e259"
        name="Release"
        module="envelope"
      ></module-knob>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { vuexSyncGen } from '@/utils'
import { MODULE_ENVELOPE_COLOR } from '@/constants'

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
      name: 'envelope',
      envelope: {},
      displayHeight: 300,
      displayWidth: 600,
      moduleColor: MODULE_ENVELOPE_COLOR,
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
    this.envelope = audio.envelope.state.device
  },
  computed: {
    timerIsRunning () {
      return this.$store.state.gameState.timerIsRunning
    },
    dialsAreWithinMargin () {
      if (this.createModeIsActive) return false // quick hack
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin[this.name])
        .every(param => param)
    },
    ...vuexSyncGen('envelope', 'attack', val => {
      // somehow these values cause weird problems when they're 0
      // this is not a proper fix but if it works it's not stupid
      self.envelope.attack = character.envelope.attack(val || 1)
    }),
    ...vuexSyncGen('envelope', 'decay', val => {
      self.envelope.decay = character.envelope.decay(val || 1)
    }),
    ...vuexSyncGen('envelope', 'sustain', val => {
      self.envelope.sustain = character.envelope.sustain(val || 0)
    }),
    ...vuexSyncGen('envelope', 'release', val => {
      self.envelope.release = character.envelope.release(val || 1)
    }),
    ...mapState({
      attackGoal: state => state.gameState.goal.envelope.attack,
      decayGoal: state => state.gameState.goal.envelope.decay,
      sustainGoal: state => state.gameState.goal.envelope.sustain,
      releaseGoal: state => state.gameState.goal.envelope.release,
      knobsAvailable: state => state.gameState.knobsAvailable.envelope,
      createModeIsActive: state => state.gameState.createModeIsActive
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

svg.display {
    fill: #e4e259;
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
