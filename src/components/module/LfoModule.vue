  <template>
    <div class="module">
      <div class="title">
        <h2>Tats</h2>
        <h3>Lfo</h3>
      </div>
        <display class="display"
           module="lfo"
           fill="#5bd484"
           :knobs="[{name: 'Rate', min:1, max:100, value: this.frequency},
                    {name: 'Amount', min:0, max:4000, value: this.amount},
                    {name: 'Shape', min:0, max:3, value: this.type}]"/>
        <div class="knobs">
          <circle-slider
            v-model="frequency"
            :min="1"
            :max="100"
            knobColor="#5bd484"
            name="Rate"
            module="lfo"
          ></circle-slider>
          <circle-slider
            v-model="amount"
            :min="0"
            :max="100"
            knobColor="#5bd484"
            name="Amount"
            module="lfo"
          ></circle-slider>
          <circle-slider
            v-model="type"
            :min="0"
            :max="100"
            knobColor="#5bd484"
            name="Shape"
            module="lfo"
          ></circle-slider>
        </div>
    </div>
</template>

<script>
import { vuexSyncGen, mapValueToRange } from '@/utils'

import audio from '@/audio'
import CircleSlider from '@/components/knob.vue'
import display from '@/components/display.vue'

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
      lfo: {}
    }
  },
  components: {
    CircleSlider,
    display
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
      self.lfo.type = self.typeArray[mapValueToRange(val, 100, (self.typeArray.length - 1))]
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
