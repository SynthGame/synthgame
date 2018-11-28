<template>
  <div class="overlay" >
    <div class="overlay-content-wrapper">

        <h1>Tats</h1>
        <h2>A synthesizer game.</h2>

      <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/O7x-AS6idOQ?rel=0?version=3&autoplay=1&controls=0&&showinfo=0&loop=1&playlist=O7x-AS6idOQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> -->
      <video width="480" autoplay loop muted>
        <source src="../../src/assets/intro.mp4" type="video/mp4">
      </video>
      <div>
        <button class="button-next" @click="$emit('startPreview')">Play game</button>
        <button class="button-next" @click="$emit('create')">Make music</button>
      </div>
      <div class="credits">
        Game created by <a href="https://okbye.io" target="_blank"><span>Ok Bye</span></a>. Read the <a href="https://casestudies.okbye.io/tats/" target="_blank"><span>Case Study</span></a>.
      </div>
    </div>
    <!-- <div :style="{'margin-left': marginLeftRbmg}" class="rbmg">
        <iframe width="250" height="150" src="https://www.youtube.com/embed/nkeLxvVvMdg?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <img class="rbmg-img" src="../../src/assets/rbmg.png" alt="Powered by Red Bull Mind Gamers">
        <svg @click="hideVideo" class="hidevideo" width="18px" height="17px" viewBox="0 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="exit_icon" fill="#7D00DA" fill-rule="nonzero" stroke="#FFFFFF" stroke-width="1.785">
                    <path d="M16.6,0.6 L0.9,16.3" id="Shape"></path>
                    <path d="M16.6,16.3 L0.9,0.6" id="Shape"></path>
                </g>
            </g>
        </svg>
    </div> -->
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
  },
  data() {
    return {
      marginLeftRbmg: 0
    };
  },
  mounted() {
    window.addEventListener("keydown", this.emitOnKey);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.emitOnKey);
  },
  methods: {
    emitOnKey() {
      if (event.keyCode === 13) {
        this.$emit("startPreview");
      }
    },
    hideVideo() {
      this.marginLeftRbmg = "-100vw";
    }
  }
};
</script>

<style scoped lang="scss">
.rbmg {
  position: absolute;
  bottom: 2em;
  left: 3em;
  width: auto;
  transition: all 1s;
  &-img {
    position: absolute;
    margin-left: -285px;
    margin-top: 87px;
    height: 80px;
  }
  .hidevideo {
    position: absolute;
    margin: -4px 0 0 -9px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      transform: rotate(90deg);
    }
  }
}

@media only screen and (max-width: 1000px) {
  .rbmg {
    position: absolute;
    bottom: unset;
    top: -3em;
    left: 3em;
    width: auto;
    transition: all 1s;
    transform: scale(0.5) translate(-110px, 50px);
    &-img {
      position: absolute;
      margin-left: -285px;
      margin-top: 87px;
      height: 80px;
    }
  }
}

.credits {
  font-size: 1em;
  font-weight: 200;
  & a {
    text-decoration: none;
    color: white;
    text-transform: uppercase;
    // transition: 0.6s all;
    &:hover {
      border-bottom: 1px solid white;
    }
    & span {
      color: #ff8574;
      text-decoration: none;
      font-weight: 600;
      font-size: 1em;
    }
  }
}
</style>
