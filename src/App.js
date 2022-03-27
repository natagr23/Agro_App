import * as React from 'react';
import Navbar from './components/Navbar/Navbar';
import { StyledEngineProvider } from '@mui/material/styles';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <StyledEngineProvider injectFirst>
        <SearchBar />
      </StyledEngineProvider>
      ,
    </div>
  );
}

export default App;
