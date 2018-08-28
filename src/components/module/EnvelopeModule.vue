<template>
  <div class="module">

     <display fill="#e4e259"
              module="envelope"
              :knobs="[{name: 'attack', min: 1, max: 100, value: this.attack},
                       {name: 'decay', min: 1, max: 100, value: this.decay},
                       {name: 'sustain', min: 1, max: 100, value: this.sustain},
                       {name: 'release', min: 1, max: 100, value: this.release}
                       ]"/>
    <circle-slider
      v-model="attack"
      :min="0"
      :max="50"
      knobColor="#e4e259"
      name="Attack"
    ></circle-slider>
    <circle-slider
      v-model="decay"
      :min="0"
      :max="5"
      knobColor="#e4e259"
      name="Decay"
    ></circle-slider>
    <circle-slider
      v-model="sustain"
      :min="0"
      :max="1"
      knobColor="#e4e259"
      name="Sustain"
    ></circle-slider>
    <circle-slider
      v-model="release"
      :min="0"
      :max="5"
      knobColor="#e4e259"
      name="Release"
    ></circle-slider>
  </div>
</template>

<script>
import audio from '@/audio'
import CircleSlider from '@/components/knob.vue'
import display from '@/components/display'

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
    display
  },
  created () {
    this.envelope = audio.envelope.state.device

    // audio.synth.state.synth.disconnect()
    // audio.synth.state.synth.connect(this.filter)
    // audio.connectChanelToMaster(this.filter)
  },
  mounted () {
    console.log('envelope: mounted!')
  },
  computed: {

  },
  watch: {

    // watchers gave away warnings:

    attack (val) {
      // this might be abstracted away
      this.envelope.attack = val
    },
    decay (val) {
      // this might be abstracted away
      this.envelope.decay = val
    },
    sustain (val) {
      // this might be abstracted away
      this.envelope.sustain = val
    },
    release (val) {
      // this might be abstracted away
      this.envelope.release = val
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
