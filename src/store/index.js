import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    score: 0,
    max: 21,
    isGameStart: false,
    hints: true,
    difficulty: 'easy',
  },
  mutations: {
    setScore(state, payload) {
      state.score = payload;
    },
    setIsGameStart(state, payload) {
      state.score = 0;
      state.isGameStart = payload;
    },
    setDifficulty(state, payload) {
      const { difficulty, hints } = payload;
      state.difficulty = difficulty;
      state.hints = hints;
      switch(difficulty) {
        case 'easy':
          state.max = 21;
          break;
        case 'medium':
          state.max = 24;
          break;
        case 'hard':
          state.max = 30;
          break; 
      }
    },
  },
});

export default store;
