import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "";
    const wrapper = shallowMount(Home, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
