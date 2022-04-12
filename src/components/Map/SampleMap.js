import React, { useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationContext from '../Context/LocationContext';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SampleMap() {
  const location = useContext(LocationContext);
  const defaultProps = {
    center: {
      lat: 4.743231052096736,
      lng: -74.03544274444285,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAhoPLVukmNJqSFkcG9DTvtz-fHJdUAY9A' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={location.Latitude}
          lng={location.Longitude}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

// https://www.freecodecamp.org/news/react-context-for-beginners/

// https://developers.google.com/maps/documentation/javascript/react-map
