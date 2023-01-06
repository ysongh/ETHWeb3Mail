import React, { useEffect, useState } from 'react';
import { Divider, Button } from '@mui/material';
import * as EpnsAPI from "@epnsproject/sdk-restapi";

import { PUSH_CHANNEL_ADDRESS } from '../../config';

function Setting({ walletAddress, ethSigner }) {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    getSubscriptions();
  }, [])
  

  const getSubscriptions = async () => {
    const newSubscriptions = await EpnsAPI.user.getSubscriptions({
      user: `eip155:5:${walletAddress}`, // channel address in CAIP
      env: 'staging'
    });
    console.log(newSubscriptions)
    setSubscriptions(newSubscriptions);
  }

  const optInToChannel = async () => {
    try{
      const apiResponse = await EpnsAPI.channels.subscribe({
        signer: ethSigner,
        channelAddress: `eip155:5:${PUSH_CHANNEL_ADDRESS}`, // channel address in CAIP
        userAddress: `eip155:5:${walletAddress}`, // user address in CAIP
        onSuccess: () => {
         console.log('opt in success');
        },
        onError: () => {
          console.error('opt in error');
        },
        env: 'staging'
      })
      console.log(apiResponse);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Notification</h1>
      <Divider />

      <h2>Subscriptions</h2>
      {subscriptions.map((s, index) => (
        <p key={index}>- {s.channel}</p>
      ))}
      <Button variant="contained" color="primary" size="large" onClick={optInToChannel}>
        Opt In for Notification
      </Button>
    </div>
  )
}

export default Setting;