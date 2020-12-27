/* eslint-disable no-unused-vars */
import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import Game from "@/components/Game.vue";
import { BootstrapVue } from "bootstrap-vue";

import movies from "../mocks/movies.mock";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe("Game.vue", () => {

  let data;
  let store; 

  let state;
  let mutations;
  beforeEach(()=> {

    data = {
      isClicked: false,
      correctAnswer: 1,
      variantStyle: null,
      isLoading: false,
      movies: movies,
      usedHints: false,
      usedHint1: false,
      isGameOver: false,
      bonus: 0,
      errors: 0,
    },
    state = {
      score: 0,
      max: 21,
      isGameStart: false,
      hints: true,
      difficulty: 'easy',
    },
    mutations = {
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
      }
    }

    store = new Vuex.Store({
      state,
      mutations
    })
  })

 
  it("Shoud has 4 control buttons", () => {
    const wrapper = mount(Game, {
      localVue,
      data() {
        return data;
      },
      store,
    });
    const buttons = wrapper.findAll(".game__buttons button");
    expect(buttons.length).toBe(4);
  });

  it("After round control buttons shoud be disabled", () => {
    data.isClicked = true;
    const wrapper = mount(Game, {
      localVue,
      data() {
        return data;
      },
      store,
    });
    const buttons = wrapper.findAll(".game__buttons button");
    const spy = jest.spyOn(wrapper.vm,'check');

    for(let i = 0; i < 4; i++) {
      buttons.at(i).trigger('click');
    }

    expect(spy).toHaveBeenCalledTimes(4);
  });

  it("Tip button disabled", () => {
    data.usedHint1 = true;
    const wrapper = mount(Game, {
      localVue,
      data() {
        return data;
      },
      store,
      created() {
        return true;
      },
    });
    const spy = jest.spyOn(wrapper.vm, 'hint1');
    const tipBtn = wrapper.find("#tipBtn");
    tipBtn.trigger('click');

    expect(spy).toHaveBeenCalledTimes(0);
    expect(spy()).toBe('disabled');
  });

  it("Tip button shoud be hide", () => {
    state.hints = false;
    store = new Vuex.Store({
      state,
      mutations
    });
    const wrapper = mount(Game, {
      localVue,
      data() {
        return data;
      },
      store,
      created() {
        return true;
      },
    });
    const display = wrapper.find(".btn-group-lg");
    expect(display.isVisible()).toBe(false);
  });

  it("random value [0-3]", () => {
    const wrapper = mount(Game, {
      localVue,
      data() {
        return data;
      },
      store,
    });
    for (let i = 0; i < 5; i++) {
      expect(wrapper.vm.getNumber()).toBeGreaterThanOrEqual(0);
      expect(wrapper.vm.getNumber()).toBeLessThan(4);
    }
  });

  it("correct answer", () => {
    data.isClicked = true;

    const wrapper = mount(Game, {
      localVue,
      data() {
        return data;
      },
      store,
    });

    let btnSelector = 'button[name="' + wrapper.vm.correctAnswer + '"]';
    let btn = wrapper.find(btnSelector);
    let h4 = wrapper.find(".game__header h4");
    expect(h4.text()).toBe(btn.text());
    
    let spy = jest.spyOn(wrapper.vm, 'check');
    btn.trigger("click");
    expect(spy).toHaveBeenCalled();
  });

  it("progress bar shoud be rise", () => {
    const wrapper = mount(Game, {
      localVue,
      data() {
        return data;
      },
      store,
    });
    
    const { incScore } = wrapper.vm; 

    for(let i = 0; i < store.max; i += 2){
      const bar = wrapper.find(".progress-bar");
      expect(bar.attributes("aria-valuenow")).toBe("" + i);
      incScore();
    }
  });

  it("Hard-mode counter and GameOver", () => {

    state.difficulty = 'hard';
    state.max = 30;

    store = new Vuex.Store({
      state,
      mutations
    })

    const wrapper = mount(Game, {
      localVue,
      data() {
        return data;
      },
      store,
    });
    
    const { incScore, gameOver } = wrapper.vm; 

    for(let i = 0; i < store.max; i += 1){
      expect(state.score).toBe(i);
      incScore();
    }

    gameOver();

    expect(wrapper.vm.isGameOver).toBeTruthy();
  })

  it("Next Round Btn", () => {
    data.isClicked = true;
    const wrapper = mount(Game, {
      localVue,
      data() {
        return data;
      },
      store,
    });
    const next = wrapper.find(".btn-next");
    next.trigger('click');

    expect(data.isClicked).toBeFalsy;
  });


});
