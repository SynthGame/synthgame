<template>
  <div class="overlay" >
    <div class="overlay-content-wrapper">

        <h1>Tats</h1>
        <h2>A synthesizer game. Play it by ear.</h2>

      <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/O7x-AS6idOQ?rel=0?version=3&autoplay=1&controls=0&&showinfo=0&loop=1&playlist=O7x-AS6idOQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> -->
      <video width="380" autoplay loop muted>
        <source src="../../src/assets/intro.mp4" type="video/mp4">
      </video>
      <div>
        <button class="button-next" @click="$emit('startPreview')">Play game</button>
        <button class="button-next" @click="$emit('create')">Make a melody</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'startscreen',
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    window.addEventListener('keydown', this.emitOnKey)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.emitOnKey)
  },
  methods: {
    emitOnKey() {
      if (event.keyCode === 13) {
        this.$emit('startPreview');
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
