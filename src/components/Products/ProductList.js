import React, { useContext, useMemo, useEffect } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ProductCard from './ProductCard';
import ProviderJson from '../../components/Data/ProviderJson.json';
import ProductJson from '../../components/Data/ProductJson.json';
import { ShopContext } from '../../Context/ShopContext';
import { ShopContextProvider } from '../../Context/ShopContext';

import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../Api/firebase-config';
export const ProductList = (props) => {
  const ctx = useContext(ShopContext);
  const [providerList] = useState(ProviderJson);
  const [productList] = useState(ProductJson);
  // const [filteredData, setFilteredData] = useState(ProviderJson);

  // const selectFlat = () => {
  //   props.selectFlat(props.flat);
  // };

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const productColRef = query(
      collection(db, 'products'),
      orderBy('created', 'desc')
    );
    onSnapshot(productColRef, (snapshot) => {
      setFilteredData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  useEffect(() => {
    setFilteredData(
      filteredData.filter((product) => {
        // if (ctx.bounds) {
        //   let selectedProduct = filteredData.find((product_id) => {
        //     return product_id === product.id;
        //   });

        //   if (
        //     product.latitude > ctx.bounds.boundsSudOuestlat &&
        //     product.latitude < ctx.bounds.boundsNordEstlat &&
        //     product.longitude > ctx.bounds.boundsSudOuestlng &&
        //     product.longitude < ctx.bounds.boundsNordEstlng
        //   ) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // }

        //if no input the return the original
        if (props.input === '') {
          return product;
        }
        //return the item which contains the user input
        else {
          return product.data.name
            .toLowerCase()
            .includes(props.input.toLowerCase());
        }
      })
    );
  }, [props.input]);

  return (
    <Box sx={{ width: '100%', height: 600, overflowY: 'scroll' }}>
      <ShopContextProvider value={providerList}>
        {/* <PersonalInfoProvider value={providerList}> */}
        <Stack spacing={2}>
          {/* {cartIsShown && <Cart onClose={hideCartHandler} />} */}
          {filteredData.map((product) => {
            return (
              <ProductCard
                key={product.data.id}
                name={product.data.name}
                id={product.data.id}
                description={product.data.description}
                place={product.data.place}
                // image_url={product.image_url}
                // OnSelectProduct={ctx.handleOpenMarker}
                onClick={ctx.selectProduct}
                product={product}
              />
            );
          })}
        </Stack>

        {/* </PersonalInfoProvider> */}
      </ShopContextProvider>
    </Box>
  );
};
