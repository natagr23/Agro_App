import React, { useState, useEffect, useContext, createContext } from 'react';
import Navbar from './components/Navbar/Navbar';
import { StyledEngineProvider } from '@mui/material/styles';

import Products from './components/Products/Products';
import Services from './components/Services/Services';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Account from './components/Account/Account';

// import Form from './components/common/Form';

import Register from './components/Login/Register';

import ForgotPassword from './components/Login/ForgotPassword';

// import LocationContext from './Context/LocationContext';

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
// import SearchBar from './components/SearchBar/SearchBar';

// import { app } from './components/Api/firebase-config';

import { AuthProvider } from './components/AuthContext/AuthContext';
import { auth } from './components/Api/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from './components/Login/SignIn';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  const [farmer, setFarmer] = useState('Finca xxx');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      navigate('/components/Account/Account');
    }
  }, [navigate]);
  return (
    <React.Fragment>
      {/* <LocationContext.Provider value={location}> */}
      <ToastContainer />
      <StyledEngineProvider injectFirst>
        <Navbar />
        <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/components/Home/Home" replace={true} />}
            />
            <Route
              exact
              path="/components/Account/Account"
              element={<Account />}
            />
            <Route
              exact
              path="/components/Products/Products"
              element={<Products name="Producto1" />}
            />
            <Route
              exact
              path="/components/Services/Services"
              element={<Services />}
            />
            <Route exact path="/components/About/About" element={<About />} />
            <Route
              exact
              path="/components/Contact/Contact"
              element={<Contact />}
            />
            {/* <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            /> */}

            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/register" element={<Register />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route
              path="/components/Home/Home"
              element={<Home farmer={farmer} />}
            />

            {/* <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route path="/reset-password">
              <ResetPassword />
            </Route> */}
          </Routes>
        </AuthProvider>
        {/* <SearchBar /> */}
      </StyledEngineProvider>
      {/* </LocationContext.Provider> */}
    </React.Fragment>
  );
}

export default App;
