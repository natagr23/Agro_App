import React, { useContext, useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import SampleMap from '../../components/Map/SampleMap';

// import { AppProvider } from '../../Context/AppContext';
import { ProductList } from '../../components/Products/ProductList';

// import MapProvider from '../../Context/MapProvider';
import { ShopContext } from '../../Context/ShopContext';
import { ShopContextProvider } from '../../Context/ShopContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HomeGrid = () => {
  const ctx = useContext(ShopContext);

  const [shopsFiltered, setShopsFiltered] = useState(ctx.shops);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ShopContextProvider>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <Item>
              {' '}
              {/* <SearchBar /> */}
              <ProductList />
            </Item>
          </Grid>
          <Grid item xs={6} md={8}>
            <Item>
              {' '}
              <SampleMap shopsFiltered={shopsFiltered} />{' '}
            </Item>
          </Grid>
        </Grid>
      </ShopContextProvider>
    </Box>
  );
};

export default HomeGrid;
