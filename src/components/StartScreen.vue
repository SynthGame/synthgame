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
      <div class="level-container">
        <div
          class="level"
          v-for="level in levels"
          :key="level.knobName"
          @click="goToLevel(level.number - 1)"
        >
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
      marginLeftRbmg: 0,
      levels: [
        {
          knobName: "Frequency",
          number: 1
        },
        {
          knobName: "Shape",
          number: 2
        },
        {
          knobName: "Rolloff",
          number: 3
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
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
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
