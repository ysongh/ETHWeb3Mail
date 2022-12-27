import React, { useState } from 'react';
import { TextField, Button, LinearProgress } from '@mui/material';
import LitJsSdk from 'lit-js-sdk';
import { ethers } from 'ethers';
import axios from "axios";

import { blobToDataURI } from '../../helpers/convertMethods';
import { FUJI_CONTRACT, MUMBAI_CONTRACT, PINATA_APIKEY, PINATA_SECRETAPIKEY } from '../../config';

function SendMail({  openSnackbar, chainName, ethProvider, pw3eContract, walletAddress, domainData }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState(false);
  const [text, setText] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [transaction, setTransaction] = useState('');

  const sendMail = async () => {
    try{
      setLoading(true);
      let toaddress;

      if(to[0] !== '0'){
        toaddress = await ethProvider.resolveName(to);
      }

      if(toaddress === null) return;

      const chain = chainName === 'fuji' ? 'mumbai': 'fuji';
      const authSig = await LitJsSdk.checkAndSignAuthMessage({chain});
      const accessControlConditions = [
        {
          contractAddress: '',
          standardContractType: '',
          chain,
          method: '',
          parameters: [
            ':userAddress',
          ],
          returnValueTest: {
            comparator: '=',
            value: toaddress
          }
        }
      ]
      const dateNow = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
      const userData = JSON.stringify({ subject, text, dateNow });

      // 1. Encryption
      // <Blob> encryptedString
      // <Uint8Array(32)> symmetricKey 
      const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(userData);

      console.warn("symmetricKey:", symmetricKey);
      
      // 2. Saving the Encrypted Content to the Lit Nodes
      // <Unit8Array> encryptedSymmetricKey
      const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
        accessControlConditions,
        symmetricKey,
        authSig,
        chain,
      });
      
      console.warn("encryptedSymmetricKey:", encryptedSymmetricKey);
      console.warn("encryptedString:", encryptedString);

      const prepareToUpload = new File(
      [JSON.stringify(
        {
          encryptedSymmetricKey: Array.from(encryptedSymmetricKey),   // Convert Unit8Array to Array
          encryptedString: await blobToDataURI(encryptedString)
        },
        null,
        2
      )], 'metadata.json');

      let data = new FormData();
      data.append('file', prepareToUpload);
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
        maxContentLength: "Infinity",
        headers: {
          "Content-Type": 'multipart/form-data',
          pinata_api_key: PINATA_APIKEY, 
          pinata_secret_api_key: PINATA_SECRETAPIKEY,
        }
      })
      let url = "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash;
      console.log(url);

      let destinationDomain;
      let recipient;
      let chainId;
      if (chainName === 'fuji') {
        destinationDomain = '80001';
        recipient = MUMBAI_CONTRACT.slice(2);
        recipient = "0x000000000000000000000000" + recipient;
        chainId = "0xA869";
      }
      else {
        destinationDomain = '43113';
        recipient = FUJI_CONTRACT.slice(2);
        recipient = "0x000000000000000000000000" + recipient;
        chainId = "0x13881";
      }

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainId }]
      });

      const transaction = await pw3eContract.sendMail(destinationDomain, recipient, url, toaddress);
      const tx = await transaction.wait();
      console.log(tx);
      setTransaction(tx.hash);
      openSnackbar();
      setLoading(false);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  }
  
  return (
    <div>
      <TextField variant="standard" placeholder='To'  onChange={(e) => setTo(e.target.value)} fullWidth />
      <TextField variant="standard" placeholder='Subject'  onChange={(e) => setSubject(e.target.value)} fullWidth />
      <TextField
          multiline
          rows={10}
          fullWidth
          placeholder='Detail'
          variant="standard"
          onChange={(e) => setText(e.target.value)}
        />
      <br />
      <br />
      {!loading
        ? <Button variant="contained" color="primary" size="large" onClick={sendMail} disabled={!to || !subject || !text} >
            Send Mail
          </Button>
        : <LinearProgress color="primary" />
      }
      {transaction &&
        <p style={{ fontSize: '1.2rem'}}>
          Success, see transaction {" "}
          <a href={`https://mumbai.polygonscan.com/tx/${transaction}`} target="_blank" rel="noopener noreferrer">
            {transaction.substring(0, 10) + '...' + transaction.substring(56, 66)}
          </a>
        </p>
      }
    </div>
  )
}

export default SendMail;