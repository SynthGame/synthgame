<template>
  <div class="dial">
    <div class="dial__indicator">
      <svg viewBox="0 0 100 100">
        <defs>
          <linearGradient id="Gradient">
              <stop stop-color="#FB007F" offset="0%"></stop>
              <stop stop-color="#F40029" offset="100%"></stop>
          </linearGradient>
          <mask id="Mask">
            <circle cx="50" cy="50" r="48" fill="black">
            </circle>
          </mask>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="url(#Gradient)" mask="url(#Mask)" />
        <circle cx="50" cy="50" r="48" class="black" :style="{'stroke-dashoffset': `${-(value*230)}px`}">
        </circle>
      </svg>
    </div>
    <div class="dial__name text">
      {{percentValue()}}
    </div>
    <div class="dial__knob" @mousedown="startChange" :class="{'dial__knob--changing':changing}">
      <div class="dial__knob__level" :style="{'height': `${value*100}%`}"></div>
    </div>
  </div>
</template>

<script>

let startY,
startVal;

export default {
  name: 'dial',
  props: ['value', 'name', 'count'],
  data() {

    const snap = this.count !== undefined;
    const count = this.count && parseInt(this.count) || 16;
    const dots = ([...new Array(count)]).map((d,i) => i);

    return {
      dots: dots,
      snap: snap,
      changing: false
    }
  },
  methods: {
    startChange(e) {
      this.changing = true;
      startY = e.screenY;
      startVal = this.value;
      window.addEventListener('mousemove',this.move);
      window.addEventListener('mouseup',this.stopChange);
    },
    percentValue() {
      return this.changing ? `${Math.round(this.value*100)}%` : this.name;
    },
    move (e) {
      let val = Math.max(Math.min(startVal + ((startY - e.screenY) / 80),1),0);
      if (this.snap) {
        const len = this.dots.length - 1;
        val = Math.round(val * len) / len;
      }
      this.$el.querySelector('circle').setAttributeNS(null,'class','flesh');
      this.$emit('change',val);
      localStorage[this.storeAs] = val;
    },
    stopChange() {
      window.removeEventListener('mousemove',this.move);
      window.removeEventListener('mouseup',this.stopChange);
      this.changing = false;
    }
  }
}
</script>

<style lang="scss">
.dial {
  margin-top: 1em;
  position: relative;
  display: block;
  height: 7em;
  min-width: 2em;
  &__name {
    margin-bottom: 2em;
    height: 1.25em;
  }
  &__indicator {
    width: 4.8em;
    height: 4.8em;
    position: absolute;
    left: 50%;
    transform: translateX(-52.5%) translateY(2%);
    svg {
      box-sizing: border-box;
      padding: 0.1em;
      margin: 4.24em 0 0;
      transform: translateY(-50%);
      circle {
        stroke: #fff;
        stroke-width: 4px;
        fill: none;
        transform-origin: center;
        stroke-dasharray: 314px;
        &.black {
          stroke: #14171f;
          stroke-width: 8px;
          transform: rotate(132deg);
        }
      }
    }
  }
  &__knob {
    width: 3.3em;
    height: 3.3em;
    margin: 1.65em auto 1em auto;
    border-radius: 50%;
    position: relative;
    border: 1px #e0e1e2 solid;
    cursor: ns-resize;
    background: #0f141b;
    overflow: hidden;
    &--changing, &:hover {
      .dial__knob__level {
        opacity: 1;
        transition: .2s opacity;
      }
    };
    &__level {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: #e0e1e2;
      opacity: 0;
      overflow: hidden;
      z-index: 1;
      transition: .2s opacity;
    }
  }
}
</style>
