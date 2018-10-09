<template>
  <div class="game">
    <game-nav-bar />
    <div class="level">
      <oscillator-module-one
        v-if="moduleIsUseable('oscillator1')"
        :class="[(activeModule == 0 ? 'active' : '')]"
        :style="{
          'position': !createModeIsActive ? 'absolute' : 'relative',
          'top':
          !createModeIsActive &&
          rackSlotArray[0] < 6 ? '46vh' : 0,
          'left':
          !createModeIsActive &&
          rackSlotArray[0] < 6 ?
          rackSlotArray[0] * 16.67 + 'vw'
          : ( !createModeIsActive &&
          rackSlotArray[0] > 5 ? rackSlotArray[0] * 16.67 - (6 * 16.67) + 'vw': '')
          ,
          }"
      />
      <oscillator-module-two
        v-if="moduleIsUseable('oscillator2')"
        :class="[(activeModule == 1 ? 'active' : '')]"
        :style="{
          'position': !createModeIsActive ? 'absolute' : 'relative',
          'top':
          !createModeIsActive &&
          rackSlotArray[1] < 6 ? '46vh' : 0,
          'left':
          !createModeIsActive &&
          rackSlotArray[1] < 6 ?
          rackSlotArray[1] * 16.67 + 'vw'
          : ( !createModeIsActive &&
          rackSlotArray[1] > 5 ? rackSlotArray[1] * 16.67 - (6 * 16.67) + 'vw': '')
          ,
          }"
      />
      <filter-module
        v-if="moduleIsUseable('filter')"
        :class="[(activeModule == 2 ? 'active' : '')]"
        :style="{
          'position': !createModeIsActive ? 'absolute' : 'relative',
          'top':
          !createModeIsActive &&
          rackSlotArray[2] < 6 ? '46vh' : 0,
          'left':
          !createModeIsActive &&
          rackSlotArray[2] < 6 ?
          rackSlotArray[2] * 16.67 + 'vw'
          : ( !createModeIsActive &&
          rackSlotArray[2] > 5 ? rackSlotArray[2] * 16.67 - (6 * 16.67) + 'vw': '')
          ,
          }"
      />
      <envelope-module
        v-if="moduleIsUseable('envelope')"
        :class="[(activeModule == 3 ? 'active' : '')]"
        :style="{
          'position': !createModeIsActive ? 'absolute' : 'relative',
          'top':
          !createModeIsActive &&
          rackSlotArray[3] < 6 ? '46vh' : 0,
          'left':
          !createModeIsActive &&
          rackSlotArray[3] < 6 ?
          rackSlotArray[3] * 16.67 + 'vw'
          : ( !createModeIsActive &&
          rackSlotArray[3] > 5 ? rackSlotArray[3] * 16.67 - (6 * 16.67) + 'vw': '')
          ,
          }"
      />
      <lfo-module
        v-if="moduleIsUseable('lfo')"
        :class="[(activeModule == 4 ? 'active' : '')]"
        :style="{
          'position': !createModeIsActive ? 'absolute' : 'relative',
          'top':
          !createModeIsActive &&
          rackSlotArray[4] < 6 ? '46vh' : 0,
          'left':
          !createModeIsActive &&
          rackSlotArray[4] < 6 ?
          rackSlotArray[4] * 16.67 + 'vw'
          : ( !createModeIsActive &&
          rackSlotArray[4] > 5 ? rackSlotArray[4] * 16.67 - (6 * 16.67) + 'vw': '')
          ,
          }"
      />
      <envelope-module-two
        v-if="moduleIsUseable('envelope2')"
        :class="[(activeModule == 5 ? 'active' : '')]"
        :style="{
          'position': !createModeIsActive ? 'absolute' : 'relative',
          'top':
          !createModeIsActive &&
          rackSlotArray[5] < 6 ? '46vh' : 0,
          'left':
          !createModeIsActive &&
          rackSlotArray[5] < 6 ?
          rackSlotArray[5] * 16.67 + 'vw'
          : ( !createModeIsActive &&
          rackSlotArray[5] > 5 ? rackSlotArray[5] * 16.67 - (6 * 16.67) + 'vw': '')
          ,
          }"
      />
      <sequencer-module
        v-if="createModeIsActive"
        :class="[(activeModule == 7 ? 'active' : '')]"
        class="module sequencer"
      />
      <router-module
        v-if="moduleIsUseable('router')"
        :class="[(activeModule == 6 ? 'active' : '')]"
        :style="{
          'position': !createModeIsActive ? 'absolute' : 'relative',
          'top':
          !createModeIsActive &&
          rackSlotArray[6] < 6 ? '46vh' : 0,
          'left':
          !createModeIsActive &&
          rackSlotArray[6] < 6 ?
          rackSlotArray[6] * 16.67 + 'vw'
          : ( !createModeIsActive &&
          rackSlotArray[6] > 5 ? rackSlotArray[6] * 16.67 - (6 * 16.67) + 'vw': '')
          ,
          }"
      />
    </div>
    <div class="tabs">
      <div @click="showOsc1" v-if="moduleIsUseable('oscillator1')" class="tabs__tab tabs__osc"><span>Osc 1</span><span
          :class="{
                    'module__name__status-indicator': true,
                    'module__name__status-indicator--active': oscillator1Complete
                  }"
          :style="{
                    'background-color': oscillator1Complete ? oscillatorColor : '',
                    'box-shadow': oscillator1Complete ? `0px 0px 16px ${oscillatorColor}` : '',
                  }"
        ></span></div>
      <div @click="showOsc2" v-if="moduleIsUseable('oscillator2')" class="tabs__tab tabs__osc"><span>Osc 2</span><span
          v-if="moduleIsUseable('oscillator2')"
          :class="{
                    'module__name__status-indicator': true,
                    'module__name__status-indicator--active': oscillator2Complete
                  }"
          :style="{
                    'background-color': oscillator2Complete ? oscillatorTwoColor : '',
                    'box-shadow': oscillator2Complete ? `0px 0px 16px ${oscillatorTwoColor}` : '',
                  }"
        ></span></div>
      <div @click="showFil" v-if="moduleIsUseable('filter')" class="tabs__tab tabs__filter"><span>Filter</span><span
        v-if="moduleIsUseable('filter')"
        :class="{
                  'module__name__status-indicator indicator__osctwo': true,
                  'module__name__status-indicator--active indicator__osctwo': filterComplete
                }"
            :style="{
                  'background-color': filterComplete ? filterColor : '',
                  'box-shadow': filterComplete ? `0px 0px 16px ${filterColor}` : '',
                }"
      ></span></div>
      <div @click="showEnv" v-if="moduleIsUseable('envelope')" class="tabs__tab tabs__env"><span>Env</span><span
        v-if="moduleIsUseable('envelope')"
        :class="{
                  'module__name__status-indicator indicator__envelope': true,
                  'module__name__status-indicator--active indicator__envelope': envelopeComplete
                }"
        :style="{
                  'background-color': envelopeComplete ? envelopeColor : '',
                  'box-shadow': envelopeComplete ? `0px 0px 16px ${envelopeColor}` : '',
                }"
      ></span></div>
      <div @click="showEnv2" v-if="moduleIsUseable('envelope2')" class="tabs__tab tabs__env"><span>Env 2</span><span
        v-if="moduleIsUseable('envelope2')"
        :class="{
                  'module__name__status-indicator indicator__envelope': true,
                  'module__name__status-indicator--active indicator__envelope': envelope2Complete
                }"
        :style="{
                  'background-color': envelope2Complete ? envelopeColor : '',
                  'box-shadow': envelope2Complete ? `0px 0px 16px ${envelopeColor}` : '',
                }"
      ></span></div>
      <div @click="showLfo" v-if="moduleIsUseable('lfo')" class="tabs__tab tabs__lfo"><span>Lfo</span><span
        v-if="moduleIsUseable('lfo')"
        :class="{
                  'module__name__status-indicator indicator__lfo': true,
                  'module__name__status-indicator--active indicator__lfo': lfoComplete
                }"
        :style="{
                  'background-color': lfoComplete ? lfoColor : '',
                  'box-shadow': lfoComplete ? `0px 0px 16px ${lfoColor}` : '',
                }"
      ></span></div>
      <div @click="showRouter" v-if="moduleIsUseable('router')" class="tabs__tab tabs__router"><span>Rout</span><span
        v-if="moduleIsUseable('router')"
        :class="{
                  'module__name__status-indicator indicator__router': true,
                  'module__name__status-indicator--active indicator__router': routerComplete
                }"
        :style="{
                  'background-color': routerComplete ? routerColor : '',
                  'box-shadow': routerComplete ? `0px 0px 16px ${routerColor}` : '',
                }"
      ></span></div>
      <div @click="showSequencer" v-if="createModeIsActive" class="tabs__tab tabs__sequencer"><span>Seq</span><span
        v-if="createModeIsActive"
        :class="{
                  'module__name__status-indicator indicator__sequencer': true,
                  'module__name__status-indicator--active indicator__sequencer': true
                }"
        :style="{
                  'background-color': sequencerColor ,
                  'box-shadow': `0px 0px 16px ${sequencerColor}`,
                }"
      ></span></div>
    </div>
  </div>
</template>

<script>
import { MODULE_SEQUENCER_COLOR, MODULE_ROUTER_COLOR, MODULE_OSCILLATOR_COLOR, MODULE_OSCILLATORTWO_COLOR, MODULE_ENVELOPE_COLOR, MODULE_FILTER_COLOR, MODULE_DELAY_COLOR, MODULE_REVERB_COLOR, MODULE_LFO_COLOR} from '@/constants'
import some from 'lodash/some'
// @ is an alias to /src
import GameNavBar from '@/components/GameNavBar.vue'
import OscillatorModuleOne from '@/components/module/OscillatorModuleOne.vue'
import OscillatorModuleTwo from '@/components/module/OscillatorModuleTwo.vue'
import EnvelopeModule from '@/components/module/EnvelopeModule.vue'
import EnvelopeModuleTwo from '@/components/module/EnvelopeModuleTwo.vue'
import FilterModule from '@/components/module/FilterModule.vue'
import LfoModule from '@/components/module/LfoModule.vue'
import SequencerModule from '@/components/module/SequencerModule.vue'
import RouterModule from '@/components/module/RouterModule.vue'

export default {
  name: 'home',
  data () {
    return {
      activeModule: 0,
      marginArray: [0, 0.2, 0.4, 0.6],
      indicatorActive: true,
      oscillatorColor: MODULE_OSCILLATOR_COLOR,
      oscillatorTwoColor: MODULE_OSCILLATORTWO_COLOR,
      envelopeColor: MODULE_ENVELOPE_COLOR,
      filterColor: MODULE_FILTER_COLOR,
      lfoColor: MODULE_LFO_COLOR,
      routerColor: MODULE_ROUTER_COLOR,
      sequencerColor: MODULE_SEQUENCER_COLOR
    }
  },
  components: {
    GameNavBar,
    OscillatorModuleOne,
    OscillatorModuleTwo,
    RouterModule,
    EnvelopeModule,
    EnvelopeModuleTwo,
    FilterModule,
    LfoModule,
    SequencerModule
  },
  mounted () {
      this.showSequencer()
  },
  methods: {
    moduleIsUseable (moduleName) {
      if (this.createModeIsActive) return true
      return some(this.knobsAvailable[moduleName]) // some are truthy
    },
    showOsc1 () {
      this.activeModule = 0
    },
    showOsc2 () {
      this.activeModule = 1
    },
    showFil () {
      this.activeModule = 2
    },
    showEnv () {
      this.activeModule = 3
    },
    showEnv2 () {
      this.activeModule = 5
    },
    showLfo () {
      this.activeModule = 4
    },
    showRouter () {
      this.activeModule = 6
    },
    showSequencer () {
      this.activeModule = 7
    },
    moduleIsUseable (moduleName) {
      if (this.createModeIsActive) return true
      return some(this.knobsAvailable[moduleName]) // some are truthy
    }
  },
  computed: {
    rackSlotArray () {
      return this.$store.state.gameState.rackSlotArray
    },
    createModeIsActive () {
      return this.$store.state.gameState.createModeIsActive
    },
    knobsAvailable () {
      return this.$store.state.gameState.knobsAvailable
    },
    knobsAvailable () {
      return this.$store.state.gameState.knobsAvailable
    },
    oscillator1Complete () {
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin['oscillator1']).every(param => param)
    },
    oscillator2Complete () {
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin['oscillator2']).every(param => param)
    },
    filterComplete () {
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin['filter']).every(param => param)
    },
    envelopeComplete () {
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin['envelope']).every(param => param)
    },
    envelope2Complete () {
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin['envelope2']).every(param => param)
    },
    lfoComplete () {
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin['lfo']).every(param => param)
    },
    routerComplete () {
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin['router']).every(param => param)
    },
  }
}
</script>

<style scoped lang="scss">

.module__name__status-indicator {
  display: inline-block;
  width: 11px;
  height: 11px;
  border-radius: 100%;
  transition: 0.5s;
 border: 1px solid white;

  &--active {
    border: none;
    transition: 0.5s;
 border: 1px solid white;

  }
}

.active {
    left: 0;
}



.twelve {
  left: calc(5*16.67em);
  top: 24.5em;
}

</style>
