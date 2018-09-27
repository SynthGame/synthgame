<template>
  <div class="overlay">
    <div class="overlay-content-wrapper">
        <h1 v-if="!customLevelIsActive">Make music</h1>
        <h1 v-if="customLevelIsActive">Tats<span v-if="customAuthor !== null"> ft. {{customAuthor}}</span></h1>
        <!-- <h2 v-if="!customLevelIsActive">Write the music for this game. On nov 17, Tatsuya Takahashi picks 1 lucky winner, who wins a trip to the MESS foundation!</h2> -->
        <h2>Create and share presets. The most played presets get integrated in the official Tats game.</h2>
      <div>
        <button class="button-next" @click="$emit('showCreate')">Ready</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getPresetById } from '@/db'

export default {
  name: 'beforeCreate',
  data () {
    return {
      customLevelIsActive: false,
      customAuthor: null
    }
  },
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  created () {
    // var ogs = require('open-graph-scraper');
    // var options = {'url': 'https://soundcloud.com/bart-proost'};
    // ogs(options, function (error, results) {
    //   console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
    //   console.log('results:', results);
    // });
    if (this.$route.query.preset) {
      getPresetById(this.$route.query.preset)
        .then(data => {
          this.customLevelIsActive = true
          this.customAuthor = data.name
          // this.startPreset(data.parameterValues)
          // this.customLevelCreator = data.name
        })
    }
  },
  mounted () {
    window.addEventListener('keydown', this.emitOnKey)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.emitOnKey)
  },
  methods: {
    emitOnKey () {
      if (event.keyCode === 13) {
        this.$emit('showCreate')
      }
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">

</style>
