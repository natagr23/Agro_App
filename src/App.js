import * as React from 'react';
import Navbar from './components/Navbar/Navbar';
import { StyledEngineProvider } from '@mui/material/styles';
import SearchBar from './components/SearchBar/SearchBar';
import Api from './components/Api/Api';

function App() {
  return (
    <div className="App">
      <Navbar />
      <StyledEngineProvider injectFirst>
        <Api />
        <SearchBar />
      </StyledEngineProvider>
      ,
    </div>
  );
}

export default App;
