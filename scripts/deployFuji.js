// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // For Fuji
  const Outbox_Fuji = "0xc507A7c848b59469cC44A3653F8a582aa8BeC71E";
  const Inboxes_Moonbasealpha_Fuji = "0x1D5EbC3e15e9ECDe0e3530C85899556797eeaea5";
  const Inboxes_Mumbai_Fuji = "0x56c09458cC7863fff1Cc6Bcb6652Dcc3412FcA86";
  const Inboxes_Goerli_Fuji = "0xfc8d0D2E15A36f1A3F3aE3Cb127B706c1f23Aadc";

  const EVMWeb3Mail = await hre.ethers.getContractFactory("EVMWeb3Mail");
  const eVMWeb3Mail = await EVMWeb3Mail.deploy(Outbox_Fuji, Inboxes_Goerli_Fuji);

  await eVMWeb3Mail.deployed();

  console.log("Fuji EVMWeb3Mail contract deployed to:", eVMWeb3Mail.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
