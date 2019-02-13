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
            <span>
              {{ group.title }}
            </span>
            <svg v-if="group.icon === 'osc'" class="navigation--group-icon" viewBox="0 0 29 29" width="29" height="29" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <path class="navigation--group-fill" d="M0 0h29v29H0z"/>
                <path fill="#000" d="M.228 14.5h15.959v6.903L29 15.831V14.5H16.187V6.959z"/>
              </g>
            </svg>
            <svg v-else-if="group.icon === 'filter'" class="navigation--group-icon" viewBox="0 0 29 29" width="29" height="29" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <path fill="#000" d="M0 0h29v29H0z"/>
                <path class="navigation--group-fill" d="M0 0h29v25.785C19.04 13.708 9.373 7.775 0 7.985-9.373 8.192-9.373 5.531 0 0z"/>
              </g>
            </svg>
            <svg v-else-if="group.icon === 'lfo'" class="navigation--group-icon" viewBox="0 0 29 29" width="29" height="29" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <path class="navigation--group-fill" d="M0 0h29v29H0z"/>
                <path d="M14 8.07V0h1v8a7 7 0 1 1-1 .07z" fill="#000"/>
              </g>
            </svg>
            <svg v-else-if="group.icon === 'envelope'" class="navigation--group-icon" viewBox="0 0 29 29" width="29" height="29" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <path fill="#000" d="M0 0h29v29H0z"/>
                <path class="navigation--group-fill" d="M0 0h29v24.211L18.04 10.065H0z"/>
              </g>
            </svg>
            <svg v-else-if="group.icon === 'envelope2'" class="navigation--group-icon" viewBox="0 0 29 29" width="29" height="29" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <path fill="#000" d="M0 0h29v29H0z"/>
                <path class="navigation--group-fill" d="M0 0h29v29H11.42L0 7.774z"/>
              </g>
            </svg>
            <svg v-else-if="group.icon === 'router'" class="navigation--group-icon" viewBox="0 0 29 29" width="29" height="29" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <path class="navigation--group-fill" d="M0 0h29v29H0z"/>
                <circle fill="#000" cx="15" cy="15" r="3"/>
              </g>
            </svg>
          </div>
          <ul class="navigation--list">
            <li v-for="(item, key) in group.items" :key="key" class="navigation--item">
              <button class="navigation--item-btn" @click="activeScreen(index, key)">
                <span class="navigation--item-inner">
                  <span class="navigation--item-text">
                    <span class="navigation--item-title">
                      <span>{{ item.knobName }}</span>
                    </span>
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
              <button @click="makeAttempt" class="button-next">Attempt {{ attempts }}</button>
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
            icon: 'osc',
            items: [
              {
                title: 'frequency',
                knobName: 'octave',
                author: 'Lawson'
              },
              {
                title: 'detune',
                knobName: 'detune',
                author: 'Lawson'
              },
              {
                title: 'typeOsc',
                knobName: 'shape',
                author: 'Bart'
              }
            ]
          },
          {
            moduleName: "oscillator2",
            title: "Osc 2",
            icon: 'osc',
            items: [
              {
                title: 'frequency',
                knobName: 'octave',
                author: ''
              },
              {
                title: 'volume',
                knobName: 'volume',
                author: 'Lauren'
              },
              {
                title: 'typeOsc',
                knobName: 'shape',
                author: 'Daniel'
              }
            ]
          },
          {
            moduleName: "filter",
            title: "Filter",
            icon: 'filter',
            items: [
              {
                title: 'cutOffFreq',
                knobName: 'Frequency',
                author: 'Momcilo'
              },
              {
                title: 'type',
                knobName: 'shape',
                author: 'Basti'
              },
            ]
          },
          {
            moduleName: "envelope",
            title: "Envelope",
            icon: "envelope",
            items: [
              {
                title: 'attack',
                knobName: 'attack',
                author: ''
              },
              {
                title: 'decay',
                knobName: 'decay',
                author: ''
              },
              {
                title: 'sustain',
                knobName: 'sustain',
                author: ''
              },
              {
                title: 'release',
                knobName: 'release',
                author: ''
              }
            ]
          },
          {
            moduleName: "envelope2",
            title: "Envelope 2",
            icon: 'envelope2',
            items: [
              {
                title: 'attack',
                knobName: 'attack',
                author: ''
              },
              {
                title: 'decay',
                knobName: 'decay',
                author: ''
              },
              {
                title: 'amount',
                knobName: 'amount',
                author: ''
              }
            ]
          },
          {
            moduleName: "lfo",
            title: "LFO",
            icon: 'lfo',
            items: [
              {
                title: 'frequency',
                knobName: 'frequency',
                author: ''
              },
              {
                title: 'amount',
                knobName: 'amount',
                author: ''
              },
              {
                title: 'type',
                knobName: 'type',
                author: ''
              }
            ]
          },
          {
            moduleName: "router",
            title: "Router",
            icon: 'router',
            items: [
              {
                title: 'lfo',
                knobName: 'lfo',
                author: ''
              },
              {
                title: 'envelope2',
                knobName: 'envelope2',
                author: ''
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
