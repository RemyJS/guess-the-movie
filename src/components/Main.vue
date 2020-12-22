<template>
  <b-card
    title="Can you guess the movie?"
    img-src="https://play-lh.googleusercontent.com/UvAp3cqa2fizhy9TcMwtMC1IbuBARmMeVpryicbOHnHfBcb3EGjdYbpnNcxYKD-XA9z6"
    img-alt="Image"
    img-top
    class="container text-center"
  >
    <b-card-text>
      Guess the movie by its description, you can also use a hint that removes
      one answer option but gives a penalty point.
    </b-card-text>

    <b-button pill variant="primary" @click="startGame">Start Game</b-button>
  </b-card>
</template>

<script>
import { mapMutations } from "vuex";
import { BCard, BCardText, BButton } from 'bootstrap-vue'
import prepare from "@/assets/audio/Quake_3_Prepare_to_Fight_Sound_Effect.mp3";

export default {
  name: "Main",
  components: {
    BCard,
    BCardText,
    BButton,
  },
  directives: {
    'b-card': BCard,
    'b-card-text': BCardText,
    'b-button': BButton,
  },
  methods: {
    ...mapMutations(["setIsGameStart"]),

    startGame() {
      let a = new Audio(prepare);
      a.play();
      this.setIsGameStart(true);
    },
  },
};
</script>

