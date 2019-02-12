<template>
<div class="screen screen_preview">
  <transition name="slideout">
    <div v-if="slide === 0" class="screen--header">
      <div class="screen--header-inner">
        <button @click="$emit('back')" class="btn btn_link btn_primary">
          <span class="btn--inner">
            <span class="btn--inner-text">
              < Back
            </span>
          </span>
        </button>
        <div class="screen--header-title">Osc 1 Pitch</div>
      </div>
    </div>
  </transition>
  <div class="screen--inner">
    <transition name="slide-up-slide-down">
      <div v-if="slide === 0" class="screen--preview">
        Listen to the goal sound and match the pitch of oscillator 1
      </div>
    </transition>
    <transition name="slide-up-slide-down">
      <div v-if="slide === 1" class="screen--preview">
        Listen to the goal sound and match the pitch of oscillator 1
      </div>
    </transition>
  </div>
  <div class="screen--footer">
    <div class="screen--footer-inner">
      <button
        @click="slide === 0 ? slide = 1 : $emit('startLevel')"
        class="btn btn_stroke btn_primary">
        <span class="btn--inner">
          <span class="btn--inner-text">Start</span>
        </span>
      </button>
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
  data() {
    return {
      slide: 0
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
