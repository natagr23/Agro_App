import React, { useEffect, useState } from 'react';
import { MapContextProvider } from './MapContext';

const MapProvider = ({ children }) => {
  const [map, setMap] = useState(null);
  const [mapLocation, setMapLocation] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!loading) {
      setLoadingMsg('loading');
    }
  }, [loading]);

  useEffect(() => {
    if (!showErrorMessage) {
      setErrorMessage('');
    }
  }, [showErrorMessage]);

  const value = {
    map: map,
    setMap: setMap,

    mapLocation: mapLocation,
    setMapLocation: setMapLocation,

    loading: loading,
    setLoading: setLoading,
    loadingMsg: loadingMsg,
    setLoadingMsg: setLoadingMsg,

    showErrorMessage: showErrorMessage,
    setShowErrorMessage: setShowErrorMessage,
    errorMessage: errorMessage,
    setErrorMessage: setErrorMessage,
  };

  return <MapContextProvider value={value}>{children}</MapContextProvider>;
};

export default MapProvider;
