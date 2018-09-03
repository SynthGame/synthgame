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
import { SYNTH_BPM } from '@/constants'

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
      subdivision: '4n'
    }, (time, note) => {
      audio.envelope.playNote("'" + note +"'")
    })
    // set BPM
    audio.setBpm(SYNTH_BPM)
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

.tabs {
  display: none;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 10vh;
  align-items: center;
  &__tab {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16.66%;
    border: .5px solid white;
    cursor: pointer;
    &:hover {
      background: white;
      color: black;
    }
  }
}

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
    justify-content: center;
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

@keyframes blink {
    from {opacity: 0}
    to {opacity: 1}
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

@media only screen and (max-width: 1000px) {
    .tabs {
      display: flex;
    }
    .module {
      width: 100vw;
      height: 90vh;
      position: absolute;
      opacity: 0;
    }
    .module.active {
      left: 0;
      opacity: 1;
    }
}
</style>
