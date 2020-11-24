<template>
  <div class="jumbotron setting container">
    <h1 class="display-3">Setting</h1>
    <p class="lead">
      <b-form-group label="Difficulty setting">
        <b-form-radio-group
          id="btn-radios-2"
          v-model="selectedDifficulty"
          :options="options"
          buttons
          button-variant="outline-primary"
          size="lg"
          name="radio-btn-outline"
        ></b-form-radio-group>
      </b-form-group>
      <b-form-checkbox v-model="switchHints" name="check-hints" switch size="lg">
        Hints
      </b-form-checkbox>
    </p>
    <hr class="my-4" />

    <p class="lead">
      <b-button variant="primary" pill size="lg" @click="saveSetting"
        >Save setting</b-button
      >
    </p>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      switchHints: true,
      selectedDifficulty: "easy",
      options: [
        { text: "Easy", value: "easy" },
        { text: "Medium", value: "medium" },
        { text: "Hard", value: "hard" },
      ],
    };
  },
  computed: {
    ...mapState(["hints", "difficulty"]),
  },
  created() {
    this.switchHints = this.hints;
    this.selectedDifficulty = this.difficulty;
  },
  methods: {
    ...mapMutations(["setDifficulty"]),

    saveSetting() {
      const payload = {
        hints: this.switchHints,
        difficulty: this.selectedDifficulty,
      };
      this.setDifficulty(payload);
    },
  },
};
</script>
