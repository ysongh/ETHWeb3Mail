import React, { useEffect, useState } from 'react';
import { FormControlLabel, Switch, Divider } from '@mui/material';
import * as EpnsAPI from "@epnsproject/sdk-restapi";

import { PUSH_CHANNEL_ADDRESS } from '../../config';

function Setting({ walletAddress, ethSigner }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isOptIn, setIsOptIn] = useState(false);

  useEffect(() => {
    getSubscriptions();
  }, [])
  

  const getSubscriptions = async () => {
    const newSubscriptions = await EpnsAPI.user.getSubscriptions({
      user: `eip155:5:${walletAddress}`, // channel address in CAIP
      env: 'staging'
    });
    console.log(newSubscriptions)
    setSubscriptions(newSubscriptions || []);
    
    if(newSubscriptions){
      for(let c of newSubscriptions){
        if(c.channel.toLowerCase() == PUSH_CHANNEL_ADDRESS.toLowerCase()){
          setIsOptIn(true);
          break;
        }
      }
    }
  }

  const updateNotification = () => {
    if(isOptIn) optOutToChannel();
    else optInToChannel();
  }

  const optInToChannel = async () => {
    try{
      const apiResponse = await EpnsAPI.channels.subscribe({
        signer: ethSigner,
        channelAddress: `eip155:5:${PUSH_CHANNEL_ADDRESS}`, // channel address in CAIP
        userAddress: `eip155:5:${walletAddress}`, // user address in CAIP
        onSuccess: () => {
         console.log('opt in success');
         setIsOptIn(true);
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

  const optOutToChannel = async () => {
    try{
      const apiResponse = await EpnsAPI.channels.unsubscribe({
        signer: ethSigner,
        channelAddress: `eip155:5:${PUSH_CHANNEL_ADDRESS}`, // channel address in CAIP
        userAddress: `eip155:5:${walletAddress}`, // user address in CAIP
        onSuccess: () => {
         console.log('opt out success');
         setIsOptIn(false);
        },
        onError: () => {
          console.error('opt out error');
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
      <FormControlLabel control={<Switch checked={isOptIn} onChange={updateNotification} />} label={!isOptIn ? "Opt In for Notification" : "Opt Out for Notification"} />
    </div>
  )
}

export default Setting;