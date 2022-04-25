//https://stackoverflow.com/questions/63911883/how-do-i-implement-sibling-component-communication-in-app-shell-and-ssr

//useContext Marker, InfoWindow  from "react-google-maps";

//https://www.developintelligence.com/blog/2017/01/google-maps-in-react-redux-interactivity-across-different-components/

//https://github.com/gizm00/react_redux_camping_map/blob/master/src/CampFilterApp.jsx

import React, { useState, useContext, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from 'google-map-react';
// import styled from 'styled-components';

import LocationContext from '../Context/LocationContext';
// import { PersonalInfoContext } from '../Context/ProductLocationContext';

import MarkerMap from './MarkerMap';
// import { farmerContext } from '../../App';
import { useAppContext } from '../Context/AppContext';
import { providers } from '../Products/ProductList';

import MapContext from '../Context/MapContext';

export const Markers = providers.map((provider, index) => (
  <MarkerMap
    key={index}
    text={provider.name}
    lat={provider.location[0]}
    lng={provider.location[1]}
  />
));

export default function SampleMap() {
  const mapContext = useContext(MapContext);
  // const [search, setSearch] = useAppContext();
  // console.log(search);

  // const [markerIsShown, setMarkerIsShown] = useState(false);

  // const showCartHandler = () => {
  //   setMarkerIsShown(true);
  // };

  // const hideCartHandler = () => {
  //   setMarkerIsShown(false);
  // };

  // const { productList } = useProductListContext();

  // let farmer = useContext(farmerContext);

  // const fincas = useContext(PersonalInfoContext);

  // let proveedor = useContext(ProveedorProvider);

  const location = useContext(LocationContext);

  // console.log(
  //   providerList.map((finca, index) => (
  //     <h3 key={index}>My name is {finca.name}</h3>
  //   ))
  // );

  return (
    <>
      <div style={{ height: '100vh', width: '100%' }}>
        {/* <h2>{JSON.stringify(search)}</h2> */}

        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyAhoPLVukmNJqSFkcG9DTvtz-fHJdUAY9A',
          }}
          defaultCenter={{ lat: location.Latitude, lng: location.Longitude }}
          defaultZoom={12}
        >
          {/* {cartIsShown && <Cart onClose={hideCartHandler} />} */}
          {providers.map((provider, index) => (
            <MarkerMap
              key={index}
              text={provider.name}
              lat={provider.location[0]}
              lng={provider.location[1]}

              // eventHandlers={{
              //   click: () => {
              //     console.log('marker clicked');
              //   },
              // }}
            />
          ))}

          {/* <Marker lat={location.Latitude} lng={location.Longitude} /> */}
        </GoogleMapReact>
      </div>{' '}
    </>
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
