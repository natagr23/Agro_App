import React, { useState, createContext } from 'react';

import ProviderJson from '../components/Data/ProviderJson.json';

export const ShopContext = createContext({});

export const ShopContextProvider = (props) => {
  const [shops, setShops] = useState(ProviderJson);
  const [minStars, setMinStars] = useState(1);
  const [maxStars, setMaxStars] = useState(5);
  const [bounds, setBounds] = useState({});

  const updateShops = (restaurantsUpdated) => {
    setShops((prevState) => [...prevState, restaurantsUpdated]);
  };

  const updateMinStars = (data) => {
    setMinStars(data);
  };

  const updateMaxStars = (data) => {
    setMaxStars(data);
  };

  const updateBounds = (data) => {
    setBounds(data);
  };

  return (
    <ShopContext.Provider
      value={{
        shops: shops,
        minStars: minStars,
        maxStars: maxStars,
        bounds: bounds,
        updateShops: updateShops,
        updateMinStars: updateMinStars,
        updateMaxStars: updateMaxStars,
        updateBounds: updateBounds,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};
