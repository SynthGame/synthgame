<template>
  <div class="hello">
    <div style="margin: auto">
    <display :data="cutOffFreq"/></div>
    <circle-slider
            v-model="cutOffFreq"
            :min="50"
            :max="10000"
          ></circle-slider>
    <ul>
      <div v-for="score in highscores" :key="score.id">
        <strong>{{`🏆: ${score.name}: ${score.score}`}}</strong>
      </div>
    </ul>
  </div>
</template>

<script>
import audio from '@/audio'
import VueCircleSlider from 'vue-circle-slider'
import display from '@/components/display.vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      highscores: [], // remove this
      cutOffFreq: 350,
      typeArray: [
        'lowpass',
        'highpass',
        'bandpass'
      ],
      type: 0,
      Q: 1,
      gain: 0,
      filter: {},
      sliderValue: 0
    }
  },
  components: {
    'rotary': VueCircleSlider,
    'display': display
  },
  created () {
    // db stuff
    this.$root.db.collection('highscores').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(`🏆: ${doc.data().name}: ${doc.data().score}`)
          this.highscores.push({
            id: doc.id,
            name: doc.data().name,
            score: doc.data().score
          })
        })
      })
      .catch((err) => {
        console.log('Error getting documents', err)
      })

    this.filter = new audio.state.Tone
      .Filter(this.cutOffFreq, 'lowpass')

    audio.synth.state.synth.disconnect()
    audio.synth.state.synth.connect(this.filter)
    audio.connectChanelToMaster(this.filter)
  },
  watch: {
    cutOffFreq (val) {
      // this might be abstracted away
      this.filter.frequency.value = val
    },
    Q (val) {
      // this might be abstracted away
      this.filter.Q.value = val
    },
    gain (val) {
      // this might be abstracted away
      this.filter.gain.value = val
    },
    type (val) {
      // this might be abstracted away
      this.filter.type = this.typeArray[val]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

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
