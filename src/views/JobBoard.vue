<template>
  <div class="casestudy">

    <!-- Navbar -->
    <div class="navbar">
      <a href="https://okbye.io" target="_blank"><span class="logo"></span><span class="bye">Ok Bye</span></a>
      <div class="points">

        <span>Perks</span>
        0
        <!-- Perks content -->
        <div class="perks__content">
            <div class="perk">
              <img src="../assets/villa.jpg" alt="Ok Bye house">
              <span>Night in Ok Bye Bali</span>
              <span>-1</span>
              <button type="button" name="button">Redeem</button>
            </div>
            <div class="perk">
              <img src="../assets/hand.svg" alt="Ok Bye house">
              <span>NI Maschine 3</span>
              <span>-5</span>
              <button type="button" name="button">Redeem</button>
            </div>
        </div>
      </div>
    </div>

    <!-- Title section -->
    <!-- <h3>Makers only</h3> -->
    <h1>Ok Bye</h1>
    <h2>Makers collaborate for perks</h2>

    <router-link to="#hire"><button type="button" name="button" @click="">Post a job</button></router-link>
    <span style="display:block; margin-top: 0.5em;">#1 is on us</span>

    <div class="board">
      <div class="job__legend">
        <span>Idea</span>
        <span>Client</span>
        <span>Spots</span>
        <span>Joined</span>
        <span>Following</span>
      </div>

      <div class="job">
        <span><h3>HTML5 planet game</h3></span>
        <span>Red Bull</span>
        <span>2</span>
        <span>oo</span>
        <span>ooo + 15</span>
      </div>

      <div class="job">
        <span><h3>VR online profile scanner</h3></span>
        <span><button type="button" name="button">Apply</button></span>
        <span>9</span>
        <span>ooo</span>
        <span>ooo</span>
      </div>

      <div class="job">
        <span><h3>HTML5 synth game</h3></span>
        <span>Red Bull</span>
        <span>6</span>
        <span>oooooo</span>
        <span>ooo + 31</span>
      </div>

      <div class="job">
        <span><h3><button type="button" name="button">Submit</button></h3></span>
        <span>Native Instruments</span>
        <span>9</span>
        <span>ooo</span>
        <span>ooo</span>
      </div>

    </div>


    <!-- Briefing -->
    <!-- <div class="part">
      <div class="text">
        <h3 class="left">Tatsuya's brief</h3>
        <h4>A <span>playful</span> mix between <span>modular synthesizers</span> and <span>what’s possible</span> with the web.</h4>
      </div>
      <div class="visuals">
        <div class="photo">

<iframe width="560" height="315" class="video" src="https://www.youtube.com/embed/Pb66lIcYaPI?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

          <p>Tatsuya Takahashi was looking for web audio experts.</p>
        </div>

      </div>
    </div> -->

    <!-- call -->
    <div class="part" id="hire">
      <div class="text">
        <h3 class="left">We're available</h3>
        <h4>First one is <span>on us</span>. Not just the listing; <span>the actual job</span>.</h4>
      </div>
      <button><a class="typeform-share button" href="https://newindie.typeform.com/to/paL3er" data-mode="popup" style="display:inline-block;" data-submit-close-delay="5" target="_blank">Post a job</a></button>
    </div>


        <!-- Social proof -->
        <div class="client-bar">
          <div class="client">
            <span>Clients</span>
            <div class="logos">
              <img src="../assets/red-bull-brand-logo.png" alt="Red Bull">
            </div>
          </div>
          <div class="used-technology">
            <span>Members</span>
            <p>6</p>
          </div>
          <div class="rate">
            <span>Rate</span>
            <p>$20</p>
          </div>
          <div class="time-frame">
            <span>Projects take</span>
            <p>1 month</p>
          </div>
        </div>

    <!-- Why Ok Bye -->
    <div class="part">
      <div class="visuals">
        <div class="photo">
          <img src="../assets/team.jpg" alt="The Ok Bye house">
          <p>We work remotely or from the Ok Bye house, on jobs we pick ourselves.</p>
        </div>

      </div>
      <div class="text">
        <h3 class="right">Wait, $20 an hour?</h3>
        <h4>At Ok Bye, <span>makers</span> work on <span>their own terms</span>.</h4>
        <h4>We <span>love to collaborate</span> and clients make sure our work is <span>used by millions</span>.</h4>
        <h4>If the idea is right, you get <span>the best</span> for <span>little to nothing</span>.</h4>
      </div>
    </div>

    <!-- solution -->
    <!-- <div class="part">
      <div class="text">
        <h3 class="left">What we built</h3>
        <h4>An <span>online game</span> challenging new players to <span>recreate sounds</span> made by <span>experienced</span> players, in 1 minute.</h4>
      </div>
      <div class="visuals">
        <div class="photo">

<iframe width="560" height="315" class="video" src="https://www.youtube.com/embed/9qeWKH1gVGc?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

          <p><a href="https://farfeatures.com" target="_blank">Far Features</a> filmed a behind the scenes.</p>
        </div>

      </div>
    </div> -->

    <!-- Play game -->

    <div class="part cosy">
      <div class="text">
        <!-- <h3 class="left">Ok Bye day job</h3> -->
        <button class="button-next" @click="playGame">Our latest work</button>

        <!-- <button class="button-next" @click="$emit('create')">Make music</button> -->
      </div>

    </div>

    <div class="rack" v-show="" >
      <oscillator-module-two />
      <envelope-module />
      <envelope-module-two />
      <router-module />
    </div>

    <div class="player__wrapper">
      <div class="player">
        <div class="user">
          <img class="custom-user-avatar" :src="avatarUrl"/>
          <div class="track-progress__wrapper">
            <span class="data artist">{{nameArtist}}</span>
            <div class="track-progress" :style="{width: trackProgress + '%'}"></div>
          </div>
        </div>
        <div class="mid-console">
          <div class="controls">
            <span class="skip-back" @click="loadPreset(-1)"></span>
            <span :class="[(isPlaying ? 'pause' : 'play')]" @click="playPauseSynth"></span>
            <span class="skip-forward" @click="loadPreset(1)"></span>
          </div>
        </div>
        <div class="volume">
          <span v-if="!looping" class="loop" @click="looping = true"></span>
          <span v-else class="single" @click="looping = false"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OscillatorModuleOne from "@/components/module/OscillatorModuleOne.vue";
import OscillatorModuleTwo from "@/components/module/OscillatorModuleTwo.vue";
import EnvelopeModule from "@/components/module/EnvelopeModule.vue";
import EnvelopeModuleTwo from "@/components/module/EnvelopeModuleTwo.vue";
import FilterModule from "@/components/module/FilterModule.vue";
import LfoModule from "@/components/module/LfoModule.vue";
import RouterModule from "@/components/module/RouterModule.vue";
import presets from "@/presets";
import audio from "@/audio";
import levels from "@/levels";
import character from "@/character";
import range from "lodash/range";
import fill from "lodash/fill";
import { mapState } from "vuex";
import { vuexSyncGen, mapValueToRange } from "@/utils";
import ModuleKnob from "@/components/ModuleKnob.vue";

var casestudyScope;

// Typeform native embed js
// (function() {
//   var qs,
//     js,
//     q,
//     s,
//     d = document,
//     gi = d.getElementById,
//     ce = d.createElement,
//     gt = d.getElementsByTagName,
//     id = "typef_orm",
//     b = "https://embed.typeform.com/";
//   if (!gi.call(d, id)) {
//     js = ce.call(d, "script");
//     js.id = id;
//     js.src = b + "embed.js";
//     q = gt.call(d, "script")[0];
//     q.parentNode.insertBefore(js, q);
//   }
// })();

// Typeform button popup embed
(function() {
  var qs,
    js,
    q,
    s,
    d = document,
    gi = d.getElementById,
    ce = d.createElement,
    gt = d.getElementsByTagName,
    id = "typef_orm_share",
    b = "https://embed.typeform.com/";
  if (!gi.call(d, id)) {
    js = ce.call(d, "script");
    js.id = id;
    js.src = b + "embed.js";
    q = gt.call(d, "script")[0];
    q.parentNode.insertBefore(js, q);
  }
})();

export default {
  components: {
    OscillatorModuleOne,
    OscillatorModuleTwo,
    EnvelopeModule,
    EnvelopeModuleTwo,
    FilterModule,
    LfoModule,
    RouterModule,
    ModuleKnob
  },
  created() {
    this.initSynth();
    casestudyScope = this;
    this.oscillator1 = audio.oscillator1.state.device;
  },
  data() {
    return {
      isPlaying: false,
      pickedPreset: 0,
      loopIteration: 0,
      trackProgress: 0,
      looping: false,
      noteArray: fill(range(0, 16), {
        selected: false,
        pitch: 0,
        volume: false,
        glide: false
      })
    };
  },
  mounted() {
    window.addEventListener("keydown", this.emitOnKey);
    // window.addEventListener("message", this.receiveMessage, false);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.emitOnKey);
    // window.removeEventListener('message', this.receiveMessage, false);
  },
  computed: {
    ...vuexSyncGen("oscillator1", "detune", val => {
      casestudyScope.oscillator1.detune.value = character.oscillator1.detune(
        val
      );
    }),
    nameArtist() {
      return this.$store.state.name;
    },
    avatarUrl() {
      return this.$store.state.avatarUrl;
    }
  },
  methods: {
    initSynth() {
      var self = this;
      this.toneLoop = audio.setMainLoop(
        {
          noteArray: range(0, 16),
          subdivision: "8n"
        },
        (time, note) => {
          this.trackProgress = (note / 15) * 25 + this.loopIteration * 25;
          if (note == 15) {
            this.loopIteration++;
            if (this.loopIteration >= 4) {
              if (!this.looping) {
                this.loadPreset(1);
              }
              this.loopIteration = 0;
              this.trackProgress = 0;
            }
          }
          if (this.noteArray[note].selected) {
            audio.playNote(this.noteArray[note].pitch, {
              noteLength: "16n",
              volume: this.noteArray[note].volume,
              time: note,
              glide: this.noteArray[note].glide,
              octaveOsc1:
                self.$store.state.audioParameters.oscillator1.frequency,
              octaveOsc2:
                self.$store.state.audioParameters.oscillator2.frequency
            });
          }
          if (this.noteArray[note].kick) {
            audio.playKick();
          }
          if (this.noteArray[note].hat) {
            audio.playHat();
          }
          if (this.noteArray[note].clap) {
            audio.playClap();
          }
          if (this.noteArray[note].clap2) {
            audio.playClap2();
          }
          if (this.noteArray[note].cymbal) {
            audio.playCymbal();
          }
          if (this.noteArray[note].labmyc) {
            audio.playLabmyc();
          }
          if (this.noteArray[note].noise) {
            audio.playNoise();
          }
          if (this.noteArray[note].snare) {
            audio.playSnare();
          }
        }
      );
      // this.toneLoop.start();
      this.loadPreset();
      setTimeout(function() {
        self.loadPreset();
      }, 4000);
    },
    emitOnKey() {
      if (event.keyCode === 32) {
        event.preventDefault();
        this.playPauseSynth();
      }
    },
    playPauseSynth() {
      if (this.toneLoop.state === "stopped") {
        this.isPlaying = true;
        return this.toneLoop.start();
      }
      this.isPlaying = false;
      this.toneLoop.stop();
    },
    playGame() {
      // this.$router.push("/");
      window.history.pushState(null, null, "/");
      location.reload();
    },
    loadPreset(mutation) {
      if (mutation) {
        this.pickedPreset = this.pickedPreset + mutation;
        if (this.pickedPreset > presets.length - 1) {
          this.pickedPreset = 0;
        } else if (this.pickedPreset < 0) {
          this.pickedPreset = presets.length - 1;
        }
      } else {
        // randomly pick preset
        this.pickedPreset = Math.round(Math.random() * (presets.length - 1));
      }

      // load the preset on synth
      this.$store.commit("setAudioParameterToPreset", {
        preset: presets[this.pickedPreset].parameterValues
      });

      // set correct routing
      audio.connectLfo(this.$store.state.audioParameters.router.lfo);
      audio.connectEnvelope2(
        this.$store.state.audioParameters.router.envelope2
      );
      audio.filter.state.device.frequency.value = character.filter.cutOffFreq(
        this.$store.state.audioParameters.filter.cutOffFreq
      );

      //and again to correct pitch
      // load the preset on synth
      this.$store.commit("setAudioParameterToPreset", {
        preset: presets[this.pickedPreset].parameterValues
      });

      this.$store.commit("setFeaturedArtist", {
        artistName: presets[this.pickedPreset].name,
        avatarUrl: presets[this.pickedPreset].avatarUrl
      });

      // Set bpm from preset
      audio.setBpm(presets[this.pickedPreset].bpm * 2);
      // Set bpm in store
      this.$store.commit("setPresetBpm", presets[this.pickedPreset].bpm);

      // Set noteArray to sequence preset globally
      this.$store.commit(
        "setActiveSequence",
        presets[this.pickedPreset].sequenceArray
      );
      //and locally
      this.noteArray = presets[this.pickedPreset].sequenceArray;

      //reset oscs for waveforms
      audio.oscillator1.state.device.type =
        presets[this.pickedPreset].parameterValues.oscillator1.typeOsc;
      audio.oscillator2.state.device.type =
        presets[this.pickedPreset].parameterValues.oscillator2.typeOsc;
      audio.oscillator1.state.device.stop();
      audio.oscillator1.state.device.start();
      audio.oscillator2.state.device.stop();
      audio.oscillator2.state.device.start();
      audio.lfo.state.device.type =
        presets[this.pickedPreset].parameterValues.lfo.type;
      audio.filter.state.device.type =
        presets[this.pickedPreset].parameterValues.filter.type;

      // import level config to highest level
      const availableParameters = levels[levels.length - 1];

      // rest will be done by watcher of sequencesPassedInCurrentLevel
    }
  }
};
</script>

<style lang="scss">
body {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  font-size: 2.5vh;
  -webkit-font-smoothing: antialiased;
  touch-action: none !important;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  text-transform: uppercase;
  overflow: auto;
  height: unset;
}

h1,
h2,
h3 {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
}

h1 {
  font-weight: 900;
  font-size: 4em;
  line-height: 1em;
  margin: 0;
}

h2 {
  margin-bottom: 2em;
  text-transform: none;
}

h3 {
  margin-bottom: 0.5em;
  margin-top: 4em;
}

button {
  letter-spacing: 1px;
  font-size: 1em;
  padding: 0;
  cursor: pointer;
  text-transform: uppercase;
  padding: 0.8rem 1.4rem;
  margin: 5px;
  background: none;
  border: 1px solid #ff8574;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  color: white;
  a {
    color: white;
    text-decoration: none;
  }
  &:hover {
    background: #ff8574;
    // transform: scale(1.1);
  }
  &.main {
    // border: 1px solid #00d87b;
    background: #ff8574;
    color: black;
    font-size: 2em;
    font-weight: 900;
    &:hover {
      background: #000;
      color: white;
    }
  }
}

.navbar {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  height: 5em;
  align-items: center;
  padding: 0 2em;
  margin: auto;
  color: white;
  .points {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 3.4em;
    color: #ff8574;
    line-height: 0.9em;
    font-weight: 900;
    span {
      display: block;
      margin-left: 0;
      line-height: 1em;
      font-size: 0.25em;
      font-weight: 600;
      color: white;
    }
  }
  a {
    text-decoration: none;
    font-weight: 600;
    color: white;
    margin-left: 2em;
    transition: all 0.2s;
    &:hover {
      // transform: scale(1.1);
    }
    &:hover > .logo {
      // animation: 0.6s wave linear;
      transform: rotate(10deg);
    }
  }
  .logo {
    display: block;
    transform-origin: 50% 120%;
    position: absolute;
    z-index: -1;
    margin-top: -1.5em;
    transform: rotate(-30deg);
    transition: all 1s;
    cursor: pointer;
    background-size: contain;
    background-repeat: no-repeat;
    width: 3em;
    height: 5em;
    background-image: url("../assets/hand.svg");
  }
}

.perks {
  &__content {
    width: 25%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    right: 0;
    margin-top: 60px;
    .perk {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 60px;
      align-items: center;
      text-align: left;
      background: rgba(255, 255, 255, 0.05);
      transition: all 1s;
      cursor: pointer;
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      button {
        font-size: 10px;
      }
      img {
        width: 40px;
        height: 50px;
      }
      span {
        width: 10%;
        font-weight: 900;
        &:nth-of-type(1) {
          width: 40%;
          font-weight: 300;
        }
      }
    }
  }
}

.part {
  display: flex;
  align-items: center;
  width: 90%;
  text-align: left;
  text-transform: none;
  justify-content: space-around;
  margin: 8em auto;
  &.call {
    text-align: center;
    margin-bottom: 0;
    h4 {
      span {
        &:nth-of-type(1) {
          color: #00d87b;
        }
        &:nth-of-type(2) {
          color: #ff8574;
        }
        &:nth-of-type(3) {
          color: #7d00d9;
        }
      }
    }
  }
  button {
    letter-spacing: 1px;
    font-size: 1em;
    padding: 0;
    cursor: pointer;
    text-transform: uppercase;
    padding: 0.8rem 1.4rem;
    margin: 5px;
    background: none;
    border: 1px solid #ff8574;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    color: white;
    a {
      color: white;
      text-decoration: none;
    }
    &:hover {
      background: #ff8574;
      // transform: scale(1.1);
    }
    &.main {
      // border: 1px solid #00d87b;
      background: #ff8574;
      color: black;
      font-size: 2em;
      font-weight: 900;
      &:hover {
        background: #000;
        color: white;
      }
    }
  }
  &.cosy {
    justify-content: center;
    margin-bottom: 20em;
    .text {
      text-align: center;
    }
    button {
      color: white;
      max-width: fit-content;
      margin: 1em auto;
      font-size: 2em;
      background: #ff8574;
      font-weight: 900;
      color: black;
      &:hover {
        // transform: scale(1.05);
        font-size: 2.1em;
        color: white;
        background: black;
      }
    }
  }
  .text {
    width: 40%;
  }
  .numbers {
    width: 100%;
    h4 {
      text-align: center;
      font-size: 2em;
      font-weight: 400;
      span {
        font-size: 2em;
        display: block;
        font-weight: 600;
      }
    }
    .part {
      margin: 0 auto;
    }
  }
  .visuals {
    width: 40%;
    .video {
      max-width: 100%;
    }
    img {
      max-width: 100%;
    }
    p {
      font-size: 1.2em;
      margin: 0.2em 0 0 0;
      text-align: center;
      a {
        text-decoration: none;
        color: white;
        &:hover {
          border-bottom: 1px solid white;
        }
        & span {
          color: #ff8574;
          text-decoration: none;
          font-weight: 600;
          font-size: 1em;
        }
      }
    }
  }
  h3 {
    text-transform: uppercase;
    margin-top: 0;
    &.middle {
      text-align: center;
    }
  }
  h4 {
    margin: 0;
    font-weight: 900;
    font-size: 2.5em;
    line-height: 1.5em;
    &:nth-of-type(2) {
      margin: 2em 0;
      span {
        &:nth-of-type(1) {
          color: #ff8574;
        }
        &:nth-of-type(2) {
          color: #00d87b;
        }
        &:nth-of-type(3) {
          color: #7d00d9;
        }
      }
    }
    &:nth-of-type(3) {
      margin: 0;
      span {
        &:nth-of-type(1) {
          color: #7d00d9;
        }
        &:nth-of-type(2) {
          color: #ff8574;
        }
        &:nth-of-type(3) {
          color: #00d87b;
        }
      }
    }
    span {
      &:nth-of-type(1) {
        color: #ff8574;
      }
      &:nth-of-type(2) {
        color: #7d00d9;
      }
      &:nth-of-type(3) {
        color: #00d87b;
      }
    }
  }
  &.left {
    justify-content: flex-end;
  }
  &.right {
    justify-content: flex-start;
  }
  &.dial {
    .knob {
      max-width: 34vh;
      p {
        font-size: 1.7em;
      }
    }
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}

.board {
  width: 60em;
  margin: 2em auto;
  .job {
    width: 100%;
    min-height: 4em;
    align-items: center;
    display: flex;
    justify-content: space-around;
    background: white;
    color: black;
    font-weight: 600;
    padding: 0 1.5em;
    margin-bottom: 1.5em;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      transform: scale(1.01);
    }
    button {
      margin: 0;
      background: #ff8574;
      border: 0;
      color: black;
      font-weight: 900;
      font-family: "Montserrat", sans-serif;
    }
    span {
      align-items: center;
      width: 15%;
      text-align: left;
      &:first-of-type {
        width: 40%;
      }
      &:nth-of-type(2) {
        width: 20%;
      }
    }
    h3 {
      margin: 0;
      font-weight: 900;
      button {
        background: #00d87b;
      }
    }
    &__legend {
      width: 100%;
      display: flex;
      justify-content: space-around;
      padding: 0 1.5em;
      span {
        padding: 1.5em 0;
        width: 15%;
        text-align: left;
        &:first-of-type {
          width: 40%;
        }
        &:nth-of-type(2) {
          width: 20%;
        }
      }
    }
  }
}

.player {
  display: flex;
  z-index: 1000;
  // max-width: 1050px;
  bottom: -1px;
  height: 6em;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  span {
    transition: all 0.2s;
    cursor: pointer;
    background-size: contain;
    width: 5em;
    height: 5em;
    &:hover {
      transform: scale(1.1);
    }
  }
  .play {
    background-image: url("../assets/play.svg");
  }
  .pause {
    background-image: url("../assets/pause.svg");
  }
  .skip-forward {
    background-image: url("../assets/skip-forward.svg");
    width: 2.5em;
    height: 2.5em;
  }
  .skip-back {
    background-image: url("../assets/skip-back.svg");
    width: 2.5em;
    height: 2.5em;
  }
  .loop {
    background-image: url("../assets/loop.svg");
    width: 2.5em;
    height: 2.5em;
    transform: rotate(-135deg);
  }
  .single {
    background-image: url("../assets/single.svg");
    width: 2.5em;
    height: 2.5em;
  }
  .mid-console {
    height: 6em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .user {
    display: flex;
    width: 40%;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    .custom-user-avatar {
      height: 50px;
      width: 50px;
      border-radius: 100%;
      // border: 2px solid white;
    }
    .artist {
      font-size: 1em;
      font-weight: 200;
      text-transform: uppercase;
      height: fit-content;
      width: 100%;
    }
    .track-progress__wrapper {
      margin-left: 1em;
      margin-right: 1em;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .track-progress {
        width: 100%;
        height: 2px;
        background: #ff8574;
        transition: all 0.1s;
      }
    }
  }
  .volume {
    display: flex;
    width: 40%;
    justify-content: flex-end;
    align-items: center;
  }
  &__wrapper {
    width: 100%;
    position: fixed;
    justify-content: center;
    margin: auto;
    background: black;
    bottom: -1px;
    height: fit-content;
    padding: 0 2em;
    z-index: 11;
  }
}

.client-bar {
  background-color: white;
  background-image: url("../assets/pattern.svg");
  background-size: cover;
  background-position: 20% 20%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 10em;
  width: 100%;
  padding: 0 1.5em;
  margin: 5em 0;
  text-align: left;
  line-height: 2.5em;
  span {
    color: black;
    font-size: 1.17em;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      margin: 0;
      padding: 0;
      color: black;
      font-weight: 900;
      font-size: 2em;
      max-height: 2.5em;
    }
    .logos {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      img {
        padding: 0 1em;
      }
      img:first-of-type {
        padding-left: 0;
      }
    }
  }
  img {
    display: block;
    max-height: 2.5em;
    height: auto;
    width: auto;
  }
}

.remove-typeform-branding {
  display: block;
  width: 100%;
  height: 6em;
  background: black;
  position: relative;
  z-index: 1;
  margin-top: -4.5em;
}

iframe {
  overflow: hidden;
}

@media only screen and (max-width: 1100px) {
  .client-bar {
    background-size: 2000px;
    font-size: 0.5em;
  }
  .part {
    flex-wrap: wrap;
    .text {
      width: 100%;
      margin: 4em auto;
    }
    .visuals {
      width: 100%;
      .video {
        margin: auto;
      }
      .photo {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        img {
          max-width: 100%;
          width: auto;
          height: auto;
          max-height: 550px;
        }
      }
    }
  }
}
</style>
