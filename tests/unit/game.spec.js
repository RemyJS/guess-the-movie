import { expect } from "chai";
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Game from "@/components/Game.vue";

const localVue = createLocalVue()

localVue.use(Vuex)

describe("Game.vue", () => {
  
  let state
  let store

  beforeEach(() => {
    state = {
    }

    store = new Vuex.Store({
      modules: {
        myModule: {
          state,
        }
      }
    })
  })

  it("game wrapper", () => {
    const wrapper = shallowMount(Game, { store, localVue });
    expect(wrapper.isVueInstance()).equal(true);
  });
});


