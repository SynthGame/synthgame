<template>
  <div class="overlay">
    <div class="overlay-content-wrapper">
        <h2>Copy this link and paste it on RedBull website to have a chance to win a flight and entry ticket for MASS!</h2>
        <span>{{link}}</span>
      <div>
        <button class="button-next" @click="$emit('closeCreate')">return</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'beforeCreate',
  props: {
    link: {
      type: String,
      default: 'a link'
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
        this.$emit('closeCreate');
      }
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">

</style>
