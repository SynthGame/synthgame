<template>
  <div class="sequencer-button">
    <div class="sequencer-button__indicator"></div>
  </div>
</template>

<script>
export default {
  name: 'SequencerButton',
  data: function () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.sequencer-button {
  height: 100px;
  width: 45px;
  display: inline-block;
  margin: 10px;
  border: 2px solid #F40056;
  border-radius: 2px;

  &__indicator {
    height: 15px;
    width: 15px;
    margin: 10px auto;
    border: 2px solid white;
    border-radius: 50%;
  }
}
</style>