//https://codesandbox.io/s/33xqq?file=/src/App.js:1205-1230

import React, { useState, useContext, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
// import Marker from 'google-map-react';
// import styled from 'styled-components';
import LocationContext from '../Context/LocationContext';

import { PersonalInfoContext } from '../Context/ProductLocationContext';

import MarkerMap from './MarkerMap';

export default function SampleMap() {
  const people = useContext(PersonalInfoContext);

  const location = useContext(LocationContext);

  // console.log(
  //   people.providerList.map((finca, index) => (
  //     <h3 key={index}>My name is {finca.name}</h3>
  //   ))
  // );
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      {/* <PersonalInfoContext.Consumer> */}
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAhoPLVukmNJqSFkcG9DTvtz-fHJdUAY9A' }}
        defaultCenter={{ lat: location.Latitude, lng: location.Longitude }}
        defaultZoom={15}
      >
        {/* {people.providerList.map((person, index) => (
            <MarkerMap
              key={index}
              text={'place.name'}
              lat={person.location[0]}
              lng={person.location[1]}
            />
          ))} */}

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
      {/* </PersonalInfoContext.Consumer> */}
    </div>
  );
}

// https://www.freecodecamp.org/news/react-context-for-beginners/

// https://developers.google.com/maps/documentation/javascript/react-map

// const Wrapper = styled.main`
//   width: 100%;
//   height: 100%;
// `;

// selected_provider.location.map(({ location }) => {
//   return console.log(location);
// });

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
