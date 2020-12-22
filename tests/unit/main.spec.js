import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Main from "@/components/Main.vue";

describe("Main.vue", () => {
  const wrapper = mount(Main);
  const button = wrapper.find('button');
  it("Shoud has button Start Game", () => {
    expect(button.text()).equal('Start Game');
  });
});
