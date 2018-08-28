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
    audio.init()
    // create loop wich sequences 4 notes
    const loop = audio.setMainLoop({
      noteArray: ['C4', 'E4', 'G4', 'A4'], // ['c4']
      subdivision: '1n'
    }, (time, note) => {
      audio.envelope.playNote(note)
    })
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
  height: calc(50% );
  width: calc(27.3% - .1em);
  padding: 0 3%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border: 1px solid #fff;
  margin: 0;
}

.level {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width:100%;
  height:100vh;
}

.display {
  margin: 10%;
  background: #141414;
  height:30%;
  width:80%;
}

body {
  background: black;
  margin: 0;
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
