import Home from "@/views/Home.vue";

describe("HelloWorld.vue", () => {
  it("sets the correct default data", () => {
    expect(typeof Home.data).toBe("function");
    const defaultData = Home.data();
    expect(defaultData.summaryModal).toBe(false);
  });
});
