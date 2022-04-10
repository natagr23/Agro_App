import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SampleMap() {
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
          lat={4.743231052096736}
          lng={-74.03544274444285}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}
