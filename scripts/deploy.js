// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const PolyWeb3Mail = await hre.ethers.getContractFactory("PolyWeb3Mail");
  const polyWeb3Mail = await PolyWeb3Mail.deploy();

  await polyWeb3Mail.deployed();

  console.log("PolyWeb3Mail contract deployed to:", polyWeb3Mail.address);

  const Outbox_Avalanche = "0xc507A7c848b59469cC44A3653F8a582aa8BeC71E";
  const Inboxes_Avalanche_Moonbeam = "0xb31b0a575a151E0E72D438999f5a65e08802466f";

  const HyperlaneMessageReceiver = await hre.ethers.getContractFactory("HyperlaneMessageReceiver");
  const hyperlaneMessageReceiver = await HyperlaneMessageReceiver.deploy(Outbox_Avalanche);

  await hyperlaneMessageReceiver.deployed();

  const HyperlaneMessageSender = await hre.ethers.getContractFactory("HyperlaneMessageSender");
  const hyperlaneMessageSender = await HyperlaneMessageSender.deploy(Inboxes_Avalanche_Moonbeam);

  await hyperlaneMessageSender.deployed();

  console.log("PolyWeb3Mail contract deployed to:", polyWeb3Mail.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
