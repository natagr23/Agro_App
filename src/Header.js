import React from 'react';
import { AppBar, Toolbar, Tabs } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Header = () => {
  return (
    <React.Fragment>
      <AppBar sx={{ background: '#063970' }}>
        <Toolbar>
          {/* <Typography>SHOP</Typography> */}
          <AddShoppingCartIcon />

          <Tabs></Tabs>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
