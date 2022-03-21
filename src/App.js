import Button from '@mui/material/Button';
//https://www.youtube.com/watch?v=uLSE7WtcrP0

import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

function App() {
  return (
    <div className="App">
      <Button variant="contained">Hello World</Button>
      <ThemeProvider theme={theme}>...</ThemeProvider>
    </div>
  );
}

export default App;
