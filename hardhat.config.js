require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    // npx hardhat run scripts/deploy.js --network mumbai
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMYAPI_KEY}`,
      accounts: [process.env.PRIVATEKEY],
      chainId: 80001,
      gasPrice: 8000000000
    },
    // npx hardhat run scripts/deployMoonbase.js --network moonbase
    moonbase: {
      url: "https://rpc.api.moonbase.moonbeam.network",
      accounts: [process.env.PRIVATEKEY],
      chainId: 1287,
      gasPrice: 8000000000
    },
    // npx hardhat run scripts/deployFuji.js --network fuji
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [process.env.PRIVATEKEY],
      chainId: 43113,
      gasPrice: 8000000000
    }
  },
  // set the path to compile the contracts
  paths: {
    artifacts: './src/artifacts',
    cache: './src/cache',
  }
};
