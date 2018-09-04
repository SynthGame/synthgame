<template>
  <div class="startscreen">
    <div class="startscreen-content-wrapper">
      <div>
    <h1>Tats</h1>
    <h2>Align all synthesizer controls before 00:00!</h2>
      </div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/O7x-AS6idOQ?rel=0?version=3&autoplay=1&controls=0&&showinfo=0&loop=1&playlist=O7x-AS6idOQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    <button class="button-next" @click="$emit('next')">Start</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'startscreen',
  props: {
    level: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped lang="scss">
.startscreen {
  position: fixed;
  display: flex;
  align-content: center;
  justify-content: center;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .90);
  transition: opacity .3s ease;
  fill: none;
  stroke: red;
  stroke-width: 3;
  & h1 {
    text-transform: uppercase;
  }
  & h2 {
    font-weight: 300;
    font-size: 3em;
    max-width: 13em;
  }
}

.startscreen-content-wrapper {
  padding: 1rem;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  align-content: center;
}

.button-next {
    background: #ff8574;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 2em;
    font-weight: 900;
    color: inherit;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    padding: .8rem 1.4rem;
    border: none;
}
</style>
