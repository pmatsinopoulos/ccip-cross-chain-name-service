import { ethers } from "hardhat";
import { CrossChainNameServiceRegister } from "../../typechain-types";

const deployCCNameServiceRegisterOnSourceNetwork = async ({
  sourceRouter,
  lookupServiceAddress,
}: {
  sourceRouter: string;
  lookupServiceAddress: string;
}): Promise<CrossChainNameServiceRegister> => {
  const CrossChainNameServiceRegister = await ethers.getContractFactory(
    "CrossChainNameServiceRegister"
  );
  const crossChainNameServiceRegister =
    await CrossChainNameServiceRegister.deploy(
      sourceRouter,
      lookupServiceAddress
    );

  await crossChainNameServiceRegister.deployed();

  console.debug(
    "CrossChainNameServiceRegister instance",
    crossChainNameServiceRegister.address
  );

  return crossChainNameServiceRegister;
};

export default deployCCNameServiceRegisterOnSourceNetwork;
