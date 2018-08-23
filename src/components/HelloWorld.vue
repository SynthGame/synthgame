<template>
  <div class="hello">
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
import { synth, ToneInstance, connectToMaster } from '@/synth'
import VueCircleSlider from 'vue-circle-slider'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      highscores: [],
      cutOffFreq: 1000,
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

    this.filter = new ToneInstance
      .Filter(this.cutOffFreq, 'lowpass')

    synth.disconnect()
    synth.connect(this.filter)
    connectToMaster(this.filter)
  },
  watch: {
    cutOffFreq (val) {
      // this might be abstracted away
      this.filter.frequency.value = val
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
