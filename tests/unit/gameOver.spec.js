import {createLocalVue, mount } from '@vue/test-utils'
import GameOver from '@/components/GameOver.vue'
import { BootstrapVue } from 'bootstrap-vue';

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('GameOver.vue', () => {

  it('Shoud has restart button', () => {
    const wrapper = mount(GameOver, {
      localVue,
      computed: {
        score () {
          return 0;
        }
      },
      created() {
        return true;
      }
    });
    let btn = wrapper.find('button');
    expect(btn.text()).toBe('Restart Game');
  });

  it('Score should be equal 21', () => {
    const wrapper = mount(GameOver, {
      localVue,
      computed: {
        score () {
          return 21;
        }
      },
      created() {
        return true;
      }
    });
    expect(wrapper.find('.score').text()).toBe('Your result 21');
  });

  it('Should be excelent if user has 0 mistakes', () => {
    const wrapper = mount(GameOver, {
      localVue,
      propsData: {
        errors: 0,
      },
      computed: {
        score () {
          return 2;
        }
      },
      created() {
        return true;
      }
    });
    expect(wrapper.find('h3').text()).toBe('Impressive!');
  });

  it('Should count 3 mistakes', () => {
    const wrapper = mount(GameOver, {
      localVue,
      propsData: {
        errors: 3,
      },
      computed: {
        score () {
          return 2;
        }
      },
      created() {
        return true;
      }
    });
    expect(wrapper.find('.card-text .text-warning').text()).toBe('You make 3 errors');
  });

})
