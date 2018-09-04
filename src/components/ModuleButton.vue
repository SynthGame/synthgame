<template>
    <label class="button" :style="label== value ? pickedColor :''">
    <input type="radio" :value="label" :name="name" id="two" v-model="picked">

    <!-- changing the stroke color when label ==value -->

    <svg version="1.1" v-if="label === 'sine'" :stroke="label === value? 'black':''"
     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
     x="0px" y="0px" width="16.3px" height="8.8px" viewBox="0 0 16.3 8.8" style="enable-background:new 0 0 16.3 8.8;"
     xml:space="preserve">
      <path class="st0" d="M15.7,4.4c0,2.1-1.7,3.8-3.8,3.8S8.2,6.5,8.2,4.4S6.5,0.6,4.4,0.6S0.6,2.3,0.6,4.4"/>
    </svg>
    <svg version="1.1" v-if="label === 'square'"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"   xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
      x="0px" y="0px" width="16.3px" height="16.3px" viewBox="0 0 16.3 16.3"    style="enable-background:new 0 0 16.3 16.3;"
      xml:space="preserve">
      <path class="st0" d="M0.6,8.1V0.6h7.6v7.6v7.6h7.6V8.1l0,0"/>
    </svg>
    <svg version="1.1" v-if="label === 'triangle'"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
      x="0px" y="0px" width="15.9px" height="8.8px" viewBox="0 0 15.9 8.8" style="enable-background:new 0 0 15.9 8.8;"
      xml:space="preserve">
      <path class="st0" d="M0.4,8.4L8,0.8l7.5,7.6"/>
    </svg>
    <svg version="1.1" v-if="label === 'sawtooth'"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
    x="0px" y="0px" width="21.9px" height="9.9px" viewBox="0 0 21.9 9.9" style="enable-background:new 0 0 21.9 9.9;"
    xml:space="preserve">
    <path class="st0" d="M21.5,1.2L21.5,1.2L10.9,8.8V1.2L0.3,8.8"/>
    </svg>
        <svg version="1.1" v-if="label === 'highpass'"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
          x="0px" y="0px" width="20.6px" height="10.6px" viewBox="0 0 20.6 10.6" style="enable-background:new 0 0 20.6 10.6;"
          xml:space="preserve">
      <path class="st0" d="M0.6,10.6c0-5.5,4.5-10,10-10c0,0,10,0,10,0"/>
      </svg>
        <svg version="1.1" v-if="label === 'lowpass'"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
            x="0px" y="0px" width="20.6px" height="10.6px" viewBox="0 0 20.6 10.6" style="enable-background:new 0 0 20.6 10.6;"
            xml:space="preserve">
        <path class="st0" d="M0,0.6c0,0,10,0,10,0c5.5,0,10,4.5,10,10"/>
        </svg>
        <svg version="1.1" v-if="label === 'bandpass'"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
            x="0px" y="0px" width="21.3px" height="10.6px" viewBox="0 0 21.3 10.6" style="enable-background:new 0 0 21.3 10.6;"
            xml:space="preserve">
        <path class="st0" d="M0.6,10.6c0-5.5,4.5-10,10-10s10,4.5,10,10"/>
        </svg>
  </label>
</template>

<script>
export default {
  name: 'module-button',
  props: ['name', 'label', 'value', 'color'],
  computed: {
    picked: {
      get: function() {
          return this.value
      },
      set: function() {
          // Communicate the change to parent component so that selectedValue can be updated
          this.$emit("change", this.label)
      }
    },
    pickedColor() {
      return {'background-color': this.color}
    }
  }
}
</script>

<style>
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

</style>
