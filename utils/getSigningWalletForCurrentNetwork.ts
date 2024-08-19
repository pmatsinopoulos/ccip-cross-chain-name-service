import { ethers } from "hardhat";
import { Wallet } from "ethers";

const getSigningWalletForCurrentNetwork = (): Wallet => {
  const provider = ethers.getDefaultProvider();
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "");
  return wallet.connect(provider);
};

export default getSigningWalletForCurrentNetwork;
