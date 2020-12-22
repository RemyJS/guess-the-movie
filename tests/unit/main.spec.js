/* eslint-disable no-unused-vars */
import {createLocalVue, shallowMount } from '@vue/test-utils'
import Main from '@/components/Main.vue'

// import { BootstrapVue } from 'bootstrap-vue';

// const localVue = createLocalVue()
// localVue.use()

describe('Main.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Main);
    expect(wrapper.find('button')).toBeTruthy();
  })
})
