import {createLocalVue, mount } from '@vue/test-utils'
import Header from '@/components/Header.vue'
import { BootstrapVue } from 'bootstrap-vue';

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('Header.vue', () => {

  it('Shoud has 3 links', () => {
    const wrapper = mount(Header, {
      localVue,
      computed: {
        score () {
          return 0;
        }
      }
    });
    let links = wrapper.findAll('.nav-item')
    expect(links.length).toBe(3);
  });

  it('Score should be equal 2', () => {
    const wrapper = mount(Header, {
      localVue,
      computed: {
        score () {
          return 2;
        }
      }
    });
    expect(wrapper.find('.disabled').text()).toBe('Score 2');
  });

  it('Score should be equal 5', () => {
    const wrapper = mount(Header, {
      localVue,
      computed: {
        score () {
          return 5;
        }
      }
    });
    expect(wrapper.find('.disabled').text()).toBe('Score 5');
  });
})
