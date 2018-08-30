  <template>
    <div class="module">
      <div class="title">
        <h2>Tats</h2>
        <h3>Lfo</h3>
      </div>
        <module-display
          class="display"
          module="lfo"
          fill="#5bd484"
          :knobs="[{name: 'Rate', min:1, max:100, value: this.frequency},
                   {name: 'Amount', min:0, max:4000, value: this.amount},
                   {name: 'Shape', min:0, max:3, value: this.selectedType}]"/>
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
            v-model="type"
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
import { vuexSyncGen, mapValueToRange } from '@/utils'

import audio from '@/audio'
import ModuleKnob from '@/components/ModuleKnob.vue'
import ModuleDisplay from '@/components/ModuleDisplay.vue'

var self

export default {
  name: 'LfoModule',
  props: {
    msg: String
  },
  data () {
    return {
      typeArray: [
        'sine',
        'square',
        'sawtooth',
        'triangle'
      ],
      selectedType: '',
      lfo: {}
    }
  },
  components: {
    ModuleKnob,
    ModuleDisplay
  },
  created () {
    self = this
    this.lfo = audio.lfo.state.device
  },
  computed: {
    ...vuexSyncGen('lfo', 'frequency', val => {
      self.lfo.frequency.value = Math.pow(val, (val / 100)) - 1
    }),
    ...vuexSyncGen('lfo', 'amount', val => {
      self.lfo.max = (val * 40)
    }),
    ...vuexSyncGen('lfo', 'type', val => {
      self.selectedType = self.typeArray[mapValueToRange(val, 100, (self.typeArray.length - 1))]
      if (self.lfo.type === self.selectedType) return
      self.lfo.type = self.selectedType
      self.lfo.stop()
      self.lfo.start()
    })
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
