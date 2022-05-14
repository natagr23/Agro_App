//markerRef = useRef   apikey react

//https://google-map-react.github.io/google-map-react/map/main/

//https://google-map-react.github.io/google-map-react/map/balderdash

//https://github.com/google-map-react/old-examples/blob/master/web/flux/components/examples/x_main/main_map_block.jsx

//https://www.npmjs.com/package/@react-google-maps/api

import React, { useState, useContext, useEffect } from 'react';
// import GoogleMapReact from 'google-map-react';
import { ShopContext } from '../../Context/ShopContext';

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api';

const libraries = ['places'];
const SampleMap = (props) => {
  const [map, setMap] = useState(null);

  const [currentPosition, setCurrentPosition] = useState(null);

  const [isDisplayInfoWindowMarker, setIsDisplayInfoWindowMarker] =
    useState(false);
  const [openInfoWindowMarkerId, setOpenInfoWindowMarkerId] = useState();
  const ctx = useContext(ShopContext);

  const getBounds = () => {
    ctx.updateBounds({
      boundsNordEstlat: map.getBounds().getNorthEast().lat(),
      boundsNordEstlng: map.getBounds().getNorthEast().lng(),
      boundsSudOuestlat: map.getBounds().getSouthWest().lat(),
      boundsSudOuestlng: map.getBounds().getSouthWest().lng(),
    });
  };

  const getPositionClickedOnMap = (e) => {
    // setPositionClickedOnMap(e);
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

  // const handleMarkerOpen = (productId) => {
  //   setOpenMarkerId(productId);
  // };

  useEffect(() => {
    if (!ctx.selectedProvider) {
      return;
    }
    const currentPosition = {
      lat: ctx.selectedProvider.location[0],
      lng: ctx.selectedProvider.location[1],
    };
    setCurrentPosition(currentPosition);
  }, [ctx.selectedProvider]);

  return isLoaded ? (
    // <ShopContext.Consumer>
    <div style={{ height: '100vh', width: '100%' }}>
      {currentPosition !== null && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={11}
          onLoad={(map) => onMapLoad(map)}
          onBoundsChanged={getBounds}
          onClick={getPositionClickedOnMap}
        >
          {ctx.shops !== false &&
            ctx.show &&
            // ctx.openMarkerId === ctx.product_id &&
            ctx.shops.map((element, id) => {
              if (element.id !== id) {
                return (
                  <Marker
                    key={id}
                    position={{
                      lat: element.location[0],
                      lng: element.location[1],
                    }}
                    icon={{
                      url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    }}
                    name={element.name}
                    onClick={() => handleToggleOpen(id)}
                  >
                    {openInfoWindowMarkerId === id &&
                      isDisplayInfoWindowMarker === true && (
                        <InfoWindow
                          options={{
                            pixelOffset: {
                              width: 0,
                              height: 0,
                            },
                          }}
                          position={{
                            lat: element.location[0],
                            lng: element.location[1],
                          }}
                          onCloseClick={hideInfoWindow}
                        >
                          <div>
                            <img
                              src={`https://maps.googleapis.com/maps/api/streetview?size=640x320&location=${element.location[0]},${element.location[1]}&heading=220.78&key=AIzaSyC2-n39eQnutXECIDc-9tlNMNFmxzshDtE&amp`}
                              alt=""
                            />
                            <p>{element.name}</p>
                          </div>
                        </InfoWindow>
                      )}
                  </Marker>
                );
              } else {
                return <div>Error!!</div>;
              }
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
