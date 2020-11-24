<template>
  <Game v-if="isGameStart" />
  <Main v-else />
</template>

<script>
import Main from "@/components/Main";
import Game from "@/components/Game";
import { mapState } from 'vuex';

export default {
  components: {
    Main,
    Game,
  },
  computed: mapState(['isGameStart']),
};
</script>

