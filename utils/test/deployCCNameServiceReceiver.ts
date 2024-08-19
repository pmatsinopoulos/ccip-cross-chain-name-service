import { ethers } from "hardhat";
import {
  CrossChainNameServiceLookup,
  CrossChainNameServiceReceiver,
} from "../../typechain-types";

const deployCCNameServiceReceiver = async ({
  destinationRouter,
  lookupServiceAddress,
  chainSelector,
}: {
  destinationRouter: string;
  lookupServiceAddress: string;
  chainSelector: bigint;
}): Promise<CrossChainNameServiceReceiver> => {
  const CrossChainNameServiceReceiverFactory = await ethers.getContractFactory(
    "CrossChainNameServiceReceiver"
  );
  const crossChainNameServiceReceiver =
    await CrossChainNameServiceReceiverFactory.deploy(
      destinationRouter,
      lookupServiceAddress,
      chainSelector
    );

  await crossChainNameServiceReceiver.deployed();

  console.debug(
    "CrossChainNameServiceReceiver",
    crossChainNameServiceReceiver.address
  );

  return crossChainNameServiceReceiver;
};

export default deployCCNameServiceReceiver;
