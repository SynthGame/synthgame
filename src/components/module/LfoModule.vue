  <template>
    <div class="module">
      <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
        <h2 slot="title">Tats</h2>
        <h3 v-if="dialsAreWithinMargin" slot="subtitle">Done!</h3>
        <h3 v-else slot="subtitle">Lfo</h3>
      </module-title>
        <module-display
          class="display"
          module="lfo"
          fill="#5bd484"
          :knobs="[{name: 'Rate', min:1, max:100, value: this.frequency},
                   {name: 'Amount', min:0, max:4000, value: this.amount},
                   {name: 'Shape', min:0, max:3, value: this.type},
                   {name: 'Fake', min:0, max:3, value: 'fake'},
                   {name: 'Rate', min:1, max:100, value: this.frequency},
                   {name: 'Amount', min:0, max:4000, value: this.amount},
                   {name: 'Shape', min:0, max:3, value: this.type},
                   {name: 'Fake', min:0, max:3, value: 'fake'}
                   ]"/>
        <div class="knobs">
          <module-knob
            v-model="frequency"
            :min="1"
            :max="100"
            knobColor="#5bd484"
            name="Rate"
            module="lfo"
          ></module-knob>
          <module-knob
            v-model="amount"
            :min="0"
            :max="100"
            knobColor="#5bd484"
            name="Amount"
            module="lfo"
          ></module-knob>
          <module-knob
            v-model="typeDial"
            :min="0"
            :max="100"
            knobColor="#5bd484"
            name="Shape"
            module="lfo"
          ></module-knob>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { vuexSyncGen, mapValueToRange } from '@/utils'
import { MODULE_LFO_COLOR } from '@/constants'

import audio from '@/audio'
import ModuleKnob from '@/components/ModuleKnob.vue'
import ModuleDisplay from '@/components/ModuleDisplay.vue'
import ModuleTitle from './ModuleComponents/ModuleTitle.vue'

var self

export default {
  name: 'LfoModule',
  props: {
    msg: String
  },
  data () {
    return {
      name: 'lfo',
      typeDial: 0,
      selectedType: '',
      lfo: {},
      moduleColor: MODULE_LFO_COLOR
    }
  },
  components: {
    ModuleKnob,
    ModuleDisplay,
    ModuleTitle
  },
  created () {
    self = this
    this.lfo = audio.lfo.state.device
  },
  computed: {
    dialsAreWithinMargin() {
      this.title = 'Done!';
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin[this.name])
        .every(param => param)
    },
    ...vuexSyncGen('lfo', 'frequency', val => {
      self.lfo.frequency.value = Math.pow(val, (val / 100)) - 1;
      console.log('self.lfo.frequency.value',self.lfo.frequency.value);
    }),
    ...vuexSyncGen('lfo', 'amount', val => {
      self.lfo.max = (val * 40)
    }),
    ...vuexSyncGen('lfo', 'type', val => {
      if (self.lfo.type === val) return
      self.lfo.type = val
      self.lfo.stop()
      self.lfo.start()
    }),
    ...mapState({
      typeArray: state => state.gameState.possibleValues.lfo.type,
    })
  },
  watch: {
    typeDial(val) {
      this.type = this.typeArray[mapValueToRange(val, 100, (this.typeArray.length -1))]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

svg.display {
    fill: #5bd484;
}

h3 {
  color: #5bd484;
}

ul {
  margin-top: 5em;
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
