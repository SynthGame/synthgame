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
        if(this.timeLeftSeconds === 0) return this.timerIsDone()
        this.timeLeftSeconds--
      }, 1000)
    },
    timerIsDone () {
      window.clearInterval(this.timer)
      this.timeLeftSeconds = 30
      alert('time\'s up!')
    }
  },
  watch: {
    gameIsRunning (val) {
      if (val) this.startTimer()
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