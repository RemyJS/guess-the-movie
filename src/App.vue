<template>
  <div id="app">
    <Header/>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lemonada&display=swap');

#app {
  font-family: 'Lemonada', cursive;
}

.container {
  width: 50vw;
  max-height: 100%;
  margin: 0 auto;
}
</style>
