<template>
  <div class="overlay">
    <div class="overlay-content-wrapper">
        <h2>Use the sequencer to make a melody. Hit "Submit" for a chance to win a prize!</h2>
      <div>
        <button class="button-next" @click="$emit('showCreate')">Ready</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'beforeCreate',
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  mounted () {
    window.addEventListener('keydown', this.emitOnKey)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.emitOnKey)
  },
  methods: {
    emitOnKey () {
      if (event.keyCode === 13) {
        this.$emit('showCreate')
      }
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">

</style>
