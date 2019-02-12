<template>
  <div class="wrapper">
    <div class="cols">
      <nav :class="`screen navigation ${showModules ? 'is-active' : ''}`">
        <div class="navigation--inner">
          <div
            v-for="(group, index) in nav.groups"
            :key="index"
            class="navigation--group"
            :class="`navigation--group_${group.title.toLowerCase().replace(' ', '')}`"
          >
            <div class="navigation--group-title">
              <span>{{ group.title }}</span>
            </div>
            <ul class="navigation--list">
              <li v-for="(item, key) in group.items" :key="key" class="navigation--item">
                <button class="navigation--item-btn" @click="activeScreen(index, key)">
                  <span class="navigation--item-inner">
                    <svg
                      class="navigation--item-icon"
                      viewBox="0 0 48 54"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <path fill="url(#pattern0)" d="M0 0h48v53.333H0z"></path>
                      <defs>
                        <pattern
                          id="pattern0"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use xlink:href="#image0" transform="scale(.01075 .0098)"></use>
                        </pattern>
                        <image
                          id="image0"
                          width="93"
                          height="102"
                          xlink:href="data:image/png;base64,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"
                        ></image>
                      </defs>
                    </svg>
                    <span class="navigation--item-text">
                      <span class="navigation--item-title">
                        <span>{{ item.title }}</span>
                      </span>
                      <span class="navigation--item-author">{{ item.author || '-' }}</span>
                    </span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="screen">
        <start-screen v-if="showStartScreen" @startLevel="beginSvoosh"/>
        <template v-if="showGame">
          <div class="hide-desktop screen--header">
            <div class="screen--header-inner">
              <button @click="showModules = !showModules" class="btn btn_link btn_primary">
                <span class="btn--inner">
                  <span class="btn--inner-text">{{ showModules ? 'Modules >' : '< Modules' }}</span>
                </span>
              </button>
              <div class="screen--header-title">Osc 1 Pitch</div>
            </div>
          </div>
          <div class="screen--inner">
            <oscillator-module-one
              v-if="moduleIsUseable('oscillator1')"
              :class="[(activeModule == 0 ? 'active' : '')]"
            />
            <oscillator-module-two
              v-if="moduleIsUseable('oscillator2')"
              :class="[(activeModule == 1 ? 'active' : '')]"
            />
            <filter-module
              v-if="moduleIsUseable('filter')"
              :class="[(activeModule == 2 ? 'active' : '')]"
            />
            <envelope-module
              v-if="moduleIsUseable('envelope')"
              :class="[(activeModule == 3 ? 'active' : '')]"
            />
            <lfo-module
              v-if="moduleIsUseable('lfo')"
              :class="[(activeModule == 4 ? 'active' : '')]"
            />
            <envelope-module-two
              v-if="moduleIsUseable('envelope2')"
              :class="[(activeModule == 5 ? 'active' : '')]"
            />
            <sequencer-module
              v-if="createModeIsActive"
              :class="[(activeModule == 7 ? 'active' : '')]"
              class="module sequencer"
            />
            <router-module
              v-if="moduleIsUseable('router')"
              :class="[(activeModule == 6 ? 'active' : '')]"
            />
          </div>
          <!-- ATTEMPT -->
          <div class="attempt-navigation">
            <span v-if="!completedLevel">
              <button @click="makeAttempt" class>Attempt {{ attempts }}</button>
            </span>
            <span v-if="completedLevel">
              <button class="button-next" @click="requestNextLevel" ref="button">NEXT LEVEL</button>
            </span>
          </div>
        </template>
        <svoosh
          v-if="isThereSvooshComponent"
          :isFired="svooshIt"
          @midway="showGame=true"
          @bye="endSvoosh"
        />
      </div>
      <div class="screen screen_score screen_score_desktop hide-mobile">
        <div class="screen--header screen--header_transparent">
          <div class="screen--header-inner">
            <button class="btn btn_link btn_primary u-ml_a">
              <span class="btn--inner">
                <span class="btn--inner-text">or Make a song ></span>
              </span>
            </button>
          </div>
        </div>
        <div class="screen--inner">
          <!-- <div class="screen--title">Match <br>The <br>Sound</div>
        <button class="btn btn_stroke btn_primary">
          <span class="btn--inner">
            <span class="btn--inner-text">or Make a song</span>
          </span>
          </button>-->
          <div class="screen--score">
            <div class="screen--score-title">Bart</div>
            <div class="screen--score-value">0</div>
          </div>
        </div>
        <div class="screen--share">
          <p>Anyone with this link can join and beat your high score.</p>
          <div class="screen--share-inner">
            <div class="screen--share-url">
              <span>www.mindgame.com/56234353/7534657543</span>
            </div>
            <button class="btn btn_icon btn_primary">
              <svg viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="8.904"
                  y="8"
                  width="12.999"
                  height="13"
                  rx="2"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></rect>
                <path
                  d="M4.902 14h-1a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  MODULE_SEQUENCER_COLOR,
  MODULE_ROUTER_COLOR,
  MODULE_OSCILLATOR_COLOR,
  MODULE_OSCILLATORTWO_COLOR,
  MODULE_ENVELOPE_COLOR,
  MODULE_FILTER_COLOR,
  MODULE_DELAY_COLOR,
  MODULE_REVERB_COLOR,
  MODULE_LFO_COLOR
} from "@/constants";
import some from "lodash/some";
// @ is an alias to /src
import StartScreen from "@/components/StartScreen";
import Svoosh from "@/components/Svoosh";
import GameNavBar from "@/components/GameNavBar.vue";
import OscillatorModuleOne from "@/components/module/OscillatorModuleOne.vue";
import OscillatorModuleTwo from "@/components/module/OscillatorModuleTwo.vue";
import EnvelopeModule from "@/components/module/EnvelopeModule.vue";
import EnvelopeModuleTwo from "@/components/module/EnvelopeModuleTwo.vue";
import FilterModule from "@/components/module/FilterModule.vue";
import LfoModule from "@/components/module/LfoModule.vue";
import SequencerModule from "@/components/module/SequencerModule.vue";
import RouterModule from "@/components/module/RouterModule.vue";

export default {
  name: "home",
  data() {
    return {
      activeModule: 0,
      marginArray: [0, 0.2, 0.4, 0.6],
      indicatorActive: true,
      oscillatorColor: MODULE_OSCILLATOR_COLOR,
      oscillatorTwoColor: MODULE_OSCILLATORTWO_COLOR,
      envelopeColor: MODULE_ENVELOPE_COLOR,
      filterColor: MODULE_FILTER_COLOR,
      lfoColor: MODULE_LFO_COLOR,
      routerColor: MODULE_ROUTER_COLOR,
      sequencerColor: MODULE_SEQUENCER_COLOR,
      showStartScreen: true,
      isThereSvooshComponent: false,
      svooshIt: false,
      showGame: false,
      showModules: false,
      nav: {
        title: "Bart's song",
        active: {
          title: "Detune",
          author: "Lawson"
        },
        groups: [
          {
            title: "Osc 1",
            moduleName: "oscillator1",
            items: [
              {
                title: "detune",
                author: "Lawson"
              },
              {
                title: "frequency",
                author: "Lawson"
              },
              {
                title: "typeOsc",
                author: "Bart"
              }
            ]
          },
          {
            moduleName: "oscillator2",
            title: "Osc 2",
            items: [
              {
                title: "typeOsc",
                author: "Daniel"
              },
              {
                title: "frequency",
                author: ""
              },
              {
                title: "volume",
                author: "Lauren"
              }
            ]
          },
          {
            moduleName: "filter",
            title: "Filter",
            items: [
              {
                title: "type",
                author: "Basti"
              },
              {
                title: "cutOffFreq",
                author: "Momcilo"
              }
            ]
          },
          {
            moduleName: "envelope",
            title: "Envelope",
            items: [
              {
                title: "attack",
                author: ""
              },
              {
                title: "decay",
                author: ""
              },
              {
                title: "sustain",
                author: ""
              },
              {
                title: "release",
                author: ""
              }
            ]
          },
          {
            moduleName: "envelope2",
            title: "Envelope 2",
            items: [
              {
                title: "attack",
                author: ""
              },
              {
                title: "decay",
                author: ""
              },
              {
                title: "amount",
                author: ""
              }
            ]
          },
          {
            moduleName: "lfo",
            title: "LFO",
            items: [
              {
                title: "amount",
                author: ""
              },
              {
                title: "frequency",
                author: ""
              },
              {
                title: "type",
                author: ""
              }
            ]
          },
          {
            moduleName: "router",
            title: "Router",
            items: [
              {
                title: "lfo",
                author: ""
              },
              {
                title: "envelope2",
                author: ""
              }
            ]
          }
        ],

        oscillator1: {
          detune: true,
          frequency: true,
          typeOsc: true
        },
        oscillator2: {
          typeOsc: true,
          frequency: true,
          volume: true
        },
        filter: {
          type: true,
          cutOffFreq: true
        },
        envelope: {
          attack: true,
          decay: true,
          sustain: true,
          release: true
        },
        envelope2: {
          attack: true,
          decay: true,
          amount: true
        },
        lfo: {
          amount: true,
          frequency: true,
          type: true
        },
        router: {
          lfo: true,
          envelope2: true
        },
        levelData: {
          text:
            "Congratulations! You're an electronic music producer. Make the music for one of the levels, or keep playing the game and break the highscore: level 135."
        }
      }
    };
  },
  components: {
    StartScreen,
    GameNavBar,
    OscillatorModuleOne,
    OscillatorModuleTwo,
    RouterModule,
    EnvelopeModule,
    EnvelopeModuleTwo,
    FilterModule,
    LfoModule,
    SequencerModule,
    Svoosh
  },
  mounted() {
    this.activeScreen(0, 0);
  },
  methods: {
    makeAttempt() {
      this.$store.dispatch("madeAttempt");
    },
    beginSvoosh() {
      this.showStartScreen = false;
      this.isThereSvooshComponent = true;
      this.$nextTick(() => (this.svooshIt = true));
      // audio.playSweep();
    },
    endSvoosh() {
      setTimeout(() => {
        this.isThereSvooshComponent = false;
        this.svooshIt = false;
      }, 300);
    },
    activeScreen(index, key) {
      this.showModules = false;
      this.nav.active = this.nav.groups[index].items[key];
      let module = this.nav.groups[index],
        moduleName = module.moduleName,
        knobName = module.items[key].title;

      this.$store.commit({
        type: "setKnobAvalible",
        knobName: knobName,
        moduleName: moduleName
      });
    },
    moduleIsUseable(moduleName) {
      if (this.createModeIsActive) {
        return true;
      } else {
        return some(this.knobsAvailable[moduleName]); // some are truthy
      }
    },
    showOsc1() {
      this.activeModule = 0;
    },
    showOsc2() {
      this.activeModule = 1;
    },
    showFil() {
      this.activeModule = 2;
    },
    showEnv() {
      this.activeModule = 3;
    },
    showEnv2() {
      this.activeModule = 5;
    },
    showLfo() {
      this.activeModule = 4;
    },
    showRouter() {
      this.activeModule = 6;
    },
    showSequencer() {
      this.activeModule = 7;
    }
  },
  computed: {
    attempts() {
      return this.$store.state.gameState.attempts;
    },
    madeAttempt() {
      return this.$store.state.gameState.madeAttempt;
    },
    completedLevel() {
      return this.$store.state.gameState.completedLevel;
    },
    createModeIsActive() {
      return this.$store.state.gameState.createModeIsActive;
    },
    knobsAvailable() {
      return this.$store.state.gameState.knobsAvailable;
    },
    knobsAvailable() {
      return this.$store.state.gameState.knobsAvailable;
    },
    oscillator1Complete() {
      return Object.values(
        this.$store.getters.audioParametersMatchGoalWithMargin["oscillator1"]
      ).every(param => param);
    },
    oscillator2Complete() {
      return Object.values(
        this.$store.getters.audioParametersMatchGoalWithMargin["oscillator2"]
      ).every(param => param);
    },
    filterComplete() {
      return Object.values(
        this.$store.getters.audioParametersMatchGoalWithMargin["filter"]
      ).every(param => param);
    },
    envelopeComplete() {
      return Object.values(
        this.$store.getters.audioParametersMatchGoalWithMargin["envelope"]
      ).every(param => param);
    },
    envelope2Complete() {
      return Object.values(
        this.$store.getters.audioParametersMatchGoalWithMargin["envelope2"]
      ).every(param => param);
    },
    lfoComplete() {
      return Object.values(
        this.$store.getters.audioParametersMatchGoalWithMargin["lfo"]
      ).every(param => param);
    },
    routerComplete() {
      return Object.values(
        this.$store.getters.audioParametersMatchGoalWithMargin["router"]
      ).every(param => param);
    }
  }
};
</script>

<style scoped lang="scss">
.attempt-navigation {
  bottom: 12vh;
  position: relative;
  z-index: 20;
}

.module__name__status-indicator {
  display: inline-block;
  width: 11px;
  height: 11px;
  border-radius: 100%;
  transition: 0.5s;
  border: 1px solid white;

  &--active {
    border: none;
    transition: 0.5s;
    border: 1px solid white;
  }
}

.active {
  left: 0;
}

.twelve {
  left: calc(5 * 16.67em);
  top: 24.5em;
}
</style>
