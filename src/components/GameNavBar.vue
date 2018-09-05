<template>
  <nav class="main">
    <span>•</span>
    <h2 class="game_title">Tats
    <span :class="{
                'module__name__status-indicator': true,
                'module__name__status-indicator--active': oscillatorComplete
              }"
      :style="{
                'background-color': oscillatorComplete ? oscillatorColor : '',
                'box-shadow': oscillatorComplete ? `0px 0px 16px ${oscillatorColor}` : '',
                'border': `1px solid ${oscillatorColor}`

              }"
    ></span>
    <span :class="{
            'module__name__status-indicator': true,
            'module__name__status-indicator--active': filterComplete
          }"
          :style="{
            'background-color': filterComplete ? filterColor : '',
            'box-shadow': filterComplete ? `0px 0px 16px ${filterColor}` : '',
                'border': `1px solid ${filterColor}`
          }"
    ></span>
        <span :class="{
            'module__name__status-indicator': true,
            'module__name__status-indicator--active': envelopeComplete
          }"
          :style="{
            'background-color': envelopeComplete ? envelopeColor : '',
            'box-shadow': envelopeComplete ? `0px 0px 16px ${envelopeColor}` : '',
            'border': `1px solid ${envelopeColor}`
          }"
    ></span>
            <span :class="{
            'module__name__status-indicator': true,
            'module__name__status-indicator--active': lfoComplete
          }"
          :style="{
            'background-color': lfoComplete ? lfoColor : '',
            'box-shadow': lfoComplete ? `0px 0px 16px ${lfoColor}` : '',
                'border': `1px solid ${lfoColor}`
          }"
    ></span>
            <span :class="{
            'module__name__status-indicator': true,
            'module__name__status-indicator--active': delayComplete
          }"
          :style="{
            'background-color': delayComplete ? delayColor : '',
            'box-shadow': delayComplete ? `0px 0px 16px ${delayColor}` : '',
            'border': `1px solid ${delayColor}`
          }"
    ></span>
            <span :class="{
            'module__name__status-indicator': true,
            'module__name__status-indicator--active': reverbComplete
          }"
          :style="{
            'background-color': reverbComplete ? reverbColor : '',
            'box-shadow': reverbComplete ? `0px 0px 16px ${reverbColor}` : '',
            'border': `1px solid ${reverbColor}`
          }"
    ></span>
    </h2>
    <span class="timer" @click="startTimer">00:{{timeLeftSeconds}}</span>
    <span>•</span>
  </nav>
</template>

<script>
import { MODULE_OSCILLATOR_COLOR, MODULE_ENVELOPE_COLOR, MODULE_FILTER_COLOR, MODULE_DELAY_COLOR, MODULE_REVERB_COLOR, MODULE_LFO_COLOR} from '@/constants'

export default {
  name: 'gameNavBar',
  data: function () {
    return {
      timeLeftSeconds: 30,
      timer: null,
      indicatorActive: true,
      oscillatorColor: MODULE_OSCILLATOR_COLOR,
      envelopeColor: MODULE_ENVELOPE_COLOR,
      filterColor: MODULE_FILTER_COLOR,
      lfoColor: MODULE_LFO_COLOR,
      delayColor: MODULE_DELAY_COLOR,
      reverbColor: MODULE_REVERB_COLOR
    }
  },
  created() {
    console.log(this.$store.state)
  },
  computed: {
    gameIsRunning () {
      return this.$store.state.gameState.gameIsRunning
    },
    oscillatorComplete() {
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin['oscillator']).every(param => param)
    },
    filterComplete() {
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin['filter']).every(param => param)
    },
        envelopeComplete() {
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin['envelope']).every(param => param)
    },
        lfoComplete() {
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin['lfo']).every(param => param)
    },
        delayComplete() {
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin['delay']).every(param => param)
    },
            reverbComplete() {
      return Object.values(this.$store.getters.audioParametersMatchGoalWithMargin['reverb']).every(param => param)
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
      this.$store.commit('addValueToScore', this.timeLeftSeconds);
      this.$store.commit('addValueToLevel', 1);
      if (this.$store.state.gameState.score > this.$store.state.gameState.highScore) {
          this.$store.commit('updateHighScore', this.$store.state.gameState.score);
      };
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
 align-items: center;
 justify-content: space-between
}
.game_title {
  text-transform: uppercase;
  letter-spacing: 2px;

}
.timer {
  display: flex;
}

.module__name__status-indicator {
  display: inline-block;
  margin-left: .2em;
  width: 11px;
  height: 11px;
  border-radius: 100%;
  transition: 0.5s;
  &--active {
    border: none;
    transition: 0.5s;
  }
}
</style>
