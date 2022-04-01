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
import HomeIcon from '@mui/icons-material/Home';
import DrawerComp from '../Drawer/DrawerComp';
import { Link } from 'react-router-dom';
import { PagesRounded } from '@mui/icons-material';

// const pages = ['Products', 'Services', 'About Us', 'Contact Us'];

const Navbar = () => {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  console.log(isMatch);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{ background: '#063970' }}>
        <Toolbar>
          <Button
            variant="contained"
            component={Link}
            to={'/components/Home/Home'}
          >
            <HomeIcon />
          </Button>

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
                sx={{ marginLeft: 'auto' }}
                textColor="inherit"
                onChange={handleTabChange}
                indicatorColor="secondary"
              >
                <Tab
                  label="Products"
                  index={0}
                  component={Link}
                  to={'/components/Products/Products'}
                />
                <Tab
                  label="Services"
                  index={1}
                  component={Link}
                  to={'/components/Services/Services'}
                />
                {/* {pages.map((page, index) => (
                  <Tab key={index} label={page} />
                ))} */}
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
    </Box>
  );
};

export default Navbar;
