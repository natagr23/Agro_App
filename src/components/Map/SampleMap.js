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

  const [currentPosition, setCurrentPosition] = useState({});
  const [positionClickedOnMap, setPositionClickedOnMap] = useState();
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
    setPositionClickedOnMap(e);
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
    googleMapsApiKey: 'AIzaSyCinlLedoJJ0bb-imfhm8tBdvJuPWcr8bI',
    libraries: libRef.current,
  });

  const onMapLoad = (map) => {
    let service = new window.google.maps.places.PlacesService(map);

    let request = {
      location: { lng: currentPosition.lng, lat: currentPosition.lat },
      radius: '800',
      type: ['shop'],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (const result of results) {
          let request2 = {
            placeId: result.place_id,
            fields: ['reviews'],
          };

          const ratings = [];
          service.getDetails(request2, function (place, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              for (const placeElement of place.reviews) {
                ratings.push({
                  stars: placeElement.rating,
                  comment: placeElement.text,
                });
              }
            }
          });
        }
      }
    });

    setMap(map);
  };
  useEffect(() => {
    setTimeout(() => {
      ctx.updateBounds({
        boundsNordEstlat: map.getBounds().getNorthEast().lat(),
        boundsNordEstlng: map.getBounds().getNorthEast().lng(),
        boundsSudOuestlat: map.getBounds().getSouthWest().lat(),
        boundsSudOuestlng: map.getBounds().getSouthWest().lng(),
      });
    }, 100);
  }, [map]);

  const handleToggleOpen = (markerId) => {
    setIsDisplayInfoWindowMarker(true);
    setOpenInfoWindowMarkerId(markerId);
  };

  const hideInfoWindow = () => {
    setIsDisplayInfoWindowMarker(false);
  };

  return isLoaded ? (
    // <ShopContext.Consumer>
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={11}
        onLoad={(map) => onMapLoad(map)}
        onBoundsChanged={getBounds}
        onClick={getPositionClickedOnMap}
      >
        {ctx.shops !== false &&
          ctx.shops.map((element, index) => (
            <Marker
              key={index}
              position={{
                lat: element.location[0],
                lng: element.location[1],
              }}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              }}
              name={element.name}
              onClick={() => handleToggleOpen(index)}
            >
              {openInfoWindowMarkerId === index &&
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
          ))}

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
    </div>
  ) : (
    // </ShopContext.Consumer>
    <p>Map can't be load</p>
  );
};

export default React.memo(SampleMap);

// return (
// <>
