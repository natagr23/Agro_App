//inputReducer shop
//https://health-bloom.vercel.app/index
//https://blog.logrocket.com/build-crud-application-react-firebase-web-sdk-v9/

import React from 'react';
import Box from '@mui/material/Box';
// import ProductForm from './ProductForm';

export default function CreateProducts() {
  return (
    <div>
      <Box
        sx={{
          '& > :not(style)': { m: 9, width: '30ch' },
          // width: '100%',
          // maxWidth: 0,
          // bgcolor: 'background.paper',
        }}
        autoComplete="on"
      >
        {/* <ProductForm /> */}
      </Box>
    </div>
  );
}
