<template>
  <div class="overlay">
    <div class="overlay-content-wrapper">

        <h1>Level {{gameLevel}}</h1>
        <h2 v-html="gameLevelText"></h2>
        <!-- <h2>Listen closely to the sound, hit randomize, and re-create the sound you're hearing now.</h2> -->

      <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/O7x-AS6idOQ?rel=0?version=3&autoplay=1&controls=0&&showinfo=0&loop=1&playlist=O7x-AS6idOQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> -->
      <!-- <video width="480" autoplay loop muted>
        <source src="../../src/assets/intro.mp4" type="video/mp4">
      </video> -->
      <div>
        <button class="button-next" @click="$emit('startLevel')">Play Level</button>
        <button v-if="gameLevel > 7" class="button-next" @click="$emit('create')">Make music</button>
      </div>
    </div>
  </div>
</template>

<script>
import levels from "@/levels";

export default {
  name: "startscreen",
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    window.addEventListener("keydown", this.emitOnKey);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.emitOnKey);
  },
  methods: {
    emitOnKey() {
      if (event.keyCode === 13) {
        this.$emit("startLevel");
      }
    }
  },
  computed: {
    gameLevel() {
      return this.$store.getters.displayedLevel;
    },
    gameLevelText() {
      if (this.$store.state.gameState.level >= levels.length)
        return levels[levels.length - 1].levelData.text || "";
      return levels[this.$store.state.gameState.level].levelData.text || "";
    }
  }
};
</script>

<style scoped lang="scss">
</style>
