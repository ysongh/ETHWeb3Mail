# EVMWeb3Mail
A decentralized, cross-chain, Web3 email platform power by Hyperlane Messaging API

### Project Name
EVMWeb3Mail

### Name
Song

### Email
ysongweb3@gmail.com

### Explains the Project 
I build a decentralized, cross-chain, Web3 email platform power by Hyperlane Messaging API.  I used Hyperlane Messaging API to allow user to send email from one chain to another chain

### How to run it
- Clone or download this repository
- Run `npm i` to install the dependencies
- Create a file called '.env' on the root folder and add the following code
```
PRIVATEKEY = <KEY>
```
- Run `npx hardhat run scripts/deployMoonbase.js --network moonbase` to deploy contract on moonbase testnet
- Run `npx hardhat run scripts/deployFuji.js --network fuji` to deploy contract on fuji testnet
- Create a file called 'config.js' on the src folder and add the following code
```
export const NFT_STORAGE_APIKEY = <KEY>;
export const NFTPORT_API= <KEY>;
export const MOONBASE_CONTRACT = <CONTRACT_ADDRESS>;
export const FUJI_CONTRACT = <CONTRACT_ADDRESS>;
```
- Run `npm start` to start the dapp