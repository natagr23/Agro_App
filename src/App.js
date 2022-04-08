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

import Profile from './components/Login/Profile';
import Register from './components/Login/Register';
import VerifyEmail from './components/Login/VerifyEmail';
import Login from './components/Login/Login';
import PrivateRoute from './components/Login/PrivateRoute';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
// import SearchBar from './components/SearchBar/SearchBar';

import { app } from './components/Api/firebase-config';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { AuthProvider } from './components/AuthContext/AuthContext';
import { auth } from './components/Api/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const handleAction = (id) => {
    const authentication = getAuth();
    // if (id === 1) {
    //   signInWithEmailAndPassword(authentication, email, password)
    //     .then((response) => {
    //       navigate('/components/Account/Account');
    //       sessionStorage.setItem(
    //         'Auth Token',
    //         response._tokenResponse.refreshToken
    //       );
    //     })
    //     .catch((error) => {
    //       if (error.code === 'auth/wrong-password') {
    //         toast.error('Please check the Password');
    //       }
    //       if (error.code === 'auth/user-not-found') {
    //         toast.error('Please check the Email');
    //       }
    //     });
    // }
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
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            <Route path="/components/Home/Home" element={<Home />} />
          </Routes>
        </AuthProvider>
        {/* <SearchBar /> */}
      </StyledEngineProvider>
    </React.Fragment>
  );
}

export default App;

// <Route
// exact
// path="/login"
// element={
//   <Form
//     title="Login"
//     setEmail={setEmail}
//     setPassword={setPassword}
//     handleAction={() => handleAction(1)}
//   />
// }
// />
// <Route
// exact
// path="/register"
// element={
//   <Form
//     title="Register"
//     setEmail={setEmail}
//     setPassword={setPassword}
//     handleAction={() => handleAction(2)}
//   />
