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

    window.randomizeGoal = () => {
      this.$store.dispatch('randomizGoalParameters')
        .then(() => console.log('success'))
    }

    window.randomizeParams = () => {
      this.$store.dispatch('randomizeAudioParameters')
        .then(() => console.log('success'))
    }

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
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,900');

.module {
  height: 50%;
  width: 33.3%;
  padding: 1.5% 2%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  border: 1px solid #fff;
  position: relative;
  margin: 0;
  & .title {
    width: 96%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    text-transform: uppercase;
    letter-spacing: 2px;
    h2 {
      margin: 0;
      font-size: 1em;
      &:after {
        content: '';
        display: inline-block;
        margin-left: .2em;
        width: 10px;
        height: 10px;
        border: 1px solid white;
        border-radius: 100%;
      }
    }
    h3 {
      font-size: 1em;
      margin: 0 0 0 .5em;
      font-weight: 300;
    }
  }
  &:before {
    content:'';
    display: block;
    position: absolute;
    background: white;
    width: .5em;
    height: .5em;
    border-radius: 100%;
    top: 4%;
    left: 4%;
  }
  &:after {
    content:'';
    display: block;
    position: absolute;
    background: white;
    width: .5em;
    height: .5em;
    border-radius: 100%;
    top: 4%;
    right: 4%;
  }
  & .display {
    margin: 0 2%;
    height: 35%;
    width: 95%;
    & path {
      transition: .1s all ease-out;
    }
    &:before {
      content:'';
      display: block;
      position: absolute;
      background: white;
      width: .5em;
      height: .5em;
      border-radius: 100%;
      bottom: 4%;
      left: 4%;
    }
    &:after {
      content:'';
      display: block;
      position: absolute;
      background: white;
      width: .5em;
      height: .5em;
      border-radius: 100%;
      bottom: 4%;
      right: 4%;
    }
  }
  & .knobs {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

.level {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width:100%;
  height:100vh;
}

body {
  background: black;
  margin: 0;
}

#app {
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

* {
  box-sizing: border-box;
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
