//https://stackoverflow.com/questions/63911883/how-do-i-implement-sibling-component-communication-in-app-shell-and-ssr

//useContext Marker, InfoWindow  from "react-google-maps";

import React, { useState, useContext, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
// import Marker from 'google-map-react';
// import styled from 'styled-components';

import LocationContext from '../Context/LocationContext';
import { PersonalInfoContext } from '../Context/ProductLocationContext';

import MarkerMap from './MarkerMap';
import { farmerContext } from '../../App';
import { useAppContext } from '../Context/AppContext';
import { proveedores } from '../Products/ProductList';

export default function SampleMap() {
  const [search, setSearch] = useAppContext();

  console.log(search);

  // const { productList } = useProductListContext();

  let farmer = useContext(farmerContext);

  const fincas = useContext(PersonalInfoContext);

  // let proveedor = useContext(ProveedorProvider);

  const location = useContext(LocationContext);

  const busqueda = useAppContext();

  // console.log(
  //   providerList.map((finca, index) => (
  //     <h3 key={index}>My name is {finca.name}</h3>
  //   ))
  // );

  return (
    <>
      // {/* <ProductList> */}
      {/* <ProductList> */}
      <div style={{ height: '100vh', width: '100%' }}>
        {/* <PersonalInfoContext.Consumer> */}
        {/* <PersonalInfoContext.Consumer> */}

        <h2>{`Hello ${farmer} again!`}</h2>
        {/* <h2>{`Hola ${JSON.stringify(busqueda)} again!`}</h2> */}
        {/* <h2>{`Hola ${JSON.stringify(proveedores)} again!`}</h2> */}

        {/* <h2>{JSON.stringify(search)}</h2> */}

        {proveedores.map((finca, index) => (
          <h3 key={index}>My name is {finca.name}</h3>
        ))}

        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyAhoPLVukmNJqSFkcG9DTvtz-fHJdUAY9A',
          }}
          defaultCenter={{ lat: location.Latitude, lng: location.Longitude }}
          defaultZoom={15}
        >
          {proveedores.map((person, index) => (
            <MarkerMap
              key={index}
              text={'place.name'}
              lat={person.location[0]}
              lng={person.location[1]}
            />
          ))}

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
        {/* </PersonalInfoContext.Consumer> */}
      </div>
      // {/* </ProductList> */}
      // {/* </ProductList> */}
      //{' '}
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
