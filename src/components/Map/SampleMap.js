//https://github.com/paulotijero/react-geolocation/blob/79b5de742e3910f67f67349b2b2b554ddaf5a4cf/src/index.js

//apikey open marker context
//apikey open marker usecontext

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

// import React from "react";
// import { jsx } from "@emotion/core";
// import GoogleMapsApiLoader from "google-maps-api-loader";

// import RequestLocation from "../componets/request-location";
// import { PositionContext } from "../contexts/position";

// const container = {
//   height: "90vh",
//   width: "100vw"
// };

// function GoogleMap() {
//   const position = React.useContext(PositionContext);
//   const [googleMap, setGoogleMap] = React.useState(null);
//   const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
//   const mapContainerRef = React.useRef(null);

//   React.useEffect(() => {
//     GoogleMapsApiLoader({ apiKey }).then(google => {
//       setGoogleMap(google);
//     });
//   }, [apiKey]);

//   React.useEffect(() => {
//     if (!googleMap || !mapContainerRef.current) return;

//     const initialConfig = {
//       zoom: 15,
//       center: { lat: position.latitude, lng: position.longitude }
//     };
//     const map = new googleMap.maps.Map(mapContainerRef.current, initialConfig);
//     const marker = new googleMap.maps.Marker({
//       position: initialConfig.center,
//       map: map
//     });
//     const InfoWindow = new googleMap.maps.InfoWindow({
//       content: `<div id="content"> You are Here! <span role="img" aria-label="emoji dot position">
//       🕵 ️
//     </span></div>`
//     });
//     marker.addListener("click", () => {
//       InfoWindow.open(map, marker);
//     });
//   }, [googleMap, mapContainerRef, position.latitude, position.longitude]);

//   return (
//     <React.Fragment>
//       {position.latitude === 0 ? (
//         <RequestLocation />
//       ) : (
//         <div css={container} ref={mapContainerRef} />
//       )}
//     </React.Fragment>
//   );
// }

// export default GoogleMap;
