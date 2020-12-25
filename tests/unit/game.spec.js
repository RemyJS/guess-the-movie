/* eslint-disable no-unused-vars */
import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import Game from "@/components/Game.vue";
import { BootstrapVue, BTab } from "bootstrap-vue";

import store from "@/store/index.js";
import movies from "../mocks/movies.mock";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe("Game.vue", () => {
  it("Shoud has 4 control buttons", () => {
    const wrapper = mount(Game, {
      localVue,
      data() {
        return {
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
        };
      },
      computed: {
        score() {
          return 0;
        },
        dificulty() {
          return "easy";
        },
        hints() {
          return true;
        },
        max() {
          return 21;
        },
      },
      created() {
        return true;
      },
    });
    const buttons = wrapper.findAll(".game__buttons button");
    expect(buttons.length).toBe(4);
  });

  it("Tip button shoud be hide", () => {
    const wrapper = mount(Game, {
      localVue,
      data() {
        return {
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
        };
      },
      computed: {
        score() {
          return 0;
        },
        dificulty() {
          return "easy";
        },
        hints() {
          return false;
        },
        max() {
          return 21;
        },
      },
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
        return {
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
        };
      },
      computed: {
        score() {
          return 0;
        },
        dificulty() {
          return "easy";
        },
        hints() {
          return false;
        },
        max() {
          return 21;
        },
      },
      created() {
        return true;
      },
    });
    for (let i = 0; i < 5; i++) {
      expect(wrapper.vm.getNumber()).toBeGreaterThanOrEqual(0);
      expect(wrapper.vm.getNumber()).toBeLessThan(4);
    }
  });

  it("correct answer", () => {
    let checkMock = jest.fn();
    const wrapper = mount(Game, {
      localVue,
      data() {
        return {
          isClicked: true,
          correctAnswer: 0,
          variantStyle: null,
          isLoading: false,
          movies: movies,
          usedHints: false,
          usedHint1: false,
          isGameOver: false,
          bonus: 0,
          errors: 0,
        };
      },
      computed: {
        score() {
          return 0;
        },
        dificulty() {
          return "easy";
        },
        hints() {
          return false;
        },
        max() {
          return 21;
        },
      },
      created() {
        return true;
      },
      methods: {
        check() {
          checkMock();
        },
      },
    });

    let btnSelector = 'button[name="' + wrapper.vm.correctAnswer + '"]';
    let btn = wrapper.find(btnSelector);
    btn.trigger("click");

    let h4 = wrapper.find(".game__header h4");
    expect(checkMock).toHaveBeenCalled();
    expect(h4.text()).toBe(btn.text());
  });

  it("progress bar value = 5", () => {
    const wrapper = mount(Game, {
      localVue,
      data() {
        return {
          isClicked: true,
          correctAnswer: 0,
          variantStyle: null,
          isLoading: false,
          movies: movies,
          usedHints: false,
          usedHint1: false,
          isGameOver: false,
          bonus: 0,
          errors: 0,
        };
      },
      computed: {
        score() {
          return 5;
        },
        dificulty() {
          return "easy";
        },
        hints() {
          return false;
        },
        max() {
          return 21;
        },
      },
      created() {
        return true;
      },
    });


    const bar = wrapper.find(".progress-bar");
    expect(bar.attributes("aria-valuenow")).toBe("5");
  });
});
