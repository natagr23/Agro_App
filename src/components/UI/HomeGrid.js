import React, { useContext } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import SearchBar from '../../components/SearchBar/SearchBar';
// import ProductList from '../../components/Products/ProductList';
import SampleMap from '../../components/Map/SampleMap';
// import LocationContext from '../Context/LocationContext';
// import { PersonalInfoProvider } from '../Context/ProductLocationContext';
import { AppProvider } from '../Context/AppContext';
import { ProductList } from '../../components/Products/ProductList';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function HomeGrid() {
  // const location = useContext(LocationContext);
  // const people = useContext(PersonalInfoContext);
  // const providerList = useContext(providerContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <providerContext.Provider> */}
      <AppProvider>
        {/* <h2>{location.Latitude}</h2> */}
        {/* <PersonalInfoProvider value={providerList}> */}
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
              <SampleMap />{' '}
            </Item>
          </Grid>
        </Grid>
        {/* </PersonalInfoProvider> */}
      </AppProvider>
      {/* </providerContext.Provider> */}
    </Box>
  );
}
