import { ethers } from "hardhat";
import { CrossChainNameServiceLookup } from "../../typechain-types";

const deployCCNameServiceLookup =
  async (): Promise<CrossChainNameServiceLookup> => {
    const CrossChainNameServiceLookup = await ethers.getContractFactory(
      "CrossChainNameServiceLookup"
    );
    const crossChainNameServiceLookup =
      await CrossChainNameServiceLookup.deploy();

    await crossChainNameServiceLookup.deployed();

    console.debug(
      "CrossChainNameServiceLookup instance for source",
      crossChainNameServiceLookup.address
    );

    return crossChainNameServiceLookup;
  };

export default deployCCNameServiceLookup;
