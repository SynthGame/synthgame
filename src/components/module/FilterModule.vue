<template>
  <div class="module">
    <display fill="#6e01d1"
        module="filter"
        :knobs="[{name: 'type', min: 0, max: 2, value: this.type},
                  {name: 'frequency', min: 0, max: 20000, value: this.cutOffFreq},
                  {name: 'q', min: 0, max: 100, value: this.setQ},
                  {name: 'gain', min: 0, max: 100, value: this.gain}
                  ]"/>

    <rotary
            v-model="type"
            :min="0"
            :max="2"
            knobColor="#6e01d1"
            name="Type"
          ></rotary>
    <rotary
            v-model="cutOffFreq"
            :min="0"
            :max="20000"
            knobColor="#6e01d1"
            name="Frequency"
          ></rotary>

   <rotary
            v-model="setQ"
            :min="0"
            :max="100"
            knobColor="#6e01d1"
            name="Resonance"
          ></rotary>
    <!-- <rotary
            v-model="gain"
            :min="0"
            :max="100"
            knobColor="rgb(14, 80, 186)"
            name="Gain"
          ></rotary> -->
    <!-- <ul>
      <div v-for="score in highscores" :key="score.id">
        <strong>{{`🏆: ${score.name}: ${score.score}`}}</strong>
      </div>
    </ul> -->
  </div>

</template>

<script>
import { vuexSyncGen } from '@/utils'

import audio from '@/audio'
import VueCircleSlider from '@/components/knob.vue'
import display from '@/components/display'

var self

export default {
  name: 'FilterModule',
  props: {
    msg: String
  },
  data () {
    return {
      typeArray: [
        'lowpass',
        'highpass',
        'bandpass'
      ],
      filter: {},
      sliderValue: 0,
      displayHeight: 300,
      displayWidth: 600
    }
  },
  components: {
    'rotary': VueCircleSlider,
    display
  },
  created () {
    self = this
    this.filter = audio.filter.state.device
  },
  mounted () {
    console.log('filter: mounted!')
  },
  methods: {

  },
  computed: {
    ...vuexSyncGen('filter', 'cutOffFreq', val => {
      // self.filter.frequency.value = val
      self.filter.frequency.value = Math.pow(val, (val / 20000)) + 20
    }),
    ...vuexSyncGen('filter', 'type', val => {
      self.filter.type = self.typeArray[Math.round(val)]
    }),
    ...vuexSyncGen('filter', 'setQ', val => {
      self.filter.Q.value = val / 8
    }),
    ...vuexSyncGen('filter', 'gain', val => {
      self.filter.gain.value = val
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

svg.display {
    fill: #6e01d1;
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
