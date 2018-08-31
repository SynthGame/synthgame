<template>
  <div class="module">
    <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
      <h2 slot="title">Tats</h2>
      <h3 slot="subtitle">Envelope</h3>
    </module-title>
    <module-display
      fill="#e4e259"
      module="envelope"
      :knobs="[{name: 'attack', min: 1, max: 100, value: this.attack},
                {name: 'decay', min: 1, max: 100, value: this.decay},
                {name: 'sustain', min: 1, max: 100, value: this.sustain},
                {name: 'release', min: 1, max: 100, value: this.release}
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
import { vuexSyncGen } from '@/utils'
import { MODULE_ENVELOPE_COLOR } from '@/constants'

import audio from '@/audio'
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
      moduleColor: MODULE_ENVELOPE_COLOR
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
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin[this.name])
        .every(param => param)        
    },
    ...vuexSyncGen('envelope', 'attack', val => {
      self.envelope.attack = val + 0.01
    }),
    ...vuexSyncGen('envelope', 'decay', val => {
      self.envelope.decay = Math.pow(val, (val / 100)) - 0.99
    }),
    ...vuexSyncGen('envelope', 'sustain', val => {
      self.envelope.sustain = val / 100
    }),
    ...vuexSyncGen('envelope', 'release', val => {
      self.envelope.release = val
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
