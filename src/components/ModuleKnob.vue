<template>
  <div class="knob">
    <div class="div-wrapper">
      <svg width="100%" style="overflow:visible;height: 5.4em;" viewBox="0 0 550 550" ref="_svg"
        @touchmove="handleTouchMove"
        @click="handleClick"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <g>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g v-if="this.module === 'filter'" transform="translate(-20, 0)">
              <rect x="24" y="27.6" :stroke="knobColor" stroke-width="5.796" class="st18" width="522.6" height="540.9"/>
              <polyline class="st3" stroke="white" stroke-width="5.796" points="181.4,516.2 67.3,516.2 67.3,72.5 501.5,72.5 501.5,516.2 389.3,516.2 	"/>
              <polyline class="st3" stroke="white" stroke-width="5.796" points="408.3,496.6 388.4,516.7 388.4,516.7 408.3,535.9 	"/>
              <polyline class="st3" stroke="white" stroke-width="5.796" points="166.2,496.6 186,516.7 186,516.7 166.2,535.9 	"/>
            </g>
            <g v-else-if="this.module === 'envelope'" transform="translate(-20, -30)">
              <path :stroke="knobColor" stroke-width="5.796" class="st15" d="M251.6,515.8C158,500.2,85.1,420.5,81.5,322C77.3,209.3,165.3,114.7,278,110.6
                c112.6-4.1,207.3,83.9,211.4,196.5c3.8,103.1-69.6,191.1-168.4,208.5"/>
              <path :stroke="knobColor" stroke-width="5.796" class="st15" d="M243.9,562.2C128.7,543,39.1,445.1,34.7,323.9C29.6,185.4,137.8,69,276.3,64s254.9,103.1,259.9,241.6
                c4.6,126.8-85.6,235-207.1,256.3"/>
              <ellipse :stroke="knobColor" stroke-width="5.796" class="st15" cx="285.4" cy="562.6" rx="11.9" ry="11.7"/>
              <ellipse :stroke="knobColor" stroke-width="5.796" class="st15" cx="285.4" cy="518.2" rx="11.9" ry="11.7"/>
            </g>
            <g v-else-if="this.module === 'lfo'" transform="translate(-20, -30)">
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="285.4" cy="315.2" r="184"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="121.6" cy="478.5" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="80.3" cy="422.4" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="58" cy="359" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="54.9" cy="292.5" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="70.8" cy="227.6" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="105.7" cy="168.6" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="158" cy="121.3" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="219.4" cy="92.7" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="285.4" cy="83.2" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="351.3" cy="92.7" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="412.8" cy="121.3" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="465" cy="168.6" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="500" cy="227.6" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="515.9" cy="292.5" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="512.7" cy="359" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="490.5" cy="422.4" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="449.1" cy="478.5" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="387.9" cy="524.6" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="318.8" cy="547.2" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="247.3" cy="546.1" r="11.9"/>
              <circle :stroke="knobColor" stroke-width="5.796" class="st12" cx="177.8" cy="525.5" r="11.9"/>
            </g>
              <g id="knob_1-01" transform="translate(3.000000, 3.000000)">
                  <g v-if="this.module === 'oscillator'">
                    <polyline id="Shape" :stroke="knobColor" stroke-width="5.796" points="332.4 467.7 307 517.5 310.6 519.3 356.7 542.9"></polyline>
                    <polyline id="Shape" :stroke="knobColor" stroke-width="5.796" points="191.3 467.7 216.8 517.5 213.1 519.3 167 542.9"></polyline>
                    <path d="M209.3,518.9 C195.5,516.2 181.9,512.3 168.7,507.4 C138.6,496.1 110.5,479 86.2,457.1 C37.5,413.6 5.3,349.4 1,280.8 C-1.1,246.6 3.3,211.4 14.9,178.2 C26.6,145 44.8,113.7 69,87.2 C93.2,60.7 123,39 156.3,24.1 C189.5,9.1 226.1,1.2 262.7,0.5 C299.3,-9.43689571e-16 336.3,7.5 369.8,22.4 C403.4,37.2 433.1,59.7 457,86.6 C480.7,113.7 498.7,145.2 509.9,178.5 C521.1,211.8 526,246.7 524.3,280.9 L521.7,306.4 C520.2,314.8 518.3,323.1 516.6,331.4 C514.4,339.6 511.5,347.6 508.9,355.6 C505.8,363.5 502.2,371.1 498.9,378.8 C484,408.9 463.1,435.4 438.4,456.7 C402.5,487.9 359.4,508.7 314,518.1 M309.6,516.3 C324.1,513.2 339.6,505.3 353.1,499.2 C381.4,486.6 406.3,467.3 426.3,444.4 C446,421.3 460.8,394.5 469.8,366.6 C478.9,338.6 482.6,309.4 480.9,280.8 L478.5,259.5 C477.1,252.5 475.5,245.6 474,238.7 C472.1,231.9 469.5,225.3 467.4,218.6 C464.8,212.1 461.6,205.8 458.8,199.5 C446,174.7 428.4,153 407.7,135.7 C366.2,100.9 314.9,82.4 262.6,81.2 C210.2,80 157.4,99 116.8,135 C76,170.7 48.7,223.4 44.2,280.8 C42.1,309.4 45.4,338.9 54.8,366.9 C64.3,394.8 79.3,421.3 99.5,443.9 C119.7,466.4 144.2,487.5 172.1,500.3 C185.4,506.4 200.8,513.8 215.3,516.5" id="Shape" :stroke="knobColor" stroke-width="5.796"></path>
                  </g>
                </g>
                  <!-- <g :style="{transition: '.2s all linear'}" :transform="'rotate(' + (((this.value / (this.max - (this.min * 0.9))) * 310) + (this.max*0.9) + 18) + ' 264 285) translate(0, 206)'" > -->
                  <g :style="{transition: '.2s all linear'}" :transform="'rotate(' + (((this.value / (this.max - this.min)) * 310) + 18) + ' 264 285) translate(0, 236)'" >
                    <defs>
                      <radialGradient id="grad1" cx="50%" cy="65%" r="60%" fx="50%" fy="75%">
                        <stop offset="0%" style="stop-color:rgba(0,0,0,1);
                        stop-opacity:1" />
                        <stop offset="50%" style="stop-color:rgba(0,0,0,1);stop-opacity:1" />
                        <stop offset="60%" style="stop-color:rgba(0,0,0,0);stop-opacity:0" />
                      </radialGradient>
                    </defs>
                    <polygon transform="translate(4, 175) scale(8,4)" fill="url(#grad1)" points="29.5,-36 4,60 60,60"></polygon>
                  </g>
                  <circle id="Oval" fill="#171A3D" fill-rule="nonzero" cx="262.6" cy="288.4" r="153.2"></circle>
                  <circle id="Oval" stroke="#FFFFFF" stroke-width="5.796" :fill="knobColor" fill-rule="nonzero" cx="262.6" cy="288.4" r="113.4"></circle>
                  <!-- <g :transform="'rotate(' + (((this.value / (this.max - (this.min * 0.9))) * 359.8) - ((this.max*0.9) + (this.max/20000 * 6) - 3)) + ' 264 285) translate(2, 205)'" > -->
                  <g :transform="'rotate(' + degAngle + ' 264 285) translate(2, 205)'" >
                    <path d="M262.6,288.4 L262.6,81.2" id="Shape" stroke="white" stroke-width="5.796"></path>
                  </g>
              </g>
          </g>
          <g>
            <defs>
              <filter id="dropshadow" x="-100%" y="-100%" width="300%" height="300%">
                <feDropShadow dx="0" dy="0" stdDeviation="35" flood-color="#3C32FF" flood-opacity="1" />
              </filter>
            </defs>
            <circle class="touchpoint" style="filter:url(#dropshadow);cursor:grab;" :fill="knobColor" r="30" :cx="(cpPathX - 10)" :cy="(cpPathY + 10)" stroke="white" stroke-width="6"></circle>
          </g>
        </g>
      </svg>
    </div>
    <p>{{name}}</p>
  </div>
</template>
<script>
import TouchPosition from "../modules/touch_position.js";
import CircleSliderState from "../modules/circle_slider_state.js";

export default {
  name: "CircleSlider",
  created() {
    this.stepsCount = 1 + (this.max - this.min) / this.stepSize;
    this.steps = Array.from(
      {
        length: this.stepsCount
      },
      (_, i) => this.min + i * this.stepSize
    );

    this.circleSliderState = new CircleSliderState(
      this.steps,
      this.rangeOffset,
      this.value
    );
    this.angle = this.circleSliderState.angleValue;
    this.currentStepValue = this.circleSliderState.currentStep;

    let maxCurveWidth = Math.max(
      this.cpMainCircleStrokeWidth,
      this.cpPathStrokeWidth
    );
    this.radius = 550 / 2 - Math.max(maxCurveWidth, this.cpKnobRadius * 2) / 2;
    this.updateFromPropValue(this.value);
  },
  mounted() {
    this.touchPosition = new TouchPosition(
      this.$refs._svg,
      this.radius,
      this.radius / 2
    );
  },
  props: {
    // startAngleOffset: {
    //   type: Number,
    //   required: false,
    //   default: function () {
    //     // return Math.PI / 20
    //     return 0
    //   }
    // },
    module: {
      type: String,
      default: "oscillator"
    },
    value: {
      type: Number,
      required: false,
      default: 0
    },
    side: {
      type: Number,
      required: false,
      default: 550
    },
    stepSize: {
      type: Number,
      required: false,
      default: 1
    },
    min: {
      type: Number,
      required: false,
      default: 0
    },
    max: {
      type: Number,
      required: false,
      default: 100
    },
    circleColor: {
      type: String,
      required: false,
      default: "#334860"
    },
    progressColor: {
      type: String,
      required: false,
      default: "#00be7e"
    },
    knobColor: {
      type: String,
      required: false,
      default: "#00be7e"
    },
    name: {
      type: String,
      required: false,
      default: "Extra Tats"
    },
    knobRadius: {
      type: Number,
      required: false,
      default: null
    },
    knobRadiusRel: {
      type: Number,
      required: false,
      default: 7
    },
    circleWidth: {
      type: Number,
      required: false,
      default: null
    },
    circleWidthRel: {
      type: Number,
      required: false,
      default: 20
    },
    progressWidth: {
      type: Number,
      required: false,
      default: null
    },
    progressWidthRel: {
      type: Number,
      required: false,
      default: 10
    }
    // limitMin: {
    //   type: Number,
    //   required: false,
    //   default: null
    // },
    // limitMax: {
    //   type: Number,
    //   required: false,
    //   default: null
    // }
  },
  data() {
    return {
      steps: null,
      stepsCount: null,
      radius: 0,
      angle: 0,
      currentStepValue: 0,
      mousePressed: false,
      circleSliderState: null,
      mousemoveTicks: 0,
      rangeOffset: 0.7, // in rads,
      touchEvent: {
        active: false,
        center: {
          x: null,
          y: null
        }
      }
    };
  },
  computed: {
    cpStartAngleOffset() {
      if (!this.minStepLimit) {
        return 0;
      }
    },
    cpCenter() {
      return 550 / 2;
    },
    cpAngle() {
      return this.angle + Math.PI / 2;
    },
    degAngle() {
      return (this.angle / (2 * Math.PI)) * 360;
    },
    cpMainCircleStrokeWidth() {
      return this.circleWidth || 550 / 2 / this.circleWidthRel;
    },
    cpPathDirection() {
      return this.cpAngle < (3 / 2) * Math.PI ? 0 : 1;
    },
    cpPathX() {
      return this.cpCenter + this.radius * Math.cos(this.cpAngle);
    },
    cpPathY() {
      return this.cpCenter + this.radius * Math.sin(this.cpAngle);
    },
    cpPathStrokeWidth() {
      return this.progressWidth || 550 / 2 / this.progressWidthRel;
    },
    cpKnobRadius() {
      return this.knobRadius || 550 / 2 / this.knobRadiusRel;
    },
    cpPathD() {
      let parts = [];
      parts.push("M" + this.cpCenter);
      parts.push(this.cpCenter + this.radius);
      parts.push("A");
      parts.push(this.radius);
      parts.push(this.radius);
      parts.push(0);
      parts.push(this.cpPathDirection);
      parts.push(1);
      parts.push(this.cpPathX);
      parts.push(this.cpPathY);
      return parts.join(" ");
    }
  },
  methods: {
    /*
     */
    fitToStep(val) {
      return Math.round(val / this.stepSize) * this.stepSize;
    },

    /*
     */
    handleClick(e) {
      this.touchPosition.setNewPosition(e);
      // if (this.touchPosition.isTouchWithinSliderRange) {
      const newAngle = this.touchPosition.sliderAngle;
      this.animateSlider(this.angle, newAngle);
      // }
    },

    /*
     */
    handleMouseDown(e) {
      e.preventDefault();
      this.mousePressed = true;
      window.addEventListener("mousemove", this.handleWindowMouseMove);
      window.addEventListener("mouseup", this.handleMouseUp);
    },

    /*
     */
    handleMouseUp(e) {
      e.preventDefault();
      this.mousePressed = false;
      window.removeEventListener("mousemove", this.handleWindowMouseMove);
      window.removeEventListener("mouseup", this.handleMouseUp);
      this.mousemoveTicks = 0;
    },

    handleTouchStart(e) {
      const getDivWrapper = el => {
        if (el.parentElement.className === "div-wrapper")
          return el.parentElement;
        return getDivWrapper(el.parentElement);
      };
      this.touchEvent.active = true;

      const x = e.targetTouches[0].pageX;
      const y = e.targetTouches[0].pageX;
      console.log(e.srcElement);
      const divWrapper = getDivWrapper(e.srcElement);

      this.touchEvent.center.x =
        divWrapper.offsetLeft + 0.5 * divWrapper.offsetWidth;
      this.touchEvent.center.y =
        divWrapper.offsetParent.offsetParent.offsetTop +
        divWrapper.offsetTop +
        0.5 * divWrapper.offsetHeight;
    },

    handleTouchEnd() {
      this.touchEvent.active = false;
    },

    /*
     */
    handleWindowMouseMove(e) {
      e.preventDefault();
      if (this.mousemoveTicks < 5) {
        this.mousemoveTicks++;
        return;
      }

      this.touchPosition.setNewPosition(e);
      this.updateSlider();
    },

    /*
     */
    handleTouchMove(e) {
      // this.$emit('touchmove')
      // Do nothing if two or more fingers used
      if (!this.touchEvent.active) return;
      if (
        e.targetTouches.length > 1 ||
        e.changedTouches.length > 1 ||
        e.touches.length > 1
      ) {
        return true;
      }
      const x = e.targetTouches[0].pageX;
      const y = e.targetTouches[0].pageY;

      const xDiff = x - this.touchEvent.center.x;
      const yDiff = this.touchEvent.center.y - y;

      const fullAngle =
        Math.atan2(yDiff, xDiff) < 0
          ? Math.atan2(yDiff, xDiff) + 2 * Math.PI
          : Math.atan2(yDiff, xDiff);
      const inverseFullAngle = 2 * Math.PI - fullAngle;
      const inverseFullAngleCorrectedForStart =
        inverseFullAngle - 0.5 * Math.PI < 0
          ? inverseFullAngle + 1.5 * Math.PI
          : inverseFullAngle - 0.5 * Math.PI;
      this.updateAngle(inverseFullAngleCorrectedForStart);

      // // const lastTouch = e.targetTouches.item(e.targetTouches.length - 1)
      // // this.touchPosition.setNewPosition(lastTouch)
      // const lastTouch = e.touches.item(e.touches.length - 1)
      // this.touchPosition.setNewPosition(lastTouch)

      // if (this.touchPosition.isTouchWithinSliderRange) {
      //   e.preventDefault()
      //   this.updateSlider()
      // }
    },

    /*
     */
    updateAngle(angle) {
      this.circleSliderState.updateCurrentStepFromAngle(angle);
      this.angle = this.circleSliderState.angleValue;
      this.currentStepValue = this.circleSliderState.currentStep;

      this.$emit("input", this.currentStepValue);
    },

    /*
     */
    updateFromPropValue(value) {
      let stepValue = this.fitToStep(value);
      this.circleSliderState.updateCurrentStepFromValue(stepValue);

      this.angle = this.circleSliderState.angleValue;
      this.currentStepValue = stepValue;
      this.$emit("input", this.currentStepValue);
    },

    /*
     */
    updateSlider() {
      const angle = this.touchPosition.sliderAngle;
      if (Math.abs(angle - this.angle) < Math.PI) {
        this.updateAngle(angle);
      }
    },

    /*
     */
    animateSlider(startAngle, endAngle) {
      // this used to be commented out, why?
      const direction = startAngle < endAngle ? 1 : -1;
      const curveAngleMovementUnit =
        direction * this.circleSliderState.angleUnit * 2;

      const animate = () => {
        if (
          Math.abs(endAngle - startAngle) < Math.abs(2 * curveAngleMovementUnit)
        ) {
          this.updateAngle(endAngle);
        } else {
          const newAngle = startAngle + curveAngleMovementUnit;
          this.updateAngle(newAngle);
          this.animateSlider(newAngle, endAngle);
        }
      };

      window.requestAnimationFrame(animate);
    }
  },
  watch: {
    value(val) {
      this.updateFromPropValue(val);
    }
  }
};
</script>
<style scoped lang="scss">
.knob {
  max-width: 5.4em;
  height: 6.9em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__bg {
    margin-bottom: -150px;
    overflow: visible;
  }
  p {
    margin: 0;
    font-size: 0.7em;
    text-transform: uppercase;
    letter-spacing: 1px;
    z-index: 9;
    position: relative;
  }
}

.div-wrapper {
  max-height: 4em;
}

.touchpoint {
  // pointer-events: all !important;
  // touch-action: all !important;
}

@media only screen and (max-width: 1000px) {
  .knob p {
    font-size: 1.2em;
  }
  .knob {
    margin: 0 5% !important;
  }
  .knob {
    // pointer-events: none;
    width: 25%;
  }
}
</style>
