import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Api from '../Api/Api';

export default function SearchBar(props) {
  return (
    <>
      <Box
        sx={{
          '& > :not(style)': { m: 5, width: '30ch' },
          // width: '100%',
          // maxWidth: 0,
          // bgcolor: 'background.paper',
        }}
        autoComplete="on"
      >
        <Api />
      </Box>
    </>
  );
}
