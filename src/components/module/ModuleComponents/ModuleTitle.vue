<template>
  <div class="module__name">
    <span class="module__name__title"><slot name="title"></slot></span>
    <span
      :class="{
                'module__name__status-indicator': true,
                'module__name__status-indicator--active': indicatorActive
              }"
      :style="{
                'background-color': indicatorActive ? moduleColor : '',
                'box-shadow': indicatorActive ? `0px 0px 16px ${moduleColor}` : '',
                'animation': indicatorActive ? '.5s blink alternate infinite' : '',
              }"
    ></span>
    <span class="module__name__sub-title"><slot name="subtitle"></slot></span>
  </div>
</template>

<script>
export default {
  name: 'ModuleTitle',
  props: {
    indicatorActive: {
      type: Boolean,
      default: false
    },
    moduleColor: {
      type: String,
      default: '#FFFFFF'
    }
  },
  data: function () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .module__name {
    width: 96%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    text-transform: uppercase;
    letter-spacing: 2px;

    &__title {
      h2 {
        margin: 0;
        font-size: 1rem;
      }
    }

    &__subtitle {
      h3 {
        font-size: 1rem;
        margin: 0 0 0 .5em;
        font-weight: 300;
      }
    }

    &__status-indicator {
      display: inline-block;
      margin-left: .2em;
      width: 11px;
      height: 11px;
      border: 1px solid white;
      border-radius: 100%;

      &--active {
        border: none;
      }
    }
  }

  h2 {
  }

  h3 {
    font-size: 1em;
    margin: 0 0 0 .5em;
    font-weight: 300;
  }
</style>
