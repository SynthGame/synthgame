<template>
    <button class="button" :style="isPressed ? pickedColor :''">

    <!-- changing the stroke color when label ==value -->
    <!-- SINE -->
    <svg version="1.1"
      v-if="shape === 'sine'"
      x="0px" y="0px" width="12.3px" height="12.6px" viewBox="0 0 12.3 6.6" style="enable-background:new 0 0 12.3 6.6;"
      xml:space="preserve">
      <g>
          <path class="st0" d="M0.4,3.3c0-1.6,1.3-2.9,2.8-2.9s2.8,1.3,2.8,2.9"/>
          <path class="st0" d="M11.8,3.3c0,1.6-1.3,2.9-2.9,2.9S6.1,4.9,6.1,3.3"/>
      </g>
    </svg>

    <!--SQUARE -->
    <svg version="1.1"
        v-if="shape === 'square'"
        x="0px" y="0px" width="12.3px" height="12.6px" viewBox="0 0 12.3 6.6" style="enable-background:new 0 0 12.3 6.6;"
        xml:space="preserve">
      <g>
        <polyline class="st0" points="0.4,3.3 0.4,0.4 6.1,0.4 6.1,3.3 6.1,6.2 11.8,6.2 11.8,3.3 11.8,3.3     "/>
      </g>
    </svg>

    <!-- SAWTOOTH -->
        <svg version="1.1"  v-if="shape === 'sawtooth'"
            x="0px" y="0px" width="12.3px" height="12.6px" viewBox="0 0 12.3 6.6" style="enable-background:new 0 0 12.3 6.6;"
            xml:space="preserve">
        <g>
            <polyline class="st0" points="12.1,2.2 6.1,5.8 6.1,0.8 0.2,4.4     "/>
        </g>
        </svg>

    <!-- TRIANGLE -->
    <svg version="1.1"  v-if="shape === 'triangle'"
        x="0px" y="0px" width="12.3px" height="12.6px" viewBox="0 0 12.3 6.6" style="enable-background:new 0 0 12.3 6.6;"
        xml:space="preserve">
    <g>
        <polyline class="st0" points="12,6.2 6.3,0.6 0.3,6.2     "/>
    </g>
    </svg>

    <svg version="1.1" v-if="shape === 'highpass'"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
      x="0px" y="0px" width="20.6px" height="10.6px" viewBox="0 0 20.6 10.6" style="enable-background:new 0 0 20.6 10.6;"
      xml:space="preserve">
      <path class="st0" d="M0.6,10.6c0-5.5,4.5-10,10-10c0,0,10,0,10,0"/>
    </svg>
    <svg version="1.1" v-if="shape === 'lowpass'"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
        x="0px" y="0px" width="20.6px" height="10.6px" viewBox="0 0 20.6 10.6" style="enable-background:new 0 0 20.6 10.6;"
        xml:space="preserve">
      <path class="st0" d="M0,0.6c0,0,10,0,10,0c5.5,0,10,4.5,10,10"/>
    </svg>
    <svg version="1.1" v-if="shape === 'bandpass'"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
        x="0px" y="0px" width="21.3px" height="10.6px" viewBox="0 0 21.3 10.6" style="enable-background:new 0 0 21.3 10.6;"
        xml:space="preserve">
      <path class="st0" d="M0.6,10.6c0-5.5,4.5-10,10-10s10,4.5,10,10"/>
    </svg>
  </button>
</template>
<script>
export default {
  name: 'module-button',
  props: ['shape', 'color', 'isPressed'],
  computed: {
    picked: {
      get: function () {
        return this.value
      },
      set: function () {
        // Communicate the change to parent component so that selectedValue can be updated
        this.$emit('change', this.label)
      }
    },
    pickedColor () {
      return {'background-color': this.color}
    }
  }
}
</script>

<style scoped lang="scss">
.st0{fill:none;stroke:#FFFFFF;stroke-width:1.1844;stroke-miterlimit:10;}
label {
  border: 1px white solid;
  justify-content: center;
  align-items: center;
  display: flex;
  min-width: 5rem;
  width: 20%;
  min-height: 2rem;
  cursor: pointer;
  margin: 0.5rem
}
input {
  position: absolute;
  left: -9990px
}

button, input[type="submit"], input[type="reset"] {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  border: 1px #ff8574 solid;
  justify-content: center;
  align-items: center;
  display: flex;
  min-width: 1.8em;
  min-height: 1.8em;
  cursor: pointer;
  margin: 0.1rem;
    &:hover {
      border: 3.4px #ff8574 solid;
      & .st0 {
        stroke-width: 2;
      }
  }
}

</style>
