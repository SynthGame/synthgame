<template>
  <div class="overlay">
    <div class="overlay-content-wrapper">
        <h2>Copy this link and paste it on RedBull website to have a chance to win a flight and entry ticket for MASS!</h2>
        <span class="link">{{link}}</span>
      <div>
        <button class="button-next" @click="copy">{{copyButtonText}}</button>

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
  data () {
    return {
      copyButtonText: 'copy'
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
        this.$emit('closeCreate')
      }
    },
    copy () {
      const el = document.createElement('textarea')
      el.value = this.link
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.copyButtonText = 'copied!'
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">

.link {
  user-select: text;
  text-transform: none;
  background-color:  #fff;
  color: #000;
  font-size: 2rem;
  padding: 0.5rem;
}
</style>
