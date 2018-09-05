<template>
  <nav class="main">
    <span class="timer" @click="startTimer">00:{{timeLeftSeconds}}</span>
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
      this.$store.commit('updateModuleMargins', 1);
      this.timer = this.timer || window.setInterval(() => {
        if(this.timeLeftSeconds === 0) return this.timeIsUp()
        this.timeLeftSeconds--
      }, 1000)
    },
    stopTimer () {
      window.clearInterval(this.timer)
      this.timer = null
      this.$store.commit('addValueToScore', this.timeLeftSeconds);
      this.$store.commit('addValueToLevel', 1);
      if (this.$store.state.gameState.score > this.$store.state.gameState.highScore) {
          this.$store.commit('updateHighScore', this.$store.state.gameState.score);
      };
      this.timeLeftSeconds = 30
    },
    timeIsUp () {
      alert('gams over')
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
 height: 8vh;
 font-size: 2em;
 display: flex;
 flex-direction: row;
 justify-content: center;
 align-items: center;
 background: black;
 border: 1px solid white;
}
</style>
