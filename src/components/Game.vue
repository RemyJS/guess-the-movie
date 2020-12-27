<template>
  <div v-if="!isGameOver">
    <div class="text-center" v-if="isLoading">
      <b-spinner
        style="width: 4rem; height: 4rem; margin-top: 4rem;"
        label="Large Spinner"
        type="grow"
        variant="secondary"
      ></b-spinner>
    </div>
    <div class="game container" v-else>
      <b-progress
        :value="score"
        :max="max"
        variant="success"
        class="mb-3"
      ></b-progress>
      <div class="game__header" :class="variantStyle">
        <h4 v-if="isClicked">{{ movies[correctAnswer].Title }}</h4>
        <h4 v-else>What a name this movie ?</h4>
      </div>
      <div class="game__image">
        <img
          :class="{ game__image_blur: !isClicked }"
          :src="movies[correctAnswer].Poster"
        />
      </div>
      <b-button-group v-show="hints & !isClicked" size="lg">
        <b-button
          id="tipBtn"
          pill
          v-b-tooltip.hover
          title="-1 wrong variant"
          variant="warning"
          @click="hint1"
          >Give me a tip</b-button
        >
      </b-button-group>
      <div class="game__text">
        {{ movies[correctAnswer].Plot }}
      </div>
      <div class="game__buttons">
        <b-button
          pill
          variant="secondary"
          @click="
            (event) => {
              check(event);
            }
          "
          v-for="i in 4"
          :key="i"
          :name="i - 1"
          >{{ movies[i - 1].Title }}</b-button
        >
      </div>
      <b-button
        block
        pill
        variant="success"
        v-show="isClicked"
        @click="nextRound"
        size="lg"
        class="btn-next"
      >
        Next
      </b-button>
    </div>
  </div>
  <GameOver :errors="errors" v-else />
</template>

<script>
import { mapState, mapMutations } from "vuex";
import GameOver from "./GameOver";
import correctSound from "@/assets/audio/correct.mp3";
import errorSound from "@/assets/audio/error.mp3";
import excellentSound from "@/assets/audio/Quake_3_Excellent_Sound_Effect.mp3";
import hint1Sound from "@/assets/audio/5050.mp3";
import getMovies from "../services/movies_service";

export default {
  name: "Game",
  data() {
    return {
      isClicked: false,
      correctAnswer: null,
      variantStyle: null,
      isLoading: true,
      movies: null,
      usedHints: false,
      usedHint1: false,
      isGameOver: false,
      bonus: 0,
      errors: 0,
    };
  },
  components: {
    GameOver,
  },
  computed: {
    ...mapState(["score", "difficulty", "hints", "max"]),
  },
  created() {
    this.correctAnswer = this.getNumber();
    this.loadMovies();
  },
  methods: {
    ...mapMutations(["setScore"]),

    loadMovies() {
      getMovies()
        .then((movies) => {
          this.movies = movies;
           console.log("cheat's ;) ", this.correctAnswer + 1);
        })
        .then(() => {
          this.isLoading = false;
        });
    },
    incScore() {
      let point = 3;
      switch (this.difficulty) {
        case "easy":
          point -= 1;
          break;
        case "medium":
          point -= 1;
          break;
        case "hard":
          point -= 2;
          break;
      }
      this.setScore(this.score + point);
    },
    check(e) {
      if (this.isClicked) return false;
      let audio;
      this.isClicked = true;
      if (+e.target.name == this.correctAnswer) {
        this.variantStyle = "bg-info";
        e.target.className = "btn btn-success rounded-pill";
        audio = new Audio(correctSound);
        this.bonus += 1;
        if (this.usedHints) {
          this.incScore();
        } else {
          this.setScore(this.score + 3);
        }
        if (this.bonus % 3 === 0) {
          this.setScore(this.score + 3);
          setTimeout(() => {
            audio = new Audio(excellentSound);
            audio.play();
          }, 500);
        }
        if (this.score > this.max) {
          this.gameOver();
        }
      } else {
        this.variantStyle = "bg-danger";
        e.target.className = "btn btn-danger rounded-pill";
        this.bonus = 0;
        this.errors += 1;
        audio = new Audio(errorSound);
      }
      audio.play();
      if (this.score > this.max) this.gameOver();
    },
    getNumber() {
      return Math.floor(Math.random() * 4);
    },
    hint1(e) {
      if (this.usedHint1) return 'disabled';
      this.usedHint1 = true;
      this.usedHints = true;
      e.target.className = "btn btn-secondary disabled rounded-pill";
      let rnd = Math.floor(Math.random() * 4);
      while (rnd == this.correctAnswer) rnd = Math.floor(Math.random() * 4);
      let a = new Audio(hint1Sound);
      a.play();
      let buttons = document.querySelectorAll(".game__buttons button");
      buttons[rnd].hidden = true;
    },
    nextRound() {
      (this.isClicked = false),
        (this.variantStyle = null),
        (this.isLoading = true),
        (this.movies = null),
        (this.usedHints = false),
        (this.usedHint1 = false),
        (this.correctAnswer = this.getNumber());
      this.loadMovies();
    },
    gameOver() {
      this.isGameOver = true;
    },
  },
};
</script>

<style lang="scss">
.game {
  text-align: center;

  &__header {
    border-radius: 25px;
  }

  &__image {
    margin: 10px 0;
    overflow: hidden;

    img {
      width: auto;
      max-width: 100%;
      object-fit: contain;
      height: 380px;
      border: 3px ridge;
      border-radius: 15px;
    }

    &_blur {
      filter: blur(18px);
    }
  }

  &__text {
    position: relative;
    margin: 20px 0;

    &_alert {
      position: absolute !important;
      top: 0;
    }
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }

  .btn-next {
    margin-top: 30px;
  }

  .progress {
    border-radius: 25px;
  }
}

@media (max-width: 768px) {
  .game__buttons {
    flex-direction: column;

    button {
      margin-top: 5px;
    }
  }
}
</style>
