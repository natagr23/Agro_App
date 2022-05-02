import React, { useState, createContext } from 'react';

import restaurantsJson from '../assets/restaurants.json';

export const RestaurantContext = createContext();

export const RestaurantContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState(restaurantsJson);
  const [minStars, setMinStars] = useState(1);
  const [maxStars, setMaxStars] = useState(5);
  const [bounds, setBounds] = useState({});

  const updateRestaurants = (restaurantsUpdated) => {
    setRestaurants((prevState) => [...prevState, restaurantsUpdated]);
  };

  const updateRestaurantReview = (restaurantName, review) => {
    if (
      restaurants.find(
        (restaurant) => restaurant.restaurantName === restaurantName
      )
    ) {
      let updatedRestaurantReviews = restaurants.map((restaurant) => {
        if (restaurant.restaurantName === restaurantName) {
          return { ...restaurant, ratings: review }; //gets everything that was already in item, and updates "done"
        }
        return restaurant; // else return unmodified item
      });

      setRestaurants(updatedRestaurantReviews); // set state to new object with updated list
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
    <RestaurantContext.Provider
      value={{
        restaurants: restaurants,
        minStars: minStars,
        maxStars: maxStars,
        bounds: bounds,
        updateRestaurants: updateRestaurants,
        updateRestaurantReview: updateRestaurantReview,
        updateMinStars: updateMinStars,
        updateMaxStars: updateMaxStars,
        updateBounds: updateBounds,
      }}
    >
      {props.children}
    </RestaurantContext.Provider>
  );
};
