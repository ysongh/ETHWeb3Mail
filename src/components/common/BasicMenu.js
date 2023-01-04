import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function BasicMenu({ feeds }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ marginRight: '1rem' }}>
      <IconButton onClick={openMenu}>
        <NotificationsIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem style={{ marginRight: '3rem' }}>Your Notifications</MenuItem>
        <Divider />
        {feeds.map(f => (
          <MenuItem key={f.sid}>- {f.message}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}