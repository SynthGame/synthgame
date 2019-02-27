<template>
  <span :class="{
    'sequencer-slider': true,
    'sequencer-slider--active': buttonActive,
    'sequencer-slider--selected': buttonSelected
  }">
    <input v-bind:value="value" v-on:input="$emit('input', $event.target.value)" type="range" :min="min" :max="max" orient="vertical" >
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
