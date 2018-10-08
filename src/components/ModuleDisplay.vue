<template>

    <div class="display" ref="displayWrapper">
      <svg width="100%" height="100%">
      <!-- <svg> -->
        <rect :fill="fill" width="100%" height="100%" />
        <!-- <rect fill="black" width="100%" height="100%" /> -->

        <path stroke="black"
              :stroke-width="strokeWidth"
              :d="path"
              fill="black"
              style="fill-rule: nozero"
              />

        <path v-if="this.module === 'oscillator' || this.module === 'filter' || this.module === 'envelope'"
              stroke="white"
              v-show="!createModeIsActive"
              :stroke-width="2"
              :d="pathGoal"
              fill="none"
              style="fill-rule: nozero"
              />

        <!-- lfo: -->
        <!--positioning wrapperfix -->
        <svg v-if="this.module === 'lfo'" :viewBox="lfoVB">

        <!-- the swing: -->
        <g v-if="this.module === 'lfo'" ref="swing"
          stroke="black"
          fill="black"
          :style="swingMovement"
          class="swingClass"
                          >
          <path
            :stroke-width="1"
            :fill="fill"
            :d="'m 0,'+ (-displayHeight/2)+
                ' v ' + (displayHeight)
                "/>

                <circle :cx="0" :cy="displayHeight*0.6" :r="displayHeight/4" />
          </g>

          <g v-if="this.module === 'lfo'"
            stroke="white"
            v-show="!createModeIsActive"
            fill="none"
            ref="swingGoal"
            :stroke-width="2"
            :style="goalSwingMovement"
            class="swingClass"
                            >
            <path
              :stroke-width="2"
              fill="none"
              stroke="white"
              :d="'m 0,'+ (-displayHeight/1.52)+
                  ' v ' + (displayHeight)
                  "/>

                  <circle :cx="0" :cy="displayHeight*0.6" :r="displayHeight/4"/>
            </g>
        </svg>
        <!-- Router -->
        <g v-if="this.module === 'router'" class="routerscreen" style="transform: scale(0.61) translateY(-3px) translateX(8px); transition: all 0s;">



<!-- <svg width="248px" height="118px" viewBox="0 0 248 118" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> -->
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="SYNTHGAME_MODROUTER-01" transform="translate(-26.000000, -55.000000)">
            <g id="SCREEN" transform="translate(26.000000, 55.000000)">
                <g id="lines" transform="translate(28.000000, 27.000000)" stroke="#FFFFFF" stroke-width="1">
                  <path v-show="!createModeIsActive" v-if="knobs[3].value === 'oscsDetune'" d="M2.5,0.5 L2.5,63.5" id="Shape"></path>
                  <path v-show="!createModeIsActive" v-if="knobs[2].value === 'oscsDetune'" d="M1.5,1.5 L189.5,62.5" id="Shape"></path>
                  <path v-show="!createModeIsActive" v-if="knobs[3].value === 'osc1Detune'" d="M96.5,1.5 L2.7,61.9" id="Shape"></path>
                  <path v-show="!createModeIsActive" v-if="knobs[3].value === 'filterCutoff'" d="M191.5,1.5 L0,62.8" id="Shape"></path>
                  <path v-show="!createModeIsActive" v-if="knobs[2].value === 'osc1Detune'" d="M96.5,1.5 L190.332852,62.7219014" id="Shape"></path>
                  <path v-show="!createModeIsActive" v-if="knobs[2].value === 'filterCutoff'" d="M190.332852,1.5 L190.332852,62.5" id="Shape"></path>
                    <path stroke="#4b1bff" v-if="knobs[1].value === 'oscsDetune'" d="M2.5,0.5 L2.5,63.5" id="Shape"></path>
                    <path stroke="#5bd484" v-if="knobs[0].value === 'oscsDetune'" d="M1.5,1.5 L189.5,62.5" id="Shape"></path>
                    <path stroke="#4b1bff" v-if="knobs[1].value === 'osc1Detune'" d="M96.5,1.5 L2.7,61.9" id="Shape"></path>
                    <path stroke="#4b1bff" v-if="knobs[1].value === 'filterCutoff'" d="M191.5,1.5 L0,62.8" id="Shape"></path>
                    <path stroke="#5bd484" v-if="knobs[0].value === 'osc1Detune'" d="M96.5,1.5 L190.332852,62.7219014" id="Shape"></path>
                    <path stroke="#5bd484" v-if="knobs[0].value === 'filterCutoff'" d="M190.332852,1.5 L190.332852,62.5" id="Shape"></path>
                </g>
                <rect id="Rectangle-path" fill="#ff8574" fill-rule="nonzero" x="94.6" y="0" width="60" height="29"></rect>
                <rect id="Rectangle-path" fill="#FF8575" fill-rule="nonzero" x="0.5" y="0" width="60" height="29"></rect>
                <rect id="Rectangle-path" fill="#6E00D1" fill-rule="nonzero" x="187.5" y="0" width="60" height="29"></rect>
                <text id="PITCH-OSC-2" fill="#FFFFFF" font-family="Helvetica" font-size="8" font-weight="normal" letter-spacing="0.5">
                    <tspan x="111.75" y="12">PITCH</tspan>
                    <tspan x="111.996094" y="22">OSC </tspan>
                    <tspan x="133.554688" y="22">1</tspan>
                </text>
                <rect id="Rectangle-path" fill="#71D5FF" fill-rule="nonzero" x="30.6" y="0" width="30" height="29"></rect>
                <text id="FILTER-CUTOFF" fill="#FFFFFF" font-family="Helvetica" font-size="8" font-weight="normal" letter-spacing="0.5">
                    <tspan x="203.015625" y="12">FILTER</tspan>
                    <tspan x="200.601562" y="22">CUTOF</tspan>
                    <tspan x="230.511719" y="22">F</tspan>
                </text>
                <text id="PITCH" fill="#FFFFFF" font-family="Helvetica" font-size="8" font-weight="normal" letter-spacing="0.5">
                    <tspan x="17.8" y="17">PITC</tspan>
                    <tspan x="38.0226563" y="17">H</tspan>
                </text>
                <g id="Group" transform="translate(137.000000, 38.000000)"></g>
                <g id="modlfo-cutoff-filter" transform="translate(28.000000, 27.000000)"></g>
                <g id="modlfo-pitch-oscs" transform="translate(124.000000, 28.000000)"></g>
                <g id="modlfo-pitch-oscs" transform="translate(217.000000, 28.000000)"></g>
                <g id="modenv-pitch-oscs" transform="translate(67.000000, 59.000000)"></g>
                <g id="modenv-pitch-osc1" transform="translate(67.000000, 59.000000)"></g>
                <g id="modenv-cutoff-filter" transform="translate(67.000000, 36.000000)"></g>
                <g id="Group" transform="translate(68.000000, 50.000000)"></g>
                <g id="Group" transform="translate(89.000000, 26.000000)"></g>
                <g id="Group" transform="translate(156.000000, 27.000000)"></g>
                <g id="Group" transform="translate(198.000000, 27.000000)"></g>
                <rect id="Rectangle-path" fill="#5D00FF" fill-rule="nonzero" x="0.6" y="88.9" width="60" height="29"></rect>
                <rect id="Rectangle-path" fill="#5BD483" fill-rule="nonzero" x="187.6" y="88.9" width="60" height="29"></rect>
                <g id="Group" transform="translate(0.573500, 90.356000)" fill="#FFFFFF" font-family="Helvetica" font-size="8" font-weight="normal" letter-spacing="0.5">
                    <text id="MOD-ENV">
                        <tspan x="19.9179688" y="10">MOD</tspan>
                        <tspan x="21.2753906" y="20">EN</tspan>
                        <tspan x="33.3886719" y="20">V</tspan>
                    </text>
                </g>
                <g id="Group" transform="translate(187.907000, 90.356000)" fill="#FFFFFF" font-family="Helvetica" font-size="8" font-weight="normal" letter-spacing="0.5">
                    <text id="MOD-LFO">
                        <tspan x="19.9179688" y="10">MOD</tspan>
                        <tspan x="21.7207031" y="20">LF</tspan>
                        <tspan x="32.0566406" y="20">O</tspan>
                    </text>
                </g>
            </g>
        </g>
    </g>
  </g>

          <!-- <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="SYNTHGAME_MODROUTER-01" transform="translate(-32.000000, -61.000000)">
                  <g id="SCREEN" transform="translate(32.000000, 61.000000)">
                      <rect id="Rectangle-path" fill="#FFFFFF" fill-rule="nonzero" x="200.3" y="12.7" width="35" height="19.9"></rect>
                      <rect id="Rectangle-path" fill="#EB2D5D" fill-rule="nonzero" x="0.2" y="12.7" width="35" height="19.9"></rect>
                      <rect id="Rectangle-path" fill="#71D5FF" fill-rule="nonzero" x="44.6" y="25.7" width="35" height="19.9"></rect>
                      <rect id="Rectangle-path" fill="#FF8575" fill-rule="nonzero" x="69.8" y="0.4" width="35" height="19.9"></rect>
                      <rect id="Rectangle-path" fill="#6E00D1" fill-rule="nonzero" x="115.4" y="12.7" width="35" height="19.9"></rect>
                      <rect id="Rectangle-path" fill="#E4E358" fill-rule="nonzero" x="157.9" y="12.7" width="35" height="19.9"></rect>
                      <text id="SEQ" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                          <tspan x="11.0560034" y="25.0374">SEQ</tspan>
                      </text>
                      <text id="OSC-2" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                          <tspan x="52.8428201" y="38.0335">OSC 2</tspan>
                      </text>
                      <text id="OSC-1" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                          <tspan x="78.1428201" y="12.6956">OSC 1</tspan>
                      </text>
                      <text id="FIL" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                          <tspan x="128.627863" y="24.9097">FIL</tspan>
                      </text>
                      <g id="Group" transform="translate(158.321000, 15.670400)" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                          <text id="AMP">
                              <tspan x="10.38764" y="6">AMP</tspan>
                          </text>
                          <text id="ENV">
                              <tspan x="11.0344819" y="12.2">ENV</tspan>
                          </text>
                      </g>
                      <text id="OUT" fill="#353436" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                          <tspan x="211.338383" y="25.0374">OUT</tspan>
                      </text>
                      <g id="Group" transform="translate(131.000000, 32.000000)"></g>
                      <g v-if="knobs[0].value === 'filterCutoff'" id="modlfo-cutoff-filter" transform="translate(129.000000, 32.000000)">

                          <rect fill="#000" id="Rectangle-path" stroke="#FFFFFF" stroke-width="1" x="0.2" y="21.1" width="46.2" height="19.9"></rect>
                          <text id="CUTOFF" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                              <tspan x="10.9811645" y="33.3967">CUTOFF</tspan>
                          </text>
                          <path d="M3.9,1 L3.9,21.1" id="Shape" stroke="#ff8574" stroke-width="1"></path>
                          <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="2.4 2.2 2.7 2.4 3.9 1.1 5.2 2.4 5.4 2.2 3.9 0.6"></polygon>
                          <path d="M23.5,41 L50.8328522,59.7219014" id="Shape" stroke="#ff8574" stroke-width="1"></path>
                      </g>
                      <g v-show="!createModeIsActive" v-if="knobs[2].value === 'filterCutoff'" id="modlfo-cutoff-filter" transform="translate(129.000000, 32.000000)">

                          <rect fill="#000" id="Rectangle-path" stroke="#FFFFFF" stroke-width="1" x="0.2" y="21.1" width="46.2" height="19.9"></rect>
                          <text id="CUTOFF" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                              <tspan x="10.9811645" y="33.3967">CUTOFF</tspan>
                          </text>
                          <path d="M3.9,1 L3.9,21.1" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                          <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="2.4 2.2 2.7 2.4 3.9 1.1 5.2 2.4 5.4 2.2 3.9 0.6"></polygon>
                          <path d="M23.5,41 L50.8328522,59.7219014" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                      </g>
                      <g v-if="knobs[0].value === 'oscsDetune'" id="modlfo-pitch-oscs" transform="translate(78.000000, 18.000000)">

                          <path d="M74.5,55 L101.832852,73.7219014" id="Shape" stroke="#ff8574" stroke-width="1"></path>
                          <rect fill="#000" id="Rectangle-path" stroke="#FFFFFF" stroke-width="1" x="51.2" y="35.1" width="46.2" height="19.9"></rect>
                          <text id="PITCH" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                              <tspan x="65.1458" y="47.3967">PITCH</tspan>
                          </text>
                          <g id="Group-3" transform="translate(34.307613, 18.423492) rotate(-52.000000) translate(-34.307613, -18.423492) translate(32.307613, -8.576508)">
                              <path d="M1.9,1 L1.9,54" id="Shape" stroke="#ff8574" stroke-width="1"></path>
                              <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="0.4 2.2 0.7 2.4 1.9 1.1 3.2 2.4 3.4 2.2 1.9 0.6"></polygon>
                          </g>
                          <g id="Group-3" transform="translate(28.482251, 26.263606) rotate(-72.000000) translate(-28.482251, -26.263606) translate(26.482251, -2.736394)">
                              <path d="M1.9,1 L1.9,57.3092186" id="Shape" stroke="#ff8574" stroke-width="1"></path>
                              <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="0.4 2.2 0.7 2.4 1.9 1.1 3.2 2.4 3.4 2.2 1.9 0.6"></polygon>
                          </g>
                          <path style="stroke:#ff8574" d="M74.5,55 L101.832852,73.7219014" id="Shape" stroke="#ff8574" stroke-width="1"></path>
                      </g>
                      <g v-show="!createModeIsActive" v-if="knobs[2].value === 'oscsDetune'" id="modlfo-pitch-oscs" transform="translate(78.000000, 18.000000)">

                          <rect fill="#000" id="Rectangle-path" stroke="#FFFFFF" stroke-width="1" x="51.2" y="35.1" width="46.2" height="19.9"></rect>
                          <text id="PITCH" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                              <tspan x="65.1458" y="47.3967">PITCH</tspan>
                          </text>
                          <g id="Group-3" transform="translate(34.307613, 18.423492) rotate(-52.000000) translate(-34.307613, -18.423492) translate(32.307613, -8.576508)">
                              <path d="M1.9,1 L1.9,54" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                              <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="0.4 2.2 0.7 2.4 1.9 1.1 3.2 2.4 3.4 2.2 1.9 0.6"></polygon>
                          </g>
                          <g id="Group-3" transform="translate(28.482251, 26.263606) rotate(-72.000000) translate(-28.482251, -26.263606) translate(26.482251, -2.736394)">
                              <path d="M1.9,1 L1.9,57.3092186" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                              <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="0.4 2.2 0.7 2.4 1.9 1.1 3.2 2.4 3.4 2.2 1.9 0.6"></polygon>
                          </g>
                          <path d="M74.5,55 L101.832852,73.7219014" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                      </g>
                      <g v-if="knobs[0].value === 'osc1Detune'" id="modlfo-pitch-oscs" transform="translate(89.000000, 18.000000)">

                          <rect fill="#000" id="Rectangle-path" stroke="#FFFFFF" stroke-width="1" x="40.2" y="35.1" width="46.2" height="19.9"></rect>
                          <text id="PITCH" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                              <tspan x="54.1458" y="47.3967">PITCH</tspan>
                          </text>
                          <g id="Group-3" transform="translate(23.307613, 18.423492) rotate(-52.000000) translate(-23.307613, -18.423492) translate(21.307613, -8.576508)">
                              <path d="M1.9,1 L1.9,54" id="Shape" stroke="#ff8574" stroke-width="1"></path>
                              <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="0.4 2.2 0.7 2.4 1.9 1.1 3.2 2.4 3.4 2.2 1.9 0.6"></polygon>
                          </g>
                          <path d="M63.5,55 L90.8328522,73.7219014" id="Shape" stroke="#ff8574" stroke-width="1"></path>
                      </g>
                      <g v-show="!createModeIsActive" v-if="knobs[2].value === 'osc1Detune'" id="modlfo-pitch-oscs" transform="translate(89.000000, 18.000000)">

                          <rect fill="#000" id="Rectangle-path" stroke="#FFFFFF" stroke-width="1" x="40.2" y="35.1" width="46.2" height="19.9"></rect>
                          <text id="PITCH" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                              <tspan x="54.1458" y="47.3967">PITCH</tspan>
                          </text>
                          <g id="Group-3" transform="translate(23.307613, 18.423492) rotate(-52.000000) translate(-23.307613, -18.423492) translate(21.307613, -8.576508)">
                              <path d="M1.9,1 L1.9,54" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                              <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="0.4 2.2 0.7 2.4 1.9 1.1 3.2 2.4 3.4 2.2 1.9 0.6"></polygon>
                          </g>
                          <path d="M63.5,55 L90.8328522,73.7219014" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                      </g>
                      <g v-if="knobs[1].value === 'lfoFrequency'" id="modlfo-frequency-lfo" transform="translate(72.000000, 82.000000)">

                          <path d="M68.5,9.5 L107.5,9.5" id="Shape" stroke="#ff8574" stroke-width="1"></path>
                          <rect fill="#000" id="Rectangle-path" stroke="#FFFFFF" stroke-width="1" x="22.2" y="0.1" width="46.2" height="19.5"></rect>
                          <text id="PITCH" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                              <tspan x="26.1423334" y="12.3967">FREQUENCY</tspan>
                          </text>
                          <g id="Group-3" transform="translate(11.210000, 9.423492) rotate(-90.000000) translate(-11.210000, -9.423492) translate(9.210000, -1.576508)">
                              <path d="M1.9,1 L1.9,21.89" id="Shape" stroke="#ff8574" stroke-width="1"></path>
                              <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="0.4 2.2 0.7 2.4 1.9 1.1 3.2 2.4 3.4 2.2 1.9 0.6"></polygon>
                          </g>
                      </g>
                      <g v-show="!createModeIsActive" v-if="knobs[3].value === 'lfoFrequency'" id="modlfo-frequency-lfo" transform="translate(72.000000, 82.000000)">

                          <path d="M68.5,9.5 L107.5,9.5" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                          <rect fill="#000" id="Rectangle-path" stroke="#FFFFFF" stroke-width="1" x="22.2" y="0.1" width="46.2" height="19.5"></rect>
                          <text id="PITCH" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                              <tspan x="26.1423334" y="12.3967">FREQUENCY</tspan>
                          </text>
                          <g id="Group-3" transform="translate(11.210000, 9.423492) rotate(-90.000000) translate(-11.210000, -9.423492) translate(9.210000, -1.576508)">
                              <path d="M1.9,1 L1.9,21.89" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                              <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="0.4 2.2 0.7 2.4 1.9 1.1 3.2 2.4 3.4 2.2 1.9 0.6"></polygon>
                          </g>
                      </g>
                      <g v-if="knobs[1].value === 'oscsDetune'" id="modenv-pitch-oscs" transform="translate(61.000000, 20.000000)">

                        <rect fill="#000" id="Rectangle-path" stroke="#FFFFFF" stroke-width="1" x="13" y="33.1" width="46.2" height="19.9"></rect>
                        <text id="PITCH" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                            <tspan x="26.7656" y="45.3967">PITCH</tspan>
                        </text>
                        <path d="M13.4,25.7 L36.1,33.1" id="Shape" stroke="#ff8574" stroke-width="1"></path>
                        <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="14.1 27.5 14.4 27.3 13.6 25.7 15.2 25 15.1 24.6 13 25.6"></polygon>
                        <path d="M36.1,0.6 L36.1,33.1" id="Shape" stroke="#ff8574" stroke-width="1"></path>
                        <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="34.6 1.8 34.9 2.1 36.1 0.8 37.4 2.1 37.7 1.8 36.1 0.2"></polygon>
                        <path d="M36.1,53.1 L0.7,62.9" id="Shape" stroke="#ff8574" stroke-width="1"></path>
                      </g>
                      <g v-show="!createModeIsActive" v-if="knobs[3].value === 'oscsDetune'" id="modenv-pitch-oscs" transform="translate(61.000000, 20.000000)">

                        <rect fill="#000" id="Rectangle-path" stroke="#FFFFFF" stroke-width="1" x="13" y="33.1" width="46.2" height="19.9"></rect>
                        <text id="PITCH" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                            <tspan x="26.7656" y="45.3967">PITCH</tspan>
                        </text>
                        <path d="M13.4,25.7 L36.1,33.1" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                        <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="14.1 27.5 14.4 27.3 13.6 25.7 15.2 25 15.1 24.6 13 25.6"></polygon>
                        <path d="M36.1,0.6 L36.1,33.1" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                        <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="34.6 1.8 34.9 2.1 36.1 0.8 37.4 2.1 37.7 1.8 36.1 0.2"></polygon>
                        <path d="M36.1,53.1 L0.7,62.9" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                      </g>
                      <g v-if="knobs[1].value === 'osc1Detune'" id="modenv-pitch-osc1" transform="translate(61.000000, 20.000000)">

                        <rect fill="#000" id="Rectangle-path" stroke="#FFFFFF" stroke-width="1" x="13" y="33.1" width="46.2" height="19.9"></rect>
                        <text id="PITCH" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                            <tspan x="26.7656" y="45.3967">PITCH</tspan>
                        </text>
                        <path d="M36.1,0.6 L36.1,33.1" id="Shape" stroke="#ff8574" stroke-width="1"></path>
                        <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="34.6 1.8 34.9 2.1 36.1 0.8 37.4 2.1 37.7 1.8 36.1 0.2"></polygon>
                        <path d="M36.1,53.1 L0.7,62.9" id="Shape" stroke="#ff8574" stroke-width="1"></path>
                      </g>
                      <g v-show="!createModeIsActive" v-if="knobs[3].value === 'osc1Detune'" id="modenv-pitch-osc1" transform="translate(61.000000, 20.000000)">

                        <rect fill="#000" id="Rectangle-path" stroke="#FFFFFF" stroke-width="1" x="13" y="33.1" width="46.2" height="19.9"></rect>
                        <text id="PITCH" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                            <tspan x="26.7656" y="45.3967">PITCH</tspan>
                        </text>
                        <path d="M36.1,0.6 L36.1,33.1" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                        <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="34.6 1.8 34.9 2.1 36.1 0.8 37.4 2.1 37.7 1.8 36.1 0.2"></polygon>
                        <path d="M36.1,53.1 L0.7,62.9" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                      </g>
                      <g v-if="knobs[1].value === 'filterCutoff'" id="modenv-cutoff-filter" transform="translate(61.000000, 30.000000)">

                        <rect fill="#000" id="Rectangle-path" stroke="#FFFFFF" stroke-width="1" x="13" y="23.1" width="46.2" height="19.9"></rect>
                        <text id="CUTOFF" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                            <tspan x="23.6009645" y="35.3967">CUTOFF</tspan>
                        </text>
                        <g id="Group-2" transform="translate(60.575375, 13.695024) rotate(65.000000) translate(-60.575375, -13.695024) translate(58.575375, -13.304976)">
                            <path d="M1.95845838,1.238453 L0.173919146,53.207823" id="Shape" stroke="#ff8574" stroke-width="1"></path>
                            <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="0.458458377 2.438453 0.758458377 2.738453 1.95845838 1.438453 3.25845838 2.738453 3.55845838 2.438453 1.95845838 0.838453002"></polygon>
                        </g>
                        <path d="M36.1,43.1 L0.7,52.9" id="Shape" stroke="#ff8574" stroke-width="1"></path>
                      </g>
                      <g v-show="!createModeIsActive" v-if="knobs[3].value === 'filterCutoff'" id="modenv-cutoff-filter" transform="translate(61.000000, 30.000000)">

                        <rect fill="#000" id="Rectangle-path" stroke="#FFFFFF" stroke-width="1" x="13" y="23.1" width="46.2" height="19.9"></rect>
                        <text id="CUTOFF" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                            <tspan x="23.6009645" y="35.3967">CUTOFF</tspan>
                        </text>
                        <g id="Group-2" transform="translate(60.575375, 13.695024) rotate(65.000000) translate(-60.575375, -13.695024) translate(58.575375, -13.304976)">
                            <path d="M1.95845838,1.238453 L0.173919146,53.207823" id="Shape" stroke="#fff" stroke-width="1"></path>
                            <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="0.458458377 2.438453 0.758458377 2.738453 1.95845838 1.438453 3.25845838 2.738453 3.55845838 2.438453 1.95845838 0.838453002"></polygon>
                        </g>
                        <path d="M36.1,43.1 L0.7,52.9" id="Shape" stroke="#fff" stroke-width="1"></path>
                      </g>
                      <g id="Group" transform="translate(62.000000, 44.000000)"></g>
                      <g id="Group" transform="translate(83.000000, 20.000000)"></g>
                      <g id="Group" transform="translate(35.000000, 28.000000)">
                          <path d="M0.2,1.6 L9.1,1.6" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                          <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="7.9 3.1 7.7 2.8 9 1.6 7.7 0.4 7.9 0.1 9.6 1.6"></polygon>
                      </g>
                      <g id="Group" transform="translate(35.000000, 14.000000)">
                          <path d="M0.2,1.7 L34.4,1.7" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                          <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="33.2 3.2 32.9 2.9 34.2 1.7 32.9 0.4 33.2 0.2 34.8 1.7"></polygon>
                      </g>
                      <g id="Group" transform="translate(104.000000, 14.000000)">
                          <path d="M0.8,1.7 L11,1.7" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                          <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="9.8 3.2 9.5 2.9 10.9 1.7 9.5 0.4 9.8 0.2 11.4 1.7"></polygon>
                      </g>
                      <g id="Group" transform="translate(79.000000, 28.000000)">
                          <path d="M0.5,2.1 L36,2.1" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                          <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="34.8 3.6 34.5 3.3 35.9 2.1 34.5 0.8 34.8 0.6 36.4 2.1"></polygon>
                      </g>
                      <g id="Group" transform="translate(150.000000, 21.000000)">
                          <path d="M0.4,1.6 L7.5,1.6" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                          <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="6.2 3.1 6 2.9 7.3 1.6 6 0.4 6.2 0.1 7.9 1.6"></polygon>
                      </g>
                      <g id="Group" transform="translate(192.000000, 21.000000)">
                          <path d="M0.8,1.6 L7.9,1.6" id="Shape" stroke="#FFFFFF" stroke-width="1"></path>
                          <polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="6.6 3.1 6.4 2.9 7.7 1.6 6.4 0.4 6.6 0.1 8.3 1.6"></polygon>
                      </g>
                      <rect id="Rectangle-path" fill="#E4E358" fill-rule="nonzero" x="26.6" y="81.9" width="46.2" height="19.9"></rect>
                      <rect id="Rectangle-path" fill="#5BD483" fill-rule="nonzero" x="160.6" y="81.9" width="46.2" height="19.9"></rect>
                      <g id="Group" transform="translate(26.573500, 85.356000)" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                          <text id="MOD">
                              <tspan x="15.88106" y="6">MOD</tspan>
                          </text>
                          <text id="ENV">
                              <tspan x="17.7571026" y="12.2">ENV</tspan>
                          </text>
                      </g>
                      <g id="Group" transform="translate(160.907000, 85.356000)" fill="#FFFFFF" font-family="Helvetica" font-size="6.1028" font-weight="normal">
                          <text id="MOD">
                              <tspan x="15.88106" y="6">MOD</tspan>
                          </text>
                          <text id="LFO">
                              <tspan x="17.472313" y="12.2">LFO</tspan>
                          </text>
                      </g>
                  </g>
              </g>
          </g>
        </g> -->

        <g v-if="debug" class="debug-text">
          <text x="0" y="0">
            <tspan x="0" y="10%">{{knobs[0].name}}: {{knobs[0].value}}</tspan>
            <tspan x="0" y="20%">{{knobs[1].name}}: {{knobs[1].value}}</tspan>
            <tspan x="0" y="30%" v-if="this.knobs[2]">{{knobs[2].name}}: {{knobs[2].value}}</tspan>
            <tspan x="0" y="40%" v-if="this.knobs[3]">{{knobs[3].name}}: {{knobs[3].value}}</tspan>
          </text>
          <text x="0" y="40%">
            <tspan x="0%" y="60%" v-if="this.knobs[4]">{{knobs[4].name}}: {{knobs[4].value}}</tspan>
            <tspan x="0%" y="70%" v-if="this.knobs[5]">{{knobs[5].name}}: {{knobs[5].value}}</tspan>
            <tspan x="0%" y="80%" v-if="this.knobs[6]">{{knobs[6].name}}: {{knobs[6].value}}</tspan>
            <tspan x="0%" y="90%" v-if="this.knobs[7]">{{knobs[7].name}}: {{knobs[7].value}}</tspan>
          </text>
        </g>
      </svg>
    </div>

</template>

<script>
import store from '../store' // path to your Vuex store

// TODO:
// [v]. translate the values so they work properly
// [v]. Gain
// [v]. turn the curve from the cubic one to quadratic
// [v]. make the lowpass & highpass one method
// [v]. do something about the colors

// [v] REDISiGN in accrodance with knobs !!
// [v] embed into modules
// [v] trying to move them back together

// ===============
// [v] the required margin data object and path
// [v] have the other knobs connected to the filter audio output
// [v] relativize and clean up the path drawing function (inc. the curve "global" variable)

// lfo:
// [v] create swing
// [v] have it move for sine - but it is hardcoded
// [x] have two other types
// [v] lfo prop watched/computed
// [v] transition
// [x] stylesheetapi
// http://danielcwilson.com/blog/2017/10/all-the-transform-ways/ - does not work, the properties are not recognized
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
// [~] try transitions: define two kinds of transforms with class and switch between them
// [v] a bit more complicated : set interval with a callback function changing a bolean data property every given time, watch changes in the rate knob to call a function replacing the current interval time with a new one. Custom transition bound and used to indicate LFO's shape
// [v] cleanup
// STILL TODO:
// [] bug: the swing does not update when the knob is held/ slowly turned
// [] sawtooth timing

// Week 3.:
// circles no: the design way
// <circles> czy path?
// size changes circles move aparart
// dry/wet - size of the circles
//
//

export default {
  name: 'display',
  props: {
    module: {
      type: String
    },
    fill: {
      type: String
    },
    knobs: {
      type: Array,
      default () { return [] }
    },
    debug: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // default values to not have the calculation derail at created()
      displayHeight: 300,
      displayWidth: 600,
      curveAmnt: 90,
      strokeWidth: '0.1',
      lfoRotation: 20,
      shouldItGoRight: false,
      shouldGoalGoRight: false,
      intervalId: null,
      goalIntervalId: null
    }
  },
  mounted () {
    // console.log('display: mounted!', this.module)
    // update dimentions:
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions())

    if (this.module == 'lfo') {
      var intervalTest = setInterval(this.updateSeconds, ((1 / this.knobs[3].value) * 1000))
      this.intervalId = intervalTest
      this.goalIntervalId = setInterval(this.updateGoalSeconds, (1 / (this.knobs[7].value)) * 1000)
    }
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.updateDimensions())
  },
  methods: {
    updateSeconds () {
      this.shouldItGoRight = !this.shouldItGoRight
    },
    updateGoalSeconds () {
      this.shouldGoalGoRight = !this.shouldGoalGoRight
    },

    changeInterval (time) {
      clearInterval(this.intervalId)
      this.intervalId = setInterval(this.updateSeconds, time)
    },
    updateDimensions () {
      this.displayHeight = this.$refs.displayWrapper.clientHeight
      this.displayWidth = this.$refs.displayWrapper.clientWidth
    }
  },
  computed: {
    createModeIsActive () {
      return this.$store.state.gameState.createModeIsActive
    },
    // used to refer to LFO rate knob in a watcher (no way to do it directly using because of "[...]")
    firstCircleLeftMargin () {
      let margin = ''
      return margin
    },
    firstCircleLeftMarginGoal () {
      let margin = ''
      return margin
    },
    lfoRealFreq () {
      if (this.module === 'lfo') {
        return this.knobs[3].value
      }
    },
    path () {
      let line

      if (this.module === 'envelope') {
        // helpers:
        let fourthOfWidth = this.displayWidth / 4

        const attack = this.knobs[0]
        const decay = this.knobs[1]
        const sustain = this.knobs[2]
        const release = this.knobs[3]
        const amount = this.knobs[8]

        const attackXPosition = (attack.value / attack.max) * fourthOfWidth
        const attackYPosition = this.displayHeight * 0.75 * (amount.value/100)
        const decayXPosition = (decay.value / decay.max) * fourthOfWidth

        // the vertical decay position shall include a fix stopping it
        // from going all the way down (5% height) to perserve release indication:
        const decayYPosition = (1 - (sustain.value / sustain.max)) * (attackYPosition
          //  * (amount.value/100)
         ) - (1 - ((sustain.value / sustain.max)))
         * (attackYPosition
          //  * (amount.value/100)
        )
           * 0.05
        // no sustain, as it basically a horizontal line
        // release is known and shall be market with absolute position

        // svg path:
        line = 'M 0, ' + (this.displayHeight + 1) +
              ' l ' + attackXPosition + ', ' + (-attackYPosition) + ' ' +
              ' v ' + -1 + //try to make decay point obvious
              ' h ' + 2 +
              ' v ' + 1 +
              ' l ' + decayXPosition + ', ' + decayYPosition + ' ' +
              ' v ' + -1 + //try to make decay point obvious
              ' h ' + 2 +
              ' v ' + 1 +
              // a horizontal line representing sustain level including a fix regarding adding the release:
              ' h ' + (this.displayWidth - attackXPosition - decayXPosition - (((release.value / release.max)) * fourthOfWidth)) +
              ' v ' + -1 + //try to make decay point obvious
              ' h ' + 2 +
              ' v ' + 1 +
              // release end position:
              ' L ' + this.displayWidth + ', ' + (this.displayHeight + 1) + ' ' +
              ' Z'
      }

      if (this.module === 'filter') {
        // helpers:
        const type = this.knobs[0]
        const cutOffFreq = this.knobs[1]
        const q = this.knobs[2]
        const gain = this.knobs[3]

        let halfHeight = this.displayHeight / 2
        let halfWidth = this.displayWidth / 2
        const gainAddedDistance = ((gain.value / gain.max) * halfHeight) - 5
        const yOffset = 0
        const qDistance = (1 - (q.value / q.max)) * (halfWidth)
        const freqDistance = (cutOffFreq.value / cutOffFreq.max) * (halfWidth)

        // svg path:
        if (type.value === 'lowpass') {
          line = 'M 0,' + (this.displayHeight + 1) +
                ' v ' + (-(halfHeight + gainAddedDistance - yOffset)) +
                ' h ' + (freqDistance) +
                ' h ' + ((q.value / q.max) * (halfWidth) / 2) +
                ' q ' + (qDistance / 2) + ', 0 ' +
                      +qDistance + ', ' + (halfHeight + gainAddedDistance) +

                ' Z'
        } else if (type.value === 'highpass') {
          line = 'M 0,' + (this.displayHeight + 1) +
                ' h ' + freqDistance +
                ' h ' + ((q.value / q.max) * (halfWidth) / 2) +
                ' q ' + (qDistance / 2) + ', ' + (-(halfHeight + gainAddedDistance)) + ' ' +
                          qDistance + ', ' + (-(halfHeight + gainAddedDistance)) +
                ' h ' + this.displayWidth +
                ' v ' + this.displayHeight +
                ' Z'
        } else if (type.value === 'bandpass') {
          line = 'M 0, ' + (this.displayHeight + 1) +
                ' h ' + (freqDistance + (halfWidth / 2) - qDistance) +
                ' q ' + (qDistance / 2) + ', ' + (-(halfHeight + gainAddedDistance)) + ' ' +
                        qDistance + ', ' + (-(halfHeight + gainAddedDistance)) +
                ' q ' + (qDistance / 2) + ', 0 ' +
                        qDistance + ', ' + (halfHeight + gainAddedDistance) + ' ' +
                ' Z '
        }
      }

      if (this.module === 'oscillator') {
        // helpers:
        const octave = this.knobs[0]
        const detune = this.knobs[1]
        const volume = this.knobs[2]
        const type = this.knobs[3]

        const lineLength = 1.5 * this.displayWidth
        const yAxisMiddle = this.displayHeight / 2
        const h = (yAxisMiddle / 2)
        const hv = (yAxisMiddle / 2) * (volume.value / (volume.max - volume.min))

        const octaveRatio = (octave.value / (octave.max - octave.min))
        // const detuneRatio = (detune.value - 50) /20
        const detuneRatio = (detune.value - 50) /10

        const iteration = 475 / Math.round(octave.value / 523 * 40) - (detuneRatio)

        let wave
        // square:
        if (type.value === 'square') {
          wave = ' v ' + hv +
                 ' h ' + iteration +
                 ' v ' + (-hv*2) +
                 ' h ' + iteration +
                 ' v ' + hv
        // sine:
        } else if (type.value === 'sine') {
          wave = ' q ' + '0, ' + hv + ' ' + iteration / 2 + ', ' + hv +
                 ' q ' + iteration / 2 + ', 0 ' + iteration / 2 + ', ' + (-hv) +
                 ' q 0, ' + (-hv) + ' ' + iteration / 2 + ' ' + (-hv) +
                 ' q ' + iteration / 2 + ', 0 ' + ' ' + iteration / 2 + ' ' + hv
        // sawtooth:
        } else if (type.value === 'sawtooth') {
          wave = ' v ' + hv +
                 ' l ' + 2 * iteration + ', ' + (-hv*2) +
                 ' v ' + hv
        // triangle
        } else if (type.value === 'triangle') {
          wave = ' l ' + iteration / 2 + ', ' + hv +
                 ' l ' + iteration + ', ' + (-hv*2) +
                 ' l ' + iteration / 2 + ', ' + hv
        }
        line = 'M ' + iteration * 0 + ', 0 ' +
              ' m ' + lineLength + ', ' + yAxisMiddle +
              ' h ' + (-lineLength - iteration) +
              wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave +
              wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave +
              wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave +
              ' Z '
      }

      if (this.module === 'lfo') {
        // NON OF THE BELOW PRESENETED APPROACHED WORKED (and should be deleted)
        // used a custom svg in the template

        // helpers:
        const r = this.displayHeight / 4
        const rate = this.knobs[0]
        const amount = this.knobs[1]
        const shape = this.knobs[2]

        // making a circle with a path..
        const circle = ' q ' + '0, ' + (-r) + ' ' + r + ', ' + (-r) +
                       ' q ' + r + ', 0 ' + r + ', ' + r +
                       ' q ' + '0, ' + r + ' ' + (-r) + ', ' + r +
                       ' q ' + (-r) + ', 0 ' + (-r) + ', ' + (-r)

        // the idea from https://codepen.io/jakob-e/pen/bgBegJ
        const archCrcl = 'M' + ((this.displayWidth / 2) - r) + ', ' + ((this.displayHeight / 2)) +
        // 'm '+(-r)+', 0'+
        'a ' + r + ', ' + r + ' 0 1,0 ' + (2 * r) + ',0' +
        'a ' + r + ', ' + r + ' 0 1,0 ' + (-2 * r) + ',0'

        line = ''
      }
      return line
    },

    lfoVB () {
      return (0 - this.displayWidth / 2) + ' 0 ' + this.displayWidth + ' ' + this.displayHeight
    },
    swingMovement () {
      // helpers:
      const rate = this.knobs[0]
      const amount = this.knobs[1]
      const shape = this.knobs[2]

      const rateRatio = (rate.value / (rate.max - rate.min))
      const amountRatio = (amount.value / (amount.max - amount.min))

      // a hot-fix to stop the swing from going trrrrrrrrr ---
      // let realFreq
      // if(this.knobs[3].value === 0) {
      //   realFreq = 0.1
      // } else {
      let realFreq = this.knobs[3].value
      // }

      const transitionTime = (1 / (realFreq))

      let transitionString
      // differenciate shapes using transitions:
      if (shape.value == 'sine') {
        transitionString = transitionTime + 's'
      } else if (shape.value == 'square') {
        transitionString = ''
      } else if (shape.value == 'sawtooth') {
        if (!this.shouldItGoRight) {
          transitionString = transitionTime + 's linear'
        } else {
          transitionString = ''
        }
      } else if (shape.value == 'triangle') {
        transitionString = transitionTime + 's linear'
      }
      let rotateAmount = 1900 * amountRatio
      let rotateString
      if (this.shouldItGoRight) {
        // go right:
        rotateString = 'rotate(' + rotateAmount + 'deg)'
      } else {
        // go left:
        rotateString = 'rotate(-' + rotateAmount + 'deg)'
      }
      return {transform: rotateString, transition: transitionString}
    },
    goalSwingMovement () {
      // helpers:
      const rate = this.knobs[4]
      const amount = this.knobs[5]
      const shape = this.knobs[6]

      const rateRatio = (rate.value / (rate.max - rate.min))
      const amountRatio = (amount.value / (amount.max - amount.min))

      const realGoalFreq = this.knobs[7].value

      const transitionTime = (1 / (realGoalFreq))

      let transitionString
      if (shape.value == 'sine') {
        transitionString = transitionTime + 's'
      } else if (shape.value == 'square') {
        transitionString = ''
      } else if (shape.value == 'sawtooth') {
        if (!this.shouldGoalGoRight) {
          transitionString = transitionTime + 's linear'
        } else {
          transitionString = ''
        }
      } else if (shape.value == 'triangle') {
        transitionString = transitionTime + 's linear'
      }
      let rotateAmount = 1900 * amountRatio
      let rotateString
      if (this.shouldGoalGoRight) {
        // go right:
        rotateString = 'rotate(' + rotateAmount + 'deg)'
      } else {
        // go left:
        rotateString = 'rotate(-' + rotateAmount + 'deg)'
      }
      return {transform: rotateString, transition: transitionString }
    },
    pathGoal () {
      let line

      if (this.module === 'lfo') {
        // helpers:
        const r = this.displayHeight / 4
        const rate = this.knobs[4]
        const amount = this.knobs[5]
        const shape = this.knobs[6]

        // making a circle with a path..
        const circle = ' q ' + '0, ' + (-r) + ' ' + r + ', ' + (-r) +
                       ' q ' + r + ', 0 ' + r + ', ' + r +
                       ' q ' + '0, ' + r + ' ' + (-r) + ', ' + r +
                       ' q ' + (-r) + ', 0 ' + (-r) + ', ' + (-r)

        // the idea from https://codepen.io/jakob-e/pen/bgBegJ
        const archCrcl = 'M' + ((this.displayWidth / 2) - r) + ', ' + ((this.displayHeight / 2)) +
        // 'm '+(-r)+', 0'+
        'a ' + r + ', ' + r + ' 0 1,0 ' + (2 * r) + ',0' +
        'a ' + r + ', ' + r + ' 0 1,0 ' + (-2 * r) + ',0'

        line = ''
      }

      if (this.module === 'envelope') {
        // helpers:
        let fourthOfWidth = this.displayWidth / 4

        const attack = this.knobs[4]
        const decay = this.knobs[5]
        const sustain = this.knobs[6]
        const release = this.knobs[7]
        const amount = this.knobs[9]

        const attackXPosition = (attack.value / attack.max) * fourthOfWidth
        const attackYPosition = this.displayHeight * 0.75 * (amount.value/100)
        const decayXPosition = (decay.value / decay.max) * fourthOfWidth

        // the vertical decay position shall include a fix stopping it
        // from going all the way down (5% height) to perserve release indication:
        const decayYPosition = (1 - (sustain.value / sustain.max)) * (attackYPosition
          //  * (amount.value/100)
         ) - (1 - ((sustain.value / sustain.max)))
         * (attackYPosition
          //  * (amount.value/100)
        )
           * 0.05
        // no sustain, as it basically a horizontal line
        // release is known and shall be market with absolute position

        // svg path:
        line = 'M 0, ' + (this.displayHeight + 1) +
              ' l ' + attackXPosition + ', ' + (-attackYPosition) + ' ' +
              ' h ' + -1 +
              ' v ' + 1 + //try to make decay point obvious
              ' v ' + -2 +
              ' v ' + 1 +
              ' h ' + 1 +
              ' v ' + 2 +
              ' v ' + -4 +
              ' v ' + 2 +
              ' h ' + 1 +
              ' v ' + 3 +
              ' v ' + -6 +
              ' v ' + 3 +
              ' h ' + 1 +
              ' v ' + 2 +
              ' v ' + -4 +
              ' v ' + 2 +
              ' h ' + 1 +
              ' v ' + 1 +
              ' v ' + -2 +
              ' v ' + 1 +


              ' l ' + decayXPosition + ', ' + decayYPosition + ' ' +
              ' h ' + -1 +
              ' v ' + 1 + //try to make decay point obvious
              ' v ' + -2 +
              ' v ' + 1 +
              ' h ' + 1 +
              ' v ' + 2 +
              ' v ' + -4 +
              ' v ' + 2 +
              ' h ' + 1 +
              ' v ' + 3 +
              ' v ' + -6 +
              ' v ' + 3 +
              ' h ' + 1 +
              ' v ' + 2 +
              ' v ' + -4 +
              ' v ' + 2 +
              ' h ' + 1 +
              ' v ' + 1 +
              ' v ' + -2 +
              ' v ' + 1 +
              // a horizontal line representing sustain level including a fix regarding adding the release:
              ' h ' + (this.displayWidth - attackXPosition - decayXPosition - (((release.value / release.max)) * fourthOfWidth)) +
              ' h ' + -1 +
              ' v ' + 1 + //try to make decay point obvious
              ' v ' + -2 +
              ' v ' + 1 +
              ' h ' + 1 +
              ' v ' + 2 +
              ' v ' + -4 +
              ' v ' + 2 +
              ' h ' + 1 +
              ' v ' + 3 +
              ' v ' + -6 +
              ' v ' + 3 +
              ' h ' + 1 +
              ' v ' + 2 +
              ' v ' + -4 +
              ' v ' + 2 +
              ' h ' + 1 +
              ' v ' + 1 +
              ' v ' + -2 +
              ' v ' + 1 +
              // release end position:
              ' L ' + this.displayWidth + ', ' + (this.displayHeight + 1) + ' '
              // +
              // ' Z'
      }

      if (this.module === 'filter') {
        // helpers:
        const type = this.knobs[4]
        const cutOffFreq = this.knobs[5]
        const q = this.knobs[6]
        const gain = this.knobs[7]

        let halfHeight = this.displayHeight / 2
        let halfWidth = this.displayWidth / 2
        const gainAddedDistance = ((gain.value / gain.max) * halfHeight) - 5
        const yOffset = 0
        const qDistance = (1 - (q.value / q.max)) * (halfWidth)
        const freqDistance = (cutOffFreq.value / cutOffFreq.max) * (halfWidth)

        // svg path:
        if (type.value === 'lowpass') {
          line = 'M 0,' + ((this.displayHeight + 1) - (halfHeight + gainAddedDistance - yOffset)) +
                // ' v ' + (-(halfHeight + gainAddedDistance - yOffset)) +
                ' h ' + (freqDistance) +
                ' h ' + ((q.value / q.max) * (halfWidth) / 2) +
                ' q ' + (qDistance / 2) + ', 0 ' +
                      +qDistance + ', ' + (halfHeight + gainAddedDistance)
        } else if (type.value === 'highpass') {
          line = 'M' + (freqDistance + ((q.value / q.max) * (halfWidth) / 2)) + ', ' + (this.displayHeight + 1) +
                ' q ' + (qDistance / 2) + ', ' + (-(halfHeight + gainAddedDistance)) + ' ' +
                          qDistance + ', ' + (-(halfHeight + gainAddedDistance)) +
                ' h ' + this.displayWidth +
                ' v ' + this.displayHeight
        } else if (type.value === 'bandpass') {
          line = 'M' + (freqDistance + (halfWidth / 2) - qDistance) + ', ' + (this.displayHeight + 1) +
                ' q ' + (qDistance / 2) + ', ' + (-(halfHeight + gainAddedDistance)) + ' ' +
                        qDistance + ', ' + (-(halfHeight + gainAddedDistance)) +
                ' q ' + (qDistance / 2) + ', 0 ' +
                        qDistance + ', ' + (halfHeight + gainAddedDistance) + ' '
        }
      }

      if (this.module === 'oscillator') {
        // helpers:
        const octave = this.knobs[4]
        const detune = this.knobs[5]
        const volume = this.knobs[6]
        const type = this.knobs[7]

        const lineLength = 1.5 * this.displayWidth
        const yAxisMiddle = this.displayHeight / 2
        const h = (yAxisMiddle / 2)
        const hv = (yAxisMiddle / 2) * (volume.value / (volume.max - volume.min))

        const octaveRatio = (octave.value / (octave.max - octave.min))
        // const detuneRatio = (detune.value - 50) /20
        const detuneRatio = (detune.value - 50) /10

        const iteration = 475 / Math.round(octave.value / 523 * 40) - (detuneRatio)

        let wave
        // square:
        if (type.value === 'square') {
          wave = ' v ' + hv +
                 ' h ' + iteration +
                 ' v ' + (-hv*2) +
                 ' h ' + iteration +
                 ' v ' + hv
        // sine:
        } else if (type.value === 'sine') {
          wave = ' q ' + '0, ' + hv + ' ' + iteration / 2 + ', ' + hv +
                 ' q ' + iteration / 2 + ', 0 ' + iteration / 2 + ', ' + (-hv) +
                 ' q 0, ' + (-hv) + ' ' + iteration / 2 + ' ' + (-hv) +
                 ' q ' + iteration / 2 + ', 0 ' + ' ' + iteration / 2 + ' ' + hv
        // sawtooth:
        } else if (type.value === 'sawtooth') {
          wave = ' v ' + hv +
                 ' l ' + 2 * iteration + ', ' + (-hv*2) +
                 ' v ' + hv
        // triangle
        } else if (type.value === 'triangle') {
          wave = ' l ' + iteration / 2 + ', ' + hv +
                 ' l ' + iteration + ', ' + (-hv*2) +
                 ' l ' + iteration / 2 + ', ' + hv
        }
        line =
              ' m -' + iteration + ', ' + yAxisMiddle +
              wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave +
              wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave +
              wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave + wave
      }

      return line
    },
    centerLFOSwing () {
      return 'transform: translateX(' + (this.displayWidth / 2) + 'px)'
    }
    // moveLFOSwingUp() {
    //   return 'translateY(-' + (this.displayHeight/2) + 'px)'
    // }
  },
  watch: {
    // used to update the interval length on rate knob turn
    lfoRealFreq: {
      handler (newValue, oldValue) {
        if (this.module == 'lfo') {
          let realFreq = this.knobs[3]
          this.changeInterval((1 / (newValue)) * 1000)
        }
      },
      deep: true
    }

  }
}
</script>

<style scoped lang="scss">
  path {
    display: inline-block;
  }
  .swingClass {
    transform-origin: 0% -40%;
  }
  .debug-text {
    font: bold 20px sans-serif;
    fill: red;
  }

@media only screen and (max-width: 1000px) {
  .routerscreen {
    transform: scale(1.35) translateY(2px) !important
  }
}
</style>
