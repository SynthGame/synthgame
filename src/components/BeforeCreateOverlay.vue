<template>
  <div class="overlay">
    <div class="overlay-content-wrapper">
        <h1>Make Music</h1>
        <h2>Write the music for this game. On nov 17, Tatsuya Takahashi picks 1 lucky winner, who wins a trip to the MESS foundation!</h2>
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
