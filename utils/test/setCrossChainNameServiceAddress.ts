import { CrossChainNameServiceLookup } from "../../typechain-types";

const setCrossChainNameServiceAddress = async ({
  lookup,
  crossChainNameServiceAddress,
}: {
  lookup: CrossChainNameServiceLookup;
  crossChainNameServiceAddress: string;
}) => {
  let trx = await lookup.setCrossChainNameServiceAddress(
    crossChainNameServiceAddress
  );

  let receipt = await trx.wait();
  console.debug("setCrossChainNameServiceAddress Register", receipt);
};

export default setCrossChainNameServiceAddress;
