<template>
  <button @click="$emit('click', $event)" class="sequencer-button">
    <div style="height: 100%; width: 100%;">
      <div :class="{
        'sequencer-button__indicator': true,
        'sequencer-button__indicator--active': buttonActive,
        'sequencer-button__indicator--selected': buttonSelected
      }"></div>
    </div>
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
$main-seq-color: #F40056;

.sequencer-button {
  height: 8em;
  width: 4em;
  display: inline-flex;
  margin: 10px 5px;
  padding: 0;
  border: 2px solid $main-seq-color;
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
      background-color: $main-seq-color;
    }

    &--active {
      background-color: white;
    }
  }
}
</style>
