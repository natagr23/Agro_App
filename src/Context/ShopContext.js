import React, { useState, createContext, useReducer } from 'react';

import ProviderJson from '../components/Data/ProviderJson.json';
import ProductJson from '../components/Data/ProductJson.json';
import { defaultState } from '../Context/defaultState';
import { reducer } from './AuthContext_reducer';

export const ShopContext = createContext({});

export const ShopContextProvider = (props) => {
  const [shops, setShops] = useState(ProviderJson);
  const [products] = useState(ProductJson);

  const [minStars, setMinStars] = useState(1);
  const [maxStars, setMaxStars] = useState(5);
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

  const [state, dispatch] = useReducer(reducer, defaultState);

  const selectProduct = (product) => {
    setSelectedProduct((old) => ({
      selectedProduct: product,
      viewport: {
        ...old.viewport,
        latitude: shops.location[0],
        longitude: shops.location[1],
      },
    }));
  };

  const handleOpenMarker = (product_id) => {
    updateShow(product_id);

    let selected_product = products.find((product) => {
      return product.id === product_id;
    });
    let selected_provider2 = shops.find((provider) => {
      return provider.id === selected_product.provider_id;
    });
    setSelectedProvider(() => {
      return selected_provider2;
    });
    console.log(selected_provider2.name, selected_provider2.location);
  };

  const updateShops = (shopsUpdated) => {
    setShops((prevState) => [...prevState, shopsUpdated]);
  };

  const updateProducts = (productsUpdated) => {
    setShops((prevState) => [...prevState, productsUpdated]);
  };

  const updateShopReview = (shopName, review) => {
    if (shops.find((shop) => shop.shopName === shopName)) {
      let updatedRestaurantReviews = shops.map((shop) => {
        if (shop.restaurantName === shopName) {
          return { ...shop, ratings: review }; //gets everything that was already in item, and updates "done"
        }
        return shop; // else return unmodified item
      });

      setShops(updatedRestaurantReviews); // set state to new object with updated list
    }
  };

  const updateMinStars = (data) => {
    setMinStars(data);
  };

  const updateMaxStars = (data) => {
    setMaxStars(data);
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

  const toggleNav = () => {
    dispatch({ type: 'TOGGLE_NAV' });
  };
  const toggleMobile = () => {
    dispatch({ type: 'TOGGLE_MOBILE' });
  };
  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const setSearch = (q) => {
    dispatch({ type: 'SET_SEARCH', payload: q });
  };
  const setParty = (party) => {
    dispatch({ type: 'SET_PARTY', payload: party });
  };

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
        minStars: minStars,
        maxStars: maxStars,
        bounds: bounds,
        updateShops: updateShops,
        updateShopReview: updateShopReview,
        updateMinStars: updateMinStars,
        updateMaxStars: updateMaxStars,
        updateBounds: updateBounds,
        toggleNav: toggleNav,
        toggleMobile: toggleMobile,
        toggleTheme: toggleTheme,
        setSearch: setSearch,
        setParty: setParty,
        state: state,
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
