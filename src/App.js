import * as React from 'react';
import Navbar from './components/Navbar/Navbar';
import { StyledEngineProvider } from '@mui/material/styles';
import SearchBar from './components/SearchBar/SearchBar';
import Products from './components/Products/Products';
import Services from './components/Services/Services';
import Home from './components/Home/Home';
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
          </Routes>
        </Router>
        <SearchBar />
      </StyledEngineProvider>
    </React.Fragment>
  );
}

export default App;
