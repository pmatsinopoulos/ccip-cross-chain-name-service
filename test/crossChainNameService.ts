import { ethers } from "hardhat";
import { expect } from "chai";
import deployLocalSimulator from "../utils/test/deployLocalSimulator";
import deployCCNameServiceLookup from "../utils/test/deployCCNameServiceLookup";
import deployCCNameServiceRegisterOnSourceNetwork from "../utils/test/deployCCNameServiceRegisterOnSourceNetwork";
import setCrossChainNameServiceAddress from "../utils/test/setCrossChainNameServiceAddress";
import deployCCNameServiceReceiver from "../utils/test/deployCCNameServiceReceiver";

describe("Cross Chain Name Service", function () {
  it("registers a name successfully", async function () {
    const { localSimulator, localSimulatorConfig } =
      await deployLocalSimulator();

    console.debug("localSimulator", localSimulator);
    console.debug("localSimulatorConfig", localSimulatorConfig);

    // deploy CC Name Service Lookup on SOURCE network
    const crossChainNameServiceLookupSource = await deployCCNameServiceLookup();
    // --------------------------------------------

    // deploy CC Name Service Register on Source network
    const crossChainNameServiceRegister =
      await deployCCNameServiceRegisterOnSourceNetwork({
        sourceRouter: localSimulatorConfig.sourceRouter_,
        lookupServiceAddress: crossChainNameServiceLookupSource.address,
      });
    //----------------------------------------------

    // set cross chain name service address on SOURCE lookup for Register
    setCrossChainNameServiceAddress({
      lookup: crossChainNameServiceLookupSource,
      crossChainNameServiceAddress: crossChainNameServiceRegister.address,
    });
    //--------------------------------------------------------------------

    // deploy CC Name Service Lookup on DESTINATION network
    const crossChainNameServiceLookupDestination =
      await deployCCNameServiceLookup();
    // --------------------------------------------

    // deploy CC Name Service Receiver on the DESTINATION network
    const crossChainNameServiceReceiver = await deployCCNameServiceReceiver({
      destinationRouter: localSimulatorConfig.destinationRouter_,
      lookupServiceAddress: crossChainNameServiceLookupDestination.address,
      chainSelector: localSimulatorConfig.chainSelector_,
    });
    // -----------------------------------------------------------

    // setting cross chain name service address on destination lookup for receiver
    setCrossChainNameServiceAddress({
      lookup: crossChainNameServiceLookupDestination,
      crossChainNameServiceAddress: crossChainNameServiceReceiver.address,
    });
    //------------------------------------------------------------------------------

    // enable chain on Register (in source)
    let trx = await crossChainNameServiceRegister.enableChain(
      localSimulatorConfig.chainSelector_,
      crossChainNameServiceReceiver.address,
      BigInt("400000")
    );
    let receipt = await trx.wait();
    console.debug(
      "Enable Destination Receiver on SOURCE Register contract, Receipt",
      receipt
    );
    //----------------------------------------------------------------------

    // registering my name
    const ccnsName = "panagiotismatsinopoulos.ccns";
    trx = await crossChainNameServiceRegister.register(ccnsName);
    receipt = await trx.wait();
    console.debug("Registering name", receipt);
    //---------------------------------------------------------------------

    // check lookup
    const lookupResponse = await crossChainNameServiceLookupSource.lookup(
      ccnsName
    );
    const [owner] = await ethers.getSigners();
    const expectedAddress = await owner.getAddress();

    expect(lookupResponse).to.equal(expectedAddress);
  });
});
