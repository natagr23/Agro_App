import React, { useState } from 'react';

import HomeGrid from '../../components/UI/HomeGrid';
import TextField from '@mui/material/TextField';

export default function Home() {
  const [inputText, setInputText] = useState('');
  let inputHandler = (e) => {
    //convert input text to lower case
   let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  return (
    <>
      <div> Home Page</div>
      <p> Search...</p>
      <TextField
        id="outlined-basic"
        onChange={inputHandler}
        variant="outlined"
        fullWidth
        label="Search"
      />

      <HomeGrid input={inputText} />
    </>
  );
}
