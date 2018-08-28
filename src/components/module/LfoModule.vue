<template>
  <div class="module">
  <display class="display" module="lfo"/>
    <circle-slider
      v-model="frequency"
      :min="1"
      :max="100"
      knobColor="#5bd484"
      name="Rate"
    ></circle-slider>
    <circle-slider
      v-model="amount"
      :min="0"
      :max="4000"
      knobColor="#5bd484"
      name="Amount"
    ></circle-slider>
    <circle-slider
      v-model="type"
      :min="0"
      :max="3"
      knobColor="#5bd484"
      name="Shape"
    ></circle-slider>
  </div>
</template>

<script>
import audio from '@/audio'
import CircleSlider from '@/components/knob.vue'
import display from '@/components/display.vue'

export default {
  name: 'LfoModule',
  props: {
    msg: String
  },
  data () {
    return {
      frequency: 10,
      typeArray: [
        'sine',
        'square',
        'sawtooth',
        'triangle'
      ],
      type: 0,
      amount: 4000,
      lfo: {}
    }
  },
  components: {
    CircleSlider,
    display
  },
  created () {
    this.lfo = audio.lfo.state.device

    // audio.synth.state.synth.disconnect()
    // audio.synth.state.synth.connect(this.filter)
    // audio.connectChanelToMaster(this.filter)
  },
  watch: {
    frequency (val) {
      // this might be abstracted away
      this.lfo.frequency.value = Math.round(Math.pow(val, (val/100)) - 120);
      console.log('this.lfo.frequency.value', this.lfo.frequency.value);
    },
    amount (val) {
      // this might be abstracted away
      this.lfo.max = val
    },
    type (val) {
      // this might be abstracted away
      this.lfo.type = this.typeArray[val];
      this.lfo.stop();
      this.lfo.start();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

svg.display {
    fill: #5bd484;
}

h3 {
  margin: 40px 0 0;
}
ul {
  margin-top: 5em;
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
