import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { StyledEngineProvider } from '@mui/material/styles';

import Products from './components/Products/Products';
import Services from './components/Services/Services';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

import Form from './components/common/Form';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { app } from './components/Api/firebase-config';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const handleAction = (id) => {
    const authentication = getAuth();
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password).then(
        (response) => {
          navigate('/components/Home/Home');
          sessionStorage.setItem(
            'Auth Token',
            response._tokenResponse.refreshToken
          );
        }
      );
    }
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password).then(
        (response) => {
          navigate('/components/Home/Home');
          sessionStorage.setItem(
            'Auth Token',
            response._tokenResponse.refreshToken
          );
        }
      );
    }
  };
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      navigate('/components/Home/Home');
    }
  }, [navigate]);
  return (
    <React.Fragment>
      <StyledEngineProvider injectFirst>
        <Navbar />

        <Routes>
          <Route exact path="/components/Home/Home" element={<Home />} />
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
          <Route
            exact
            path="/login"
            element={
              <Form
                title="Login"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(1)}
              />
            }
          />
          <Route
            exact
            path="/register"
            element={
              <Form
                title="Register"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(2)}
              />
            }
          />
          <Route path="/components/Home/Home" element={<Home />} />
        </Routes>
      </StyledEngineProvider>
    </React.Fragment>
  );
}

export default App;
