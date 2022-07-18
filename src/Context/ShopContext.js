import React, { useState, createContext, useReducer, useEffect } from 'react';

import ProviderJson from '../components/Data/ProviderJson.json';
import ProductJson from '../components/Data/ProductJson.json';
import { defaultState } from '../Context/defaultState';
import { reducer } from './AuthContext_reducer';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../components/Api/firebase-config';

export const ShopContext = createContext({});

export const ShopContextProvider = (props) => {
  const [shops, setShops] = useState(ProviderJson);
  const [products_json] = useState(ProductJson);
  const [bounds, setBounds] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 4.7208119626905445, // bogota
    longitude: -74.02090554345155, // bogota
    width: '100wv',
    height: '100vh',
    zoom: 10,
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productColRef = query(
      collection(db, 'products'),
      orderBy('created', 'desc')
    );
    onSnapshot(productColRef, (snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  // const [state, dispatch] = useReducer(reducer, defaultState);

  const selectProduct = (product) => {
    setSelectedProduct((old) => ({
      selectedProduct: product,
      viewport: {
        ...old.viewport,
        latitude: product.data.latitude,
        longitude: product.data.longitude,
      },
    }));
  };

  // const selectProduct = (product) => {
  //   setSelectedProduct((old) => ({
  //     selectedProduct: product,
  //     viewport: {
  //       ...old.viewport,
  //       latitude: shops.location[0],
  //       longitude: shops.location[1],
  //     },
  //   }));
  // };

  const handleOpenMarker = (product_id) => {
    updateShow(product_id);

    let selected_product = products_json.find((product) => {
      return product.id === product_id;
    });
    let selected_provider = shops.find((provider) => {
      return provider.id === selected_product.provider_id;
    });
    setSelectedProvider(() => {
      return selected_provider;
    });
    console.log(selected_provider.name, selected_provider.location);
  };

  const updateShops = (shopsUpdated) => {
    setShops((prevState) => [...prevState, shopsUpdated]);
  };

  const updateProducts = (productsUpdated) => {
    setShops((prevState) => [...prevState, productsUpdated]);
  };

  const updateBounds = (data) => {
    setBounds(() => data);
  };

  const updateShow = (shops_id) => {
    setShow(shops_id);
  };

  const updateViewport = (viewport) => {
    setViewport({ viewport });
  };

  // const setParty = (party) => {
  //   dispatch({ type: 'SET_PARTY', payload: party });
  // };

  return (
    <ShopContext.Provider
      value={{
        updateViewport: updateViewport,
        viewport: viewport,
        selectedProvider: selectedProvider,
        handleOpenMarker: handleOpenMarker,
        selectProduct: selectProduct,
        selectedProduct: selectedProduct,
        products: products,
        updateProducts: updateProducts,
        shops: shops,
        show: show,
        updateShow: updateShow,
        bounds: bounds,
        updateShops: updateShops,
        updateBounds: updateBounds,
        // setParty: setParty,
        // state: state,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

// import React, { createContext, useState } from 'react';

// const PersonalInfoContext = createContext();

// const PersonalInfoProvider = ({ value, children }) => {
//   const [provider, setProvider] = useState(value);

//   return (
//     <PersonalInfoContext.Provider value={{ provider, setProvider }}>
//       {children}
//     </PersonalInfoContext.Provider>
//   );
// };

// export { PersonalInfoProvider, PersonalInfoContext };
