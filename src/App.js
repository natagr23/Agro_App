import * as React from 'react';
import Navbar from './components/Navbar/Navbar';
import { StyledEngineProvider } from '@mui/material/styles';
import SearchBar from './components/SearchBar/SearchBar';
import Products from './components/Products/Products';
import Services from './components/Services/Services';
// import { Home, Favorites } from "pages";

import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <StyledEngineProvider injectFirst>
        <Router>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/components/Products/Products"
              component={Products}
            />
            <Route
              exact
              path="/components/Services/Services"
              component={Services}
            />
          </Routes>
        </Router>

        <SearchBar />
      </StyledEngineProvider>
    </React.Fragment>
  );
}

export default App;
