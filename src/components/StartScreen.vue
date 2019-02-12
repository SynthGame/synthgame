<template>
  <div class="overlay">
    <div class="overlay-content-wrapper">
      <!-- <h1>Tats</h1>
      <h2>A synthesizer game.</h2>-->
      <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/O7x-AS6idOQ?rel=0?version=3&autoplay=1&controls=0&&showinfo=0&loop=1&playlist=O7x-AS6idOQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> -->
      <!-- <video width="480" autoplay loop muted>
        <source src="../../src/assets/intro.mp4" type="video/mp4">
      </video>
      <div>
        <button class="button-next" @click="$emit('startPreview')">Play game</button>
        <button class="button-next" @click="$emit('create')">Make music</button>
      </div>
      <div class="credits">
        Game created by <a href="https://okbye.io" target="_blank"><span>Ok Bye</span></a>. Read the <a href="https://casestudies.okbye.io/tats/" target="_blank"><span>Case Study</span></a>.
      </div>-->
      <div class="header">
        <h4>{{headerText}}</h4>
      </div>
      <div class="score-container">
        <h5>SCORE</h5>
        <h1>{{ totalScore }}</h1>
      </div>
      <div class="level-container">
        <div class="level" v-for="level in levels" :key="level.knobName">
          <module-knob
            v-model="attack"
            v-if="true"
            :min="0"
            :max="100"
            knobColor="#e4e259"
            :name="level.knobName"
            module="envelope"
          ></module-knob>
          <!-- <h4>{{ level.knobName }}</h4> -->
        </div>
      </div>

      <!-- <div class="leader-board">
        <div v-for="challenger in challengers" :key="challenger.name" class="challenger">
          <h5>{{ challenger.name }}</h5>
          <h1>{{ challenger.score }}</h1>
        </div>
      </div> -->

      <div class="navigation-container">
        <button class="button-next" @click="$emit('closeStartScreen')" ref="button">KEEP TWEAKING</button>
        <button class="button-next" @click="$emit('next')" ref="button">NEXT LEVEL</button>
        <button class="button-next share-link">
          {{ shareLink }}
          <span></span>
        </button>
      </div>
    </div>
    <!-- <div :style="{'margin-left': marginLeftRbmg}" class="rbmg">
        <iframe width="250" height="150" src="https://www.youtube.com/embed/nkeLxvVvMdg?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <img class="rbmg-img" src="../../src/assets/rbmg.png" alt="Powered by Red Bull Mind Gamers">
        <svg @click="hideVideo" class="hidevideo" width="18px" height="17px" viewBox="0 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="exit_icon" fill="#7D00DA" fill-rule="nonzero" stroke="#FFFFFF" stroke-width="1.785">
                    <path d="M16.6,0.6 L0.9,16.3" id="Shape"></path>
                    <path d="M16.6,16.3 L0.9,0.6" id="Shape"></path>
                </g>
            </g>
        </svg>
    </div>-->
  </div>
</template>


<script>
import ModuleKnob from "@/components/ModuleKnob.vue";

export default {
  name: "startscreen",
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      marginLeftRbmg: 0,
      levels: [
        {
          knobName: "Frequency"
        },
        {
          knobName: "Shape"
        },
        {
          knobName: "Rolloff"
        }
      ],
      challengers: [
        {
          name: "Lawson",
          score: 9000
        },
        {
          name: "Bart",
          score: "Over 9000"
        },
        {}
      ]
    };
  },
  computed: {
    headerText: function() {
      return this.$store.state.gameState.reateModeIsActive
        ? "CONTROLS"
        : "GAME SUMMARY";
    },
    totalScore: function() {
      return this.$store.state.gameState.score;
    },
    shareLink: function() {
      return "https://bit.ly/IqT6zt";
    }
  },
  components: {
    ModuleKnob
    // ModuleDisplay,
    // ModuleTitle,
    // ModuleButton
  },
  mounted() {
    window.addEventListener("keydown", this.emitOnKey);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.emitOnKey);
  },
  methods: {
    emitOnKey() {
      if (event.keyCode === 13) {
        this.$emit("startPreview");
      }
    },
    hideVideo() {
      this.marginLeftRbmg = "-100vw";
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  top: 0px;
  position: absolute;
  background-color: rgb(21, 21, 21);
}

// .navigation {
//   bottom: 20px;
//   position: absolute;
// }

.level-container {
  width: 100%;
  text-align: center;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.level {
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.rbmg {
  position: absolute;
  bottom: 2em;
  left: 3em;
  width: auto;
  transition: all 1s;
  &-img {
    position: absolute;
    margin-left: -285px;
    margin-top: 87px;
    height: 80px;
  }
  .hidevideo {
    position: absolute;
    margin: -4px 0 0 -9px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      transform: rotate(90deg);
    }
  }
}

@media only screen and (max-width: 1000px) {
  .rbmg {
    position: absolute;
    bottom: unset;
    top: -3em;
    left: 3em;
    width: auto;
    transition: all 1s;
    transform: scale(0.5) translate(-110px, 50px);
    &-img {
      position: absolute;
      margin-left: -285px;
      margin-top: 87px;
      height: 80px;
    }
  }
}

.credits {
  font-size: 1em;
  font-weight: 200;
  & a {
    text-decoration: none;
    color: white;
    text-transform: uppercase;
    // transition: 0.6s all;
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
</style>
