<template>
  <div class="overlay">
    <div class="overlay-content-wrapper">
        <h1>Thank you</h1>
        <h2>We'll notify you when we use your preset in game via Soundcloud DM. We'll reach out via email to the winner of the Mess foundation prize, on November 19, 2018.<br><br>Share this link on social media to show others what you've made, or to create presets together.</h2>
        <span class="link">{{link}}</span>
      <div>
        <button class="button-next" @click="copy">{{copyButtonText}}</button>

        <button class="button-next" @click="$emit('closeCreate')">Exit</button>
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

h2 {
  font-size: 2em;
  max-width: 30em;
  text-transform: none;
}

.link {
  user-select: text;
  text-transform: none;
  background-color:  #fff;
  color: #000;
  font-size: 2rem;
  padding: 0.5rem;
}
</style>
