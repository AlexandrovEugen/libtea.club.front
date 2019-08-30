<template>
  <div id="app">
    <p>Dynamically change video source</p>
    <Media :kind="'video'" :src="src" autoplay controls width="300" />
    <div>
      <input
        @keyup.enter="changeSrc"
        placeholder="Enter new video src..."
        type="text"
        v-model="new_src"
      />
      <p>
        Example: https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4
      </p>
    </div>
  </div>
</template>

<script>
import Media from "@dongido/vue-viaudio";

export default {
  name: "App",
  components: {
    Media
  },
  data() {
    return {
      src:
        "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
      new_src: ""
    };
  },
  methods: {
    changeSrc() {
      this.src = this.new_src;
      this.new_src = "";
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

input {
  width: 60%;
  height: 40px;
  font-size: 16px;
}
</style>
