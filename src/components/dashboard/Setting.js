import React, { useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import * as EpnsAPI from "@epnsproject/sdk-restapi";

function Setting({ walletAddress }) {
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

  return (
    <div>
      <h1>Notification</h1>
      <Divider />

      <h2>Subscriptions</h2>
      {subscriptions.map((s, index) => (
        <p key={index}>- {s.channel}</p>
      ))}
    </div>
  )
}

export default Setting;