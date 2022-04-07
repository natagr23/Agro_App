import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { StyledEngineProvider } from '@mui/material/styles';

import Products from './components/Products/Products';
import Services from './components/Services/Services';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Account from './components/Account/Account';

import Form from './components/common/Form';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { app } from './components/Api/firebase-config';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const handleAction = (id) => {
    const authentication = getAuth();
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/components/Account/Account');
          sessionStorage.setItem(
            'Auth Token',
            response._tokenResponse.refreshToken
          );
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            toast.error('Please check the Password');
          }
          if (error.code === 'auth/user-not-found') {
            toast.error('Please check the Email');
          }
        });
    }
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/components/Account/Account');
          sessionStorage.setItem(
            'Auth Token',
            response._tokenResponse.refreshToken
          );
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          }
        });
    }
  };
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      navigate('/components/Account/Account');
    }
  }, [navigate]);
  return (
    <React.Fragment>
      <ToastContainer />
      <StyledEngineProvider injectFirst>
        <Navbar />

        <Routes>
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
