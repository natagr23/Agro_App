import React, { useState, useContext, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from 'google-map-react';
// import styled from 'styled-components';

import LocationContext from '../Context/LocationContext';
// import { PersonalInfoContext } from '../Context/ProductLocationContext';

import MarkerMap from './MarkerMap';
// import { farmerContext } from '../../App';
import { useAppContext } from '../Context/AppContext';
// import { providers } from '../Products/ProductList';
import ProviderJson from '../../components/Data/ProviderJson.json';

import MapContext from '../Context/MapContext';

export default function SampleMap() {
  const [currentPosition, setCurrentPosition] = useState({});
  const mapContext = useContext(MapContext);

  const location = useContext(LocationContext);

  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  return (
    <>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyAhoPLVukmNJqSFkcG9DTvtz-fHJdUAY9A',
          }}
          defaultCenter={{ lat: location.Latitude, lng: location.Longitude }}
          defaultZoom={12}
          yesIWantToUseGoogleMapApiInternals
        >
          {ProviderJson.map((provider, index) => (
            <AnyReactComponent
              key={index}
              text={provider.name}
              lat={provider.location[0]}
              lng={provider.location[1]}
            />
          ))}

          {ProviderJson.map((provider, index) => (
            <MarkerMap
              key={index}
              text={provider.name}
              lat={provider.location[0]}
              lng={provider.location[1]}
            />
          ))}
          {/* <Marker lat={location.Latitude} lng={location.Longitude} /> */}
        </GoogleMapReact>
      </div>{' '}
    </>
  );
}

// export const Markers = ProviderJson.map((provider, index) => (
//   <Marker
//     key={index}
//     text={provider.name}
//     lat={provider.location[0]}
//     lng={provider.location[1]}
//   />
// ));

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
