<template>
  <svg class="shape-overlays" :class="{'is-opened': isOpened}" viewBox="0 0 100 100" preserveAspectRatio="none" ref="svoosh">
  <path ref="path1" class="shape-overlays__path" :fill="color"></path>
  <path ref="path2" class="shape-overlays__path" :fill="color"></path>
  <path ref="path3" class="shape-overlays__path" :fill="color"></path>
</svg>
</template>

<script>
import { MODULE_OSCILLATOR_COLOR, MODULE_ENVELOPE_COLOR, MODULE_FILTER_COLOR, MODULE_LFO_COLOR, MODULE_DELAY_COLOR, MODULE_REVERB_COLOR } from '@/constants'

// big thanks go to Yoichi Kobayashi
// https://tympanus.net/codrops/2017/10/17/dynamic-shape-overlays-with-svg/


export default {
  props:{
    isFired: {
      type:Boolean,
      default: false
    },
    black: {
      type: Boolean,
      default: false
    }
  },
  name: 'svoosh',
  data() {
    return {
    pathArray: [], // Path elements in parent SVG. These are the layers of the overlay.
    numPoints: null, // Number of control points for Bezier Curve.
    duration: 900, // Animation duration of one path element.
    delayPointsArray: [], // Array of control points for Bezier Curve.
    delayPointsMax: null, // Max of delay value in all control points.
    delayPerPath: null, // Delay value per path.
    timeStart: Date.now(),
    isOpened: false,
    isAnimating: false,
    color: '',
    colorArray: []
    }
  },
  mounted(){
    this.pathArray.push(this.$refs.path1)
    this.pathArray.push(this.$refs.path2)
    this.pathArray.push(this.$refs.path3)
    this.colorArray.push(MODULE_OSCILLATOR_COLOR, MODULE_ENVELOPE_COLOR, MODULE_FILTER_COLOR, MODULE_LFO_COLOR, MODULE_DELAY_COLOR, MODULE_REVERB_COLOR)
    this.randomizeAll()
  },
  methods: {

    open() {
      const range = 4 * Math.random() + 6;
      for (var i = 0; i < this.numPoints; i++) {
        const radian = i / (this.numPoints - 1) * Math.PI;
        // let's replace delayPoints max with a certain number...
        this.delayPointsArray[i] = (Math.sin(-radian) + Math.sin(-radian * range) + 2) / 4 * this.delayPointsMax;
      }
        console.log(this.delayPointsArray)
      this.isOpened = true
      this.timeStart = Date.now();
      this.renderLoop();
      window.setTimeout(()=>{
        this.$emit('midway')
        this.close()
      },(this.duration+2*this.delayPerPath+this.delayPointsMax))
      window.setTimeout(()=>{this.$emit('bye')}, this.duration*2)
      this.randomizeAll()
    },
    close() {
      this.isOpened = false;
      this.timeStart = Date.now();
      this.renderLoop();
    },
    updatePath(time) {
      const points = [];
      for (var i = 0; i < this.numPoints; i++) {

        // sometimes, the points are NaN, most probably because sometimes this.delayPointsArray is empty
        points[i] = this.black ? this.cubicInOut(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100 : (1-this.cubicInOut(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1))) * 100
      }
      // console.log(points)
      let str = '';
      str += (this.isOpened) ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
      for (var i = 0; i < this.numPoints - 1; i++) {
        const p = (i + 1) / (this.numPoints - 1) * 100;
        const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
        str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]} `;
      }
      if (this.black) {
        str += (this.isOpened) ? `V 0 H 0` : `V 100 H 0`;
      } else {
        str += (this.isOpened) ? `V 100 H 0` : `V 0 H 0`;
      }
      return str;
      },
    cubicInOut(t) {
      return t < 0.5
    ? 4.0 * t * t * t
    : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;

    },
    renderLoop() {
      this.render();
      if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (3 - 1) + this.delayPointsMax) {
        requestAnimationFrame(() => {
          this.renderLoop();
        });
      }
      else {
        this.isAnimating = false;
      }
    },
    render() {
      if (this.isOpened) {
        for (var i = 0; i < 3; i++) {
          this.pathArray[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
        }
      } else {
        for (var i = 0; i < 3; i++) {
          this.pathArray[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (3 - i - 1))));
        }
      }
    },
    randomColor() {
      return this.black ? "#5c5c5e" : this.colorArray[Math.floor(Math.random()*this.colorArray.length)]
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomizeAll() {
      this.color = this.randomColor()
      this.delayPointsMax = this.getRandomInt(50, 300)
      this.delayPerPath = this.getRandomInt(50, 200)
      this.numPoints = this.getRandomInt(3, 10)
    }
  },
  watch: {
    isFired() {
      this.open()
    },
    isOpen() {

      // this.intervalID = window.setTimeout(this.toggle(), 6000)
      // this.toggle()
    }
  }
}
</script>

<style>
.shape-overlays path:nth-of-type(1) { fill-opacity: 0.5; }
.shape-overlays path:nth-of-type(2) { fill-opacity: 0.7; }
.shape-overlays path:nth-of-type(3) { fill-opacity: 1; }

is-opened {
	opacity: 1;
	transform: translateY(0) rotate(0);
	pointer-events: auto;
	transition-timing-function: ease;
}
.shape-overlays {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10040;
}
</style>
