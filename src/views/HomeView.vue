<template>
  <div class="cols">
    <nav :class="`screen navigation ${show1stScreen ? 'is-active' : ''}`">
      <div class="navigation--inner">
        <div
          v-for="(group, index) in nav.groups"
          v-if="group.moduleName != 'sequencer'"
          :key="index"
          :class="[
          `navigation--group_${group.title.toLowerCase().replace(' ', '')}`,
          'navigation--group',
          {
            'is-disabled': isGroupActive(group, index)
          }
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
            <li
              v-for="(item, key) in group.items"
              :key="key"
              class="navigation--item"
              :class="{'is-disabled' : !(index == 0 && key == 0) && lvlScore(item.score) <= 0 }"
            >
              <button class="navigation--item-btn" @click="activeScreen(index, key)">
                <span class="navigation--item-inner">
                  <span class="navigation--item-text">
                    <span class="navigation--item-title">
                      <span>{{ item.knobName }}</span>
                    </span>
                    <span>{{ lvlScore(item.score) }}</span>
                  </span>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="screen">
      <div v-if="slide !== null" class="screen screen_score screen_start">
        <transition name="fade" mode="in-out" appear>
          <div v-show="slide === 1" class="hide-desktop screen--header">
            <div class="screen--header-inner">
              <button @click="slide = 0" class="btn btn_link btn_primary">
                <span class="btn--inner">
                  <span class="btn--inner-text">< Back</span>
                </span>
              </button>
              <div class="screen--header-title"></div>
            </div>
          </div>
        </transition>
        <transition name="fade" mode="out-in" appear>
          <div key="1" v-if="slide === 0" class="screen--inner">
            <div class="screen--title">Match
              <br>The
              <br>Sound
            </div>
            <router-link to="/contribution" class="btn btn_link btn_primary hide-desktop">
              <span class="btn--inner">
                <span class="btn--inner-text">or Make a song</span>
              </span>
            </router-link>
            <div class="screen--score">
              <div class="screen--score-title">Score</div>
              <div class="screen--score-value">0</div>
            </div>
          </div>
          <!-- sound preview screen -->
          <div key="2" v-else-if="slide === 1" class="screen--inner">
            <div class="screen--preview">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              <p>Listen closely to the goal sound, then hit continue and try to match the sound.</p>
            </div>
          </div>
        </transition>
        <div class="screen--footer">
          <div class="screen--footer-inner">
            <button
              @click="(previewTimer <= 0 && (slide === 0 ? startNextLevel() : enterLevel()))"
              :class="['btn', 'btn_stroke', 'btn_primary', {'is-disabled': previewTimer > 0}]"
            >
              <span class="btn--inner">
                <span class="btn--inner-text">{{ previewTimer > 0 ? previewTimer : 'Continue' }}</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <template v-else>
        <div class="hide-desktop screen--header">
          <div class="screen--header-inner">
            <button @click="toggle1stScreen()" class="btn btn_navigation">
              <span class="btn--inner">
                <span class="btn--inner-text">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-menu" viewBox="0 0 24 24">
                    <line x1="3" x2="21" y1="12" y2="12"/>
                    <line x1="3" x2="21" y1="6" y2="6"/>
                    <line x1="3" x2="21" y1="18" y2="18"/>
                  </svg>
                </span>
              </span>
            </button>
            <div class="screen--attempts">
              <svg
                v-for="(i) in totalAttempts/2"
                :key="i"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <defs>
                  <clipPath id="half">
                    <rect x="0" y="0" width="24.5" height="48"></rect>
                  </clipPath>
                </defs>
                <path
                  v-if="i <= (totalAttempts - attempts) / 2"
                  class="screen--attempts-fill"
                  d="M23.993 15.872l1.016-.889a7.313 7.313 0 0 1 4.853-1.834c2.032 0 4.035.832 5.489 2.455a7.314 7.314 0 0 1-.339 10.06l-9.828 8.735a1.795 1.795 0 0 1-2.382 0l-9.814-8.735c-2.751-2.695-2.935-7.125-.339-10.06a7.337 7.337 0 0 1 5.489-2.455 7.34 7.34 0 0 1 4.853 1.834l1.002.889"
                ></path>
                <path
                  v-if="i - 0.5 === (totalAttempts - attempts) / 2 "
                  clip-path="url(#half)"
                  class="screen--attempts-fill"
                  d="M23.993 15.872l1.016-.889a7.313 7.313 0 0 1 4.853-1.834c2.032 0 4.035.832 5.489 2.455a7.314 7.314 0 0 1-.339 10.06l-9.828 8.735a1.795 1.795 0 0 1-2.382 0l-9.814-8.735c-2.751-2.695-2.935-7.125-.339-10.06a7.337 7.337 0 0 1 5.489-2.455 7.34 7.34 0 0 1 4.853 1.834l1.002.889"
                ></path>
                <path
                  class="screen--attempts-stroke"
                  d="M23.993 15.872l1.016-.889a7.313 7.313 0 0 1 4.853-1.834c2.032 0 4.035.832 5.489 2.455a7.314 7.314 0 0 1-.339 10.06l-9.828 8.735a1.795 1.795 0 0 1-2.382 0l-9.814-8.735c-2.751-2.695-2.935-7.125-.339-10.06a7.337 7.337 0 0 1 5.489-2.455 7.34 7.34 0 0 1 4.853 1.834l1.002.889"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="screen--inner">
          <oscillator-module-one
            v-show="moduleIsUseable('oscillator1')"
            :class="[(activeModule == 0 ? 'active' : '')]"
          />
          <oscillator-module-two
            v-show="moduleIsUseable('oscillator2')"
            :class="[(activeModule == 1 ? 'active' : '')]"
          />
          <filter-module
            v-show="moduleIsUseable('filter')"
            :class="[(activeModule == 2 ? 'active' : '')]"
          />
          <envelope-module
            v-show="moduleIsUseable('envelope')"
            :class="[(activeModule == 3 ? 'active' : '')]"
          />
          <lfo-module v-show="moduleIsUseable('lfo')" :class="[(activeModule == 4 ? 'active' : '')]"/>
          <envelope-module-two
            v-show="moduleIsUseable('envelope2')"
            :class="[(activeModule == 5 ? 'active' : '')]"
          />
          <sequencer-module
            v-if="createModeIsActive"
            :class="[(activeModule == 7 ? 'active' : '')]"
            class="module sequencer"
          />
          <router-module
            v-show="moduleIsUseable('router')"
            :class="[(activeModule == 6 ? 'active' : '')]"
          />
          <!-- ATTEMPT -->
          <!-- <div class="attempt-navigation"> -->
          <button
            v-if="!completedLevel"
            @click="makeAttempt"
            class="btn_full btn btn_stroke btn_primary"
          >
            <span class="btn--inner">
              <span class="btn--inner-text">Submit</span>
            </span>
          </button>
          <!-- DISPLAY PREVIEW -->
          <button
            v-else
            @click="startNextLevel"
            class="btn_full btn btn_stroke btn_primary btn_next"
          >
            <span class="btn--inner">
              <span class="btn--inner-text">Next</span>
            </span>
          </button>
          <!-- </div> -->
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
      <div class="screen--inner">
        <div class="screen--header hide-mobile">
          <div class="screen--header-inner u-mr_0">
            <div />
            <div />
            <router-link to="/contribution" class="btn btn_link btn_primary">
              <span class="btn--inner">
                <span class="btn--inner-text">or Make a song</span>
              </span>
            </router-link>
          </div>
        </div>
        <div class="leaderboard">
          <div class="leaderboard--title">
            <span class="leaderboard--title-inner">
              <span>Leaderboard</span>
            </span>
          </div>
          <ul class="leaderboard--list">
            <li v-for="(score, index) in highscores" :key="index" :class="`leaderboard--list-item ${i === 24 ? 'is-active' : ''}`">
              <div class="leaderboard--name">
                {{ score.name }}
              </div>
              <div class="leaderboard--value">{{score.score}}</div>
            </li>
          </ul>
        </div>
        <div style="margin-top: 30px" class="u-ml_a screen--attempts">
          <svg
            v-for="(i) in totalAttempts/2"
            :key="i"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <defs>
              <clipPath id="half">
                <rect x="0" y="0" width="24.5" height="48"></rect>
              </clipPath>
            </defs>
            <path
              v-if="i <= (totalAttempts - attempts) / 2"
              class="screen--attempts-fill"
              d="M23.993 15.872l1.016-.889a7.313 7.313 0 0 1 4.853-1.834c2.032 0 4.035.832 5.489 2.455a7.314 7.314 0 0 1-.339 10.06l-9.828 8.735a1.795 1.795 0 0 1-2.382 0l-9.814-8.735c-2.751-2.695-2.935-7.125-.339-10.06a7.337 7.337 0 0 1 5.489-2.455 7.34 7.34 0 0 1 4.853 1.834l1.002.889"
            ></path>
            <path
              v-if="i - 0.5 === (totalAttempts - attempts) / 2"
              clip-path="url(#half)"
              class="screen--attempts-fill"
              d="M23.993 15.872l1.016-.889a7.313 7.313 0 0 1 4.853-1.834c2.032 0 4.035.832 5.489 2.455a7.314 7.314 0 0 1-.339 10.06l-9.828 8.735a1.795 1.795 0 0 1-2.382 0l-9.814-8.735c-2.751-2.695-2.935-7.125-.339-10.06a7.337 7.337 0 0 1 5.489-2.455 7.34 7.34 0 0 1 4.853 1.834l1.002.889"
            ></path>
            <path
              class="screen--attempts-stroke"
              d="M23.993 15.872l1.016-.889a7.313 7.313 0 0 1 4.853-1.834c2.032 0 4.035.832 5.489 2.455a7.314 7.314 0 0 1-.339 10.06l-9.828 8.735a1.795 1.795 0 0 1-2.382 0l-9.814-8.735c-2.751-2.695-2.935-7.125-.339-10.06a7.337 7.337 0 0 1 5.489-2.455 7.34 7.34 0 0 1 4.853 1.834l1.002.889"
            ></path>
          </svg>
        </div>
      </div>
      <div class="screen--share">
        <p>Share this link to challenge your Friends!</p>
        <div v-if="!userName" class="username_container">
          <input class="username_input" v-model="userName" type="text" placeholder="Username"/>
          <button class="btn btn_stroke btn_primary btn-username" @click="setUsername">ENTER</button>
        </div>
        <div v-if="!shareLink" class="play-with-friends">
          <button @click="generateShareLink" class="btn btn_stroke btn_primary">PLAY WITH FRIENDS</button>
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
import { vuexSyncGenSequence } from "@/utils";
import audio from "../audio.js";
import presets from "@/presets";
import character from "@/character";
import levels from "@/levels";
import range from "lodash/range";
import Nav from "@/game_nav";
import { setInterval, clearTimeout } from 'timers';

export default {
  name: "home",
  data() {
    return {
      i: 0,
      userName: null,
      displayPreviewOverlay: false,
      activeModule: 0,
      totalAttempts: 10,
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
      show1stScreen: false,
      showGame: false,
      pickedPreset: 0,
      timer: null,
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
    this.showStartScreen = true;
  },
  created() {
    if(this.timer != null) {
      clearInterval(this.timer);
    }
    const roomId = this.$route.params.user_id;
    if (roomId !== "game") {
      console.log(`ROOM ID ${roomId}`);
      this.$store.commit("setRoomId", { roomId });
    }
    this.init();
    this.initSynth();
    if (this.$route.query.preset) {
      // window.parent.postMessage(this.$route.query.preset, '*'); uncommented because confusing if we're sending old id too
      // console.log('id',this.$route.query.preset);
      this.customLevelIsActive = true;
      this.displayStartOverlay = false;
      this.showCreatePreview = true;
      getPresetById(this.$route.query.preset).then(data => {
        this.$store.commit("setFeaturedArtist", {
          artistName: data.name,
          avatarUrl: data.avatarUrl
        });
        console.log(data.parameterValues);
        this.startPreset(data.parameterValues);
      });
    } else if (
      window.location.href.indexOf("tats") != -1 ||
      window.location.href.indexOf("jobboard") != -1
    ) {
      this.customLevelIsActive = true;
      this.displayStartOverlay = false;
      this.$store.commit("setCreateMode", true);
    }

    window.letsPlay = () => this.initM();

    // Pc keyboard listener (might be needed for mobile)
    document.addEventListener("keypress", event => {
      if (audio.state.Tone.context.state !== "running") {
        audio.state.Tone.context.resume();
      }

      if (event.keyCode === 27 && this.displayOriginalOverlay) {
        this.killOrignalSoundPrompt();
      }
      // const key = event.key
    });

    // mouseup listener (needed to trace events)
    // document.addEventListener("mouseup", event => {
    //   // log to analytics
    //   this.$router.push("?level=" + (this.level + 1) + "&" + event.screenX);
    // });
  },
  watch: {
    watchRoomId() {
      this.$store.dispatch("updateRoom");
    }
    // show2ndScreen(val) {
    //   console.log(`SHowe Start ${val}`)
    //   if(val) {
    //     this.goToLevel(this.level + 1);
    //   }
    // }
  },
  methods: {
    refreshRouting() {
      audio.connectLfo(this.$store.state.audioParameters.router.lfo);
      audio.connectEnvelope2(
        this.$store.state.audioParameters.router.envelope2
      );
      audio.filter.state.device.frequency.value = character.filter.cutOffFreq(
        this.$store.state.audioParameters.filter.cutOffFreq
      );
    },
    setUsername() {
      console.log(this.userName);
      this.$store.commit("setUsername", { userName: this.userName });
    },
    generateShareLink() {
      this.$store.dispatch("createNewRoom");
    },
    toggle1stScreen() {
      this.show1stScreen = !this.show1stScreen;
    },
    makeAttempt() {
      this.$store.dispatch("madeAttempt");
      // this.failedLevel()
    },
    startGame() {
      this.slide = 1;
      this.goToLevel(0);
    },
    isGroupActive(group, index) {
      let isThereActiveItemInGroup = group.items.some(item => {
        return this.lvlScore(item.score) > 0;
      });
      return index === 0 ? false : !isThereActiveItemInGroup;
    },
    init() {
      // Retrieve highscore from local storage
      // this.$store.did("updateHighScore", localStorage.getItem("highscore"));
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
          if (this.sequence[note].selected) {
            // if preview, use octave(frequency) from goal in store
            if (!this.attemptActive) {
              audio.playNote(this.sequence[note].pitch, {
                noteLength: "8n",
                volume: this.sequence[note].volume
                  ? this.sequence[note].volume
                  : 0,
                time: note,
                glide: this.sequence[note].glide
                  ? this.sequence[note].glide
                  : 0,
                octaveOsc1:
                  self.$store.state.gameState.goal.oscillator1.frequency,
                octaveOsc2:
                  self.$store.state.gameState.goal.oscillator2.frequency
              });
            } else {
              audio.playNote(this.sequence[note].pitch, {
                noteLength: "8n",
                volume: this.sequence[note].volume
                  ? this.sequence[note].volume
                  : 0,
                time: note,
                glide: this.sequence[note].glide
                  ? this.sequence[note].glide
                  : 0,
                octaveOsc1:
                  self.$store.state.audioParameters.oscillator1.frequency,
                octaveOsc2:
                  self.$store.state.audioParameters.oscillator2.frequency
              });
            }
          }
          if (this.sequence[note].kick && this.completedLevel) {
            audio.playKick();
          }
          if (this.sequence[note].hat && this.completedLevel) {
            audio.playHat();
          }
          if (this.sequence[note].clap && this.completedLevel) {
            audio.playClap();
          }
          if (this.sequence[note].clap2 && this.completedLevel) {
            audio.playClap2();
          }
          if (this.sequence[note].cymbal && this.completedLevel) {
            audio.playCymbal();
          }
          if (this.sequence[note].labmyc && this.completedLevel) {
            audio.playLabmyc();
          }
          if (this.sequence[note].noise && this.completedLevel) {
            audio.playNoise();
          }
          if (this.sequence[note].snare && this.completedLevel) {
            audio.playSnare();
          }
        }
      );
      this.toneLoop.start();
    },
    startNextLevel() {
      const newLevel = this.level + 1;
      this.goToLevel(newLevel);
      this.$store.commit({
        type: "setCompletedLevel",
        value: false
      });
    },
    // for entering lvl
    enterLevel(level) {
      console.log("triggered enterLevel in homeview");
      // this.beginSvoosh()
      // Set to RANDOMIZE PARAM in SOUND ENGINE.
      this.$store.dispatch("setSynthToAudioParameters", audio);
      this.setSoundToRandom();
      this.displayPreviewOverlay = false;
      this.slide = null;
    },
    setSoundToRandom() {
      const { device, paramater } = levels[this.level].levelData;
      console.log(`${device}, ${paramater}`);
      this.$store.dispatch("randomizeAudioParameters", { device, paramater });
    },
    // LEVEL
    // // // //
    startLevelPreview(level) {

      this.cheekySvoosh();
      console.log("startLevelPreview triggered");
      
      this.$store.commit('resetPreviewTimer');

      this.$nextTick(() => {
        // disable all overlays when svoosh is done
        // this.displaySuccessOverlay = false;
        this.displayFailureOverlay = false;
        // this.displayStartOverlay = false;
        this.displayPreviewOverlay = true;
        this.slide = 1;
      });

      audio.playSweep();
      this.$router.push("?level=" + (level + 1));
      window.parent.postMessage("play-game-activated", "*");

      // randomly pick preset
      this.pickedPreset = Math.round(Math.random() * (presets.length - 1));

      // SET GOAL TO GOAL SOUND
      this.$store.commit("setGoalToPreset", {
        // preset: Object.assign(presets[this.pickedPreset].parameterValues, {})
        preset: JSON.parse(
          JSON.stringify(presets[this.pickedPreset].parameterValues)
        )
      });

      // SET AUDIO PARAMS TO NEW GOAL SOUND
      this.$store.commit("setAudioParameterToPreset", {
        preset: presets[this.pickedPreset].parameterValues
      });

      // SET AUDIO to AUDIO PARAMS
      this.$store.dispatch("setSynthToGoal", audio);

      this.$store.commit("setFeaturedArtist", {
        artistName: presets[this.pickedPreset].name,
        avatarUrl: presets[this.pickedPreset].avatarUrl
      });

      // set correct routing
      this.refreshRouting();

      //and again to correct pitch
      // load the preset on synth
      // console.log('preset audioParameters loaded: ', presets[this.pickedPreset].parameterValues );

      // Set back Envs to standard audioParameters

      // Set LFO amount to 0 TODO only when level is under lfo level check which level that is

      // Set bpm from preset
      audio.setBpm(presets[this.pickedPreset].bpm * 2);
      // Set bpm in store
      this.$store.commit("setPresetBpm", presets[this.pickedPreset].bpm);

      // Set noteArray to sequence preset locally
      this.sequence = presets[this.pickedPreset].sequenceArray;

      // import level config
      const availableParameters = levels[level];

      this.$store.dispatch("startNewLevel", {
        knobsAvailable: availableParameters,
        levelNumber: level || 0
      });

      let self = this

      self.timer = setInterval(() => {
        self.$store.commit('decrementPreviewTimer');
        if(self.timer.previewTimer === 0){
          clearInterval(self.timer);
          return false
        }
      }, 1000);
    },
    startPreset(parameters, bpm) {
      const usedParameters = mapValues(parameters, audioModule =>
        mapValues(audioModule, parameter => !!parameter)
      );

      console.log("startPreset triggered");
      // disable all overlays
      // this.displaySuccessOverlay = false;
      this.displayFailureOverlay = false;
      this.displayStartOverlay = false;
      this.displayPreviewOverlay = false;
      this.showCreatePreview = true;

      this.$store.dispatch("startNewLevel", {
        knobsAvailable: usedParameters,
        levelNumber: 0 //
      });
      this.$store.commit("setGoalToPreset", {
        preset: parameters
      });
      // this.$store.dispatch('randomizeAudioParameters', usedParameters) // and the audio params
      this.$store.dispatch("setSynthToGoal", audio); // then let the user hear it

      this.loop.start();
    },
    cheekySvoosh() {
      this.isThereSvooshComponent = true;
      this.$nextTick(() => (this.svooshIt = true));
      audio.playSweep();
    },
    beginSvoosh() {
      this.slide = null;
      this.isThereSvooshComponent = true;
      this.$nextTick(() => (this.svooshIt = true));
      audio.playSweep();
      // start platmode
    },
    endSvoosh() {
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

      const lvl = this.nav.groups[index].items[key].score;

      this.goToLevel(lvl); // CHANGE to lvl

      this.$store.commit("resetAttempts");

      //Trigger preview Screen + new sound.
    },
    moduleIsUseable(moduleName) {
      if (this.createModeIsActive) {
        return true;
      } else {
        return some(this.knobsAvailable[moduleName]); // some are truthy
      }
    },
    failedLevel() {},
    lvlScore(lvl) {
      let level = this.$store.state.gameState.levels[lvl];
      return level ? level.levelData.score : null;
    },
    goToLevel(level) {
      // Add check for lvl avalible....
      this.$store.commit("setLevelValue", level);
      this.startLevelPreview(level); // TODO: should be + 1
      this.$store.commit({
        type: "setCompletedLevel",
        value: false
      });
    }
  },
  computed: {
    previewClasses() {
      return this.timer > 0 ? 'is-disabled' : '';
    },
    previewTimer() {
      return this.$store.state.gameState.previewTimer;
    },
    attemptActive() {
      return this.$store.state.gameState.attemptActive;
    },
    ...vuexSyncGenSequence("sequence", val => {}),
    highscores() {
      return this.$store.state.roomHighScores;
    },
    shareLink() {
      return this.$store.state.roomId
        ? `redbull.com/tats/${this.$store.state.roomId}`
        : false;
    },
    watchRoomId() {
      return this.$store.state.roomId;
    },
    nav() {
      return Nav;
    },
    attempts() {
      return this.$store.state.gameState.attempts;
    },
    level() {
      return this.$store.state.gameState.level;
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

<style lang="scss">
.play-with-friends {
  margin-top: 10px;
}

.username_input {
  border: 1px solid #fff;
  text-align: center;
  min-width: 184px;
}

.btn-username {
  min-width: 100px;
}

.username_container {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  margin-left: 15px;
}
</style>
