<template>
<div class="button-set" :style="border" v-if="module==='oscillator'">
    <module-button color="#ff8574" label="sine" :value="selectedValue" name="shape" @change="changeOscillatorShape"/>
    <module-button color="#ff8574" label="square" :value="selectedValue" name="shape" @change="changeOscillatorShape"/>
    <module-button color="#ff8574" label="sawtooth" :value="selectedValue" name="shape" @change="changeOscillatorShape"/>
    <module-button color="#ff8574" label="triangle" :value="selectedValue" name="shape" @change="changeOscillatorShape"/>
</div>
<div v-else-if="module === 'lfo'" class="button-set">
    <module-button color="#5bd484" label="sine" :value="selectedValue" name="shape" @change="changeLFOShape"/>
    <module-button color="#5bd484" label="square" :value="selectedValue" name="shape" @change="changeLFOShape"/>
    <module-button color="#5bd484" label="sawtooth" :value="selectedValue" name="shape" @change="changeLFOShape"/>
    <module-button color="#5bd484" label="triangle" :value="selectedValue" name="shape" @change="changeLFOShape"/>
</div>
<div v-else-if="module === 'filter'" class="button-set">
    <module-button color="#6e01d1" label="lowpass" :value="selectedValue" name="shape" @change="changeFilterShape"/>
    <module-button color="#6e01d1" label="highpass" :value="selectedValue" name="shape" @change="changeFilterShape"/>
    <module-button color="#6e01d1" label="bandpass" :value="selectedValue" name="shape" @change="changeFilterShape"/>
</div>
<div v-else-if="module === 'router'" class="button-set">
    <module-button color="#fff" label="lowpass" :value="selectedValue" name="shape" @change="changeRoutingLfo"/>
    <module-button color="#fff" label="lowpass" :value="selectedValue" name="shape" @change="changeRoutingLfo"/>
    <module-button color="#fff" label="lowpass" :value="selectedValue" name="shape" @change="changeRoutingLfo"/>
    <module-button color="#fff" label="lowpass" :value="selectedValue" name="shape" @change="changeRoutingLfo"/>
</div>
</template>

<script>
import ModuleButton from '@/components/ModuleButton'

export default {
  name: 'ModuleButtons',
  props: {
    module: {
      type: String,
      default: 'oscillator'
    },
    color: {
      type: String,
      default: 'white'
    },
    buttons: {
      type: Array,
      default: () => ['sine', 'square', 'sawtooth', 'triangle']
    }
  },
  components: {
    ModuleButton
  },
  data () {
    return {
      selectedValue: null
    }
  },
  computed: {
    border () {
      return '1px ' + this.color + ' solid'
    }
  },
  methods: {
    changeOscillatorShape (newShape) {
      this.selectedValue = newShape
      this.$emit('oscShape', newShape)
    },
    changeFilterShape (newShape) {
      this.selectedValue = newShape
      this.$emit('filterShape', newShape)
    },
    changeLFOShape (newShape) {
      this.selectedValue = newShape
      this.$emit('lfoShape', newShape)
    },
    changeRoutingLfo (newConnection) {
      this.selectedValue = newConnection
      this.$emit('connection', newConnection)
    }
  }
}
</script>

<style scoped lang="scss">
.button-set {
  width:25%;
  min-width: 5em;
  min-height: 1.5rem;
  color: white;
  display: flex;
  flex-wrap: wrap;
  &__bg {
    margin-bottom: -150px;
    overflow: visible;
  }
  p {
     margin: .5em 0 0 0;
     font-size: .7em;
     text-transform: uppercase;
     letter-spacing: 1px;
  }
}
label {
  border: 1px white solid;
  justify-content: center;
  align-items: center;
  display: flex;
  min-width: 5rem;
  width: 20%;
  min-height: 2rem;
  cursor: pointer;
  margin: 0.5rem
}

.st0{fill:none;stroke:#FFFFFF;stroke-width:1.1844;stroke-miterlimit:10;}

</style>
