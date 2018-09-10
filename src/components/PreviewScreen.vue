<template>
  <div class="startscreen" @keydown.space="$emit('startLevel')">
    <div class="startscreen-content-wrapper">
      <div>
        <h1>Listen closely</h1>
        <h2>This is the sound we're looking for. You have 30 seconds to create it.</h2>
        <!-- <h2>Listen closely to the sound, hit randomize, and re-create the sound you're hearing now.</h2> -->
      </div>
      <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/O7x-AS6idOQ?rel=0?version=3&autoplay=1&controls=0&&showinfo=0&loop=1&playlist=O7x-AS6idOQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> -->
      <!-- <video width="480" autoplay loop muted>
        <source src="../../src/assets/intro.mp4" type="video/mp4">
      </video> -->
      <div>
        <button class="button-next" @click="$emit('startLevel')">Ready</button>
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
    window.addEventListener('keyup', this.emitOnKey)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.emitOnKey)
  },
  methods: {
    emitOnKey() {
      if (event.keyCode === 13) {
        this.$emit('start');
      }
    }
  }
}
</script>

<style scoped lang="scss">
.startscreen {
  position: fixed;
  display: flex;
  align-content: center;
  justify-content: center;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .90);
  transition: opacity .3s ease;
  fill: none;
  stroke: red;
  stroke-width: 3;
  & h1 {
    text-transform: uppercase;
  }
  & h2 {
    font-weight: 300;
    font-size: 3em;
    max-width: 13em;
  }
}

.startscreen-content-wrapper {
  padding: 1rem;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  align-content: center;
}

.button-next {
    background: #ff8574;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 2em;
    font-weight: 900;
    color: inherit;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    padding: .8rem 1.4rem;
    border: none;
    margin: 5px;
}
</style>
