  <template>
    <div class="module">
      <module-title :indicator-active="dialsAreWithinMargin" :module-color="moduleColor">
        <!-- <h2 slot="title">Tats</h2> -->
        <h3 v-if="dialsAreWithinMargin" slot="subtitle">Done!</h3>
        <h3 v-else slot="subtitle">Mod Lfo</h3>
      </module-title>
        <module-display
          class="display"
          module="lfo"
          fill="#5bd484"
          :knobs="[{name: 'Rate', min:1, max:100, value: this.frequency},
                   {name: 'Amount', min:0, max:4000, value: this.amount},
                   {name: 'Shape', min:0, max:3, value: this.type},
                   {name: 'rl', min:0, max:3, value: this.realFrq},
                   {name: 'Rate', min:1, max:100, value: this.frequencyGoal},
                   {name: 'Amount', min:0, max:4000, value: this.amountGoal},
                   {name: 'Shape', min:0, max:3, value: this.typeGoal},
                   {name: 'Rlgl', min:0, max:3, value: Math.pow(this.frequencyGoal, (this.frequencyGoal / 100)) - 0.99}
                   ]"/>
        <div class="knobs">
          <module-knob
            v-model="frequency"
            v-if="knobsAvailable.frequency || createModeIsActive"
            :min="1"
            :max="100"
            knobColor="#5bd484"
            name="Speed"
            module="lfo"
          ></module-knob>
          <module-knob
            v-model="amount"
            v-if="knobsAvailable.amount || createModeIsActive"
            :min="0"
            :max="100"
            knobColor="#5bd484"
            name="Height"
            module="lfo"
          ></module-knob>
      <div class="button-wrapper"
         v-if="knobsAvailable.type || createModeIsActive"
      >
        <module-button color="#5bd484" shape="sine" :isPressed="type==='sine'" @click.native="type='sine'"/>
        <module-button color="#5bd484" shape="square" :isPressed="type==='square'" @click.native="type='square'"/>
        <module-button color="#5bd484" shape="sawtooth" :isPressed="type==='sawtooth'" @click.native="type='sawtooth'"/>
        <module-button color="#5bd484" shape="triangle" :isPressed="type==='triangle'" @click.native="type='triangle'"/>
        <p>MOVEMENT</p>
      </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { vuexSyncGen, mapValueToRange } from '@/utils'
import { MODULE_LFO_COLOR } from '@/constants'

import audio from '@/audio'
import character from '@/character'
import ModuleKnob from '@/components/ModuleKnob.vue'
import ModuleDisplay from '@/components/ModuleDisplay.vue'
import ModuleTitle from './ModuleComponents/ModuleTitle.vue'
import ModuleButton from '@/components/ModuleButton.vue'

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
      moduleColor: MODULE_LFO_COLOR,
      realFrq: null
    }
  },
  components: {
    ModuleKnob,
    ModuleDisplay,
    ModuleTitle,
    ModuleButton
  },
  created () {
    self = this
    this.lfo = audio.lfo.state.device
  },
  mounted () {
    this.realFrq = character.lfo.type(this.lfo.frequency.value)
  },
  computed: {
    timerIsRunning () {
      return this.$store.state.gameState.timerIsRunning
    },
    dialsAreWithinMargin () {
      if (this.createModeIsActive) return false // quick hack
      this.title = 'Done!'
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin[this.name])
        .every(param => param)
    },
    ...vuexSyncGen('lfo', 'frequency', val => {
      self.lfo.frequency.value = character.lfo.frequency(val)
      self.realFrq = character.lfo.frequency(val)
    }),
    ...vuexSyncGen('lfo', 'amount', val => {
      if (self.$store.state.audioParameters.router.lfo === 'filterCutoff') {
        self.lfo.max = character.filter.cutOffFreq(self.$store.state.audioParameters.filter.cutOffFreq) * (1 + val/100);
        self.lfo.min = character.filter.cutOffFreq(self.$store.state.audioParameters.filter.cutOffFreq) - (character.filter.cutOffFreq(self.$store.state.audioParameters.filter.cutOffFreq) * (val/100));
      } else {
        self.lfo.max = character.lfo.amount(val) //TEMP disabled. mounting min and max manually from connected device
        self.lfo.min = character.lfo.amount(val) * -1
      }
    }),
    ...vuexSyncGen('lfo', 'type', val => {
      if (self.lfo.type === character.lfo.type(val)) return
      self.lfo.type = character.lfo.type(val)
      self.lfo.stop()
      self.lfo.start()
    }),
    ...mapState({
      typeArray: state => state.gameState.possibleValues.lfo.type,
      frequencyGoal: state => state.gameState.goal.lfo.frequency,
      typeGoal: state => state.gameState.goal.lfo.type,
      amountGoal: state => state.gameState.goal.lfo.amount,
      knobsAvailable: state => state.gameState.knobsAvailable.lfo,
      createModeIsActive: state => state.gameState.createModeIsActive
    })
  },
  watch: {
    typeDial (val) {
      this.type = this.typeArray[mapValueToRange(val, 100, (this.typeArray.length - 1))]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

svg.display {
    fill: #5bd484;
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

.button-wrapper{
  button {
    border-color: #5bd484;
  }
}

</style>
