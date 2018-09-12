<template>
  <div class="game">
    <game-nav-bar/>
    <div class="level">
      <sequencer-module
        v-if="createModeIsActive"
        class="module sequencer"
      />
      <OscillatorModule
        v-if="moduleIsUseable('oscillator')"
        :class="[(activeModule == 0 ? 'active' : '')]"
      />
      <FilterModule
        v-if="moduleIsUseable('filter')"
        :class="[(activeModule == 1 ? 'active' : '')]"
      />
      <EnvelopeModule
        v-if="moduleIsUseable('envelope')"
        :class="[(activeModule == 2 ? 'active' : '')]"
      />
      <LfoModule
        v-if="moduleIsUseable('lfo')"
        :class="[(activeModule == 3 ? 'active' : '')]"
      />
      <!-- <DelayModule
        v-if="moduleIsUseable('delay')"
        v-masonry-tile
        :class="[(activeModule == 4 ? 'active' : '')]"
      /> -->
      <!-- <ReverbModule
        v-if="moduleIsUseable('reverb')"
        v-masonry-tile
        :class="[(activeModule == 5 ? 'active' : '')]"
      /> -->
    </div>
    <div class="tabs">
      <div @click="showOsc" class="tabs__tab tabs__osc">Osc</div>
      <div @click="showFil" class="tabs__tab tabs__filter">Fil</div>
      <div @click="showEnv" class="tabs__tab tabs__env">Env</div>
      <div @click="showLfo" class="tabs__tab tabs__lfo">Lfo</div>
      <!-- <div @click="showDel" class="tabs__tab tabs__delay">Del</div>
      <div @click="showRev" class="tabs__tab tabs__reverb">Rev</div> -->
    </div>
  </div>
</template>

<script>
import some from 'lodash/some'
// @ is an alias to /src
import GameNavBar from '@/components/GameNavBar.vue'
import OscillatorModule from '@/components/module/OscillatorModule.vue'
import EnvelopeModule from '@/components/module/EnvelopeModule.vue'
import FilterModule from '@/components/module/FilterModule.vue'
import LfoModule from '@/components/module/LfoModule.vue'
import DelayModule from '@/components/module/DelayModule.vue'
import ReverbModule from '@/components/module/ReverbModule.vue'
import SequencerModule from '@/components/module/SequencerModule.vue'

export default {
  name: 'home',
  data () {
    return {
      activeModule: 0,
      marginArray: [0,0.2,0.4,0.6]
    }
  },
  components: {
    GameNavBar,
    OscillatorModule,
    EnvelopeModule,
    FilterModule,
    LfoModule,
    DelayModule,
    ReverbModule,
    SequencerModule
  },
  methods: {
    showOsc () {
      this.activeModule = 0;
    },
    showFil () {
      this.activeModule = 1;
    },
    showEnv () {
      this.activeModule = 2;
    },
    showLfo () {
      this.activeModule = 3;
    },
    showDel () {
      this.activeModule = 4;
    },
    showRev () {
      this.activeModule = 5;
    },
    moduleIsUseable (moduleName) {
      if (this.createModeIsActive) return true
      return some(this.knobsAvailable[moduleName]) // some are truthy
    }
  },
  computed: {
    createModeIsActive () {
      return this.$store.state.gameState.createModeIsActive
    },
    knobsAvailable () {
      return this.$store.state.gameState.knobsAvailable
    }
  }
}
</script>

<style scoped lang="scss">

.active {
    left: 0;
}

</style>
