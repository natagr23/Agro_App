import * as React from 'react';
import Navbar from './components/Navbar/Navbar';
import { StyledEngineProvider } from '@mui/material/styles';

import Products from './components/Products/Products';
import Services from './components/Services/Services';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';

// import { Home, Favorites } from "pages";

import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <StyledEngineProvider injectFirst>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/components/Home/Home" element={<Home />} />
            <Route
              exact
              path="/components/Products/Products"
              element={<Products />}
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
            <Route exact path="/components/Login/Login" element={<Login />} />
          </Routes>
        </Router>
      </StyledEngineProvider>
    </React.Fragment>
  );
}

export default App;
