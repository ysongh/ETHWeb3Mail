import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
        <MenuItem onClick={closeMenu}>Test 1</MenuItem>
        <MenuItem onClick={closeMenu}>Test 2</MenuItem>
        <MenuItem onClick={closeMenu}>Test 3</MenuItem>
      </Menu>
    </div>
  );
}