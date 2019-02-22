<template>
<div class="cols">
  <nav :style="disableCol" :class="`screen navigation ${show1stScreen ? 'is-active' : ''}`">
    <div class="navigation--inner">
      <div 
        v-for="(group, index) in nav.groups" 
        :key="index"
        :class="[
          `navigation--group_${group.title.toLowerCase().replace(' ', '')}`,
          'navigation--group'
        ]"
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
          <svg
              viewBox="0 0 27 13"
              v-else-if="group.icon === 'sequencer'"
              class="navigation--group-icon"
              width="29"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path class="navigation--group-fill" fill="fff" fill-rule="evenodd" d="M0 0h27v13H0V0zm4.5 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
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
                  <!-- here goes the author name -->
                  <!-- <span>{{ item.author }}</span> -->
                </span>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="screen">
    <transition name="fade" mode="out-in" appear>
      <div v-if="slide === 0" class="screen screen_score screen_start">
        <div class="screen--inner">
          <div class="screen--title">Create <br>Your<br>Song!</div>
        </div>
        <div class="screen--footer">
          <div class="screen--footer-inner">
            <button
              @click="startButton()"
              class="btn btn_stroke btn_primary">
              <span class="btn--inner">
                <span class="btn--inner-text">I'm ready!</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div v-else class="screen screen_score screen_start">
        <div class="hide-desktop screen--header">
          <div class="screen--header-inner">
            <button @click="toggle1stScreen()" class="btn btn_navigation">
              <span class="btn--inner">
                <span class="btn--inner-text">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 71">
                    <path d="M57 32h-2.581c-1.374-3.881-5.067-6.667-9.419-6.667S36.955 28.119 35.581 32H3a3 3 0 1 0 0 6h32.371c1.168 4.227 5.031 7.334 9.629 7.334s8.461-3.107 9.629-7.334H57a3 3 0 0 0 0-6z"/>
                    <path d="M57 58H24.419c-1.374-3.881-5.067-6.666-9.419-6.666S6.955 54.119 5.581 58H3a3 3 0 0 0 0 6h2.371c1.168 4.227 5.031 7.334 9.629 7.334s8.461-3.107 9.629-7.334H57a3 3 0 0 0 0-6z"/>
                    <path d="M3 13h2.371c1.168 4.227 5.031 7.333 9.629 7.333s8.461-3.107 9.629-7.333H57a3 3 0 1 0 0-6H24.419C23.045 3.119 19.352.333 15 .333S6.955 3.119 5.581 7H3a3 3 0 1 0 0 6z"/>
                  </svg>
                </span>
              </span>
            </button>
            <button @click="toggle3dScreen()" class="u-ml_a btn btn_leaderboard">
              <span class="btn--inner">
                <span class="btn--inner-text">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19 17h-7c-1.103 0-2 .897-2 2s.897 2 2 2h7c1.103 0 2-.897 2-2s-.897-2-2-2z"/>
                    <path d="M19 10h-7c-1.103 0-2 .897-2 2s.897 2 2 2h7c1.103 0 2-.897 2-2s-.897-2-2-2z"/>
                    <path d="M19 3h-7c-1.103 0-2 .897-2 2s.897 2 2 2h7c1.103 0 2-.897 2-2s-.897-2-2-2z"/>
                    <circle cx="5" cy="19" r="2.5"/>
                    <circle cx="5" cy="12" r="2.5"/>
                    <circle cx="5" cy="5" r="2.5"/>
                  </svg>
                </span>
              </span>
            </button>
          </div>
        </div>
        <div class="screen--inner">
          <transition name="fade" appear mode="out-in" :duration="400">
            <oscillator-module-one v-if="moduleIsUseable('oscillator1')" />
            <oscillator-module-two v-else-if="moduleIsUseable('oscillator2')" />
            <filter-module v-else-if="moduleIsUseable('filter')" />
            <envelope-module v-else-if="moduleIsUseable('envelope')" />
            <lfo-module v-else-if="moduleIsUseable('lfo')"/>
            <envelope-module-two v-else-if="moduleIsUseable('envelope2')" />
            <sequencer-module v-else-if="moduleIsUseable('sequencer')" />
            <router-module v-else-if="moduleIsUseable('router')" />
          </transition>
        </div>
      </div>
    </transition>
    <svoosh
      v-if="isThereSvooshComponent"
      :isFired="svooshIt"
      @midway="midwaySvoosh"
      @bye="hideSvoosh"
    />
  </div>
  <div :style="disableCol" :class="`screen screen_score screen_3 screen_score_desktop ${show3dScreen ? 'is-active' : '' }`">
    <div class="screen--inner">
      <div class="pads">
        <button
          v-for="(pad, index) in pads"
          :key="index"
          class="pads--item"
          @click="padClick($event, pad)"
        >
          <span class="pads--item-inner">
            <span class="pads--item-content">{{ pad }}</span>
          </span>
        </button>
      </div>
      <div class="screen--share">
        <p>Anyone with this link can join and create their song on top of this one.</p>
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
import { SYNTH_BPM } from "@/constants";
import audio from "../audio.js";
import presets from "@/presets";
import character from "@/character";
import levels from "@/levels";
import range from "lodash/range";
import Nav from "@/nav";

export default {
  name: "home",
  data() {
    return {
      activeModule: 'oscillator1',
      slide: 0,
      marginArray: [0, 0.2, 0.4, 0.6],
      oscillatorColor: MODULE_OSCILLATOR_COLOR,
      oscillatorTwoColor: MODULE_OSCILLATORTWO_COLOR,
      envelopeColor: MODULE_ENVELOPE_COLOR,
      filterColor: MODULE_FILTER_COLOR,
      lfoColor: MODULE_LFO_COLOR,
      routerColor: MODULE_ROUTER_COLOR,
      sequencerColor: MODULE_SEQUENCER_COLOR,
      isThereSvooshComponent: false,
      svooshIt: false,
      showGame: false,
      show1stScreen: false,
      show2ndScreen: false,
      show3dScreen: false,
      pickedPreset: 0,
      pads: ['1', '2', 'Q', 'W', 'A', 'S', 'Z', 'X']
    };
  },
  components: {
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
      this.show2ndScreen = true;
  },
  created() {
    this.init();
    this.initSynth();
  },
  methods: {
    padClick(event, pad) {
      // pad click logic goes here:
      // console.log(pad)
    },
    toggle1stScreen() {
      this.show1stScreen = !this.show1stScreen
    },
    toggle3dScreen() {
      this.show3dScreen = !this.show3dScreen
    },
    init() {
      // Retrieve highscore from local storage
      this.$store.commit("updateHighScore", localStorage.getItem("highscore"));
      // initialize the synth
      audio.init().toMaster();

      // set BPM
      audio.setBpm(SYNTH_BPM);
      // TODO: update drum animation in success overlay time animation

      // start tone general
      audio.start();
      // start loop
    },
    initSynth() {
      var self = this;
      this.toneLoop = audio.setMainLoop(
        {
          noteArray: range(0, 16),
          subdivision: "8n"
        },
        (time, note) => {
          // this.setStep(note)
          if (this.noteArray[note].selected) {
            // if preview, use octave(frequency) from goal in store
            if (this.displayPreviewOverlay) {
              audio.playNote(this.noteArray[note].pitch, {
                noteLength: "8n",
                volume: this.noteArray[note].volume
                  ? this.noteArray[note].volume
                  : 0,
                time: note,
                glide: this.noteArray[note].glide
                  ? this.noteArray[note].glide
                  : 0,
                octaveOsc1:
                  self.$store.state.gameState.goal.oscillator1.frequency,
                octaveOsc2:
                  self.$store.state.gameState.goal.oscillator2.frequency
              });
            } else {
              audio.playNote(this.noteArray[note].pitch, {
                noteLength: "8n",
                volume: this.noteArray[note].volume
                  ? this.noteArray[note].volume
                  : 0,
                time: note,
                glide: this.noteArray[note].glide
                  ? this.noteArray[note].glide
                  : 0,
                octaveOsc1:
                  self.$store.state.audioParameters.oscillator1.frequency,
                octaveOsc2:
                  self.$store.state.audioParameters.oscillator2.frequency
              });
            }
          }
          if (this.noteArray[note].kick && this.displayStartOverlay) {
            audio.playKick();
          }
          if (this.noteArray[note].hat && this.displayStartOverlay) {
            audio.playHat();
          }
          if (this.noteArray[note].clap && this.displayStartOverlay) {
            audio.playClap();
          }
          if (this.noteArray[note].clap2 && this.displayStartOverlay) {
            audio.playClap2();
          }
          if (this.noteArray[note].cymbal && this.displayStartOverlay) {
            audio.playCymbal();
          }
          if (this.noteArray[note].labmyc && this.displayStartOverlay) {
            audio.playLabmyc();
          }
          if (this.noteArray[note].noise && this.displayStartOverlay) {
            audio.playNoise();
          }
          if (this.noteArray[note].snare && this.displayStartOverlay) {
            audio.playSnare();
          }
        }
      );
      this.toneLoop.start();
    },
    startButton() {
      this.showSvoosh()
    },

    // SWOOSH that shows up on the beginning only
    showSvoosh() {
      this.isThereSvooshComponent = true
      this.$nextTick(() => (this.svooshIt = true));
    },
    midwaySvoosh() {
      this.slide = null
      this.activeScreen(0, 0)
    },
    hideSvoosh() {
      setTimeout(() => {
        this.isThereSvooshComponent = false;
        this.svooshIt = false;
      }, 300);
    },

    activeScreen(index, key) {
      this.show1stScreen = false;
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
    }
  },
  computed: {
    nav() {
      return Nav;
    },
    level() {
      return this.$store.state.gameState.level;
    },
    createModeIsActive() {
      return this.$store.state.gameState.createModeIsActive;
    },
    knobsAvailable() {
      return this.$store.state.gameState.knobsAvailable;
    },
    disableCol() {
      if (this.slide !== 0) {
        return [{
          opacity: 1
        },  {
          pointerEvents: 'auto'
        }]
      } else {
        return [{
          opacity: 0.2
        },  {
          pointerEvents: 'none'
        }]
      }
    }
  },
};
</script>
