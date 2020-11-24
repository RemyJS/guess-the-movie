<template>
  <b-card
    title="Game Over"
    img-src="https://idealbloghub.com/wp-content/uploads/2020/02/Top-best-Android-Apps-to-watch-and-stream-free-movies-online.jpg"
    img-alt="Image"
    img-top
    class="container text-center"
  >
    <b-card-text>
      <div>Your result {{ score }}</div>
      <div class="text-warning" v-if="errors != 0">
        You make {{ errors }} errors
      </div>
      <h3 class="text-success" v-else>Impressive!</h3>
    </b-card-text>

    <b-button pill variant="success" @click="restartGame"
      >Restart Game</b-button
    >
  </b-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import impressiveSound from "@/assets/audio/Quake_3_Impressive_Sound_Effect.mp3";

export default {
  name: "GameOver",
  props: {
    errors: [Number],
  },
  created() {
    if (this.errors === 0) {
      setTimeout(() => {
        let a = new Audio(impressiveSound);
        a.play();
      }, 1000);
    }
  },
  computed: mapState(["score"]),
  methods: {
    ...mapMutations(["setIsGameStart"]),

    restartGame() {
      this.setIsGameStart(false);
    },
  },
};
</script>
<style lang="scss">
.card {
  img {
    border: 3px ridge;
    border-radius: 15px;
  }

  &-body {
    max-width: 700px;
  }

  width: fit-content !important;
  padding-top: 10px !important;
  border-radius: 15px !important;
}
</style>
