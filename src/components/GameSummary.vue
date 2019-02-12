<template>
  <div class="overlay">
    <div class="overlay-content-wrapper">
     <h4>GAME SUMMARY</h4>
     <div class="score-container">
         <h5>SCORE</h5>
         <h1></h1>
     </div>
     <div class="level-container">
         <div v-for="level in levels" :key="level.knobName">
            <module-knob
                v-model="attack"
                v-if="knobsAvailable.attack || createModeIsActive"
                :min="0"
                :max="100"
                knobColor="#e4e259"
                name=level.knobName
                module="envelope"
            ></module-knob>
            <h4>{{ level.knobName }}</h4>
         </div>
     </div>
     <div class="leader-board">
       <div v-for="challenger in challengers" :key="challenger.name" class="challenger">
          <h5> {{ challenger.name }}</h5>
          <h1>{{ challenger.score }}</h1>
       </div>
      </div>
     <div class="navigation-container">
        <button class="button-next"
                @click="$emit('closesuccessoverlay')"
                ref="button"
                >KEEP TWEAKING</button>
        <button class="button-next"
                @click="$emit('next')"
                ref="button"
                >NEXT LEVEL</button>
      </div>
     </div>
    </div>
  </div>
</template>

<script>
import { MODULE_OSCILLATOR_COLOR, MODULE_ENVELOPE_COLOR, MODULE_FILTER_COLOR, MODULE_LFO_COLOR, MODULE_DELAY_COLOR, MODULE_REVERB_COLOR } from '@/constants'
import { color } from 'style-value-types'

export default {
  name: 'game-summary',
  props: {
  },
  data () {
    return {
      levels: [
        {
          knobName: 'Frequency',
        },
        {
          knobName: 'Shape',
        },
        {
          knobName: 'Rolloff',
        }
      ],
      challengers: [{
        name: "Lawson",
        score: 9000,
      },
      { 
        name: "Bart",
        score: "Over 9000",
      }, {

      }
      ]
    }
  },
  mounted () {

  },
  beforeDestroy () {

  },
  methods: {

  },
  created () {

  },
  methods: {

  },
  computed: {

  }
}
</script>

<style scoped lang="scss">

// .overlay {
//   position: fixed;
//   display: flex;
//   align-content: center;
//   justify-content: center;
//   z-index: 9998;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, .90);
//   transition: opacity .3s ease;
//   fill: none;
//   stroke: red;
//   stroke-width: 3;
//   & h1 {
//     text-transform: uppercase;
//   }
//   & h2 {
//     font-weight: 300;
//     font-size: 3em;
//     max-width: 13em;
//   }
// }

// .overlay-content-wrapper {
//   padding: 1rem;
//   display: flex;
//   height: 100%;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: center;
//   align-content: center;
// }

</style>
