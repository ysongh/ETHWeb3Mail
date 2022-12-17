// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // For Mumbai
  const Outbox_Mumbai = "0xe17c37212d785760E8331D4A4395B17b34Ba8cDF";
  const Inboxes_Fuji_Mumbai = "0x04268B83eE9684F8767eB4e83cf7fBb7B86Ed597";

  const EVMWeb3Mail = await hre.ethers.getContractFactory("EVMWeb3Mail");
  const eVMWeb3Mail = await EVMWeb3Mail.deploy(Outbox_Mumbai, Inboxes_Fuji_Mumbai);

  await eVMWeb3Mail.deployed();

  console.log("Mumbai EVMWeb3Mail contract deployed to:", eVMWeb3Mail.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
