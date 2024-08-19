import { ethers } from "hardhat";

const deployLocalSimulator = async () => {
  const localSimulatorFactory = await ethers.getContractFactory(
    "CCIPLocalSimulator"
  );
  const localSimulator = await localSimulatorFactory.deploy();

  const config: {
    chainSelector_: bigint;
    sourceRouter_: string;
    destinationRouter_: string;
    wrappedNative_: string;
    linkToken_: string;
    ccipBnM_: string;
    ccipLnM_: string;
  } = await localSimulator.configuration();

  return { localSimulator, localSimulatorConfig: config };
};

export default deployLocalSimulator;
