import React, { useContext } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Products from '../Products/Products';
import Services from '../Services/Services';
import Home from '../Home/Home';
import About from '../About/About';
import Contact from '../Contact/Contact';
import Account from '../Account/Account';
import Register from '../Login/Register';
import ForgotPassword from '../Login/ForgotPassword';
import SignIn from '../Login/SignIn';
import { AuthContext } from '../AuthContext/AuthContext';
import CreateProducts from '../Products/CreateProducts';

export default function RoutesComponent() {
  const ctx = useContext(AuthContext);
  return (
    <Routes>
      {!ctx.currentUser && (
        <Route
          path="/"
          element={<Navigate to="/components/Home/Home" replace={true} />}
        />
      )}
      <Route exact path="/components/Account/Account" element={<Account />} />
      <Route
        exact
        path="/components/Products/CreateProducts"
        element={<CreateProducts />}
      />
      {!ctx.currentUser && (
        <>
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
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </>
      )}

      {/* {!ctx.currentUser && ( */}
      <>
        <Route path="/components/Home/Home" element={<Home />} />
      </>
      {/* )} */}
    </Routes>
  );
}
