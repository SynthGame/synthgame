<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import * as synth from '@/synth.js'
import c from '@/constants'

export default {
  name: 'App',
  data () {
    return {

    }
  },
  methods: {
  },
  created () {
    // create loop wich sequences 4 notes
    const loop = synth.createLoop({
      noteArray: ['c4'], // ['C4', 'E4', 'G4', 'A4'],
      subdivision: '1n'
    }, (thing, note) => {
      synth.playNote(note)
    })

    // connect the synth to the master output, kinda weird I know
    synth.connectToMaster(synth.synth)
    // synth.masterOutput.toMaster()
    // set BPM
    synth.setBpm(c['BPM'])
    // start tone general
    synth.start()
    // start loop
    loop.start()

    setTimeout(() => synth.setSynthToneLength('1n'), 4000)

    // Pc keyboard listener (might be needed for mobile)
    document.addEventListener('keypress', (event) => {
      if (synth.ToneInstance.context.state !== 'running') {
        synth.ToneInstance.context.resume()
      }
      // const key = event.key
    })
  }
}
</script>

<style lang="scss">
path {
    display: none;
}

circle:first-of-type {
    r: 30;
}

circle:nth-of-type(2) {
    cursor: pointer;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
