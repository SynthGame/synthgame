<template>
  <div class="overlay" >
    <div class="overlay-content-wrapper">

        <h1>Tats</h1>
        <h2>A synthesizer game.</h2>

      <video width="480" autoplay loop muted>
        <source src="../../src/assets/intro.mp4" type="video/mp4">
      </video>

      <div class="credits">
        <!-- Game created by <a href="https://okbye.io" target="_blank"><span>Ok Bye</span></a>. Read the <a href="https://casestudies.okbye.io/tats/" target="_blank"><span>Case Study</span></a>. -->
        Game created by <a href="https://okbye.io" target="_blank"><span>Ok Bye</span></a>. Read the <router-link @click="$emit('toCaseStudy')" :to="{ name: 'tats', params: {} }"><span>Case Study</span></router-link>.
      </div>
    </div>
    <div class="overlay-content-wrapper player-part">

        <div class="player">
          <!-- Image -->
          <img src="../assets/team.jpg" class="custom-user-avatar" alt="">

          <!-- Name -->
          <span class="artist">Bart Proost</span>
        </div>

        <!-- Social -->
        <span class="twitter"></span>
        <span class="instagram"></span>
        <span class="soundcloud"></span>

        <!-- Main CTA -->
        <div>
          <button class="button-next" @click="$emit('startPreview')">Play</button>
          <!-- <button class="button-next" @click="$emit('create')">Make music</button> -->
        </div>

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
.player-part {
  justify-content: center;
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
