import React from 'react';

import Drawer from '@mui/material/Drawer';

import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { mainNavbarItems } from './consts/navbarItems';

export function Navbar() {
  const drawerWidth = 240;
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {mainNavbarItems.map((text, index) => (
          <ListItem button key={text.id}>
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Navbar;
