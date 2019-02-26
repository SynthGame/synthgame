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
            <span>{{ group.title }}</span>
            <svg
              v-if="group.icon === 'osc'"
              class="navigation--group-icon"
              viewBox="0 0 29 29"
              width="29"
              height="29"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fill-rule="evenodd">
                <path class="navigation--group-fill" d="M0 0h29v29H0z"></path>
                <path fill="#000" d="M.228 14.5h15.959v6.903L29 15.831V14.5H16.187V6.959z"></path>
              </g>
            </svg>
            <svg
              v-else-if="group.icon === 'filter'"
              class="navigation--group-icon"
              viewBox="0 0 29 29"
              width="29"
              height="29"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fill-rule="evenodd">
                <path fill="#000" d="M0 0h29v29H0z"></path>
                <path
                  class="navigation--group-fill"
                  d="M0 0h29v25.785C19.04 13.708 9.373 7.775 0 7.985-9.373 8.192-9.373 5.531 0 0z"
                ></path>
              </g>
            </svg>
            <svg
              v-else-if="group.icon === 'lfo'"
              class="navigation--group-icon"
              viewBox="0 0 29 29"
              width="29"
              height="29"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fill-rule="evenodd">
                <path class="navigation--group-fill" d="M0 0h29v29H0z"></path>
                <path d="M14 8.07V0h1v8a7 7 0 1 1-1 .07z" fill="#000"></path>
              </g>
            </svg>
            <svg
              v-else-if="group.icon === 'envelope'"
              class="navigation--group-icon"
              viewBox="0 0 29 29"
              width="29"
              height="29"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fill-rule="evenodd">
                <path fill="#000" d="M0 0h29v29H0z"></path>
                <path class="navigation--group-fill" d="M0 0h29v24.211L18.04 10.065H0z"></path>
              </g>
            </svg>
            <svg
              v-else-if="group.icon === 'envelope2'"
              class="navigation--group-icon"
              viewBox="0 0 29 29"
              width="29"
              height="29"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fill-rule="evenodd">
                <path fill="#000" d="M0 0h29v29H0z"></path>
                <path class="navigation--group-fill" d="M0 0h29v29H11.42L0 7.774z"></path>
              </g>
            </svg>
            <svg
              v-else-if="group.icon === 'router'"
              class="navigation--group-icon"
              viewBox="0 0 29 29"
              width="29"
              height="29"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fill-rule="evenodd">
                <path class="navigation--group-fill" d="M0 0h29v29H0z"></path>
                <circle fill="#000" cx="15" cy="15" r="3"></circle>
              </g>
            </svg>
            <svg
              viewBox="0 0 27 13"
              v-else-if="group.icon === 'sequencer'"
              class="navigation--group-icon"
              width="29"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="navigation--group-fill"
                fill="fff"
                fill-rule="evenodd"
                d="M0 0h27v13H0V0zm4.5 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
              ></path>
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
            <div class="screen--title">Create
              <br>Your
              <br>Song!
            </div>
            <router-link to="/" class="btn btn_link btn_primary">
              <span class="btn--inner">
                <span class="btn--inner-text">or Play a game</span>
              </span>
            </router-link>
          </div>
          <div class="screen--footer">
            <div class="screen--footer-inner">
              <button @click="startButton()" class="btn btn_stroke btn_primary">
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
              <button @click="toggle1stScreen()" class="btn btn_navigation" :class="{'is-active' : show1stScreen}">
                <span class="btn--inner">
                  <span class="btn--inner-text">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="feather feather-menu"
                      viewBox="0 0 24 24"
                    >
                      <line x1="3" x2="21" y1="12" y2="12"></line>
                      <line x1="3" x2="21" y1="6" y2="6"></line>
                      <line x1="3" x2="21" y1="18" y2="18"></line>
                    </svg>
                  </span>
                </span>
              </button>
              <button @click="toggle3dScreen()" class="u-ml_a btn btn_leaderboard" :class="{'is-active' : show3rdScreen}">
                <span class="btn--inner">
                  <span class="btn--inner-text">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="feather feather-target"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                  </span>
                </span>
              </button>
            </div>
          </div>
          <div class="screen--inner">
            <transition name="fade" appear mode="out-in" :duration="300">
              <oscillator-module-one v-if="moduleIsUseable('oscillator1')"/>
              <oscillator-module-two v-else-if="moduleIsUseable('oscillator2')"/>
              <filter-module v-else-if="moduleIsUseable('filter')"/>
              <envelope-module v-else-if="moduleIsUseable('envelope')"/>
              <lfo-module v-else-if="moduleIsUseable('lfo')"/>
              <envelope-module-two v-else-if="moduleIsUseable('envelope2')"/>
              <sequencer-module
                v-else-if="moduleIsUseable('sequencer')"
                :sequencer-name="nav.active.knobName"
              />
              <router-module v-else-if="moduleIsUseable('router')"/>
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
    <div
      :style="disableCol"
      :class="`screen screen_score screen_3 screen_score_desktop ${show3rdScreen ? 'is-active' : '' }`"
    >
      <div class="screen--header hide-mobile">
        <div class="screen--header-inner u-mr_0">
          <div />
          <div />
          <router-link to="/" class="btn btn_link btn_primary">
            <span class="btn--inner">
              <span class="btn--inner-text">or Play a game</span>
            </span>
          </router-link>
        </div>
      </div>
      <div class="screen--inner screen--inner_reduced">
        <div v-if="false" class="pads">
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
          <div v-if="!shareLink" class="play-with-friends">
            <button @click="generateShareLink" class="btn btn_stroke btn_primary">
              <span class="btn--inner">
                <span class="btn--inner-text">Play with friends</span>
              </span>
            </button>
          </div>
          <div v-if="shareLink" class="screen--share-inner">
            <div class="screen--share-url">
              <span>{{ shareLink }}</span>
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
import { mapState } from "vuex";

export default {
  name: "home",
  data() {
    return {
      activeModule: "oscillator1",
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
      show2ndScreen: true,
      show3rdScreen: false,
      pickedPreset: 0,
      pads: ["1", "2", "Q", "W", "A", "S", "Z", "X"]
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
    const contributionId = this.$route.params.contribution_id;
    if (contributionId !== "synth") {
      console.log(`contributionId ${contributionId}`);
      this.$store.commit("setContributionLink", { link: contributionId });
    }
    this.init();
    this.initSynth();
    // Pc keyboard listener (might be needed for mobile)
    document.addEventListener("touchstart", event => {
      if (audio.state.Tone.context.state !== "running") {
        audio.state.Tone.context.resume();
      }
    });
  },
  watch: {
  shareLink() {
    this.$store.dispatch("getContribution");
    },
  },
  beforeDestroy() {
    audio.stopOscTwo();
  },
  methods: {
    generateShareLink() {
      this.$store.dispatch("generateContributionLink");
    },
    setStep(i) {
      this.$store.commit("setStep", i);
    },
    padClick(event, pad) {
      // pad click logic goes here:
      // console.log(pad)
    },
    toggle1stScreen() {
      if (this.show1stScreen) {
        this.show1stScreen = false
      } else {
        this.show1stScreen = true
        this.show3rdScreen = false
      }
    },
    toggle3dScreen() {
      if (this.show3rdScreen) {
        this.show3rdScreen = false
      } else {
        this.show3rdScreen = true
        this.show1stScreen = false
      }
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
          this.setStep(note);
          if (this.sequence[note].selected) {
            // if preview, use octave(frequency) from goal in store

            audio.playNote(this.sequence[note].pitch, {
              noteLength: "8n",
              volume: this.sequence[note].volume
                ? this.sequence[note].volume
                : 0,
              time: note,
              glide: this.sequence[note].glide ? this.sequence[note].glide : 0,
              octaveOsc1:
                self.$store.state.audioParameters.oscillator1.frequency,
              octaveOsc2:
                self.$store.state.audioParameters.oscillator2.frequency
            });
          }
          if (this.sequence[note].kick) {
            audio.playKick();
          }
          if (this.sequence[note].hat) {
            audio.playHat();
          }
          if (this.sequence[note].clap) {
            audio.playClap();
          }
          if (this.sequence[note].clap2) {
            audio.playClap2();
          }
          if (this.sequence[note].cymbal) {
            audio.playCymbal();
          }
          if (this.sequence[note].labmyc) {
            audio.playLabmyc();
          }
          if (this.sequence[note].noise) {
            audio.playNoise();
          }
          if (this.sequence[note].snare) {
            audio.playSnare();
          }
        }
      );
      audio.startOscTwo();
      this.toneLoop.start();
    },
    startButton() {
      this.showSvoosh();
    },

    // SWOOSH that shows up on the beginning only
    showSvoosh() {
      this.isThereSvooshComponent = true;
      this.$nextTick(() => (this.svooshIt = true));
    },
    midwaySvoosh() {
      this.slide = null;
      this.activeScreen(0, 0)
      this.show1stScreen = false;
      this.show2ndScreen = true;
      this.show3rdScreen = false;
    },
    hideSvoosh() {
      setTimeout(() => {
        this.isThereSvooshComponent = false;
        this.svooshIt = false;
      }, 300);
    },

    activeScreen(index, key) {
      this.show1stScreen = false;
      this.show2ndScreen = true;
      this.show3rdScreen = false;
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
    ...mapState({
      sequence: state => state.sequence
    }),
    shareLink() {
      return this.$store.state.contributionId;
    },
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
        return [
          {
            opacity: 1
          },
          {
            pointerEvents: "auto"
          }
        ];
      } else {
        return [
          {
            opacity: 0.2
          },
          {
            pointerEvents: "none"
          }
        ];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .screen--inner_reduced {
    height: calc(100vh - 58px);
    @media screen and (max-width: 799px) {
      .screen--share {
        margin: 0 auto;
        p {
          margin-bottom: 20px;
          text-align: center;
        }
        .btn {
          margin-left: 0;
        }
      }
    }
    @media screen and (min-width: 800px) {
      .screen--share {
        p {
          margin-bottom: 20px;
          text-align: right;
        }
      }
    }
  }
</style>
