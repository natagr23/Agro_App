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
        updateShopReview: updateShopReview,
        updateMinStars: updateMinStars,
        updateMaxStars: updateMaxStars,
        updateBounds: updateBounds,
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
