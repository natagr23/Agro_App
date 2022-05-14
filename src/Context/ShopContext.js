import React, { useState, createContext } from 'react';

import ProviderJson from '../components/Data/ProviderJson.json';
import ProductJson from '../components/Data/ProductJson.json';

export const ShopContext = createContext({});

export const ShopContextProvider = (props) => {
  const [shops, setShops] = useState(ProviderJson);
  const [products, setProducts] = useState(ProductJson);
  const [selected, setSelected] = useState(null);
  const [minStars, setMinStars] = useState(1);
  const [maxStars, setMaxStars] = useState(5);
  const [bounds, setBounds] = useState([]);
  const [show, setShow] = useState(false);
  const [openMarkerId, setOpenMarkerId] = useState();

  const handleOpenMarker = (product_id) => {
    setOpenMarkerId(product_id);
    updateShow(product_id);

    let selected_product = products.find((product) => {
      return product.id === product_id;
    });
    let selected_provider2 = shops.find((provider) => {
      return provider.id === selected_product.provider_id;
    });

    console.log(selected_provider2.name, selected_provider2.location);
  };

  const OnSelectProduct = (product_id) => {
    //  handleToggleOpenMarker(id);
    console.log('desde productList', product_id);
    //search selected Product from user using id, retorna el producto donde cumpla con ese id
    let selected_product = products.find((product) => {
      return product.id === product_id;
    });
    updateShow(product_id);
    // setOpenMarkerId(markerId);
    // seleccionar el proveedor que coincida con ese id
    let selected_provider = shops.find((provider) => {
      return provider.id === selected_product.provider_id;
    });
    console.log(selected_provider.name, selected_provider.location);
    // setShowProduct(true);
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
    setBounds(data);
  };

  const updateShow = (shops_id) => {
    setShow(shops_id);
  };

  return (
    <ShopContext.Provider
      value={{
        handleOpenMarker: handleOpenMarker,
        OnSelectProduct: OnSelectProduct,
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
