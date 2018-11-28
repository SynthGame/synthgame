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
    <span class="module__name__sub-title" :style="{'color': moduleColor}"><slot name="subtitle"></slot></span>
  </div>
</template>

<script>
export default {
  name: "ModuleTitle",
  props: {
    indicatorActive: {
      type: Boolean,
      default: false
    },
    moduleColor: {
      type: String,
      default: "#FFFFFF"
    }
  },
  data: function() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.module__name {
  font-size: 0.9em;
  padding: 5% 10%;
  margin: 0;
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  &__title {
    h2 {
      margin: 0;
      font-size: 0.8rem;
    }
  }

  &__subtitle {
    h3 {
      font-size: 1rem;
      margin: 0 0 0 0.5em;
      font-weight: 300;
      line-height: 0.9em;
    }
  }

  &__status-indicator {
    display: inline-block;
    margin-left: 0.2em;
    height: 10px;
    width: 10px;
    border: 1px solid white;
    border-radius: 100%;

    &--active {
      // border: none;
      background: black;
    }
  }
}

h2 {
}

h3 {
  font-size: 1em;
  margin: 0 0 0 0.5em;
  font-weight: 300;
}
</style>
