<template>
  <div class="game">
    <game-nav-bar/>
    <div class="level" v-masonry transition-duration="0.3s" item-selector=".module">
      <sequencer-module
        v-if="createModeIsActive"
        v-masonry-tile
        class="module sequencer"
      />
      <OscillatorModule
        v-if="hasActiveControlls('oscillator')"
        v-masonry-tile
        :class="[(activeModule == 0 ? 'active' : '')]"
      />
      <!-- <div v-for="n in 1" v-masonry-tile class="module empty"></div> -->
      <FilterModule
        v-if="hasActiveControlls('filter')"
        v-masonry-tile
        :class="[(activeModule == 1 ? 'active' : '')]"
      />
      <EnvelopeModule 
        v-if="hasActiveControlls('envelope')"
        v-masonry-tile
        :class="[(activeModule == 2 ? 'active' : '')]"
      />
      <!-- <div v-for="n in 1" v-masonry-tile class="module empty"></div> -->
      <LfoModule
        v-if="hasActiveControlls('lfo')"
        v-masonry-tile
        :class="[(activeModule == 3 ? 'active' : '')]"
      />
      <DelayModule
        v-if="hasActiveControlls('delay')"
        v-masonry-tile
        :class="[(activeModule == 4 ? 'active' : '')]"
      />
      <!-- <div v-for="n in 1" v-masonry-tile class="module empty"></div> -->
      <ReverbModule
        v-if="hasActiveControlls('reverb')"
        v-masonry-tile
        :class="[(activeModule == 5 ? 'active' : '')]"
      />
      <!-- <div v-for="n in 1" v-masonry-tile class="module empty"></div> -->
    </div>
    <div class="tabs">
      <div @click="showOsc" class="tabs__tab tabs__osc">Osc</div>
      <div @click="showFil" class="tabs__tab tabs__filter">Fil</div>
      <div @click="showEnv" class="tabs__tab tabs__env">Env</div>
      <div @click="showLfo" class="tabs__tab tabs__lfo">Lfo</div>
      <div @click="showDel" class="tabs__tab tabs__delay">Del</div>
      <div @click="showRev" class="tabs__tab tabs__reverb">Rev</div>
    </div>
  </div>
</template>

<script>
import {VueMasonryPlugin} from 'vue-masonry';
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
    hasActiveControlls (moduleName) {
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
