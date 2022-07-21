//markerRef = useRef   apikey react

//https://google-map-react.github.io/google-map-react/map/main/

//https://google-map-react.github.io/google-map-react/map/balderdash

//https://github.com/google-map-react/old-examples/blob/master/web/flux/components/examples/x_main/main_map_block.jsx

//https://www.npmjs.com/package/@react-google-maps/api

import React, { useState, useContext, useEffect } from 'react';
// import GoogleMapReact from 'google-map-react';
import { ShopContext } from '../../Context/ShopContext';
import DescriptionMarker from '../Map/DescriptionMarker';

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api';

import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../Api/firebase-config';

const libraries = ['places'];
const SampleMap = (props) => {
  const [map, setMap] = useState(null);

  const [currentPosition, setCurrentPosition] = useState(null);

  const [isDisplayInfoWindowMarker, setIsDisplayInfoWindowMarker] =
    useState(false);
  const [openInfoWindowMarkerId, setOpenInfoWindowMarkerId] = useState();
  const ctx = useContext(ShopContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productColRef = query(
      collection(db, 'products'),
      orderBy('created', 'desc')
    );
    onSnapshot(productColRef, (snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const getBounds = () => {
    ctx.updateBounds({
      boundsNordEstlat: map.getBounds().getNorthEast().lat(),
      boundsNordEstlng: map.getBounds().getNorthEast().lng(),
      boundsSudOuestlat: map.getBounds().getSouthWest().lat(),
      boundsSudOuestlng: map.getBounds().getSouthWest().lng(),
    });
  };

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const containerStyle = {
    height: '100%',
    width: '100%',
  };
  let libRef = React.useRef(libraries);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAhoPLVukmNJqSFkcG9DTvtz-fHJdUAY9A',
    libraries: libRef.current,
  });

  const onMapLoad = (map) => {
    setMap(map);
  };
  const handleToggleOpen = (markerId) => {
    setIsDisplayInfoWindowMarker(true);
    setOpenInfoWindowMarkerId(markerId);
  };

  const hideInfoWindow = () => {
    setIsDisplayInfoWindowMarker(false);
  };

  return isLoaded ? (
    <div style={{ height: '100vh', width: '100%' }}>
      {currentPosition !== null && (
        <GoogleMap
          defaultZoom={9}
          onViewportChange={(viewport) => ctx.updateViewport(viewport)}
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={9}
          onLoad={(map) => onMapLoad(map)}
          onBoundsChanged={getBounds}
        >
          {products !== false &&
            !ctx.show &&
            products.map((provider, id) => {
              return (
                <Marker
                  key={provider.id}
                  id={provider.id}
                  label={provider.data.name}
                  position={{
                    lat: provider.data.latitude,
                    lng: provider.data.longitude,
                  }}
                  icon={{
                    url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    labelOrigin: new window.google.maps.Point(-25, 16),
                    scale: 0.5,
                    strokeWeight: 10,
                    strokeColor: 'black',
                    // strokeOpacity: 5,
                    // fillColor: 'black',
                    // fillOpacity: 5,
                  }}
                  onClick={() => handleToggleOpen(id)}
                >
                  {/* <DescriptionMarker
                    name={provider.data.place}
                    selected={ctx.selectedProduct === provider}
                  /> */}

                  {openInfoWindowMarkerId === id &&
                    isDisplayInfoWindowMarker === true && (
                      <InfoWindow
                        // pixelOffset={'0'}
                        options={{
                          pixelOffset: {
                            width: 0,
                            height: 0,
                          },
                        }}
                        position={{
                          lat: provider.data.latitude,
                          lng: provider.data.longitude,
                        }}
                        onCloseClick={hideInfoWindow}
                      >
                        <div>
                          <img
                            src={`https://maps.googleapis.com/maps/api/streetview?size=640x320&location=${provider.data.latitude},${provider.data.longitude}&heading=220.78&key=AIzaSyC2-n39eQnutXECIDc-9tlNMNFmxzshDtE&amp`}
                            alt=""
                          />
                          <p>{provider.data.name}</p>
                          <p>{provider.data.place}</p>
                        </div>
                      </InfoWindow>
                    )}
                </Marker>
              );
              //   if (provider.id === ctx.selected_product.id) {
              // } else {
              //   return <div>Error!!</div>;
              // }
            })}

          <Marker position={currentPosition}>
            <InfoWindow
              options={{
                pixelOffset: {
                  width: 0,
                  height: 0,
                },
              }}
              position={currentPosition}
            >
              <div>
                <p>Posición Actual</p>
              </div>
            </InfoWindow>
          </Marker>
        </GoogleMap>
      )}
    </div>
  ) : (
    // </ShopContext.Consumer>
    <p>Map can't be load</p>
  );
};

export default React.memo(SampleMap);

// return (
// <>
