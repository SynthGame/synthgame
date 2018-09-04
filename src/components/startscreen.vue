<template>
  <div class="startscreen">
    <div class="startscreen-content-wrapper">
      <div>
    <p class="heading">Tats</p>
    <p class="subheading">Recreate the sound before time runs out!</p>
      </div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/O7x-AS6idOQ?rel=0?version=3&autoplay=1&controls=0&&showinfo=0&loop=1&playlist=O7x-AS6idOQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    <button class="button-next" @click="$emit('next')">Start</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "startscreen",
  props: {
    level: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style>
.startscreen {
  position: fixed;
  display: flex;
  /* align-items: center; */
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
  stroke-width: 3
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

.heading {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.subheading {
  margin-top:0;
  font-size: 3.5rem;
  font-weight: 500
}
.button-next {
    background: none;
    color: inherit;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    padding: 1rem 2rem;
  border: 1px solid white;
}
</style>
