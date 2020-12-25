/* eslint-disable no-unused-vars */
import {createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Main from '@/components/Main.vue'
import { BootstrapVue } from 'bootstrap-vue';

const localVue = createLocalVue()

localVue.use(BootstrapVue)

describe('Main.vue', () => {

  it('Main has start game button', () => {
    let startGameMock = jest.fn();

    const wrapper = mount(Main, {
      localVue,
      methods: {
        startGame() {
          startGameMock();
        }
      }
    });
    const button = wrapper.find('button')
    expect(button.text()).toEqual('Start Game');

    button.trigger('click');
    expect(startGameMock).toHaveBeenCalled();
  })
})
