import React, { useEffect, useState } from 'react';
import { Paper, Typography, Checkbox } from '@mui/material';
import LitJsSdk from 'lit-js-sdk';

import SkeletonPlaceholder from '../common/SkeletonPlaceholder';
import { dataURItoBlob } from '../../helpers/convertMethods';
import { formatAddress } from "../../helpers/formatMethods";

function Mail({  chainName, pw3eContract,  walletAddress, setCurrentSection, setCurrentMail, isCopy }) {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMails();
  }, [])

  const loadMails = async () => {
    try{
      setLoading(true);
      
      const newMails = await pw3eContract.getUserEmails(walletAddress);
      const decryptedMails = [];
      for(let m of newMails) {
        let data = await fetch(m);
        data = await data.json();
        console.log(data);

        // const strData = await messageToDecrypt(m);
        const toObject = await JSON.parse(data.emailData);
        decryptedMails.push(toObject);
      }
      setMails(decryptedMails);
      setLoading(false);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
    
  }

  const messageToDecrypt = async (url) => {
    console.warn(url);
    try{
      const chain = chainName;
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
            value: walletAddress
          }
        }
      ]

      let data = await fetch(url);
      data = await data.json();
      console.log(data);

      const toDecrypt = LitJsSdk.uint8arrayToString(new Uint8Array(data.encryptedSymmetricKey), 'base16');
      console.log("toDecrypt:", toDecrypt);

      // <Uint8Array(32)> _symmetricKey 
      const _symmetricKey = await window.litNodeClient.getEncryptionKey({
        accessControlConditions,
        toDecrypt,
        chain,
        authSig
      })

      console.warn("_symmetricKey:", _symmetricKey);

      // <String> decryptedString
      const decryptedString = await LitJsSdk.decryptString(
        dataURItoBlob(data.encryptedString),
        _symmetricKey
      );

      console.warn("decryptedString:", decryptedString);
      return decryptedString;
    } catch (error) {
      console.error(error);
      setLoading(false);
    } 
  }

  const selectMail = (data) => {
    setCurrentSection("Mail Detail");
    setCurrentMail(data);
  }

  return (
    <div>
      {loading
        ? <SkeletonPlaceholder />
        : mails.length 
          ? mails.map(m => (
              <Paper key={m.id} style={{ display: 'flex', justifyContent: "space-between" ,padding: '0 1rem', marginBottom: '1rem', cursor: "pointer" }} onClick={() => selectMail(m)}>
                <div style={{ display: 'flex' }}>
                  <Checkbox />
                  <p style={{ color: 'grey', marginRight: '.5rem' }}>{formatAddress(m.to)} - </p>
                  <p>{m.subject}</p>
                </div>
                <p>{m.dateNow}</p>
              </Paper>
      )) : <Typography variant="h3">No Mail Yet...</Typography>
    }
    </div>
  )
}

export default Mail;