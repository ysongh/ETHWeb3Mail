// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // For Moonbasealpha
  const Outbox_Moonbasealpha = "0x54148470292C24345fb828B003461a9444414517";
  const Inboxes_Fuji_Moonbasealpha = "0xb31b0a575a151E0E72D438999f5a65e08802466f";

  const EVMWeb3Mail = await hre.ethers.getContractFactory("EVMWeb3Mail");
  const eVMWeb3Mail = await EVMWeb3Mail.deploy(Outbox_Moonbasealpha, Inboxes_Fuji_Moonbasealpha);

  await eVMWeb3Mail.deployed();

  console.log("Moonbasealpha EVMWeb3Mail contract deployed to:", eVMWeb3Mail.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
