<template>
  <nav class="main">
    <span>•</span>
    <span class="timer" @click="startTimer">00:{{timeLeftSeconds}}</span>
    <span>•</span>
  </nav>
</template>

<script>
export default {
  name: 'gameNavBar',
  data: function () {
    return {
      timeLeftSeconds: 30,
      timer: null
    }
  },
  computed: {
    gameIsRunning () {
      return this.$store.state.gameState.gameIsRunning
    }
  },
  methods: {
    startTimer () {
      this.timer = this.timer || window.setInterval(() => {
        if(this.timeLeftSeconds === 0) return this.timeIsUp()
        this.timeLeftSeconds--
      }, 1000)
    },
    stopTimer () {
      window.clearInterval(this.timer)
      this.timer = null
      this.$store.commit('addValueToScore', this.timeLeftSeconds)
      this.timeLeftSeconds = 30
    },
    timeIsUp () {
      alert('game\'s over!')
      this.stopTimer()
    }
  },
  watch: {
    gameIsRunning (val) {
      if (val) return this.startTimer()
      this.stopTimer()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main {
 width: 100%;
 height: 40px;
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
}
</style>