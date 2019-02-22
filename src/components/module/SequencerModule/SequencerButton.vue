<template>
  <button
    @keydown.enter="$emit('click', $event)"
    @mousedown="$emit('click', $event)"
    class="sequencer-button">
    <div :class="{
      'sequencer-button__indicator': true,
      'sequencer-button__indicator--active': buttonActive,
      'sequencer-button__indicator--selected': buttonSelected
    }" />
  </button>
</template>
<script>
export default {
  name: 'SequencerButton',
  props: {
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
    toggleOnOff (e) {
      if (mouseIsDown > 0) {
        this.$emit('click', e)
      }
    }
  }
}
</script>