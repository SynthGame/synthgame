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
                   {name: 'rl', min:0, max:3, value: this.realFrq},
                   {name: 'Rate', min:1, max:100, value: this.frequencyGoal},
                   {name: 'Amount', min:0, max:4000, value: this.amountGoal},
                   {name: 'Shape', min:0, max:3, value: this.typeGoal},
                   {name: 'Rlgl', min:0, max:3, value: Math.pow(this.frequencyGoal, (this.frequencyGoal / 100)) - 1}
                   ]"/>
        <div class="knobs">
          <!-- <module-knob
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
          ></module-knob> -->
          <!-- <module-knob
            v-model="typeDial"
            :min="0"
            :max="100"
            knobColor="#5bd484"
            name="Shape"
            module="lfo"
          ></module-knob> -->
                <div class="button-wrapper">
        <button @click="type='sine'" :class="type==='sine' ? 'selected': ''">
          <svg version="1.1"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
            x="0px" y="0px" width="16.3px" height="8.8px" viewBox="0 0 16.3 8.8" style="enable-background:new 0 0 16.3 8.8;"
            xml:space="preserve">
            <path class="st0" d="M15.7,4.4c0,2.1-1.7,3.8-3.8,3.8S8.2,6.5,8.2,4.4S6.5,0.6,4.4,0.6S0.6,2.3,0.6,4.4"/>
          </svg>
        </button>
                <button @click="type='square'" :class="type==='square' ? 'selected': ''">
    <svg version="1.1"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"   xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
      x="0px" y="0px" width="16.3px" height="16.3px" viewBox="0 0 16.3 16.3"    style="enable-background:new 0 0 16.3 16.3;"
      xml:space="preserve">
      <path class="st0" d="M0.6,8.1V0.6h7.6v7.6v7.6h7.6V8.1l0,0"/>
    </svg>
        </button>
                <button @click="type='sawtooth'" :class="type==='sawtooth' ? 'selected': ''">
    <svg version="1.1"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
    x="0px" y="0px" width="21.9px" height="9.9px" viewBox="0 0 21.9 9.9" style="enable-background:new 0 0 21.9 9.9;"
    xml:space="preserve">
    <path class="st0" d="M21.5,1.2L21.5,1.2L10.9,8.8V1.2L0.3,8.8"/>
    </svg>
        </button>
                <button @click="type='triangle'" :class="type==='triangle' ? 'selected': ''">
    <svg version="1.1"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
      x="0px" y="0px" width="15.9px" height="8.8px" viewBox="0 0 15.9 8.8" style="enable-background:new 0 0 15.9 8.8;"
      xml:space="preserve">
      <path class="st0" d="M0.4,8.4L8,0.8l7.5,7.6"/>
    </svg>
        </button>
        <p>SHAPE</p>
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
      self.lfo.frequency.value = character.lfo.frequency(val)
      self.realFrq = character.lfo.frequency(val)
    }),
    ...vuexSyncGen('lfo', 'amount', val => {
      self.lfo.max = character.lfo.amount(val)
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

button, input[type="submit"], input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    // cursor: pointer;
    outline: inherit;
      border: 1px #5bd484 solid;
  justify-content: center;
  align-items: center;
  display: flex;
  min-width: 40%;

  min-height: 1.3rem;
  cursor: pointer;
  margin: 0.1rem
}

  p {
     margin: .5em 0 0 0;
     font-size: .7em;
     text-transform: uppercase;
     letter-spacing: 1px;
  }
  .button-wrapper {
      display: flex;
      flex-wrap: wrap;
      width: 25%;
      min-width: 5rem;
  }

.selected {
  background-color: #5bd484
}
</style>
