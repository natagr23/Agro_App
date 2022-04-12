import React, { useReducer, createContext } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ProductCard from './ProductCard';

class Provider {
  constructor(id, name, location) {
    this.id = id;
    this.name = name;
    this.location = location;
  }
}

class Product {
  constructor(id, name, description, image_url, provider_id) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image_url = image_url;
    this.provider_id = provider_id;
  }
}
export const ProductLocationContext = createContext();

function reducer(state, item) {
  return [...state, item];
}

export default function ProductList() {
  const [location, setLocation] = useReducer(reducer, []);
  const [productList, setProductList] = useState([
    new Product(
      'P1',
      'Naranjas',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet interdum tellus. Vivamus eu lectus odio',
      'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      'provider_01'
    ),
    new Product(
      'P2',
      'Guayabas',
      'Nunc arcu nisl, pulvinar non posuere et, sollicitudin ac magna. Aenean ut varius augue.',
      'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      'provider_01'
    ),
    new Product(
      'P3',
      'Peras',
      'Proin dictum ut enim vitae luctus. Cras fringilla elit nec arcu tristique lacinia',
      'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      'provider_02'
    ),
  ]);

  const [providerList, setproviderList] = useState([
    new Provider(
      'provider_01',
      'Finca Los Manzanos',
      [4.771663332599528, -73.97970681236106]
    ),
    new Provider(
      'provider_02',
      'Finca BuenaVista',
      [4.811453752177087, -74.0089983026621]
    ),
  ]);

  const OnSelectProduct = (product_id) => {
    console.log('desde productList', product_id);
    //search selected Product from user using id, retorna el producto donde cumpla con ese id
    let selected_product = productList.find((product) => {
      return product.id === product_id;
    });

    // seleccionar el proveedor que coincida con ese id
    let selected_provider = providerList.find((provider) => {
      return provider.id === selected_product.provider_id;
    });
    console.log(selected_provider.name, selected_provider.location);
  };

  return (
    <ProductLocationContext.Provider value={{ location, setLocation }}>
    <Box sx={{ width: '100%', height: 600, overflowY: 'scroll' }}>
      <Stack spacing={2}>
        {productList.map((product) => {
          return (
            <ProductCard
              key={product.id}
              name={product.name}
              id={product.id}
              description={product.description}
              image_url={product.image_url}
              OnSelectProduct={OnSelectProduct}
            />
          );
        })}
      </Stack>
    </Box>
    </ProductLocationContext.Provider>
  );
}
