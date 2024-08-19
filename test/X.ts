import deployLocalSimulator from "./deployLocalSimulator";

describe("X", function () {
  it("test", async function () {
    const { localSimulator, localSimulatorConfig } =
      await deployLocalSimulator();
  });
});
