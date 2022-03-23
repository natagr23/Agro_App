import React from 'react';
import { AppBar, Toolbar, Tabs, Tab, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export const Header = () => {
  return (
    <React.Fragment>
      <AppBar sx={{ background: '#063970' }}>
        <Toolbar>
          {/* <Typography>SHOP</Typography> */}
          <AddShoppingCartIcon />

          <Tabs textColor="inherit">
            <Tab label="Products" />
            <Tab label="Services" />
            <Tab label="Products" />
            <Tab label="Services" />
            <Tab label="ContactUs" />
            <Tab label="About Us" />
          </Tabs>
          <Button variant="contained">Login</Button>
          <Button variant="contained">SignUp</Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
