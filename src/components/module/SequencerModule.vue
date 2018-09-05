<template>
  <div class="main">
    <span style="display: inline-block;" v-for="i in 16" :key="i">
      <sequencer-button/>
      <div style="opacity: 0.7;">{{i}}</div>
    </span>
  </div>
</template>

<script>
import SequencerButton from './SequencerModule/SequencerButton.vue'

export default {
  name: 'SequencerModule',
  components: {
    SequencerButton
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
.main {
  width: 100%;
  height: 480px;
}
</style>