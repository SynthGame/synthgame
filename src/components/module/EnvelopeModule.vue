<template>
  <div class="module">
    <div class="display" style="margin: auto;" ref="filterDisplay">
      <svg :width="displayWidth" :height="displayHeight">
        <rect fill="#e4e259" :width="displayWidth" :height="displayHeight" />

        <path stroke="black"
              stroke-width="3"
              :d="envelopePath"
              fill="black"
              style="fill-rule: nozero"
              />

        <text x="45%" y="40%" fill="blue">
          <tspan x="45%" y="50%">A: {{attack}}</tspan>
          <tspan x="45%" y="60%">D: {{decay}}</tspan>
          <tspan x="45%" y="70%">S: {{sustain}}</tspan>
          <tspan x="45%" y="80%">R: {{release}}</tspan>
        </text>
      </svg>

    </div>
    <circle-slider
      v-model="attack"
      :min="0"
      :max="100"
      knobColor="#e4e259"
      name="Attack"
    ></circle-slider>
    <circle-slider
      v-model="decay"
      :min="0"
      :max="100"
      knobColor="#e4e259"
      name="Decay"
    ></circle-slider>
    <circle-slider
      v-model="sustain"
      :min="0.01"
      :max="100"
      knobColor="#e4e259"
      name="Sustain"
    ></circle-slider>
    <circle-slider
      v-model="release"
      :min="0"
      :max="100"
      knobColor="#e4e259"
      name="Release"
    ></circle-slider>
  </div>
</template>

<script>
import audio from '@/audio'
import CircleSlider from '@/components/knob.vue'

export default {
  name: 'EnvelopeModule',
  props: {
    msg: String
  },
  data () {
    return {
      attack: 0.11,
      decay: 0.21,
      sustain: 0.09,
      release: 1.2,
      envelope: {},
      displayHeight: 300,
      displayWidth: 600
    }
  },
  components: {
    CircleSlider,
  },
  created () {
    this.envelope = audio.envelope.state.device

    // audio.synth.state.synth.disconnect()
    // audio.synth.state.synth.connect(this.filter)
    // audio.connectChanelToMaster(this.filter)
  },
  mounted () {
    console.log('envelope: mounted!')

    // update dimentions:
    this.displayHeight = this.$refs.filterDisplay.clientHeight
    this.displayWidth = this.$refs.filterDisplay.clientWidth
  },
  computed: {
    envelopePath() {
    // helpers:
      let fourthOfWidth = this.displayWidth/4

      const attackXPosition = (this.attack/100)*fourthOfWidth;
      const attackYPosition = this.displayHeight*0.75;
      const decayXPosition = (this.decay/100)*fourthOfWidth;

      // the vertical decay position shall include a fix stopping it
      // from going all the way down (5% height) to perserve release indication:
      const decayYPosition = (1-(this.sustain/100))*(attackYPosition)-(1-(this.sustain/100))*(attackYPosition)*0.05;
      // no sustain, as it basically a horizontal line
      // release is known and shall be market with absolute position

      let line;
      line = 'M 0, '+ this.displayHeight +
             ' l ' + attackXPosition + ', ' + (-attackYPosition) + ' ' +
             ' l ' + decayXPosition + ', ' + decayYPosition+ ' ' +
             // a horizontal line representing sustain level including a fix regarding adding the release:
             ' h ' + (this.displayWidth - attackXPosition-decayXPosition-((1-(this.release/100))*fourthOfWidth)) +
             // release end position:
             ' L ' + this.displayWidth + ', ' + this.displayHeight + ' ' +
             ' Z'
      return line
    }
  },
  watch: {

    // watchers gave away warnings:

    attack (val) {
      // this might be abstracted away
      this.envelope.attack = val / 2
    },
    decay (val) {
      // this might be abstracted away
      this.envelope.decay = val / 20
    },
    sustain (val) {
      // this might be abstracted away
      this.envelope.sustain = val / 100
    },
    release (val) {
      // this might be abstracted away
      this.envelope.release = val / 20
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

svg.display {
    fill: #e4e259;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
