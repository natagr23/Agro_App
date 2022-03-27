import React, { useState } from 'react';

import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import {
  AppBar,
  Tabs,
  Tab,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DrawerComp from '../Drawer/DrawerComp';

const pages = ['Products', 'Services', 'About Us', 'Contact Us'];

const Navbar = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  console.log(isMatch);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{ background: '#063970' }}>
        <Toolbar>
          <AddShoppingCartIcon />

          {isMatch ? (
            <>
              <Typography sx={{ fontSize: '1.5rem', paddingLeft: '10%' }}>
                TIENDA
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                // sx={{ marginLeft: 'auto' }}
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
                indicatorColor="secondary"
              >
                {pages.map((page, index) => (
                  <Tab key={index} label={page} />
                ))}
              </Tabs>
              <Button sx={{ marginLeft: 'auto' }} variant="contained">
                Login{' '}
              </Button>
              <Button sx={{ marginLeft: '10px' }} variant="contained">
                SignUp{''}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <DrawerHeader /> */}
        <Typography paragraph>
          perdiet proin fermentum leo. Mauris commodo quis imperdiet massa
          tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue
          eget arcu dictum varius duis at consectetur lorem. Velit sed
          ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et
          molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
