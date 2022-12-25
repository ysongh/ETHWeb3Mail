// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // For Goerli
  const Outbox_Goerli = "0xDDcFEcF17586D08A5740B7D91735fcCE3dfe3eeD";
  const Inboxes_Fuji_Goerli = "0xa5D5EdF366F0D8FF135EBb31555E10b07f096427";

  const EVMWeb3Mail = await hre.ethers.getContractFactory("EVMWeb3Mail");
  const eVMWeb3Mail = await EVMWeb3Mail.deploy(Outbox_Goerli, Inboxes_Fuji_Goerli);

  await eVMWeb3Mail.deployed();

  console.log("Goerli EVMWeb3Mail contract deployed to:", eVMWeb3Mail.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
