import React from 'react';
import Navbar from './components/Navbar/Navbar';

import { StyledEngineProvider } from '@mui/material/styles';

import { AuthProvider } from './components/AuthContext/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ShopContextProvider } from './Context/ShopContext';
import AuthComponent from './components/AuthContext/AuthComponent';
import RoutesComponent from './components/Home/RoutesComponent';

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <StyledEngineProvider injectFirst>
        {/* <ShowContext.Provider value={{ show, setShow }}> */}
        <ShopContextProvider>
          <AuthProvider>
            <AuthComponent />
            <Navbar />
            <RoutesComponent />
          </AuthProvider>
          {/* <SearchBar /> */}
        </ShopContextProvider>
        {/* </ShowContext.Provider> */}
      </StyledEngineProvider>
    </React.Fragment>
  );
}

export default App;
