import React, { useState } from 'react';
import {
  Drawer,
  List,
  Tab,
  Link,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const pages = [
  'Products',
  'Services',
  'About Us',
  'Contact Us',
  'SignIn',
  'Sign Up',
];

const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleClick = () => {
    // <a href="/components/Products/Products"></a>;
    // <a href="/components/Products/Products"></a>;
    // <Link to={`/components/${page}/${page}`}>here </Link>;
    // <Link to={'/components/Products/Products'} />;
    // <Link href="/" onClick={this.onClickSubmit}></Link>;
  };
  return (
    <React.Fragment>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {pages.map((page, index) => (
            <ListItemButton onClick={() => setOpenDrawer(false)} key={index}>
              <ListItemIcon>
                <ListItemText onClick={handleClick}>{page}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: 'white', marginLeft: 'auto' }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
