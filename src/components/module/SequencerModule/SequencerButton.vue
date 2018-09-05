<template>
  <button @click="$emit('click', $event)" class="sequencer-button">
    <div :class="{
      'sequencer-button__indicator': true,
      'sequencer-button__indicator--active': buttonActive,
      'sequencer-button__indicator--selected': buttonSelected
    }"></div>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$main-synth-color: #F40056;

.sequencer-button {
  height: 100px;
  width: 45px;
  display: inline-flex;
  margin: 10px;
  padding: 0;
  border: 2px solid $main-synth-color;
  border-radius: 2px;
  background-color: unset;

  &:active {
    background-color: #292929;
  }

  &__indicator {
    height: 15px;
    width: 15px;
    margin: 10px auto;
    border: 2px solid white;
    border-radius: 50%;

    &--selected {
      background-color: $main-synth-color;
    }

    &--active {
      background-color: white;
    }
  }
}
</style>