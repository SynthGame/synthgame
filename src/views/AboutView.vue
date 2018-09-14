<template>
  <div class="about">
    <h1>This is an about page</h1>
    <svoosh :isFired="isFired" @midway="change"/>
    <button @click="triggerSvoosh" style="z-index: 99999999999">{{content}}</button>
  </div>
</template>

<script>
import Svoosh from '@/components/Svoosh'
export default {
  components: {
    Svoosh
  },
  data() {
    return {
      isFired: false,
      content: 'HEHE'
    }
  },
  methods: {
    triggerSvoosh() {
      this.isFired=!this.isFired
      },
    change() {
      this.content = 'haaahaaaaaaa'
      // this.isFired = false
    }
  }
}
</script>

<style>
button, input[type="submit"], input[type="reset"] {
    /*background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    // cursor: pointer;
    outline: inherit;
      border: 1px #ff8574 solid;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;*/
}

  /*p {
     margin: .5em 0 0 0;
     font-size: .7em;
     text-transform: uppercase;
     letter-spacing: 1px;
  }
  .button-wrapper {
      display: flex;
      flex-wrap: wrap;
      width: 25%;
      min-width: 5rem;
  }

.selected {
  background-color: #ff8574
}*/
</style>
