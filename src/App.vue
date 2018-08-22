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
import Tone from 'tone';

export default {
  name: 'App',
  data() {
    return {

    }
  },
  components: {
    Tone
  },
  methods: {
    clock(step) {
        if (this.text[step] !== undefined && this.text[step] !== ' ') {
          this.textBig = this.underlineWord(step,this.text);
          // this.text = this.upperCase(step,this.text);
          this.letterFunction(this.textBig[step]);
        }
    },
  created () {

    // Init.

    let self = this;

        // Start sequence

        var loop = new Tone.Sequence(function(time ,col) {self.clock(col)}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

        Tone.Transport.bpm.value = 110;
        Tone.Transport.start();
        loop.start();

        // Pc keyboard listener (might be needed for mobile)
        document.addEventListener('keypress', (event) => {
          if (Tone.context.state !== 'running') {
              Tone.context.resume();
          }
          const key = event.key;
        });

      }
    }
}
</script>

<style lang="scss">
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
