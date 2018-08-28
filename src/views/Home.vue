<template>
  <div class="level">
    <OscillatorModule />
    <FilterModule />
    <EnvelopeModule />
    <LfoModule />
    <DelayModule />
    <ReverbModule />
  </div>
</template>

<script>
// @ is an alias to /src
import OscillatorModule from '@/components/module/OscillatorModule.vue'
import EnvelopeModule from '@/components/module/EnvelopeModule.vue'
import FilterModule from '@/components/module/FilterModule.vue'
import LfoModule from '@/components/module/LfoModule.vue'
import DelayModule from '@/components/module/DelayModule.vue'
import ReverbModule from '@/components/module/ReverbModule.vue'

export default {
  name: 'home',
  components: {
    OscillatorModule,
    EnvelopeModule,
    FilterModule,
    LfoModule,
    DelayModule,
    ReverbModule,
  }
}
</script>
