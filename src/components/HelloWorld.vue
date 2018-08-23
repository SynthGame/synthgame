<template>
  <div class="hello">
  <svg width="531px" height="549px" viewBox="0 0 531 549" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch -->
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="knob_1-01" transform="translate(3.000000, 3.000000)">
              <path d="M209.3,518.9 C195.5,516.2 181.9,512.3 168.7,507.4 C138.6,496.1 110.5,479 86.2,457.1 C37.5,413.6 5.3,349.4 1,280.8 C-1.1,246.6 3.3,211.4 14.9,178.2 C26.6,145 44.8,113.7 69,87.2 C93.2,60.7 123,39 156.3,24.1 C189.5,9.1 226.1,1.2 262.7,0.5 C299.3,-9.43689571e-16 336.3,7.5 369.8,22.4 C403.4,37.2 433.1,59.7 457,86.6 C480.7,113.7 498.7,145.2 509.9,178.5 C521.1,211.8 526,246.7 524.3,280.9 L521.7,306.4 C520.2,314.8 518.3,323.1 516.6,331.4 C514.4,339.6 511.5,347.6 508.9,355.6 C505.8,363.5 502.2,371.1 498.9,378.8 C484,408.9 463.1,435.4 438.4,456.7 C402.5,487.9 359.4,508.7 314,518.1 M309.6,516.3 C324.1,513.2 339.6,505.3 353.1,499.2 C381.4,486.6 406.3,467.3 426.3,444.4 C446,421.3 460.8,394.5 469.8,366.6 C478.9,338.6 482.6,309.4 480.9,280.8 L478.5,259.5 C477.1,252.5 475.5,245.6 474,238.7 C472.1,231.9 469.5,225.3 467.4,218.6 C464.8,212.1 461.6,205.8 458.8,199.5 C446,174.7 428.4,153 407.7,135.7 C366.2,100.9 314.9,82.4 262.6,81.2 C210.2,80 157.4,99 116.8,135 C76,170.7 48.7,223.4 44.2,280.8 C42.1,309.4 45.4,338.9 54.8,366.9 C64.3,394.8 79.3,421.3 99.5,443.9 C119.7,466.4 144.2,487.5 172.1,500.3 C185.4,506.4 200.8,513.8 215.3,516.5" id="Shape" stroke="#3C32FF" stroke-width="5.796"></path>
              <!-- <circle id="Oval" fill="#171A3D" fill-rule="nonzero" cx="262.6" cy="288.4" r="153.2"></circle> -->
              <polyline id="Shape" stroke="#3C32FF" stroke-width="5.796" points="332.4 467.7 307 517.5 310.6 519.3 356.7 542.9"></polyline>
              <polyline id="Shape" stroke="#3C32FF" stroke-width="5.796" points="191.3 467.7 216.8 517.5 213.1 519.3 167 542.9"></polyline>
              <!-- <circle id="Oval" stroke="#FFFFFF" stroke-width="5.796" fill="#3C32FF" fill-rule="nonzero" cx="262.6" cy="288.4" r="113.4"></circle> -->
              <!-- <path d="M262.6,288.4 L262.6,81.2" id="Shape" stroke="#FFFFFF" stroke-width="5.796"></path> -->
              <!-- <circle id="Oval" stroke="#FFFFFF" stroke-width="5.796" fill="#3C32FF" fill-rule="nonzero" cx="261.6" cy="99.7" r="35.7"></circle> -->
          </g>
      </g>
  </svg>
    <circle-slider
            v-model="cutOffFreq"
            :min="50"
            :max="3000"
            :side="150"
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
      filter: {}
    }
  },
  components: {
    'rotary': VueCircleSlider
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
