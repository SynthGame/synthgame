<template>
  <div class="module">
    <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
      <h2 slot="title">Tats</h2>
      <h3 v-if="dialsAreWithinMargin" slot="subtitle">{{message}}</h3>
      <h3 v-else slot="subtitle">Envelope</h3>
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
                {name: 'releasevGoal', min: 1, max: 100, value: this.releaseGoal}
                ]"/>
    <div class="knobs">
      <module-knob
        v-model="attack"
        :min="0"
        :max="100"
        knobColor="#e4e259"
        name="Attack"
        module="envelope"
      ></module-knob>
      <module-knob
        v-model="decay"
        :min="0"
        :max="100"
        knobColor="#e4e259"
        name="Decay"
        module="envelope"
      ></module-knob>
      <module-knob
        v-model="sustain"
        :min="0"
        :max="100"
        knobColor="#e4e259"
        name="Sustain"
        module="envelope"
      ></module-knob>
      <module-knob
        v-model="release"
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
        'You rock',
        'Nailed it',
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
    dialsAreWithinMargin() {
      this.message = this.messageArray[Math.round(Math.random()*4)];
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin[this.name])
        .every(param => param)
    },
    ...vuexSyncGen('envelope', 'attack', val => {
      self.envelope.attack = character.envelope.attack(val)
    }),
    ...vuexSyncGen('envelope', 'decay', val => {
      self.envelope.decay = character.envelope.decay(val)
    }),
    ...vuexSyncGen('envelope', 'sustain', val => {
      self.envelope.sustain = character.envelope.sustain(val)
    }),
    ...vuexSyncGen('envelope', 'release', val => {
      self.envelope.release = character.envelope.release(val)
    }),
    ...mapState({
      attackGoal: state => state.gameState.goal.envelope.attack,
      decayGoal: state => state.gameState.goal.envelope.decay,
      sustainGoal: state => state.gameState.goal.envelope.sustain,
      releaseGoal: state => state.gameState.goal.envelope.release
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

svg.display {
    fill: #e4e259;
}

h3 {
  color: #e4e259;
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
