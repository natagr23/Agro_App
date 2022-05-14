import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ProductCard from './ProductCard';
import ProviderJson from '../../components/Data/ProviderJson.json';
import ProductJson from '../../components/Data/ProductJson.json';
import { ShopContext } from '../../Context/ShopContext';
import { ShopContextProvider } from '../../Context/ShopContext';
export const ProductList = (props) => {
  const ctx = useContext(ShopContext);
  const [providerList] = useState(ProviderJson);
  const [productList] = useState(ProductJson);
  const [filteredData, setFilteredData] = useState(ProviderJson);

  useEffect(() => {
    setFilteredData(
      productList.filter((product) => {
        if (ctx.bounds) {
          let selected_provider = providerList.find((provider) => {
            return provider.id === product.provider_id;
          });
          // console.log(ctx.bounds, selected_provider.location);

          if (
            selected_provider.location[0] > ctx.bounds.boundsSudOuestlat &&
            selected_provider.location[0] < ctx.bounds.boundsNordEstlat &&
            selected_provider.location[1] > ctx.bounds.boundsSudOuestlng &&
            selected_provider.location[1] < ctx.bounds.boundsNordEstlng
          ) {
            return true;
          } else {
            return false;
          }
        }

        //if no input the return the original
        if (props.input === '') {
          return product;
        }
        //return the item which contains the user input
        else {
          return product.name.toLowerCase().includes(props.input);
        }
      })
    );
  }, [ctx.bounds, productList, props.input, providerList]);

  return (
    <Box sx={{ width: '100%', height: 600, overflowY: 'scroll' }}>
      <ShopContextProvider value={providerList}>
        {/* <PersonalInfoProvider value={providerList}> */}
        <Stack spacing={2}>
          {/* {cartIsShown && <Cart onClose={hideCartHandler} />} */}
          {!ctx.setShow &&
            filteredData.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  id={product.id}
                  description={product.description}
                  image_url={product.image_url}
                  // OnSelectProduct={OnSelectProduct_ini}
                  OnSelectProduct={ctx.handleOpenMarker}
                />
              );
            })}
        </Stack>

        {/* </PersonalInfoProvider> */}
      </ShopContextProvider>
    </Box>
  );
};
