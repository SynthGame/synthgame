<template>
  <input class="sequencer-slider" type="range" min="1" max="100" value="50">
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$main-synth-color: #F40056;

.sequencer-slider {
  transform: rotate(90deg);
}
</style>