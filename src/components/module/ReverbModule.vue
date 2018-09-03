<template>
  <div class="module">
    <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
      <h2 slot="title">Tats</h2>
      <h3 v-if="dialsAreWithinMargin" slot="subtitle">Done!</h3>
      <h3 v-else slot="subtitle">Reverb</h3>
    </module-title>
    <module-display class="display"
             module="reverb"
             fill="#3c32ff"
             :knobs="[{name: 'Room Size', min:1, max:100, value: this.roomSize},
                      {name: 'Dry / Wet', min:1, max:100, value: this.wet}
                      ]"/>
    <div class="knobs">
      <module-knob
        v-model="roomSize"
        :min="0"
        :max="100"
        knobColor="#3c32ff"
        name="Size"
        module="reverb"
      ></module-knob>
      <module-knob
        v-model="wet"
        :min="0"
        :max="100"
        knobColor="#3c32ff"
        name="Dry/wet"
        module="reverb"
      ></module-knob>
    </div>
  </div>
</template>

<script>
import { vuexSyncGen } from '@/utils'
import { MODULE_REVERB_COLOR } from '@/constants'

import audio from '@/audio'
import character from '@/character'
import ModuleKnob from '@/components/ModuleKnob.vue'
import ModuleDisplay from '@/components/ModuleDisplay.vue'
import ModuleTitle from './ModuleComponents/ModuleTitle.vue'

var self

export default {
  name: 'ReverbModule',
  props: {
    msg: String
  },
  data () {
    return {
      name: 'reverb',
      reverb: {},
      sliderValue: 0,
      moduleColor: MODULE_REVERB_COLOR
    }
  },
  components: {
    ModuleKnob,
    ModuleDisplay,
    ModuleTitle
  },
  created () {
    self = this
    this.reverb = audio.reverb.state.device
  },
  computed: {
    dialsAreWithinMargin() {
      this.title = 'Done!';
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin[this.name])
        .every(param => param)
    },
    ...vuexSyncGen('reverb', 'wet', val => {
      self.reverb.wet.value = character.reverb.wet(val)
    }),
    ...vuexSyncGen('reverb', 'roomSize', val => {
      self.reverb.roomSize.value = character.reverb.roomSize(val)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

svg.display {
    fill: #3c32ff;
}

h3 {
  color: #3c32ff;
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
