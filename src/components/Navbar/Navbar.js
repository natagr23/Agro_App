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

import HomeIcon from '@mui/icons-material/Home';
import DrawerComp from '../Drawer/DrawerComp';
import { Link } from 'react-router-dom';

// const pages = ['Products', 'Services', 'About Us', 'Contact Us'];

const Navbar = () => {
  const [value, setValue] = useState(false);

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
              <Typography sx={{ fontSize: '1.2 rem', paddingLeft: '10%' }}>
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
                value={value}
              >
                <Tab
                  label="Products"
                  component={Link}
                  to={'/components/Products/Products'}
                  value={value}
                />
                <Tab
                  label="Services"
                  component={Link}
                  to={'/components/Services/Services'}
                  value={value}
                />
                <Tab
                  label="About"
                  component={Link}
                  to={'/components/About/About'}
                  value={value}
                />
                <Tab
                  label="Contact"
                  component={Link}
                  to={'/components/Contact/Contact'}
                  value={value}
                />
                {/* {pages.map((page, index) => (
                  <Tab key={index} label={page} />
                ))} */}
              </Tabs>
              {/* <Button
                sx={{ marginLeft: 'auto' }}
                variant="contained"
                component={Link}
                to={'/SignIn'}
              >
                SignIn{' '} */}
              {/* </Button> */}
              <Button
                sx={{ marginLeft: 'auto' }}
                variant="contained"
                component={Link}
                to={'/SignIn'}
              >
                SignIn{' '}
              </Button>
              <Button
                sx={{ marginLeft: '10px' }}
                variant="contained"
                component={Link}
                to={'/register'}
              >
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
