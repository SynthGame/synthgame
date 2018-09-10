<template>
  <nav class="main">
    <h2 class="game_title">Tats
    <span class="main__level">Level {{gameLevel + 1}}</span>
    <span :class="{
                'module__name__status-indicator': true,
                'module__name__status-indicator--active': oscillatorComplete
              }"
      :style="{
                'background-color': oscillatorComplete ? oscillatorColor : '',
                'box-shadow': oscillatorComplete ? `0px 0px 16px ${oscillatorColor}` : '',

              }"
    ></span>
    <span :class="{
            'module__name__status-indicator': true,
            'module__name__status-indicator--active': filterComplete
          }"
          :style="{
            'background-color': filterComplete ? filterColor : '',
            'box-shadow': filterComplete ? `0px 0px 16px ${filterColor}` : '',
          }"
    ></span>
        <span :class="{
            'module__name__status-indicator': true,
            'module__name__status-indicator--active': envelopeComplete
          }"
          :style="{
            'background-color': envelopeComplete ? envelopeColor : '',
            'box-shadow': envelopeComplete ? `0px 0px 16px ${envelopeColor}` : '',
          }"
    ></span>
            <span :class="{
            'module__name__status-indicator': true,
            'module__name__status-indicator--active': lfoComplete
          }"
          :style="{
            'background-color': lfoComplete ? lfoColor : '',
            'box-shadow': lfoComplete ? `0px 0px 16px ${lfoColor}` : '',
          }"
    ></span>
            <span :class="{
            'module__name__status-indicator': true,
            'module__name__status-indicator--active': delayComplete
          }"
          :style="{
            'background-color': delayComplete ? delayColor : '',
            'box-shadow': delayComplete ? `0px 0px 16px ${delayColor}` : '',
          }"
    ></span>
            <span :class="{
            'module__name__status-indicator': true,
            'module__name__status-indicator--active': reverbComplete
          }"
          :style="{
            'background-color': reverbComplete ? reverbColor : '',
            'box-shadow': reverbComplete ? `0px 0px 16px ${reverbColor}` : '',
          }"
    ></span>
    </h2>
    <span v-if="timerIsRunning === false && createModeIsActive === false" class="timer">First listen to the sound we'll recreate</span>
    <span v-else-if="timerIsRunning === true && createModeIsActive === false" class="timer">Now recreate the sound! Time left: {{paddedTimeLeftString}}</span>
    <span>•</span>
  </nav>
</template>

<script>
import { MODULE_OSCILLATOR_COLOR, MODULE_ENVELOPE_COLOR, MODULE_FILTER_COLOR, MODULE_DELAY_COLOR, MODULE_REVERB_COLOR, MODULE_LFO_COLOR} from '@/constants'
import padStart from 'lodash/padStart'

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
    timerIsRunning () {
      return this.$store.state.gameState.timerIsRunning
    },
    createModeIsActive () {
      return this.$store.state.gameState.createModeIsActive
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
    },
    gameLevel () {
      return this.$store.state.gameState.level
    },
    paddedTimeLeftString () {
      return `00:${padStart(this.timeLeftSeconds, 2, '0')}`
    }
  },
  methods: {
    startTimer () {
      this.timeLeftSeconds = 30
      this.timer = this.timer || window.setInterval(() => {
        if(this.timeLeftSeconds === 0) return this.timeIsUp()
        this.timeLeftSeconds--
      }, 1000)
    },
    stopTimer () {
      window.clearInterval(this.timer)
      this.timer = null
      this.$store.commit('addValueToScore', this.timeLeftSeconds);
      if (this.$store.state.gameState.score > this.$store.state.gameState.highScore) {
          this.$store.commit('updateHighScore', this.$store.state.gameState.score)
      }
    },
    timeIsUp () {
      // alert('game\'s over')
      this.stopTimer()
      this.$store.dispatch('gameOver')
      // this.startTimer()
    }
  },
  watch: {
    timerIsRunning (val) {
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
 padding: 0 2%;
 height: 8vh;
 font-size: 1rem;
 display: flex;
 flex-direction: row;
justify-content: center;
align-items: center;
background: black;
// border: 1px solid white;
 align-items: center;
 justify-content: space-between;
 &__level {
   font-weight: 300;
   margin-left: 1em;
 }
}
.game_title {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1em;
}
.timer {
  display: flex;
  font-size: 2em;
}

.module__name__status-indicator {
  display: inline-block;
  margin-left: .8em;
  width: 11px;
  height: 11px;
  border-radius: 100%;
  transition: 0.5s;
 border: 1px solid white;

  &--active {
    border: none;
    transition: 0.5s;
 border: 1px solid white;

  }
}
</style>
