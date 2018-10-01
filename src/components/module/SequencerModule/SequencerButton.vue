<template>
  <!-- button with mouseover listener -->
  <!-- <button
  @mousedown="$emit('click', $event)"
  @mouseover="toggleOnOff($event)"
  class="sequencer-button">
    <div class="sequencer-button__content">
      <div :class="{
        'sequencer-button__indicator': true,
        'sequencer-button__indicator--active': buttonActive,
        'sequencer-button__indicator--selected': buttonSelected
      }"></div>
    </div>
  </button> -->
  <button
  @mousedown="$emit('click', $event)"
  class="sequencer-button">
    <div class="sequencer-button__content">
      <div :class="{
        'sequencer-button__indicator': true,
        'sequencer-button__indicator--active': buttonActive,
        'sequencer-button__indicator--selected': buttonSelected
      }"></div>
    </div>
  </button>
</template>

<script>
// let mouseIsDown = 0;
// document.body.onmousedown = function() {
//   mouseIsDown = mouseIsDown + 1;
// }
// document.body.onmouseup = function() {
//   mouseIsDown = mouseIsDown - 1;
// }

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$main-seq-color: #F40056;

.sequencer-button {
  height: 8em;
  width: 100%;
  display: flex;
  margin: 10px 5px;
  padding: 0;
  border: 1px solid $main-seq-color;
  border-radius: 2px;
  background-color: unset;

  &__content {
    width: 100%;
    margin-top: -3.6em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  &:active {
    background-color: #292929;
  }

  &__indicator {
    height: 15px;
    width: 15px;
    margin: 0 auto;
    border: 1px solid white;
    border-radius: 50%;

    &--selected {
      background-color: $main-seq-color;
      box-shadow: 0px 0px 16px $main-seq-color;
    }

    &--active {
      background-color: white;
      box-shadow: 0px 0px 16px white;
    }
  }
}
</style>
