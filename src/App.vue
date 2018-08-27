<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
import audio from '@/audio'
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
    // initialize the synth
    audio.synth.init()
    // create loop wich sequences 4 notes
    const loop = audio.setMainLoop({
      noteArray: ['c4'], // ['C4', 'E4', 'G4', 'A4'],
      subdivision: '1n'
    }, (thing, note) => {
      audio.synth.playNote(note)
    })
    // connect the synth to the master output, kinda weird I know
    audio.connectChanelToMaster(audio.synth.state.synth)
    // set BPM
    audio.setBpm(c['BPM'])
    // start tone general
    audio.start()
    // start loop
    loop.start()

    // Pc keyboard listener (might be needed for mobile)
    document.addEventListener('keypress', (event) => {
      if (audio.state.Tone.context.state !== 'running') {
        audio.state.Tone.context.resume()
      }
      // const key = event.key
    })
  }
}
</script>

<style lang="scss">

.module {
  height: 100vh;
  width: 33.3%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.knob {
  &__bg {
    margin-bottom: -150px;
    overflow: visible;
  }
}

body {
  background: black;
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
