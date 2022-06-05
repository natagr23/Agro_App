import React, { useState, useContext } from 'react';
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
import { AuthContext } from '../AuthContext/AuthContext';

import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Api/firebase-config';

const Navbar = () => {
  const ctx = useContext(AuthContext);

  const [value, setValue] = useState(false);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    ctx.updateUser(null);
    signOut(auth);
    navigate('/components/Home/Home');
  };
  let navigate = useNavigate();

  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

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
              {!ctx.currentUser && (
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
                  </Tabs>

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

              {ctx.currentUser && (
                <>
                  <Button
                    sx={{ marginLeft: '10px' }}
                    variant="contained"
                    label="My Products"
                    component={Link}
                    to={'/components/Products/CreateProducts'}
                    value={value}
                  >
                    My Products{''}
                  </Button>

                  <Button
                    sx={{ marginLeft: '10px' }}
                    variant="contained"
                    label="Account"
                    component={Link}
                    to={'/components/Account/Account'}
                    value={value}
                  >
                    Account{''}
                  </Button>
                  <Button
                    sx={{ marginLeft: '800px' }}
                    variant="contained"
                    label="SignOut"
                    value={value}
                    onClick={handleLogout}
                  >
                    SignOut{''}
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
