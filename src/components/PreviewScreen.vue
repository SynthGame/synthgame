<template>
  <div class="startscreen">
    <div class="startscreen-content-wrapper">
      <div>
        <h1>Level {{gameLevel}}</h1>
        <h2>You have 30 seconds to recreate the sound playing now.</h2>
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
    window.addEventListener('keydown', this.emitOnKey)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.emitOnKey)
  },
  methods: {
    emitOnKey() {
      if (event.keyCode === 13) {
        this.$emit('startLevel');
      }
    }
  },
  computed: {
    gameLevel () {
      return this.$store.getters.displayedLevel
    },
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
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1em;
    color: inherit;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    padding: .8rem 1.4rem;
    border: none;
    margin: 5px;
    background: none;
    border: 1px solid #ff8574;
    transition: all .2s;
    &:hover {
      background: #ff8574;
    }
}
</style>
