import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Chip, Button } from '@mui/material';
import * as EpnsAPI from "@epnsproject/sdk-restapi";
import UAuth from '@uauth/js';

import { UNSTOPPABLEDOMAINS_CLIENTID, UNSTOPPABLEDOMAINS_REDIRECT_URI } from '../../config';
import BasicMenu from "../common/BasicMenu"
import { formatAddress } from "../../helpers/formatMethods";

const drawerWidth = 200;

const uauth = new UAuth({
  clientID: UNSTOPPABLEDOMAINS_CLIENTID,
  redirectUri: UNSTOPPABLEDOMAINS_REDIRECT_URI,
});

function Navbar({ walletAddress, chainName, domainData, setDomainData }) {
  const navigate = useNavigate();

  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    getFeeds()
  }, [])
  

  const getFeeds = async () => {
    const newFeeds = await EpnsAPI.user.getFeeds({
      user: `eip155:5:${walletAddress}`, // channel address in CAIP
      env: 'staging'
    });
    setFeeds(newFeeds);
  }

  const logout = async () => {
    if(domainData){
      setDomainData(null);
      await uauth.logout();
    }

    navigate('/');
  }
  
  return (
    <AppBar
      className="primary-bg-color-300"
      position="fixed"
      color="transparent"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <Chip
            className='primary-bg-color-100'
            label={formatAddress(domainData?.sub.length > 0 ? domainData?.sub : walletAddress)} />
          <Chip
             className='primary-bg-color-100'
            label={chainName} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <BasicMenu feeds={feeds} />
          <Button variant="contained" color="error" onClick={logout}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;