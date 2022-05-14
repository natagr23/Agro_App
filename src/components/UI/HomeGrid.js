import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SampleMap from '../../components/Map/SampleMap';
import { ProductList } from '../../components/Products/ProductList';

import { ShopContextProvider } from '../../Context/ShopContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HomeGrid = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ShopContextProvider>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <Item>
              {' '}
              {/* <SearchBar /> */}
              <ProductList input={props.input} />
            </Item>
          </Grid>
          <Grid item xs={6} md={8}>
            <Item>
              {' '}
              <SampleMap />{' '}
            </Item>
          </Grid>
        </Grid>
      </ShopContextProvider>
    </Box>
  );
};

export default HomeGrid;
