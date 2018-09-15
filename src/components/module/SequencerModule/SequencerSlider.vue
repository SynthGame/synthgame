<template>
  <span class="sequencer-slider">
    <input v-bind:value="value" v-on:input="$emit('input', $event.target.value)" type="range" :min="min" :max="max" orient="vertical">
  </span>
</template>

<script>
export default {
  name: 'SequencerSlider',
  props: {
    value: {
      type: Number,
      default: 50
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    buttonActive: {
      type: Boolean,
      default: false
    },
    buttonSelected: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$main-synth-color: #F40056;

.sequencer-slider {
  // transform-origin: 0 0;
  // transform: rotate(90deg);
  input {
    height: 100px;
    width: 45px;
    writing-mode: bt-lr; /* IE */
    -webkit-appearance: slider-vertical; /* WebKit */
  }
}
</style>
