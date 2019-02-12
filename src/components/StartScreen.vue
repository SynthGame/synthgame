<template>
  <div class="overlay">
    <div class="overlay-content-wrapper">
      <div class="header">
        <h3>{{headerText}}</h3>
      </div>
      <div class="score-container">
        <h5>SCORE</h5>
        <h1>{{ totalScore }}</h1>
      </div>
        <div
          class="level"
          v-for="level in levels"
          :key="level.number"
          @click="goToLevel(level.number)"
          :class="{ active: currentLevel === level.number }"
        >
        <div v-if="(level.number + 1) % 3 == 0" class="module-content">
          <h4 class="mod-text">{{ level.parent }}</h4>
          <!-- Placeholder -->
          <p>[img]</p> 
         </div>
          <h3>{{level.name}}</h3>
        </div>
      </div>

      <div class="navigation-container">
        <button class="button-next" @click="$emit('closeStartScreen')" ref="button">KEEP TWEAKING</button>
        <button class="button-next" @click="$emit('next')" ref="button">NEXT LEVEL</button>
        <button class="button-next share-link">
          {{ shareLink }}
          <span></span>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import ModuleKnob from "@/components/ModuleKnob.vue";
import Levels from '../levels.js';

export default {
  name: "startscreen",
  props: {
    level: {
      type: Number,
      default: 1
    },
    goToLevel: Function
  },
  data() {
    return {
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
    },
    currentLevel: function() {
      return this.$store.state.gameState.level;
    },
    levels: function() {
      return Levels.map((lvl) =>  lvl.levelData);
    }
  },
  methods: {
    // isLevel(level) {
    //   return this.$store.state.gameState.level === level;
    // }
  },
  components: {
    ModuleKnob
    // ModuleDisplay,
    // ModuleTitle,
    // ModuleButton
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
};

const levels = [
  {
    number: 1,

    control: {
      name: "waveform",
      id: "waveform"
    },
    score: 0
  },
  {
    number: 2,

    control: {
      name: "octave",
      id: "octave"
    },
    score: 0
  },
  {
    number: 3,

    control: {
      name: "detune",
      id: "detune"
    },
    score: 0
  },
  {
    number: 4,
    parent: "OSC 2",
    control: {
      name: "waveform",
      id: "waveform"
    },
    score: 0
  },
  {
    number: 5,
    parent: "OSC 2",
    control: {
      name: "octave",
      id: "octave"
    },
    score: 0
  },
  {
    number: 6,
    parent: "OSC 2",
    control: {
      name: "detune",
      id: "detune"
    },
    score: 0
  }
];
</script>

<style scoped lang="scss">
.header {
  top: 0px;
  position: absolute;
  background-color: #151515;
  height: 58px;
  width: 100%;
}

.navigation-container {
  position: absolute;
  bottom: 00px;
  width: 100%;
  background-color: rgb(21, 21, 21);
  height: 132px;
  padding: 12px;
}

.level-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  overflow-y: scroll;
  margin-top: 20px;
}

.level {
  margin-bottom: 20px;
  width: 320px;
  display: flex;
  justify-content: space-around;
  height: 130px;
  background: rgb(0, 0, 0);
  margin-left: 20px;
  margin: auto;
  padding: 16px;
}

.active {
  border-top: 1px solid;
  border-bottom: 1px solid;
}

.module-content {
  position: absolute;
  left: -80px;
}

.mod-text {
    /* Safari */
  -webkit-transform: rotate(-90deg);
  /* Firefox */
  -moz-transform: rotate(-90deg);
  /* IE */
  -ms-transform: rotate(-90deg);
  /* Opera */
  -o-transform: rotate(-90deg);
  position: relative;
  // left: -190px;
  // top: 224px;
  z-index: 20;
}
.overlay-content-wrapper {
  justify-content: start;
}

@media only screen and (max-width: 1000px) {
}
</style>


