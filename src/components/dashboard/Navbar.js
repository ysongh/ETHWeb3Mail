import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Chip, Button } from '@mui/material';

import { formatAddress } from "../../helpers/formatMethods";

const drawerWidth = 200;


function Navbar({ walletAddress, chainName, domainData }) {
  const navigate = useNavigate();

  const logout = async () => {
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
          <Button variant="contained" color="error" onClick={logout}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;