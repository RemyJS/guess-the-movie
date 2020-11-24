<template>
  <header class="header">
    <b-nav tabs align="center">
      <b-nav-item to="/" @click="toMainScreen">Main</b-nav-item>
      <b-nav-item to="/setting">Setting</b-nav-item>
      <b-nav-item disabled>Score {{ score }}</b-nav-item>
    </b-nav>
  </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Header",
  computed: mapState(["score"]),
  methods: {
    ...mapMutations(['setIsGameStart']),

    toMainScreen() {
      this.setIsGameStart(false);
    },
  }
};
</script>

<style lang="scss">
.header {
  height: 50px;
}
</style>
