import React, { useState, useContext, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
// import Marker from 'google-map-react';
// import styled from 'styled-components';
import LocationContext from '../Context/LocationContext';

import MarkerMap from './MarkerMap';

// const Wrapper = styled.main`
//   width: 100%;
//   height: 100%;
// `;

export default function SampleMap() {
  const location = useContext(LocationContext);

  // const [places, setPlaces] = useState([]);

  // const fetchPlaces = async () => {
  //   fetch('places.json')
  //     .then((response) => response.json())
  //     .then((data) => setPlaces(data.results));
  // };

  // useEffect(() => {
  //   fetchPlaces();
  // }, []);

  // if (!places || places.length === 0) {
  //   return null;
  // }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAhoPLVukmNJqSFkcG9DTvtz-fHJdUAY9A' }}
        defaultCenter={{ lat: location.Latitude, lng: location.Longitude }}
        defaultZoom={15}
      >
        <MarkerMap
          key={1}
          text={'place.name'}
          lat={location.Latitude}
          lng={location.Longitude}
        />
        {/* <Marker
          position={{
            lat: location.Latitude,
            lng: location.Longitude,
          }}
        /> */}
        {/* {location.map((location) => (
          <MarkerMap
            lat={location.geometry.location.lat}
            lng={location.geometry.location.lng}
          />
        ))} */}
      </GoogleMapReact>
    </div>
  );
}

// https://www.freecodecamp.org/news/react-context-for-beginners/

// https://developers.google.com/maps/documentation/javascript/react-map
