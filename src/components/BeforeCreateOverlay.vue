<template>
  <div class="overlay">
    <div class="overlay-content-wrapper">
        <h1>Tats ft.</h1>
        <!-- <div class="scores" v-if="customLevelIsActive && nameArtist !== 'Anonymous' ">
          <img class="custom-user-avatar" :src="avatarUrl"/>
          <span class="data artist">Preset by <a target="_blank" :href="'https://soundcloud.com/' + nameArtist">{{nameArtist}}</a></span>
        </div> -->
        <!-- <h2 v-if="!customLevelIsActive">Write the music for this game. On nov 17, Tatsuya Takahashi picks 1 lucky winner, who wins a trip to the MESS foundation!</h2> -->
        <h2>You can create and share your own loops here. Start with sequencer steps and tweak the knobs you learned about. Submit and get featured in game!</h2>
      <div>
        <button class="button-next" @click="$emit('back')">Back</button>
        <button class="button-next" @click="$emit('showCreate')">Ready</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getPresetById } from "@/db";

export default {
  name: "beforeCreate",
  data() {
    return {
      customLevelIsActive: false,
      customAuthor: null,
      customAuthorAvatar: null
    };
  },
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  created() {
    // var ogs = require('open-graph-scraper');
    // var options = {'url': 'https://soundcloud.com/bart-proost'};
    // ogs(options, function (error, results) {
    //   console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
    //   console.log('results:', results);
    // });
    if (this.$route.query.preset) {
      this.customLevelIsActive = true;
      // getPresetById(this.$route.query.preset)
      //   .then(data => {
      //     this.customLevelIsActive = true
      //     this.customAuthor = data.name
      //     this.customAuthorAvatar = data.avatarUrl
      //     // this.startPreset(data.parameterValues)
      //     // this.customLevelCreator = data.name
      //   })
    }
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
        this.$emit("showCreate");
      }
    }
  },
  computed: {
    nameArtist() {
      return this.$store.state.name;
    },
    avatarUrl() {
      return this.$store.state.avatarUrl;
    }
  }
};
</script>

<style scoped lang="scss">
.custom-user-avatar {
  height: 50px;
  width: 50px;
  border-radius: 100%;
  border: 2px solid white;
  background: white;
}

.scores {
  width: 20em;
  display: flex;
  justify-content: center;
  align-items: center;
  .artist {
    font-size: 1em;
    font-weight: 200;
    text-transform: uppercase;
    margin-left: 1em;
    a {
      color: white;
    }
  }
}
</style>
