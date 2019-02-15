<template>
<div class="cols">
  <nav :class="`screen navigation ${showModules ? 'is-active' : ''}`">
    <div class="navigation--inner">
      <div 
        v-for="(group, index) in nav.groups" 
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
          <li v-for="(item, key) in group.items" :key="key" class="navigation--item" :class="{'is-disabled' : lvlScore(item.score) <= 0 }">
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
    <start-screen v-if="showStartScreen" @startLevel="startGame()"/>
    <template v-if="showGame">
      <div class="hide-desktop screen--header">
        <div class="screen--header-inner">
          <button @click="toggleNavigation()" class="btn btn_link btn_primary">
            <span class="btn--inner">
              <span class="btn--inner-text">{{ showModules ? 'Modules >' : '< Modules' }}</span>
            </span>
          </button>
          <div class="screen--attempts">
            <svg v-for="(i) in totalAttempts/2" :key="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
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
        <!-- ATTEMPT -->
        <!-- <div class="attempt-navigation"> -->
          <button
            v-if="!completedLevel"
            @click="makeAttempt"
            class="btn_full btn btn_stroke btn_primary">
            <span class="btn--inner">
              <span class="btn--inner-text">Submit</span>
            </span>
          </button>
          <button
            v-else
            @click="startNextLevel"
            class="btn_full btn btn_stroke btn_primary btn_next">
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
      <div class="screen--score">
        <div class="screen--score-title">Bart</div>
        <div class="screen--score-value">0</div>
      </div>
      <div class="pyro">
        <div class="before"></div>
        <div class="after"></div>
      </div>
      <div style="margin-top: 40px" class="screen--attempts">
        <svg v-for="(i) in totalAttempts/2" :key="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <defs>
            <clipPath id="half">
              <rect x="0" y="0" width="24.5" height="48" />
            </clipPath>
          </defs>
          <path v-if="i <= (totalAttempts - attempts) / 2" class="screen--attempts-fill" d="M23.993 15.872l1.016-.889a7.313 7.313 0 0 1 4.853-1.834c2.032 0 4.035.832 5.489 2.455a7.314 7.314 0 0 1-.339 10.06l-9.828 8.735a1.795 1.795 0 0 1-2.382 0l-9.814-8.735c-2.751-2.695-2.935-7.125-.339-10.06a7.337 7.337 0 0 1 5.489-2.455 7.34 7.34 0 0 1 4.853 1.834l1.002.889" />
          <path v-if="i - 0.5 === (totalAttempts - attempts) / 2" clip-path="url(#half)" class="screen--attempts-fill" d="M23.993 15.872l1.016-.889a7.313 7.313 0 0 1 4.853-1.834c2.032 0 4.035.832 5.489 2.455a7.314 7.314 0 0 1-.339 10.06l-9.828 8.735a1.795 1.795 0 0 1-2.382 0l-9.814-8.735c-2.751-2.695-2.935-7.125-.339-10.06a7.337 7.337 0 0 1 5.489-2.455 7.34 7.34 0 0 1 4.853 1.834l1.002.889" />
          <path class="screen--attempts-stroke" d="M23.993 15.872l1.016-.889a7.313 7.313 0 0 1 4.853-1.834c2.032 0 4.035.832 5.489 2.455a7.314 7.314 0 0 1-.339 10.06l-9.828 8.735a1.795 1.795 0 0 1-2.382 0l-9.814-8.735c-2.751-2.695-2.935-7.125-.339-10.06a7.337 7.337 0 0 1 5.489-2.455 7.34 7.34 0 0 1 4.853 1.834l1.002.889" />
        </svg>
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
      activeModule: 0,
      totalAttempts: 10,
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
      pickedPreset: 0,
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

  },
  created() {
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
    document.addEventListener("mouseup", event => {
      // log to analytics
      this.$router.push("?level=" + (this.level + 1) + "&" + event.screenX);
    });
  },
  methods: {
    toggleNavigation() {
      this.showModules = !this.showModules
    },
    makeAttempt() {
      this.$store.dispatch("madeAttempt");
      // this.failedLevel()
    },
    startGame() {
       this.activeScreen(0, 0);
    },
    isGroupActive(group, index) {
      let isThereActiveItemInGroup = group.items.some(item => {
        return this.lvlScore(item.score) > 0;
      });
      return index === 0 ? false : !isThereActiveItemInGroup;
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
    startNextLevel() {
      this.$store.commit("increaseLevelValue", 1);
      this.startLevelPreview(this.level); // TODO: should be + 1
      this.$store.commit({
        type: "setCompletedLevel",
        value: false
      });
    },
    startLevel(level) {
      this.beginSvoosh()
    },
    // LEVEL 
    gotToPreview(level) {
      this.$nextTick(() => {
        // disable all overlays when svoosh is done
        // this.displaySuccessOverlay = false;
        this.displayFailureOverlay = false;
        this.displayStartOverlay = false;
        this.displayPreviewOverlay = true;
      });
    },
    // // // //
    startLevelPreview(level) {
      this.beginSvoosh();
     
      this.gotToPreview();

      audio.playSweep();
      this.$router.push("?level=" + (level + 1));
      window.parent.postMessage("play-game-activated", "*");


      // randomly pick preset
      this.pickedPreset = Math.round(Math.random() * (presets.length - 1));
      // console.log('pickedPreset =', this.pickedPreset);

      // load the preset on synth
      this.$store.commit("setAudioParameterToPreset", {
        preset: presets[this.pickedPreset].parameterValues
      });

      this.$store.commit("setFeaturedArtist", {
        artistName: presets[this.pickedPreset].name,
        avatarUrl: presets[this.pickedPreset].avatarUrl
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
      this.setToSelectedPreset();
      // console.log('preset audioParameters loaded: ', presets[this.pickedPreset].parameterValues );

      // Set back Envs to standard audioParameters

      // Set LFO amount to 0 TODO only when level is under lfo level check which level that is

      // Set bpm from preset
      audio.setBpm(presets[this.pickedPreset].bpm * 2);
      // Set bpm in store
      this.$store.commit("setPresetBpm", presets[this.pickedPreset].bpm);

      // Set noteArray to sequence preset locally
      this.noteArray = presets[this.pickedPreset].sequenceArray;

      // import level config
      const availableParameters = levels[level];

      this.$store.dispatch("startNewLevel", {
        knobsAvailable: availableParameters,
        levelNumber: level || 0
      });
      this.$store.commit("setGoalToPreset", {
        preset: Object.assign(presets[this.pickedPreset].parameterValues, {})
      });

      console.log(availableParameters);

      this.$store.dispatch("randomizeAudioParameters", availableParameters); // and the audio params

      // this.$nextTick(() => this.$store.dispatch("setSynthToGoal", audio)); //then let the user hear it

      // this.loop.start()
      // rest will be done by watcher of sequencesPassedInCurrentLevel
    },
    setToSelectedPreset() {
      this.$store.commit("setAudioParameterToPreset", {
        preset: presets[this.pickedPreset].parameterValues
      });
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
    },
    startPreset(parameters, bpm) {
      const usedParameters = mapValues(parameters, audioModule =>
        mapValues(audioModule, parameter => !!parameter)
      );

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
      // rest will be done by watcher of sequencesPassedInCurrentLevel
    },
    beginSvoosh() {
      this.showStartScreen = false;
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


      const lvl = this.nav.groups[index].items[key].score

      this.goToLevel(lvl) // CHANGE to lvl
  
      this.startLevelPreview(lvl);

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
      return this.$store.state.gameState.levels[lvl].levelData.score;
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
  },
};
</script>

<style lang="scss">
</style>
