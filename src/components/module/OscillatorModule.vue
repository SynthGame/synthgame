<template>
  <div class="module">
    <display class="display"
             module="oscillator"
             fill="#ff8574"
             :knobs="[{name: 'Octave', min: 0, max: 7, value: this.frequency},
                      {name: 'Detune', min: -120, max: 120, value: this.detune},
                      {name: 'Phase', min: 50, max: 10000, value: this.phase},
                      {name: 'Waveform', min: 0, max:3, value: this.typeOsc},
                    ]"
             />
    <circle-slider
      v-model="frequency"
      :min="0"
      :max="7"
      knobColor="#ff8574"
      name="Octave"
    ></circle-slider>
    <circle-slider
      v-model="detune"
      :min="0"
      :max="120"
      knobColor="#ff8574"
      name="Detune"
    ></circle-slider>
    <!-- <circle-slider
      v-model="phase"
      :min="50"
      :max="10000"
      knobColor="#ff8574"
      name="Phase"
    ></circle-slider> -->
    <circle-slider
      v-model="typeOsc"
      :min="0"
      :max="3"
      knobColor="#ff8574"
      name="Waveform"
    ></circle-slider>
  </div>
</template>

<script>
import { vuexSyncGen } from '@/utils'

import audio from '@/audio'
import CircleSlider from '@/components/knob.vue'
import display from '@/components/display.vue'

var self

export default {
  name: 'OscillatorModule',
  props: {
    msg: String
  },
  data () {
    return {
      typeArray: [
        'sine',
        'square',
        'sawtooth',
        'triangle'
      ],
      freqArray: [
        33, 65, 131, 262, 523, 1047, 2093, 4186
      ],
      oscillator: {}
    }
  },
  components: {
    CircleSlider,
    display
  },
  created () {
    self = this
    this.oscillator = audio.oscillator.state.device
  },
  computed: {
    ...vuexSyncGen('oscillator', 'frequency', val => {
      self.oscillator.frequency.value = self.freqArray[val]
    }),
    ...vuexSyncGen('oscillator', 'typeOsc', val => {
      self.oscillator.type = self.typeArray[Math.round(val)]
      self.oscillator.stop()
      self.oscillator.start()
    }),
    ...vuexSyncGen('oscillator', 'phase', val => {
      self.oscillator.phase = val // phase in degrees
    }),
    ...vuexSyncGen('oscillator', 'detune', val => {
      self.oscillator.detune.value = (val * 2) - 120
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

svg.display {
    fill: #ff8574;
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
