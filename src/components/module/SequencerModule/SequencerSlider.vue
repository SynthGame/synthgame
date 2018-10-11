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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$main-synth-color: #F40056;

span.sequencer-slider {
    min-height: 12em;
    display: flex;
    width: 100%;
    align-items: center;
    // background: rebeccapurple;
    position: relative;
    margin-bottom: -1em;
    margin-top: -.6em;
}

.sequencer-slider {
    &--selected {
      [type='range']::-webkit-slider-thumb {
        background: #F40056 !important;
        box-shadow: 0px 0px 16px #F40056 !important;
      }
    }
    &--active{
      [type='range']::-webkit-slider-thumb {
        background: white !important;
        box-shadow: 0px 0px 16px white !important;
      }
    }
  // transform-origin: 0 0;
  // transform: rotate(90deg);
  // input {
  //   height: 100px;
  //   width: 45px;
  //   writing-mode: bt-lr; /* IE */
  //   -webkit-appearance: slider-vertical; /* WebKit */
  // }

  // Styling Cross-Browser Compatible Range Inputs with Sass
// Github: https://github.com/darlanrod/input-range-sass
// Author: Darlan Rod https://github.com/darlanrod
// Version 1.5.1
// MIT License

$track-color: #F40056 !default;
$thumb-color: #000 !default;

$thumb-radius: 12px !default;
$thumb-height: 12px !default;
$thumb-width: 12px !default;
$thumb-shadow-size: 4px !default;
$thumb-shadow-blur: 4px !default;
$thumb-shadow-color: rgba(0, 0, 0, .2) !default;
$thumb-border-width: 1px !default;
$thumb-border-color: #fff !default;

$track-width: 9em !default;
$track-height: 1px !default;
$track-shadow-size: 1px !default;
$track-shadow-blur: 1px !default;
$track-shadow-color: rgba(0, 0, 0, .2) !default;
$track-border-width: 0px !default;
$track-border-color: #cfd8dc !default;

$track-radius: 5px !default;
$contrast: 5% !default;

$ie-bottom-track-color: darken($track-color, $contrast) !default;

@mixin shadow($shadow-size, $shadow-blur, $shadow-color) {
  box-shadow: $shadow-size $shadow-size $shadow-blur $shadow-color, 0 0 $shadow-size lighten($shadow-color, 5%);
}

@mixin track {
  cursor: default;
  height: $track-height;
  transition: all .2s ease;
  width: $track-width;
}

@mixin thumb($adjustment: 0) {
  @include shadow($thumb-shadow-size, $thumb-shadow-blur, $thumb-shadow-color);
  background: $thumb-color;
  border: $thumb-border-width solid $thumb-border-color;
  border-radius: $thumb-radius;
  cursor: default;
  height: $thumb-height + $adjustment;
  width: $thumb-width + $adjustment;
}

@mixin disabled {
  cursor: not-allowed;
}

[type='range'] {
  -webkit-appearance: none;
  background: transparent;
  margin: 0 0 0 -31px;
  width: $track-width;
  transform: rotate(-90deg);
  position: absolute;
  left:0;
  z-index: 2;

  &::-moz-focus-outer {
    border: 0;
  }

  &:focus {
    outline: 0;

    &::-webkit-slider-runnable-track {
      background: lighten($track-color, $contrast);
    }

    &::-ms-fill-lower {
      background: $track-color;
    }

    &::-ms-fill-upper {
      background: lighten($track-color, $contrast);
    }
  }

  &::-webkit-slider-runnable-track {
    @include track;
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius;
  }

  &::-webkit-slider-thumb {
    @include thumb;
    -webkit-appearance: none;
    cursor: grab;
    margin-top: -6px;
  }

  &::-moz-range-track {
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    @include track;
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius;
    height: $track-height / 2;
  }

  &::-moz-range-thumb {
    @include thumb(-4);
  }

  &::-ms-track {
    @include track;
    background: transparent;
    border-color: transparent;
    border-width: ($thumb-height / 2) 0;
    color: transparent;
  }

  &::-ms-fill-lower {
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    background: $ie-bottom-track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: ($track-radius * 2);
  }

  &::-ms-fill-upper {
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: ($track-radius * 2);
  }

  &::-ms-thumb {
    @include thumb(-4);
    margin-top: $track-height / 4;
  }

  &:disabled {
    &::-webkit-slider-thumb {
      @include disabled;
    }

    &::-moz-range-thumb {
      @include disabled;
    }

    &::-ms-thumb {
      @include disabled;
    }

    &::-webkit-slider-runnable-track {
      @include disabled;
    }

    &::-ms-fill-lower {
      @include disabled;
    }

    &::-ms-fill-upper {
      @include disabled;
    }
  }
}
}
</style>
