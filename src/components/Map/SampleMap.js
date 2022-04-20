//https://codesandbox.io/s/33xqq?file=/src/App.js:1205-1230

//https://codesandbox.io/s/react-context-provider-forked-cwke2h?file=/src/MyComponent2.js:396-495

//useContext Marker, InfoWindow  from "react-google-maps";

import React, { useState, useContext, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
// import Marker from 'google-map-react';
// import styled from 'styled-components';

import LocationContext from '../Context/LocationContext';

import { PersonalInfoContext } from '../Context/ProductLocationContext';

import MarkerMap from './MarkerMap';
import { farmerContext } from '../../App';
import { providerContext } from '../../components/Products/ProductList';
import { ProveedorProvider } from '../Context/productContext';
// import ProductList from '../../components/Products/ProductList';

export default function SampleMap() {
  // const [providerList] = useContext(providerContext);
  let farmer = useContext(farmerContext);

  let provider = useContext(providerContext);

  let proveedor = useContext(ProveedorProvider);

  const location = useContext(LocationContext);

  // console.log(
  //   people.providerList.map((finca, index) => (
  //     <h3 key={index}>My name is {finca.name}</h3>
  //   ))
  // );
  // console.log(JSON.stringify(providerList));
  console.log(proveedor);
  return (
    // <providerContext.Consumer value={[providerList, setproviderList]}>
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      {/* <PersonalInfoContext.Consumer> */}
      <h2>{`Hello ${farmer} again!`}</h2>

      <h2>{`Hello ${provider} again!`}</h2>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyAhoPLVukmNJqSFkcG9DTvtz-fHJdUAY9A',
        }}
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
    // </providerContext.Consumer>
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
