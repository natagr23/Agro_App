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

  useEffect(() => {
    setTimeout(() => {
      let filteredShopsWithBounds = ctx.shops.filter((shop) => {
        if (
          shop.location[0] > ctx.bounds.boundsSudOuestlat &&
          shop.location[0] < ctx.bounds.boundsNordEstlat &&
          shop.location[1] > ctx.bounds.boundsSudOuestlng &&
          shop.location[1] < ctx.bounds.boundsNordEstlng
        ) {
          return true;
        }
      });

      const filteredShopsWithRatings = filteredShopsWithBounds.filter((elt) => {
        const ratingsAverage =
          elt.ratings.reduce(
            (previousValue, currentValue) => previousValue + currentValue.stars,
            0
          ) / elt.ratings.length;
        if (ratingsAverage >= ctx.minStars && ratingsAverage <= ctx.maxStars) {
          return elt;
        }
      });

      if (filteredShopsWithRatings.length > 0) {
        setShopsFiltered(filteredShopsWithRatings);
      } else {
        setShopsFiltered(false);
      }
    }, 800);
  }, [ctx.bounds, ctx.minStars, ctx.maxStars, ctx.shops]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ShopContextProvider>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <Item>
              {' '}
              {/* <SearchBar /> */}
              <ProductList shopsFiltered={shopsFiltered} />
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
