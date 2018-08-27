<template>
  <div class="module">
    <display class="display" module="reverb"/>
    <circle-slider
      v-model="decay"
      :min="50"
      :max="10000"
      knobColor="#3c32ff"
      name="Time"
    ></circle-slider>
    <circle-slider
      v-model="preDelay"
      :min="50"
      :max="10000"
      knobColor="#3c32ff"
      name="Predelay"
    ></circle-slider>
    <circle-slider
      v-model="wet"
      :min="50"
      :max="10000"
      knobColor="#3c32ff"
      name="Dry/wet"
    ></circle-slider>
  </div>
</template>

<script>
import audio from '@/audio'
import CircleSlider from '@/components/knob.vue'
import display from '@/components/display.vue'

export default {
  name: 'ReverbModule',
  props: {
    msg: String
  },
  data () {
    return {
      decay: 1,
      mappedDecay: '4n',
      preDelay: 1,
      mappedPreDelay: '4n',
      wet: 0,
      reverb: {},
      sliderValue: 0
    }
  },
  components: {
    CircleSlider,
    display
  },
  created () {
    this.reverb = audio.reverb.state.device
    console.log(this.reverb)
  },
  watch: {
    mappedDecay (val) {
      audio.reverb.setParameter('decay', val)
    },
    mappedPreDelay (val) {
      audio.reverb.setParameter('preDelay', val)
    },
    wet (val) {
      audio.reverb.setParameter('wet', val, true) // third arg is setValueProp
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

svg.display {
    fill: #3c32ff;
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
