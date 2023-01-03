import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, LinearProgress } from '@mui/material';
import LitJsSdk from 'lit-js-sdk';
import { ethers } from 'ethers';
import axios from "axios";

import { blobToDataURI } from '../../helpers/convertMethods';
import { FUJI_CONTRACT, MUMBAI_CONTRACT, GOERLI_CONTRACT, PINATA_APIKEY, PINATA_SECRETAPIKEY } from '../../config';

function SendMail({  openSnackbar, chainName, ethProvider, walletAddress, pw3eContract }) {
  const [chain, setChain] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState(false);
  const [text, setText] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [transaction, setTransaction] = useState('');

  const sendMail = async () => {
    try{
      setLoading(true);
      let toaddress = to;

      if(to[0] !== '0'){
        toaddress = await ethProvider.resolveName(to);
      }

      if(toaddress === null) return;
      if(chain === "") return;

      let destinationDomain;
      let recipient;
      let chainId;
      if (chain === 'fuji') {
        destinationDomain = '43113';
        recipient = FUJI_CONTRACT.slice(2);
        recipient = "0x000000000000000000000000" + recipient;
      }
      else if (chain === 'mumbai') {
        destinationDomain = '80001';
        recipient = MUMBAI_CONTRACT.slice(2);
        recipient = "0x000000000000000000000000" + recipient;
      }
      else if (chain === 'goerli') {
        destinationDomain = '5';
        recipient = GOERLI_CONTRACT.slice(2);
        recipient = "0x000000000000000000000000" + recipient;
      }

      if (chainName === 'fuji') {
        chainId = "0xA869";
      }
      else if (chainName === 'mumbai') {
        chainId = "0x13881";
      }
      else if (chainName === 'goerli') {
        chainId = "0x5";
      }

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
      const userData = JSON.stringify({ 
        subject,
        text,
        from: walletAddress,
        to,
        dateNow
       });

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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField variant="standard" placeholder='To'  onChange={(e) => setTo(e.target.value)} fullWidth />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            label="Chain"
            onChange={(e) => setChain(e.target.value)}
          >
            <MenuItem disabled value="">
              <em>Select Chain</em>
            </MenuItem>
            <MenuItem value="goerli">Goerli</MenuItem>
            <MenuItem value="mumbai">Mumbai</MenuItem>
            <MenuItem value="fuji">Fuji</MenuItem>
          </Select>
        </FormControl>
      </div>
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
        ? <Button variant="contained" color="primary" size="large" onClick={sendMail} disabled={!to || !subject || !text || !chain} >
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